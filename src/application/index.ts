/**
 * Application Layer - Index
 *
 * API contracts, DTOs, and application-specific types.
 * Depends on domain layer, but NOT on infrastructure details.
 *
 * Clean Architecture: OUTER layer (interfaces/adapters)
 */

// DTOs (Data Transfer Objects for API communication)
export * from './dtos';

// Types (Application-specific type definitions)
export * from './types';

// Enums (Prisma-generated enums - consider moving to domain if business logic)
export * from './enums/prisma-enums';

// Errors (Application-level errors)
export * from './errors';
