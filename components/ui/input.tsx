import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
            {props.required && (
              <span aria-hidden className="text-orange-400 ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 rounded-xl px-4 text-sm",
              "bg-[var(--surface)] border border-[var(--border)]",
              "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
              "transition-all duration-200",
              "hover:border-cyan-500/30",
              "focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20",
              error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <span
              aria-hidden
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[var(--text-tertiary)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
            {props.required && (
              <span aria-hidden className="text-orange-400 ml-1">*</span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm min-h-[120px] resize-y",
            "bg-[var(--surface)] border border-[var(--border)]",
            "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
            "transition-all duration-200",
            "hover:border-cyan-500/30",
            "focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20",
            error && "border-red-500/60",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />

        {error && (
          <p role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
