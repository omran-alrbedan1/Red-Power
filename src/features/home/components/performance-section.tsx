"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gauge, ShieldCheck, Target, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  expandHeightIn,
  fadeInUp,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function PerformanceSection() {
  const t = useTranslations("home.whyRedPower");
  const reduceMotion = useReducedMotion();
  const stats = t.raw("stats") as Array<{
    label: string;
    title: string;
    value: string;
  }>;

  const cardIcons = [
    <Target key="target" className="h-6 w-6 text-red-500" />,
    <ShieldCheck key="shield" className="h-6 w-6 text-red-500" />,
    <Users key="users" className="h-6 w-6 text-red-500" />,
    <Gauge key="gauge" className="h-6 w-6 text-red-500" />,
  ];

  return (
    <Section className="bg-background py-14 text-white sm:py-16">
      <Container className="max-w-7xl space-y-8 px-4 sm:space-y-10 sm:px-6">
        <RevealPanel>
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-4 text-right">
              <p className="text-sm font-semibold tracking-[0.08em] text-red-500">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              {t("description")}
            </p>
          </div>
        </RevealPanel>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.title || index}
              variants={reduceMotion ? fadeInUp(20) : expandHeightIn()}
              className="overflow-hidden"
            >
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
                transition={softSpring}
                className="group relative flex h-full flex-col items-center justify-start rounded-2xl border border-red-950/40 bg-[#0a0b0e] p-6 text-center shadow-lg transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)]"
              >
                <div className="absolute top-3 left-3 grid grid-cols-3 gap-1 opacity-20">
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                </div>

                <motion.div
                  className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-600/40 bg-[#120709] shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                  initial={reduceMotion ? false : { scale: 0.82, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.22 + index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -6 }}
                >
                  <div className="absolute inset-0 rounded-full bg-red-600/10 blur-sm" />
                  {cardIcons[index % cardIcons.length]}
                </motion.div>

                <motion.div
                  className="mb-2 text-3xl font-black tracking-tight text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.28 + index * 0.08 }}
                >
                  {item.value || `0${index + 1}`}
                </motion.div>

                <motion.h3
                  className="mb-3 text-base font-bold text-zinc-100 sm:text-lg"
                  variants={fadeInUp(16, 0.08)}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className="text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm"
                  variants={fadeInUp(16, 0.12)}
                >
                  {item.label}
                </motion.p>

                <motion.div
                  className="absolute bottom-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
                  initial={reduceMotion ? false : { scaleX: 0.2 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.18 + index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { width: "75%" }}
                  style={{ transformOrigin: "center" }}
                />
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
