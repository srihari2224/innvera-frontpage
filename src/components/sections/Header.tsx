"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LogoOverlay from "./LogoOverlay";

/**
 * Header
 *  - Logo + INNVERA wordmark (clicking opens the Studio K logo overlay)
 *  - SAY HELLO button + MENU button on the right
 *  - MENU opens a full-screen royal-blue overlay
 *  - Inside menu: clickable video opens cinematic player
 */

const MENU_BG = "#3a1bff";
const ACCENT = "#FF6B47";

const MENU_VIDEO =
  "/assets/videos/nazmul.motion_8aeaf19c438f463389b3d85076e52106.mp4";

const SUBTITLE_LINES = [
  "Self-service printing. Built for every campus.",
  "Upload from any device. Pay via UPI.",
  "Enter the 4-digit OTP at the kiosk.",
  "Collect your prints in seconds.",
  "No staff. No queues. No hassle.",
  "PrintIT — Innvera Technology.",
];

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/" },
  { label: "Services", href: "/start-printing" },
  { label: "About", href: "/printit" },
  { label: "Our Models", href: "/models" },
  { label: "Contact", href: "/contact" },
  { label: "Sign In", href: "/sign-in" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (playerOpen) setPlayerOpen(false);
      else if (logoOpen) setLogoOpen(false);
      else if (open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, playerOpen, logoOpen]);

  useEffect(() => {
    if (open || playerOpen || logoOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open, playerOpen, logoOpen]);

  const closeAll = () => {
    setPlayerOpen(false);
    setOpen(false);
  };

  return (
    <>
      {/* ── TOP BAR ────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-5 lg:px-8 py-3 sm:py-4 bg-black text-white"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        <button
          type="button"
          onClick={() => setLogoOpen(true)}
          aria-label="Open brand mark"
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
          style={{ background: "transparent", border: "none", color: "#fff", padding: 0 }}
        >
          <img
            src="/assets/images/Untitled-3.png"
            alt="Innvera"
            width={32}
            height={32}
            className="h-7 sm:h-8 w-auto object-contain"
          />
          <span className="text-[1.05rem] sm:text-[1.3rem] lg:text-[1.6rem] font-black tracking-tight uppercase">
            INNVERA
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <a
            href="/contact"
            className="hidden sm:inline-flex items-center justify-between gap-3 px-4 lg:px-6 py-2 text-[0.7rem] lg:text-[0.8rem] font-bold uppercase tracking-[0.18em]"
            style={{ background: MENU_BG, color: "#fff" }}
          >
            <span>Say Hello</span>
            <span className="text-[1rem] leading-none">+</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
            style={{ background: "transparent", border: "none", color: "#fff" }}
          >
            <span className="text-[0.7rem] sm:text-[0.8rem] font-bold uppercase tracking-[0.22em]">Menu</span>
            <span className="flex flex-col gap-[5px]">
              <span className="block w-[22px] sm:w-[26px] h-[1.5px] bg-current" />
              <span className="block w-[22px] sm:w-[26px] h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* ── LOGO OVERLAY ───────────────────────────────────────────── */}
      <AnimatePresence>
        {logoOpen && <LogoOverlay onClose={() => setLogoOpen(false)} />}
      </AnimatePresence>

      {/* ── FULL-SCREEN MENU OVERLAY ───────────────────────────────── */}
      <AnimatePresence>
        {open && !playerOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[200]"
            style={{ background: MENU_BG, color: "#fff", fontFamily: '"Inter", sans-serif' }}
          >
            <div className="absolute inset-0 flex flex-col">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 px-4 sm:px-5 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src="/assets/images/Untitled-3.png"
                    alt="Innvera"
                    width={32}
                    height={32}
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                  <span className="text-[1.05rem] sm:text-[1.3rem] lg:text-[1.6rem] font-black tracking-tight uppercase">
                    INNVERA
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none ml-auto"
                  style={{ background: "transparent", border: "none", color: "#fff" }}
                >
                  <span className="text-[0.7rem] sm:text-[0.8rem] font-bold uppercase tracking-[0.22em]">Close</span>
                  <span className="relative w-[22px] sm:w-[26px] h-[22px] sm:h-[26px] inline-block">
                    <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-current rotate-45" />
                    <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-current -rotate-45" />
                  </span>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 lg:px-8 py-4 lg:py-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center max-w-[1400px] mx-auto">
                  {/* LEFT — clickable video */}
                  <button
                    type="button"
                    onClick={() => setPlayerOpen(true)}
                    className="md:col-span-5 group cursor-pointer relative w-full"
                    aria-label="Play full video"
                    style={{ background: "transparent", border: "none", padding: 0 }}
                  >
                    <div
                      className="relative w-full aspect-video overflow-hidden border border-white/15 transition-transform duration-500 group-hover:scale-[1.015]"
                      style={{ background: "#000" }}
                    >
                      <video
                        src={MENU_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                          style={{
                            width: 70,
                            height: 70,
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.6)",
                          }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/90">
                        ▸ Watch · Inside the Kiosk
                      </div>
                    </div>
                  </button>

                  {/* CENTRE — menu list */}
                  <nav className="md:col-span-5">
                    <ul className="flex flex-col gap-1" onMouseLeave={() => setHovered(0)}>
                      {NAV_ITEMS.map((item, i) => {
                        const isActive = hovered === i || pathname === item.href;
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onMouseEnter={() => setHovered(i)}
                              onClick={() => setOpen(false)}
                              className="group relative inline-flex items-center gap-4 py-1 transition-all duration-200"
                              style={{
                                fontSize: "clamp(1.8rem, 5vw, 5rem)",
                                fontWeight: 500,
                                lineHeight: 1,
                                color: "#fff",
                              }}
                            >
                              <span
                                className="relative inline-flex items-center px-3 py-1 transition-colors duration-200"
                                style={{
                                  background: isActive ? "rgba(255,255,255,0.85)" : "transparent",
                                  color: isActive ? "#000" : "#fff",
                                }}
                              >
                                {item.label}
                                {isActive && (
                                  <span className="ml-4 inline-flex items-center justify-center" style={{ color: "#000", fontSize: "0.5em" }}>
                                    →
                                  </span>
                                )}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* RIGHT — socials */}
                  <ul className="md:col-span-2 flex md:flex-col flex-wrap gap-3 md:gap-3 text-[0.9rem] sm:text-[1rem] lg:text-[1.15rem] font-medium">
                    {SOCIAL.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70 transition-opacity"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Overlay footer */}
              <div className="flex items-end justify-between px-4 sm:px-5 lg:px-8 py-4 sm:py-6 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                <span>Innvera ©{new Date().getFullYear()}</span>
                <span className="hidden sm:block text-right leading-tight">
                  A Division of <br />Innvera Technologies Pvt. Ltd.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CINEMATIC PLAYER ───────────────────────────────────────── */}
      <AnimatePresence>
        {playerOpen && (
          <CinematicPlayer
            src={MENU_VIDEO}
            onClose={() => setPlayerOpen(false)}
            onCloseAll={closeAll}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ── CINEMATIC PLAYER ────────────────────────────────────────────────
const CinematicPlayer = ({
  src,
  onClose,
  onCloseAll,
}: {
  src: string;
  onClose: () => void;
  onCloseAll: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [subIdx, setSubIdx] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.9;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSubIdx((i) => (i + 1) % SUBTITLE_LINES.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      key="cinematic-player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300]"
      style={{ background: "#000", fontFamily: '"Inter", sans-serif', color: "#fff" }}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          playsInline
          controls={false}
          className="w-full h-full object-contain bg-black"
        />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-10 py-3 sm:py-5 z-10 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/assets/images/Untitled-3.png" alt="Innvera" width={28} height={28} className="h-6 sm:h-7 w-auto object-contain" />
            <span className="text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white/85">
              Now Playing
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex items-center gap-2 cursor-pointer"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 10px" }}
            >
              <span className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                {muted ? "Sound Off" : "Sound On"}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Back"
              className="hidden sm:flex items-center gap-2 cursor-pointer"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 10px" }}
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em]">Back to Menu</span>
            </button>

            <button
              type="button"
              onClick={onCloseAll}
              aria-label="Close"
              className="flex items-center gap-2 cursor-pointer"
              style={{ background: ACCENT, color: "#000", padding: "6px 10px" }}
            >
              <span className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em]">Close ×</span>
            </button>
          </div>
        </div>

        <div
          className="absolute left-0 right-0 bottom-0 z-10 px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 pt-16 sm:pt-24 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 90%)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span style={{ width: 28, height: 1, background: ACCENT }} />
            <span className="text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
              Subtitles · Live
            </span>
            <span className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div style={{ minHeight: "clamp(2rem, 5vw, 5rem)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={subIdx}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                className="font-black tracking-[-0.01em] leading-[1.05]"
                style={{
                  fontSize: "clamp(1.1rem, 3.4vw, 3.4rem)",
                  color: "#fff",
                  textShadow: "0 2px 12px rgba(0,0,0,0.65)",
                }}
              >
                {SUBTITLE_LINES[subIdx].split(" ").map((word, i) => (
                  <motion.span
                    key={`${subIdx}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 sm:mt-6 flex items-center gap-2">
            {SUBTITLE_LINES.map((_, i) => (
              <span
                key={i}
                className="block transition-all duration-300"
                style={{
                  width: i === subIdx ? 28 : 6,
                  height: 2,
                  background: i === subIdx ? ACCENT : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
