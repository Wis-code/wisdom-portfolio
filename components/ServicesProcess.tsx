import styles from "./ServicesProcess.module.css";

const services = [
  {
    number: "01",
    title: "Brand identity",
    text: "Identity systems, visual direction and practical brand applications."
  },
  {
    number: "02",
    title: "Campaign & marketing",
    text: "Campaign graphics, launch visuals, social communication and promotional assets."
  },
  {
    number: "03",
    title: "Corporate communication",
    text: "Brochures, presentations, one-pagers and business collateral designed for clarity."
  },
  {
    number: "04",
    title: "Print & digital design",
    text: "Consistent communication across physical materials and digital touchpoints."
  }
];

export function ServicesProcess() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.intro}>
        <span>02 / Capabilities</span>
        <h2>Different formats.<br />One clear visual language.</h2>
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
    </section>
  );
}
