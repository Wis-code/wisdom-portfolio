import styles from "./ServicesProcess.module.css";

const services = [
  {
    number: "01",
    title: "Brand identity",
    text: "Positioning translated into marks, typography, colour, pattern and rules that can grow."
  },
  {
    number: "02",
    title: "Visual systems",
    text: "Flexible design languages for teams, products and brands that need consistency without repetition."
  },
  {
    number: "03",
    title: "Campaign direction",
    text: "Key visuals and rollout systems that keep a campaign recognizable across every release."
  },
  {
    number: "04",
    title: "High-impact design",
    text: "Posters, covers and launch pieces built to hold attention when one frame has to do the work."
  }
];

const process = ["Discover", "Define", "Design the system", "Deploy with clarity"];

export function ServicesProcess() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.intro}>
        <span>04 / Capabilities</span>
        <h2>Not more decoration.<br />A clearer visual decision.</h2>
      </div>

      <div className={styles.serviceGrid}>
        {services.map((service) => (
          <article key={service.number}>
            <span>{service.number}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.process} id="process">
        <div className={styles.processCopy}>
          <span>05 / Process</span>
          <h2>Complexity in.<br /><em>Clarity out.</em></h2>
          <p>
            Every project gets enough structure to survive beyond the first beautiful image.
            The output is a visual system you can keep using.
          </p>
        </div>

        <ol>
          {process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              <i>↘</i>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
