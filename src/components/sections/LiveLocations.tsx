"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * LiveLocations
 *  - LEFT: interactive Global → India hover map (iframe to /global-ops-map.html)
 *  - RIGHT: live campus list (NIT Calicut, IIITDM Kurnool, RCE)
 *  Stacks on mobile.
 */

const ACCENT = "#FF6B47";

type Campus = {
  index: string;
  name: string;
  city: string;
  state: string;
  type: string;
  since: string;
  strength: string;
  daily: string;
  status: "Live" | "Pilot";
  note?: string;
};

const CAMPUSES: Campus[] = [
  {
    index: "01",
    name: "NIT Calicut",
    city: "Calicut",
    state: "Kerala",
    type: "NIT",
    since: "2024",
    strength: "8,000+ Students",
    daily: "420 / day",
    status: "Live",
  },
  {
    index: "02",
    name: "IIITDM Kurnool",
    city: "Kurnool",
    state: "Andhra Pradesh",
    type: "IIIT",
    since: "2024",
    strength: "1,200+ Students",
    daily: "280 / day",
    status: "Live",
  },
  {
    index: "03",
    name: "Ravindra College of Engineering",
    city: "Kurnool",
    state: "Andhra Pradesh",
    type: "Engineering",
    since: "2025",
    strength: "1,800+ Students",
    daily: "210 / day",
    status: "Live",
    note: "Autonomous — Affiliated JNTUA",
  },
];

const LiveLocations = () => {
  return (
    <section className="relative w-full bg-[#0a0d11] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT — map */}
        <div className="relative lg:col-span-7 order-2 lg:order-1" style={{ minHeight: "62vh", height: "100vh", maxHeight: "920px" }}>
          <iframe
            src="/global-ops-map.html"
            title="Global Operations Map"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
        </div>

        {/* RIGHT — campus list */}
        <div className="lg:col-span-5 order-1 lg:order-2 px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5 sm:mb-7">
            <span className="block h-[1px] w-10 sm:w-14" style={{ background: ACCENT }} />
            <span
              className="text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT, fontFamily: "'DM Mono', monospace" }}
            >
              Live · Campus Network
            </span>
          </div>

          <h2
            className="font-black uppercase leading-[0.95] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.4vw, 3.4rem)" }}
          >
            Where <span style={{ color: ACCENT }}>PrintIT</span><br />
            is Already Live
          </h2>

          <p className="text-white/65 leading-relaxed mb-8 sm:mb-10" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
            Kerala &amp; Andhra Pradesh. Real students. Real prints. Real
            revenue for partner colleges — every single day.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/10">
            <div>
              <div className="font-black tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}>4,000+</div>
              <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.28em] text-white/45 mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>Registered Users</div>
            </div>
            <div>
              <div className="font-black tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}>1,200+</div>
              <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.28em] text-white/45 mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>Daily Prints</div>
            </div>
            <div>
              <div className="font-black tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}>3</div>
              <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.28em] text-white/45 mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>Live Campuses</div>
            </div>
          </div>

          {/* Campus list */}
          <ul className="border-t border-white/15">
            {CAMPUSES.map((c, i) => (
              <motion.li
                key={c.index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-white/15 py-4 sm:py-5 group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="text-[0.7rem] sm:text-[0.75rem] font-bold tracking-[0.22em] text-white/35 mt-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {c.index}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <span
                        className="font-bold uppercase tracking-[-0.01em] leading-tight"
                        style={{ fontSize: "clamp(1rem, 1.3vw, 1.35rem)" }}
                      >
                        {c.name}
                      </span>
                      <span
                        className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-white/45"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {c.type}
                      </span>
                    </div>
                    <div
                      className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.18em] text-white/45 mt-1"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {c.city}, {c.state}&nbsp;·&nbsp;Since {c.since}
                    </div>

                    {/* Detail strip (always visible, condensed) */}
                    <div className="mt-3 flex items-center gap-4 sm:gap-6 flex-wrap">
                      <div>
                        <div className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] text-white/35" style={{ fontFamily: "'DM Mono', monospace" }}>Campus Strength</div>
                        <div className="text-[0.85rem] sm:text-[0.95rem] font-semibold">{c.strength}</div>
                      </div>
                      <div>
                        <div className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] text-white/35" style={{ fontFamily: "'DM Mono', monospace" }}>Daily Prints</div>
                        <div className="text-[0.85rem] sm:text-[0.95rem] font-semibold" style={{ color: ACCENT }}>{c.daily}</div>
                      </div>
                      <div>
                        <div className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] text-white/35" style={{ fontFamily: "'DM Mono', monospace" }}>Status</div>
                        <div className="text-[0.85rem] sm:text-[0.95rem] font-semibold flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                          {c.status}
                        </div>
                      </div>
                    </div>

                    {c.note && (
                      <div className="text-[0.7rem] sm:text-[0.75rem] text-white/40 mt-2">{c.note}</div>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <a
            href="/contact"
            className="mt-7 sm:mt-9 inline-flex items-center gap-2 self-start text-[0.7rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-75"
            style={{ color: ACCENT }}
          >
            Add your campus to the list →
          </a>
        </div>
      </div>
    </section>
  );
};

export default LiveLocations;
