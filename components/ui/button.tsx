"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  // Base
  "relative inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-40 overflow-hidden select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-500 text-primary-900 hover:bg-cyan-400 focus-visible:ring-cyan-500 shadow-glow-cyan",
        secondary:
          "bg-transparent border border-[var(--border-accent)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-cyan-500/50 focus-visible:ring-cyan-500",
        ghost:
          "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] focus-visible:ring-cyan-500",
        lime:
          "bg-lime-500 text-primary-900 hover:bg-lime-400 focus-visible:ring-lime-500 shadow-glow-lime",
        orange:
          "bg-orange-500 text-white hover:bg-orange-400 focus-visible:ring-orange-500 shadow-glow-orange",
        glass:
          "glass text-[var(--text-primary)] hover:bg-white/10 border-white/10 focus-visible:ring-cyan-500",
        danger:
          "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-11 px-5 text-sm rounded-xl",
        lg: "h-13 px-7 text-base rounded-xl",
        xl: "h-15 px-9 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    magnetic?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      magnetic = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });
    const x = useTransform(springX, (v) => (magnetic ? v * 0.3 : 0));
    const y = useTransform(springY, (v) => (magnetic ? v * 0.3 : 0));

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }

    function handleMouseLeave() {
      mouseX.set(0);
      mouseY.set(0);
    }

    return (
      <motion.button
        ref={ref}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {/* Shimmer effect au hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full"
          style={{ transition: "transform 0.6s ease, opacity 0.3s ease" }}
        />

        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="31.416"
              strokeDashoffset="23.562"
            />
          </svg>
        ) : leftIcon ? (
          <span aria-hidden className="shrink-0">
            {leftIcon}
          </span>
        ) : null}

        {children}

        {!loading && rightIcon && (
          <span aria-hidden className="shrink-0">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
