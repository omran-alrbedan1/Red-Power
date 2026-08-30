import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/config/site";
import { isValidLocale } from "@/lib/i18n";

function getLocaleFromRequest(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segment = pathname.split("/")[1];

  if (isValidLocale(segment)) {
    return segment;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";

  if (acceptLanguage.toLowerCase().includes("ar")) {
    return "ar";
  }

  return siteConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = siteConfig.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
