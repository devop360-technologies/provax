export const appConfig = {
  /** ============================================
   * App name used for branding and SEO
   * ============================================
   */
  appName: "PROVAX",

  /** ============================================
   * Short description for SEO tags (can be overwritten)
   * ============================================
   */
  appTagline: "AI-Powered Vehicle Certification & Service Bidding",

  /** ============================================
   * Detailed app description for SEO purposes
   * ============================================
   */
  appDescription:
    "PROVAX - AI-Powered Vehicle Certification & Service Bidding Platform. Certify, sell, and service vehicles with transparency and trust. Automated AI inspections, instant reports with QR codes, and a verified bidding network for repairs.",

  /** ============================================
   * Domain name without protocol or trailing slash
   * ============================================
   */
  domainName: "https://provax.com",

  /** ============================================
   * Full URL based on environment
   * ============================================
   */
  domainUrl:
    process.env.NODE_ENV === "production" ? "https://provax.com" : "http://localhost:3000",

  /** ============================================
   * Color configuration
   * @property {string} primary - Primary color
   * ============================================
   */
  colors: {
    primary: "#8c5cff"
  },

  /** ============================================
   * Authentication route configuration
   * @property {string} login - Login route
   * @property {string} signUp - Sign up route
   * @property {string} afterSignout - Route after sign out
   * @property {string} afterLogin - Route after login
   * @property {number} maxAge - Maximum age of the session in seconds
   * @property {string} secret - Secret for signing the session
   * @property {string} newUser - Route for new users after first-time signup
   * ============================================
   */
  auth: {
    login: "/login",
    signUp: "/register",
    afterSignout: "/",
    afterLogin: "/dashboard",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.AUTH_SECRET,
    newUser: "/dashboard/billing"
  },

  /** ============================================
   * Email configuration using Resend
   * @property {string} subdomain - Subdomain for sending emails (remove if not applicable)
   * @property {string} fromNoReply - 'From' field for magic login links
   * @property {string} fromAdmin - 'From' field for other emails (e.g., abandoned carts, updates)
   * @property {string} supportEmail - Support email shown to customers (leave empty if not needed)
   * @property {string} resendKey - Resend API key
   * ============================================
   */
  resend: {
    subdomain: "resend",
    fromNoReply: `PROVAX <noreply@resend.provax.com>`,
    fromAdmin: `PROVAX Team <team@resend.provax.com>`,
    supportEmail: "support@provax.com",
    resendKey: process.env.AUTH_RESEND_KEY
  },

  /** ============================================
   * Stripe payment configuration
   * @property {number} trailPeriod - Trial period in milliseconds (30 days). Change 30 to according to your days.
   * @property {string} billingRoute - Route for billing management
   * @property {object[]} plans - Payment plan configurations
   * @property {string} plans[].priceId - Price ID based on environment
   * @property {number} plans[].price - Price of the plan
   * @property {number} plans[].anchorPrice - Anchor price of the plan
   * @property {string} plans[].title - Title of the plan
   * @property {string} plans[].mode - Payment mode (payment or subscription)
   * ============================================
   */
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    trailPeriod: 7 * 24 * 60 * 60 * 1000, // 7 days
    billingRoute: "/dashboard/billing",
    plans: [
      {
        price: 99,
        title: "Starter",
        mode: "subscription" as "payment" | "subscription",
        priceId: process.env.STRIPE_PRICE_STARTER ?? ""
      },
      {
        price: 149,
        title: "Pro",
        mode: "subscription" as "payment" | "subscription",
        priceId: process.env.STRIPE_PRICE_PRO ?? ""
      },
      {
        price: 499,
        title: "Lifetime",
        mode: "payment" as "payment" | "subscription",
        priceId: process.env.STRIPE_PRICE_LIFETIME ?? ""
      }
    ]
  },

  /** ============================================
   * S3 configuration
   * ============================================
   */
  s3: {
    region: process.env.AWS_S3_REGION,
    accessKey: process.env.AWS_S3_ACCESS_KEY,
    secretKey: process.env.AWS_S3_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME
  },

  /** ============================================
   * Google Analytics configuration
   * ============================================
   */
  googleAnalytics: {
    id: process.env.NEXT_PUBLIC_GA_ID ?? "",
    consent: {
      storage: "localStorage",
      cookieName: "cookie-consent"
    }
  }
};
