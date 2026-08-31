import type { TargetAndTransition, Transition, Variants } from "framer-motion";

export const motionEasing = [0.16, 1, 0.3, 1] as const;

export const motionViewport = {
  once: true,
  amount: 0.2,
} as const;

export const smoothTransition: Transition = {
  duration: 0.72,
  ease: motionEasing,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.9,
};

export const dramaticSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 1,
};

export function staggerContainer(
  staggerChildren = 0.12,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function fadeInUp(distance = 28, delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...smoothTransition,
        delay,
      },
    },
  };
}

export function fadeInHorizontal(
  distance = 32,
  delay = 0,
  direction: "left" | "right" = "right"
): Variants {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -distance : distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...smoothTransition,
        delay,
      },
    },
  };
}

export function expandHeightIn(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      height: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        height: {
          duration: 0.7,
          ease: motionEasing,
          delay,
        },
        opacity: {
          duration: 0.35,
          delay: delay + 0.08,
        },
        y: {
          duration: 0.6,
          ease: motionEasing,
          delay,
        },
      },
    },
  };
}

export function clipRevealUp(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 30,
      clipPath: "inset(100% 0 0 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
      transition: {
        clipPath: {
          duration: 0.8,
          ease: motionEasing,
          delay,
        },
        opacity: {
          duration: 0.35,
          delay: delay + 0.05,
        },
        y: {
          duration: 0.65,
          ease: motionEasing,
          delay,
        },
      },
    },
  };
}

export function lineDrawIn(axis: "x" | "y" = "x", delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      scaleX: axis === "x" ? 0 : 1,
      scaleY: axis === "y" ? 0 : 1,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        opacity: {
          duration: 0.3,
          delay,
        },
        scaleX: {
          duration: 0.75,
          ease: motionEasing,
          delay,
        },
        scaleY: {
          duration: 0.75,
          ease: motionEasing,
          delay,
        },
      },
    },
  };
}

export function floatingAmbient(
  x = 10,
  y = 8,
  scale = 1.05,
  duration = 12
): TargetAndTransition {
  return {
    x: [0, -x, 0, x / 2, 0],
    y: [0, -y, 0, y / 2, 0],
    scale: [1, scale, 1, scale * 0.98, 1],
    transition: {
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };
}

export function glowPulse(duration = 6): TargetAndTransition {
  return {
    opacity: [0.2, 0.45, 0.2],
    scale: [1, 1.08, 1],
    transition: {
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };
}

export const subtleScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};

/**
 * Depth entrance for offer cards: rise, settle, then tighten to its
 * final, precise resting state. Feels like a part locking into place.
 */
export function depthCardIn(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 34,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.4, ease: "easeOut", delay: delay + 0.02 },
        y: { duration: 0.62, ease: motionEasing, delay },
        scale: { duration: 0.7, ease: motionEasing, delay },
      },
    },
  };
}

/**
 * Oversized background numerals/accents enter on their own register,
 * deliberately after the primary content, so hierarchy reads clearly.
 */
export function lateAccentIn(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 1.04,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut", delay: delay + 0.12 },
        y: { duration: 0.7, ease: motionEasing, delay: delay + 0.08 },
        scale: { duration: 0.9, ease: motionEasing, delay: delay + 0.1 },
      },
    },
  };
}

/**
 * Clipboard-style reveal with slight upward travel — used for editorial
 * panels so the image/content feel like a printed plate sliding in.
 */
export function editorialRevealIn(
  direction: "left" | "right" = "left",
  delay = 0
): Variants {
  const fromX = direction === "left" ? -44 : 44;
  return {
    hidden: {
      opacity: 0,
      x: fromX,
      scale: 1.02,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut", delay },
        x: { duration: 0.85, ease: motionEasing, delay },
        scale: { duration: 0.9, ease: motionEasing, delay },
      },
    },
  };
}

/**
 * Restrained ambient pulse for red glow accents. Lower amplitude than
 * `glowPulse` — it should feel like respiration, not a strobe.
 */
export function ambientPulse(duration = 7): TargetAndTransition {
  return {
    opacity: [0.18, 0.42, 0.18],
    scale: [1, 1.035, 1],
    transition: {
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };
}

/**
 * Smooth traversal of a hairline light sweep across a panel. Slow,
 * cinematic, and periodic rather than constant.
 */
export function lightSweep(): TargetAndTransition {
  return {
    x: ["-130%", "130%"],
    transition: {
      duration: 5.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 2.8,
      ease: "easeInOut",
    },
  };
}

/**
 * Occluded clip reveal used for the inquiry icon when the panel enters —
 * a sharp, mechanical pop-in scaled to the icon slot.
 */
export function badgeSnapIn(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      scale: 0.6,
      rotate: -8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 16,
        delay,
      },
    },
  };
}
