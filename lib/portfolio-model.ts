export type ProjectType =
  | "brand-identity"
  | "campaign-series"
  | "single-design"
  | "poster"
  | "book-cover"
  | "social-set"
  | "experimental"
  | "other";

export type AssetKind =
  | "logo"
  | "pattern"
  | "mockup"
  | "presentation"
  | "single"
  | "campaign"
  | "poster"
  | "cover"
  | "social"
  | "process"
  | "visual";

export type AssetRatio = "wide" | "landscape" | "square" | "portrait";
export type AssetWeight = "hero" | "major" | "support";

export type ProjectAsset = {
  id?: string;
  src: string;
  alt: string;
  kind: AssetKind;
  ratio: AssetRatio;
  weight?: AssetWeight;
  group?: string;
  order?: number;
  width?: number;
  height?: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  type: ProjectType;
  category: string;
  description: string;
  challenge: string;
  objective: string;
  audience: string;
  services: string[];
  palette: string[];
  assets: ProjectAsset[];
  featured?: boolean;
  published: boolean;
  layoutVersion?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "brand-identity": "Brand Identity & Visual System",
  "campaign-series": "Campaign / Series",
  "single-design": "Single Design",
  poster: "Poster",
  "book-cover": "Book Cover",
  "social-set": "Social Media Set",
  experimental: "Experimental",
  other: "Other Visual Work"
};

export function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const project = value as Partial<Project>;
  return Boolean(
    project.slug &&
    project.title &&
    project.type &&
    Array.isArray(project.assets)
  );
}
