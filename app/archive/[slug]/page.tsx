import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterCTA } from "@/components/FooterCTA";
import { archiveCollections } from "@/data/archive";
import styles from "./page.module.css";

export function generateStaticParams() {
  return archiveCollections.map(({ slug }) => ({ slug }));
}

export default async function ArchiveCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = archiveCollections.find((item) => item.slug === slug);
  if (!collection) notFound();

  return (
    <main>
      <SiteHeader />
      <section className={styles.hero}>
        <Link href="/#work">← Back to portfolio</Link>
        <span>Selected archive</span>
        <h1>{collection.title}</h1>
        <p>{collection.note}</p>
      </section>
      <section className={styles.grid} aria-label={collection.title}>
        {collection.items.map((item, index) => (
          <figure className={styles.item} data-ratio={item.ratio} key={item.title}>
            <div className={styles.visual}>
              <Image src={item.src} alt={`${item.title} design by Onyedika Wisdom Chiemeziem`} fill sizes="(max-width: 720px) 92vw, 46vw" />
            </div>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2></figcaption>
          </figure>
        ))}
      </section>
      <FooterCTA />
    </main>
  );
}
