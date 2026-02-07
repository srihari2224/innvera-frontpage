"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, smoothEase } from "@/lib/animations";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-10%"]);

  // Clip-path animation: starts small, expands to full
  const clipProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Video with clip-path reveal */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          clipPath: useTransform(
            clipProgress,
            [0, 1],
            [
              "polygon(42% 38%, 58% 38%, 58% 62%, 42% 62%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ]
          ),
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Central ICEBERG text with staggered reveal */}
      <motion.div
        className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="relative text-center select-none w-full overflow-hidden">
          <motion.div
            className="relative z-30 flex justify-center items-center"
            variants={staggerContainer(0.06, 0.5)}
            initial="hidden"
            animate="visible"
          >
            {["I", "C", "E", "B", "E", "R", "G"].map((char, i) => (
              <motion.span
                key={i}
                className="text-white inline-block"
                style={{
                  fontSize: "clamp(4rem, 16vw, 20rem)",
                  fontWeight: 600,
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                }}
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Handwritten tagline SVG at bottom */}
      <motion.div
        className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 145 83"
          className="w-[120px] md:w-[160px] h-auto text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M65.029 21.792c-.691 2.996-1.57 5.938-2.395 8.898-.2.722-.554 1.645-.554 2.445M63.668 28.145c1.554-.367 2.884-.54 4.083-1.588M68.659 21.566c-.292 3.675-.401 7.23-.227 10.889M73.65 23.834c-.963 1.878-1.566 3.691-1.311 5.823.112.942 1.49 3.917 2.344 1.689.656-1.713.639-5.288-.82-6.617-1.393-1.27-2.316 1.382-2.709 2.281M79.094 22.7c.076 2.041.273 4.08.58 6.1.14.918.135 1.323.781 1.84"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M77.28 21.339c2.443-.162 5.858-.776 7.965.958.897.738-.818 1.116-1.223 1.21-1.6.369-3.236.567-4.827.982-1.355.354-.675.4.126.48M89.303 22.927c-.378 2.098-1.399 7.525 2.067 7.663 3.287.13 6.79-1.2 9.957-1.992"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M88.395 27.237c5.39-1.216 10.8-2.34 16.108-3.857M88.622 22.7c7.321-1.603 14.658-3.068 22.006-4.537M4.684 53.78c.111 1.724.168 3.442.24 5.167.02.471-.059 1.064.44.731"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M.374 54.46c2.396-.768 4.821-1.458 7.335-1.714.942-.096 4.23.093 2.344 1.79-1.168 1.051-3.249 1.53-4.764 1.689-1.503.158-.994.08.126-.19 1.664-.399 8.795-2.452 6.78 1.576-.866 1.733-3.757 1.918-5.406 2.306-1.914.45-3.801 1.027-5.735 1.35M14.212 55.821c2.21 3.682 6.227 1.568 9.528.908"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M13.758 56.275a210.766 210.766 0 0 1 6.58-2.042M12.851 53.78c4.366-1.32 8.87-2.326 13.158-3.857M31.227 49.923c-.46.658-2.31 2.564-1.538 3.529.503.629 1.705.762 2.445.781 1.71.045 3.265-.882 4.764-1.588M39.62 49.47c-.839 1.35-1.903 2.947-1.424 4.65.368 1.306 2.986-.077 3.517-.39 1.154-.683 2.545-3.06 1.046-4.16-.871-.639-1.587.408-2.004 1.034M47.334 48.562c-.174 2.292-.454 4.553-.756 6.83-.105.788-.234 1.79.227.43.72-2.13 1.136-4.367 1.89-6.479.364-1.02.958-.797 1.084.177.148 1.142-.078 3.11.68 4.058 1.259 1.573 2.906-7.206 4.31-6.503 1.639.819.242 5.73 0 6.931-.08.4-1.139 4.196-.176 2.27M59.357 49.696c-.26 2.135-1.96 9.894 2.496 9.251 1.584-.229 3.208-1 4.575-1.802.634-.373.475-.416-.038-.416"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M57.089 54.007c2.692-.4 5.474-.677 7.94-1.815M58.677 49.47c6.636-.821 13.224-1.523 19.51-3.857M22.877 81.777c0 1.701.556-1.386.733-1.878 1.14-3.177 2.247-6.458 4.373-9.135 1.554-1.958 1.854-.705 1.854 1.305 0 2.685-.688 5.489.046 8.06"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M23.701 76.42c5.005-.501 9.88-1.269 14.837-2.061M47.56 68.072c.023 1.98.052 3.959.152 5.936.091 1.801.48 3.108.756 4.726"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M46.653 64.442c3.755-.114 6.927.904 8.104 4.915.837 2.852.157 5.588-1.878 7.663-2.239 2.283-6.874 4.558-9.402 1.714M59.584 66.484c-.282 3.714-.908 7.42-1.36 11.116M65.029 63.535c-2.151.33-1.473 1.73-.025 2.772.957.69 3.27 1.408 2.898 3.038-.374 1.636-5.262 3.62-4.234 1.222M74.557 63.08c-2.345.507-3.634 4.08-1.663 5.874 1.713 1.56 4.501.719 5.747-.882M82.724 59.451c.023 2.422.227 4.84.227 7.26M90.21 57.863a111.134 111.134 0 0 0-.68 7.94"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M87.715 55.368c1.37-.264 12.03-1.836 10.637 2.218-.91 2.647-5.874 2.546-8.142 2.546M100.873 53.553c0 3.131-.656 6.224-.656 9.339 0 1.231.202.8.202-.038M100.646 63.081c1.443-.064 2.829-.507 4.083-1.134M107.906 54.233c.11 2.05.273 4.083.453 6.126M112.67 53.1l.226 7.94M112.896 54.233c1.785 2.046 3.914 3.996 5.246 6.723.171.35.735 1.079.202.824M119.022 47.881c-.015 5.06.548 10.645-.454 15.654M123.559 50.15c.153 1.325.201 7.19 2.722 7.033 1.547-.097 3.14-.833 4.626-1.223 1.403-.368 2.823-.673 4.222-1.046"
          />
          <path
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth=".5"
            d="M124.92 53.1c1.814-.51 3.613-.955 5.445-1.362M123.332 49.696c3.929-.537 7.898-.857 11.797-1.588M63.895 80.322c17.395-6.328 35.092-11.832 53.274-15.414 9.045-1.781 18.071-3.55 27.034-5.684M109.72 10.676c-4.863-1.37-9.875-1.837-14.922-1.437-9.655.767-19.607 3.391-28.383 7.487-5.152 2.404-11.37 5.83-12.376 12.024-.8 4.915 3.145 8.067 7.335 9.502 6.734 2.307 14.225 1.57 21.136.58 9.365-1.342 17.921-3.996 25.874-9.25 4.212-2.783 8.432-6.033 11.482-10.109 2.593-3.465 5.281-9.193 2.218-13.233-2.271-2.997-6.913-4.048-10.347-4.689-7.712-1.439-15.36-.597-23.115-.403"
          />
        </svg>
      </motion.div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
        <div className="absolute left-[16.6%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-[1px] bg-white opacity-20" />
      </div>

      {/* Overlay columns for intro animation */}
      <motion.div
        className="absolute inset-0 z-[10] flex pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="flex-1 bg-black origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2 + i * 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
