import Image from "next/image";
import styles from "./SelectedArchive.module.css";

const groups = [
  {
    title: "Publishing & cover design",
    note: "Book covers, educational publishing and print-ready visual systems.",
    items: [
      ["Silent Echoes", "/media/archive/silent-echoes.jpg", "portrait"],
      ["Seven Heads", "/media/archive/seven-heads.png", "landscape"],
      ["Kids Quest Academy", "/media/archive/kids-quest-academy.png", "landscape"],
      ["OCO Academy Nsukka", "/media/archive/oco-academy-nsukka.png", "landscape"],
      ["Shalom Academy Nsukka", "/media/archive/shalom-academy-nsukka.png", "landscape"]
    ]
  },
  {
    title: "Film & entertainment posters",
    note: "Narrative key art built around character, atmosphere and release communication.",
    items: [
      ["The Other Man", "/media/archive/the-other-man.png", "portrait"],
      ["The Seat", "/media/archive/the-seat.jpg", "portrait"],
      ["Help Me Now", "/media/archive/help-me-now.png", "wide"]
    ]
  },
  {
    title: "Digital campaigns & content visuals",
    note: "Campaign graphics and content-led visuals across education, events and media.",
    items: [
      ["Wavelox Creator Lab", "/media/archive/wavelox-creator-lab.jpg", "portrait"],
      ["Creators Summit", "/media/archive/creators-summit.jpg", "portrait"],
      ["Personal Branding", "/media/archive/personal-branding.png", "portrait"],
      ["Atmosphere", "/media/archive/atmosphere.jpg", "wide"],
      ["The Breaker’s Chant", "/media/archive/breakers-chant.jpg", "wide"]
    ]
  }
] as const;

export function SelectedArchive() {
  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <header className={styles.heading}>
        <span>02 / Selected archive</span>
        <h2 id="archive-title">More of the work—grouped by what it needed to do.</h2>
        <p>Not every assignment needs a long case study. This archive shows range without separating connected pieces from the same body of work.</p>
      </header>

      <div className={styles.groups}>
        {groups.map((group, groupIndex) => (
          <article className={styles.group} key={group.title}>
            <div className={styles.groupIntro}>
              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              <div><h3>{group.title}</h3><p>{group.note}</p></div>
            </div>
            <div className={styles.grid}>
              {group.items.map(([title, src, ratio], index) => (
                <figure className={styles.item} data-ratio={ratio} key={title}>
                  <Image src={src} alt={`${title} design by Onyedika Wisdom Chiemeziem`} fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 30vw" />
                  <figcaption><span>{title}</span><small>{String(index + 1).padStart(2, "0")}</small></figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
