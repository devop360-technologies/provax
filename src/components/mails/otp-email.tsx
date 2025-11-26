import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
} from "@react-email/components";

import { EmailLayout } from "./email-layout";

interface OtpEmailProps {
  otp: string;
  name: string;
  message: string;
  expiryMinutes: number;
}

export function OtpEmail({ otp, name, message, expiryMinutes }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{message}</Preview>
      <Body style={main}>
        <EmailLayout previewText={`Your verification code is ${otp}`}>
          <Container style={container}>
            <Heading style={heading}>Hello {name}!</Heading>
            
            <Text style={text}>{message}</Text>

            <Section style={otpContainer}>
              <Text style={otpText}>{otp}</Text>
            </Section>

            <Text style={text}>
              This code will expire in <strong>{expiryMinutes} minutes</strong>.
            </Text>

            <Text style={text}>
              If you didn't request this code, you can safely ignore this email.
            </Text>

            <Text style={footer}>
              Thanks,
              <br />
              The PROVAX Team
            </Text>
          </Container>
        </EmailLayout>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px"
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  padding: "17px 0 0"
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  margin: "16px 0"
};

const otpContainer = {
  background: "#f4f4f4",
  borderRadius: "8px",
  margin: "24px 0",
  padding: "24px",
  textAlign: "center" as const
};

const otpText = {
  fontSize: "42px",
  fontWeight: "700",
  letterSpacing: "8px",
  color: "#2d3561",
  margin: "0",
  fontFamily: "monospace"
};

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666",
  marginTop: "32px"
};
