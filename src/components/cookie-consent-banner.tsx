"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { cn } from "@/lib/utils";

interface CookieConsentBannerProps {
  className?: string;
}

export function CookieConsentBanner({ className }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only show banner after component has loaded to avoid hydration mismatch
    setIsLoaded(true);

    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(appConfig.googleAnalytics.consent.cookieName);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(appConfig.googleAnalytics.consent.cookieName, "accepted");
    setIsVisible(false);

    // Here you can initialize your analytics/tracking
    // For example: Google Analytics, Facebook Pixel, etc.
    if (typeof window !== "undefined" && window.gtag) {
      console.log(window.gtag);

      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted"
      });
    }
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(appConfig.googleAnalytics.consent.cookieName, "declined");
    setIsVisible(false);

    // Disable analytics/tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied"
      });
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    // Don't set localStorage, so banner will show again on next visit
  }, []);

  // Don't render anything during SSR or if not loaded yet
  if (!isLoaded || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-card/95 fixed start-4 bottom-4 z-50 mx-auto max-w-sm rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out",
        "md:start-6 md:max-w-md lg:max-w-lg",
        "animate-in slide-in-from-bottom-2 fade-in-0",
        className
      )}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute top-2 right-2 rounded-md p-1 transition-colors"
        aria-label="Dismiss cookie notice"
      >
        <X className="size-4" />
      </button>

      {/* Content */}
      <div className="pr-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="bg-primary/10 flex size-6 items-center justify-center rounded-full">
            <span className="text-xs">🍪</span>
          </div>

          <h3 id="cookie-consent-title" className="text-card-foreground font-medium">
            Cookie Notice
          </h3>
        </div>

        <p
          id="cookie-consent-description"
          className="text-muted-foreground mb-4 text-sm leading-relaxed"
        >
          This site doesn't use cookies yet, but we added this banner to demo it to you.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col justify-end gap-2 sm:flex-row">
          <Button
            size="sm"
            onClick={handleDecline}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            Decline
          </Button>

          <Button onClick={handleAccept} size="sm" className="flex-1 sm:flex-none">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
