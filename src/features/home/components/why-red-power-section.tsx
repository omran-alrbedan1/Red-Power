"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronLeft, Users, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { images } from "@/constants/image";
import {
  clipRevealUp,
  dramaticSpring,
  floatingAmbient,
  glowPulse,
  lineDrawIn,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function WhyRedPowerSection() {
  const locale = useLocale();
  const t = useTranslations("home.contactCta");
  const reduceMotion = useReducedMotion();
  const features = t.raw("features") as string[];

  const featureIcons = [
    <Zap key="zap" className="h-6 w-6 text-red-500 stroke-[1.5]" />,
    <Calendar key="calendar" className="h-6 w-6 text-red-500 stroke-[1.5]" />,
    <Users key="users" className="h-6 w-6 text-red-500 stroke-[1.5]" />,
  ];

  return (
    <Section className="bg-[#050607] py-12 text-white sm:py-14">
      <Container className="max-w-7xl px-4 sm:px-6">
        <motion.div
          dir="ltr"
          className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#060709] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.14)}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(225,6,19,0.18),transparent_30%)]"
            animate={reduceMotion ? undefined : glowPulse(6.5)}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-[15%] w-28 bg-[linear-gradient(100deg,transparent_12%,rgba(255,255,255,0.09)_50%,transparent_80%)] blur-xl"
            animate={reduceMotion ? undefined : { x: ["-180%", "220%"] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 4.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2.4,
                    ease: "easeInOut",
                  }
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              variants={staggerContainer(0.12, 0.08)}
              className="relative z-10 flex flex-col justify-center bg-[#060709] px-5 py-10 sm:px-8 sm:py-12 lg:col-span-6 lg:py-16 lg:pl-12 lg:pr-10"
            >
              <div dir="rtl" className="max-w-lg">
                <motion.div
                  variants={clipRevealUp(0.02)}
                  className="mb-4 flex items-center justify-start gap-2 text-xs font-bold tracking-wider text-red-500 sm:text-sm"
                >
                  <span>جاهز للخطوة القادمة؟</span>
                  <span>{"///"}</span>
                </motion.div>

                <div className="overflow-hidden">
                  <motion.h2
                    variants={clipRevealUp(0.08)}
                    className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl"
                  >
                    احجز موعدك الآن
                    <br />
                    ودعنا نطلق العنان
                    <br />
                    <span className="text-red-600">لقوة سيارتك.</span>
                  </motion.h2>
                </div>

                <div className="overflow-hidden">
                  <motion.p
                    variants={clipRevealUp(0.16)}
                    className="mb-8 text-sm font-normal leading-6 text-zinc-400 sm:leading-relaxed"
                  >
                    احجز الآن ودعنا نطلق العنان لقوة سيارتك.
                  </motion.p>
                </div>

                <motion.div
                  className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
                  variants={staggerContainer(0.12, 0.18)}
                >
                  {features.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={feature || index}
                      variants={clipRevealUp(index * 0.02)}
                      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
                      transition={dramaticSpring}
                      className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0c0d11]/90 px-3 py-5 text-center shadow-md transition-colors hover:border-red-600/40"
                    >
                      <motion.div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/70 to-transparent"
                        variants={lineDrawIn("x", 0.1 + index * 0.04)}
                        style={{ transformOrigin: "center" }}
                      />
                      <motion.div
                        className="absolute -right-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-red-600/8 blur-2xl"
                        animate={reduceMotion ? undefined : floatingAmbient(8, 10, 1.12, 7 + index)}
                      />
                      <motion.div
                        className="relative mx-auto mb-3 flex h-8 w-8 items-center justify-center"
                        whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -6 }}
                        transition={softSpring}
                      >
                        {featureIcons[index % featureIcons.length]}
                      </motion.div>
                      <span className="relative text-xs font-medium leading-relaxed text-zinc-300">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={clipRevealUp(0.3)}
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                >
                  <motion.div whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }} transition={softSpring}>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:bg-red-700 sm:w-auto"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>احجز موعدك الآن</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }} transition={softSpring}>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-[#0b0c0f] px-6 text-sm font-bold text-zinc-200 transition-all hover:border-red-600 hover:text-white sm:w-auto"
                    >
                      <ChevronLeft className="h-4 w-4 text-red-500" />
                      <span>تواصل عبر واتساب</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={clipRevealUp(0.12)}
              className="relative h-64 w-full sm:h-72 lg:col-span-6 lg:h-auto"
            >
              <motion.div
                className="relative h-full w-full overflow-hidden lg:[clip-path:polygon(20%_0,100%_0,100%_100%,20%_100%,0%_50%)]"
                initial={reduceMotion ? false : { scale: 1.06, x: 28 }}
                whileInView={reduceMotion ? undefined : { scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              >
                <motion.div
                  className="absolute left-[20%] top-[20%] z-10 h-28 w-28 rounded-full bg-red-600/10 blur-3xl"
                  animate={reduceMotion ? undefined : floatingAmbient(12, 10, 1.18, 8)}
                />
                <OptimizedImage
                  src={images.home.ctaCarFront}
                  alt={t("imageAlt")}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full border-0 bg-black shadow-none"
                  imageClassName="h-full w-full object-cover object-center"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"
                  animate={reduceMotion ? undefined : { opacity: [0.7, 0.48, 0.7] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 7,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }
                  }
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <motion.svg
                  className="h-full w-full text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,1)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.28 }}
                >
                  <polyline
                    points="20,0 0,50 20,100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                  />
                </motion.svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
