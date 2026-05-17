"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * PodcastSection — DD.NYC-style scroll-reveal quote.
 *
 * Words start out faded (light grey) and turn solid black as the user scrolls
 * through the section. Layout matches the reference:
 *   - Orange opening quote "  in the top-left
 *   - Long uppercase headline in a heavy weight
 *   - Orange closing quote "  in the bottom-middle
 *   - A small orange diamond "Send" badge floating in the upper area
 *   - A floating "New Project?" pill button in the bottom-right
 */

const QUOTE =
  "Innvera — Building Self-Service Print Kiosks for Every College, Every Student, Every Page.";

const PodcastSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.1"], // reveal once the section enters and finishes well before it leaves
  });

  const words = QUOTE.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* ── Floating diamond "Send" badge (upper area) ─────────────── */}
      <div
        className="absolute top-[6vw] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "clamp(110px, 11vw, 170px)",
            height: "clamp(110px, 11vw, 170px)",
            background: "#ff6b47",
            transform: "rotate(45deg)",
          }}
        >
          <span
            className="font-medium text-white"
            style={{
              transform: "rotate(-45deg)",
              fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)",
            }}
          >
            Send
          </span>
        </div>
      </div>

      {/* ── Quote block ───────────────────────────────────────────── */}
      <div
        className="relative px-[6vw] pt-[28vw] sm:pt-[20vw] md:pt-[14vw] pb-[14vw]"
        style={{ minHeight: "130vh" }}
      >
        {/* Orange opening quote mark */}
        <div
          className="select-none leading-none"
          style={{
            color: "#ff6b47",
            fontWeight: 900,
            fontSize: "clamp(3rem, 6vw, 7rem)",
            marginBottom: "1rem",
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;
        </div>

        {/* Scroll-reveal headline */}
        <h2
          className="font-bold tracking-tight"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 7rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </h2>

        {/* Orange closing quote mark (slightly offset) */}
        <div
          className="select-none leading-none"
          style={{
            color: "#ff6b47",
            fontWeight: 900,
            fontSize: "clamp(3rem, 6vw, 7rem)",
            marginTop: "0.5rem",
            marginLeft: "30%",
            fontFamily: "Georgia, serif",
          }}
        >
          &rdquo;
        </div>
      </div>

      {/* ── Floating "New Project?" pill (bottom-right) ─────────────── */}
      <a
        href="/contact"
        className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-30 inline-flex items-center justify-center rounded-full px-5 sm:px-7 py-3 sm:py-4 text-[0.7rem] sm:text-[0.8rem] font-bold tracking-wide transition-transform duration-300 hover:scale-105"
        style={{
          background: "#000",
          color: "#fff",
        }}
      >
        New Project?
      </a>
    </section>
  );
};

/**
 * Word — fades from light-grey to solid black based on scroll progress
 * over a given range. Each word reveals one after another as the user
 * scrolls through the section.
 */
const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const color = useTransform(
    progress,
    range,
    ["rgba(0,0,0,0.18)", "rgba(0,0,0,1)"]
  );
  return (
    <span className="inline-block mr-[0.25em]">
      <motion.span style={{ color }}>{children}</motion.span>
    </span>
  );
};

export default PodcastSection;
