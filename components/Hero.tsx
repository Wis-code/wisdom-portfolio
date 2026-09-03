import Image from "next/image";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.shell}>
        <div className={styles.copy}>
          <span className={styles.kicker}>Graphic Designer · Lagos / Remote</span>
          <h1 id="hero-title">Designing visual systems that make ideas clearer.</h1>
          <p className={styles.intro}>
            I&apos;m {site.name}. I work across brand identity, campaigns, corporate collateral,
            digital communication and print—building design that stays clear across every touchpoint.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#work">
              View selected work <span>↘</span>
            </a>
            <a className={styles.secondary} href="#contact">
              Contact <span>↗</span>
            </a>
          </div>

          <div className={styles.tools} aria-label="Design tools">
            <span>Photoshop</span>
            <span>Illustrator</span>
            <span>InDesign</span>
            <span>Canva</span>
          </div>
        </div>

        <div className={styles.portraitStage}>
          <div className={styles.imageFrame}>
            <Image
              className={styles.portrait}
              src="/media/portrait-headshot.jpg"
              alt={site.name}
              fill
              priority
              quality={100}
              sizes="(max-width: 760px) 74vw, 360px"
            />
          </div>
          <div className={styles.availability}>
            <i />
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
