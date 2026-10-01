import React from "react";
import { Github, Linkedin, MapPin } from "lucide-react";
import { SOCIALS } from "./data";
import SydneyClock from "./SydneyClock";

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.84l-5.36-7.01L4.4 22H1.14l8.02-9.17L.75 2h7.02l4.84 6.4L18.244 2Zm-1.2 18h1.8L6.98 3.9H5.05L17.044 20Z" />
  </svg>
);

const ICONS = { LinkedIn: Linkedin, GitHub: Github, X: XIcon };

export default function SocialLinks() {
  return (
    <div className="mt-12 flex items-center gap-3 lg:mt-0">
      {SOCIALS.map(({ label, href }) => {
        const Icon = ICONS[label];
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <div className="ml-3 border-l pl-4">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> Sydney, Australia
        </span>
        <SydneyClock />
      </div>
    </div>
  );
}