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
        if (cloudProjects.length) setItems(cloudProjects);
      })
      .catch(() => {
        // Seed projects remain visible if cloud loading fails.
      });
  }, []);

  return (
    <section id="work" className={styles.section}>
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>Selected work</span>
          <h2>Different kinds of work.<br />One standard of intent.</h2>
        </div>
        <span className={styles.count}>
          {String(items.length).padStart(2, "0")} projects
        </span>
      </div>

      <div className={styles.grid}>
        {items.map((project, index) => {
          const cover = projectCover(project);
          if (!cover) return null;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${styles.card} ${project.featured ? styles.featured : ""}`}
            >
              <div className={styles.visual}>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes={project.featured ? "(max-width: 900px) 94vw, 64vw" : "(max-width: 900px) 94vw, 34vw"}
                />
                <div className={styles.veil} />
                <span className={styles.open}>View project ↗</span>
              </div>

              <div className={styles.meta}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
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
