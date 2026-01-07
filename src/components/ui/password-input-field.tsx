"use client";

import { useState, ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PasswordInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  showForgotPassword?: boolean;
  placeholder?: string;
  autoComplete?: string;
  leftIcon?: ReactNode;
  variant?: "default" | "with-icon-button";
}

export function PasswordInputField<T extends FieldValues>({
  form,
  name,
  label,
  showForgotPassword = false,
  placeholder = "********",
  autoComplete = "current-password",
  leftIcon,
  variant = "default",
}: Readonly<PasswordInputFieldProps<T>>) {
  const [showPassword, setShowPassword] = useState(false);

  const hasLeftIcon = Boolean(leftIcon);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={variant === "with-icon-button" ? "" : "grid gap-0"}>
          <div className={cn(
            "flex items-center",
            showForgotPassword ? "justify-between pb-3" : variant === "with-icon-button" ? "" : "pb-3"
          )}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {showForgotPassword && (
              <Link
                href="/forgot-password"
                className="text-primary hover:text-foreground text-sm underline underline-offset-4"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <FormControl>
            <div className="relative">
              {leftIcon && (
                <span className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2">
                  {leftIcon}
                </span>
              )}
              <Input
                placeholder={placeholder}
                autoComplete={autoComplete}
                type={showPassword ? "text" : "password"}
                className={cn(hasLeftIcon && "ps-10 pe-10")}
                {...field}
              />
              {variant === "with-icon-button" ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </Button>
              ) : (
                <button
                  type="button"
                  className="absolute inset-y-0 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="text-muted-foreground size-4" />
                  ) : (
                    <EyeOffIcon className="text-muted-foreground size-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className={variant === "with-icon-button" ? "" : "mt-2"} />
        </FormItem>
      )}
    />
  );
}
