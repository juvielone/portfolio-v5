import { MapPin } from "lucide-react";
import { SOCIALS, type Social } from "@/content/data";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import SydneyClock from "./SydneyClock";

const ICONS: Record<Social["label"], typeof XIcon> = { LinkedIn: LinkedinIcon, GitHub: GithubIcon, X: XIcon };

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
