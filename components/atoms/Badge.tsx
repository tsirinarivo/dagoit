import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider rounded-full px-2.5 py-1 border",
  {
    variants: {
      variant: {
        cyan:
          "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
        lime:
          "bg-lime-500/10 text-lime-500 border-lime-500/30",
        orange:
          "bg-orange-500/10 text-orange-500 border-orange-500/30",
        new:
          "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
        promo:
          "bg-orange-500/10 text-orange-500 border-orange-500/30",
        bestseller:
          "bg-lime-500/10 text-lime-500 border-lime-500/30",
        popular:
          "bg-gradient-to-r from-cyan-500/20 to-lime-500/20 text-cyan-400 border-cyan-500/40",
        neutral:
          "bg-slate-800 text-slate-400 border-slate-700",
        online:
          "bg-lime-500/15 text-lime-400 border-lime-500/30",
        offline:
          "bg-slate-700 text-slate-400 border-slate-600",
        warning:
          "bg-orange-500/15 text-orange-400 border-orange-500/30",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean;
    pulse?: boolean;
  };

export function Badge({
  className,
  variant,
  dot = false,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "online" && "bg-lime-400",
            variant === "offline" && "bg-slate-500",
            variant === "cyan" && "bg-cyan-500",
            variant === "lime" && "bg-lime-500",
            variant === "orange" && "bg-orange-500",
            pulse && "animate-blink"
          )}
        />
      )}
      {children}
    </span>
  );
}
