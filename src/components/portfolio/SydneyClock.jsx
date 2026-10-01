import React, { useEffect, useState } from "react";

const format = () =>
  new Date().toLocaleTimeString("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

export default function SydneyClock() {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-1 font-mono text-xs tabular-nums text-muted-foreground/80">
      {time} local time
    </p>
  );
}