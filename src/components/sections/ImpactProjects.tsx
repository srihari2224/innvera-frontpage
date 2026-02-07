"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "wardrobe-theory",
    title: "Wardrobe Theory Project",
    impact: [
      "WTP helps individuals and organizations reimagine their ",
      "relationship to clothing and consumption through systems, ",
      "storytelling, analysis, and community-based events.",
    ],
    scope: "Fashion Publishing / Design",
    location: "Des Moines, Iowa , United States",
    year: "2024",
    image: "/assets/images/projects.jpg", // Using downloaded asset as placeholder for all
    link: "/impact-in-action/wardrobe-theory-project",
  },
  {
    id: "positive-money",
    title: "Positive Money",
    impact: [
      "Redesign the global economic system for social justice and a ",
      "livable planet",
    ],
    scope: "Economics",
    location: "London, United Kingdom",
    year: "2010",
    image: "/assets/images/projects.jpg",
    link: "/impact-in-action/positive-money",
  },
  {
    id: "time-use",
    title: "Time use initiative",
    impact: [
      "The global initiative promoting time policies and the right to time ",
      "to reduce time inequality and enhance health and overall ",
      "wellbeing.",
    ],
    scope: "Human Wellfare",
    location: "Barcelona, Spain",
    year: "2014",
    image: "/assets/images/projects.jpg",
    link: "/impact-in-action/time-use-initiative",
  },
  {
    id: "cateura",
    title: "Escuela de Cateura",
    impact: [
      "The Recycled Orchestra of Cateura consists of children ",
      "playing instruments made entirely from waste.",
    ],
    scope: "Social Innovation",
    location: "Asunción, Paraguay",
    year: "2012",
    image: "/assets/images/projects.jpg",
    link: "/impact-in-action/escuela-de-cateura",
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
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        {/* Background Image Parallax layer could go here */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/assets/images/projects.jpg"
            alt="Projects Background"
            fill
            className="object-cover"
          />
        </div>

        <motion.div
          className="flex gap-10 pl-[50vw]" // Start padded so first scroll brings it in
          style={{ x }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[80vw] md:w-[60vw] lg:w-[40vw] h-[70vh] bg-white relative shrink-0 flex flex-col p-8"
            >
              <div className="h-1/2 relative overflow-hidden mb-4 bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 text-black">
                <h3 className="text-3xl md:text-5xl font-bold uppercase">{project.title}</h3>
                <div className="text-lg md:text-xl">
                  {project.impact.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="mt-auto border-t border-black/20 pt-4 flex justify-between text-sm opacity-60">
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
