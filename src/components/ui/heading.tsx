import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";

type HeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  as?: HeadingTag;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function Heading({
  eyebrow,
  title,
  description,
  align = "start",
  as = "h2",
  className,
  titleClassName,
  descriptionClassName,
  children,
}: HeadingProps) {
  const isCentered = align === "center";
  const TitleTag = as;

  return (
    <div
      className={cn(
        "space-y-4",
        isCentered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.36em] text-red-400">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          "text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl",
          titleClassName
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8",
            isCentered && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
