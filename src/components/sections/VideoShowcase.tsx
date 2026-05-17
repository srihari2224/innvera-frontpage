"use client";

import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Hover-to-unmute: holds a ref + handlers for a video element.
// Default muted; pointer-enter unmutes (best-effort), pointer-leave mutes.
const useHoverAudio = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const onEnter = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.9;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => { v.muted = true; });
  }, []);
  const onLeave = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
  }, []);
  return { ref, onEnter, onLeave } as const;
};

/**
 * VideoShowcase — Editorial film-still layout (reference: studio site).
 *
 *  Two sections, both on full black:
 *
 *   1) "WE — CAN — HANDLE — EVERYTHING — YES, EVERYTHING."
 *        Massive centred video framed with corner brackets, label row
 *        running horizontally through the vertical middle of the video.
 *        Two-column body copy below.
 *
 *   2) Mirror — big editorial text on the left, smaller framed video on
 *        the right with a tiny caption strip below it.
 *
 *   3) Closing single-video strip ("ENGINEERED FOR EVERY CAMPUS").
 *
 *  Videos used (existing in /public/assets/videos/):
 *    - motion_mirror   → Section 1 main
 *    - novra.design    → Section 2 side
 *    - wisperstudios   → Section 3 strip
 *    (nazmul.motion is now used inside the Header menu.)
 */

const V_MAIN  = "/assets/videos/motion_mirror_ba6085b744c54245a8cd5dfda1bdd096.mp4";
const V_SIDE  = "/assets/videos/novra.design_d1380f00fdb14ab6a832eda813d1fac0.mp4";
const V_STRIP = "/assets/videos/wisperstudios_2e2b25830a2a4e678f493d0420d8be35.mp4";

// ── Reusable corner brackets ───────────────────────────────────────────────
const Brackets = ({ color = "rgba(255,255,255,0.45)" }: { color?: string }) => (
  <>
    {([
      ["top-0 left-0", "borderTop", "borderLeft"],
      ["top-0 right-0", "borderTop", "borderRight"],
      ["bottom-0 left-0", "borderBottom", "borderLeft"],
      ["bottom-0 right-0", "borderBottom", "borderRight"],
    ] as const).map(([pos, s1, s2], i) => (
      <span
        key={i}
        className={`absolute ${pos} w-5 h-5 pointer-events-none z-30`}
        style={{ [s1]: `1px solid ${color}`, [s2]: `1px solid ${color}` } as React.CSSProperties}
      />
    ))}
  </>
);

// ── Animated travel icon (for the "YES, EVERYTHING." row) ─────────────────
const TravelIcon = () => (
  <motion.svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: [0, 4, 0, -4, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M3 12l3 1 5-9 3 0-2 9 8 0 1-2 2 0-3 8-19-2-1-3 3-2z" transform="rotate(20 12 12)" />
  </motion.svg>
);

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ Section 1                                                              ║
// ╚══════════════════════════════════════════════════════════════════════╝
const SectionHandle = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle video zoom-out as you scroll past
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.08]);
  const audio = useHoverAudio();

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-14 sm:py-24 md:py-32 px-4 sm:px-5 md:px-10 overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* ── Big video frame with corner brackets ────────────────────── */}
      <div className="relative max-w-[1400px] mx-auto">
        <div
          className="relative aspect-[16/10] sm:aspect-[16/8.5] overflow-hidden"
          onMouseEnter={audio.onEnter}
          onMouseLeave={audio.onLeave}
        >
          <Brackets color="rgba(255,255,255,0.4)" />
          <motion.video
            ref={audio.ref}
            src={V_MAIN}
            autoPlay
            muted
            loop
            playsInline
            style={{ scale }}
            className="w-full h-full object-cover"
          />
          {/* Slight vignette so the labels read */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)" }} />
        </div>

        {/* ── Horizontal label row that overlaps the video at its centre ── */}
        <div
          className="absolute left-0 right-0 z-40 grid grid-cols-2 sm:grid-cols-5 gap-y-2 items-center text-center px-2 md:px-8 pointer-events-none"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          {([
            "WE",
            "CAN",
            "HANDLE",
            "EVERYTHING.",
            "YES, EVERYTHING.",
          ] as const).map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-flex items-center justify-center gap-2 font-bold tracking-[0.06em] uppercase"
              style={{
                fontSize: "clamp(0.55rem, 0.95vw, 1rem)",
                color: "#fff",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {label}
              {i === 4 && <TravelIcon />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Two-column body block under the video ───────────────────── */}
      <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-normal leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.6rem, 2.8vw, 3rem)", color: "#fff" }}
        >
          Our work spans technologies, formats, and stages, shaped by the ambition of the moment.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="leading-[1.55] text-white/85 self-end"
          style={{ fontSize: "clamp(1rem, 1.15vw, 1.25rem)" }}
        >
          We combine specialisations in holographic technology, LED, unreal workflows,
          lighting, stage design, projection, sound and VFX to create stunning installations
          and experiences — purpose-built for every campus we deploy in.
        </motion.p>
      </div>
    </section>
  );
};

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ Section 2 — mirror layout: big text left, video right                ║
// ╚══════════════════════════════════════════════════════════════════════╝
const SectionPipelines = () => {
  const audio = useHoverAudio();
  return (
    <section
      className="relative bg-black text-white py-14 sm:py-24 md:py-32 px-4 sm:px-5 md:px-10 overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* LEFT — big editorial copy */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-7 font-normal leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: "#fff" }}
        >
          We&apos;re also a leading AI studio with a cutting-edge specialism in digital recreations and real-time pipelines.
        </motion.h2>

        {/* RIGHT — small framed video + caption */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-5"
        >
          <div
            className="relative aspect-[4/3] overflow-hidden"
            onMouseEnter={audio.onEnter}
            onMouseLeave={audio.onLeave}
          >
            <Brackets />
            <video
              ref={audio.ref}
              src={V_SIDE}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="mt-3 font-mono uppercase tracking-[0.25em]"
            style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.78rem)", color: "rgba(255,255,255,0.85)" }}
          >
            Integrated Real-Time Pipelines
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ╔══════════════════════════════════════════════════════════════════════╗
// ║ Section 3 — closing wide strip                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝
const SectionStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const clipTop = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [30, 0, 0, 30]);
  const clipBot = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [30, 0, 0, 30]);
  const clipPath = useTransform(
    [clipTop, clipBot],
    ([t, b]) => `inset(${t}% 0% ${b}% 0%)`
  );
  const audioStrip = useHoverAudio();

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-12 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10 overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-[1400px] mx-auto mb-8 md:mb-14 flex items-end justify-between gap-6">
        <h2
          className="font-black uppercase leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)" }}
        >
          Engineered for <br /> <span style={{ color: "#FF6B47" }}>Every Campus.</span>
        </h2>
        <p
          className="hidden md:block max-w-[26ch] text-white/65 leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1vw, 1.05rem)" }}
        >
          Cloud-connected kiosks built for thousands of students — running 24/7, every day of the year.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div
          className="relative aspect-[16/6] overflow-hidden"
          onMouseEnter={audioStrip.onEnter}
          onMouseLeave={audioStrip.onLeave}
        >
          <Brackets color="rgba(255,255,255,0.4)" />
          <motion.div className="absolute inset-0" style={{ clipPath }}>
            <video
              ref={audioStrip.ref}
              src={V_STRIP}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VideoShowcase = () => (
  <>
    <SectionHandle />
    <SectionPipelines />
    <SectionStrip />
  </>
);

export default VideoShowcase;
