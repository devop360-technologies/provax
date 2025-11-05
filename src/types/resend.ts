export interface ResendEmailOptions {
  subject: string;
  html: string;
  to: string | string[];
  from?: string;
  replyTo?: string;
}

export interface ResendEmailResult {
  success: boolean;
  data?: any;
  error?: string;
}
