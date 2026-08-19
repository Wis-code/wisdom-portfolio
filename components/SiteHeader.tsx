import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header site-header-v7">
      <Link className="brand-mark" href="/" aria-label="Onyedika Wisdom Chiemeziem home">
        <Image src="/media/wiscode-mark.png" alt="Wiscode" width={34} height={34} priority />
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <a className="nav-cta nav-cta-v7" href={site.whatsapp} target="_blank" rel="noreferrer">
          Get in touch <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
