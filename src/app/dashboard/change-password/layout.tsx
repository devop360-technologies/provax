import type { PropsWithChildren } from "react";

import { DashboardTitle } from "@/components/dashboard-title";

export default function PasswordSettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Password Settings"
        text="Update your password to keep your account secure"
      />

      {children}
    </div>
  );
}
