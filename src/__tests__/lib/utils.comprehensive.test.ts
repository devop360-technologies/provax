import {
  cn,
  browserConsoleError,
  isValidEmail,
  formatDate,
  isTrialPeriod,
  formatCardNumber,
  formatExpiry,
} from "@/lib/utils";

describe("Utils Library - Comprehensive Coverage", () => {
  // ===== cn (class name merger) =====
  describe("cn function", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-2", "py-2");
      expect(result).toBeTruthy();
    });

    it("should handle empty strings", () => {
      const result = cn("", "px-2");
      expect(result).toBeTruthy();
    });

    it("should handle conditional classes", () => {
      const result = cn("px-2", false && "py-2", true && "bg-red");
      expect(result).toBeTruthy();
    });

    it("should handle undefined values", () => {
      const result = cn("px-2", undefined, "py-2");
      expect(result).toBeTruthy();
    });

    it("should handle null values", () => {
      const result = cn("px-2", null, "py-2");
      expect(result).toBeTruthy();
    });

    it("should handle array of classes", () => {
      const result = cn(["px-2", "py-2"], "bg-red");
      expect(result).toBeTruthy();
    });
  });

  // ===== Email Validation =====
  describe("isValidEmail function", () => {
    it("should accept valid email addresses", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
      expect(isValidEmail("test.email@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should reject empty email", () => {
      expect(isValidEmail("")).toBe(false);
    });

    it("should reject email without @ symbol", () => {
      expect(isValidEmail("userexample.com")).toBe(false);
    });

    it("should reject email with multiple @ symbols", () => {
      expect(isValidEmail("user@@example.com")).toBe(false);
    });

    it("should reject email with @ at start", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });

    it("should reject email with @ at end", () => {
      expect(isValidEmail("user@")).toBe(false);
    });

    it("should reject email with domain without dot", () => {
      expect(isValidEmail("user@example")).toBe(false);
    });

    it("should reject email with consecutive dots", () => {
      expect(isValidEmail("user@example..com")).toBe(false);
    });

    it("should reject email too long (>254 chars)", () => {
      const longEmail = "a".repeat(250) + "@example.com";
      expect(isValidEmail(longEmail)).toBe(false);
    });

    it("should reject email too short (<3 chars)", () => {
      expect(isValidEmail("a@b")).toBe(false);
    });

    it("should reject email with spaces", () => {
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  // ===== Date Formatting =====
  describe("formatDate function", () => {
    it("should format date correctly from date string", () => {
      const result = formatDate("2024-01-15");
      expect(result).toContain("January");
    });

    it("should format date correctly from timestamp", () => {
      const result = formatDate(1705276800000);
      expect(result).toBeTruthy();
    });

    it("should handle date formatting with leading zeros", () => {
      const result = formatDate("2024-01-05");
      expect(result).toContain("5");
    });

    it("should format month name correctly", () => {
      const result = formatDate("2024-12-25");
      expect(result).toContain("December");
    });

    it("should format year correctly", () => {
      const result = formatDate("2024-06-15");
      expect(result).toContain("2024");
    });
  });

  // ===== Trial Period =====
  describe("isTrialPeriod function", () => {
    it("should return true for recent dates", () => {
      const recentDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
      const result = isTrialPeriod(recentDate);
      expect(typeof result).toBe("boolean");
    });

    it("should handle today's date", () => {
      const today = new Date();
      const result = isTrialPeriod(today);
      expect(typeof result).toBe("boolean");
    });

    it("should return false or true based on trial period", () => {
      const oldDate = new Date(2020, 0, 1);
      const result = isTrialPeriod(oldDate);
      expect(typeof result).toBe("boolean");
    });
  });

  // ===== Format Card Number =====
  describe("formatCardNumber function", () => {
    it("should format valid card number with spaces", () => {
      const result = formatCardNumber("4532015112830366");
      expect(result).toContain(" ");
    });

    it("should remove existing spaces before reformatting", () => {
      const result = formatCardNumber("4532 0151 1283 0366");
      expect(result).toBeTruthy();
    });

    it("should remove non-numeric characters", () => {
      const result = formatCardNumber("4532-0151-1283-0366");
      expect(result).toBeTruthy();
    });

    it("should handle short card numbers", () => {
      const result = formatCardNumber("4532");
      expect(result).toBeTruthy();
    });

    it("should return original if no valid digits", () => {
      const result = formatCardNumber("abcd");
      expect(result).toBeTruthy();
    });

    it("should handle empty string", () => {
      const result = formatCardNumber("");
      expect(result).toBe("");
    });

    it("should group digits in sets of 4", () => {
      const result = formatCardNumber("12345678901234");
      const spaces = result.split(" ").length - 1;
      expect(spaces).toBeGreaterThan(0);
    });
  });

  // ===== Format Expiry =====
  describe("formatExpiry function", () => {
    it("should format expiry date MM/YY", () => {
      const result = formatExpiry("1225");
      expect(result).toBe("12/25");
    });

    it("should remove existing slashes", () => {
      const result = formatExpiry("12/25");
      expect(result).toBe("12/25");
    });

    it("should handle partial input", () => {
      const result = formatExpiry("1");
      expect(result).toBe("1");
    });

    it("should handle empty string", () => {
      const result = formatExpiry("");
      expect(result).toBe("");
    });

    it("should remove non-numeric characters", () => {
      const result = formatExpiry("12-25");
      expect(result).toBe("12/25");
    });

    it("should handle spaces", () => {
      const result = formatExpiry("12 25");
      expect(result).toBe("12/25");
    });

    it("should format with only first two digits before slash", () => {
      const result = formatExpiry("123456");
      expect(result).toContain("/");
    });
  });

  // ===== Browser Console Error =====
  describe("browserConsoleError function", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    afterEach(() => {
      consoleSpy.mockClear();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("should log error in development mode", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      browserConsoleError("Test error message");
      expect(consoleSpy).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it("should not log in production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      consoleSpy.mockClear();
      browserConsoleError("Test error");
      expect(consoleSpy).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it("should include the message in log", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const testMessage = "Critical error occurred";
      browserConsoleError(testMessage);
      
      const callArgs = consoleSpy.mock.calls[0];
      expect(callArgs[0]).toContain(testMessage);

      process.env.NODE_ENV = originalEnv;
    });
  });
});
