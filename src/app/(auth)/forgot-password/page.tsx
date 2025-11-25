import type { Metadata } from "next";
import { Suspense } from "react";

import {  ForgotPasswordForm } from "@/components/forms/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Forgot Password",
  canonicalUrlRelative: "/forgot-password"
});

export default function ForgotPasswordPage() {
  return (
      <div>
       
            <Suspense>
              <ForgotPasswordForm />
            </Suspense>

      </div>
  );
}
