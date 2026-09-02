import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import styles from "./About.module.css";

const practice = [
  {
    label: "Brand identity",
    text: "Distinctive identity foundations and practical visual rules that keep a brand recognisable."
  },
  {
    label: "Visual systems",
    text: "Connected design languages that stay coherent across campaigns, content and everyday communication."
  },
  {
    label: "Campaign design",
    text: "Focused creative direction for launches, events, publishing and digital communications."
  }
];

export function About() {
  return (
    <section id="about" className={styles.section}>
      <Reveal className={styles.intro}>
        <div className={styles.identity}>
          <span>02 / About</span>
          <p>{site.name}</p>
          <small>{site.location}</small>
        </div>

        <div className={styles.story}>
          <h2>I build clear visual identities for brands ready to communicate with confidence.</h2>
          <div className={styles.copy}>
            <p>
              Since 2022, I&apos;ve worked independently across brand identity, campaign design,
              publishing and digital communication. My role is to turn an idea, message or offer
              into a visual direction that feels distinctive and works consistently in the real world.
            </p>
            <p>
              Today, I focus on identity systems and connected campaign work—bringing typography,
              colour, imagery and layout together so every touchpoint feels like part of the same brand.
            </p>
            <a href={`mailto:${site.email}`}>Discuss a design project ↗</a>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.practice}>
        {practice.map((item, index) => (
          <article key={item.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
