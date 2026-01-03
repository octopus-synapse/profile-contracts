/**
 * Personal Information Validation Schemas
 *
 * Domain invariants for user personal data.
 * Used across onboarding, profile editing, and user management.
 */

import { z } from "zod";

/**
 * Email Address Schema
 *
 * RFC 5322 compliant email validation.
 * Rejects common invalid patterns while accepting valid edge cases.
 */
export const EmailSchema = z
 .string()
 .toLowerCase()
 .trim()
 .min(5, "Email must be at least 5 characters")
 .max(254, "Email cannot exceed 254 characters") // RFC 5321
 .email("Invalid email format");

/**
 * Full Name Schema
 *
 * Accepts international names with unicode characters.
 * No strict format enforcement (respects cultural diversity).
 */
export const FullNameSchema = z
 .string()
 .min(2, "Name must be at least 2 characters")
 .max(100, "Name cannot exceed 100 characters")
 .regex(
  /^[\p{L}\s'-]+$/u,
  "Name can only contain letters, spaces, hyphens, and apostrophes"
 )
 .trim();

export type FullName = z.infer<typeof FullNameSchema>;

/**
 * Phone Number Schema
 *
 * Accepts international formats with optional country code.
 * Flexible format to support various regions.
 */
export const PhoneSchema = z
 .string()
 .min(10, "Phone must be at least 10 digits")
 .max(20, "Phone cannot exceed 20 characters")
 .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone format")
 .trim()
 .optional();

export type Phone = z.infer<typeof PhoneSchema>;

/**
 * User Location Schema
 *
 * City, State/Province, Country format.
 * Optional field for privacy.
 */
export const UserLocationSchema = z
 .string()
 .min(2, "Location must be at least 2 characters")
 .max(100, "Location cannot exceed 100 characters")
 .trim()
 .optional();

export type UserLocation = z.infer<typeof UserLocationSchema>;
/**
 * Personal Info Complete Schema
 *
 * Combines all personal information fields.
 * Used in onboarding and profile management.
 */
export const PersonalInfoSchema = z.object({
 fullName: FullNameSchema,
 email: EmailSchema,
 phone: PhoneSchema,
 location: UserLocationSchema,
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
