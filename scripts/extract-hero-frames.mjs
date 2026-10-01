// Pre-extracts the hero character video into a WebP sprite sheet + poster,
// using the locally installed Google Chrome (headless) to decode the video.
// Usage: npm run hero:frames   (set CHROME_PATH if Chrome isn't auto-detected)

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const VIDEO = join(ROOT, "assets", "hero-character.mp4");
const OUT_DIR = join(ROOT, "public", "hero");
const META = join(ROOT, "src", "content", "hero-frames.ts");

const FRAME_COUNT = 48; // sampled evenly across the clip
const COLS = 8;
const MAX_WIDTH = 768; // 2x the card's max display width (max-w-sm = 384px)
const QUALITY = 0.82;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) throw new Error("Google Chrome not found. Set CHROME_PATH to its executable.");
if (!existsSync(VIDEO)) throw new Error(`Video not found: ${VIDEO}`);

const page = `<!doctype html><script>
window.__result = (async () => {
  const FRAME_COUNT = ${FRAME_COUNT}, COLS = ${COLS}, MAX_WIDTH = ${MAX_WIDTH}, QUALITY = ${QUALITY};
  let out;
  try {
    const video = document.createElement("video");
    video.src = ${JSON.stringify(pathToFileURL(VIDEO).href)};
    video.muted = true;
    video.preload = "auto";
    await new Promise((res, rej) => { video.onloadeddata = res; video.onerror = () => rej(new Error("video failed to load")); });

    const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
    const w = Math.round(video.videoWidth * scale);
    const h = Math.round(video.videoHeight * scale);
    const rows = Math.ceil(FRAME_COUNT / COLS);
    const idle = Math.round((FRAME_COUNT - 1) / 2);

    const sheet = Object.assign(document.createElement("canvas"), { width: w * COLS, height: h * rows });
    const poster = Object.assign(document.createElement("canvas"), { width: w, height: h });
    const end = video.duration - 0.05;

    for (let i = 0; i < FRAME_COUNT; i++) {
      video.currentTime = (end * i) / (FRAME_COUNT - 1);
      await new Promise((res) => (video.onseeked = res));
      sheet.getContext("2d").drawImage(video, (i % COLS) * w, Math.floor(i / COLS) * h, w, h);
      if (i === idle) poster.getContext("2d").drawImage(video, 0, 0, w, h);
    }

    out = {
      width: w, height: h, cols: COLS, count: FRAME_COUNT,
      sheet: sheet.toDataURL("image/webp", QUALITY),
      poster: poster.toDataURL("image/webp", QUALITY),
    };
  } catch (e) {
    out = { error: String(e) };
  }
  return JSON.stringify(out);
})();
</script>`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Launches headless Chrome and returns the value of window.__result via the DevTools protocol.
async function runInChrome(htmlUrl, profileDir) {
  const proc = spawn(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    htmlUrl,
  ]);
  try {
    const portFile = join(profileDir, "DevToolsActivePort");
    for (let i = 0; i < 100 && !existsSync(portFile); i++) await sleep(100);
    const port = readFileSync(portFile, "utf8").split("\n")[0].trim();

    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const target = targets.find((t) => t.type === "page");
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    const reply = new Promise((res) => {
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === 1) res(msg);
      };
    });
    ws.send(JSON.stringify({
      id: 1,
      method: "Runtime.evaluate",
      params: {
        expression: "new Promise((r) => { const t = () => (window.__result ? r(window.__result) : setTimeout(t, 50)); t(); })",
        awaitPromise: true,
        returnByValue: true,
      },
    }));
    let timer;
    const timeout = new Promise((res) => (timer = setTimeout(() => res({ timeout: true }), 120000)));
    const msg = await Promise.race([reply, timeout]);
    clearTimeout(timer);
    ws.close();
    if (msg.timeout) throw new Error("Timed out waiting for Chrome to extract frames.");
    if (msg.result?.exceptionDetails) throw new Error(msg.result.exceptionDetails.text);
    return msg.result.result.value;
  } finally {
    proc.kill();
  }
}

const tmp = mkdtempSync(join(tmpdir(), "hero-frames-"));
try {
  const html = join(tmp, "extract.html");
  writeFileSync(html, page);

  const result = JSON.parse(await runInChrome(pathToFileURL(html).href, join(tmp, "profile")));
  if (result.error) throw new Error(result.error);

  const decode = (dataUrl) => {
    if (!dataUrl.startsWith("data:image/webp")) throw new Error("Chrome did not encode WebP.");
    return Buffer.from(dataUrl.split(",")[1], "base64");
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const sheet = decode(result.sheet);
  const poster = decode(result.poster);
  writeFileSync(join(OUT_DIR, "frames.webp"), sheet);
  writeFileSync(join(OUT_DIR, "poster.webp"), poster);
  writeFileSync(
    META,
    `// Generated by scripts/extract-hero-frames.mjs — do not edit by hand.\n` +
      `export const HERO_FRAMES = {\n` +
      `  width: ${result.width},\n  height: ${result.height},\n  cols: ${result.cols},\n  count: ${result.count},\n` +
      `  sheet: "/hero/frames.webp",\n  poster: "/hero/poster.webp",\n} as const;\n`
  );

  const kb = (b) => `${Math.round(b.length / 1024)} KB`;
  console.log(`Frames: ${result.count} @ ${result.width}x${result.height}`);
  console.log(`public/hero/frames.webp  ${kb(sheet)}`);
  console.log(`public/hero/poster.webp  ${kb(poster)}`);
} finally {
  await sleep(500); // let Chrome release the profile folder before deleting it (Windows)
  rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
