import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { UsersManagement } from "@/components/users/users-management";
import { appConfig } from "@/config";
import { users } from "@/data/users";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";
import { StatCard } from "@/components/dashboard";

export const metadata: Metadata = createMetadata({
  title: "Users | Next.js SaaS Starter Kit Boilerplate"
});

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  // Only allow admin users to access this page
  //   if (!currentUser.isAdmin) {
  //     redirect("/dashboard");
  //   }

  // Fetch users from the database
  // const users = await getUsers();

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="User Management"
        text="View and manage all users in your application"
      />

      
 {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 mr-0 md:mr-6 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total User"
          value="12,458"
          change="+2.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/users.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Active User"
          value="3,742"
          change="+3.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/active.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Pending Verification"
          value="8,921"
          change="+12.4% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/tw.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Flagged Users"
          value="1,245"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/flag.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

      <UsersManagement users={users} />
    </div>
  );
}
