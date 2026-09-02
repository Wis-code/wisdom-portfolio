import Image from "next/image";
import Link from "next/link";
import { archiveCollections } from "@/data/archive";
import styles from "./SelectedArchive.module.css";

export function SelectedArchive() {
  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <header className={styles.heading}>
        <span>03 / More work</span>
        <h2 id="archive-title">More work, arranged as connected collections.</h2>
        <p>Open a collection to see the related pieces together, rather than as scattered individual posts.</p>
      </header>

      <div className={styles.groups}>
        {archiveCollections.map((collection, index) => (
          <Link className={styles.group} href={`/archive/${collection.slug}`} key={collection.slug}>
            <div className={styles.visual}>
              <Image src={collection.cover} alt={`${collection.title} collection`} fill sizes="(max-width: 720px) 92vw, 32vw" />
              <span>{collection.items.length} pieces</span>
            </div>
            <div className={styles.groupIntro}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{collection.title}</h3>
                <p>{collection.note}</p>
                <b>Click to see more ↗</b>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
