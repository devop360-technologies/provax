import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { appConfig } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ====================================================
 * Logs an error message to the browser console (development only)
 * @param message - The error message to log
 *  =====================================================
 */
export function browserConsoleError(message: string) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(
      `%c${message}`,
      "background: #dc2626; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;"
    );
  }
}

/** ====================================================
 * Validates email format using a simple regex
 * @param email - Email address to validate
 * @returns {boolean} indicating if email format is valid
 *  =====================================================
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** ====================================================
 * Formats a date to a string in the format of "Month Day, Year"
 * @param input - Date to format
 * @returns {string} formatted date, or an empty string if the input is not a valid date
 *  =====================================================
 */
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });
}

/** ====================================================
 * Checks if a user is on a trial period
 * @param createdAt - Date the user was created
 * @returns {boolean} indicating if the user is on a trial period
 *  =====================================================
 */
export function isTrialPeriod(createdAt: Date): boolean {
  const now = new Date();
  const trialEndDate = new Date(createdAt.getTime() + appConfig.stripe.trailPeriod);

  return now < trialEndDate;
}
