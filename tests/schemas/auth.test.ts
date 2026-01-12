/**
 * Auth Schemas Tests
 *
 * Tests for authentication-related validation schemas.
 * Validates boundary conditions, error messages, and type coercion.
 *
 * Priority: HIGH (90%+ coverage required)
 */

import { describe, it, expect } from "bun:test";
import {
  EmailSchema,
  PasswordSchema,
  PasswordInputSchema,
  PASSWORD_POLICY,
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
  ChangePasswordSchema,
} from "../../src/schemas";

describe("EmailSchema", () => {
  describe("Valid emails", () => {
    const validEmails = [
      "user@example.com",
      "john.doe@company.co.uk",
      "test+tag@domain.io",
      "valid_email@subdomain.example.com",
    ];

    validEmails.forEach((email) => {
      it(`should accept valid email: ${email}`, () => {
        expect(() => EmailSchema.parse(email)).not.toThrow();
      });
    });
  });

  describe("Invalid emails", () => {
    const invalidEmails = [
      "invalid",
      "@example.com",
      "user@",
      "user @example.com",
      "",
    ];

    invalidEmails.forEach((email) => {
      it(`should reject invalid email: ${email}`, () => {
        expect(() => EmailSchema.parse(email)).toThrow();
      });
    });
  });

  describe("Transformations", () => {
    it("should trim whitespace", () => {
      const result = EmailSchema.parse("  user@example.com  ");
      expect(result).toBe("user@example.com");
    });

    it("should convert to lowercase", () => {
      const result = EmailSchema.parse("USER@EXAMPLE.COM");
      expect(result).toBe("user@example.com");
    });

    it("should apply both transformations", () => {
      const result = EmailSchema.parse("  USER@EXAMPLE.COM  ");
      expect(result).toBe("user@example.com");
    });
  });

  describe("Length validation", () => {
    it("should reject emails shorter than 5 characters", () => {
      expect(() => EmailSchema.parse("a@b")).toThrow(/at least 5/i);
    });

    it("should reject emails longer than 255 characters", () => {
      const longEmail = "a".repeat(250) + "@b.com";
      expect(() => EmailSchema.parse(longEmail)).toThrow(/255/i);
    });
  });
});

describe("PasswordSchema", () => {
  describe("Length validation", () => {
    it(`should reject password shorter than ${PASSWORD_POLICY.minLength}`, () => {
      const shortPassword = "aA1@" + "x".repeat(PASSWORD_POLICY.minLength - 5);
      expect(() => PasswordSchema.parse(shortPassword)).toThrow(
        new RegExp(`${PASSWORD_POLICY.minLength}`)
      );
    });

    it(`should accept password with exactly ${PASSWORD_POLICY.minLength} characters`, () => {
      const password = "aA1@" + "x".repeat(PASSWORD_POLICY.minLength - 4);
      expect(() => PasswordSchema.parse(password)).not.toThrow();
    });

    it(`should reject password longer than ${PASSWORD_POLICY.maxLength}`, () => {
      const longPassword = "aA1@" + "x".repeat(PASSWORD_POLICY.maxLength);
      expect(() => PasswordSchema.parse(longPassword)).toThrow(
        new RegExp(`${PASSWORD_POLICY.maxLength}`)
      );
    });
  });

  describe("Character requirements", () => {
    it("should reject password without uppercase letter", () => {
      expect(() => PasswordSchema.parse("aa1@aaaa")).toThrow(/uppercase/i);
    });

    it("should reject password without lowercase letter", () => {
      expect(() => PasswordSchema.parse("AA1@AAAA")).toThrow(/lowercase/i);
    });

    it("should reject password without number", () => {
      expect(() => PasswordSchema.parse("aAa@aaaa")).toThrow(/number/i);
    });

    it("should reject password without special character", () => {
      expect(() => PasswordSchema.parse("aA1aaaaa")).toThrow(/special/i);
    });
  });

  describe("Valid passwords", () => {
    const validPasswords = [
      "aA1@aaaa",
      "P@ssw0rd",
      "MyP@ss123",
      "C0mpl3x!Pass",
      "S3cur3$Pass",
      "V@lid123Pass",
    ];

    validPasswords.forEach((password) => {
      it(`should accept valid password: ${password}`, () => {
        expect(() => PasswordSchema.parse(password)).not.toThrow();
      });
    });
  });
});

describe("PasswordInputSchema", () => {
  it("should accept any non-empty password", () => {
    const passwords = ["simple", "12345", "P@ssw0rd"];
    passwords.forEach((password) => {
      expect(() => PasswordInputSchema.parse(password)).not.toThrow();
    });
  });

  it("should reject empty password", () => {
    expect(() => PasswordInputSchema.parse("")).toThrow(/required/i);
  });

  it(`should respect max length of ${PASSWORD_POLICY.maxLength}`, () => {
    const longPassword = "x".repeat(PASSWORD_POLICY.maxLength + 1);
    expect(() => PasswordInputSchema.parse(longPassword)).toThrow(
      new RegExp(`${PASSWORD_POLICY.maxLength}`)
    );
  });
});

describe("LoginCredentialsSchema", () => {
  it("should accept valid login credentials", () => {
    const credentials = {
      email: "user@example.com",
      password: "anypassword",
    };

    expect(() => LoginCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should reject invalid email", () => {
    const credentials = {
      email: "invalid-email",
      password: "anypassword",
    };

    expect(() => LoginCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should reject empty password", () => {
    const credentials = {
      email: "user@example.com",
      password: "",
    };

    expect(() => LoginCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should transform email (trim + lowercase)", () => {
    const credentials = {
      email: "  USER@EXAMPLE.COM  ",
      password: "anypassword",
    };

    const result = LoginCredentialsSchema.parse(credentials);
    expect(result.email).toBe("user@example.com");
  });
});

describe("RegisterCredentialsSchema", () => {
  it("should accept valid registration credentials", () => {
    const credentials = {
      email: "user@example.com",
      password: "P@ssw0rd123",
      name: "John Doe",
    };

    expect(() => RegisterCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should accept registration without name (optional)", () => {
    const credentials = {
      email: "user@example.com",
      password: "P@ssw0rd123",
    };

    expect(() => RegisterCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should enforce strict password validation", () => {
    const credentials = {
      email: "user@example.com",
      password: "weak",
    };

    expect(() => RegisterCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should trim name", () => {
    const credentials = {
      email: "user@example.com",
      password: "P@ssw0rd123",
      name: "  John Doe  ",
    };

    const result = RegisterCredentialsSchema.parse(credentials);
    expect(result.name).toBe("John Doe");
  });

  it("should reject name shorter than 2 characters", () => {
    const credentials = {
      email: "user@example.com",
      password: "P@ssw0rd123",
      name: "J",
    };

    expect(() => RegisterCredentialsSchema.parse(credentials)).toThrow(
      /at least 2/i
    );
  });
});

describe("ChangePasswordSchema", () => {
  it("should accept valid password change request", () => {
    const request = {
      currentPassword: "oldpassword",
      newPassword: "N3wP@ssw0rd",
    };

    expect(() => ChangePasswordSchema.parse(request)).not.toThrow();
  });

  it("should enforce strict validation on new password", () => {
    const request = {
      currentPassword: "oldpassword",
      newPassword: "weak",
    };

    expect(() => ChangePasswordSchema.parse(request)).toThrow();
  });

  it("should allow any current password (lenient)", () => {
    const request = {
      currentPassword: "any",
      newPassword: "N3wP@ssw0rd",
    };

    expect(() => ChangePasswordSchema.parse(request)).not.toThrow();
  });

  it("should reject empty current password", () => {
    const request = {
      currentPassword: "",
      newPassword: "N3wP@ssw0rd",
    };

    expect(() => ChangePasswordSchema.parse(request)).toThrow(/required/i);
  });
});
