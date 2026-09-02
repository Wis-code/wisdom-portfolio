import { About } from "@/components/About";
import { FooterCTA } from "@/components/FooterCTA";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reviews } from "@/components/Reviews";
import { ServicesProcess } from "@/components/ServicesProcess";
import { SiteHeader } from "@/components/SiteHeader";
import { SelectedArchive } from "@/components/SelectedArchive";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ProjectShowcase />
      <SelectedArchive />
      <About />
      <ServicesProcess />
      <Reviews reviews={[]} />
      <FooterCTA />
    </main>
  );
}
