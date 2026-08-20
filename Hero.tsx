"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

function DesignAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={`${styles.editorPanel} ${styles.layers}`}>
        <span className={styles.panelTitle}>Layers</span>
        <span className={styles.panelLine} />
        <span className={styles.panelLine} />
        <span className={styles.panelLine} />
      </div>

      <div className={`${styles.editorPanel} ${styles.properties}`}>
        <span className={styles.panelTitle}>Properties</span>
        <span className={styles.panelLine} />
        <span className={styles.panelLine} />
        <span className={styles.panelLine} />
      </div>

      <div className={styles.selectionBox}>
        <i className={`${styles.handle} ${styles.tl}`} />
        <i className={`${styles.handle} ${styles.tr}`} />
        <i className={`${styles.handle} ${styles.bl}`} />
        <i className={`${styles.handle} ${styles.br}`} />
      </div>

      <div className={styles.ruler} />
      <div className={styles.curve} />
    </div>
  );
}

function SoftwareBadges() {
  return (
    <div className={styles.badges} aria-label="Design software">
      <span className={`${styles.badge} ${styles.ps}`} title="Adobe Photoshop">Ps</span>
      <span className={`${styles.badge} ${styles.ai}`} title="Adobe Illustrator">Ai</span>
      <span className={`${styles.badge} ${styles.id}`} title="Adobe InDesign">Id</span>
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
      <div className={styles.bloomA} aria-hidden="true" />
      <div className={styles.bloomB} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <DesignAtmosphere />

      <div className={styles.shell}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.name}>
            <span>Onyedika Wisdom</span>
            <span>Chiemeziem</span>
          </h1>

          <p className={styles.eyebrow}>Brand Identity &amp; Visual Systems Designer</p>
          <p className={styles.statement}>I build visual systems for ambitious ideas.</p>

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
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.backlight} aria-hidden="true" />

          <Image
            className={styles.portrait}
            src="/media/portrait-master.png"
            alt="Onyedika Wisdom Chiemeziem"
            width={1122}
            height={1402}
            priority
            quality={100}
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 56vw, 52vw"
          />

          <div className={styles.lightWash} aria-hidden="true" />

          <div className={styles.focusCard} aria-hidden="true">
            <span>Focus</span>
            <strong>Brand Identity</strong>
            <strong>Visual Systems</strong>
            <strong>Creative Direction</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
