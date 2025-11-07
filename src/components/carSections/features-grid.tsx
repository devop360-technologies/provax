"use client";

import { SectionHeader } from "@/components/section-headers";
import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Zap,
    title: "Faaast",
    description: "It supports an entire helping developers and innovate."
  },
  {
    icon: Cpu,
    title: "Powerful",
    description: "It supports an entire helping developers and businesses."
  },
  {
    icon: Fingerprint,
    title: "Security",
    description: "It supports an helping developers businesses."
  },
  {
    icon: Pencil,
    title: "Customization",
    description: "It supports helping developers and businesses innovate."
  },
  {
    icon: Settings2,
    title: "Control",
    description: "It supports helping developers and businesses innovate."
  },
  {
    icon: Sparkles,
    title: "Built for AI",
    description: "It supports helping developers and businesses innovate."
  }
];

export default function FeaturesGrid() {
  return (
    <SectionHeader id="features">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>Powerful features</SectionHeader.Heading>
        <SectionHeader.Text>
          Everything you need to build, launch, and scale your SaaS application with confidence.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content>
        <div className="bg-background text-foreground mx-auto grid max-w-6xl grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, i) => (
            <div className="relative overflow-hidden p-8" key={i}>
              <div className="pointer-events-none absolute top-0 left-1/2 -ms-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="from-muted-foreground/5 to-muted-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                  <GridPattern
                    y="4"
                    x="-12"
                    width={20}
                    height={20}
                    squares={patterns}
                    className="fill-muted-foreground/5 stroke-muted-foreground/10 absolute inset-0 h-full w-full mix-blend-overlay"
                  />
                </div>
              </div>

              <div className="bg-primary/10 flex size-11 flex-col items-center justify-center rounded-md">
                <feature.icon className="text-primary size-6" strokeWidth={1} aria-hidden />
              </div>

              <h2 className="mt-7 text-xl font-bold">{feature.title}</h2>
              <p className="text-muted-foreground relative z-20 mt-2 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}

interface GridPatternProps extends React.ComponentProps<"svg"> {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}

const patterns = [
  [9, 3],
  [7, 4],
  [9, 3],
  [7, 2],
  [10, 2]
];

function GridPattern({ width, height, x, y, squares, ...props }: GridPatternProps) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          x={x}
          y={y}
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />

      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              key={index}
              x={x * width}
              y={y * height}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
