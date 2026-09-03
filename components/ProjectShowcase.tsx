"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPublishedProjects } from "@/data/projects";
import { firebaseConfigured } from "@/lib/firebase-client";
import { loadPublishedProjectsFromCloud } from "@/lib/firebase-content";
import { sortProjectsForPortfolio, type Project } from "@/lib/portfolio-model";
import styles from "./ProjectShowcase.module.css";

const HOME_PRIORITY = [
  "aerial-robotix",
  "asher-concept",
  "deras-apparel",
  "wavelox-creator-lab",
  "beef-bliss-protein-on-the-go",
  "revival-fire-campaign"
];

function projectCover(project: Project) {
  return (
    project.assets.find((asset) => asset.weight === "hero") ??
    project.assets.find((asset) => asset.kind === "mockup") ??
    project.assets[0]
  );
}

function mergeProjects(seed: Project[], cloudProjects: Project[]) {
  if (!cloudProjects.length) return seed;

  const cloudBySlug = new Map(cloudProjects.map((project) => [project.slug, project]));
  const currentSlugs = new Set(seed.map((project) => project.slug));
  const deraCloud = cloudProjects.find((project) => project.slug === "deras-decor-dress");

  if (deraCloud) {
    cloudBySlug.set("deras-apparel", { ...deraCloud, slug: "deras-apparel" });
  }

  const merged = seed.map((project) => cloudBySlug.get(project.slug) ?? project);

  for (const project of cloudProjects) {
    if (!currentSlugs.has(project.slug) && project.slug !== "deras-decor-dress") {
      merged.push(project);
    }
  }

  return merged.sort(sortProjectsForPortfolio);
}

function homeRank(project: Project) {
  if (Number.isFinite(project.featuredOrder)) return Number(project.featuredOrder);
  const fallback = HOME_PRIORITY.indexOf(project.slug);
  return fallback === -1 ? 999 : fallback + 1;
}

function belongsOnHomepage(project: Project) {
  return (
    Boolean(project.featured) &&
    (HOME_PRIORITY.includes(project.slug) || Number.isFinite(project.featuredOrder))
  );
}

export function ProjectShowcase() {
  const seed = useMemo(() => getPublishedProjects(), []);
  const [items, setItems] = useState(seed);

  useEffect(() => {
    if (!firebaseConfigured) return;

    loadPublishedProjectsFromCloud()
      .then((cloudProjects) => setItems(mergeProjects(seed, cloudProjects)))
      .catch(() => undefined);
  }, [seed]);

  const selected = useMemo(
    () =>
      items
        .filter(belongsOnHomepage)
        .sort((a, b) => homeRank(a) - homeRank(b) || sortProjectsForPortfolio(a, b))
        .slice(0, 6),
    [items]
  );

  return (
    <section id="work" className={styles.section}>
      <header className={styles.heading}>
        <div>
          <span className={styles.kicker}>01 / Selected work</span>
          <h2>Six projects. Different problems. One standard.</h2>
        </div>
        <p>
          A focused selection across identity, campaigns, corporate collateral,
          product communication and event design.
        </p>
      </header>

      <div className={styles.grid}>
        {selected.map((project, index) => {
          const cover = projectCover(project);
          if (!cover) return null;

          return (
            <Link key={project.slug} href={`/work/${project.slug}`} className={styles.card}>
              <div className={styles.imageStage}>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  className={cover.ratio === "portrait" ? styles.portraitImage : undefined}
                  sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 31vw"
                />
              </div>

              <div className={styles.pocket}>
                <div className={styles.projectMeta}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                </div>
                <span className={styles.click}>CLICK ME <b>↗</b></span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.moreRow}>
        <p>More work exists beyond the selected six.</p>
        <Link href="/work">Explore the archive <span>↗</span></Link>
      </div>
    </section>
  );
}
