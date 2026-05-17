"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, smoothEase, snappyEase } from "@/lib/animations";

const PageHeader = () => (
  <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-start px-[2rem] pt-[1.1rem] mix-blend-difference">
    <a href="/" className="group relative block overflow-hidden">
      <div className="flex flex-col text-[1.8rem] leading-[0.9] font-black uppercase tracking-tighter">
        <div className="relative overflow-hidden h-[0.9em]">
          <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full flex">
            {"Innvera".split("").map((c, i) => <span key={i}>{c}</span>)}
          </div>
          <div className="absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 flex">
            {"Innvera".split("").map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>
    </a>
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-[4vw] text-[1.4rem] font-medium tracking-tight">
        {[{ label: "PrintIT", href: "/printit" }, { label: "Our Models", href: "/models" }, { label: "Contact Us", href: "/contact" }].map((item) => (
          <li key={item.href}>
            <a href={item.href} className="relative py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-current before:transition-all before:duration-300 hover:before:w-full">{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2">
      <div className="w-6 h-[1px] bg-white" />
      <div className="w-6 h-[1px] bg-white" />
    </div>
  </header>
);

// ─── Comparison row for the table ────────────────────────────────────────────
const CompRow = ({ label, modelA, modelB }: { label: string; modelA: string; modelB: string }) => (
  <div className="grid grid-cols-3 border-b border-white/10 py-5 items-center gap-4">
    <span className="text-[#a3a3a3] text-[0.85rem]">{label}</span>
    <span className="text-white text-[0.9rem] font-medium">{modelA}</span>
    <span className="text-[#ff6b47] text-[0.9rem] font-medium">{modelB}</span>
  </div>
);

// ─── Animated counter ────────────────────────────────────────────────────────
const CountUp = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export default function ModelsPage() {
  const [activeModel, setActiveModel] = useState<"A" | "B">("A");

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="vertical-grid-line" style={{ left: "16.6%" }} />
      <div className="vertical-grid-line" style={{ left: "50%" }} />
      <div className="vertical-grid-line" style={{ left: "83.3%" }} />
      <PageHeader />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="min-h-screen flex flex-col justify-end pb-[10vh] px-[2rem] lg:px-[5vw] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,71,0.04) 0%, transparent 70%)" }} />
        </div>

        <motion.p
          className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          01. Our Models
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem,11vw,13rem)" }}
            initial={{ y: "100%" }} animate={{ y: "0%" }}
            transition={{ duration: 1, ease: snappyEase, delay: 0.2 }}
          >
            Two Models.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem,11vw,13rem)", color: "#ff6b47" }}
            initial={{ y: "100%" }} animate={{ y: "0%" }}
            transition={{ duration: 1, ease: snappyEase, delay: 0.35 }}
          >
            One Goal.
          </motion.h1>
        </div>

        <motion.p
          className="text-[#a3a3a3] text-[clamp(1rem,1.8vw,1.3rem)] max-w-[560px] leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Whether your institution wants zero investment and zero hassle, or full ownership and maximum revenue —
          PrintIT has a model built precisely for you.
        </motion.p>

        {/* Model toggle tabs */}
        <motion.div
          className="flex gap-0 mt-12 border border-white/20 w-fit"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={() => setActiveModel("A")}
            className={`px-8 py-4 font-bold uppercase tracking-[0.1em] text-[0.75rem] transition-all duration-300 ${activeModel === "A" ? "bg-white text-black" : "text-[#a3a3a3] hover:text-white"}`}
          >
            Model A — Managed
          </button>
          <button
            onClick={() => setActiveModel("B")}
            className={`px-8 py-4 font-bold uppercase tracking-[0.1em] text-[0.75rem] transition-all duration-300 ${activeModel === "B" ? "bg-[#ff6b47] text-black" : "text-[#a3a3a3] hover:text-white"}`}
          >
            Model B — Own It
          </button>
        </motion.div>
      </div>

      {/* ── MODEL DETAIL PANEL ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeModel === "A" && (
          <motion.section
            key="modelA"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="py-[15vh] px-[2rem] lg:px-[10vw] bg-[#050505] border-t border-white/10"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-[10vw] mb-20">
              <div className="lg:w-[45%]">
                <div className="inline-block bg-white text-black font-mono text-[0.65rem] uppercase tracking-[0.2em] px-4 py-2 mb-6">Model A</div>
                <h2 className="font-black uppercase leading-[0.85] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem,5vw,5.5rem)" }}>
                  Fully
                  <br />Managed
                  <br />Kiosk
                </h2>
                <p className="text-[#a3a3a3] text-[1rem] leading-relaxed">
                  Zero investment. Zero operational burden. We install, run, and maintain everything — the hardware,
                  software, paper, ink, and servicing. Your institution simply provides a small space and power supply.
                </p>
              </div>

              {/* What each side provides */}
              <div className="lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#a3a3a3] mb-6">Innvera Provides</p>
                  {["Complete kiosk hardware", "PrintIT software & cloud", "All paper, ink & consumables", "Ongoing maintenance", "Technical support 24/7", "Student onboarding campaign", "Real-time admin dashboard"].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5">
                      <div className="w-4 h-[2px] bg-[#ff6b47] flex-shrink-0" />
                      <span className="text-[0.9rem]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-8 bg-[#0a0a0a]">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#ff6b47] mb-6">Institution Provides</p>
                  {["~3×3 ft accessible space", "Standard power outlet", "24/7 student access to location", "Basic campus security coverage"].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5">
                      <div className="w-4 h-[2px] bg-white/30 flex-shrink-0" />
                      <span className="text-[0.9rem] text-[#a3a3a3]">{item}</span>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-[#ff6b47]/10 border-l-2 border-[#ff6b47]">
                    <p className="text-[0.75rem] text-[#ff6b47] font-mono uppercase tracking-[0.1em] mb-1">In Return</p>
                    <p className="text-[0.9rem]">Innvera pays a monthly electricity & space contribution to the institution.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue potential */}
            <div className="border-t border-white/10 pt-16">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-10">Revenue Potential — Model A</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {[
                  { val: 300, suf: "+", label: "Prints per day (typical)" },
                  { val: 5, pre: "₹", label: "Average per print" },
                  { val: 45000, pre: "₹", suf: "+", label: "Monthly gross revenue" },
                  { val: 5, pre: "₹", suf: "–8%", label: "Rev share to institution" },
                ].map((s, i) => (
                  <div key={i} className="border-l-2 border-[#ff6b47] pl-6">
                    <div className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-tight">
                      <CountUp target={s.val} prefix={s.pre} suffix={s.suf} />
                    </div>
                    <div className="text-[#a3a3a3] text-[0.75rem] uppercase tracking-[0.08em] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeModel === "B" && (
          <motion.section
            key="modelB"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="py-[15vh] px-[2rem] lg:px-[10vw] bg-[#050505] border-t border-white/10"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-[10vw] mb-20">
              <div className="lg:w-[45%]">
                <div className="inline-block bg-[#ff6b47] text-black font-mono text-[0.65rem] uppercase tracking-[0.2em] px-4 py-2 mb-6">Model B</div>
                <h2 className="font-black uppercase leading-[0.85] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem,5vw,5.5rem)" }}>
                  Own It.
                  <br />Earn
                  <br /><span style={{ color: "#ff6b47" }}>80%.</span>
                </h2>
                <p className="text-[#a3a3a3] text-[1rem] leading-relaxed">
                  Purchase the kiosk outright. Manage it yourselves. Keep 80% of every print transaction.
                  We supply the software, warranty, and ongoing updates — you control everything else.
                </p>

                {/* Price callout */}
                <div className="mt-8 border border-[#ff6b47]/30 p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">One-time investment</p>
                  <p className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight">₹85,000<span className="text-[#a3a3a3] text-[1.2rem]"> + GST</span></p>
                  <p className="text-[0.8rem] text-[#a3a3a3] mt-2">Includes: hardware, printer, installation, 3-month free software trial</p>
                </div>
              </div>

              <div className="lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#a3a3a3] mb-6">Innvera Provides</p>
                  {["Kiosk hardware + installation", "PrintIT software (licensed)", "Payment system integration", "1-year full warranty", "Ongoing software updates", "Admin dashboard & analytics", "Dedicated tech helpline"].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5">
                      <div className="w-4 h-[2px] bg-[#ff6b47] flex-shrink-0" />
                      <span className="text-[0.9rem]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-8 bg-[#0a0a0a]">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#ff6b47] mb-6">Institution Manages</p>
                  {["Paper & ink replenishment", "Routine cleaning & upkeep", "Physical security", "Electricity supply", "Post-warranty hardware care"].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5">
                      <div className="w-4 h-[2px] bg-white/30 flex-shrink-0" />
                      <span className="text-[0.9rem] text-[#a3a3a3]">{item}</span>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-[#ff6b47]/10 border-l-2 border-[#ff6b47]">
                    <p className="text-[0.75rem] text-[#ff6b47] font-mono uppercase tracking-[0.1em] mb-1">Royalty to Innvera</p>
                    <p className="text-[0.9rem]">20% of gross print revenue. Automatically tracked via dashboard. You keep 80%.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Table */}
            <div className="border-t border-white/10 pt-16">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-10">Revenue Potential — Model B</p>
              <div className="border border-white/10 overflow-hidden">
                <div className="grid grid-cols-3 bg-[#0a0a0a] p-5 border-b border-white/10">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#555]">Metric</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#555]">Conservative (300/day)</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#ff6b47]">Moderate (500/day)</span>
                </div>
                {[
                  ["Monthly Gross Revenue", "₹45,000", "₹75,000"],
                  ["Royalty to Innvera (20%)", "₹9,000", "₹15,000"],
                  ["Net to Institution (80%)", "₹36,000", "₹60,000"],
                  ["Annual Net Income", "₹4,32,000+", "₹7,20,000+"],
                ].map(([label, a, b], i) => (
                  <div key={i} className={`grid grid-cols-3 p-5 border-b border-white/10 ${i === 3 ? "bg-[#ff6b47]/5" : ""}`}>
                    <span className="text-[#a3a3a3] text-[0.85rem]">{label}</span>
                    <span className={`text-[0.9rem] font-medium ${i === 3 ? "text-white font-black" : "text-white"}`}>{a}</span>
                    <span className={`text-[0.9rem] font-medium ${i === 3 ? "text-[#ff6b47] font-black" : "text-[#ff6b47]"}`}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── SIDE-BY-SIDE COMPARISON ───────────────────────────────────────── */}
      <section className="py-[15vh] px-[2rem] lg:px-[10vw]">
        <motion.p
          className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          02. Side-by-Side Comparison
        </motion.p>
        <motion.h2
          className="font-black uppercase leading-[0.85] tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }}
        >
          Which Model
          <br />is Right
          <br />for You?
        </motion.h2>

        {/* Column headers */}
        <div className="grid grid-cols-3 border-b-2 border-white/10 pb-4 mb-2">
          <span className="text-[#555] text-[0.75rem] uppercase tracking-[0.1em]" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white">Model A — Managed</span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#ff6b47]">Model B — Ownership</span>
        </div>

        {[
          ["Upfront cost", "Zero", "₹85,000 + GST"],
          ["Who owns the kiosk", "Innvera", "Institution"],
          ["Consumables (paper/ink)", "Innvera handles", "Institution handles"],
          ["Maintenance", "Fully by Innvera", "Institution (post-warranty)"],
          ["Revenue to institution", "5–8% rev share + electricity fee", "80% of all print revenue"],
          ["Software & updates", "Included", "Included (lifetime)"],
          ["Warranty", "N/A (we own it)", "1 full year"],
          ["Time to install", "2–5 days", "2–5 days"],
          ["Best for", "Institutions wanting zero hassle", "Institutions wanting maximum ROI"],
        ].map(([label, a, b]) => (
          <CompRow key={label} label={label} modelA={a} modelB={b} />
        ))}
      </section>

      {/* ── PILOT OFFER ───────────────────────────────────────────────────── */}
      <section className="py-[12vh] px-[2rem] lg:px-[10vw] bg-[#ff6b47]">
        <motion.div
          className="flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }}
        >
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-black/50 mb-3">Limited Offer</p>
            <h2 className="font-black uppercase leading-[0.9] tracking-tight text-black" style={{ fontSize: "clamp(2rem,4.5vw,4.5rem)" }}>
              60-Day Free
              <br />Pilot Program
            </h2>
            <p className="text-black/70 text-[1rem] mt-4 max-w-[500px]">
              We install the kiosk. Your students use it. You see the numbers. After 60 days — if you love it, we continue. If not, we remove it. No questions asked.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white font-bold uppercase tracking-[0.12em] text-[0.75rem] px-10 py-5 transition-all duration-200 hover:bg-[#111] hover:scale-[0.98]"
            >
              Apply for Pilot
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <path d="M3.5 10H14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                <path d="M9.85 4.5L15.5 10.1L9.85 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-[15vh] px-[2rem] lg:px-[10vw]">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-12">03. Common Questions</p>
        {[
          { q: "How long does installation take?", a: "From site visit to go-live typically takes 2–5 working days. The assessment takes 1 day, installation 1–2 days, testing and student onboarding takes the rest." },
          { q: "What happens if the kiosk breaks down?", a: "For Model A, Innvera handles all repairs at our cost — we have spares ready. For Model B, the 1-year warranty covers all hardware and software defects. Remote diagnostics resolve most issues without an on-site visit." },
          { q: "Can we have more than one kiosk per campus?", a: "Absolutely. We recommend 3 locations per campus — main block, library, and hostel — to maximize revenue and student access. Multiple kiosks multiply your earnings proportionally." },
          { q: "Do students need to install an app?", a: "The PrintIT web app works entirely in any browser — no installation required. Students can also use our downloadable Android app for faster access." },
          { q: "What file formats are supported?", a: "PDF (all versions), Microsoft Word (.doc, .docx), PowerPoint (.ppt, .pptx), and common image formats (JPG, PNG). Files are converted server-side — students don't need any special software." },
        ].map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </section>

      {/* Bottom CTA */}
      <div className="border-t border-white/10 py-[10vh] px-[2rem] lg:px-[10vw] flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div>
          <h3 className="font-black uppercase text-[clamp(1.5rem,3vw,3rem)] leading-[0.9] tracking-tight">Not sure which model fits?</h3>
          <p className="text-[#a3a3a3] mt-2">Talk to us — we'll help you decide in one conversation.</p>
        </div>
        <a href="/contact" className="flex-shrink-0 inline-flex items-center gap-3 bg-[#ff6b47] text-black font-bold uppercase tracking-[0.12em] text-[0.75rem] px-10 py-5 hover:bg-[#e05a38] transition-all duration-200">
          Get in Touch
        </a>
      </div>

      <div className="border-t border-white/10 px-[2rem] py-6 flex justify-between items-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">Innvera Technology Pvt. Ltd.</span>
        <div className="flex gap-6 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-6"
      >
        <span className="font-bold text-[1rem] uppercase tracking-tight">{q}</span>
        <span className="text-[#ff6b47] text-[1.5rem] leading-none flex-shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: smoothEase }}
            className="overflow-hidden"
          >
            <p className="text-[#a3a3a3] text-[0.95rem] leading-relaxed pb-8 max-w-[700px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
