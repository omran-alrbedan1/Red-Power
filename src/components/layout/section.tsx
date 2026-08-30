import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 lg:py-28", className)}
    >
      {children}
    </section>
  );
}
