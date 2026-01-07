import { formatDate, formatCardNumber, formatExpiry, cn, isValidEmail, browserConsoleError } from "@/lib/utils";

describe("Utils Coverage", () => {
  describe("cn", () => {
    it.each([
      [["px-2"], true],
      [["px-2", "py-2"], true],
      [["px-2", false && "py-2"], true],
      [[undefined, null, false, "", "px-2"], true],
      [[{ "px-2": true, "py-2": false }], true],
      [[["px-2", "py-2"], ["bg-red"]], true],
    ])("cn(%j) is truthy", (args, expected) => {
      expect(Boolean(cn(...args))).toBe(expected);
    });
  });

  describe("isValidEmail", () => {
    it.each([
      ["simple@example.com", true],
      ["user.name@example.com", true],
      ["user+tag@example.co.uk", true],
      ["u@example.com", true],
      ["a".repeat(240) + "@example.com", true],
      ["", false],
      ["notanemail", false],
      ["user@@example.com", false],
      ["@example.com", false],
      ["user@", false],
      ["user@domain", false],
      ["user@domain..com", false],
      ["user name@example.com", false],
      ["user@exam ple.com", false],
      ["a".repeat(300) + "@example.com", false],
      ["a@", false],
    ])("isValidEmail(%s) = %s", (email, expected) => {
      expect(isValidEmail(email)).toBe(expected);
    });
  });

  describe("formatDate", () => {
    it.each([
      ["2024-01-15", "January"],
      ["2024-02-14", "February"],
      ["2024-12-25", "December"],
      ["2024-05-05", "5"],
      ["2024-05-15", "15"],
    ])("formatDate(%s) contains %s", (input, expected) => {
      expect(formatDate(input)).toContain(expected);
    });

    it("handles timestamp", () => expect(formatDate(1704067200000)).toBeTruthy());
  });

  describe("formatCardNumber", () => {
    it.each([
      ["4532015112830366", "4532 0151 1283 0366"],
      ["4532", "4532"],
      ["45320151", "4532 0151"],
      ["", ""],
      ["abcd", "abcd"],
    ])("formatCardNumber(%s) = %s", (input, expected) => {
      expect(formatCardNumber(input)).toBe(expected);
    });

    it("handles cards with spaces/dashes", () => {
      expect(formatCardNumber("4532 0151 1283 0366")).toContain("4532");
      expect(formatCardNumber("4532-0151-1283-0366")).toBeTruthy();
    });
  });

  describe("formatExpiry", () => {
    it.each([
      ["1225", "12/25"],
      ["12/25", "12/25"],
      ["12 25", "12/25"],
      ["12-25", "12/25"],
      ["1", "1"],
      ["12", "12/"],
      ["", ""],
    ])("formatExpiry(%s) = %s", (input, expected) => {
      expect(formatExpiry(input)).toBe(expected);
    });

    it("handles multi-digit inputs with slash", () => {
      expect(formatExpiry("0125")).toContain("/");
      expect(formatExpiry("123")).toContain("/");
      expect(formatExpiry("123456")).toContain("/");
    });
  });

  describe("browserConsoleError", () => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    afterEach(() => spy.mockClear());
    afterAll(() => spy.mockRestore());

    it("logs in development", () => {
      const orig = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      browserConsoleError("Error");
      expect(spy).toHaveBeenCalledTimes(1);
      process.env.NODE_ENV = orig;
    });

    it("does not log in production/test", () => {
      const orig = process.env.NODE_ENV;
      ["production", "test"].forEach((env) => {
        process.env.NODE_ENV = env;
        spy.mockClear();
        browserConsoleError("Error");
        expect(spy).not.toHaveBeenCalled();
      });
      process.env.NODE_ENV = orig;
    });
  });
});
