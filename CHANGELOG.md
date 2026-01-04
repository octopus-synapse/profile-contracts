# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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

[1.0.0]: https://github.com/octopus-synapse/profile-contracts/releases/tag/v1.0.0
