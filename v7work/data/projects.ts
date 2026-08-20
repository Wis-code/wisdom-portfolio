export type ProjectAsset = {
  src: string;
  alt: string;
  kind: "logo" | "pattern" | "mockup" | "presentation" | "single" | "campaign";
  ratio: "wide" | "square" | "landscape" | "portrait";
  weight?: "hero" | "major" | "support";
  group?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  objective: string;
  audience: string;
  services: string[];
  palette: string[];
  assets: ProjectAsset[];
  published: boolean;
};

export const projects: Project[] = [
  {
    slug: "deras-decor-dress",
    title: "Dera’s Decor & Dress",
    client: "Dera’s Decor & Dress",
    year: "2025",
    category: "Brand Identity & Visual System",
    description: "A flexible identity for an emerging online clothing brand serving students and digital-first shoppers across male and female fashion.",
    challenge: "Dera’s was preparing to launch with no mature brand system, no tagline and no established visual language. The identity needed to feel recognizable across apparel, accessories, packaging and digital touchpoints without becoming visually noisy.",
    objective: "Create a distinctive and adaptable visual foundation built around the brand’s youthful online audience and its emphasis on quality, value and excellence.",
    audience: "Students and online fashion shoppers.",
    services: ["Identity design", "Logo system", "Pattern language", "Brand applications"],
    palette: ["#6B0C83", "#B315C8", "#171217", "#F1EEDB"],
    published: true,
    assets: [
      { src: "/media/deras-scarf.webp", alt: "Dera’s patterned silk scarf mockup", kind: "mockup", ratio: "landscape", weight: "hero", group: "applications" },
      { src: "/media/deras-logo-black.webp", alt: "Dera’s primary black wordmark", kind: "logo", ratio: "wide", weight: "major", group: "identity" },
      { src: "/media/deras-logo-purple.webp", alt: "Dera’s purple wordmark", kind: "logo", ratio: "wide", weight: "support", group: "identity" },
      { src: "/media/deras-pattern-gradient.webp", alt: "Dera’s gradient monogram pattern", kind: "pattern", ratio: "square", weight: "major", group: "patterns" },
      { src: "/media/deras-pattern-purple.webp", alt: "Dera’s purple monogram pattern", kind: "pattern", ratio: "square", weight: "support", group: "patterns" },
      { src: "/media/deras-pattern-cream.webp", alt: "Dera’s cream monogram pattern", kind: "pattern", ratio: "square", weight: "support", group: "patterns" },
      { src: "/media/deras-hat.webp", alt: "Dera’s wool hat mockup", kind: "mockup", ratio: "landscape", weight: "major", group: "applications" },
      { src: "/media/deras-label.webp", alt: "Dera’s clothing label mockup", kind: "mockup", ratio: "landscape", weight: "major", group: "applications" },
      { src: "/media/deras-handbag.webp", alt: "Dera’s black handbag mockup", kind: "mockup", ratio: "landscape", weight: "major", group: "applications" },
      { src: "/media/deras-shirt-mannequin.webp", alt: "Dera’s patterned shirt on mannequin", kind: "mockup", ratio: "landscape", weight: "major", group: "applications" },
      { src: "/media/deras-mannequin.webp", alt: "Dera’s patterned apparel on mannequin", kind: "mockup", ratio: "landscape", weight: "support", group: "applications" },
      { src: "/media/deras-presentation.webp", alt: "Dera’s original identity presentation", kind: "presentation", ratio: "portrait", weight: "support", group: "presentation" }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
