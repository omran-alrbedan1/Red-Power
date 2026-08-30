"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { images } from "@/constants/image";
import {
  clipRevealUp,
  floatingAmbient,
  glowPulse,
  lineDrawIn,
  motionEasing,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("home.hero");
  const reduceMotion = useReducedMotion();

  return (
    <Section className="relative min-h-[34rem] overflow-hidden border-b border-red-600/20 bg-[#050505] py-0 text-white sm:min-h-[35rem] lg:h-[70vh] lg:min-h-[38rem]">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={reduceMotion ? undefined : floatingAmbient(12, 10, 1.1, 28)}
      >
        <OptimizedImage
          src={images.home.hero}
          alt={t("imageAlt")}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 shadow-none"
          imageClassName="h-full w-full object-cover object-center"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/78 to-[#050505]/30 lg:bg-gradient-to-l lg:from-[#050505] lg:via-[#050505]/88 lg:to-transparent"
          animate={reduceMotion ? undefined : { opacity: [0.9, 0.75, 0.9] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 8.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent"
          animate={reduceMotion ? undefined : { opacity: [0.9, 0.7, 0.9] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 6.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-[18%] top-[18%] h-36 w-36 rounded-full border border-red-500/12 bg-red-600/8 blur-3xl"
        animate={reduceMotion ? undefined : floatingAmbient(18, 14, 1.12, 11)}
      />
      <motion.div
        className="absolute right-[45%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-red-700/10 blur-[160px]"
        animate={reduceMotion ? undefined : glowPulse(8)}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] bottom-[10%] h-24 w-24 rounded-full bg-red-500/10 blur-2xl"
        animate={reduceMotion ? undefined : floatingAmbient(10, 16, 1.18, 9)}
      />

      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38vw] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.08)_48%,transparent_65%)] blur-2xl lg:block"
        animate={reduceMotion ? undefined : { x: ["-140%", "160%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2.6,
                ease: motionEasing,
              }
        }
      />

      <div
        className="pointer-events-none absolute bottom-[-12%] left-[43%] top-[-12%] z-[2] hidden lg:block"
        style={{
          transform: "rotate(12deg)",
          transformOrigin: "center",
        }}
      >
        <motion.div
          className="h-full w-[2px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.85)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reduceMotion ? undefined : lineDrawIn("y", 0.3)}
          style={{ transformOrigin: "center" }}
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-[-10%] left-[44%] top-[-10%] z-[2] hidden lg:block"
        style={{
          transform: "rotate(12deg)",
          transformOrigin: "center",
        }}
      >
        <motion.div
          className="h-full w-px bg-red-600/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reduceMotion ? undefined : lineDrawIn("y", 0.48)}
          style={{ transformOrigin: "center" }}
        />
      </div>

      <Container className="relative z-10 flex min-h-[32rem] items-end px-4 pt-12 pb-8 sm:min-h-[35rem] sm:px-6 sm:pb-10 lg:min-h-[72vh] lg:items-center lg:px-10 lg:pb-12">
        <motion.div
          className="w-full lg:w-[52%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer(0.14, 0.08)}
        >
          <div className="max-w-3xl text-right">
            <motion.div
              variants={clipRevealUp(0.02)}
              className="mb-5 flex items-center justify-start gap-3 sm:mb-6"
            >
              <span className="text-xs font-bold tracking-[0.18em] text-red-500 sm:text-sm">
                {t("eyebrow")}
              </span>
              <motion.span
                className="text-sm font-black tracking-widest text-red-600"
                animate={reduceMotion ? undefined : { x: [0, -2, 0], opacity: [0.7, 1, 0.7] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 2.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
              >
                {"///"}
              </motion.span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={clipRevealUp(0.1)}
                className="max-w-[12ch] text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.5rem] xl:text-[4rem]"
              >
                {t("title")}
              </motion.h1>
            </div>

            <motion.div
              variants={lineDrawIn("x", 0.26)}
              className="mt-6 flex items-center justify-start gap-2 sm:mt-7"
              style={{ transformOrigin: "right" }}
            >
              <span className="h-[3px] w-16 bg-red-600" />
              <span className="h-[3px] w-5 bg-red-600/50" />
              <span className="h-[3px] w-2 bg-red-600/20" />
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                variants={clipRevealUp(0.22)}
                className="mt-6 max-w-xl text-sm font-medium leading-7 text-zinc-300 sm:mt-7 sm:max-w-2xl sm:text-lg sm:leading-8 lg:text-xl"
              >
                {t("description")}
              </motion.p>
            </div>

            <motion.div
              variants={clipRevealUp(0.32)}
              className="mt-8 flex flex-col items-stretch justify-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <motion.div whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }} transition={softSpring}>
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className:
                      "group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md border border-red-500/50 bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_35px_rgba(220,38,38,0.25)] transition-all duration-300 hover:border-red-400 hover:bg-red-500 hover:shadow-[0_12px_40px_rgba(220,38,38,0.4)] sm:w-auto sm:px-7 sm:text-base",
                  })}
                >
                  <span>{t("primaryCta")}</span>
                  <motion.span whileHover={reduceMotion ? undefined : { x: -4 }} transition={softSpring}>
                    <ArrowLeft className="h-5 w-5" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }} transition={softSpring}>
                <Link
                  href={`/${locale}/services`}
                  className={buttonClassName({
                    variant: "secondary",
                    className:
                      "group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto sm:px-7 sm:text-base",
                  })}
                >
                  <span>{t("secondaryCta")}</span>
                  <motion.span whileHover={reduceMotion ? undefined : { x: -4 }} transition={softSpring}>
                    <ArrowLeft className="h-5 w-5" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={clipRevealUp(0.42)}
              className="mt-10 flex flex-wrap items-center justify-start gap-3 sm:mt-12"
            >
              <motion.span
                className="h-px w-12 bg-red-600"
                variants={lineDrawIn("x", 0.46)}
                style={{ transformOrigin: "right" }}
              />
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-500">
                RED POWER GARAGE
              </span>
              <span className="text-xs text-red-600">{"///"}</span>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent lg:hidden" />
    </Section>
  );
}
