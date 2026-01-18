/**
 * Application Configuration Constants
 * Core configuration values shared between frontend and backend.
 */

export const APP_CONFIG = {
 JWT_EXPIRATION: "7d",
 DEFAULT_PAGE_SIZE: 20,
 MAX_PAGE_SIZE: 100,
 SEARCH_DEFAULT_LIMIT: 20,
 SEARCH_AUTOCOMPLETE_LIMIT: 10,
 SEARCH_MAX_RESULTS: 50,
 ONBOARDING_MAX_RETRY_ATTEMPTS: 3,
} as const;

export const RATE_LIMIT_CONFIG = {
 TTL: 60, // Time window in seconds
 TTL_MS: 60000, // Time window in milliseconds (for @Throttle decorator)
 MAX_REQUESTS: 100,
 AUTH_MAX_REQUESTS: 5,
} as const;

export const FILE_UPLOAD_CONFIG = {
 MAX_SIZE: 5 * 1024 * 1024,
 ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
} as const;

export const CACHE_CONFIG = {
 TTL_SHORT: 300,
 TTL_MEDIUM: 1800,
 TTL_LONG: 3600,
} as const;

/**
 * API Limits Constants
 *
 * Limits for various API operations to prevent abuse
 * and ensure consistent behavior.
 */
export const API_LIMITS = {
 MAX_REPOS_TO_PROCESS: 20,
 MAX_CONTRIBUTIONS_TO_SHOW: 10,
 MAX_SUGGESTIONS: 8,
 MAX_DEBUG_CHARS: 1000,
 MAX_PREVIEW_CHARS: 100,
} as const;

/**
 * Crypto Constants
 *
 * Constants for cryptographic operations and byte conversions.
 */
export const CRYPTO_CONSTANTS = {
 /** Secure random token size (256 bits) */
 TOKEN_BYTES: 32,
 /** Bytes per kilobyte */
 BYTES_PER_KB: 1024,
 /** Bytes per megabyte */
 BYTES_PER_MB: 1024 * 1024,
} as const;

/**
 * Time Constants
 *
 * Time-related constants for delays, timeouts, and conversions.
 */
export const TIME_MS = {
 SECOND: 1000,
 MINUTE: 60 * 1000,
 HOUR: 60 * 60 * 1000,
 DAY: 24 * 60 * 60 * 1000,
 WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

/**
 * Token Expiry Constants
 *
 * Expiry times for various tokens.
 * _HOURS constants are in hours (used in service calculations).
 * Other constants are in milliseconds (legacy/direct use).
 */
export const TOKEN_EXPIRY = {
 /** Email verification token validity in hours */
 EMAIL_VERIFICATION_HOURS: 24,
 /** Password reset token validity in hours */
 PASSWORD_RESET_HOURS: 1,
 /** Refresh token validity in hours */
 REFRESH_TOKEN_HOURS: 7 * 24,

 // Legacy: millisecond values (deprecated, use HOURS variants with TIME_MS.HOUR)
 VERIFICATION_TOKEN: 24 * 60 * 60 * 1000, // 24 hours
 RESET_PASSWORD_TOKEN: 60 * 60 * 1000, // 1 hour
 REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;