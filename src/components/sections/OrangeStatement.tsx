"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * OrangeStatement — Editorial coral banner.
 *  Layout reference: "YOU CAN Taste GOOD DESIGN" with a script middle-word.
 *  Bottom-right heart icon + "Likes" affordance, click increments.
 */

const BG = "#c0524a";       // muted coral / brick
const INK = "#f4e7d6";      // cream

const OrangeStatement: React.FC = () => {
  const [likes, setLikes] = useState(128);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((l) => {
      setLikes((n) => (l ? n - 1 : n + 1));
      return !l;
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{
        background: BG,
        color: INK,
        minHeight: "70svh",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Editorial sentence */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-bold uppercase leading-[0.92] tracking-[-0.01em]"
          style={{
            fontFamily: '"Bebas Neue", "Inter", sans-serif',
            fontSize: "clamp(2.6rem, 9vw, 9rem)",
            color: INK,
          }}
        >
          <span className="block">You Can</span>
          <span className="block">
            <span
              className="italic normal-case mr-3"
              style={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "0.01em",
              }}
            >
              Print
            </span>
            Good
          </span>
          <span className="block">Design.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-6 sm:mt-8 max-w-[44ch] leading-relaxed"
          style={{
            color: "rgba(244,231,214,0.78)",
            fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
          }}
        >
          Self-service kiosks built for campuses. Upload, pay, print —
          no queues, no staff, zero hassle. Print better. Print smarter.
        </motion.p>
      </div>

      {/* ❤ Likes affordance — bottom right */}
      <button
        type="button"
        onClick={toggleLike}
        aria-label="Like"
        className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 z-20"
        style={{ background: "transparent", border: "none", color: INK }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill={liked ? INK : "none"}
          stroke={INK}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span
          className="text-[0.85rem] font-medium tracking-wide"
          style={{ color: INK }}
        >
          {likes.toLocaleString()} {likes === 1 ? "Like" : "Likes"}
        </span>
      </button>

      {/* Top corner mark */}
      <span
        className="absolute top-6 sm:top-10 right-6 sm:right-10 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.32em] z-20"
        style={{ color: "rgba(244,231,214,0.55)", fontFamily: "'DM Mono', monospace" }}
      >
        Sec · 02 / Statement
      </span>
    </section>
  );
};

export default OrangeStatement;
