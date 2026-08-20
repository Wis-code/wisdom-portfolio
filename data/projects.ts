import type { Project } from "@/lib/portfolio-model";

export type { Project, ProjectAsset } from "@/lib/portfolio-model";

export const projects: Project[] = [
  {
    slug: "deras-decor-dress",
    title: "Dera’s Decor & Dress",
    client: "Dera’s Decor & Dress",
    year: "2025",
    type: "brand-identity",
    category: "Brand Identity & Visual System",
    description:
      "A flexible identity for an emerging online clothing brand serving students and digital-first shoppers across male and female fashion.",
    challenge:
      "Dera’s was preparing to launch with no mature brand system, no tagline and no established visual language. The identity needed to feel recognizable across apparel, accessories, packaging and digital touchpoints without becoming visually noisy.",
    objective:
      "Create a distinctive and adaptable visual foundation built around the brand’s youthful online audience and its emphasis on quality, value and excellence.",
    audience: "Students and online fashion shoppers.",
    services: [
      "Identity design",
      "Logo system",
      "Pattern language",
      "Brand applications"
    ],
    palette: ["#6B0C83", "#B315C8", "#171217", "#F1EEDB"],
    featured: true,
    published: true,
    layoutVersion: 2,
    assets: [
      {
        id: "deras-scarf",
        src: "/media/deras-scarf.webp",
        alt: "Dera’s patterned silk scarf mockup",
        kind: "mockup",
        ratio: "landscape",
        weight: "hero",
        group: "applications",
        order: 0
      },
      {
        id: "deras-logo-black",
        src: "/media/deras-logo-black.webp",
        alt: "Dera’s primary black wordmark",
        kind: "logo",
        ratio: "wide",
        weight: "major",
        group: "identity",
        order: 1
      },
      {
        id: "deras-logo-purple",
        src: "/media/deras-logo-purple.webp",
        alt: "Dera’s purple wordmark",
        kind: "logo",
        ratio: "wide",
        weight: "support",
        group: "identity",
        order: 2
      },
      {
        id: "deras-pattern-gradient",
        src: "/media/deras-pattern-gradient.webp",
        alt: "Dera’s gradient monogram pattern",
        kind: "pattern",
        ratio: "square",
        weight: "major",
        group: "patterns",
        order: 3
      },
      {
        id: "deras-pattern-purple",
        src: "/media/deras-pattern-purple.webp",
        alt: "Dera’s purple monogram pattern",
        kind: "pattern",
        ratio: "square",
        weight: "support",
        group: "patterns",
        order: 4
      },
      {
        id: "deras-pattern-cream",
        src: "/media/deras-pattern-cream.webp",
        alt: "Dera’s cream monogram pattern",
        kind: "pattern",
        ratio: "square",
        weight: "support",
        group: "patterns",
        order: 5
      },
      {
        id: "deras-hat",
        src: "/media/deras-hat.webp",
        alt: "Dera’s wool hat mockup",
        kind: "mockup",
        ratio: "landscape",
        weight: "major",
        group: "applications",
        order: 6
      },
      {
        id: "deras-label",
        src: "/media/deras-label.webp",
        alt: "Dera’s clothing label mockup",
        kind: "mockup",
        ratio: "landscape",
        weight: "major",
        group: "applications",
        order: 7
      },
      {
        id: "deras-handbag",
        src: "/media/deras-handbag.webp",
        alt: "Dera’s black handbag mockup",
        kind: "mockup",
        ratio: "landscape",
        weight: "major",
        group: "applications",
        order: 8
      },
      {
        id: "deras-shirt-mannequin",
        src: "/media/deras-shirt-mannequin.webp",
        alt: "Dera’s patterned shirt on mannequin",
        kind: "mockup",
        ratio: "landscape",
        weight: "major",
        group: "applications",
        order: 9
      },
      {
        id: "deras-mannequin",
        src: "/media/deras-mannequin.webp",
        alt: "Dera’s patterned apparel on mannequin",
        kind: "mockup",
        ratio: "landscape",
        weight: "support",
        group: "applications",
        order: 10
      },
      {
        id: "deras-presentation",
        src: "/media/deras-presentation.webp",
        alt: "Dera’s original identity presentation",
        kind: "presentation",
        ratio: "portrait",
        weight: "support",
        group: "presentation",
        order: 11
      }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPublishedProjects() {
  return projects
    .filter((project) => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}
