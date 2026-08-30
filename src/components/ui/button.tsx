import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-red-600 text-white hover:bg-red-500",
  secondary:
    "border border-white/15 bg-transparent text-white hover:border-red-500/70 hover:bg-white/5",
  ghost:
    "border border-transparent bg-transparent text-zinc-300 hover:border-white/10 hover:bg-white/5 hover:text-white",
} as const;

const buttonSizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

type ButtonClassNameOptions = {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function buttonClassName({
  className,
  size = "md",
  variant = "primary",
}: ButtonClassNameOptions = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    buttonVariants[variant],
    buttonSizes[size],
    className
  );
}
