import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT } from "./data";

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${CONTACT.email}`}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
      >
        <Mail className="h-4 w-4" /> Say hello
      </a>
      <a
        href={CONTACT.resume}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        Resume <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}