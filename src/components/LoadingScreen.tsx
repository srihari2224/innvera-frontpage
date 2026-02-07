"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(1);

    useEffect(() => {
        // Cycle through images 1-10
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev % 10) + 1);
        }, 100); // Change image every 100ms

        // Hide loading screen after 3 seconds
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        alignItems: "center",
                        backgroundColor: "var(--background)",
                        display: "flex",
                        height: "100vh",
                        justifyContent: "center",
                        left: 0,
                        position: "fixed",
                        top: 0,
                        width: "100%",
                        zIndex: 500,
                    }}
                >
                    <div
                        className="loading__images"
                        style={{ display: "block", height: "16%", position: "relative", width: "6%" }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-opacity duration-0 ${currentImageIndex === i + 1 ? "opacity-100" : "opacity-0"}`}
                            >
                                <Image
                                    src={`/assets/images/loading${i + 1}_2x.webp`}
                                    alt="Loading"
                                    fill
                                    sizes="20vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
