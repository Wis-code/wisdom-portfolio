import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section}>
      <Reveal className={styles.intro}>
        <div className={styles.identity}>
          <span>03 / About</span>
          <p>{site.name}</p>
          <small>{site.location}</small>
        </div>

        <div className={styles.story}>
          <h2>Design, approached as a system—not a collection of isolated visuals.</h2>
          <div className={styles.copy}>
            <p>
              I&apos;ve practised graphic design independently since 2022, working across identity,
              campaigns, print and digital communication. My engineering background shapes the way
              I work: structured thinking, consistency and deliberate problem-solving.
            </p>
            <a href={`mailto:${site.email}`}>Discuss a role or project ↗</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
