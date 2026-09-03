"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followDevice = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("portfolio-theme-v2")) return;
      const next = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", followDevice);
    return () => media.removeEventListener("change", followDevice);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme-v2", next);
    setTheme(next);
  };

  return (
    <header className="site-header site-header-v7">
      <Link className="personal-wordmark" href="/" aria-label="Onyedika Wisdom Chiemeziem home">
        <span>Onyedika.</span>
        <small>Graphic designer</small>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/cv">CV</Link>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          <span aria-hidden="true">{theme === "light" ? "●" : "○"}</span>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <Link className="nav-cta nav-cta-v7" href="/#contact">
          Contact <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
