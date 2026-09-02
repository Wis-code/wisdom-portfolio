"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

function SoftwareBadges() {
  return (
    <div className={styles.badges} aria-label="Design software">
      <span className={`${styles.badge} ${styles.ps}`} title="Adobe Photoshop">Ps</span>
      <span className={`${styles.badge} ${styles.ai}`} title="Adobe Illustrator">Ai</span>
      <span className={`${styles.badge} ${styles.id}`} title="Adobe InDesign">Id</span>
      <span className={`${styles.badge} ${styles.cv}`} title="Canva">Ca</span>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--mx", x.toFixed(3));
        node.style.setProperty("--my", y.toFixed(3));
      });
    };

    node.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.designTrace} aria-hidden="true">
        <span>Brand system / 01</span>
        <i />
        <b>04:05</b>
      </div>

      <div className={styles.shell}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.name}>
            <span>Onyedika Wisdom</span>
            <span>Chiemeziem</span>
          </h1>

          <p className={styles.eyebrow}>Brand Identity &amp; Visual Systems Designer</p>
          <p className={styles.statement}>Designing clarity for ambitious brands.</p>

          <div className={styles.words} aria-label="Identity, Systems, Direction">
            <span>Identity</span><i />
            <span>Systems</span><i />
            <span>Direction</span>
          </div>

          <SoftwareBadges />

          <div className={styles.actions}>
            <a
              className={styles.primary}
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Start a Project <span>↗</span>
            </a>

            <a className={styles.secondary} href="#work">
              View Selected Work <span>↘</span>
            </a>
          </div>
        </div>

        <div className={styles.portraitStage}>
          <Image
            className={styles.portrait}
            src="/media/portrait-headshot.jpg"
            alt="Onyedika Wisdom Chiemeziem"
            width={1536}
            height={1536}
            priority
            quality={100}
            sizes="(max-width: 760px) 82vw, (max-width: 1100px) 42vw, 560px"
          />
        </div>
      </div>
    </section>
  );
}
