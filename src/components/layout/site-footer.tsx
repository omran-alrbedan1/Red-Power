import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, Clock3, Home, Mail, MapPin, Phone } from "lucide-react";

import { images } from "@/constants/image";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations("common");

  const quickLinks = [
    { label: t("navigation.home"), href: `/${locale}` },
    { label: t("navigation.services"), href: `/${locale}/services` },
    { label: t("navigation.about"), href: `/${locale}/about` },
    { label: t("navigation.gallery"), href: `/${locale}/gallery` },
    { label: t("navigation.contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-red-600/20 bg-[#050607] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-red-900/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex items-center justify-center">
          <div className="h-px flex-1 bg-gradient-to-l from-red-600/70 to-transparent" />
          <div className="mx-6 flex h-12 w-20"></div>
          <div className="h-px flex-1 bg-gradient-to-r from-red-600/70 to-transparent" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_0.8fr] lg:gap-14">
          <div className="text-right">
            <Link
              href={`/${locale}`}
              aria-label={t("brand.homeLabel")}
              className="group inline-block"
            >
              <Image
                src={images.brand.redPowerLogo}
                alt="Red Power Garage"
                width={360}
                height={138}
                priority
                className="h-auto w-[240px] object-contain sm:w-[220px] lg:w-[300px]"
              />
            </Link>

            <p className="mt-7 max-w-md text-base leading-8 text-zinc-400">
              {t("footer.description")}
            </p>

            <div className="mt-7 flex items-center justify-start gap-3">
              <span className="text-sm font-black tracking-[0.25em] text-red-600">
                {"///"}
              </span>
              <div className="h-px w-32 bg-red-600/60" />
            </div>

            <div className="mt-7 flex justify-start gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-zinc-400 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="group flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-zinc-400 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              />
              <Link
                href={`/${locale}`}
                aria-label={t("brand.homeLabel")}
                className="group flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-zinc-400 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <Home className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <FooterHeading>{t("footer.contactTitle")}</FooterHeading>

            <div className="mt-8 space-y-0">
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label={t("footer.contact.phoneLabel")}
                value={t("footer.contact.phone")}
                href={`tel:${t("footer.contact.phone")}`}
              />
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label={t("footer.contact.emailLabel")}
                value={t("footer.contact.email")}
                href={`mailto:${t("footer.contact.email")}`}
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label={t("footer.contact.addressLabel")}
                value={t("footer.contact.address")}
              />
              <ContactItem
                icon={<Clock3 className="h-5 w-5" />}
                label={t("footer.contact.hoursLabel")}
                value={t("footer.contact.hours")}
              />
            </div>
          </div>

          <div>
            <FooterHeading>{t("footer.quickLinksTitle")}</FooterHeading>

            <nav className="mt-8">
              <ul className="divide-y divide-white/[0.07]">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-3 text-base text-zinc-400 transition-colors duration-300 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ChevronLeft className="h-4 w-4 text-red-600 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/[0.08]">
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
            <p className="text-zinc-500">{t("footer.copyright")}</p>

            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {t("footer.poweredBy")}
              </span>
              <Image
                src={images.brand.futurexLogo}
                alt={t("footer.poweredByAlt")}
                width={132}
                height={28}
                className="h-auto w-28 object-contain sm:w-32"
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto">
      <h2 className="text-xl font-bold text-white">{children}</h2>
      <div className="mt-4 flex items-center gap-2 ltr:justify-end rtl:justify-start">
        <span className="text-xs font-black tracking-[0.2em] text-red-600">
          {"///"}
        </span>
        <div className="h-[2px] w-12 bg-red-600" />
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-4 border-b border-white/[0.07] py-2">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-600/40 bg-red-600/[0.06] text-red-600 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-zinc-500">{label}</p>
        <p className="mt-1 break-words text-sm leading-6 text-zinc-200 transition-colors group-hover:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
