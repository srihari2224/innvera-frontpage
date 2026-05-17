"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { HeroSvgs } from "./HeroSvgs";
import IntroOverlay from "../IntroOverlay";
import VerticalLines from "../VerticalLines";

// ---------------------------------------------------------------------------
// Parallelogram (slanted "I") clip-path helper
// ---------------------------------------------------------------------------
//
// The shape is a right-leaning parallelogram — a single diagonal pillar
// with ~12° tilt. No top/bottom serif caps.
//
// Polygon points (clockwise):
//   TL (top-left)  → TR (top-right) → BR (bottom-right) → BL (bottom-left)
//
// Skew offset determines the lean: positive = leans right.
// For a typical 16:9 viewport: tan(12°) × (height/width) ≈ 0.2126 × 0.5625 ≈ 12%
//
// At progress 0 → small centered pillar (3% halfWidth, 40vh tall) — sits behind INNVERA text
// At progress 1 → covers full screen from all four sides
//
function buildParallelogramClipPath(progress: number): string {
  // Lerp helper
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Ease-out cubic
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const p = ease(Math.min(Math.max(progress, 0), 1));

  // Horizontal: starts as narrow pillar (3%), expands to full frame (65%)
  const halfWidth = lerp(3, 65, p);

  // Vertical: starts centered (30%–70%), expands past viewport edges (-2%–102%)
  const topY = lerp(30, -2, p);
  const bottomY = lerp(70, 102, p);

  // Skew offset (% of element width) — left-leaning tilt
  const skewOffset = -4.2;

  const TL_x = 50 - halfWidth - skewOffset;
  const TR_x = 50 + halfWidth - skewOffset;
  const BR_x = 50 + halfWidth + skewOffset;
  const BL_x = 50 - halfWidth + skewOffset;

  return [
    `${TL_x}% ${topY}%`,    // top-left
    `${TR_x}% ${topY}%`,    // top-right
    `${BR_x}% ${bottomY}%`, // bottom-right
    `${BL_x}% ${bottomY}%`, // bottom-left
  ].join(", ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Tall outer container creates the pin "scroll room"
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll progress with a spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Clip-path drives from 0 → full expand over first 75% of scroll
  const clipPathProgress = useTransform(smoothProgress, [0, 0.75], [0, 1]);

  // INNVERA text: fades in instantly on mount, fades out as video expands
  const textOpacity = useTransform(smoothProgress, [0, 0.05, 0.45, 0.65], [1, 0.2, 0, 0]);
  const textY = useTransform(smoothProgress, [0, 0.08], ["20px", "0px"]);

  // Subtle video scale: starts zoomed, releases on scroll
  const videoScale = useTransform(smoothProgress, [0, 0.75], [1.06, 1]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    // Outer: tall container — creates scroll room for pin animation
    <div ref={containerRef} className="relative" style={{ height: "350vh" }}>
      {/* Inner: sticky full-viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

        {/* ── Black background ── */}
        <div className="absolute inset-0 z-[0] bg-black" />

        {/* ── Video revealed through slanted parallelogram ── */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            scale: videoScale,
            clipPath: useTransform(
              clipPathProgress,
              (p) => `polygon(${buildParallelogramClipPath(p)})`
            ),
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            src="/assets/videos/intro.mp4"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── INNVERA text — visible on load, fades as video reveals ── */}
        <motion.div
          className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="relative text-center select-none w-full overflow-hidden">
            <motion.div
              className="relative z-30 flex justify-center items-center"
              variants={staggerContainer(0.06, 0.3)}
              initial="hidden"
              animate="visible"
            >
              {["I", "N", "N", "V", "E", "R", "A"].map((char, i) => (
                <motion.span
                  key={i}
                  className="text-white inline-block"
                  style={{
                    fontSize: "clamp(4rem, 16vw, 20rem)",
                    fontWeight: 600,
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    mixBlendMode: "difference",
                  }}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: {
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll hint (fades out quickly) ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 pointer-events-none"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
          }}
        >
          <span className="text-white uppercase tracking-[0.25em] text-[0.6rem] font-semibold">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-white origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ── Tagline Text ── */}
        <motion.div
          className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.08, 0.45, 0.6], [0, 1, 1, 0]),
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 400 50"
            className="w-[200px] md:w-[300px] h-auto text-white"
          >
            <text x="50%" y="50%" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="Georgia, serif" fontStyle="italic">Innovate & Automate with Us</text>
          </svg>
        </motion.div>

        {/* ── Floating SVGs ── */}
        <HeroSvgs />

        {/* ── Intro Overlay (fires once on page load) ── */}
        <IntroOverlay />

        {/* ── Vertical Lines ── */}
        <VerticalLines />
      </div>
    </div>
  );
};

export default Hero;
