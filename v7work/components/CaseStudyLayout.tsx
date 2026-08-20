import Image from "next/image";
import type { LayoutBlock } from "@/lib/layout-engine";

export function CaseStudyLayout({ blocks }: { blocks: LayoutBlock[] }) {
  return (
    <div className="case-layout">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === "hero") {
          const asset = block.assets[0];
          return (
            <div className="case-hero-media" key={key}>
              <Image src={asset.src} alt={asset.alt} fill sizes="100vw" priority />
            </div>
          );
        }
        if (block.type === "logo-stage") {
          return (
            <section className="case-block logo-stage" key={key}>
              <div className="case-label">The identity</div>
              {block.assets.map((asset) => (
                <div className="logo-frame" key={asset.src}>
                  <Image src={asset.src} alt={asset.alt} width={1800} height={552} sizes="80vw" />
                </div>
              ))}
            </section>
          );
        }
        if (block.type === "triptych") {
          return (
            <section className="case-block pattern-section" key={key}>
              <div className="case-label">Pattern language</div>
              <div className="pattern-triptych">
                {block.assets.map((asset, assetIndex) => (
                  <div className={`pattern-tile pattern-${assetIndex + 1}`} key={asset.src}>
                    <Image src={asset.src} alt={asset.alt} fill sizes="33vw" />
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (block.type === "split") {
          return (
            <section className="case-block application-split" key={key}>
              {block.assets.map((asset, assetIndex) => (
                <figure className={`application-card application-card-${assetIndex + 1}`} key={asset.src}>
                  <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 800px) 94vw, 50vw" />
                </figure>
              ))}
            </section>
          );
        }
        return (
          <section className={`case-block ${block.type}`} key={key}>
            {block.assets.map((asset) => (
              <figure className="case-feature" key={asset.src}>
                <Image src={asset.src} alt={asset.alt} fill sizes="90vw" />
              </figure>
            ))}
          </section>
        );
      })}
    </div>
  );
}
