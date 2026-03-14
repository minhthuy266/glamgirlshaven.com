"use client";

import { motion, useScroll } from 'motion/react';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
