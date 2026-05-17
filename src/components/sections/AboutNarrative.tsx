"use client";

import React, { useState } from "react";

/**
 * AboutNarrative — Shift5-style "Operational Intelligence Solutions" row.
 *
 * Three full-height cards in one row.
 * One card is highlighted with the coral accent at a time.
 * Hovering any card moves the highlight to it. (When nothing is hovered,
 * the first card stays highlighted as the default.)
 */

type Card = {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  illustration: React.ReactNode;
};

// ── Geometric illustrations (mirroring the screenshot's line-art style) ─────
// Coordinates are pre-rounded to 2 decimal places to avoid React hydration
// mismatches caused by tiny floating-point differences between server & client.
const r2 = (n: number) => Number(n.toFixed(2));
const SunburstIcon = () => (
  <svg viewBox="0 0 320 320" className="w-[55%] max-w-[260px] h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const x1 = r2(160 + Math.cos(rad) * 30);
      const y1 = r2(160 + Math.sin(rad) * 30);
      const x2 = r2(160 + Math.cos(rad) * 150);
      const y2 = r2(160 + Math.sin(rad) * 150);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
    })}
    <circle cx="160" cy="160" r="3" fill="currentColor" />
  </svg>
);

const PrismIcon = () => (
  <svg viewBox="0 0 320 320" className="w-[55%] max-w-[260px] h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* outer triangle */}
    <polygon points="160,40 290,260 30,260" />
    {/* inner cube/tetra wireframe */}
    <polygon points="160,90 240,225 80,225" />
    <line x1="160" y1="90" x2="160" y2="225" />
    <line x1="80" y1="225" x2="160" y2="260" />
    <line x1="240" y1="225" x2="160" y2="260" />
    <line x1="160" y1="225" x2="160" y2="260" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 320 320" className="w-[55%] max-w-[260px] h-auto" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="160" cy="160" r="120" />
    {/* longitude lines */}
    {Array.from({ length: 9 }).map((_, i) => (
      <ellipse key={`v-${i}`} cx="160" cy="160" rx={120 - i * 13} ry="120" />
    ))}
    {/* latitude lines */}
    {Array.from({ length: 7 }).map((_, i) => {
      const ry = 15 + i * 17;
      return <ellipse key={`h-${i}`} cx="160" cy="160" rx="120" ry={ry} />;
    })}
  </svg>
);

const cards: Card[] = [
  {
    number: "01.",
    title: "Smart Kiosks",
    description:
      "Innvera builds cloud-connected printing kiosks for colleges — giving students 24/7 print access with zero staff, zero queues, and zero hassle.",
    cta: "Explore",
    href: "/printit",
    illustration: <SunburstIcon />,
  },
  {
    number: "02.",
    title: "Self-Service Printing",
    description:
      "Students upload from any device, pay via UPI, and collect prints in seconds. No pen drives. No counters. No waiting — day or night.",
    cta: "Explore",
    href: "/start-printing",
    illustration: <PrismIcon />,
  },
  {
    number: "03.",
    title: "Partnership Models",
    description:
      "We place and manage everything at no cost to your institution, or you own the kiosk and keep 80% of every rupee students spend on printing.",
    cta: "Explore",
    href: "/models",
    illustration: <GlobeIcon />,
  },
];

const ACCENT = "#ff6b47";
const SURFACE = "#c8c8c8"; // matches the warm grey panel in the reference

const AboutNarrative = () => {
  // null = use default (card 0 highlighted). number = that card is highlighted.
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = hovered ?? 0;

  return (
    <section
      className="relative w-full"
      style={{ background: SURFACE, color: "#000", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Section heading */}
      <div className="pt-10 sm:pt-16 md:pt-24 px-5 sm:px-6 md:px-12 pb-6 sm:pb-8 md:pb-12">
        <h2
          className="font-black leading-[0.95] tracking-tight uppercase"
          style={{ fontSize: "clamp(1.6rem, 5.5vw, 4.5rem)", color: "#000" }}
        >
          Operational
          <br />
          Printing Solutions
        </h2>
      </div>

      {/* 3-column card row */}
      <div
        className="relative grid grid-cols-1 md:grid-cols-3 border-t border-black/15"
        onMouseLeave={() => setHovered(null)}
      >
        {cards.map((card, idx) => {
          const isActive = activeIndex === idx;
          return (
            <article
              key={card.number}
              onMouseEnter={() => setHovered(idx)}
              className="relative flex flex-col justify-between min-h-[62vh] sm:min-h-[78vh] md:min-h-[88vh] p-6 sm:p-8 md:p-12 transition-colors duration-500 ease-out border-t md:border-t-0 md:border-l border-black/15 first:border-l-0 first:border-t-0 cursor-pointer overflow-hidden"
              style={{
                background: isActive ? ACCENT : SURFACE,
                color: "#000",
              }}
            >
              {/* Small number top-left */}
              <span
                className="font-mono text-[0.7rem] tracking-[0.25em] uppercase"
                style={{ color: isActive ? "#000" : "rgba(0,0,0,0.45)" }}
              >
                {card.number}
              </span>

              {/* Illustration centred */}
              <div className="flex-1 flex items-center justify-center py-10 pointer-events-none" style={{ color: "#000" }}>
                {card.illustration}
              </div>

              {/* Title + description + CTA */}
              <div className="flex flex-col gap-5">
                <h3
                  className="font-bold leading-[1.05] tracking-tight"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", color: "#000" }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-mono uppercase text-[0.72rem] md:text-[0.78rem] leading-[1.7] tracking-[0.04em] max-w-[36ch]"
                  style={{ color: "#000" }}
                >
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className="self-start mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-[0.7rem] font-bold uppercase tracking-[0.25em] transition-all duration-300"
                  style={{
                    background: isActive ? "#000" : "transparent",
                    color: isActive ? ACCENT : "#000",
                    border: `1.5px solid #000`,
                  }}
                >
                  {card.cta}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AboutNarrative;
