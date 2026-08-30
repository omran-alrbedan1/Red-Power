import { getRequestConfig } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { getMessages } from "@/i18n/messages";
import { isValidLocale } from "@/lib/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale =
    requestedLocale && isValidLocale(requestedLocale)
      ? requestedLocale
      : siteConfig.defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});
