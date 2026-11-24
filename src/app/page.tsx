import ThemeToggle from "@/components/portfolio/ThemeToggle";
import SiteHeader from "@/components/portfolio/SiteHeader";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ThemeToggle />
      <div className="relative z-10 mx-auto max-w-[42rem] px-6">
        <SiteHeader />
        <main className="pb-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <footer className="mt-32 border-t pt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Juvie Lagos · Built with care in Sydney
          </footer>
        </main>
      </div>
    </div>
  );
}
