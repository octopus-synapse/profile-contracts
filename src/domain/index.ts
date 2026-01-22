/**
 * Domain Layer - Index
 *
 * Core business logic, validation rules, and domain schemas.
 * This layer has NO dependencies on outer layers (application, infrastructure).
 *
 * Clean Architecture: INNERMOST layer
 */

// Constants
export * from './constants';

// Schemas (Zod validation schemas)
export * from './schemas';

// Validators
export * from './validators';
