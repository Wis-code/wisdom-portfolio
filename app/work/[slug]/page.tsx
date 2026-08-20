import { SiteHeader } from "@/components/SiteHeader";
import { ProjectPageClient } from "@/components/ProjectPageClient";
import { getProject } from "@/data/projects";

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seed = getProject(slug) ?? null;

  return (
    <main>
      <SiteHeader />
      <ProjectPageClient slug={slug} seed={seed} />
    </main>
  );
}
