import type {
  AssetKind,
  AssetRatio,
  AssetWeight,
  ProjectAsset,
  ProjectType
} from "@/lib/portfolio-model";

export function classifyRatio(width: number, height: number): AssetRatio {
  const ratio = width / Math.max(height, 1);
  if (ratio > 2.15) return "wide";
  if (ratio > 1.12) return "landscape";
  if (ratio < 0.82) return "portrait";
  return "square";
}

export function inferAssetKind(name: string, projectType?: ProjectType): AssetKind {
  const lower = name.toLowerCase();

  if (/(logo|wordmark|mark|monogram)/.test(lower)) return "logo";
  if (/(pattern|texture|motif)/.test(lower)) return "pattern";
  if (/(mockup|mock-up|application)/.test(lower)) return "mockup";
  if (/(presentation|deck|brandbook|brand-book)/.test(lower)) return "presentation";
  if (/(book|cover)/.test(lower)) return "cover";
  if (/(poster)/.test(lower)) return "poster";
  if (/(carousel|social|instagram|post)/.test(lower)) return "social";
  if (/(campaign|series)/.test(lower)) return "campaign";
  if (/(sketch|process|wireframe|draft)/.test(lower)) return "process";
  if (/(flyer|design|artwork)/.test(lower)) return "single";

  if (projectType === "book-cover") return "cover";
  if (projectType === "poster") return "poster";
  if (projectType === "campaign-series") return "campaign";
  if (projectType === "social-set") return "social";
  if (projectType === "single-design") return "single";

  return "visual";
}

export function inferWeight(
  kind: AssetKind,
  index: number,
  total: number
): AssetWeight {
  if (index === 0) return "hero";
  if (kind === "logo" || kind === "mockup" || kind === "cover") return "major";
  if (total <= 3 && index === 1) return "major";
  return "support";
}

export function assetGroup(kind: AssetKind): string {
  if (kind === "logo") return "identity";
  if (kind === "pattern") return "patterns";
  if (kind === "mockup") return "applications";
  if (kind === "campaign" || kind === "social") return "series";
  if (kind === "process") return "process";
  if (kind === "presentation") return "presentation";
  return "work";
}

export async function analyseImageFile(
  file: File,
  projectType: ProjectType,
  index: number,
  total: number
): Promise<Omit<ProjectAsset, "src" | "alt"> & { width: number; height: number }> {
  const { width, height } = await readImageSize(file);
  const kind = inferAssetKind(file.name, projectType);

  return {
    id: crypto.randomUUID(),
    kind,
    ratio: classifyRatio(width, height),
    weight: inferWeight(kind, index, total),
    group: assetGroup(kind),
    order: index,
    width,
    height
  };
}

function readImageSize(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    const src = URL.createObjectURL(file);

    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(src);
    };

    image.onerror = () => {
      URL.revokeObjectURL(src);
      reject(new Error(`Could not read ${file.name}`));
    };

    image.src = src;
  });
}
