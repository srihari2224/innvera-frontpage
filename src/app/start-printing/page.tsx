"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { smoothEase, snappyEase } from "@/lib/animations";
import { usePathname } from "next/navigation";

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

export default function StartPrintingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="vertical-grid-line" style={{ left: "16.6%" }} />
      <div className="vertical-grid-line" style={{ left: "50%" }} />
      <div className="vertical-grid-line" style={{ left: "83.3%" }} />
      <PageHeader />

      <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-[2rem] lg:px-[5vw] pt-[100px] lg:pt-[120px] overflow-hidden">
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

        {/* Subtle coral glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,71,0.03) 0%, transparent 70%)" }} />

        <motion.div style={{ y: heroY }} className="relative z-10">
          {/* Label */}
          <motion.p
            className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Choose Your Path
          </motion.p>

          {/* Giant headline */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
              style={{ fontSize: "clamp(3rem,8vw,9rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: snappyEase, delay: 0.2 }}
            >
              Where Are You
              <br />
              <span style={{ color: "#ff6b47" }}>Printing?</span>
            </motion.h1>
          </div>

          {/* Sub-tagline */}
          <motion.p
            className="text-[#a3a3a3] text-[clamp(1rem,1.8vw,1.4rem)] max-w-[600px] leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Select your printing destination. Whether you're on campus or out in the city,
            we've got you covered with seamless, instant printing.
          </motion.p>

          {/* Two large option cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px]">
            {/* Campus Printing Card */}
            <motion.a
              href="https://app.innvera.online"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border border-white/10 bg-[#0a0a0a] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: smoothEase }}
              whileHover={{ scale: 1.02, borderColor: "#ff6b47" }}
            >
              {/* Coral accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6b47] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border border-[#ff6b47] flex items-center justify-center group-hover:bg-[#ff6b47] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" className="text-[#ff6b47] group-hover:text-black transition-colors">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#ff6b47]">On Campus</span>
                </div>
                
                <h2 className="font-black uppercase leading-[0.9] tracking-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                  Start Printing
                  <br />on Campus
                </h2>
                
                <p className="text-[#a3a3a3] text-[1rem] leading-relaxed mb-8">
                  Students and faculty can upload, pay, and print documents at any PrintIT kiosk
                  located across your college or university campus.
                </p>

                <div className="flex items-center gap-3 text-[#ff6b47] font-bold uppercase tracking-[0.12em] text-[0.75rem]">
                  <span>Go to App</span>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M3.5 10H14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    <path d="M9.85 4.5L15.5 10.1L9.85 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at center, rgba(255,107,71,0.05) 0%, transparent 70%)" }} />
            </motion.a>

            {/* Public Spaces Printing Card */}
            <motion.a
              href="https://printvendo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border border-white/10 bg-[#0a0a0a] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: smoothEase }}
              whileHover={{ scale: 1.02, borderColor: "#ff6b47" }}
            >
              {/* Coral accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6b47] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border border-[#ff6b47] flex items-center justify-center group-hover:bg-[#ff6b47] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" className="text-[#ff6b47] group-hover:text-black transition-colors">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#ff6b47]">Off Campus</span>
                </div>
                
                <h2 className="font-black uppercase leading-[0.9] tracking-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                  Start Printing
                  <br />in Public Spaces
                </h2>
                
                <p className="text-[#a3a3a3] text-[1rem] leading-relaxed mb-8">
                  Access printing services at public locations like malls, cafes, and co-working spaces.
                  Print documents anytime, anywhere in the city.
                </p>

                <div className="flex items-center gap-3 text-[#ff6b47] font-bold uppercase tracking-[0.12em] text-[0.75rem]">
                  <span>Go to PrintVendo</span>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M3.5 10H14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    <path d="M9.85 4.5L15.5 10.1L9.85 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(ellipse at center, rgba(255,107,71,0.05) 0%, transparent 70%)" }} />
            </motion.a>
          </div>

          {/* Bottom note */}
          <motion.p
            className="text-[#555] text-[0.75rem] mt-12 font-mono uppercase tracking-[0.15em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Secure • Fast • Available 24/7
          </motion.p>
        </motion.div>
      </div>

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
