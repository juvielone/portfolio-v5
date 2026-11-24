import { SECTIONS } from "@/content/data";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-6 pr-14 pt-8 text-sm md:pr-0 md:pt-10">
      <a href="#about" className="font-heading font-semibold tracking-tight">
        Juvie Lagos
      </a>
      <nav aria-label="Sections">
        <ul className="flex gap-5 text-muted-foreground">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="relative transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground hover:after:scale-x-100"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
