# Changelog

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
