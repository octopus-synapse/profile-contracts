/**
 * Domain Exceptions
 *
 * Framework-agnostic error types for the Profile System domain.
 * These exceptions represent business rule violations and domain errors.
 *
 * Design Rationale:
 * - Decoupled from NestJS: Can be used in any context (CLI, workers, tests)
 * - Semantic: Each error type represents a specific domain concept
 * - Mappable: Infrastructure layer maps these to HTTP responses
 *
 * Usage:
 * - Services throw domain exceptions
 * - Controllers/Guards catch and transform (via ExceptionFilter)
 * - Tests can assert on domain exceptions directly
 */

/**
 * Base class for all domain exceptions
 */
export abstract class DomainException extends Error {
 abstract readonly code: string;
 abstract readonly httpStatus: number;

 constructor(
  message: string,
  public readonly details?: Record<string, unknown>
 ) {
  super(message);
  this.name = this.constructor.name;
  Error.captureStackTrace(this, this.constructor);
 }

 toJSON() {
  return {
   name: this.name,
   code: this.code,
   message: this.message,
   details: this.details,
  };
 }
}

// ============================================================================
// Not Found Errors (404)
// ============================================================================

/**
 * Resource not found in the system
 */
export class ResourceNotFoundError extends DomainException {
 readonly code = "RESOURCE_NOT_FOUND";
 readonly httpStatus = 404;

 constructor(
  resource: string,
  identifier?: string,
  details?: Record<string, unknown>
 ) {
  super(
   identifier
    ? `${resource} with identifier "${identifier}" not found`
    : `${resource} not found`,
   { resource, identifier, ...details }
  );
 }
}

/**
 * User not found
 */
export class UserNotFoundError extends ResourceNotFoundError {
 constructor(userId: string) {
  super("User", userId);
 }
}

/**
 * Resume not found
 */
export class ResumeNotFoundError extends ResourceNotFoundError {
 constructor(resumeId: string) {
  super("Resume", resumeId);
 }
}

// ============================================================================
// Authorization Errors (403)
// ============================================================================

/**
 * User does not have permission to perform action
 */
export class PermissionDeniedError extends DomainException {
 readonly code = "PERMISSION_DENIED";
 readonly httpStatus = 403;

 constructor(
  action: string,
  resource?: string,
  details?: Record<string, unknown>
 ) {
  super(
   resource
    ? `Permission denied: cannot ${action} ${resource}`
    : `Permission denied: ${action}`,
   { action, resource, ...details }
  );
 }
}

/**
 * User does not own the resource
 */
export class ResourceOwnershipError extends PermissionDeniedError {
 constructor(resource: string, resourceId: string) {
  super("access", resource, { resourceId });
 }
}

// ============================================================================
// Authentication Errors (401)
// ============================================================================

/**
 * Authentication required or invalid
 */
export class AuthenticationError extends DomainException {
 readonly code = "AUTHENTICATION_REQUIRED";
 readonly httpStatus = 401;

 constructor(
  message = "Authentication required",
  details?: Record<string, unknown>
 ) {
  super(message, details);
 }
}

/**
 * Invalid or expired token
 */
export class InvalidTokenError extends AuthenticationError {
 constructor(reason?: string) {
  super(reason ? `Invalid token: ${reason}` : "Invalid or expired token");
 }
}

// ============================================================================
// Conflict Errors (409)
// ============================================================================

/**
 * Resource already exists or conflicts with existing data
 */
export class ConflictError extends DomainException {
 readonly code = "CONFLICT";
 readonly httpStatus = 409;

 constructor(message: string, details?: Record<string, unknown>) {
  super(message, details);
 }
}

/**
 * Username already taken
 */
export class UsernameConflictError extends ConflictError {
 constructor(username: string) {
  super(`Username "${username}" is already in use`, { username });
 }
}

/**
 * Email already registered
 */
export class EmailConflictError extends ConflictError {
 constructor(email: string) {
  super(`Email "${email}" is already registered`, {
   email: email.substring(0, 3) + "***",
  });
 }
}

/**
 * Duplicate resource
 */
export class DuplicateResourceError extends ConflictError {
 constructor(resource: string, field: string, value: string) {
  super(`${resource} with ${field} "${value}" already exists`, {
   resource,
   field,
  });
 }
}

// ============================================================================
// Validation Errors (400)
// ============================================================================

/**
 * Input validation failed
 */
export class DomainValidationError extends DomainException {
 readonly code = "VALIDATION_ERROR";
 readonly httpStatus = 400;

 constructor(message: string, details?: Record<string, unknown>) {
  super(message, details);
 }
}

/**
 * Invalid input data
 */
export class InvalidInputError extends DomainValidationError {
 constructor(field: string, reason: string) {
  super(`Invalid ${field}: ${reason}`, { field, reason });
 }
}

/**
 * Business rule violation
 */
export class BusinessRuleError extends DomainValidationError {
 constructor(rule: string, details?: Record<string, unknown>) {
  super(`Business rule violation: ${rule}`, details);
 }
}

// ============================================================================
// Rate Limiting Errors (429)
// ============================================================================

/**
 * Too many requests
 */
export class RateLimitError extends DomainException {
 readonly code = "RATE_LIMIT_EXCEEDED";
 readonly httpStatus = 429;

 constructor(
  public readonly retryAfterSeconds?: number,
  details?: Record<string, unknown>
 ) {
  super("Rate limit exceeded. Please try again later.", {
   retryAfterSeconds,
   ...details,
  });
 }
}

// ============================================================================
// Service Errors (503)
// ============================================================================

/**
 * External service unavailable
 */
export class ServiceUnavailableError extends DomainException {
 readonly code = "SERVICE_UNAVAILABLE";
 readonly httpStatus = 503;

 constructor(service: string, details?: Record<string, unknown>) {
  super(`Service "${service}" is temporarily unavailable`, {
   service,
   ...details,
  });
 }
}

// ============================================================================
// Internal Errors (500)
// ============================================================================

/**
 * Unexpected internal error
 */
export class InternalError extends DomainException {
 readonly code = "INTERNAL_ERROR";
 readonly httpStatus = 500;

 constructor(
  message = "An unexpected error occurred",
  details?: Record<string, unknown>
 ) {
  super(message, details);
 }
}
