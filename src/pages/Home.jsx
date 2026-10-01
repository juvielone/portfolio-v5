import React from "react";
import Spotlight from "@/components/portfolio/Spotlight";
import ThemeToggle from "@/components/portfolio/ThemeToggle";
import IdentityColumn from "@/components/portfolio/IdentityColumn";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import useActiveSection from "@/hooks/useActiveSection";

const IDS = ["about", "experience", "projects"];

export default function Home() {
  const active = useActiveSection(IDS);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Spotlight />
      <ThemeToggle />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:flex lg:gap-16 lg:px-16">
        <IdentityColumn active={active} />
        <main className="pb-24 lg:w-[62%]">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <footer className="mt-32 border-t pt-8 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Juvie Lagos · Built with care in Sydney
          </footer>
        </main>
      </div>
    </div>
  );
}