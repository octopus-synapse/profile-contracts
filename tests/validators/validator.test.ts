/**
 * Validator Tests
 *
 * Tests for pure validation functions.
 * These tests ensure the validation abstraction works correctly.
 *
 * Priority: CRITICAL (100% coverage required)
 * If validate() has a bug, ALL validators inherit the bug.
 */

import { describe, it, expect } from "bun:test";
import { z, ZodError } from "zod";
import { validate, validateOrThrow } from "../../src/validators/validator";

describe("validate()", () => {
  describe("Success cases", () => {
    it("should return success for valid data", () => {
      const schema = z.object({ name: z.string() });
      const result = validate(schema, { name: "John" });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John");
      }
    });

    it("should transform data according to schema", () => {
      const schema = z.object({
        age: z.number(),
        active: z.boolean(),
      });
      const result = validate(schema, { age: 25, active: true });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.age).toBe(25);
        expect(result.data.active).toBe(true);
      }
    });

    it("should handle optional fields", () => {
      const schema = z.object({
        name: z.string(),
        email: z.string().optional(),
      });
      const result = validate(schema, { name: "John" });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John");
        expect(result.data.email).toBeUndefined();
      }
    });

    it("should coerce types when schema allows", () => {
      const schema = z.object({
        email: z.string().trim().toLowerCase(),
      });
      const result = validate(schema, { email: "  JOHN@EXAMPLE.COM  " });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("john@example.com");
      }
    });
  });

  describe("Failure cases", () => {
    it("should return errors for invalid data", () => {
      const schema = z.object({ age: z.number().min(18) });
      const result = validate(schema, { age: 15 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("age");
        expect(result.errors[0].message).toContain("18");
      }
    });

    it("should return errors for missing required fields", () => {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
      });
      const result = validate(schema, { name: "John" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("email");
      }
    });

    it("should handle nested object errors", () => {
      const schema = z.object({
        user: z.object({
          email: z.string().email(),
        }),
      });
      const result = validate(schema, { user: { email: "invalid" } });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].path).toBe("user.email");
        expect(result.errors[0].message).toContain("email");
      }
    });

    it("should handle array errors", () => {
      const schema = z.object({
        tags: z.array(z.string().min(2)),
      });
      const result = validate(schema, { tags: ["ok", "x"] });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].path).toBe("tags.1");
      }
    });

    it("should return multiple errors for multiple violations", () => {
      const schema = z.object({
        name: z.string().min(2),
        age: z.number().min(18),
        email: z.string().email(),
      });
      const result = validate(schema, {
        name: "J",
        age: 15,
        email: "invalid",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe("Edge cases", () => {
    it("should handle null input", () => {
      const schema = z.object({ name: z.string() });
      const result = validate(schema, null);

      expect(result.success).toBe(false);
    });

    it("should handle undefined input", () => {
      const schema = z.object({ name: z.string() });
      const result = validate(schema, undefined);

      expect(result.success).toBe(false);
    });

    it("should handle empty object", () => {
      const schema = z.object({ name: z.string() });
      const result = validate(schema, {});

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].path).toBe("name");
      }
    });

    it("should handle extra fields (default: strip)", () => {
      const schema = z.object({ name: z.string() });
      const result = validate(schema, { name: "John", extra: "ignored" });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ name: "John" });
        expect("extra" in result.data).toBe(false);
      }
    });
  });
});

describe("validateOrThrow()", () => {
  it("should return validated data for valid input", () => {
    const schema = z.object({ name: z.string() });
    const data = validateOrThrow(schema, { name: "John" });

    expect(data.name).toBe("John");
  });

  it("should throw ZodError for invalid input", () => {
    const schema = z.object({ age: z.number().min(18) });

    expect(() => {
      validateOrThrow(schema, { age: 15 });
    }).toThrow();
  });

  it("should preserve error details in thrown error", () => {
    const schema = z.object({ email: z.string().email() });

    try {
      validateOrThrow(schema, { email: "invalid" });
      expect.unreachable("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      if (error instanceof ZodError) {
        expect(error.errors).toBeDefined();
        expect(error.errors[0].path).toContain("email");
      }
    }
  });
});
