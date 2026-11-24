import Image from "next/image";
import HeroActions from "./HeroActions";
import SydneyClock from "./SydneyClock";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import { SOCIALS, type Social } from "@/content/data";

const ICONS: Record<Social["label"], typeof XIcon> = { LinkedIn: LinkedinIcon, GitHub: GithubIcon, X: XIcon };

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pt-20 sm:pt-28">
      <div className="flex animate-hero-in items-center gap-4">
        <Image
          src="/hero/profile.png"
          width={311}
          height={311}
          alt="Portrait of Juvie Lagos"
          loading="eager"
          fetchPriority="high"
          sizes="144px"
          className="h-auto w-18 rounded-2xl"
        />
        <div className="text-sm text-muted-foreground">
          <p>Sydney, Australia</p>
          <SydneyClock />
        </div>
      </div>
      <h1
        className="mt-10 animate-hero-in font-heading text-[clamp(2.75rem,8vw,4.75rem)] font-semibold leading-none tracking-[-0.04em] text-balance"
        style={{ animationDelay: "80ms" }}
      >
        Juvie Lagos
        <span className="mt-3 block text-[0.42em] font-normal tracking-tight text-muted-foreground">Full-stack developer</span>
      </h1>
      <p className="mt-8 max-w-xl animate-hero-in text-xl leading-snug text-pretty" style={{ animationDelay: "160ms" }}>
        I build web apps and AI-powered tools that make <span className="text-primary">messy workflows simple.</span>
      </p>
      <p className="mt-5 max-w-xl animate-hero-in text-base text-muted-foreground" style={{ animationDelay: "220ms" }}>
        I specialise in high-performance web systems with Next.js, TypeScript, and C#/.NET. I care about clean
        architecture, scalable cloud systems, and thoughtful UI design that makes complex tools feel direct.
      </p>
      <div className="animate-hero-in" style={{ animationDelay: "280ms" }}>
        <HeroActions />
      </div>
      <ul className="mt-8 flex gap-4 text-muted-foreground">
        {SOCIALS.map(({ label, href }) => {
          const Icon = ICONS[label];
          return (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="block transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
