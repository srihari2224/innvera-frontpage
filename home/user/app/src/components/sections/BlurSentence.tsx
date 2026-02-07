"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BlurSentence = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const sentence = "Change begins where we're not looking.";

  return (
    <section
      ref={containerRef}
      className="relative bg-black min-h-[100svh] w-full flex items-center overflow-hidden"
      style={{ paddingTop: "clamp(80px, 10vw, 200px)" }}
    >
      {/* Grid Lines */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[16.6%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-[1px] bg-white opacity-10" />
      </div>

      {/* Scrolling marquee text with blur effect */}
      <motion.div
        className="relative w-full flex flex-nowrap whitespace-nowrap z-30 py-[3vw]"
        style={{ x }}
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className="text-white px-[2vw] shrink-0 uppercase font-semibold"
            style={{
              fontSize: "clamp(3rem, 14vw, 18rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {sentence.split("").map((char, idx) => (
              <span
                key={`${i}-${idx}`}
                className="inline-block will-change-transform"
                style={{
                  animationName: "blurPulse",
                  animationDuration: `${2 + (idx % 5) * 0.4}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes blurPulse {
          0% {
            text-shadow: 0 0 0 #fff;
            color: transparent;
          }
          50% {
            text-shadow: 0 0 clamp(5px, 2vw, 30px) #fff;
            color: transparent;
          }
          100% {
            text-shadow: 0 0 0 #fff;
            color: transparent;
          }
        }
      `}</style>
    </section>
  );
};

export default BlurSentence;
