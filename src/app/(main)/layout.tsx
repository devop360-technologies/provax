import MainLayout from "@/components/layouts/main";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <MainLayout>{children}</MainLayout>;
}
