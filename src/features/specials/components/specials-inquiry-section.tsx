"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TicketPercent } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import {
  ambientPulse,
  badgeSnapIn,
  clipRevealUp,
  lightSweep,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { cn } from "@/lib/utils";

export function SpecialsInquirySection() {
  const locale = useLocale();
  const t = useTranslations("specials.inquiry");
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();

  return (
    <Section className="bg-[#090909] py-12 sm:py-14">
      <Container className="space-y-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reduceMotion ? undefined : staggerContainer(0.12, 0.05)}
          className="relative overflow-hidden rounded-[12px] border border-red-600/35 bg-[linear-gradient(90deg,#151515_0%,#101010_45%,#0b0b0b_100%)] px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:px-6"
        >
          {/* Restrained ambient red glow, breathing slowly from the left */}
          <motion.div
            className="absolute inset-y-0 left-0 w-32 bg-[radial-gradient(circle_at_left,rgba(220,38,38,0.22),transparent_72%)]"
            animate={reduceMotion ? undefined : ambientPulse(7.5)}
          />
          {/* Slow, periodic light sweep across the panel */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-40 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)] blur-xl"
            animate={reduceMotion ? undefined : lightSweep()}
          />
          {/* Border tracing — a traveling red edge accent on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent"
              animate={reduceMotion ? undefined : { opacity: [0, 1, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
                ease: "easeInOut",
              }}
            />
          </div>

          <div
            className={cn(
              "relative grid gap-5 lg:grid-cols-[84px_minmax(0,1fr)_220px] lg:items-center",
              isArabic && "lg:grid-cols-[84px_minmax(0,1fr)_220px]"
            )}
          >
            <div className="flex justify-center lg:justify-start">
              <motion.div
                variants={reduceMotion ? undefined : badgeSnapIn(0.1)}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/35 bg-red-600/10 text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.28)]"
              >
                <TicketPercent className="size-7" strokeWidth={1.9} />
              </motion.div>
            </div>

            <div
              className={cn(
                "overflow-hidden space-y-2",
                isArabic ? "text-right" : "text-left"
              )}
            >
              <motion.p
                variants={reduceMotion ? undefined : clipRevealUp(0)}
                className="text-xs font-semibold tracking-[0.24em] text-red-500"
              >
                {t("eyebrow")}
              </motion.p>
              <motion.h2
                variants={reduceMotion ? undefined : clipRevealUp(0.1)}
                className="text-2xl font-semibold text-white sm:text-3xl"
              >
                {t("title")}
              </motion.h2>
              <motion.p
                variants={reduceMotion ? undefined : clipRevealUp(0.18)}
                className="max-w-2xl text-sm leading-6 text-zinc-300/85"
              >
                {t("description")}
              </motion.p>
            </div>

            <motion.div
              variants={reduceMotion ? undefined : clipRevealUp(0.24)}
              className="flex flex-col gap-2 lg:w-full"
            >
              <motion.div
                className="inline-flex"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={softSpring}
              >
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className:
                      "w-full justify-center rounded-[4px] px-5 py-3 text-xs tracking-[0.14em] shadow-[0_10px_28px_rgba(220,38,38,0.22)] transition-shadow hover:shadow-[0_12px_34px_rgba(220,38,38,0.34)]",
                  })}
                >
                  {t("primaryCta")}
                </Link>
              </motion.div>
              <motion.div
                className="inline-flex"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={softSpring}
              >
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    variant: "secondary",
                    className:
                      "w-full justify-center rounded-[4px] border-white/20 bg-transparent px-5 py-3 text-xs tracking-[0.14em] text-white hover:border-red-500/60 hover:bg-white/5",
                  })}
                >
                  {t("secondaryCta")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
