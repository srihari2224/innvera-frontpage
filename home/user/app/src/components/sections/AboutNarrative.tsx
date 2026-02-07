"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01.",
    text: "Iceberg is a transmedia documentary that uncovers humanity's hidden capacity to tackle the climate crisis.",
    colStart: "col-start-2",
    numCol: "col-start-2 col-span-1",
    textCol: "col-start-3 col-span-8 md:col-span-5",
  },
  {
    number: "02.",
    text: "Through film, podcasts, shared initiatives, and crowdfunding, Iceberg challenges the narrative of helplessness and reveals the global solutions already emerging beneath the surface.",
    colStart: "col-start-6",
    numCol: "col-start-6 col-span-1",
    textCol: "col-start-7 col-span-6",
  },
  {
    number: "03.",
    text: "It's an invitation to reimagine the future and reconnect with our ability to transform it.",
    colStart: "col-start-2",
    numCol: "col-start-2 col-span-1",
    textCol: "col-start-3 col-span-8 md:col-span-4",
  },
];

const AboutNarrative = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Parallax on background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="home-about relative bg-black overflow-hidden"
    >
      {/* Background Pinned Mountain Image with parallax */}
      <div className="pin-spacer h-screen sticky top-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y: bgY, scale: bgScale }}
          >
            <Image
              alt="About"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_1.png"
              className="object-cover w-full h-full opacity-60 mix-blend-luminosity"
              width={1920}
              height={1080}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
      </div>

      {/* Structural Vertical Lines */}
      <div className="fixed inset-0 flex justify-between pointer-events-none z-50 px-0">
        <div className="w-[1px] h-full bg-white/10 ml-[33.33%]" />
        <div className="w-[1px] h-full bg-white/10 mr-[33.33%]" />
      </div>

      {/* Narrative Content */}
      <div className="relative z-10 -mt-[100vh]">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="flex flex-col items-start justify-center min-h-screen px-4 md:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer(0.12, index * 0.05)}
          >
            <div className="w-full max-w-7xl mx-auto grid grid-cols-12">
              <motion.div
                className={`${step.numCol} font-mono text-[14px] md:text-[18px] text-white opacity-80 pt-2`}
                variants={fadeUp}
              >
                {step.number}
              </motion.div>
              <motion.div
                className={`${step.textCol} font-display text-[24px] md:text-[34px] lg:text-[42px] font-medium leading-[1.2] text-white`}
                variants={fadeUp}
                style={{ textWrap: "balance" }}
              >
                {step.text}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Texture overlay on step 02 area */}
        <div className="absolute left-[40%] top-[45%] w-[300px] h-[200px] opacity-20 pointer-events-none hidden md:block">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_4.png"
            alt="texture"
            width={400}
            height={300}
            className="object-cover w-full h-full grayscale invert"
          />
        </div>
      </div>

      {/* Floating Discover Button */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="rotate-90 origin-right translate-x-12">
          <a
            href="/the-project"
            className="bg-[#ffd34f] text-black px-8 py-4 font-display font-bold uppercase tracking-wider text-[12px] flex items-center gap-3 hover:bg-white transition-colors duration-300"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="15" height="15" fill="currentColor" />
              <path
                d="M7.5 3L7.5 12M7.5 12L4 8.5M7.5 12L11 8.5"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
            Discover the project
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutNarrative;
