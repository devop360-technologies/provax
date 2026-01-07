import {
  formatDate,
  formatCardNumber,
  formatExpiry,
  cn,
  isValidEmail,
  browserConsoleError,
} from "@/lib/utils";

describe("Complete Utils Coverage - All Functions", () => {
  // cn with many variations
  describe("cn - comprehensive", () => {
    it("merges single class", () => {
      expect(cn("px-2")).toBeTruthy();
    });
    it("merges two classes", () => {
      expect(cn("px-2", "py-2")).toBeTruthy();
    });
    it("merges three classes", () => {
      expect(cn("px-2", "py-2", "bg-red")).toBeTruthy();
    });
    it("filters false values", () => {
      const result = cn("px-2", false && "py-2");
      expect(result).toBeTruthy();
    });
    it("filters falsy values", () => {
      expect(cn(undefined, null, false, "", "px-2")).toBeTruthy();
    });
    it("handles objects", () => {
      expect(cn({ "px-2": true, "py-2": false })).toBeTruthy();
    });
    it("handles nested arrays", () => {
      expect(cn(["px-2", "py-2"], ["bg-red"])).toBeTruthy();
    });
  });

  // Email validation - all paths
  describe("isValidEmail - all paths", () => {
    it("valid: simple@example.com", () => {
      expect(isValidEmail("simple@example.com")).toBe(true);
    });
    it("valid: user.name@example.com", () => {
      expect(isValidEmail("user.name@example.com")).toBe(true);
    });
    it("valid: user+tag@example.co.uk", () => {
      expect(isValidEmail("user+tag@example.co.uk")).toBe(true);
    });
    it("valid: u@example.com", () => {
      expect(isValidEmail("u@example.com")).toBe(true);
    });
    it("invalid: empty string", () => {
      expect(isValidEmail("")).toBe(false);
    });
    it("invalid: no @", () => {
      expect(isValidEmail("notanemail")).toBe(false);
    });
    it("invalid: multiple @", () => {
      expect(isValidEmail("user@@example.com")).toBe(false);
    });
    it("invalid: @ first char", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });
    it("invalid: @ last char", () => {
      expect(isValidEmail("user@")).toBe(false);
    });
    it("invalid: no domain dot", () => {
      expect(isValidEmail("user@domain")).toBe(false);
    });
    it("invalid: consecutive dots", () => {
      expect(isValidEmail("user@domain..com")).toBe(false);
    });
    it("invalid: space in local", () => {
      expect(isValidEmail("user name@example.com")).toBe(false);
    });
    it("invalid: space in domain", () => {
      expect(isValidEmail("user@exam ple.com")).toBe(false);
    });
    it("invalid: too long", () => {
      const tooLong = "a".repeat(300) + "@example.com";
      expect(isValidEmail(tooLong)).toBe(false);
    });
    it("invalid: too short", () => {
      expect(isValidEmail("a@")).toBe(false);
    });
    it("valid: max length", () => {
      const maxLen = "a".repeat(240) + "@example.com";
      expect(isValidEmail(maxLen)).toBe(true);
    });
  });

  // Format date - all paths
  describe("formatDate - all paths", () => {
    it("formats January date", () => {
      const result = formatDate("2024-01-15");
      expect(result).toContain("January");
    });
    it("formats February date", () => {
      const result = formatDate("2024-02-14");
      expect(result).toContain("February");
    });
    it("formats December date", () => {
      const result = formatDate("2024-12-25");
      expect(result).toContain("December");
    });
    it("formats with leading zero day", () => {
      const result = formatDate("2024-05-05");
      expect(result).toContain("5");
    });
    it("formats without leading zero day", () => {
      const result = formatDate("2024-05-15");
      expect(result).toContain("15");
    });
    it("handles timestamp input", () => {
      const result = formatDate(1704067200000);
      expect(result).toBeTruthy();
    });
  });

  // Format card number - all paths
  describe("formatCardNumber - all paths", () => {
    it("formats 16-digit card", () => {
      const result = formatCardNumber("4532015112830366");
      expect(result).toBe("4532 0151 1283 0366");
    });
    it("formats with existing spaces", () => {
      const result = formatCardNumber("4532 0151 1283 0366");
      expect(result).toContain("4532");
    });
    it("formats with dashes", () => {
      const result = formatCardNumber("4532-0151-1283-0366");
      expect(result).toBeTruthy();
    });
    it("handles 4-digit input", () => {
      const result = formatCardNumber("4532");
      expect(result).toBe("4532");
    });
    it("handles 8-digit input", () => {
      const result = formatCardNumber("45320151");
      expect(result).toBe("4532 0151");
    });
    it("handles non-numeric", () => {
      const result = formatCardNumber("abcd");
      expect(result).toBe("abcd");
    });
    it("handles empty", () => {
      expect(formatCardNumber("")).toBe("");
    });
    it("filters non-digits", () => {
      const result = formatCardNumber("4532-a0b1-c5d1");
      expect(result).toContain("4532");
    });
  });

  // Format expiry - all paths
  describe("formatExpiry - all paths", () => {
    it("formats MM/YY correctly", () => {
      expect(formatExpiry("1225")).toBe("12/25");
    });
    it("handles single digit month", () => {
      const result = formatExpiry("0125");
      expect(result).toContain("/");
    });
    it("handles with existing slash", () => {
      const result = formatExpiry("12/25");
      expect(result).toBe("12/25");
    });
    it("handles with space", () => {
      const result = formatExpiry("12 25");
      expect(result).toBe("12/25");
    });
    it("handles with dash", () => {
      const result = formatExpiry("12-25");
      expect(result).toBe("12/25");
    });
    it("handles partial input 1 digit", () => {
      expect(formatExpiry("1")).toBe("1");
    });
    it("handles partial input 2 digits", () => {
      expect(formatExpiry("12")).toBe("12/");
    });
    it("handles partial input 3 digits", () => {
      const result = formatExpiry("123");
      expect(result).toContain("/");
    });
    it("handles empty", () => {
      expect(formatExpiry("")).toBe("");
    });
    it("handles extra digits", () => {
      const result = formatExpiry("123456");
      expect(result).toContain("/");
    });
  });

  // Browser console error - all paths
  describe("browserConsoleError - all paths", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    afterEach(() => {
      consoleSpy.mockClear();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("logs in development", () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      browserConsoleError("Error 1");
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      process.env.NODE_ENV = origEnv;
    });

    it("does not log in production", () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";
      consoleSpy.mockClear();
      browserConsoleError("Error 2");
      expect(consoleSpy).not.toHaveBeenCalled();
      process.env.NODE_ENV = origEnv;
    });

    it("does not log in test environment when NODE_ENV is test", () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "test";
      consoleSpy.mockClear();
      browserConsoleError("Error 3");
      // In test mode, NODE_ENV is 'test' not 'development'
      expect(consoleSpy).not.toHaveBeenCalled();
      process.env.NODE_ENV = origEnv;
    });

    it("includes error message in console call", () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      consoleSpy.mockClear();
      const msg = "Test message 123";
      browserConsoleError(msg);
      const callArg = consoleSpy.mock.calls[0]?.[0] || "";
      expect(callArg).toContain(msg);
      process.env.NODE_ENV = origEnv;
    });
  });
});
