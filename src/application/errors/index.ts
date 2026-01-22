/**
 * Domain Errors
 *
 * Framework-agnostic error types for the Profile System.
 * Import these in services instead of NestJS exceptions.
 */

export {
 // Base
 DomainException,

 // Not Found (404)
 ResourceNotFoundError,
 UserNotFoundError,
 ResumeNotFoundError,

 // Authorization (403)
 PermissionDeniedError,
 ResourceOwnershipError,

 // Authentication (401)
 AuthenticationError,
 InvalidTokenError,

 // Conflict (409)
 ConflictError,
 UsernameConflictError,
 EmailConflictError,
 DuplicateResourceError,

 // Validation (400)
 DomainValidationError,
 InvalidInputError,
 BusinessRuleError,

 // Rate Limiting (429)
 RateLimitError,

 // Service (503)
 ServiceUnavailableError,

 // Internal (500)
 InternalError,
} from "./domain.errors";
