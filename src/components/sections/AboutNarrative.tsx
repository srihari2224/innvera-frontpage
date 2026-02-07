"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const content = [
  {
    number: "01.",
    text: "Innvera is a transmedia documentary that uncovers humanity's hidden capacity to tackle the climate crisis.",
  },
  {
    number: "02.",
    text: "Through film, podcasts, shared initiatives, and crowdfunding, Innvera challenges the narrative of helplessness and reveals the global solutions already emerging beneath the surface.",
  },
  {
    number: "03.",
    text: "It's an invitation to reimagine the future and reconnect with our ability to transform it.",
  },
];

const images = [
  "/assets/images/about1.jpg",
  "/assets/images/about2.jpg",
  "/assets/images/about3.jpg",
];

const AboutNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on scroll position of text blocks
  // This is a simplified approach using IntersectionObserver conceptual logic via Framer Motion's onViewportEnter/Leave could work,
  // but let's use a sticky layout where we track the scroll progress of the container.

  return (
    <section ref={containerRef} className="relative bg-black text-white">
      <div className="flex flex-col md:flex-row">
        {/* Sticky Image Section */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={src}
                alt={`About Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}

          {/* Vertical Lines Overlay in Image Section */}
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            <div className="absolute left-1/2 h-full w-[1px] bg-white/20" />
          </div>
        </div>

        {/* Scrollable Text Section */}
        <div className="w-full md:w-1/2 relative z-10">
          {content.map((item, index) => (
            <TextBlock
              key={index}
              item={item}
              index={index}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TextBlock = ({ item, index, setActiveIndex }: { item: any, index: number, setActiveIndex: (i: number) => void }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center p-8 md:p-20 border-l border-white/10"
      onViewportEnter={() => setActiveIndex(index)}
      viewport={{ amount: 0.5 }}
    >
      <span className="font-mono text-sm md:text-base text-gray-400 mb-4 block">
        {item.number}
      </span>
      <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
        {item.text}
      </p>
      {index === 1 && (
        <div className="mt-12 opacity-50">
          <Image
            src="/assets/images/texture.png"
            alt="Texture"
            width={300}
            height={200}
            className="object-contain invert"
          />
        </div>
      )}
    </motion.div>
  )
}

export default AboutNarrative;
