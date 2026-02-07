"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, smoothEase } from "@/lib/animations";

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
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_5.png",
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
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_6.png",
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
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_7.png",
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
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_8.png",
    link: "/impact-in-action/escuela-de-cateura",
  },
  {
    id: "community-wealth",
    title: "Comm. Wealth Building",
    impact: [
      "A transformative approach to local economic development ",
      "that creates fair and democratic economies.",
    ],
    scope: "Economy",
    location: "Preston, United Kingdom",
    year: "2011",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f482e8ff-d9d3-4b36-858e-09a364697234-icebergdoc-org/assets/images/images_9.png",
    link: "/impact-in-action/community-wealth-building",
  },
];

const ImpactProjects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="impact-in-action"
      className="relative w-full bg-[#000000] overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vertical Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-[2rem]">
        <div className="w-[1px] h-full bg-white/10" />
        <div className="w-[1px] h-full bg-white/10" />
        <div className="w-[1px] h-full bg-white/10" />
        <div className="w-[1px] h-full bg-white/10" />
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto scrollbar-hide py-[12vh] z-20 scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex px-[10vw] gap-[4vw] min-w-max items-start">
          {/* Section Intro Text */}
          <motion.div
            className="project-intro-text w-[30vw] max-w-[450px] shrink-0 pt-[2vw] snap-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-[2.2rem] leading-[1.3] text-white font-normal font-display">
              Projects across the globe that challenge the status quo and
              reimagine what&apos;s possible. From regenerative economy to sustainable
              technology and community-driven solutions, these initiatives reveal
              the power of collective action in building a resilient, sustainable
              future.
            </p>
          </motion.div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              className="group relative flex flex-col w-[32vw] min-w-[380px] max-w-[590px] h-[72vh] min-h-[550px] bg-white snap-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: smoothEase,
              }}
              whileHover={{ y: -8 }}
            >
              {/* Card Image */}
              <div className="relative flex-1 overflow-hidden bg-zinc-900">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </div>

              {/* Card Content */}
              <div className="p-[3.5rem] flex flex-col justify-between h-[45%] bg-white text-black">
                <div className="space-y-6">
                  <h3 className="text-[2.4rem] font-black uppercase tracking-tighter leading-[0.9] font-display">
                    {project.title}
                  </h3>
                  <div className="space-y-1">
                    {project.impact.map((line, idx) => (
                      <p
                        key={idx}
                        className="text-[1.4rem] leading-[1.4] text-black/80 font-display"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-10 flex flex-col space-y-2 border-t border-black/10">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-[1.1rem] font-bold uppercase tracking-wider opacity-60 font-display">
                      {project.scope}
                    </span>
                    <span className="text-[1.1rem] font-bold font-mono">
                      {project.year}
                    </span>
                  </div>
                  <div className="text-[1.1rem] opacity-60 font-display">
                    {project.location}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          {/* End spacer */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ImpactProjects;
