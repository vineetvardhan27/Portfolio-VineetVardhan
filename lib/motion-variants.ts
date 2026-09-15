import { Variants } from "framer-motion";

export const standardEase = [0.22, 1, 0.36, 1] as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: standardEase,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: standardEase,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export const imageHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
