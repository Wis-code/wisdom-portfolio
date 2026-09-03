"use client";

import { useEffect, useState } from "react";
import { defaultSiteProfile, site, type SiteProfile } from "@/data/site";
import { firebaseConfigured } from "@/lib/firebase-client";
import { loadSiteProfile } from "@/lib/firebase-content";
import styles from "./FooterCTA.module.css";

export function FooterCTA() {
  const [profile, setProfile] = useState<SiteProfile>(defaultSiteProfile);

  useEffect(() => {
    if (!firebaseConfigured) return;
    loadSiteProfile().then(setProfile).catch(() => undefined);
  }, []);

  const links = profile.links.filter((link) => link.enabled && link.href);
  const projectLink =
    links.find((link) => link.type === "whatsapp")?.href ?? site.whatsapp;

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.bloom} aria-hidden="true" />

      <div className={styles.topline}>
        <span>04 / Contact</span>
        <span>{profile.location}</span>
      </div>

      <div className={styles.content}>
        <p>Have a project, role or collaboration in mind?</p>
        <a className={styles.statement} href={projectLink} target="_blank" rel="noreferrer">
          Let’s <span>talk.</span> <i>↗</i>
        </a>
      </div>

      <div className={styles.contactGrid}>
        <div>
          <span className={styles.label}>Direct line</span>
          <a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a>
        </div>
        <div>
          <span className={styles.label}>Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className={styles.links}>
          <span className={styles.label}>Links</span>
          <div>
            {links.map((link) => (
              <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomline}>
        <span>{profile.shortName}</span>
        <span>Graphic Design · Brand Identity · Visual Systems</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
