import { render } from "@react-email/components";
import React, { createElement } from "react";
import { Resend } from "resend";

import { appConfig } from "../config";
import { browserConsoleError, isValidEmail } from "./utils";

import { ResendEmailOptions, ResendEmailResult } from "@/types/resend";

/** ============================================
 * Initialize Resend with API key
 * ============================================
 */
const resend = new Resend(appConfig.resend.resendKey);

if (!appConfig.resend.resendKey) {
  browserConsoleError("AUTH_RESEND_KEY is required to send emails via Resend.");
}

/** ==============================================================================================
 * Sends an email using Resend
 * @async
 * @param {ResendEmailProps} options - Email configuration options
 * @param {string|string[]} options.to - The recipient's email address(es)
 * @param {string} options.subject - The subject of the email
 * @param {string} options.html - The HTML content of the email
 * @param {string} [options.from] - Optional from email address (overrides default)
 * @param {string} [options.replyTo] - Optional reply-to email address
 * @returns {Promise<ResendEmailResult>} A Promise that resolves to an object with success status and optional data/error
 *
 * @example
 * ```typescript
 * const result = await sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome!",
 *   html: "<h1>Welcome to our platform</h1>",
 *   replyTo: "support@example.com"
 * });
 *
 * if (result.success) {
 *   console.log("Email sent successfully:", result.data);
 * } else {
 *   console.error("Failed to send email:", result.error);
 * }
 * ```
 *  ==============================================================================================
 */
export async function sendEmail({
  to,
  html,
  subject,
  replyTo,
  from = appConfig.resend.fromNoReply
}: ResendEmailOptions): Promise<ResendEmailResult> {
  try {
    // Validate email format for single recipient
    if (typeof to === "string" && !isValidEmail(to)) {
      return {
        success: false,
        error: `Invalid email format: ${to}`
      };
    }

    // Validate email format for multiple recipients
    if (Array.isArray(to) && to.some((email) => !isValidEmail(email))) {
      return {
        success: false,
        error: `Invalid email format: ${to.join(", ")}`
      };
    }

    // Validate replyTo email if provided
    if (replyTo && !isValidEmail(replyTo)) {
      return {
        success: false,
        error: `Invalid reply-to email format: ${replyTo}`
      };
    }

    const emailPayload = {
      from,
      html,
      subject: subject.trim(),
      to: Array.isArray(to) ? to : [to],
      ...(replyTo && { replyTo })
    };

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("Resend API error:", error);
      }
      return {
        success: false,
        error: error.message || "Failed to send email via Resend API"
      };
    }

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`✅ Email sent successfully to ${Array.isArray(to) ? to.join(", ") : to}`, {
        id: data?.id,
        subject: subject,
        timestamp: new Date().toISOString()
      });
    }

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Unexpected error sending email:", error);
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**  ==============================================================================================
 * Renders a React email component to HTML
 *
 * @template Props - The type of props expected by the component
 * @param {React.FunctionComponent<Props> | React.ComponentClass<Props>} Component - The React component to render
 * @param {Props} props The props to pass to the component
 * @returns A Promise that resolves to the rendered HTML
 *
 * @example
 * ```typescript
 * const html = await renderEmail(WelcomeEmail, { userName: "John" });
 * ```
 *  ==============================================================================================
 */
export async function renderEmail<Props extends object>(
  Component: React.FunctionComponent<Props> | React.ComponentClass<Props>,
  props: Props
): Promise<string> {
  return await render(createElement(Component, props));
}
