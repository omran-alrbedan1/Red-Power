"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ChevronLeft, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { images } from "@/constants/image";
import {
  expandHeightIn,
  fadeInUp,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function BrandIntroductionSection() {
  const locale = useLocale();
  const t = useTranslations("home.brandIntroduction");
  const reduceMotion = useReducedMotion();
  const cards = t.raw("cards") as Array<{
    body: string;
    cta: string;
    icon: string;
    number: string;
    title: string;
  }>;

  const cardImages = [
    images.home.serviceMoparExpertise,
    images.home.servicePerformanceIntake,
    images.home.serviceMaintenanceOil,
    images.home.serviceDiagnosticsTablet,
  ];

  const renderLucideIcon = (iconName: string) => {
    switch (iconName) {
      case "pulse":
      case "activity":
        return <Activity className="h-6 w-6 text-white" />;
      case "tool":
      case "wrench":
        return <Wrench className="h-6 w-6 text-white" />;
      case "gauge":
        return <Gauge className="h-6 w-6 text-white" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-white" />;
    }
  };

  return (
    <Section id="services" className="bg-[#08090a] py-16 text-white sm:py-20">
      <Container className="space-y-10 px-4 sm:space-y-12 sm:px-6">
        <RevealPanel>
          <div className="flex flex-col items-start justify-between gap-4 text-right">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-red-600">
              <span>{t("eyebrow")}</span>
              <span>{"///"}</span>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h2>

            <p className="max-w-2xl text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
              {t("description")}
            </p>
          </div>
        </RevealPanel>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.16)}
        >
          {cards.map((item, index) => (
            <motion.div
              key={item.title || index}
              variants={reduceMotion ? fadeInUp(24) : expandHeightIn()}
              className="overflow-hidden"
            >
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -8 }}
                transition={softSpring}
                className="group relative flex h-full min-h-[24rem] flex-col rounded-md border border-red-900/30 bg-[#0d0e10] transition-all duration-300 hover:border-red-600/60 sm:min-h-0"
              >
                <div className="relative w-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-md">
                    <motion.div
                      className="h-full w-full"
                      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                      transition={softSpring}
                    >
                      <OptimizedImage
                        src={cardImages[index] ?? cardImages[0]}
                        alt={item.title}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full border-0 bg-black shadow-none"
                        imageClassName="h-full w-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e10] via-transparent to-black/30" />
                  </div>

                  <motion.div
                    className="absolute right-[3.5rem] bottom-0 left-0 z-10 h-[2px] bg-gradient-to-l from-red-600 via-red-600/60 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.8)] sm:right-[4.5rem]"
                    whileInView={reduceMotion ? undefined : { scaleX: [0.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.18 + index * 0.08 }}
                    style={{ transformOrigin: "right" }}
                  />

                  <motion.div
                    className="absolute top-full right-3 z-20 flex h-12 w-10 -translate-y-1/2 items-center justify-center bg-red-600 p-[2px] sm:right-4 sm:h-14 sm:w-12"
                    initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                    whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.3 + index * 0.08 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -2 }}
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    <div
                      className="flex h-full w-full items-center justify-center bg-[#0d0e10]"
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    >
                      {renderLucideIcon(item.icon)}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-1 flex-col items-center justify-between p-5 pt-9 text-center sm:p-6 sm:pt-10"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.22 + index * 0.08 }}
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-red-500 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-zinc-400">
                      {item.body}
                    </p>
                  </div>

                  <motion.div
                    className="pt-6"
                    whileHover={reduceMotion ? undefined : { x: -3 }}
                    transition={softSpring}
                  >
                    <Link
                      href={`/${locale}/services`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-300 transition-colors hover:text-red-500"
                    >
                      <span>{item.cta}</span>
                      <ChevronLeft className="h-4 w-4 text-red-600" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
