"use client";

import React from "react";
import { motion } from "framer-motion";

const IntroOverlay = () => {
    // Precise scales as requested by the user:
    // "starting around 0.9978, 0.8978, 0.7978, etc."
    const strips = [
        { initialScale: 0.9978, duration: 1.2, delay: 0.05 },
        { initialScale: 0.8978, duration: 1.15, delay: 0.1 },
        { initialScale: 0.7978, duration: 1.1, delay: 0.15 },
        { initialScale: 0.6978, duration: 1.05, delay: 0.2 },
        { initialScale: 0.5978, duration: 1.0, delay: 0.25 },
        { initialScale: 0.4978, duration: 0.95, delay: 0.3 },
        { initialScale: 0.3978, duration: 0.9, delay: 0.35 },
        { initialScale: 0.2978, duration: 0.85, delay: 0.4 },
        { initialScale: 0.1978, duration: 0.8, delay: 0.45 },
    ];

    return (
        <div
            className="intro__overlay absolute inset-0 z-10 w-full h-screen pointer-events-none"
            data-v-90dcedb3
        >
            <div className="overlay overlay--black w-full h-full relative flex" data-v-1556fa76>
                {strips.map((strip, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-black origin-left"
                        style={{
                            zIndex: index,
                        }}
                        initial={{ scaleX: strip.initialScale }}
                        animate={{ scaleX: 0 }}
                        transition={{
                            duration: strip.duration,
                            delay: 2.5 + strip.delay,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        data-v-1556fa76
                    />
                ))}
            </div>
        </div>
    );
};

export default IntroOverlay;
