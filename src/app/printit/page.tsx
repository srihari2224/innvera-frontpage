"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { staggerContainer, fadeUp, wordReveal, smoothEase, snappyEase } from "@/lib/animations";
import { usePathname } from 'next/navigation';

// ─── Shared Header (matches site) ───────────────────────────────────────────
const PageHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Start Printing", href: "/start-printing", isOrange: true },
    { label: "PrintIT", href: "/printit" },
    { label: "Our Models", href: "/models" },
    { label: "Contact Us", href: "/contact" },
    { label: "Sign In", href: "/sign-in" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col lg:flex-row justify-between items-start lg:items-center px-[1.5rem] lg:px-[2rem] py-[1rem] lg:py-[1.1rem] mix-blend-difference">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <a href="/" className="group relative block overflow-hidden">
            <div className="flex flex-col text-[1.4rem] sm:text-[1.6rem] lg:text-[1.8rem] leading-[0.9] font-black uppercase tracking-tighter">
              <div className="relative overflow-hidden h-[0.9em]">
                <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full flex">
                  {"Innvera".split("").map((c, i) => <span key={i}>{c}</span>)}
                </div>
                <div className="absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 flex">
                  {"Innvera".split("").map((c, i) => <span key={i}>{c}</span>)}
                </div>
              </div>
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
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-[101]"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-[1px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-[1px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-[1px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-[4vw] text-[1.4rem] font-medium tracking-tight">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:transition-all before:duration-300 hover:before:w-full before:bg-current ${item.isOrange ? 'text-[#ff6b47] before:bg-[#ff6b47]' : ''} ${isActive ? 'before:w-full' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#050505' }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.1]" style={{ left: "16.6%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.1]" style={{ left: "50%" }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.1]" style={{ left: "83.3%" }} />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-[#ff6b47]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,71,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="flex flex-col items-center justify-center h-full px-[2rem] relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[2.5rem] font-black uppercase tracking-tight leading-[1.1] transition-colors duration-200 ${
                  item.isOrange ? 'text-[#ff6b47]' : 'text-white hover:text-[#ff6b47]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

// ─── Step component for How It Works ────────────────────────────────────────
const Step = ({ number, title, desc, delay }: { number: string; title: string; desc: string; delay: number }) => (
  <motion.div
    className="border-t border-white/10 pt-8 pb-10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: smoothEase, delay }}
  >
    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#ff6b47] block mb-4">{number}</span>
    <h3 className="text-[clamp(1.6rem,3vw,2.8rem)] font-black uppercase tracking-tight leading-[0.9] mb-4">{title}</h3>
    <p className="text-[#a3a3a3] text-[1rem] leading-relaxed max-w-[380px]">{desc}</p>
  </motion.div>
);

// ─── Stat block ─────────────────────────────────────────────────────────────
const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="border-l-2 border-[#ff6b47] pl-6">
    <div className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-none tracking-tight">{value}</div>
    <div className="text-[#a3a3a3] text-[0.85rem] uppercase tracking-[0.1em] mt-1">{label}</div>
  </div>
);

// ─── Feature row ────────────────────────────────────────────────────────────
const Feature = ({ label, yes }: { label: string; yes: boolean }) => (
  <div className="flex items-center justify-between border-b border-white/10 py-4">
    <span className="text-[0.95rem]">{label}</span>
    <span className={`font-mono text-[0.75rem] font-bold tracking-[0.1em] ${yes ? "text-[#ff6b47]" : "text-[#444]"}`}>
      {yes ? "YES" : "NO"}
    </span>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PrintItPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="vertical-grid-line" style={{ left: "16.6%" }} />
      <div className="vertical-grid-line" style={{ left: "50%" }} />
      <div className="vertical-grid-line" style={{ left: "83.3%" }} />
      <PageHeader />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-[10vh] px-[2rem] lg:px-[5vw] overflow-hidden">
        {/* Coral accent bar */}
        <motion.div
          className="absolute top-0 left-0 w-[3px] h-full bg-[#ff6b47]"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: snappyEase }}
        />

        {/* Background grid lines decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {[20, 40, 60, 80].map((pct) => (
            <div key={pct} className="absolute top-0 bottom-0 w-[1px] bg-white/[0.03]" style={{ left: `${pct}%` }} />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          {/* Label */}
          <motion.p
            className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            01. The Product
          </motion.p>

          {/* Giant headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
              style={{ fontSize: "clamp(4.5rem, 14vw, 16rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: snappyEase, delay: 0.2 }}
            >
              Print<span style={{ color: "#ff6b47" }}>IT</span>
            </motion.h1>
          </div>

          {/* Sub-tagline */}
          <motion.p
            className="text-[#a3a3a3] text-[clamp(1rem,2vw,1.4rem)] max-w-[600px] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A smart, cloud-based self-service printing kiosk built for college campuses.
            Students upload, pay, and print — 24 hours a day, without a single staff member involved.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#ff6b47] text-black font-bold uppercase tracking-[0.12em] text-[0.75rem] px-8 py-4 transition-all duration-200 hover:bg-[#e05a38] hover:scale-[0.98]"
            >
              Request a Demo
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <path d="M3.5 10H14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                <path d="M9.85 4.5L15.5 10.1L9.85 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </a>
            <a
              href="/models"
              className="inline-flex items-center gap-3 border border-white/20 text-white font-bold uppercase tracking-[0.12em] text-[0.75rem] px-8 py-4 transition-all duration-200 hover:border-white/60"
            >
              See Our Models
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[#555] text-[0.55rem] uppercase tracking-[0.25em]">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-[#555] origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <div ref={statsRef} className="bg-[#0a0a0a] border-t border-b border-white/10 py-16 px-[2rem] lg:px-[10vw]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {statsInView && (
            <>
              <Stat value="24/7" label="Always available" />
              <Stat value="< 30s" label="Upload to print" />
              <Stat value="0" label="Staff required" />
              <Stat value="100%" label="Digital payments" />
            </>
          )}
        </div>
      </div>

      {/* ── WHAT IS PRINTIT ───────────────────────────────────────────────── */}
      <section className="py-[15vh] px-[2rem] lg:px-[10vw]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-[10vw]">
          {/* Left: label + heading */}
          <div className="lg:w-[40%]">
            <motion.p
              className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              02. What It Is
            </motion.p>
            <motion.h2
              className="font-black uppercase leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }}
            >
              Self-
              <br />Service.
              <br />
              <span style={{ color: "#ff6b47" }}>Smart.</span>
            </motion.h2>
          </div>

          {/* Right: description */}
          <div className="lg:w-[60%] flex flex-col justify-center gap-8">
            {[
              { title: "Upload anywhere", body: "Students upload PDF, Word, or image files directly from their phone or laptop via the PrintIT web app — no pen drives, no email, no queues." },
              { title: "Customise & Pay", body: "Choose B&W or colour, single or double sided, number of copies. Pay instantly with UPI or any digital wallet. A unique print code is issued instantly." },
              { title: "Collect instantly", body: "Walk up to the nearest PrintIT kiosk, enter the code, and collect prints in seconds. The file is deleted immediately after printing for complete privacy." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border-l-2 border-white/10 pl-6 hover:border-[#ff6b47] transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: i * 0.1 }}
              >
                <h3 className="font-bold text-[1.1rem] uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-[#a3a3a3] leading-relaxed text-[0.95rem]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-[15vh] px-[2rem] lg:px-[10vw] bg-[#050505]">
        <motion.p
          className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          03. How It Works
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          <Step number="Step 01" title="Upload" desc="Open the PrintIT app or website. Upload any PDF, Word file, or image from your device." delay={0} />
          <Step number="Step 02" title="Configure" desc="Choose your print settings — colour mode, page size, duplex, number of copies." delay={0.1} />
          <Step number="Step 03" title="Pay" desc="Pay securely via UPI, PhonePe, or GPay. Receive your unique 6-digit print code instantly." delay={0.2} />
          <Step number="Step 04" title="Collect" desc="Walk to any PrintIT kiosk on campus, enter your code, and collect your prints in under 30 seconds." delay={0.3} />
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="py-[15vh] px-[2rem] lg:px-[10vw]">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: smoothEase }}
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-4">04. Why PrintIT</p>
          <h2 className="font-black uppercase leading-[0.9] tracking-tight mb-16" style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}>
            vs Traditional
            <br />Printing
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
          {/* Traditional column */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#555] mb-8">Traditional Counter</p>
            <Feature label="Available after hours" yes={false} />
            <Feature label="No staff required" yes={false} />
            <Feature label="Digital payment" yes={false} />
            <Feature label="Instant service" yes={false} />
            <Feature label="File auto-deleted after print" yes={false} />
            <Feature label="Multiple campus locations" yes={false} />
            <Feature label="Revenue for institution" yes={false} />
          </div>

          {/* PrintIT column */}
          <div className="p-8 lg:p-12 bg-[#0a0a0a]">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#ff6b47] mb-8">PrintIT Kiosk</p>
            <Feature label="Available 24/7 including nights & weekends" yes={true} />
            <Feature label="Fully automated — zero staff" yes={true} />
            <Feature label="UPI, GPay, PhonePe" yes={true} />
            <Feature label="Upload to print in under 30 seconds" yes={true} />
            <Feature label="Auto-deleted for complete privacy" yes={true} />
            <Feature label="Scale across departments & hostels" yes={true} />
            <Feature label="₹36,000–₹60,000/month for institution" yes={true} />
          </div>
        </div>
      </section>

      {/* ── SECURITY SECTION ─────────────────────────────────────────────── */}
      <section className="py-[12vh] px-[2rem] lg:px-[10vw] bg-[#050505] border-t border-white/10">
        <motion.p
          className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          05. Security & Privacy
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { title: "Encrypted Upload", body: "All file uploads are transmitted over HTTPS with end-to-end encryption. No third party can access your documents in transit." },
            { title: "Auto-Delete", body: "Files are permanently deleted from our servers the moment printing is complete. Nothing is stored beyond what is needed." },
            { title: "PCI-Compliant Payments", body: "All payment transactions are processed through Razorpay's PCI-DSS certified gateway. We never store your payment credentials." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="border-t border-white/10 pt-8 pb-10 lg:pr-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: smoothEase }}
            >
              <div className="w-8 h-[2px] bg-[#ff6b47] mb-6" />
              <h3 className="font-black uppercase text-[1.1rem] tracking-tight mb-3">{item.title}</h3>
              <p className="text-[#a3a3a3] text-[0.9rem] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────────────────────────────── */}
      <section className="py-[20vh] px-[2rem] lg:px-[10vw] text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,107,71,0.06) 0%, transparent 70%)" }}
        />
        <motion.h2
          className="font-black uppercase leading-[0.85] tracking-tight mb-8"
          style={{ fontSize: "clamp(3rem,8vw,9rem)" }}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, ease: smoothEase }}
        >
          Ready to
          <br />
          <span style={{ color: "#ff6b47" }}>Go Live?</span>
        </motion.h2>
        <motion.p
          className="text-[#a3a3a3] text-[1.1rem] mb-10 max-w-[500px] mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          From site visit to first student print — we go live in under a week.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <a href="/contact" className="inline-flex items-center gap-3 bg-[#ff6b47] text-black font-bold uppercase tracking-[0.12em] text-[0.75rem] px-10 py-5 transition-all duration-200 hover:bg-[#e05a38]">
            Book a Free Demo
          </a>
          <a href="/models" className="inline-flex items-center gap-3 border border-white/20 text-white font-bold uppercase tracking-[0.12em] text-[0.75rem] px-10 py-5 hover:border-white/60 transition-all duration-200">
            Explore Models
          </a>
        </motion.div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/10 px-[2rem] py-6 flex justify-between items-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">Innvera Technology Pvt. Ltd.</span>
        <div className="flex gap-6 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </div>
  );
}
