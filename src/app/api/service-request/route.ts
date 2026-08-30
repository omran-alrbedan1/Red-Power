import { NextResponse } from "next/server";

import { getFormApiMessage, getValidationMessage } from "@/lib/forms/content";
import { validateServiceRequestForm } from "@/lib/forms/validation";
import { deliverLead, isDuplicateLead } from "@/lib/server/lead-delivery";
import type { ServiceRequestValues } from "@/types/forms";

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = formData.get("locale") === "en" ? "en" : "ar";
  const successMessage = await getFormApiMessage(
    locale,
    "serviceRequestSuccess"
  );
  const referenceImageEntry = formData.get("referenceImage");

  const payload: ServiceRequestValues = {
    locale,
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    serviceType: String(formData.get("serviceType") ?? ""),
    vehicleModel: String(formData.get("vehicleModel") ?? ""),
    preferredDate: String(formData.get("preferredDate") ?? ""),
    description: String(formData.get("description") ?? ""),
    referenceImage:
      referenceImageEntry instanceof File ? referenceImageEntry : null,
    website: String(formData.get("website") ?? ""),
  };

  if (payload.website?.trim()) {
    return NextResponse.json(
      { ok: true, message: successMessage },
      { status: 200 }
    );
  }

  const fieldErrors = validateServiceRequestForm(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "server_error"),
        fieldErrors,
      },
      { status: 400 }
    );
  }

  if (
    isDuplicateLead([
      payload.fullName,
      payload.phone,
      payload.email,
      payload.description,
    ])
  ) {
    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "duplicate_submission"),
      },
      { status: 429 }
    );
  }

  try {
    await deliverLead(process.env.SERVICE_REQUEST_WEBHOOK_URL, {
      type: "service-request",
      locale,
      fullName: payload.fullName.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      serviceType: payload.serviceType.trim(),
      vehicleModel: payload.vehicleModel.trim(),
      preferredDate: payload.preferredDate,
      description: payload.description.trim(),
      referenceImage: payload.referenceImage
        ? {
            name: payload.referenceImage.name,
            size: payload.referenceImage.size,
            type: payload.referenceImage.type,
          }
        : null,
      receivedAt: new Date().toISOString(),
      destinationEmail: process.env.CONTACT_EMAIL ?? null,
    });

    return NextResponse.json({
      ok: true,
      message: successMessage,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "server_error"),
      },
      { status: 500 }
    );
  }
}
