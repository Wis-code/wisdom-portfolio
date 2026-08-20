import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="about-section section-shell">
      <div className="about-glow" />
      <Reveal className="about-grid">
        <div>
          <div className="section-kicker">02 / About</div>
          <p className="about-name">{site.name}</p>
        </div>
        <div className="about-statement">
          <p>
            I design visual systems that help an idea become easier to recognize, trust and remember.
          </p>
          <p className="about-small">
            The work can be a full identity, a campaign or one carefully resolved piece. What matters is that the visual decision has a reason to exist.
          </p>
        </div>
      </Reveal>
      <div className="about-orb" aria-hidden="true" />
    </section>
  );
}
