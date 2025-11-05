"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/zod-schemas";

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    toast.error("Don't allow to send reset email", {
      description: "This is a demo website, so you can't send reset email"
    });
  });

  if (isSubmitted) {
    return (
      <div className="grid gap-6 text-center">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-muted-foreground text-sm">
            We've sent a password reset link to your email address if an account exists.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
            Send another email
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-primary hover:text-foreground text-sm underline underline-offset-4"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold md:text-2xl">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader className="me-3 animate-spin" />}
            Send reset email
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-primary hover:text-foreground text-sm underline underline-offset-4"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
