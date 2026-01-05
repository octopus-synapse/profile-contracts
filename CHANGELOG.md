# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0](https://github.com/octopus-synapse/profile-contracts/compare/v1.0.0...v1.1.0) (2026-01-05)


### Features

* add PASSWORD_POLICY and PasswordSchema ([36f9a2a](https://github.com/octopus-synapse/profile-contracts/commit/36f9a2a453e661bcb0627a8c8c9cf1bcb9026c43))

## [1.0.0] - 2026-01-04

### Declaration

**v1.0.0 marks the beginning of semantically versioned contracts, not functional stability.**  
This version establishes the baseline for SemVer compliance going forward.  
All contract changes (breaking, additions, fixes) will follow SemVer strictly from this point.

**CRITICAL**: profile-contracts can only be promoted to production if profile-services@X explicitly supports it.

### Added

- Resume AST schema definitions
- Resume DSL schema definitions (layout, sections, tokens)
- Section data schemas
- Onboarding data validation schemas
- Personal information schemas
- Generated Prisma enums export
- Comprehensive test suite for all schemas

### Contracts

- Zod-based runtime validation
- TypeScript type exports
- Schema versioning foundation

---

## [0.0.4] - 2025-01-XX

### Added

- Onboarding validation schemas (`OnboardingDtoSchema`)
- Personal information validation schemas

### Changed

- **BREAKING**: Renamed `Location` to `UserLocation` to avoid naming conflicts

#### Migration Guide

```typescript
// Before
import { Location } from "@octopus-synapse/profile-contracts";

// After
import { UserLocation } from "@octopus-synapse/profile-contracts";
```

---

## [0.0.3] - 2025-01-XX

### Added

- Section data schemas
- Comprehensive test coverage for schemas

---

## [0.0.2] - 2025-01-XX

### Added

- Initial schema exports
- Basic resume entity types
- Package configuration for GitHub registry

---

[1.0.0]: https://github.com/octopus-synapse/profile-contracts/releases/tag/v1.0.0
