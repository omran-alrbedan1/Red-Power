import { NextResponse } from "next/server";

import { getFormApiMessage, getValidationMessage } from "@/lib/forms/content";
import { validateServiceRequestForm } from "@/lib/forms/validation";
import { deliverLead, isDuplicateLead } from "@/lib/server/lead-delivery";
import type { ServiceRequestValues } from "@/types/forms";

const MAX_MULTIPART_BODY_BYTES = 6 * 1024 * 1024;

class RequestBodyTooLargeError extends Error {}

async function readMultipartFormData(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_MULTIPART_BODY_BYTES) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    throw new Error("Expected multipart form data");
  }

  const reader = request.body?.getReader();
  if (!reader) {
    throw new Error("Request body is missing");
  }

  const chunks: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    size += value.byteLength;
    if (size > MAX_MULTIPART_BODY_BYTES) {
      await reader.cancel();
      throw new RequestBodyTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new Request(request.url, {
    body,
    headers: request.headers,
    method: request.method,
  }).formData();
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await readMultipartFormData(request);
  } catch (error) {
    const status = error instanceof RequestBodyTooLargeError ? 413 : 400;
    const event = status === 413 ? "body too large" : "invalid multipart body";
    console.warn(`Service request rejected: ${event}`);

    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage("ar", "server_error"),
      },
      { status }
    );
  }

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
  } catch (error) {
    console.error("Service request delivery failed", {
      error: error instanceof Error ? error.message : "unknown error",
    });

    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "server_error"),
      },
      { status: 500 }
    );
  }
}
