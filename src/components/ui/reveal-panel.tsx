"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  fadeInHorizontal,
  fadeInUp,
  motionViewport,
} from "@/components/ui/motion-presets";

type RevealPanelProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export function RevealPanel({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealPanelProps) {
  const reduceMotion = useReducedMotion();
  const delayInSeconds = delay / 1000;

  const variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.01, delay: delayInSeconds },
        },
      }
    : direction === "left"
      ? fadeInHorizontal(32, delayInSeconds, "left")
      : direction === "right"
        ? fadeInHorizontal(32, delayInSeconds, "right")
        : fadeInUp(28, delayInSeconds);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
