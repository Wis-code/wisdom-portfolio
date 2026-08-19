import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function ProjectShowcase() {
  const project = projects[0];
  return (
    <section id="work" className="work-section work-section-v2 section-shell">
      <Reveal className="section-heading-wrap section-heading-v2">
        <div className="section-kicker">Selected work / 01</div>
        <h2>Work, carefully presented.</h2>
      </Reveal>

      <Link href={`/work/${project.slug}`} className="featured-project featured-project-v2" aria-label={`Open ${project.title} case study`}>
        <div className="featured-backlight" />
        <div className="featured-meta">
          <div>
            <span className="project-index">01</span>
            <h3>{project.title}</h3>
          </div>
          <div className="project-detail-row">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
        </div>
        <div className="featured-visual featured-visual-v2">
          <Image
            src="/media/deras-scarf.webp"
            alt="Dera’s Decor & Dress scarf brand application"
            fill
            priority={false}
            sizes="(max-width: 900px) 94vw, 88vw"
          />
          <div className="featured-veil" />
          <span className="open-project">View case study ↗</span>
        </div>
      </Link>
    </section>
  );
}
