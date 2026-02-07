"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, smoothEase } from "@/lib/animations";

const PodcastSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={sectionRef} className="relative bg-[#c4c4c4] z-[1]">
      {/* Grid Lines */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[16.6%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
      </div>

      {/* Top: Blur marquee + description */}
      <div className="relative overflow-hidden py-[15vw] md:py-[12vw]">
        {/* Echoes of Change marquee */}
        <motion.div
          className="flex whitespace-nowrap overflow-hidden"
          style={{ x: marqueeX }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="text-white text-[18vw] md:text-[14vw] font-semibold uppercase leading-none tracking-tight px-[2vw] shrink-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Echoes of Change.
            </div>
          ))}
        </motion.div>

        {/* Description text */}
        <motion.div
          className="relative z-10 mt-[10vw] md:mt-[8vw] px-[5vw] md:px-[17vw] max-w-[960px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.p
            className="text-white text-[1.1rem] md:text-[1.8vw] font-semibold leading-[1.3] tracking-tight"
            variants={fadeUp}
          >
            As part of the Innvera transmedia documentary, our podcast series
            delves into the stories of those looking for solutions to a
            sustainable future with unique and surprising perspectives. Each
            episode features conversations with visionaries, activists and
            innovators that challenge the status quo and make you rethink the way
            we live.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom: Two cards over background image */}
      <div ref={bottomRef} className="relative min-h-screen flex items-start">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_10.png"
            alt="Podcast"
            fill
            className="object-cover"
          />
        </div>

        {/* Cards Container */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-start px-[5vw] md:px-[16vw] pt-[25vw] md:pt-[20vw] pb-[15vw] gap-0">
          {/* The Podcast Card */}
          <motion.div
            className="w-full md:w-1/2 bg-[#ff6a41] text-white p-[2rem] md:p-[2.5vw] flex flex-col justify-between min-h-[50vh] md:min-h-[36vw]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            <h3
              className="text-[3rem] md:text-[3.5vw] font-semibold uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The
              <br />
              Podcast
            </h3>
            <div className="mt-8">
              <div className="mb-[3vw]">
                <span className="text-[1.1rem] md:text-[1.1vw] font-semibold inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  Coming soon
                </span>
              </div>
              <p className="text-[1rem] md:text-[1.1vw] font-semibold leading-[1.4] w-[80%]">
                Dive into the minds of visionaries leading groundbreaking
                initiatives. Hear their stories and learn how they&apos;re creating
                real change across the world.
              </p>
            </div>
          </motion.div>

          {/* The Crowdfunding Card */}
          <motion.div
            className="w-full md:w-1/2 text-white p-[2rem] md:p-[2.5vw] flex flex-col justify-between min-h-[50vh] md:min-h-[36vw] mt-[20vw] md:mt-[18vw]"
            style={{
              backdropFilter: "blur(50px)",
              WebkitBackdropFilter: "blur(50px)",
              background: "rgba(255, 255, 255, 0.02)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
          >
            <h3
              className="text-[3rem] md:text-[3.5vw] font-semibold uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The
              <br />
              Crowdfunding
            </h3>
            <div className="mt-8">
              <div className="mb-[3vw]">
                <a
                  href="https://www.verkami.com/locale/en/projects/40111-innvera-proyecto-transmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1.1rem] md:text-[1.1vw] font-semibold inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-5 h-5"
                  >
                    <path
                      d="M3.5 10.1H14.6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.85 4.56L15.39 10.1L9.85 15.64"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="square"
                    />
                  </svg>
                  View more
                </a>
              </div>
              <p className="text-[1rem] md:text-[1.1vw] font-semibold leading-[1.4] w-[80%]">
                Help us give a voice to the solutions transforming the world:
                support our podcast and be part of the change.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
