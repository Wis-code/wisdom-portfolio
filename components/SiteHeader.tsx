import Link from "next/link";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header site-header-v7">
      <Link className="personal-wordmark" href="/" aria-label="Onyedika Wisdom Chiemeziem home">
        <span>Onyedika.</span>
        <small>Visual systems</small>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#services">Services</Link>
        <a className="nav-cta nav-cta-v7" href={site.whatsapp} target="_blank" rel="noreferrer">
          Get in touch <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
