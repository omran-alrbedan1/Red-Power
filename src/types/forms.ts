import type { SiteLocale } from "@/config/site";

export type ContactFormValues = {
  locale: SiteLocale;
  name: string;
  phone: string;
  message: string;
  website?: string;
};

export type ServiceRequestValues = {
  locale: SiteLocale;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  vehicleModel: string;
  preferredDate: string;
  description: string;
  referenceImage?: File | null;
  website?: string;
};

export type ContactField = "name" | "phone" | "message";

export type ServiceRequestField =
  | "fullName"
  | "phone"
  | "email"
  | "serviceType"
  | "vehicleModel"
  | "preferredDate"
  | "description"
  | "referenceImage";

export type ValidationCode =
  | "required"
  | "invalid_email"
  | "invalid_phone"
  | "min_name"
  | "min_message"
  | "min_description"
  | "invalid_date"
  | "invalid_file_type"
  | "file_too_large"
  | "duplicate_submission"
  | "server_error";

export type ValidationErrors<TField extends string> = Partial<
  Record<TField, ValidationCode>
>;

export type FormApiSuccess = {
  ok: true;
  message: string;
};

export type FormApiFailure<TField extends string> = {
  ok: false;
  message: string;
  fieldErrors?: ValidationErrors<TField>;
};

export type FormApiResult<TField extends string> =
  | FormApiSuccess
  | FormApiFailure<TField>;
