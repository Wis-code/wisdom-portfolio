import { About } from "@/components/About";
import { FooterCTA } from "@/components/FooterCTA";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServicesProcess } from "@/components/ServicesProcess";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ProjectShowcase />
      <ServicesProcess />
      <About />
      <FooterCTA />
    </main>
  );
}
