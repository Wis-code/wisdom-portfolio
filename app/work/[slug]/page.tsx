import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { SiteHeader } from "@/components/SiteHeader";
import { PrintButton } from "@/components/PrintButton";
import { getProject, projects } from "@/data/projects";
import { composeProject } from "@/lib/layout-engine";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const blocks = composeProject(project.assets);

  return (
    <main className="case-page">
      <SiteHeader />
      <section className="case-intro">
        <div className="case-intro-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <div className="case-intro-bottom">
          <p>{project.description}</p>
          <span>Scroll to enter the system ↓</span>
        </div>
      </section>

      <CaseStudyLayout blocks={blocks} />

      <section className="case-story section-shell">
        <div className="story-label">The brief</div>
        <div className="story-copy">
          <p>{project.challenge}</p>
          <div className="story-columns">
            <div><span>Objective</span><p>{project.objective}</p></div>
            <div><span>Audience</span><p>{project.audience}</p></div>
          </div>
          <div className="service-pills">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
        </div>
      </section>

      <section className="palette-section section-shell">
        <div className="story-label">Palette</div>
        <div className="palette-row">
          {project.palette.map((color) => <div key={color} style={{ background: color }}><span>{color}</span></div>)}
        </div>
      </section>

      <section className="case-close">
        <p>End of project / 01</p>
        <h2>One system.<br />Many surfaces.</h2>
        <div className="case-close-actions">
          <PrintButton />
          <a href={site.whatsapp} target="_blank" rel="noreferrer">Start a project ↗</a>
          <Link href="/">Back home</Link>
        </div>
      </section>
    </main>
  );
}
