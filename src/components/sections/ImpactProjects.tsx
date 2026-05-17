"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "managed-model",
    title: "Fully Managed Kiosk",
    impact: [
      "We install, operate, and maintain everything.",
      "You provide the space. We handle the rest.",
      "Students get 24/7 printing from day one.",
    ],
    scope: "Zero Investment Model",
    location: "Best for: Institutions wanting zero hassle",
    year: "Model A",
    image: "/assets/images/about1.jpg",
    link: "/models/managed",
  },
  {
    id: "ownership-model",
    title: "Own Your Kiosk",
    impact: [
      "Purchase the kiosk for ₹85,000 + GST.",
      "Keep 80% of every print transaction.",
      "Full ownership, full control, maximum return.",
    ],
    scope: "High Revenue Model",
    location: "Best for: Institutions wanting full control",
    year: "Model B",
    image: "/assets/images/about2.jpg",
    link: "/models/ownership",
  },
  {
    id: "by-the-numbers",
    title: "By the Numbers",
    impact: [
      "₹75,000+ monthly revenue potential.",
      "500 prints per day at peak usage.",
      "2–5 days to install and go live.",
    ],
    scope: "Real Results",
    location: "Based on live campus data",
    year: "2025",
    image: "/assets/images/about3.jpg",
    link: "/models",
  },
];

const ImpactProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="relative h-[260vh] sm:h-[300vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <motion.div
          className="flex gap-6 sm:gap-10 pl-[20vw] sm:pl-[35vw] md:pl-[50vw]"
          style={{ x }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] h-[68vh] sm:h-[70vh] bg-white relative shrink-0 flex flex-col p-5 sm:p-8"
            >
              <div className="h-1/2 relative overflow-hidden mb-4 bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 text-black">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase">{project.title}</h3>
                <div className="text-sm sm:text-lg md:text-xl">
                  {project.impact.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="mt-auto border-t border-black/20 pt-3 sm:pt-4 flex justify-between text-xs sm:text-sm opacity-60">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactProjects;
