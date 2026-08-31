"use client";

import {
  ChevronDown,
  Clock3,
  Mail,
  MessageSquareText,
  PhoneCall,
  UserRound,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { FormStatus } from "@/components/forms/form-status";
import { buttonClassName } from "@/components/ui/button";
import {
  ambientPulse,
  clipRevealUp,
  editorialRevealIn,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { cn } from "@/lib/utils";
import type { ValidationCode } from "@/types/forms";
import { Container } from "@/components/layout/container";

type CustomRequestValues = {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  website: string;
};

type CustomRequestField =
  "name" | "phone" | "email" | "serviceType" | "message";

type ContactPanelItem = {
  href?: string;
  kind: "phone" | "email" | "hours";
  label: string;
  value: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9\s()-]{6,20}$/;

const initialValues: CustomRequestValues = {
  name: "",
  phone: "",
  email: "",
  serviceType: "",
  message: "",
  website: "",
};

export function SpecialsCustomServiceRequest() {
  const locale = useLocale();
  const tCustom = useTranslations("specials.customService");
  const tCommon = useTranslations("common.footer");
  const tForms = useTranslations("forms.serviceRequestForm");
  const errorsT = useTranslations("forms.errors");
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<CustomRequestValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<CustomRequestField, ValidationCode>>
  >({});
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  const contactItems = (
    tCommon.raw("contact.items") as ContactPanelItem[]
  ).filter(
    (item) =>
      item.kind === "phone" || item.kind === "email" || item.kind === "hours"
  );

  function updateField<K extends keyof CustomRequestValues>(
    field: K,
    value: CustomRequestValues[K]
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in fieldErrors) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
    setStatus(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<CustomRequestField, ValidationCode>> = {};

    if (!values.name.trim()) {
      nextErrors.name = "required";
    } else if (values.name.trim().length < 2) {
      nextErrors.name = "min_name";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "required";
    } else if (!PHONE_REGEX.test(values.phone.trim())) {
      nextErrors.phone = "invalid_phone";
    }

    if (!values.email.trim()) {
      nextErrors.email = "required";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "invalid_email";
    }

    if (!values.serviceType.trim()) {
      nextErrors.serviceType = "required";
    }

    if (!values.message.trim()) {
      nextErrors.message = "required";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "min_message";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus({
        tone: "error",
        message: tForms("error"),
      });
      return;
    }

    setFieldErrors({});
    setStatus(null);
  }

  function renderContactIcon(kind: ContactPanelItem["kind"]) {
    if (kind === "phone") {
      return PhoneCall;
    }

    if (kind === "email") {
      return Mail;
    }

    return Clock3;
  }

  return (
    <Container>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={reduceMotion ? undefined : staggerContainer(0.12, 0.05)}
        className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,#111111_0%,#0b0b0b_100%)] p-3 shadow-[0_22px_52px_rgba(0,0,0,0.36)] sm:p-4"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-red-600/40" />
        <div className="grid gap-4 lg:grid-cols-[0.26fr_0.74fr]">
          <motion.aside
            variants={
              reduceMotion
                ? undefined
                : editorialRevealIn(isArabic ? "right" : "left", 0.05)
            }
            className="relative rounded-[10px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4 sm:p-5"
          >
            <motion.div
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-red-600/10 blur-3xl"
              animate={reduceMotion ? undefined : ambientPulse(8)}
            />
            <div
              className={cn(
                "relative space-y-2",
                isArabic ? "text-right" : "text-left"
              )}
            >
              <h3 className="text-xl font-semibold text-white">
                {tCustom("panelTitle")}
              </h3>
              <p className="text-xs leading-6 text-zinc-400">
                {tCustom("panelDescription")}
              </p>
            </div>

            <div className="relative mt-5 space-y-4">
              {contactItems.map((item) => {
                const Icon = renderContactIcon(item.kind);

                return (
                  <motion.div
                    key={`${item.kind}-${item.label}`}
                    variants={reduceMotion ? undefined : clipRevealUp(0.1)}
                    className={cn(
                      "flex items-start gap-3 text-sm text-zinc-200",
                      isArabic && "flex-row-reverse text-right"
                    )}
                  >
                    <motion.span
                      className="mt-0.5 text-red-500"
                      whileHover={
                        reduceMotion ? undefined : { x: isArabic ? -3 : 3 }
                      }
                      transition={softSpring}
                    >
                      <Icon className="size-4" strokeWidth={2} />
                    </motion.span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-zinc-200 transition-colors hover:text-red-400"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line text-sm leading-6 text-zinc-200">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>

          <motion.div
            variants={
              reduceMotion
                ? undefined
                : editorialRevealIn(isArabic ? "left" : "right", 0.12)
            }
            className="rounded-[10px] border border-white/6 bg-[#0f0f0f] p-4 sm:p-5"
          >
            <div
              className={cn(
                "mb-5 space-y-2",
                isArabic ? "text-center" : "text-left"
              )}
            >
              <h2 className="text-2xl font-semibold text-white">
                {tCustom("title")}
              </h2>
              <p className="text-sm leading-6 text-zinc-400">
                {tCustom("description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white">
                    {tForms("fields.fullName")}
                    <span className="text-red-500"> *</span>
                  </span>
                  <div className="relative">
                    <input
                      value={values.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder={tForms("placeholders.fullName")}
                      autoComplete="name"
                      className="min-w-0 w-full rounded-[4px] border border-white/10 bg-white/[0.03] px-4 py-3 pe-11 text-sm text-white outline-none transition duration-300 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.35),0_0_18px_rgba(220,38,38,0.18)]"
                      aria-invalid={Boolean(fieldErrors.name)}
                    />
                    <UserRound className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-zinc-500" />
                  </div>
                  {fieldErrors.name ? (
                    <span className="text-xs text-red-300">
                      {errorsT(fieldErrors.name)}
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white">
                    {tForms("fields.phone")}
                    <span className="text-red-500"> *</span>
                  </span>
                  <div className="relative">
                    <input
                      value={values.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder={tForms("placeholders.phone")}
                      autoComplete="tel"
                      type="tel"
                      className="min-w-0 w-full rounded-[4px] border border-white/10 bg-white/[0.03] px-4 py-3 pe-11 pl-12 text-sm text-white outline-none transition duration-300 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.35),0_0_18px_rgba(220,38,38,0.18)]"
                      aria-invalid={Boolean(fieldErrors.phone)}
                    />
                    <PhoneCall className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-zinc-500" />
                  </div>
                  {fieldErrors.phone ? (
                    <span className="text-xs text-red-300">
                      {errorsT(fieldErrors.phone)}
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white">
                    {tForms("fields.serviceType")}
                    <span className="text-red-500"> *</span>
                  </span>
                  <div className="relative">
                    <select
                      value={values.serviceType}
                      onChange={(event) =>
                        updateField("serviceType", event.target.value)
                      }
                      className="min-w-0 w-full appearance-none rounded-[4px] border border-white/10 bg-white/[0.03] px-4 py-3 pe-11 text-sm text-white outline-none transition duration-300 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.35),0_0_18px_rgba(220,38,38,0.18)]"
                      aria-invalid={Boolean(fieldErrors.serviceType)}
                    >
                      <option value="" className="bg-[#101010] text-zinc-400">
                        {tCustom("serviceTypePlaceholder")}
                      </option>
                      <option
                        value={tCustom("serviceTypes.inspection")}
                        className="bg-[#101010]"
                      >
                        {tCustom("serviceTypes.inspection")}
                      </option>
                      <option
                        value={tCustom("serviceTypes.diagnostics")}
                        className="bg-[#101010]"
                      >
                        {tCustom("serviceTypes.diagnostics")}
                      </option>
                      <option
                        value={tCustom("serviceTypes.performance")}
                        className="bg-[#101010]"
                      >
                        {tCustom("serviceTypes.performance")}
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-zinc-500" />
                  </div>
                  {fieldErrors.serviceType ? (
                    <span className="text-xs text-red-300">
                      {errorsT(fieldErrors.serviceType)}
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white">
                    {tForms("fields.email")}
                    <span className="text-red-500"> *</span>
                  </span>
                  <div className="relative">
                    <input
                      value={values.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder={tForms("placeholders.email")}
                      autoComplete="email"
                      type="email"
                      className="min-w-0 w-full rounded-[4px] border border-white/10 bg-white/[0.03] px-4 py-3 pe-11 text-sm text-white outline-none transition duration-300 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.35),0_0_18px_rgba(220,38,38,0.18)]"
                      aria-invalid={Boolean(fieldErrors.email)}
                    />
                    <Mail className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-zinc-500" />
                  </div>
                  {fieldErrors.email ? (
                    <span className="text-xs text-red-300">
                      {errorsT(fieldErrors.email)}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-medium text-white">
                  {tForms("fields.description")}
                  <span className="text-red-500"> *</span>
                </span>
                <div className="relative">
                  <textarea
                    value={values.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder={tForms("placeholders.description")}
                    className="min-h-28 min-w-0 w-full rounded-[4px] border border-white/10 bg-white/[0.03] px-4 py-3 pe-11 text-sm text-white outline-none transition duration-300 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.35),0_0_18px_rgba(220,38,38,0.18)]"
                    aria-invalid={Boolean(fieldErrors.message)}
                  />
                  <MessageSquareText className="pointer-events-none absolute end-3 top-3 size-4 text-zinc-500" />
                </div>
                {fieldErrors.message ? (
                  <span className="text-xs text-red-300">
                    {errorsT(fieldErrors.message)}
                  </span>
                ) : null}
              </label>

              <input
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={values.website}
                onChange={(event) => updateField("website", event.target.value)}
                aria-hidden="true"
              />

              {status ? (
                <FormStatus tone={status.tone} message={status.message} />
              ) : null}

              <motion.div
                variants={reduceMotion ? undefined : clipRevealUp(0.1)}
              >
                <button
                  type="submit"
                  className={buttonClassName({
                    className:
                      "w-full justify-center rounded-[4px] px-5 py-3 text-xs tracking-[0.14em] shadow-[0_10px_28px_rgba(220,38,38,0.2)] transition-shadow hover:shadow-[0_12px_34px_rgba(220,38,38,0.32)]",
                  })}
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="size-4" />
                    {tForms("submit")}
                  </span>
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
}
