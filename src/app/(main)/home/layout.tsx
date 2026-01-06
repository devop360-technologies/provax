import type { PropsWithChildren } from "react";

export default function Home({ children }: Readonly<PropsWithChildren>) {
  return <div>{children}</div>;
}
