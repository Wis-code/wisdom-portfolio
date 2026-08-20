import { site } from "@/data/site";

export function FooterCTA() {
  return (
    <footer className="footer-cta">
      <div className="footer-blur footer-blur-a" />
      <div className="footer-blur footer-blur-b" />
      <div className="footer-topline">
        <span>{site.shortName}</span>
        <span>Nigeria · Available remotely</span>
      </div>
      <div className="footer-content">
        <p>Have something worth making visible?</p>
        <a href={site.whatsapp} target="_blank" rel="noreferrer">
          Let’s work on something <span>↗</span>
        </a>
      </div>
      <div className="footer-bottomline">
        <span>Brand Identity & Visual Systems</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
