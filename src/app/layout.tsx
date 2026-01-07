import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { inter, jetBrainsMono } from "@/lib/fonts";
import { createMetadata, getViewportMetadata } from "@/lib/metadata";
import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";

export const metadata: Metadata = createMetadata();
export const viewport: Viewport = getViewportMetadata();

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetBrainsMono.variable} antialiased`}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <QueryProvider>
            <SessionProvider>
              {children}

              <NextTopLoader
                height={2}
                shadow={false}
                showSpinner={false}
                color={appConfig.colors.primary}
              />

              <GoogleAnalytics gaId={appConfig.googleAnalytics.id} />
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
