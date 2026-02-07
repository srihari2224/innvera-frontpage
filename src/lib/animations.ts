import type { Variants, Transition } from "framer-motion";

// Easing curves matching cinematic reference site feel
export const smoothEase = [0.25, 0.1, 0.25, 1.0] as const;
export const snappyEase = [0.16, 1, 0.3, 1] as const;

export const springConfig: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 200,
};

export const gentleSpring: Transition = {
  type: "spring",
  damping: 40,
  stiffness: 120,
};

// Common animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Stagger container variant
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Word-by-word reveal variant
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

// Character reveal with blur
export const charReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 15 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

// Slide up from below
export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: snappyEase },
  },
};
