/**
 * Personal Info Schema Tests
 */

import { describe, it, expect } from "bun:test";
import {
 EmailSchema,
 FullNameSchema,
 PhoneSchema,
 PersonalInfoSchema,
} from "../personal-info.schema";

describe("EmailSchema", () => {
 describe("valid emails", () => {
  const validEmails = [
   "user@example.com",
   "john.doe@company.co.uk",
   "test+filter@gmail.com",
   "name_123@domain.org",
   "a@b.co",
  ];

  validEmails.forEach((email) => {
   it(`should accept ${email}`, () => {
    expect(() => EmailSchema.parse(email)).not.toThrow();
   });
  });

  it("should normalize to lowercase", () => {
   const result = EmailSchema.parse("User@Example.COM");
   expect(result).toBe("user@example.com");
  });

  it("should trim whitespace", () => {
   const result = EmailSchema.parse("  user@example.com  ");
   expect(result).toBe("user@example.com");
  });
 });

 describe("invalid emails", () => {
  const invalidEmails = [
   { value: "", error: "at least 5" },
   { value: "a@", error: "at least 5" },
   { value: "double@@domain.com", error: "Invalid email" },
   { value: "x".repeat(255) + "@test.com", error: "cannot exceed 254" },
  ];

  invalidEmails.forEach(({ value, error }) => {
   it(`should reject "${value}" (${error})`, () => {
    const result = EmailSchema.safeParse(value);
    expect(result.success).toBe(false);
    if (!result.success) {
     expect(result.error.issues[0].message).toContain(error);
    }
   });
  });
 });
});

describe("FullNameSchema", () => {
 describe("valid names", () => {
  const validNames = [
   "John Doe",
   "María García",
   "François O'Brien",
   "Jean-Claude Van Damme",
   "李明",
   "Nguyễn Văn A",
  ];

  validNames.forEach((name) => {
   it(`should accept ${name}`, () => {
    expect(() => FullNameSchema.parse(name)).not.toThrow();
   });
  });

  it("should trim whitespace", () => {
   const result = FullNameSchema.parse("  John Doe  ");
   expect(result).toBe("John Doe");
  });
 });

 describe("invalid names", () => {
  const invalidNames = [
   { value: "A", error: "at least 2" },
   { value: "x".repeat(101), error: "cannot exceed 100" },
   { value: "John123", error: "can only contain" },
   { value: "test@user", error: "can only contain" },
  ];

  invalidNames.forEach(({ value, error }) => {
   it(`should reject "${value.substring(0, 20)}..." (${error})`, () => {
    const result = FullNameSchema.safeParse(value);
    expect(result.success).toBe(false);
    if (!result.success) {
     expect(result.error.issues[0].message).toContain(error);
    }
   });
  });
 });
});

describe("PhoneSchema", () => {
 describe("valid phones", () => {
  const validPhones = [
   "+1 (555) 123-4567",
   "+44 20 7946 0958",
   "555-123-4567",
   "+55 11 98765-4321",
   "1234567890",
  ];

  validPhones.forEach((phone) => {
   it(`should accept ${phone}`, () => {
    expect(() => PhoneSchema.parse(phone)).not.toThrow();
   });
  });

  it("should accept undefined (optional)", () => {
   expect(() => PhoneSchema.parse(undefined)).not.toThrow();
  });
 });

 describe("invalid phones", () => {
  const invalidPhones = [
   { value: "123", error: "at least 10" },
   { value: "x".repeat(21), error: "cannot exceed 20" },
   { value: "not-a-phone", error: "Invalid phone" },
  ];

  invalidPhones.forEach(({ value, error }) => {
   it(`should reject "${value}" (${error})`, () => {
    const result = PhoneSchema.safeParse(value);
    expect(result.success).toBe(false);
    if (!result.success) {
     expect(result.error.issues[0].message).toContain(error);
    }
   });
  });
 });
});

describe("PersonalInfoSchema", () => {
 it("should validate complete personal info", () => {
  const validData = {
   fullName: "John Doe",
   email: "john@example.com",
   phone: "+1-555-123-4567",
   location: "San Francisco, CA",
  };

  expect(() => PersonalInfoSchema.parse(validData)).not.toThrow();
 });

 it("should accept optional fields as undefined", () => {
  const minimalData = {
   fullName: "John Doe",
   email: "john@example.com",
  };

  expect(() => PersonalInfoSchema.parse(minimalData)).not.toThrow();
 });

 it("should reject missing required fields", () => {
  const incompleteData = {
   fullName: "John Doe",
   // missing email
  };

  const result = PersonalInfoSchema.safeParse(incompleteData);
  expect(result.success).toBe(false);
 });
});
