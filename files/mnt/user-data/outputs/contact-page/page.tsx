"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothEase, snappyEase, staggerContainer, fadeUp } from "@/lib/animations";

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

// ─── Input field component ───────────────────────────────────────────────────
const Field = ({
  label, name, type = "text", value, onChange, required = false, as
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean; as?: "textarea" | "select"; children?: React.ReactNode;
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const sharedProps = {
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
  };

  return (
    <div className="relative border-t border-white/15 group">
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] pt-4 pb-1 font-semibold transition-colors duration-200" style={{ color: focused ? "#ff6b47" : "#555" }}>
        {label}{required && " *"}
      </label>

      {as === "textarea" ? (
        <textarea
          {...sharedProps}
          rows={4}
          className="w-full bg-transparent text-[1rem] font-medium pb-4 outline-none resize-none placeholder:text-[#222] transition-all duration-200 text-white"
          style={{ caretColor: "#ff6b47" }}
        />
      ) : as === "select" ? (
        <select
          {...(sharedProps as any)}
          className="w-full bg-transparent text-[1rem] font-medium pb-4 pt-1 outline-none text-white border-none appearance-none cursor-pointer"
          style={{ caretColor: "#ff6b47" }}
        >
          <option value="" disabled className="bg-black">Select an option</option>
          <option value="managed" className="bg-black">Model A — Fully Managed Kiosk (Zero Investment)</option>
          <option value="ownership" className="bg-black">Model B — Own the Kiosk (₹85,000 + GST)</option>
          <option value="pilot" className="bg-black">60-Day Free Pilot Program</option>
          <option value="demo" className="bg-black">Just a Demo First</option>
          <option value="other" className="bg-black">General Enquiry</option>
        </select>
      ) : (
        <input
          {...sharedProps}
          type={type}
          className="w-full bg-transparent text-[1rem] font-medium pb-4 outline-none placeholder:text-[#222] transition-all duration-200 text-white"
          style={{ caretColor: "#ff6b47" }}
        />
      )}

      {/* Underline indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 transition-all duration-300" />
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-[#ff6b47] transition-all duration-500"
        style={{ width: focused ? "100%" : "0%" }}
      />
    </div>
  );
};

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", institution: "", role: "", email: "", phone: "", interest: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate submission — replace with actual API call to your backend
    await new Promise((res) => setTimeout(res, 1800));

    // On success:
    setFormState("success");

    // Reset after 5s
    setTimeout(() => {
      setFormState("idle");
      setForm({ name: "", institution: "", role: "", email: "", phone: "", interest: "", message: "" });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="vertical-grid-line" style={{ left: "16.6%" }} />
      <div className="vertical-grid-line" style={{ left: "50%" }} />
      <div className="vertical-grid-line" style={{ left: "83.3%" }} />
      <PageHeader />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Vertical divider (desktop) */}
        <div className="hidden lg:block absolute top-0 bottom-0 w-[1px] pointer-events-none z-10" style={{ left: "50%", background: "rgba(255,255,255,0.08)" }} />

        {/* ── LEFT: Info Panel ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-between px-[2rem] lg:px-[5vw] pt-[140px] pb-16 border-b lg:border-b-0 relative overflow-hidden"
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: smoothEase }}
        >
          {/* Subtle coral glow */}
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,107,71,0.05) 0%, transparent 70%)" }} />

          <div>
            <motion.p
              className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              Let's Talk
            </motion.p>

            <motion.h1
              className="font-black uppercase leading-[0.85] tracking-[-0.03em] mb-10"
              style={{ fontSize: "clamp(3.5rem,8vw,8rem)" }}
              initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: snappyEase, delay: 0.2 }}
            >
              Bring
              <br />PrintIT
              <br />to Your
              <br /><span style={{ color: "#ff6b47" }}>Campus.</span>
            </motion.h1>

            <motion.p
              className="text-[#a3a3a3] text-[1rem] leading-relaxed max-w-[400px] mb-16"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Fill in the form and we'll reach out within 24 hours with a
              customised proposal and a demo appointment at your campus.
            </motion.p>

            {/* Contact details */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                {
                  label: "Phone / WhatsApp",
                  value: "+91 9392861389",
                  href: "https://wa.me/919392861389",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  )
                },
                {
                  label: "Email",
                  value: "innveratechnology@gmail.com",
                  href: "mailto:innveratechnology@gmail.com",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  label: "Address",
                  value: "22-8-152/A3, Madhav Puram, Tirupati – 517507, AP",
                  href: "https://maps.google.com/?q=Tirupati+Andhra+Pradesh",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#ff6b47] group-hover:text-[#ff6b47] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#555] mb-1">{item.label}</p>
                    <p className="text-[0.9rem] group-hover:text-[#ff6b47] transition-colors duration-300">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* CIN bottom */}
          <motion.p
            className="font-mono text-[0.6rem] text-[#333] mt-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          >
            CIN: U28299AP2025PTC120873
          </motion.p>
        </motion.div>

        {/* ── RIGHT: Form Panel ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-center px-[2rem] lg:px-[5vw] pt-[140px] pb-16 bg-[#050505]"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: smoothEase, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                {/* Animated check */}
                <motion.div
                  className="w-20 h-20 border-2 border-[#ff6b47] flex items-center justify-center mb-8"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.svg viewBox="0 0 24 24" fill="none" width="32" height="32"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}>
                    <motion.path d="M5 13l4 4L19 7" stroke="#ff6b47" strokeWidth="2" strokeLinecap="square"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }} />
                  </motion.svg>
                </motion.div>
                <h2 className="font-black uppercase text-[2.5rem] tracking-tight leading-[0.9] mb-4">
                  Message<br />Sent.
                </h2>
                <p className="text-[#a3a3a3] text-[1rem] max-w-[320px] leading-relaxed">
                  We'll be in touch within 24 hours. Expect a call or WhatsApp from the Innvera team.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-0 w-full max-w-[520px]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#ff6b47] mb-10">
                  Send Us a Message
                </p>

                <Field label="Your Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Institution / College Name" name="institution" value={form.institution} onChange={handleChange} required />
                <Field label="Your Role (e.g. Registrar, Dean, Principal)" name="role" value={form.role} onChange={handleChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                  <Field label="Phone / WhatsApp" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                </div>

                <Field label="I'm Interested In" name="interest" value={form.interest} onChange={handleChange} as="select" />
                <Field label="Tell Us About Your Campus" name="message" value={form.message} onChange={handleChange} as="textarea" />

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="mt-8 w-full py-5 font-bold uppercase tracking-[0.15em] text-[0.75rem] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-3"
                  style={{ background: "#ff6b47", color: "#000" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e05a38"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ff6b47"; }}
                >
                  {formState === "submitting" ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                        <path d="M3.5 10H14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        <path d="M9.85 4.5L15.5 10.1L9.85 15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[#444] text-[0.7rem] mt-4 text-center leading-relaxed">
                  We respond within 24 hours. You can also reach us directly at{" "}
                  <a href="https://wa.me/919392861389" className="text-[#ff6b47] hover:underline">WhatsApp</a>.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── QUICK LINKS BOTTOM BAR ────────────────────────────────────────── */}
      <div className="border-t border-white/10 px-[2rem] lg:px-[5vw] py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Want to see it first?", action: "View PrintIT →", href: "/printit" },
          { label: "Compare our models", action: "Model A vs B →", href: "/models" },
          { label: "Download proposals", action: "Get the PDF →", href: "mailto:innveratechnology@gmail.com?subject=Proposal Request" },
        ].map((item) => (
          <a key={item.label} href={item.href} className="group border border-white/10 p-6 hover:border-[#ff6b47] transition-colors duration-300">
            <p className="text-[#555] text-[0.75rem] uppercase tracking-[0.1em] mb-2">{item.label}</p>
            <p className="font-bold text-[1rem] uppercase tracking-tight group-hover:text-[#ff6b47] transition-colors duration-300">{item.action}</p>
          </a>
        ))}
      </div>

      <div className="border-t border-white/10 px-[2rem] py-6 flex justify-between items-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">© 2025 Innvera Technology Pvt. Ltd.</span>
        <div className="flex gap-6 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#4a4a4a]">
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  );
}
