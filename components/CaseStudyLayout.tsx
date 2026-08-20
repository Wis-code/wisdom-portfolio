import Image from "next/image";
import type { LayoutBlock } from "@/lib/layout-engine";
import type { ProjectAsset } from "@/lib/portfolio-model";
import styles from "./CaseStudyLayout.module.css";

function AssetImage({
  asset,
  sizes,
  priority = false
}: {
  asset: ProjectAsset;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
    />
  );
}

export function CaseStudyLayout({ blocks }: { blocks: LayoutBlock[] }) {
  return (
    <div className={styles.layout}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "hero") {
          const asset = block.assets[0];
          return (
            <section className={styles.heroMedia} data-ratio={asset.ratio} key={key}>
              <AssetImage asset={asset} sizes="100vw" priority={index === 0} />
            </section>
          );
        }

        if (block.type === "identity-stage") {
          return (
            <section className={styles.identityStage} key={key}>
              <span className={styles.label}>Identity system</span>
              <div className={styles.identityGrid}>
                {block.assets.map((asset) => (
                  <figure key={asset.src} className={styles.logoFrame}>
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      width={1800}
                      height={700}
                      sizes="(max-width: 760px) 90vw, 70vw"
                    />
                  </figure>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "single-focus" || block.type === "cover-stage") {
          const asset = block.assets[0];
          return (
            <section
              className={`${styles.focusStage} ${block.type === "cover-stage" ? styles.coverStage : ""}`}
              key={key}
            >
              <figure className={styles.focusMedia} data-ratio={asset.ratio}>
                <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 72vw" />
              </figure>
            </section>
          );
        }

        if (block.type === "triptych") {
          return (
            <section className={styles.triptych} key={key}>
              {block.assets.map((asset) => (
                <figure key={asset.src} data-ratio={asset.ratio}>
                  <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 32vw" />
                </figure>
              ))}
            </section>
          );
        }

        if (block.type === "split") {
          return (
            <section className={styles.split} key={key}>
              {block.assets.map((asset) => (
                <figure key={asset.src} data-ratio={asset.ratio}>
                  <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 49vw" />
                </figure>
              ))}
            </section>
          );
        }

        if (block.type === "campaign-grid") {
          return (
            <section className={styles.campaignGrid} key={key}>
              {block.assets.map((asset, assetIndex) => (
                <figure
                  key={asset.src}
                  data-ratio={asset.ratio}
                  className={assetIndex === 0 ? styles.campaignLead : ""}
                >
                  <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 34vw" />
                </figure>
              ))}
            </section>
          );
        }

        if (block.type === "sequence") {
          return (
            <section className={styles.sequence} key={key}>
              {block.assets.map((asset) => (
                <figure key={asset.src} data-ratio={asset.ratio}>
                  <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 70vw" />
                </figure>
              ))}
            </section>
          );
        }

        if (block.type === "mosaic") {
          return (
            <section className={styles.mosaic} key={key}>
              {block.assets.map((asset, assetIndex) => (
                <figure
                  key={asset.src}
                  data-ratio={asset.ratio}
                  className={assetIndex === 0 ? styles.mosaicLead : ""}
                >
                  <AssetImage asset={asset} sizes="(max-width: 760px) 92vw, 48vw" />
                </figure>
              ))}
            </section>
          );
        }

        return (
          <section className={styles.feature} key={key}>
            {block.assets.map((asset) => (
              <figure key={asset.src} data-ratio={asset.ratio}>
                <AssetImage asset={asset} sizes="92vw" />
              </figure>
            ))}
          </section>
        );
      })}
    </div>
  );
}
