import Reveal from "./Reveal";
import HeroActions from "./HeroActions";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pt-16 lg:min-h-[88vh] lg:pt-[22vh]">
      <Reveal>
        <p className="font-heading text-2xl font-normal leading-snug tracking-tight sm:text-3xl">
          Developer building web apps and AI-powered tools that make{" "}
          <span className="text-primary">messy workflows simple.</span>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-xl text-base text-muted-foreground">
          I specialise in high-performance web systems with Next.js, TypeScript, and C#/.NET. I care about clean
          architecture, scalable cloud systems, and thoughtful UI design that makes complex tools feel direct.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <HeroActions />
      </Reveal>
    </section>
  );
}
