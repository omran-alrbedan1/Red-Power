"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import {
  clipRevealUp,
  lineDrawIn,
  motionViewport,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { images } from "@/constants/image";

export function SpecialsHero() {
  const locale = useLocale();
  const t = useTranslations("specials.hero");
  const reduceMotion = useReducedMotion();

  return (
    <Section className="relative overflow-hidden h-[80vh] py-0">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <OptimizedImage
          src={images.specials.hero}
          alt={t("imageAlt")}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full rounded-none border-0 bg-black shadow-none"
          imageClassName="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75] contrast-[1.1]"
        />
      </motion.div>

      {/* Accent glow that browses in after the image settles */}
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/2 h-[440px] w-[480px] -translate-y-1/2 rounded-full bg-red-700/10 blur-[160px]"
        initial={{ opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: [0, 0.55, 0.35] }}
        transition={{
          duration: 2.2,
          delay: 0.9,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2.4,
          ease: "easeInOut",
        }}
      />
      {/* Parallel red hairline that draws in with the headline */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-px bg-gradient-to-b from-transparent via-red-600/45 to-transparent lg:block"
        initial="hidden"
        animate="visible"
        variants={reduceMotion ? undefined : lineDrawIn("y", 0.55)}
        style={{ transformOrigin: "center" }}
      />

      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <Container className="relative z-10 flex h-[80vh] md:-mt-24 items-center justify-start py-8 ">
        {/* Left-Aligned Container */}
        <motion.div
          className="mr-auto max-w-2xl space-y-6 text-right"
          initial="hidden"
          animate="visible"
          viewport={motionViewport}
          variants={reduceMotion ? undefined : staggerContainer(0.14, 0.25)}
        >
          {/* Layered eyebrow + accent line */}
          <motion.div
            variants={reduceMotion ? undefined : clipRevealUp(0.05)}
            className="flex items-center justify-start gap-3"
          >
            <span className="text-xs font-semibold tracking-[0.28em] text-red-500">
              {t("eyebrow")}
            </span>
            <motion.span
              className="h-px w-10 bg-red-600/80"
              variants={reduceMotion ? undefined : lineDrawIn("x", 0.15)}
              style={{ transformOrigin: "right" }}
            />
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden">
            <motion.h1
              variants={reduceMotion ? undefined : clipRevealUp(0.12)}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </motion.h1>
          </div>

          {/* Subtitle / Description */}
          <div className="overflow-hidden">
            <motion.p
              variants={reduceMotion ? undefined : clipRevealUp(0.2)}
              className="text-sm leading-relaxed text-zinc-300 sm:text-base"
            >
              {t("description")}
            </motion.p>
          </div>

          {/* Left-Aligned Call to Action Button */}
          <motion.div
            variants={reduceMotion ? undefined : clipRevealUp(0.28)}
            className="flex justify-start pt-6"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={softSpring}
            >
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  className:
                    "group inline-flex items-center gap-2 rounded-md bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(220,38,38,0.28)] transition-all hover:bg-red-700 active:scale-95",
                })}
              >
                <span>{t("primaryCta")}</span>
                <motion.span
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  transition={softSpring}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
