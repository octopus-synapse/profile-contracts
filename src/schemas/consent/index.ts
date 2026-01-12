/**
 * Consent/GDPR Schemas
 *
 * Validation for user consent operations (ToS, Privacy Policy).
 */

import { z } from 'zod';

export const ConsentDocumentTypeSchema = z.enum([
  'TERMS_OF_SERVICE',
  'PRIVACY_POLICY',
  'MARKETING_CONSENT',
]);

export type ConsentDocumentType = z.infer<typeof ConsentDocumentTypeSchema>;

export const AcceptConsentSchema = z.object({
  documentType: ConsentDocumentTypeSchema,
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
});

export type AcceptConsent = z.infer<typeof AcceptConsentSchema>;
