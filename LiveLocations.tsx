"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { smoothEase, snappyEase } from "@/lib/animations";

// ─── Data ────────────────────────────────────────────────────────────────────
const locations = [
  {
    id: "nit-calicut",
    index: "01",
    name: "NIT Calicut",
    fullName: "National Institute of Technology Calicut",
    city: "Calicut",
    state: "Kerala",
    type: "NIT",
    tier: "Tier 1 — National Institute",
    since: "2024",
    // Geographically accurate: Kozhikode 75.78°E 11.26°N → SVG (144.8, 436.1)
    mapX: 144.8,
    mapY: 436.1,
    students: "8,000+",
    dailyPrints: "420",
    accent: "#ff6b47",
  },
  {
    id: "iiitdm-kurnool",
    index: "02",
    name: "IIITDM Kurnool",
    fullName: "Indian Institute of Information Technology Design and Manufacturing Kurnool",
    city: "Kurnool",
    state: "Andhra Pradesh",
    type: "IIIT",
    tier: "Tier 1 — Central Institute",
    since: "2024",
    // Kurnool 78.05°E 15.83°N → SVG (171.9, 367.6)
    mapX: 171.9,
    mapY: 367.6,
    students: "2,500+",
    dailyPrints: "280",
    accent: "#ff6b47",
  },
  {
    id: "rce-kurnool",
    index: "03",
    name: "Ravindra College of Engineering",
    fullName: "Ravindra College of Engineering for Women, Kurnool",
    city: "Kurnool",
    state: "Andhra Pradesh",
    type: "Engineering College",
    tier: "Autonomous — Affiliated JNTUA",
    since: "2025",
    // Also Kurnool — offset slightly for visual clarity
    mapX: 178.9,
    mapY: 373.6,
    students: "1,800+",
    dailyPrints: "210",
    accent: "#ff6b47",
  },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// ─── Pulsing map dot ─────────────────────────────────────────────────────────
const MapDot = ({
  x, y, active, onClick, index,
}: {
  x: number; y: number; active: boolean; onClick: () => void; index: number;
}) => (
  <g
    onClick={onClick}
    style={{ cursor: "pointer" }}
    transform={`translate(${x}, ${y})`}
  >
    {/* Outer pulse ring */}
    <motion.circle
      r={active ? 18 : 12}
      fill="none"
      stroke="#ff6b47"
      strokeWidth="0.5"
      opacity={active ? 0.3 : 0.15}
      animate={{ r: active ? [12, 22, 12] : [8, 14, 8], opacity: [0.3, 0, 0.3] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Secondary pulse */}
    <motion.circle
      r={8}
      fill="none"
      stroke="#ff6b47"
      strokeWidth="0.8"
      opacity={active ? 0.6 : 0.25}
      animate={{ r: active ? [6, 12, 6] : [4, 9, 4], opacity: active ? [0.6, 0.1, 0.6] : [0.25, 0.05, 0.25] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    {/* Core dot */}
    <motion.circle
      r={active ? 5 : 3.5}
      fill="#ff6b47"
      animate={{ r: active ? 5 : 3.5 }}
      transition={{ duration: 0.3, ease: smoothEase }}
    />
    {/* Index label */}
    <motion.text
      x={10}
      y={-10}
      fill="#ff6b47"
      fontSize="8"
      fontFamily="'Space Mono', monospace"
      opacity={active ? 1 : 0}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {String(index + 1).padStart(2, "0")}
    </motion.text>
  </g>
);

// ─── India SVG outline — geographically accurate ──────────────────────────────
// Derived from real lat/lon border coordinates mapped to SVG space.
// Projection: lon 67–98°E → x 40–410, lat 7–38°N → y 35–500 (Y flipped)
// ViewBox: 0 0 450 535
const IndiaSVGPath = `M 54.3,249.5 L 51.9,215.0 L 69.8,192.5 L 75.8,170.0 L 81.8,147.5 L 87.7,117.5 L 111.6,102.5 L 129.5,92.0 L 147.4,87.5 L 165.3,72.5 L 183.2,87.5 L 201.1,102.5 L 219.0,147.5 L 242.9,177.5 L 272.7,185.0 L 296.6,200.0 L 308.5,192.5 L 332.4,207.5 L 344.4,222.5 L 362.3,215.0 L 380.2,207.5 L 398.1,200.0 L 404.0,222.5 L 392.1,252.5 L 374.2,267.5 L 350.3,275.0 L 344.4,252.5 L 332.4,237.5 L 314.5,267.5 L 308.5,282.5 L 296.6,267.5 L 284.7,282.5 L 272.7,297.5 L 260.8,312.5 L 248.9,327.5 L 236.9,342.5 L 225.0,357.5 L 213.1,372.5 L 201.1,387.5 L 195.2,402.5 L 198.7,425.0 L 195.2,447.5 L 183.2,470.0 L 171.3,477.5 L 165.3,483.5 L 153.4,479.0 L 147.4,462.5 L 141.5,443.0 L 135.5,428.0 L 129.5,410.0 L 120.0,380.0 L 114.0,350.0 L 117.6,327.5 L 105.6,305.0 L 87.7,275.0 L 75.8,263.0 L 60.3,267.5 L 54.3,249.5 Z`;

// ─── Main Component ───────────────────────────────────────────────────────────
const LiveLocations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on the India map
  const mapY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const users = useCountUp(4000, statsInView, 2000);
  const prints = useCountUp(1200, statsInView, 1600);

  const active = locations[activeIdx];

  // Auto-cycle through locations every 4 seconds when not hovered
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % locations.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Vertical grid lines (match site-wide style) ── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[16.6%] top-0 bottom-0 w-[1px] bg-white opacity-[0.06]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white opacity-[0.06]" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-[1px] bg-white opacity-[0.06]" />
      </div>

      {/* ── Coral radial glow behind map ── */}
      <div
        className="pointer-events-none absolute right-[-5%] top-[10%] w-[55vw] h-[55vw] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #ff6b47 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* ── Running ticker at top ── */}
      <div className="border-b border-white/10 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-10 px-8 shrink-0">
              {["NIT Calicut", "IIITDM Kurnool", "Ravindra College of Engineering Kurnool", "4,000+ Users", "1,200+ Daily Prints", "3 Live Campuses", "Andhra Pradesh", "Kerala"].map((t, j) => (
                <React.Fragment key={j}>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#444]">{t}</span>
                  <span className="text-[#ff6b47] opacity-50 text-[0.5rem]">◆</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row min-h-[calc(100svh-48px)]">

        {/* ── LEFT: Text panel ────────────────────────────────────────────── */}
        <div className="w-full lg:w-[52%] flex flex-col justify-between px-[2rem] lg:px-[5vw] py-16 lg:py-20">

          {/* Top: label + headline */}
          <div>
            <motion.p
              className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Live Campuses
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h2
                className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 8.5rem)" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: snappyEase }}
              >
                Already
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 8.5rem)" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: snappyEase, delay: 0.1 }}
              >
                Operating
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 8.5rem)", color: "#ff6b47" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: snappyEase, delay: 0.2 }}
              >
                At Scale.
              </motion.h2>
            </div>

            <motion.p
              className="text-[#666] text-[1rem] leading-relaxed max-w-[420px] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: smoothEase }}
            >
              PrintIT is live across premier institutions in Kerala and Andhra Pradesh.
              Real students. Real prints. Real revenue for partner colleges — every single day.
            </motion.p>

            {/* ── Stats row ── */}
            <div ref={statsRef} className="flex gap-10 mb-16">
              {[
                { value: users, suffix: "+", label: "Registered users" },
                { value: prints, suffix: "+", label: "Daily prints" },
                { value: 3, suffix: "", label: "Live campuses" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: smoothEase }}
                >
                  <div
                    className="font-black leading-none tracking-tight"
                    style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
                  >
                    {s.value.toLocaleString()}{s.suffix}
                  </div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#555] mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Location list ── */}
          <div className="flex flex-col gap-0">
            {locations.map((loc, i) => (
              <motion.button
                key={loc.id}
                onClick={() => { setActiveIdx(i); setPaused(true); }}
                onMouseEnter={() => { setActiveIdx(i); setPaused(true); }}
                onMouseLeave={() => setPaused(false)}
                className="group text-left border-t border-white/10 py-6 flex items-start gap-6 transition-all duration-300 hover:border-[#ff6b47]/40 relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: smoothEase }}
                style={{ borderTopColor: activeIdx === i ? "rgba(255,107,71,0.4)" : undefined }}
              >
                {/* Active indicator bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff6b47]"
                  animate={{ scaleY: activeIdx === i ? 1 : 0, originY: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Index */}
                <span
                  className="font-mono text-[0.65rem] tracking-[0.1em] mt-1 flex-shrink-0 transition-colors duration-300"
                  style={{ color: activeIdx === i ? "#ff6b47" : "#333" }}
                >
                  {loc.index}
                </span>

                {/* Name + meta */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="font-black uppercase leading-[0.9] tracking-tight transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                        color: activeIdx === i ? "#ffffff" : "#555",
                      }}
                    >
                      {loc.name}
                    </h3>
                    <span
                      className="font-mono text-[0.6rem] uppercase tracking-[0.15em] flex-shrink-0 mt-1 transition-colors duration-300"
                      style={{ color: activeIdx === i ? "#ff6b47" : "#333" }}
                    >
                      {loc.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-[0.6rem] text-[#444] uppercase tracking-[0.1em]">
                      {loc.city}, {loc.state}
                    </span>
                    <span className="text-[#333] text-[0.5rem]">·</span>
                    <span className="font-mono text-[0.6rem] text-[#444] uppercase tracking-[0.1em]">
                      Since {loc.since}
                    </span>
                  </div>

                  {/* Expanded detail on active */}
                  <AnimatePresence>
                    {activeIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: smoothEase }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-8 mt-4">
                          <div>
                            <div className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#444] mb-1">Campus Strength</div>
                            <div className="font-bold text-[0.95rem]">{loc.students} Students</div>
                          </div>
                          <div>
                            <div className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#444] mb-1">Daily Prints</div>
                            <div className="font-bold text-[0.95rem]">{loc.dailyPrints}+ / day</div>
                          </div>
                          <div>
                            <div className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#444] mb-1">Status</div>
                            <div className="flex items-center gap-2">
                              <motion.div
                                className="w-2 h-2 rounded-full bg-[#ff6b47]"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="font-bold text-[0.95rem] text-[#ff6b47]">Live</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[#444] text-[0.8rem] mt-3 leading-relaxed">{loc.tier}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}

            {/* Last border */}
            <div className="border-t border-white/10" />
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-4 group"
            >
              <span className="font-bold uppercase tracking-[0.12em] text-[0.75rem] text-[#ff6b47]">
                Add Your Campus to the List
              </span>
              <motion.span
                className="text-[#ff6b47]"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Map panel ─────────────────────────────────────────────── */}
        <div className="w-full lg:w-[48%] relative flex items-center justify-center py-16 border-t lg:border-t-0 lg:border-l border-white/10">

          {/* Active location name — giant background text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-bg"}
              className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="font-black uppercase text-white select-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 9rem)",
                  opacity: 0.025,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  textAlign: "center",
                  maxWidth: "90%",
                  wordBreak: "break-all",
                }}
              >
                {active.name}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* India SVG map */}
          <motion.div
            className="relative w-full max-w-[420px] px-8"
            style={{ y: mapY }}
          >
            <svg
              viewBox="0 0 450 535"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* India outline — geographically accurate */}
              <motion.path
                d={IndiaSVGPath}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: smoothEase, delay: 0.3 }}
              />

              {/* Latitude grid lines */}
              {[150, 220, 300, 380, 450].map((y) => (
                <line
                  key={y}
                  x1="40"
                  y1={y}
                  x2="420"
                  y2={y}
                  stroke="rgba(255,255,255,0.02)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Dashed connector: NIT Calicut → Kurnool */}
              <motion.line
                x1={144.8} y1={436.1}
                x2={171.9} y2={367.6}
                stroke="#ff6b47"
                strokeWidth="0.6"
                strokeDasharray="3 5"
                opacity={0.25}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.2 }}
              />

              {/* HQ dot — Tirupati (smaller, grey) */}
              <g transform={`translate(188.2, 400.5)`}>
                <circle r={2.5} fill="#555" />
                <text x={8} y={4} fill="#444" fontSize="7" fontFamily="'Space Mono', monospace">HQ</text>
              </g>

              {/* Location dots */}
              {locations.map((loc, i) => (
                <MapDot
                  key={loc.id}
                  x={loc.mapX}
                  y={loc.mapY}
                  active={activeIdx === i}
                  onClick={() => { setActiveIdx(i); setPaused(true); }}
                  index={i}
                />
              ))}
            </svg>

            {/* Active location card — floats over map */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute bottom-4 right-0 lg:right-4 bg-[#0a0a0a] border border-[#ff6b47]/30 p-5 max-w-[220px]"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.4, ease: smoothEase }}
              >
                {/* Live badge */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#ff6b47]"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#ff6b47]">Live</span>
                </div>

                <h4 className="font-black uppercase text-[0.9rem] leading-[1] tracking-tight mb-1">
                  {active.name}
                </h4>
                <p className="font-mono text-[0.6rem] text-[#555] uppercase tracking-[0.1em] mb-3">
                  {active.city} · {active.state}
                </p>

                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <div>
                    <div className="font-mono text-[0.55rem] text-[#444] uppercase mb-0.5">Daily</div>
                    <div className="font-bold text-[0.85rem]">{active.dailyPrints}+ prints</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[0.55rem] text-[#444] uppercase mb-0.5">Since</div>
                    <div className="font-bold text-[0.85rem]">{active.since}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Step dots for cycling */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {locations.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIdx(i); setPaused(true); }}
                className="transition-all duration-300"
                style={{
                  width: activeIdx === i ? "24px" : "6px",
                  height: "6px",
                  background: activeIdx === i ? "#ff6b47" : "#333",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveLocations;
