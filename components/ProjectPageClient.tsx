"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { PrintButton } from "@/components/PrintButton";
import { firebaseConfigured } from "@/lib/firebase-client";
import { loadProjectFromCloud } from "@/lib/firebase-content";
import { composeProject } from "@/lib/layout-engine";
import type { Project } from "@/lib/portfolio-model";
import { site } from "@/data/site";
import styles from "./ProjectPageClient.module.css";

export function ProjectPageClient({
  slug,
  seed
}: {
  slug: string;
  seed: Project | null;
}) {
  const [project, setProject] = useState<Project | null>(seed);
  const [loading, setLoading] = useState(!seed && firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured) return;

    loadProjectFromCloud(slug)
      .then((cloudProject) => {
        if (cloudProject) setProject(cloudProject);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const blocks = useMemo(
    () => (project ? composeProject(project) : []),
    [project]
  );

  if (loading) {
    return <div className={styles.loading}>Opening project…</div>;
  }

  if (!project) {
    return (
      <section className={styles.notFound}>
        <span>Project unavailable</span>
        <h1>This project is not published yet.</h1>
        <Link href="/">Back home</Link>
      </section>
    );
  }

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.meta}>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h1>{project.title}</h1>

        <div className={styles.introBottom}>
          <p>{project.description}</p>
          <span>Scroll to enter the system ↓</span>
        </div>
      </section>

      <CaseStudyLayout blocks={blocks} />

      <section className={styles.story}>
        <div className={styles.storyLabel}>The brief</div>
        <div className={styles.storyCopy}>
          <p className={styles.challenge}>{project.challenge}</p>

          <div className={styles.storyColumns}>
            <div>
              <span>Objective</span>
              <p>{project.objective}</p>
            </div>
            <div>
              <span>Audience</span>
              <p>{project.audience}</p>
            </div>
          </div>

          <div className={styles.services}>
            {project.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      {project.palette.length ? (
        <section className={styles.paletteSection}>
          <div className={styles.storyLabel}>Palette</div>
          <div className={styles.paletteRow}>
            {project.palette.map((color) => (
              <div key={color} style={{ background: color }}>
                <span>{color}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.close}>
        <p>{project.type.replace(/-/g, " ")}</p>
        <h2>Built to hold together.<br />Built to be remembered.</h2>

        <div className={styles.closeActions}>
          <PrintButton />
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            Start a project ↗
          </a>
          <Link href="/">Back home</Link>
        </div>
      </section>
    </>
  );
}
