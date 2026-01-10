# Changelog

## [3.4.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.3.0...v3.4.0) (2026-01-10)


### Features

* **validations:** add env and analytics validation schemas ([a5677ca](https://github.com/octopus-synapse/profile-contracts/commit/a5677ca3a45fa33e1cf2de41aed469d420d6294e))

## [3.3.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.2.0...v3.3.0) (2026-01-10)


### Features

* **graphql:** add GraphQL integration utilities and extend experience schema ([8f53225](https://github.com/octopus-synapse/profile-contracts/commit/8f53225e31d4434bcc5756254fd63b760e0a8aa9))

## [3.2.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.1.0...v3.2.0) (2026-01-10)


### Features

* **validations:** add validation pipes and validators for NestJS integration ([5eb88cd](https://github.com/octopus-synapse/profile-contracts/commit/5eb88cd8e770d6ba99dfbe2c359f3135e5ae4213))

## [3.1.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.0.0...v3.1.0) (2026-01-10)


### Features

* add complete validation schemas for profile-services migration ([a7cddc6](https://github.com/octopus-synapse/profile-contracts/commit/a7cddc6269ac787d1c173a1579e07a9a5a983543))

## [3.0.0](https://github.com/octopus-synapse/profile-contracts/compare/v2.0.2...v3.0.0) (2026-01-08)


### ⚠ BREAKING CHANGES

* Bump to v2.1.0 with new extended resume DTOs

### Features

* add extended resume schemas (publications, hackathons, bug bounties, etc) ([bec4db8](https://github.com/octopus-synapse/profile-contracts/commit/bec4db8ada186e56f6eb76ad61b0b3b0eaaf9885))

## [2.0.2](https://github.com/octopus-synapse/profile-contracts/compare/v2.0.1...v2.0.2) (2026-01-08)


### Bug Fixes

* **release:** use bun for install and build ([99d75bd](https://github.com/octopus-synapse/profile-contracts/commit/99d75bd193efa0b0444cd34b034728aac7fd7f05))

## [2.0.1](https://github.com/octopus-synapse/profile-contracts/compare/v2.0.0...v2.0.1) (2026-01-08)


### Bug Fixes

* **ci:** use bun instead of npm ([4b6cdcb](https://github.com/octopus-synapse/profile-contracts/commit/4b6cdcb22100eed512fb20a0e2e2367b19834ab3))
* **release:** use GITHUB_TOKEN for npm install ([0870ae9](https://github.com/octopus-synapse/profile-contracts/commit/0870ae9a2b8fb96d1226c5f9589b3cae30364369))

## [2.0.0](https://github.com/octopus-synapse/profile-contracts/compare/v1.2.0...v2.0.0) (2026-01-08)


### ⚠ BREAKING CHANGES

* **contracts:** Password policy now requires special characters
* 

### Features

* add PASSWORD_POLICY and PasswordSchema ([36f9a2a](https://github.com/octopus-synapse/profile-contracts/commit/36f9a2a453e661bcb0627a8c8c9cf1bcb9026c43))
* add section data schemas and comprehensive tests ([bc043de](https://github.com/octopus-synapse/profile-contracts/commit/bc043dede14afdb460a270fc81f19b6c170eedfc))
* **contracts:** add centralized enums, types, and DTOs ([2a9c6c9](https://github.com/octopus-synapse/profile-contracts/commit/2a9c6c9591b4f99aaba9533558398041152801cb))
* **contracts:** add Zod validation schemas for onboarding data ([91dc975](https://github.com/octopus-synapse/profile-contracts/commit/91dc975deab750b0e4027f56112ab864f13d489c))
* export AST types for frontend consumption ([b93179d](https://github.com/octopus-synapse/profile-contracts/commit/b93179d58f7cc648c3309c5f495a755d4b705043))
* v1.2.0 - align schemas with backend ([f6b6b49](https://github.com/octopus-synapse/profile-contracts/commit/f6b6b4973659d67e63187b89e45391612d502ac8))
* v1.3.0 - align schemas with backend ([ba64d3f](https://github.com/octopus-synapse/profile-contracts/commit/ba64d3f7d9c3b465d8ee1a7f4f0cb10fc67ce111))


### Bug Fixes

* add CefrLevelEnum for type safety ([75247a9](https://github.com/octopus-synapse/profile-contracts/commit/75247a95d9e9ad1049fc888560cc3f8ebe9480a1))
* align Experience/Education schemas with backend (isCurrent, YYYY-MM-DD format) ([ae358f9](https://github.com/octopus-synapse/profile-contracts/commit/ae358f9b1ddb8c2dbc251af6faf5098f71470e44))
* align LanguageSchema with backend (level enum, name field) ([9c34744](https://github.com/octopus-synapse/profile-contracts/commit/9c34744f6f7efa04a58833b441ec00aec65d5303))
* **release:** reset version to logical PATCH sequence 1.1.2 ([6b8a116](https://github.com/octopus-synapse/profile-contracts/commit/6b8a116f22bbccdd6caa4e3af5640a5740d08ac8))
* rename Location to UserLocation to avoid naming conflict ([b9e0be1](https://github.com/octopus-synapse/profile-contracts/commit/b9e0be1579c7f5ca7fea0bb5f181ec604d04f5bd))


### Performance Improvements

* migrate from jest to bun for faster test execution ([2998ad2](https://github.com/octopus-synapse/profile-contracts/commit/2998ad25ae9c32f78f909f55102ec6517e0813b7))
