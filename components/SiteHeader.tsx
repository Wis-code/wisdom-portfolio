"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    setTheme(next);
  };

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
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <a className="nav-cta nav-cta-v7" href={site.whatsapp} target="_blank" rel="noreferrer">
          Get in touch <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
