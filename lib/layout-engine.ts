import type { Project, ProjectAsset } from "@/lib/portfolio-model";

export type LayoutBlock =
  | { type: "hero"; assets: ProjectAsset[] }
  | { type: "identity-stage"; assets: ProjectAsset[] }
  | { type: "triptych"; assets: ProjectAsset[] }
  | { type: "split"; assets: ProjectAsset[] }
  | { type: "feature"; assets: ProjectAsset[] }
  | { type: "mosaic"; assets: ProjectAsset[] }
  | { type: "campaign-grid"; assets: ProjectAsset[] }
  | { type: "single-focus"; assets: ProjectAsset[] }
  | { type: "cover-stage"; assets: ProjectAsset[] }
  | { type: "sequence"; assets: ProjectAsset[] };

type Pool = ProjectAsset[];

function orderedAssets(project: Project): ProjectAsset[] {
  return [...project.assets].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

function take(pool: Pool, predicate: (asset: ProjectAsset) => boolean, count = 1) {
  const found: ProjectAsset[] = [];
  for (let index = 0; index < pool.length && found.length < count; ) {
    if (predicate(pool[index])) {
      found.push(...pool.splice(index, 1));
    } else {
      index += 1;
    }
  }
  return found;
}

function takeHero(pool: Pool) {
  return (
    take(pool, (asset) => asset.weight === "hero", 1) ||
    take(pool, () => true, 1)
  );
}

function flushMosaic(pool: Pool, blocks: LayoutBlock[]) {
  while (pool.length) {
    const next = pool.splice(0, Math.min(3, pool.length));
    blocks.push({
      type: next.length === 1 ? "feature" : "mosaic",
      assets: next
    });
  }
}

function composeBrandIdentity(project: Project): LayoutBlock[] {
  const pool = orderedAssets(project);
  const blocks: LayoutBlock[] = [];

  const hero = take(pool, (asset) => asset.weight === "hero", 1);
  if (hero.length) blocks.push({ type: "hero", assets: hero });

  const logos = take(pool, (asset) => asset.kind === "logo", 3);
  if (logos.length) blocks.push({ type: "identity-stage", assets: logos });

  const patterns = take(pool, (asset) => asset.kind === "pattern", 3);
  if (patterns.length >= 2) {
    blocks.push({ type: "triptych", assets: patterns });
  } else if (patterns.length) {
    blocks.push({ type: "feature", assets: patterns });
  }

  const majorApplications = take(
    pool,
    (asset) => asset.kind === "mockup" && asset.weight !== "support",
    6
  );

  for (let index = 0; index < majorApplications.length; index += 2) {
    const pair = majorApplications.slice(index, index + 2);
    blocks.push({
      type: pair.length === 2 ? "split" : "feature",
      assets: pair
    });
  }

  flushMosaic(pool, blocks);
  return blocks;
}

function composeCampaign(project: Project): LayoutBlock[] {
  const pool = orderedAssets(project);
  const blocks: LayoutBlock[] = [];

  const hero = take(pool, (asset) => asset.weight === "hero", 1);
  if (hero.length) blocks.push({ type: "hero", assets: hero });

  while (pool.length) {
    const batch = pool.splice(0, Math.min(6, pool.length));
    blocks.push({
      type: batch.length >= 4 ? "campaign-grid" : batch.length > 1 ? "sequence" : "feature",
      assets: batch
    });
  }

  return blocks;
}

function composeSingle(project: Project): LayoutBlock[] {
  const pool = orderedAssets(project);
  if (!pool.length) return [];

  const primary = take(pool, (asset) => asset.weight === "hero", 1);
  const first = primary.length ? primary : pool.splice(0, 1);

  const blocks: LayoutBlock[] = [{ type: "single-focus", assets: first }];

  if (pool.length) {
    blocks.push({
      type: pool.length > 2 ? "mosaic" : "sequence",
      assets: pool.splice(0)
    });
  }

  return blocks;
}

function composeCover(project: Project): LayoutBlock[] {
  const pool = orderedAssets(project);
  const cover = take(pool, (asset) => asset.kind === "cover" || asset.weight === "hero", 1);
  const first = cover.length ? cover : pool.splice(0, 1);

  const blocks: LayoutBlock[] = [];
  if (first.length) blocks.push({ type: "cover-stage", assets: first });

  if (pool.length) {
    blocks.push({
      type: pool.length > 2 ? "mosaic" : "split",
      assets: pool.splice(0)
    });
  }

  return blocks;
}

export function composeProject(project: Project): LayoutBlock[] {
  if (!project.assets.length) return [];

  switch (project.type) {
    case "brand-identity":
      return composeBrandIdentity(project);
    case "campaign-series":
    case "social-set":
      return composeCampaign(project);
    case "single-design":
    case "poster":
      return composeSingle(project);
    case "book-cover":
      return composeCover(project);
    case "experimental":
    case "other": {
      const pool = orderedAssets(project);
      const blocks: LayoutBlock[] = [];
      const hero = take(pool, (asset) => asset.weight === "hero", 1);
      if (hero.length) blocks.push({ type: "hero", assets: hero });
      flushMosaic(pool, blocks);
      return blocks;
    }
  }
}
