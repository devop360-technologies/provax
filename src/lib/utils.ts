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
 * Validates email format without using regex (avoids ReDoS)
 * @param email - Email address to validate
 * @returns {boolean} indicating if email format is valid
 *  =====================================================
 */
export function isValidEmail(email: string): boolean {
  // Length checks to prevent excessive processing
  if (!email || email.length > 254 || email.length < 3) return false;
  
  // Find @ position - must exist and not be first/last character
  const atIndex = email.indexOf("@");
  if (atIndex < 1 || atIndex === email.length - 1) return false;
  
  // Check for multiple @ symbols
  if (email.indexOf("@", atIndex + 1) !== -1) return false;
  
  // Split into local and domain parts
  const local = email.substring(0, atIndex);
  const domain = email.substring(atIndex + 1);
  
  // Domain must have at least one dot and no consecutive dots
  const dotIndex = domain.indexOf(".");
  if (dotIndex < 1 || dotIndex === domain.length - 1) return false;
  if (domain.includes("..")) return false;
  
  // No spaces allowed
  if (local.includes(" ") || domain.includes(" ")) return false;
  
  return true;
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

/** ====================================================
 * Formats a credit card number with spaces (e.g., "1234 5678 9012 3456")
 * @param value - The card number string to format
 * @returns {string} formatted card number with spaces
 *  =====================================================
 */
export function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = matches?.[0] || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  return parts.length ? parts.join(" ") : value;
}

/** ====================================================
 * Formats expiry date string (e.g., "MM/YY")
 * @param value - The expiry string to format
 * @returns {string} formatted expiry date
 *  =====================================================
 */
export function formatExpiry(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  if (v.length >= 2) {
    return v.substring(0, 2) + "/" + v.substring(2, 4);
  }
  return v;
}
