import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import styles from "./About.module.css";

const focusAreas = [
  {
    number: "01",
    shape: "core",
    title: "Identity foundations",
    text: "Logo, typography, colour, pattern and practical rules that give a brand one recognisable voice."
  },
  {
    number: "02",
    shape: "system",
    title: "Connected campaigns",
    text: "A central visual direction expanded into launches, social series and communications without losing coherence."
  },
  {
    number: "03",
    shape: "impact",
    title: "High-impact pieces",
    text: "Posters, covers and one-off visuals designed with the same strategic care as a larger system."
  }
];

const formats = [
  "Full brand identities",
  "Campaign series",
  "Single visuals",
  "Posters & covers",
  "Presentation systems"
];

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid} aria-hidden="true" />

      <Reveal className={styles.intro}>
        <div className={styles.identity}>
          <span>02 / About</span>
          <p>{site.name}</p>
          <small>{site.location}</small>
        </div>

        <div className={styles.story}>
          <h2>I turn ambitious ideas into visual languages people can recognise and use.</h2>
          <p>
            I&apos;m a brand identity and visual systems designer drawn to difficult ideas—the kind that
            need more than a beautiful logo or one impressive flyer. I uncover what the idea needs to
            communicate, then build a visual direction that can stay clear across every touchpoint.
          </p>
          <p>
            My work moves between complete identities, campaign families and carefully resolved single
            pieces. The scale can change; the standard does not. Every decision should have a reason,
            support the message and remain useful after handoff.
          </p>
        </div>
      </Reveal>

      <Reveal className={styles.focusGrid}>
        {focusAreas.map((area) => (
          <article key={area.number} data-shape={area.shape}>
            <span>{area.number}</span>
            <i className={styles.symbol} aria-hidden="true" />
            <div>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </div>
          </article>
        ))}
      </Reveal>

      <Reveal className={styles.range}>
        <div>
          <span>Not limited to branding</span>
          <h3>The presentation adapts to the work—not the other way around.</h3>
        </div>
        <ul>
          {formats.map((format) => <li key={format}>{format}</li>)}
        </ul>
      </Reveal>
    </section>
  );
}
