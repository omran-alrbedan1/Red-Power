"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { buttonClassName } from "@/components/ui/button";
import { submitContactForm } from "@/lib/api/public-forms";
import { validateContactForm } from "@/lib/forms/validation";
import type {
  ContactField,
  ContactFormValues,
  ValidationErrors,
} from "@/types/forms";
import { FormStatus } from "@/components/forms/form-status";

const initialValues = (locale: ContactFormValues["locale"]): ContactFormValues => ({
  locale,
  name: "",
  phone: "",
  message: "",
  website: "",
});

export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("forms.contactForm");
  const errorsT = useTranslations("forms.errors");
  const [values, setValues] = useState<ContactFormValues>(initialValues(locale));
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors<ContactField>>(
    {}
  );
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus({
        tone: "error",
        message: t("error"),
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await submitContactForm(values);

      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatus({
          tone: "error",
          message: result.message,
        });
        return;
      }

      setValues(initialValues(locale));
      setFieldErrors({});
      setStatus({
        tone: "success",
        message: result.message,
      });
    } catch {
      setStatus({
        tone: "error",
        message: errorsT("server_error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="space-y-2">
        <p className="break-words text-sm uppercase tracking-[0.18em] text-red-400 sm:tracking-[0.32em]">
          {t("eyebrow")}
        </p>
        <h2 className="max-w-full break-words text-3xl font-semibold text-white">
          {t("title")}
        </h2>
        <p className="max-w-full break-words text-sm leading-7 text-zinc-300">
          {t("description")}
        </p>
      </div>

      <label htmlFor="contact-name" className="grid gap-2">
        <span className="text-sm font-medium text-white">
          {t("fields.name")}
        </span>
        <input
          id="contact-name"
          name="name"
          required
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-label={t("fields.name")}
          className="min-w-0 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder={t("placeholders.name")}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        {fieldErrors.name ? (
          <span id="contact-name-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.name)}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-phone" className="grid gap-2">
        <span className="text-sm font-medium text-white">
          {t("fields.phone")}
        </span>
        <input
          id="contact-phone"
          name="phone"
          required
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          type="tel"
          aria-label={t("fields.phone")}
          className="min-w-0 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder={t("placeholders.phone")}
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
        />
        {fieldErrors.phone ? (
          <span id="contact-phone-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.phone)}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-message" className="grid gap-2">
        <span className="text-sm font-medium text-white">
          {t("fields.message")}
        </span>
        <textarea
          id="contact-message"
          name="message"
          required
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-label={t("fields.message")}
          className="min-h-36 min-w-0 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder={t("placeholders.message")}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
        />
        {fieldErrors.message ? (
          <span id="contact-message-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.message)}
          </span>
        ) : null}
      </label>

      <input
        id="contact-website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        name="website"
        value={values.website ?? ""}
        onChange={(event) => updateField("website", event.target.value)}
        aria-hidden="true"
      />

      {status ? <FormStatus tone={status.tone} message={status.message} /> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        aria-disabled={isSubmitting}
        className={buttonClassName({
          className: "w-full disabled:cursor-not-allowed disabled:opacity-60",
        })}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
