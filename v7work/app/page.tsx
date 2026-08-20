import { About } from "@/components/About";
import { FooterCTA } from "@/components/FooterCTA";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reviews } from "@/components/Reviews";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ProjectShowcase />
      <About />
      <Reviews reviews={[]} />
      <FooterCTA />
    </main>
  );
}
