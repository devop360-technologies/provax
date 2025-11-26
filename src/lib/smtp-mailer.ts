import nodemailer from 'nodemailer';
import { appConfig } from '../config';

export interface SmtpEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface SmtpEmailResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Send email using SMTP (Brevo/Sendinblue)
 */
export async function sendSmtpEmail({
  to,
  subject,
  html,
  from = process.env.MAIL_FROM || process.env.MAIL_USERNAME,
  replyTo
}: SmtpEmailOptions): Promise<SmtpEmailResult> {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const recipients = Array.isArray(to) ? to.join(', ') : to;

    const mailOptions = {
      from: from || process.env.MAIL_USERNAME,
      to: recipients,
      subject,
      html,
      ...(replyTo && { replyTo })
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${recipients}`, {
      messageId: info.messageId,
      subject,
      timestamp: new Date().toISOString()
    });

    return { success: true, data: info };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('SMTP email error:', error);

    return {
      success: false,
      error: errorMessage
    };
  }
}
