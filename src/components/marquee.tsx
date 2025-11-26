import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: string;
  className?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  duration = "20s",
  className = "",
  direction = "left",
  pauseOnHover = true
}: MarqueeProps) {
  const animationDirection = direction === "left" ? "marquee" : "marquee-reverse";
  const animationDuration = duration;

  return (
    <>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-reverse {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }

        .marquee-container {
          animation: ${animationDirection} ${animationDuration} linear infinite;
          ${pauseOnHover ? "animation-play-state: running;" : ""}
        }

        ${pauseOnHover ? ".marquee-container:hover { animation-play-state: paused; }" : ""}
      `}</style>

      <div className={`marquee-container ${className}`}>
        {children}
      </div>
    </>
  );
}
