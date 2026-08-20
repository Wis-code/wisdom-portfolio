"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

function DesignAtmosphere() {
  return (
    <div className="design-atmosphere hero-v7-atmosphere" aria-hidden="true">
      <div className="design-panel design-panel-layers">
        <span className="panel-caption">Layers</span>
        <span className="layer-line layer-line-a"><i /><b /></span>
        <span className="layer-line layer-line-b"><i /><b /></span>
        <span className="layer-line layer-line-c"><i /><b /></span>
      </div>

      <div className="design-transform-box">
        <i className="handle h1" /><i className="handle h2" /><i className="handle h3" /><i className="handle h4" />
        <span className="transform-cross">+</span>
      </div>

      <svg className="design-bezier" viewBox="0 0 330 190" fill="none">
        <path d="M20 145C78 38 188 32 310 118" stroke="currentColor" strokeWidth="1" />
        <path d="M20 145L98 45M310 118L238 35" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="20" cy="145" r="4" /><circle cx="98" cy="45" r="3" />
        <circle cx="310" cy="118" r="4" /><circle cx="238" cy="35" r="3" />
      </svg>

      <div className="design-wire-orb">
        <span className="orb-ring ring-a" />
        <span className="orb-ring ring-b" />
        <span className="orb-ring ring-c" />
      </div>

      <div className="design-guides"><span /><span /><span /></div>

      <div className="design-ruler design-ruler-top">
        <span>0</span><span>240</span><span>480</span><span>720</span><span>960</span>
      </div>

      <div className="design-properties-panel">
        <span className="properties-title">Properties</span>
        <span className="properties-row"><i /> <b /></span>
        <span className="properties-row"><i /> <b /></span>
        <span className="properties-row"><i /> <b /></span>
      </div>

      <svg className="neon-stream neon-stream-a" viewBox="0 0 900 360" fill="none">
        <path d="M-40 290C130 330 180 90 390 128C590 164 596 314 950 82" />
      </svg>
      <svg className="neon-stream neon-stream-b" viewBox="0 0 720 260" fill="none">
        <path d="M-20 210C140 62 270 248 420 142C520 72 560 24 760 54" />
      </svg>
    </div>
  );
}

function SoftwareBadges() {
  return (
    <div className="software-badges" aria-label="Design software">
      <span className="software-badge software-ps" title="Adobe Photoshop">Ps</span>
      <span className="software-badge software-ai" title="Adobe Illustrator">Ai</span>
      <span className="software-badge software-id" title="Adobe InDesign">Id</span>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--mx", x.toFixed(3));
        node.style.setProperty("--my", y.toFixed(3));
      });
    };
    node.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={ref} className="hero-v7" aria-labelledby="hero-title">
      <div className="hero-v7-bloom hero-v7-bloom-a" aria-hidden="true" />
      <div className="hero-v7-bloom hero-v7-bloom-b" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <DesignAtmosphere />
      <div className="hero-v7-frame" aria-hidden="true" />

      <div className="hero-v7-shell">
        <div className="hero-v7-copy">
          <h1 id="hero-title">
            <span>Onyedika Wisdom</span>
            <span>Chiemeziem</span>
          </h1>
          <p className="hero-v7-role">{site.role}</p>

          <div className="hero-v7-words" aria-label="Identity, Systems, Direction">
            <span>Identity</span><i />
            <span>Systems</span><i />
            <span>Direction</span>
          </div>

          <SoftwareBadges />

          <a className="hero-v7-action" href={site.whatsapp} target="_blank" rel="noreferrer">
            Start a Project <span>↗</span>
          </a>
        </div>

        <div className="portrait-stage-v7" aria-hidden="false">
          <div className="portrait-v7-backlight" aria-hidden="true" />
          <div className="portrait-v7-echo" aria-hidden="true" />
          <Image
            className="hero-portrait-v7"
            src="/media/portrait-master.png"
            alt="Onyedika Wisdom Chiemeziem"
            width={1122}
            height={1402}
            priority
            quality={100}
            sizes="(max-width: 760px) 96vw, (max-width: 1100px) 55vw, 52vw"
          />
          <div className="portrait-v7-lightwash" aria-hidden="true" />
          <div className="portrait-v7-haze" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
