import type {
  ContactField,
  ContactFormValues,
  ServiceRequestField,
  ServiceRequestValues,
  ValidationErrors,
} from "@/types/forms";

const PHONE_REGEX = /^[+0-9\s()-]{6,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function validateContactForm(values: ContactFormValues) {
  const fieldErrors: ValidationErrors<ContactField> = {};

  if (!values.name.trim()) {
    fieldErrors.name = "required";
  } else if (values.name.trim().length < 2) {
    fieldErrors.name = "min_name";
  }

  if (!values.phone.trim()) {
    fieldErrors.phone = "required";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    fieldErrors.phone = "invalid_phone";
  }

  if (!values.message.trim()) {
    fieldErrors.message = "required";
  } else if (values.message.trim().length < 10) {
    fieldErrors.message = "min_message";
  }

  return fieldErrors;
}

export function validateServiceRequestForm(values: ServiceRequestValues) {
  const fieldErrors: ValidationErrors<ServiceRequestField> = {};

  if (!values.fullName.trim()) {
    fieldErrors.fullName = "required";
  } else if (values.fullName.trim().length < 2) {
    fieldErrors.fullName = "min_name";
  }

  if (!values.phone.trim()) {
    fieldErrors.phone = "required";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    fieldErrors.phone = "invalid_phone";
  }

  if (!values.email.trim()) {
    fieldErrors.email = "required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    fieldErrors.email = "invalid_email";
  }

  if (!values.serviceType.trim()) {
    fieldErrors.serviceType = "required";
  }

  if (!values.vehicleModel.trim()) {
    fieldErrors.vehicleModel = "required";
  }

  if (!values.preferredDate.trim()) {
    fieldErrors.preferredDate = "required";
  } else if (Number.isNaN(Date.parse(values.preferredDate))) {
    fieldErrors.preferredDate = "invalid_date";
  }

  if (!values.description.trim()) {
    fieldErrors.description = "required";
  } else if (values.description.trim().length < 15) {
    fieldErrors.description = "min_description";
  }

  if (values.referenceImage) {
    if (!IMAGE_TYPES.includes(values.referenceImage.type)) {
      fieldErrors.referenceImage = "invalid_file_type";
    } else if (values.referenceImage.size > MAX_FILE_SIZE) {
      fieldErrors.referenceImage = "file_too_large";
    }
  }

  return fieldErrors;
}
