"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, Gauge, ShieldCheck, Target, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { images } from "@/constants/image";
import {
  clipRevealUp,
  floatingAmbient,
  lineDrawIn,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function ServicesOverviewSection() {
  const locale = useLocale();
  const t = useTranslations("home.performance");
  const reduceMotion = useReducedMotion();
  const points = t.raw("points") as string[];

  const pointIcons = [
    <Target key="target" className="h-4 w-4 text-red-500" />,
    <ShieldCheck key="shield" className="h-4 w-4 text-red-500" />,
    <Users key="users" className="h-4 w-4 text-red-500" />,
    <Gauge key="gauge" className="h-4 w-4 text-red-500" />,
  ];

  return (
    <Section className="relative overflow-hidden bg-[#060708] py-14 text-white sm:py-16">
      <Container className="relative max-w-7xl px-4 sm:px-6">
        <div className="relative grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-24">
          <RevealPanel
            delay={100}
            direction="right"
            className="relative order-1 h-full min-h-[18rem] w-full sm:min-h-[24rem] lg:order-1 lg:col-span-6 lg:min-h-[520px]"
          >
            <motion.div
              className="relative h-full w-full overflow-hidden bg-[#060708] lg:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]"
              initial={reduceMotion ? false : { scale: 1.06, x: 20 }}
              whileInView={reduceMotion ? undefined : { scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 z-10 bg-[linear-gradient(105deg,transparent_10%,rgba(255,255,255,0.08)_46%,transparent_60%)]"
                animate={reduceMotion ? undefined : { x: ["-130%", "150%"] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 3.4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }
                }
              />
              <motion.div
                className="absolute right-[18%] top-[20%] z-10 h-24 w-24 rounded-full bg-red-600/10 blur-2xl"
                animate={reduceMotion ? undefined : floatingAmbient(12, 14, 1.16, 9)}
              />
              <OptimizedImage
                src={images.home.brakeDetail}
                alt={t("imageAlt")}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full border-0 bg-black shadow-none"
                imageClassName="h-full w-full object-cover object-center"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"
                animate={reduceMotion ? undefined : { opacity: [0.72, 0.46, 0.72] }}
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

            <div
              className="absolute bottom-[-10%] left-[7%] top-[-10%] hidden lg:block"
              style={{
                transform: "rotate(10deg)",
                transformOrigin: "center",
              }}
            >
              <motion.div
                className="h-full w-[3px] bg-red-600 shadow-[0_0_20px_rgba(239,68,68,1)]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reduceMotion ? undefined : lineDrawIn("y", 0.2)}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </RevealPanel>

          <motion.div
            className="z-20 order-2 lg:order-2 lg:col-span-6 lg:pl-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.12)}
          >
            <motion.div
              variants={clipRevealUp(0.02)}
              className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-red-600"
            >
              <span>{t("eyebrow")}</span>
              <span>{"///"}</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                variants={clipRevealUp(0.1)}
                className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                نحن لا نصلح فقط.
                <br />
                <span className="text-red-600">نصنع فرقاً</span> في الأداء.
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                variants={clipRevealUp(0.18)}
                className="mb-6 max-w-lg text-sm font-normal leading-6 text-zinc-400 sm:mb-8 sm:leading-relaxed"
              >
                {t.has("heading.description")
                  ? t("heading.description")
                  : "الدقة في التشخيص، جودة القطع، ووضوح التنفيذ. كل تفصيل هنا مصمم ليعطيك نتيجة أقوى واعتمادية أعلى."}
              </motion.p>
            </div>

            <motion.div
              className="mb-8 w-full max-w-md space-y-3"
              variants={staggerContainer(0.12, 0.16)}
            >
              {points.map((point, index) => (
                <motion.div
                  key={point}
                  variants={clipRevealUp(index * 0.02)}
                  whileHover={reduceMotion ? undefined : { x: -6 }}
                  transition={softSpring}
                  className="relative overflow-hidden rounded-md border border-zinc-800/80 bg-[#0b0c0e] shadow-inner transition-colors hover:border-red-600/40"
                >
                  <motion.div
                    className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(100deg,transparent_15%,rgba(225,6,19,0.18)_50%,transparent_85%)]"
                    animate={reduceMotion ? undefined : { x: ["120%", "-180%"] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 3.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 1.8 + index * 0.2,
                            ease: "easeInOut",
                          }
                    }
                  />
                  <div className="relative flex flex-row-reverse items-center gap-3 px-4 py-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span className="flex-1 text-sm font-bold leading-6 text-zinc-200">
                      {point}
                    </span>
                    <motion.div
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-[#070809]"
                      whileHover={reduceMotion ? undefined : { rotate: -6, scale: 1.08 }}
                      transition={softSpring}
                    >
                      {pointIcons[index % pointIcons.length]}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={clipRevealUp(0.34)}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={softSpring}
            >
              <Link
                href={`/${locale}/about`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded border border-zinc-800 bg-[#0a0b0d] px-5 py-3 text-sm font-bold text-white transition-all hover:border-red-600 hover:shadow-[0_0_12px_rgba(220,38,38,0.3)] sm:w-auto"
              >
                <span>{t("primaryCta")}</span>
                <ChevronLeft className="h-3.5 w-3.5 text-red-600" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
