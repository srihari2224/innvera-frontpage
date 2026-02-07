"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, wordReveal, smoothEase } from "@/lib/animations";

interface WordProps {
  text: string;
  bold?: boolean;
}

const words: WordProps[] = [
  { text: "Around" },
  { text: "the" },
  { text: "world," },
  { text: "thousands", bold: true },
  { text: "of" },
  { text: "initiatives", bold: true },
  { text: "are" },
  { text: "quietly" },
  { text: "revolutionizing" },
  { text: "our" },
  { text: "predatory" },
  { text: "system," },
  { text: "though\u2014" },
  { text: "like", bold: true },
  { text: "an", bold: true },
  { text: "iceberg\u2014they", bold: true },
  { text: "often" },
  { text: "remain" },
  { text: "hidden", bold: true },
  { text: "beneath" },
  { text: "the" },
  { text: "surface.", bold: true },
];

const OrangeStatement: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#ff6a41] py-[20vh] md:py-[25vh]"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container relative z-10 px-8 md:px-[10%]">
        <motion.div
          className="text-center md:text-left"
          style={{
            color: "#ffffff",
            fontFamily: '"Inter", sans-serif',
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.04, 0.1)}
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-x-[0.3em] gap-y-1">
            {words.map((word, i) => (
              <motion.div
                key={i}
                className={`inline-flex ${word.bold ? "font-black uppercase" : ""}`}
                variants={wordReveal}
              >
                <span>{word.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SVG decorative path with draw animation */}
        <motion.svg
          className="absolute pointer-events-none opacity-20"
          viewBox="0 0 100 100"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120%",
            height: "120%",
            zIndex: -1,
          }}
        >
          <motion.path
            d="M0,50 Q25,25 50,50 T100,50"
            fill="none"
            stroke="white"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: smoothEase }}
          />
        </motion.svg>
      </div>

      {/* Grid Lines */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-between px-[10%]">
        <div className="w-px h-full bg-white/10" />
        <div className="w-px h-full bg-white/10" />
        <div className="w-px h-full bg-white/10" />
      </div>

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

export default OrangeStatement;
