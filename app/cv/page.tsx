import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { site } from "@/data/site";
import styles from "./cv.module.css";

export default function CvPage() {
  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <Link href="/">← Portfolio</Link>
        <PrintButton />
      </div>

      <article className={styles.sheet}>
        <header className={styles.header}>
          <div>
            <h1>{site.name}</h1>
            <p>Graphic Designer · Brand Identity & Visual Systems</p>
          </div>
          <div className={styles.contact}>
            <span>Lagos, Nigeria</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <a href="https://linkedin.com/in/onyedika-chiemeziem-051614266" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </header>

        <section>
          <span className={styles.label}>Profile</span>
          <p className={styles.lead}>
            Graphic designer with independent professional practice since 2022, creating visual identities,
            campaign graphics, promotional materials, presentation layouts and digital and print communication.
            Combines practical design execution with structured problem-solving to translate briefs into clear,
            consistent visual outcomes.
          </p>
        </section>

        <section>
          <span className={styles.label}>Experience</span>
          <div className={styles.roleRow}>
            <div>
              <h2>Independent Graphic Designer</h2>
              <p>Nigeria</p>
            </div>
            <strong>2022 — Present</strong>
          </div>
          <ul>
            <li>Develop visual identities, campaign graphics, promotional materials, presentation layouts and digital/print communication.</li>
            <li>Interpret client briefs, clarify messaging and translate requirements into practical visual solutions.</li>
            <li>Build reusable templates and visual systems that improve consistency across recurring materials and touchpoints.</li>
            <li>Prepare artwork for digital publishing and print production while working within real delivery constraints.</li>
          </ul>
        </section>

        <div className={styles.columns}>
          <section>
            <span className={styles.label}>Core capabilities</span>
            <p>Brand Identity · Graphic Design · Visual Systems · Layout Design · Campaign Design · Visual Communication · Presentation Design · Corporate Collateral · Print & Digital Design · Basic Video Editing</p>
          </section>

          <section>
            <span className={styles.label}>Tools</span>
            <p>Adobe Photoshop · Adobe Illustrator · Adobe InDesign · Canva · Adobe Premiere Pro (basic) · CapCut (basic)</p>
          </section>
        </div>

        <section>
          <span className={styles.label}>Education</span>
          <div className={styles.roleRow}>
            <div>
              <h2>B.Eng. Electrical Engineering</h2>
              <p>University of Nigeria, Nsukka</p>
            </div>
            <strong>In Progress</strong>
          </div>
          <p className={styles.note}>
            Engineering training strengthens analytical thinking, systems thinking, technical communication and structured problem-solving applied to design work.
          </p>
        </section>

        <section>
          <span className={styles.label}>Selected learning</span>
          <div className={styles.certifications}>
            <p><strong>The Branding Masterclass for Graphic Designers: The Entire Process</strong><br />Skillshare · Lindsay Marsh · Dec 2025</p>
            <p><strong>Logo Design Mastery: The Full Course</strong><br />Skillshare · Dec 2025</p>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Portfolio</span>
          <Link href="/">View selected work ↗</Link>
        </footer>
      </article>
    </main>
  );
}
