import type {
  ContactField,
  ContactFormValues,
  FormApiResult,
  ServiceRequestField,
  ServiceRequestValues,
} from "@/types/forms";

export async function submitContactForm(values: ContactFormValues) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return (await response.json()) as FormApiResult<ContactField>;
}

export async function submitServiceRequest(values: ServiceRequestValues) {
  const formData = new FormData();
  formData.set("locale", values.locale);
  formData.set("fullName", values.fullName);
  formData.set("phone", values.phone);
  formData.set("email", values.email);
  formData.set("serviceType", values.serviceType);
  formData.set("vehicleModel", values.vehicleModel);
  formData.set("preferredDate", values.preferredDate);
  formData.set("description", values.description);
  formData.set("website", values.website ?? "");

  if (values.referenceImage) {
    formData.set("referenceImage", values.referenceImage);
  }

  const response = await fetch("/api/service-request", {
    method: "POST",
    body: formData,
  });

  return (await response.json()) as FormApiResult<ServiceRequestField>;
}
