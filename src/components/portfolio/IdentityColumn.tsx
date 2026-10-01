import SectionNav from "./SectionNav";
import SocialLinks from "./SocialLinks";

export default function IdentityColumn() {
  return (
    <header className="pt-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[38%] lg:flex-col lg:justify-between lg:py-24">
      <div className="animate-hero-in">
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Hello! I&apos;m
          <br />
          <span className="text-primary">Juvie Lagos.</span>
        </h1>
        <SectionNav />
      </div>
      <SocialLinks />
    </header>
  );
}
