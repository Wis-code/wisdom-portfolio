"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPublishedProjects } from "@/data/projects";
import { firebaseConfigured } from "@/lib/firebase-client";
import { loadPublishedProjectsFromCloud } from "@/lib/firebase-content";
import type { Project } from "@/lib/portfolio-model";
import styles from "./ProjectShowcase.module.css";

function projectCover(project: Project) {
  return (
    project.assets.find((asset) => asset.weight === "hero") ??
    project.assets.find((asset) => asset.kind === "mockup") ??
    project.assets[0]
  );
}

export function ProjectShowcase() {
  const seed = useMemo(() => getPublishedProjects(), []);
  const [items, setItems] = useState(seed);

  useEffect(() => {
    if (!firebaseConfigured) return;

    loadPublishedProjectsFromCloud()
      .then((cloudProjects) => {
        if (!cloudProjects.length) return;

        const currentSlugs = new Set(seed.map((project) => project.slug));
        const cloudBySlug = new Map(cloudProjects.map((project) => [project.slug, project]));
        const merged = seed.map((project) => cloudBySlug.get(project.slug) ?? project);

        for (const project of cloudProjects) {
          if (!currentSlugs.has(project.slug) && project.slug !== "deras-decor-dress") {
            merged.push(project);
          }
        }

        setItems(merged);
      })
      .catch(() => undefined);
  }, []);

  return (
    <section id="work" className={styles.section}>
      <header className={styles.heading}>
        <div>
          <span className={styles.kicker}>01 / Selected work</span>
          <h2>Identity, campaigns and visual systems—built with intent.</h2>
        </div>
        <p>
          The format changes with the work. Brand systems breathe; campaign series move;
          single visuals hold the frame.
        </p>
      </header>

      <div className={styles.grid}>
        {items.map((project, index) => {
          const cover = projectCover(project);
          if (!cover) return null;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${styles.card} ${styles[`card${index % 5}`]}`}
            >
              <div className={styles.visual} data-ratio={cover.ratio}>
                <span className={styles.projectType}>{project.category}</span>
                <Image
                  className={index === 0 && cover.ratio === "portrait" ? styles.contain : ""}
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 760px) 94vw, 58vw"
                      : "(max-width: 760px) 94vw, (max-width: 1000px) 48vw, 34vw"
                  }
                />
                <div className={styles.veil} />
                <span className={styles.open}>Enter case study ↗</span>
              </div>

              <div className={styles.meta}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <span className={styles.year}>{project.year}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
