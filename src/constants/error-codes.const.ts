/**
 * Error Codes
 *
 * These codes are part of the cross-app contract.
 * They are intended for machines (frontend, api-client) — not humans.
 *
 * Notes:
 * - Keep codes stable. Renaming/removing is a breaking change.
 * - Prefer adding new codes over reusing old ones with new meaning.
 */

export const ERROR_CODES = {
 // Generic
 UNKNOWN: "UNKNOWN",
 INTERNAL_ERROR: "INTERNAL_ERROR",

 // HTTP
 BAD_REQUEST: "BAD_REQUEST",
 VALIDATION_ERROR: "VALIDATION_ERROR",
 UNAUTHORIZED: "UNAUTHORIZED",
 FORBIDDEN: "FORBIDDEN",
 NOT_FOUND: "NOT_FOUND",
 CONFLICT: "CONFLICT",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
