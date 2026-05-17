"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * LogoOverlay — full-screen Studio K brand-mark presentation.
 * Opens when the user clicks the header logo. Click anywhere to close,
 * or use the Close button / Escape key.
 */

const ACCENT = "#FF6B47";

type Props = { onClose: () => void };

const LogoOverlay = ({ onClose }: Props) => {
  const sectionEl = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(true);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.top = e.clientY + "px";
      el.style.left = e.clientX + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const el = sectionEl.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / r.width;
      const ny = (e.clientY - cy) / r.height;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((node) => {
        const d = Number(node.dataset.depth || 1);
        node.style.setProperty("--dx", `${(-nx * 14 * d).toFixed(2)}px`);
        node.style.setProperty("--dy", `${(-ny * 10 * d).toFixed(2)}px`);
      });
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[400] bg-black text-white overflow-hidden"
      style={{ cursor: "crosshair" }}
    >
      <div
        ref={sectionEl}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative w-full h-full"
      >
        {/* Engineering grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            zIndex: 0,
          }}
        />

        {/* Background giant "I" monogram */}
        <div
          data-depth="0.4"
          className="absolute top-1/2 left-1/2 pointer-events-none select-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(280px, 38vw, 580px)",
            lineHeight: 0.85,
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.02em",
            transform: "translate(-50%, -50%) translate(var(--dx,0px), var(--dy,0px))",
            zIndex: 1,
          }}
        >
          I
        </div>

        <div className="absolute left-0 right-0 h-[1px] pointer-events-none" style={{ top: "22%", background: "rgba(255,255,255,0.07)", zIndex: 2 }} />
        <div className="absolute left-0 right-0 h-[1px] pointer-events-none" style={{ bottom: "22%", background: "rgba(255,255,255,0.07)", zIndex: 2 }} />
        <div className="absolute top-0 bottom-0 w-[1px] pointer-events-none" style={{ left: "50%", background: "rgba(255,255,255,0.04)", zIndex: 1 }} />

        {/* Corner marks */}
        {([
          ["top-[clamp(32px,4vh,56px)] left-[clamp(32px,4vw,56px)]", "tl"],
          ["top-[clamp(32px,4vh,56px)] right-[clamp(32px,4vw,56px)]", "tr"],
          ["bottom-[clamp(32px,4vh,56px)] left-[clamp(32px,4vw,56px)]", "bl"],
          ["bottom-[clamp(32px,4vh,56px)] right-[clamp(32px,4vw,56px)]", "br"],
        ] as const).map(([pos, key]) => (
          <div key={key} className={`absolute ${pos} w-3 h-3 pointer-events-none z-[15]`}>
            <span className="absolute bg-white/20" style={key === "tl" ? { top: 0, left: 0, width: 1, height: 12 } : key === "tr" ? { top: 0, right: 0, width: 1, height: 12 } : key === "bl" ? { bottom: 0, left: 0, width: 1, height: 12 } : { bottom: 0, right: 0, width: 1, height: 12 }} />
            <span className="absolute bg-white/20" style={key === "tl" ? { top: 0, left: 0, width: 12, height: 1 } : key === "tr" ? { top: 0, right: 0, width: 12, height: 1 } : key === "bl" ? { bottom: 0, left: 0, width: 12, height: 1 } : { bottom: 0, right: 0, width: 12, height: 1 }} />
          </div>
        ))}

        {/* Close button — top right inside overlay */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close logo"
          className="absolute z-[60] flex items-center gap-3 cursor-pointer select-none"
          style={{
            top: "clamp(22px, 3vh, 36px)",
            right: "clamp(80px, 9vw, 130px)",
            background: "transparent",
            border: "none",
            color: "#fff",
          }}
        >
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.25em]">Close</span>
          <span className="relative w-[24px] h-[24px] inline-block">
            <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-current rotate-45" />
            <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-current -rotate-45" />
          </span>
        </button>

        {/* TOP-LEFT */}
        <motion.div
          data-depth="2.2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 1 }}
          className="absolute z-10 pointer-events-none"
          style={{ top: "clamp(40px, 5.5vh, 70px)", left: "clamp(40px, 5vw, 70px)", transform: "translate(var(--dx,0px), var(--dy,0px))" }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.45em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 8 }}>
            Studio / Identity
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 2.8vw, 38px)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.12em", lineHeight: 1 }}>
            Brand<br />Mark
          </div>
        </motion.div>

        {/* Above logo */}
        <motion.div
          data-depth="3.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32, duration: 1 }}
          className="absolute z-10 pointer-events-none whitespace-nowrap text-center"
          style={{
            top: "calc(50% - clamp(160px, 22vw, 290px))",
            left: "50%",
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(9px, 0.85vw, 11px)",
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase",
            transform: "translateX(-50%) translate(var(--dx,0px), var(--dy,0px))",
          }}
        >
          ← &nbsp; Geometric Construction &nbsp; →
        </motion.div>

        {/* Below logo */}
        <motion.div
          data-depth="3.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 1 }}
          className="absolute z-10 pointer-events-none whitespace-nowrap text-center"
          style={{
            top: "calc(50% + clamp(140px, 16vw, 230px))",
            left: "50%",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 18px)",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            transform: "translateX(-50%) translate(var(--dx,0px), var(--dy,0px))",
          }}
        >
          Smart · Campus · Printing
        </motion.div>

        {/* Side numbers */}
        <motion.div
          data-depth="1.2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }}
          className="absolute z-10 pointer-events-none select-none"
          style={{ top: "50%", left: "clamp(40px, 6vw, 80px)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 9vw, 130px)", color: "rgba(255,255,255,0.05)", letterSpacing: "-0.02em", lineHeight: 1, transform: "translateY(-50%) translate(var(--dx,0px), var(--dy,0px))" }}
        >
          001
        </motion.div>
        <motion.div
          data-depth="1.2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }}
          className="absolute z-10 pointer-events-none select-none text-right"
          style={{ top: "50%", right: "clamp(40px, 6vw, 80px)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 9vw, 130px)", color: "rgba(255,255,255,0.05)", letterSpacing: "-0.02em", lineHeight: 1, transform: "translateY(-50%) translate(var(--dx,0px), var(--dy,0px))" }}
        >
          047
        </motion.div>

        {/* CENTRE LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-20 pointer-events-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(180px, 28vw, 360px)" }}
        >
          <img src="/assets/images/Untitled-3.png" alt="Innvera" className="w-full h-auto object-contain block" />
          {hovering && (
            <>
              <span className="absolute h-[1px] bg-white/30" style={{ width: 60, left: "50%", top: "50%", transform: "translateX(-50%)" }} />
              <span className="absolute w-[1px] bg-white/30" style={{ height: 60, left: "50%", top: "50%", transform: "translateY(-50%)" }} />
            </>
          )}
        </motion.div>

        {/* BOTTOM LEFT */}
        <motion.div
          data-depth="2.4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="absolute z-10"
          style={{ bottom: "clamp(40px, 5.5vh, 70px)", left: "clamp(40px, 5vw, 70px)", transform: "translate(var(--dx,0px), var(--dy,0px))" }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", lineHeight: 2.2 }}>
            <div>CIN · U28299AP2025PTC120873</div>
            <div>22-8-152/A3 · Madhav Puram</div>
            <div>Tirupati · 517507 · AP · India</div>
          </div>
        </motion.div>

        {/* BOTTOM RIGHT */}
        <motion.div
          data-depth="2.4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="absolute z-10 text-right"
          style={{ bottom: "clamp(40px, 5.5vh, 70px)", right: "clamp(40px, 5vw, 70px)", transform: "translate(var(--dx,0px), var(--dy,0px))" }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", lineHeight: 2.2 }}>
            <div>© {new Date().getFullYear()} · Innvera Technology</div>
            <div>v1.0 · Build 047</div>
            <div style={{ color: ACCENT }}>● System Online</div>
          </div>
        </motion.div>

        {/* Custom cursor dot */}
        {hovering && (
          <div
            ref={cursorRef}
            style={{ position: "fixed", width: 5, height: 5, background: "rgba(255,255,255,0.8)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%, -50%)", mixBlendMode: "difference" }}
          />
        )}

      </div>
    </motion.div>
  );
};

export default LogoOverlay;
