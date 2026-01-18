/**
 * Consent Schemas Tests
 *
 * Tests for consent-related validation schemas.
 * Validates document types, request DTOs, and response shapes.
 *
 * Clean Architecture: These tests validate the Domain layer contracts
 * that are used by profile-services (UserConsentController) and
 * profile-frontend (api-client/consent.repository).
 *
 * Priority: HIGH (90%+ coverage required)
 */

import { describe, it, expect } from "bun:test";
import {
 ConsentDocumentTypeSchema,
 AcceptConsentSchema,
 ConsentRecordSchema,
 AcceptConsentResponseSchema,
 ConsentStatusSchema,
 ConsentHistorySchema,
} from "../../src/schemas/consent";

// ============================================================================
// ConsentDocumentTypeSchema
// ============================================================================

describe("ConsentDocumentTypeSchema", () => {
 describe("Valid document types", () => {
  const validTypes = [
   "TERMS_OF_SERVICE",
   "PRIVACY_POLICY",
   "MARKETING_CONSENT",
  ];

  validTypes.forEach((type) => {
   it(`should accept valid document type: ${type}`, () => {
    expect(() => ConsentDocumentTypeSchema.parse(type)).not.toThrow();
    expect(ConsentDocumentTypeSchema.parse(type)).toBe(type);
   });
  });
 });

 describe("Invalid document types", () => {
  const invalidTypes = [
   "terms_of_service", // lowercase
   "INVALID_TYPE",
   "TOS",
   "",
   null,
   undefined,
   123,
  ];

  invalidTypes.forEach((type) => {
   it(`should reject invalid document type: ${JSON.stringify(type)}`, () => {
    expect(() => ConsentDocumentTypeSchema.parse(type)).toThrow();
   });
  });
 });
});

// ============================================================================
// AcceptConsentSchema
// ============================================================================

describe("AcceptConsentSchema", () => {
 describe("Valid requests", () => {
  it("should accept minimal valid request (documentType only)", () => {
   const data = { documentType: "TERMS_OF_SERVICE" };
   expect(() => AcceptConsentSchema.parse(data)).not.toThrow();
   expect(AcceptConsentSchema.parse(data)).toEqual({
    documentType: "TERMS_OF_SERVICE",
   });
  });

  it("should accept request with all optional fields", () => {
   const data = {
    documentType: "PRIVACY_POLICY",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
   };
   expect(() => AcceptConsentSchema.parse(data)).not.toThrow();
  });

  it("should accept IPv6 address", () => {
   const data = {
    documentType: "TERMS_OF_SERVICE",
    ipAddress: "::1",
   };
   expect(() => AcceptConsentSchema.parse(data)).not.toThrow();
  });

  it("should accept full IPv6 address", () => {
   const data = {
    documentType: "TERMS_OF_SERVICE",
    ipAddress: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
   };
   expect(() => AcceptConsentSchema.parse(data)).not.toThrow();
  });
 });

 describe("Invalid requests", () => {
  it("should reject missing documentType", () => {
   const data = { ipAddress: "192.168.1.1" };
   expect(() => AcceptConsentSchema.parse(data)).toThrow();
  });

  it("should reject invalid documentType", () => {
   const data = { documentType: "INVALID" };
   expect(() => AcceptConsentSchema.parse(data)).toThrow();
  });

  it("should reject invalid IP address format", () => {
   const data = {
    documentType: "TERMS_OF_SERVICE",
    ipAddress: "invalid-ip",
   };
   expect(() => AcceptConsentSchema.parse(data)).toThrow();
  });

  it("should reject empty object", () => {
   expect(() => AcceptConsentSchema.parse({})).toThrow();
  });
 });
});

// ============================================================================
// ConsentRecordSchema
// ============================================================================

describe("ConsentRecordSchema", () => {
 const validRecord = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  userId: "550e8400-e29b-41d4-a716-446655440001",
  documentType: "TERMS_OF_SERVICE",
  version: "1.0.0",
  acceptedAt: "2026-01-14T10:00:00.000Z",
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
 };

 describe("Valid records", () => {
  it("should accept valid consent record", () => {
   expect(() => ConsentRecordSchema.parse(validRecord)).not.toThrow();
  });

  it("should accept all document types", () => {
   const types = ["TERMS_OF_SERVICE", "PRIVACY_POLICY", "MARKETING_CONSENT"];
   types.forEach((type) => {
    const record = { ...validRecord, documentType: type };
    expect(() => ConsentRecordSchema.parse(record)).not.toThrow();
   });
  });
 });

 describe("Invalid records", () => {
  it("should reject invalid UUID for id", () => {
   const record = { ...validRecord, id: "invalid-uuid" };
   expect(() => ConsentRecordSchema.parse(record)).toThrow();
  });

  it("should reject invalid UUID for userId", () => {
   const record = { ...validRecord, userId: "invalid-uuid" };
   expect(() => ConsentRecordSchema.parse(record)).toThrow();
  });

  it("should reject invalid datetime format", () => {
   const record = { ...validRecord, acceptedAt: "not-a-date" };
   expect(() => ConsentRecordSchema.parse(record)).toThrow();
  });

  it("should reject missing required fields", () => {
   const { id: _id, ...recordWithoutId } = validRecord;
   expect(() => ConsentRecordSchema.parse(recordWithoutId)).toThrow();
  });
 });
});

// ============================================================================
// AcceptConsentResponseSchema
// ============================================================================

describe("AcceptConsentResponseSchema", () => {
 const validResponse = {
  message: "Terms of Service accepted successfully",
  consent: {
   id: "550e8400-e29b-41d4-a716-446655440000",
   userId: "550e8400-e29b-41d4-a716-446655440001",
   documentType: "TERMS_OF_SERVICE",
   version: "1.0.0",
   acceptedAt: "2026-01-14T10:00:00.000Z",
   ipAddress: "192.168.1.1",
   userAgent: "Mozilla/5.0...",
  },
 };

 it("should accept valid response", () => {
  expect(() => AcceptConsentResponseSchema.parse(validResponse)).not.toThrow();
 });

 it("should reject missing message", () => {
  const { message: _message, ...responseWithoutMessage } = validResponse;
  expect(() =>
   AcceptConsentResponseSchema.parse(responseWithoutMessage)
  ).toThrow();
 });

 it("should reject missing consent", () => {
  const { consent: _consent, ...responseWithoutConsent } = validResponse;
  expect(() =>
   AcceptConsentResponseSchema.parse(responseWithoutConsent)
  ).toThrow();
 });

 it("should reject invalid consent record", () => {
  const response = {
   ...validResponse,
   consent: { ...validResponse.consent, id: "invalid" },
  };
  expect(() => AcceptConsentResponseSchema.parse(response)).toThrow();
 });
});

// ============================================================================
// ConsentStatusSchema
// ============================================================================

describe("ConsentStatusSchema", () => {
 const validStatus = {
  tosAccepted: true,
  privacyPolicyAccepted: true,
  marketingConsentAccepted: false,
  latestTosVersion: "1.0.0",
  latestPrivacyPolicyVersion: "1.0.0",
 };

 describe("Valid status", () => {
  it("should accept valid consent status", () => {
   expect(() => ConsentStatusSchema.parse(validStatus)).not.toThrow();
  });

  it("should accept all false values", () => {
   const status = {
    ...validStatus,
    tosAccepted: false,
    privacyPolicyAccepted: false,
    marketingConsentAccepted: false,
   };
   expect(() => ConsentStatusSchema.parse(status)).not.toThrow();
  });

  it("should accept all true values", () => {
   const status = {
    ...validStatus,
    tosAccepted: true,
    privacyPolicyAccepted: true,
    marketingConsentAccepted: true,
   };
   expect(() => ConsentStatusSchema.parse(status)).not.toThrow();
  });
 });

 describe("Invalid status", () => {
  it("should reject missing tosAccepted", () => {
   const { tosAccepted: _tosAccepted, ...statusWithoutTos } = validStatus;
   expect(() => ConsentStatusSchema.parse(statusWithoutTos)).toThrow();
  });

  it("should reject non-boolean for tosAccepted", () => {
   const status = { ...validStatus, tosAccepted: "true" };
   expect(() => ConsentStatusSchema.parse(status)).toThrow();
  });

  it("should reject missing version fields", () => {
   const { latestTosVersion: _latestTosVersion, ...statusWithoutVersion } = validStatus;
   expect(() => ConsentStatusSchema.parse(statusWithoutVersion)).toThrow();
  });
 });
});

// ============================================================================
// ConsentHistorySchema
// ============================================================================

describe("ConsentHistorySchema", () => {
 const validRecord = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  userId: "550e8400-e29b-41d4-a716-446655440001",
  documentType: "TERMS_OF_SERVICE",
  version: "1.0.0",
  acceptedAt: "2026-01-14T10:00:00.000Z",
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
 };

 it("should accept empty array", () => {
  expect(() => ConsentHistorySchema.parse([])).not.toThrow();
  expect(ConsentHistorySchema.parse([])).toEqual([]);
 });

 it("should accept array with one record", () => {
  expect(() => ConsentHistorySchema.parse([validRecord])).not.toThrow();
 });

 it("should accept array with multiple records", () => {
  const history = [
   { ...validRecord, id: "550e8400-e29b-41d4-a716-446655440000" },
   {
    ...validRecord,
    id: "550e8400-e29b-41d4-a716-446655440002",
    documentType: "PRIVACY_POLICY",
   },
   {
    ...validRecord,
    id: "550e8400-e29b-41d4-a716-446655440003",
    documentType: "MARKETING_CONSENT",
   },
  ];
  expect(() => ConsentHistorySchema.parse(history)).not.toThrow();
  expect(ConsentHistorySchema.parse(history)).toHaveLength(3);
 });

 it("should reject array with invalid record", () => {
  const history = [{ ...validRecord, id: "invalid-uuid" }];
  expect(() => ConsentHistorySchema.parse(history)).toThrow();
 });

 it("should reject non-array input", () => {
  expect(() => ConsentHistorySchema.parse(validRecord)).toThrow();
  expect(() => ConsentHistorySchema.parse("not-an-array")).toThrow();
  expect(() => ConsentHistorySchema.parse(null)).toThrow();
 });
});
