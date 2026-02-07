"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, fadeIn, smoothEase } from "@/lib/animations";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <footer className="bg-black text-white relative w-full pt-[35vw] overflow-hidden z-0">
      {/* Structural Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute left-[16.6%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
      </div>

      {/* ── Contact Sentence ── */}
      <motion.div
        className="relative z-[2] text-center py-[14vw] md:py-[10vw] px-[5vw]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.08)}
      >
        <motion.div
          className="max-w-[900px] mx-auto text-[#272727] text-[5vw] md:text-[3.6vw] font-[650] leading-[1.02] tracking-tight text-center"
          variants={fadeUp}
        >
          We&apos;d love to hear from you. Whether you&apos;re interested in learning
          more about Iceberg, collaborating on an initiative, or sharing your
          insights, reach out! Together, we can amplify the impact and bring
          these hidden forces of change to the surface.
        </motion.div>

        {/* Contact Us Link */}
        <motion.div className="mt-[5vw]" variants={fadeUp}>
          <a
            href="mailto:contact@icebergdoc.org"
            className="text-white text-[5vw] md:text-[3.6vw] font-[650] leading-[1.02] tracking-tight uppercase hover:opacity-80 transition-opacity inline-block relative group"
          >
            Contact us
            <span className="block h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Newsletter + Social Links ── */}
      <motion.div
        className="relative z-[2] flex flex-col md:flex-row justify-between px-[5vw] md:px-[17vw] pb-[10vw]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.1)}
      >
        {/* Left: Newsletter */}
        <motion.div className="md:w-[55%] order-2 md:order-1 mt-[10vw] md:mt-0" variants={fadeUp}>
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-wider mb-[0.8vw]">
            Stay tuned
          </h4>
          <p className="text-[1.8vw] md:text-[1.8vw] font-[650] leading-[1.1] tracking-tight mb-[2vw] max-w-[500px]"
            style={{ fontSize: "clamp(1rem, 1.8vw, 2rem)" }}
          >
            Don&apos;t miss a step in the journey of discovery with Iceberg. Join
            us as we uncover the hidden forces shaping a sustainable future and
            stay updated on every new initiative, story, and insight.
          </p>

          <form className="mt-[2vw]" onSubmit={(e) => e.preventDefault()}>
            {/* Email input + submit button */}
            <div className="flex">
              <div className={`relative flex-1 border border-white/20 ${focused ? "border-white/40" : ""} transition-colors`}>
                <label
                  className={`absolute left-[1vw] transition-all text-[#9a9a9a] pointer-events-none ${
                    focused || email
                      ? "top-[0.5vw] text-[0.7rem]"
                      : "top-[50%] -translate-y-1/2 text-[1rem]"
                  }`}
                  style={{ fontSize: focused || email ? "clamp(0.6rem, 0.8vw, 0.9rem)" : "clamp(0.9rem, 1vw, 1.2rem)" }}
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="bg-transparent w-full h-[4.6vw] min-h-[50px] px-[1vw] pt-[1.2vw] text-white outline-none"
                  style={{ fontSize: "clamp(0.9rem, 1vw, 1.2rem)" }}
                />
              </div>
              <button
                className="bg-[#ff6a41] hover:bg-[#fa5325] transition-colors w-[4.6vw] min-w-[50px] h-[4.6vw] min-h-[50px] flex items-center justify-center text-white"
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 24 25" fill="none" className="w-6 h-6">
                  <path
                    d="M5 11H3V13H5V11ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11V13ZM5 13H19V11H5V13Z"
                    fill="currentColor"
                  />
                  <path d="M13 18L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                  <path d="M13 6L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-[1vw] mt-[1.5vw]">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`w-[1.2vw] min-w-[18px] h-[1.2vw] min-h-[18px] border ${
                  agreed ? "border-white" : "border-white/40"
                } flex items-center justify-center transition-colors shrink-0 mt-[2px]`}
              >
                {agreed && (
                  <svg viewBox="0 0 24 24" fill="none" className="w-[70%] h-[70%]">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-[#9a9a9a] leading-[1.3]" style={{ fontSize: "clamp(0.6rem, 0.65vw, 0.8rem)" }}>
                I agree to receive communications and updates from Iceberg.
                I confirm that I have reviewed, and accepted our{" "}
                <a href="/privacy-policy" className="text-white hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>
          </form>
        </motion.div>

        {/* Right: Social Links */}
        <motion.div className="md:w-[35%] md:text-right order-1 md:order-2" variants={fadeUp}>
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-wider mb-[0.8vw]">
            Follow us
          </h4>
          <ul className="flex flex-col gap-[0.5vw]">
            {[
              { text: "Spotify – Iceberg Podcast", href: "https://open.spotify.com/episode/5QKtC1WVBtCgnXFdHhaJMH?si=b7e1f91c2f644e5b" },
              { text: "Verkami", href: "https://www.verkami.com/locale/en/projects/40111-iceberg-proyecto-transmedia" },
              { text: "Instagram", href: "https://www.instagram.com/alhenaproduction/?hl=am-et" },
              { text: "Vimeo", href: "https://vimeo.com/alhena" },
            ].map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[650] leading-[1.1] tracking-tight inline-block relative group hover:opacity-80 transition-opacity"
                  style={{ fontSize: "clamp(1rem, 1.8vw, 2rem)" }}
                >
                  {link.text}
                  <span className="block h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right hover:origin-left" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* ── EU Logo ── */}
      <div className="relative z-[2] px-[5vw] md:px-[17vw] pb-[2vw] pt-[12vw]">
        <div className="text-[#9a9a9a] text-[0.65vw] leading-[1.2] mb-[0.8vw]"
          style={{ fontSize: "clamp(0.55rem, 0.65vw, 0.75rem)" }}
        >
          With the support of
        </div>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/svgs/eu-1.svg"
          alt="Creative Europe Media"
          width={165}
          height={40}
          className="opacity-80"
        />
      </div>

      {/* ── Copyright Row ── */}
      <div className="relative z-[2] flex flex-col md:flex-row items-center justify-between px-[5vw] md:px-[17vw] pb-[2vw] pt-[1vw]">
        <div className="text-white text-[0.7rem] font-semibold uppercase tracking-tight">
          <span>Alhena production. </span>
          <span>&copy;All rights reserved 2026</span>
        </div>
        <div className="text-white text-[0.7rem] font-semibold uppercase tracking-tight flex items-center gap-1 mt-2 md:mt-0">
          <span>Designed</span> <span className="lowercase">by</span>
          <a
            href="https://www.plastic.design"
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:opacity-80 transition-opacity"
          >
            Plastic.design
          </a>
        </div>
        <div className="text-white text-[0.7rem] font-semibold uppercase tracking-tight mt-2 md:mt-0">
          <a href="/" className="hover:opacity-80 transition-opacity">English</a>
          <span>  /  </span>
          <a href="/es" className="hover:opacity-80 transition-opacity">Espa&ntilde;ol</a>
        </div>
      </div>

      {/* ── Giant ICEBERG Text ── */}
      <div className="relative z-[2] w-full overflow-hidden mt-[2vw]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
        >
          <span
            className="text-white text-[25vw] font-semibold uppercase leading-[0.9] tracking-tight block"
            style={{ transform: "translate(-1.5%)" }}
          >
            Iceberg
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
