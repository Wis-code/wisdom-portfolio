import { FooterCTA } from "@/components/FooterCTA";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkArchive } from "@/components/WorkArchive";

export default function WorkPage() {
  return (
    <main>
      <SiteHeader />
      <WorkArchive />
      <FooterCTA />
    </main>
  );
}
