import { BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeader } from "@/components/section-headers";
import { TypingEffect } from "@/components/typing-effect";
import { Button } from "@/components/ui/button";

import dashboard from "../../../public/dashboard.png";

export default function Hero() {
  return (
    <SectionHeader className="pt-16 md:pt-24">
      <SectionHeader.Content className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <div className="mb-3 flex justify-center">
          <Link
            className="text-foreground bg-primary/5 border-primary/20 hover:bg-primary/10 flex items-center gap-2 truncate rounded-full border px-1 py-1 pr-3 text-left text-xs transition-colors"
            href="/"
          >
            <span className="bg-primary text-primary-foreground block truncate rounded-full px-1.5 py-0.5 font-medium">
              📣 Announcement
            </span>{" "}
            Introducing SaasPilot
          </Link>
        </div>

        <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
          The scalable and production-ready Next.js SaaS{" "}
          <span className="bg-muted inline-block rounded-md px-2 font-mono">
            <TypingEffect text="starter kit" />
          </span>
        </h1>

        <p className="text-muted-foreground mb-8 max-w-3xl text-lg">
          Save endless hours of development time and focus on what's important for your customers
          with our ready-to-use Next.js SaaS boilerplate. Build and ship faster than the
          competition.
        </p>

        <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
          <Link target="_blank" href="https://saas-pilot-docs.vercel.app" passHref>
            <Button
              variant="secondary"
              className="group w-full !px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg sm:w-auto"
            >
              <BookOpen
                strokeWidth={2}
                className="size-4 transition-transform duration-300 group-hover:scale-110"
              />
              Documentation
            </Button>
          </Link>

          <Link href="#pricing" passHref>
            <Button className="group from-primary hover:from-primary w-full bg-gradient-to-r to-purple-600 !px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:to-purple-700 hover:shadow-xl sm:w-auto">
              <Zap
                strokeWidth={2}
                className="size-4 transition-transform duration-300 group-hover:scale-110"
              />
              Get SaasPilot
            </Button>
          </Link>
        </div>

        <div className="bg-card/50 dark:shadow-foreground/10mx-auto max-w-5xl overflow-hidden rounded-2xl border p-2 shadow-lg">
          <Image
            priority
            width={1200}
            height={1200}
            src={dashboard}
            className="rounded-xl"
            alt="SaasPilot Dashboard Preview"
          />
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}
