"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { FormStatus } from "@/components/forms/form-status";
import { TextField } from "@/components/forms/text-field";
import { buttonClassName } from "@/components/ui/button";
import { submitServiceRequest } from "@/lib/api/public-forms";
import { validateServiceRequestForm } from "@/lib/forms/validation";
import type { ServiceRequestField, ServiceRequestValues, ValidationErrors } from "@/types/forms";

const initialValues = (locale: ServiceRequestValues["locale"]): ServiceRequestValues => ({
  locale,
  fullName: "",
  phone: "",
  email: "",
  serviceType: "",
  vehicleModel: "",
  preferredDate: "",
  description: "",
  referenceImage: null,
  website: "",
});

export function ServiceRequestForm() {
  const locale = useLocale();
  const t = useTranslations("forms.serviceRequestForm");
  const errorsT = useTranslations("forms.errors");
  const [values, setValues] = useState<ServiceRequestValues>(initialValues(locale));
  const [fieldErrors, setFieldErrors] = useState<
    ValidationErrors<ServiceRequestField>
  >({});
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ServiceRequestValues>(
    field: K,
    value: ServiceRequestValues[K]
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateServiceRequestForm(values);
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
      const result = await submitServiceRequest(values);

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

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="service-full-name"
          label={t("fields.fullName")}
          value={values.fullName}
          placeholder={t("placeholders.fullName")}
          autoComplete="name"
          required
          errorMessage={
            fieldErrors.fullName ? errorsT(fieldErrors.fullName) : undefined
          }
          onChange={(value) => updateField("fullName", value)}
        />
        <TextField
          id="service-phone"
          label={t("fields.phone")}
          value={values.phone}
          placeholder={t("placeholders.phone")}
          autoComplete="tel"
          required
          errorMessage={fieldErrors.phone ? errorsT(fieldErrors.phone) : undefined}
          onChange={(value) => updateField("phone", value)}
        />
        <TextField
          id="service-email"
          label={t("fields.email")}
          type="email"
          value={values.email}
          placeholder={t("placeholders.email")}
          autoComplete="email"
          required
          errorMessage={fieldErrors.email ? errorsT(fieldErrors.email) : undefined}
          onChange={(value) => updateField("email", value)}
        />
        <TextField
          id="service-type"
          label={t("fields.serviceType")}
          value={values.serviceType}
          placeholder={t("placeholders.serviceType")}
          required
          errorMessage={
            fieldErrors.serviceType ? errorsT(fieldErrors.serviceType) : undefined
          }
          onChange={(value) => updateField("serviceType", value)}
        />
        <TextField
          id="vehicle-model"
          label={t("fields.vehicleModel")}
          value={values.vehicleModel}
          placeholder={t("placeholders.vehicleModel")}
          required
          errorMessage={
            fieldErrors.vehicleModel ? errorsT(fieldErrors.vehicleModel) : undefined
          }
          onChange={(value) => updateField("vehicleModel", value)}
        />
        <TextField
          id="preferred-date"
          label={t("fields.preferredDate")}
          type="date"
          value={values.preferredDate}
          errorMessage={
            fieldErrors.preferredDate ? errorsT(fieldErrors.preferredDate) : undefined
          }
          onChange={(value) => updateField("preferredDate", value)}
        />
      </div>

      <label htmlFor="service-description" className="grid gap-2">
        <span className="text-sm font-medium text-white">
          {t("fields.description")}
        </span>
        <textarea
          id="service-description"
          name="description"
          required
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          aria-label={t("fields.description")}
          className="min-h-36 min-w-0 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder={t("placeholders.description")}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={
            fieldErrors.description ? "service-description-error" : undefined
          }
        />
        {fieldErrors.description ? (
          <span id="service-description-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.description)}
          </span>
        ) : null}
      </label>

      <label htmlFor="service-reference-image" className="grid gap-2">
        <span className="text-sm font-medium text-white">
          {t("fields.referenceImage")}
        </span>
        <input
          id="service-reference-image"
          name="referenceImage"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          aria-label={t("fields.referenceImage")}
          onChange={(event) =>
            updateField("referenceImage", event.target.files?.[0] ?? null)
          }
          className="min-w-0 w-full rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-zinc-300 file:me-4 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
          aria-invalid={Boolean(fieldErrors.referenceImage)}
          aria-describedby={
            fieldErrors.referenceImage ? "service-reference-error" : "service-reference-hint"
          }
        />
        <span id="service-reference-hint" className="text-sm text-zinc-400">
          {t("fileHint")}
        </span>
        {fieldErrors.referenceImage ? (
          <span id="service-reference-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.referenceImage)}
          </span>
        ) : null}
      </label>

      <input
        id="service-website"
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
