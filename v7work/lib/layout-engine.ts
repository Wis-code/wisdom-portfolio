import type { ProjectAsset } from "@/data/projects";

export type LayoutBlock =
  | { type: "hero"; assets: ProjectAsset[] }
  | { type: "logo-stage"; assets: ProjectAsset[] }
  | { type: "triptych"; assets: ProjectAsset[] }
  | { type: "split"; assets: ProjectAsset[] }
  | { type: "feature"; assets: ProjectAsset[] }
  | { type: "mosaic"; assets: ProjectAsset[] };

/**
 * V1 of the intelligent presentation engine.
 *
 * This intentionally uses deterministic rules first: image role, aspect ratio,
 * visual group and importance. In production, an AI classifier can enrich each
 * asset with tags/embeddings once at upload time, then this same inexpensive
 * layout engine turns those tags into a repeatable art-directed composition.
 */
export function composeProject(assets: ProjectAsset[]): LayoutBlock[] {
  const pool = [...assets];
  const blocks: LayoutBlock[] = [];

  const take = (predicate: (asset: ProjectAsset) => boolean, count = 1) => {
    const found: ProjectAsset[] = [];
    for (let i = pool.length - 1; i >= 0 && found.length < count; i -= 1) {
      if (predicate(pool[i])) found.unshift(...pool.splice(i, 1));
    }
    return found;
  };

  const hero = take((asset) => asset.weight === "hero", 1);
  if (hero.length) blocks.push({ type: "hero", assets: hero });

  const logos = take((asset) => asset.kind === "logo", 2);
  if (logos.length) blocks.push({ type: "logo-stage", assets: logos });

  const patterns = take((asset) => asset.kind === "pattern", 3);
  if (patterns.length >= 2) blocks.push({ type: "triptych", assets: patterns });
  else if (patterns.length) blocks.push({ type: "feature", assets: patterns });

  const majorApplications = take(
    (asset) => asset.kind === "mockup" && asset.weight === "major",
    4
  );
  for (let i = 0; i < majorApplications.length; i += 2) {
    const pair = majorApplications.slice(i, i + 2);
    blocks.push({ type: pair.length === 2 ? "split" : "feature", assets: pair });
  }

  while (pool.length) {
    const next = pool.splice(0, Math.min(3, pool.length));
    blocks.push({ type: next.length > 1 ? "mosaic" : "feature", assets: next });
  }

  return blocks;
}
