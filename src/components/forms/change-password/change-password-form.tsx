"use client";

import { Loader, Lock, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PasswordInputField } from "@/components/ui/password-input-field";

import { useChangePasswordForm } from "./use-change-password-form";

export function ChangePasswordForm() {
  const {
    form,
    onSubmit,
    isSubmitting
  } = useChangePasswordForm();

  return (
    <Card className="max-w-2xl shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <PasswordInputField
              form={form}
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              leftIcon={<Lock className="size-4" />}
              variant="with-icon-button"
            />

            <PasswordInputField
              form={form}
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              autoComplete="new-password"
              leftIcon={<Lock className="size-4" />}
              variant="with-icon-button"
            />

            <PasswordInputField
              form={form}
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              autoComplete="new-password"
              leftIcon={<Lock className="size-4" />}
              variant="with-icon-button"
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button onClick={onSubmit} disabled={isSubmitting} className="mt-4">
          {isSubmitting ? (
            <>
              <Loader className="me-2 size-4 animate-spin" />
              Updating password...
            </>
          ) : (
            <>
              <Save className="me-2 size-4" />
              Update password
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
