"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPublishedProjects } from "@/data/projects";
import { firebaseConfigured } from "@/lib/firebase-client";
import { loadPublishedProjectsFromCloud } from "@/lib/firebase-content";
import { sortProjectsForPortfolio, type Project } from "@/lib/portfolio-model";
import styles from "./WorkArchive.module.css";

function projectCover(project: Project) {
  return (
    project.assets.find((asset) => asset.weight === "hero") ??
    project.assets.find((asset) => asset.kind === "mockup") ??
    project.assets[0]
  );
}

function mergeProjects(seed: Project[], cloudProjects: Project[]) {
  if (!cloudProjects.length) return seed;

  const merged = new Map(seed.map((project) => [project.slug, project]));
  for (const project of cloudProjects) merged.set(project.slug, project);

  return Array.from(merged.values())
    .filter((project) => project.published)
    .sort(sortProjectsForPortfolio);
}

export function WorkArchive() {
  const seed = useMemo(() => getPublishedProjects(), []);
  const [items, setItems] = useState(seed);

  useEffect(() => {
    if (!firebaseConfigured) return;
    loadPublishedProjectsFromCloud()
      .then((cloudProjects) => setItems(mergeProjects(seed, cloudProjects)))
      .catch(() => undefined);
  }, [seed]);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span>Work archive</span>
        <h1>More work, without making the homepage carry everything.</h1>
        <p>
          Selected projects lead the portfolio. This archive keeps the wider body of work
          available for anyone who wants to look deeper.
        </p>
      </header>

      <div className={styles.grid}>
        {items.map((project) => {
          const cover = projectCover(project);
          if (!cover) return null;

          return (
            <Link href={`/work/${project.slug}`} className={styles.card} key={project.slug}>
              <div className={styles.visual}>
                <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 31vw" />
              </div>
              <div className={styles.meta}>
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.category}</p>
                </div>
                <span>{project.year} ↗</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
