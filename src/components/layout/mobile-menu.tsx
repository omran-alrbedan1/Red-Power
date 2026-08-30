"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { getNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const locale = useLocale();
  const navT = useTranslations("common.navigation");
  const menuT = useTranslations("common.mobileMenu");
  const pathname = usePathname();
  const links = getNavigation(locale);
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const open = openPathname === pathname;

  useEffect(() => {
    if (!open) {
      return;
    }

    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPathname(null);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? menuT("closeLabel") : menuT("openLabel")}
        onClick={() =>
          setOpenPathname((current) => (current === pathname ? null : pathname))
        }
        className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.03] text-white transition hover:border-red-500/70 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <span className="sr-only">{menuT("menuLabel")}</span>
        <div className="flex flex-col gap-1.5">
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
        </div>
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0b0c0d]/98 px-6 py-5 backdrop-blur-xl">
          <nav
            id="mobile-nav"
            aria-label={navT("mobileAriaLabel")}
            className="flex flex-col gap-2"
          >
            {links.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpenPathname(null)}
                  className={cn(
                    "rounded-md border border-transparent px-4 py-3 text-xs uppercase tracking-[0.18em] text-zinc-200 transition hover:border-red-500/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                    isActive && "border-white/10 bg-white/5 text-white"
                  )}
                >
                  {navT(link.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
