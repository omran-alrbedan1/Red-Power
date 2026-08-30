import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "border border-white/10 bg-[#111315] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] transition-colors hover:border-red-500/20",
        className
      )}
    >
      {children}
    </div>
  );
}
