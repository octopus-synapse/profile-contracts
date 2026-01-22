# Changelog

## [6.0.0](https://github.com/octopus-synapse/profile-contracts/compare/v5.0.1...v6.0.0) (2026-01-22)


### ⚠ BREAKING CHANGES

* resume section schemas moved to sections/ subdirectory
* Bump to v2.1.0 with new extended resume DTOs
* **contracts:** Password policy now requires special characters
* 

### Features

* add advanced section schemas with TDD tests ([b7072a1](https://github.com/octopus-synapse/profile-contracts/commit/b7072a15885150cc45c3fc1114e7d351a46d00e7))
* add complete validation schemas for profile-services migration ([a7cddc6](https://github.com/octopus-synapse/profile-contracts/commit/a7cddc6269ac787d1c173a1579e07a9a5a983543))
* add comprehensive DTOs and restructure with Clean Architecture ([b1da91a](https://github.com/octopus-synapse/profile-contracts/commit/b1da91afd75dd78a2dfac030b0111bdbdffc0bdf))
* add consent/GDPR validation schemas ([bd2a503](https://github.com/octopus-synapse/profile-contracts/commit/bd2a50374c7f679d8350dc0a52021594dc7e503a))
* add extended resume schemas (publications, hackathons, bug bounties, etc) ([bec4db8](https://github.com/octopus-synapse/profile-contracts/commit/bec4db8ada186e56f6eb76ad61b0b3b0eaaf9885))
* add PASSWORD_POLICY and PasswordSchema ([36f9a2a](https://github.com/octopus-synapse/profile-contracts/commit/36f9a2a453e661bcb0627a8c8c9cf1bcb9026c43))
* add section data schemas and comprehensive tests ([bc043de](https://github.com/octopus-synapse/profile-contracts/commit/bc043dede14afdb460a270fc81f19b6c170eedfc))
* add shared constants and extend DTO library ([45588d0](https://github.com/octopus-synapse/profile-contracts/commit/45588d0337e65f9652fd504a340a10b8d97e70f6))
* centralize validation schemas and add chat DTOs ([e9ebdb4](https://github.com/octopus-synapse/profile-contracts/commit/e9ebdb4fbb9605fd2827db377ad44f0b3cb14158))
* **contracts:** add centralized enums, types, and DTOs ([2a9c6c9](https://github.com/octopus-synapse/profile-contracts/commit/2a9c6c9591b4f99aaba9533558398041152801cb))
* **contracts:** add Zod validation schemas for onboarding data ([91dc975](https://github.com/octopus-synapse/profile-contracts/commit/91dc975deab750b0e4027f56112ab864f13d489c))
* **enums:** add CollaboratorRole enum for resume sharing ([868f01e](https://github.com/octopus-synapse/profile-contracts/commit/868f01eeacf3b73892febf0a079a362584580247))
* **errors:** implement domain exception system ([bc5ba7a](https://github.com/octopus-synapse/profile-contracts/commit/bc5ba7a3a6e7fbee93fbf6714c116e4970d2e15c))
* export AST types for frontend consumption ([b93179d](https://github.com/octopus-synapse/profile-contracts/commit/b93179d58f7cc648c3309c5f495a755d4b705043))
* **graphql:** add GraphQL integration utilities and extend experience schema ([8f53225](https://github.com/octopus-synapse/profile-contracts/commit/8f53225e31d4434bcc5756254fd63b760e0a8aa9))
* implement RBAC authorization schemas and DTOs ([d03d16e](https://github.com/octopus-synapse/profile-contracts/commit/d03d16ef70bd5ba5c4123b45f312fcdb9a49c1b5))
* release 0.0.1 ([1a179f7](https://github.com/octopus-synapse/profile-contracts/commit/1a179f76fc8b576cd770c7d7d7907f546f7be70f))
* **schemas:** add user-fields primitives for FullName, Phone, UserLocation ([cadfccf](https://github.com/octopus-synapse/profile-contracts/commit/cadfccfb5ae594e086f59eafb61587688fe02075))
* v1.2.0 - align schemas with backend ([f6b6b49](https://github.com/octopus-synapse/profile-contracts/commit/f6b6b4973659d67e63187b89e45391612d502ac8))
* v1.3.0 - align schemas with backend ([ba64d3f](https://github.com/octopus-synapse/profile-contracts/commit/ba64d3f7d9c3b465d8ee1a7f4f0cb10fc67ce111))
* **validations:** add env and analytics validation schemas ([a5677ca](https://github.com/octopus-synapse/profile-contracts/commit/a5677ca3a45fa33e1cf2de41aed469d420d6294e))
* **validations:** add validation pipes and validators for NestJS integration ([5eb88cd](https://github.com/octopus-synapse/profile-contracts/commit/5eb88cd8e770d6ba99dfbe2c359f3135e5ae4213))


### Bug Fixes

* add CefrLevelEnum for type safety ([75247a9](https://github.com/octopus-synapse/profile-contracts/commit/75247a95d9e9ad1049fc888560cc3f8ebe9480a1))
* align Experience/Education schemas with backend (isCurrent, YYYY-MM-DD format) ([ae358f9](https://github.com/octopus-synapse/profile-contracts/commit/ae358f9b1ddb8c2dbc251af6faf5098f71470e44))
* align LanguageSchema with backend (level enum, name field) ([9c34744](https://github.com/octopus-synapse/profile-contracts/commit/9c34744f6f7efa04a58833b441ec00aec65d5303))
* **authorization:** add missing [@package](https://github.com/package)Documentation tag to barrel export ([c435e3b](https://github.com/octopus-synapse/profile-contracts/commit/c435e3be036fb6b36fe389581f576226a57913e4))
* **ci:** skip tag sync tests in shallow checkout ([c90cbf9](https://github.com/octopus-synapse/profile-contracts/commit/c90cbf98f5b852c610d37e8340370faa07f30423))
* **ci:** use bun instead of npm ([4b6cdcb](https://github.com/octopus-synapse/profile-contracts/commit/4b6cdcb22100eed512fb20a0e2e2367b19834ab3))
* **eslint:** eslint config added ([6820b02](https://github.com/octopus-synapse/profile-contracts/commit/6820b024d164e907d0711d889f5a23fb6b2c2e6c))
* **release:** disable CI checks wait - CI runs on same commit ([4840c54](https://github.com/octopus-synapse/profile-contracts/commit/4840c542c42d67457172f11ade3554306f7ea267))
* **release:** reset version to logical PATCH sequence 1.1.2 ([6b8a116](https://github.com/octopus-synapse/profile-contracts/commit/6b8a116f22bbccdd6caa4e3af5640a5740d08ac8))
* **release:** use bun for install and build ([99d75bd](https://github.com/octopus-synapse/profile-contracts/commit/99d75bd193efa0b0444cd34b034728aac7fd7f05))
* **release:** use correct CI check names for workflow jobs ([0fd7704](https://github.com/octopus-synapse/profile-contracts/commit/0fd77043f3b85522c72148704bb5ba7e241c43b0))
* **release:** use GITHUB_TOKEN for npm install ([0870ae9](https://github.com/octopus-synapse/profile-contracts/commit/0870ae9a2b8fb96d1226c5f9589b3cae30364369))
* **release:** use lowercase ci check names ([6011fc4](https://github.com/octopus-synapse/profile-contracts/commit/6011fc42661c7a51727602f06e97985ed651205b))
* rename Location to UserLocation to avoid naming conflict ([b9e0be1](https://github.com/octopus-synapse/profile-contracts/commit/b9e0be1579c7f5ca7fea0bb5f181ec604d04f5bd))
* **test:** allow first release without existing npm package ([dc8e6c6](https://github.com/octopus-synapse/profile-contracts/commit/dc8e6c678e3446903537575687e300a8d6b826fe))
* workflow npm publish trigger ([5975cc7](https://github.com/octopus-synapse/profile-contracts/commit/5975cc799c8a4b99721c09700139ef59161b9776))


### Performance Improvements

* migrate from jest to bun for faster test execution ([2998ad2](https://github.com/octopus-synapse/profile-contracts/commit/2998ad25ae9c32f78f909f55102ec6517e0813b7))

## [5.0.1](https://github.com/octopus-synapse/profile-contracts/compare/v5.0.0...v5.0.1) (2026-01-22)


### Bug Fixes

* workflow npm publish trigger ([5975cc7](https://github.com/octopus-synapse/profile-contracts/commit/5975cc799c8a4b99721c09700139ef59161b9776))

## [5.0.0](https://github.com/octopus-synapse/profile-contracts/compare/v4.1.0...v5.0.0) (2026-01-22)


### ⚠ BREAKING CHANGES

* resume section schemas moved to sections/ subdirectory
* Bump to v2.1.0 with new extended resume DTOs
* **contracts:** Password policy now requires special characters
* 

### Features

* add advanced section schemas with TDD tests ([b7072a1](https://github.com/octopus-synapse/profile-contracts/commit/b7072a15885150cc45c3fc1114e7d351a46d00e7))
* add complete validation schemas for profile-services migration ([a7cddc6](https://github.com/octopus-synapse/profile-contracts/commit/a7cddc6269ac787d1c173a1579e07a9a5a983543))
* add comprehensive DTOs and restructure with Clean Architecture ([b1da91a](https://github.com/octopus-synapse/profile-contracts/commit/b1da91afd75dd78a2dfac030b0111bdbdffc0bdf))
* add consent/GDPR validation schemas ([bd2a503](https://github.com/octopus-synapse/profile-contracts/commit/bd2a50374c7f679d8350dc0a52021594dc7e503a))
* add extended resume schemas (publications, hackathons, bug bounties, etc) ([bec4db8](https://github.com/octopus-synapse/profile-contracts/commit/bec4db8ada186e56f6eb76ad61b0b3b0eaaf9885))
* add PASSWORD_POLICY and PasswordSchema ([36f9a2a](https://github.com/octopus-synapse/profile-contracts/commit/36f9a2a453e661bcb0627a8c8c9cf1bcb9026c43))
* add section data schemas and comprehensive tests ([bc043de](https://github.com/octopus-synapse/profile-contracts/commit/bc043dede14afdb460a270fc81f19b6c170eedfc))
* add shared constants and extend DTO library ([45588d0](https://github.com/octopus-synapse/profile-contracts/commit/45588d0337e65f9652fd504a340a10b8d97e70f6))
* centralize validation schemas and add chat DTOs ([e9ebdb4](https://github.com/octopus-synapse/profile-contracts/commit/e9ebdb4fbb9605fd2827db377ad44f0b3cb14158))
* **contracts:** add centralized enums, types, and DTOs ([2a9c6c9](https://github.com/octopus-synapse/profile-contracts/commit/2a9c6c9591b4f99aaba9533558398041152801cb))
* **contracts:** add Zod validation schemas for onboarding data ([91dc975](https://github.com/octopus-synapse/profile-contracts/commit/91dc975deab750b0e4027f56112ab864f13d489c))
* **enums:** add CollaboratorRole enum for resume sharing ([868f01e](https://github.com/octopus-synapse/profile-contracts/commit/868f01eeacf3b73892febf0a079a362584580247))
* **errors:** implement domain exception system ([bc5ba7a](https://github.com/octopus-synapse/profile-contracts/commit/bc5ba7a3a6e7fbee93fbf6714c116e4970d2e15c))
* export AST types for frontend consumption ([b93179d](https://github.com/octopus-synapse/profile-contracts/commit/b93179d58f7cc648c3309c5f495a755d4b705043))
* **graphql:** add GraphQL integration utilities and extend experience schema ([8f53225](https://github.com/octopus-synapse/profile-contracts/commit/8f53225e31d4434bcc5756254fd63b760e0a8aa9))
* implement RBAC authorization schemas and DTOs ([d03d16e](https://github.com/octopus-synapse/profile-contracts/commit/d03d16ef70bd5ba5c4123b45f312fcdb9a49c1b5))
* **schemas:** add user-fields primitives for FullName, Phone, UserLocation ([cadfccf](https://github.com/octopus-synapse/profile-contracts/commit/cadfccfb5ae594e086f59eafb61587688fe02075))
* v1.2.0 - align schemas with backend ([f6b6b49](https://github.com/octopus-synapse/profile-contracts/commit/f6b6b4973659d67e63187b89e45391612d502ac8))
* v1.3.0 - align schemas with backend ([ba64d3f](https://github.com/octopus-synapse/profile-contracts/commit/ba64d3f7d9c3b465d8ee1a7f4f0cb10fc67ce111))
* **validations:** add env and analytics validation schemas ([a5677ca](https://github.com/octopus-synapse/profile-contracts/commit/a5677ca3a45fa33e1cf2de41aed469d420d6294e))
* **validations:** add validation pipes and validators for NestJS integration ([5eb88cd](https://github.com/octopus-synapse/profile-contracts/commit/5eb88cd8e770d6ba99dfbe2c359f3135e5ae4213))


### Bug Fixes

* add CefrLevelEnum for type safety ([75247a9](https://github.com/octopus-synapse/profile-contracts/commit/75247a95d9e9ad1049fc888560cc3f8ebe9480a1))
* align Experience/Education schemas with backend (isCurrent, YYYY-MM-DD format) ([ae358f9](https://github.com/octopus-synapse/profile-contracts/commit/ae358f9b1ddb8c2dbc251af6faf5098f71470e44))
* align LanguageSchema with backend (level enum, name field) ([9c34744](https://github.com/octopus-synapse/profile-contracts/commit/9c34744f6f7efa04a58833b441ec00aec65d5303))
* **authorization:** add missing [@package](https://github.com/package)Documentation tag to barrel export ([c435e3b](https://github.com/octopus-synapse/profile-contracts/commit/c435e3be036fb6b36fe389581f576226a57913e4))
* **ci:** use bun instead of npm ([4b6cdcb](https://github.com/octopus-synapse/profile-contracts/commit/4b6cdcb22100eed512fb20a0e2e2367b19834ab3))
* **eslint:** eslint config added ([6820b02](https://github.com/octopus-synapse/profile-contracts/commit/6820b024d164e907d0711d889f5a23fb6b2c2e6c))
* **release:** disable CI checks wait - CI runs on same commit ([4840c54](https://github.com/octopus-synapse/profile-contracts/commit/4840c542c42d67457172f11ade3554306f7ea267))
* **release:** reset version to logical PATCH sequence 1.1.2 ([6b8a116](https://github.com/octopus-synapse/profile-contracts/commit/6b8a116f22bbccdd6caa4e3af5640a5740d08ac8))
* **release:** use bun for install and build ([99d75bd](https://github.com/octopus-synapse/profile-contracts/commit/99d75bd193efa0b0444cd34b034728aac7fd7f05))
* **release:** use correct CI check names for workflow jobs ([0fd7704](https://github.com/octopus-synapse/profile-contracts/commit/0fd77043f3b85522c72148704bb5ba7e241c43b0))
* **release:** use GITHUB_TOKEN for npm install ([0870ae9](https://github.com/octopus-synapse/profile-contracts/commit/0870ae9a2b8fb96d1226c5f9589b3cae30364369))
* **release:** use lowercase ci check names ([6011fc4](https://github.com/octopus-synapse/profile-contracts/commit/6011fc42661c7a51727602f06e97985ed651205b))
* rename Location to UserLocation to avoid naming conflict ([b9e0be1](https://github.com/octopus-synapse/profile-contracts/commit/b9e0be1579c7f5ca7fea0bb5f181ec604d04f5bd))


### Performance Improvements

* migrate from jest to bun for faster test execution ([2998ad2](https://github.com/octopus-synapse/profile-contracts/commit/2998ad25ae9c32f78f909f55102ec6517e0813b7))

## [4.1.0](https://github.com/octopus-synapse/profile-contracts/compare/v4.0.1...v4.1.0) (2026-01-22)


### Features

* add comprehensive DTOs and restructure with Clean Architecture ([b1da91a](https://github.com/octopus-synapse/profile-contracts/commit/b1da91afd75dd78a2dfac030b0111bdbdffc0bdf))
* **errors:** implement domain exception system ([bc5ba7a](https://github.com/octopus-synapse/profile-contracts/commit/bc5ba7a3a6e7fbee93fbf6714c116e4970d2e15c))


### Bug Fixes

* **eslint:** eslint config added ([6820b02](https://github.com/octopus-synapse/profile-contracts/commit/6820b024d164e907d0711d889f5a23fb6b2c2e6c))
* **release:** disable CI checks wait - CI runs on same commit ([4840c54](https://github.com/octopus-synapse/profile-contracts/commit/4840c542c42d67457172f11ade3554306f7ea267))
* **release:** use correct CI check names for workflow jobs ([0fd7704](https://github.com/octopus-synapse/profile-contracts/commit/0fd77043f3b85522c72148704bb5ba7e241c43b0))
* **release:** use lowercase ci check names ([6011fc4](https://github.com/octopus-synapse/profile-contracts/commit/6011fc42661c7a51727602f06e97985ed651205b))

## [4.0.1](https://github.com/octopus-synapse/profile-contracts/compare/v4.0.0...v4.0.1) (2026-01-16)


### Bug Fixes

* **authorization:** add missing [@package](https://github.com/package)Documentation tag to barrel export ([c435e3b](https://github.com/octopus-synapse/profile-contracts/commit/c435e3be036fb6b36fe389581f576226a57913e4))

## [4.0.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.6.0...v4.0.0) (2026-01-16)


### ⚠ BREAKING CHANGES

* resume section schemas moved to sections/ subdirectory

### Features

* add advanced section schemas with TDD tests ([b7072a1](https://github.com/octopus-synapse/profile-contracts/commit/b7072a15885150cc45c3fc1114e7d351a46d00e7))
* implement RBAC authorization schemas and DTOs ([d03d16e](https://github.com/octopus-synapse/profile-contracts/commit/d03d16ef70bd5ba5c4123b45f312fcdb9a49c1b5))
* **schemas:** add user-fields primitives for FullName, Phone, UserLocation ([cadfccf](https://github.com/octopus-synapse/profile-contracts/commit/cadfccfb5ae594e086f59eafb61587688fe02075))

## [3.6.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.5.0...v3.6.0) (2026-01-14)


### Features

* add consent/GDPR validation schemas ([bd2a503](https://github.com/octopus-synapse/profile-contracts/commit/bd2a50374c7f679d8350dc0a52021594dc7e503a))
* centralize validation schemas and add chat DTOs ([e9ebdb4](https://github.com/octopus-synapse/profile-contracts/commit/e9ebdb4fbb9605fd2827db377ad44f0b3cb14158))
* **enums:** add CollaboratorRole enum for resume sharing ([868f01e](https://github.com/octopus-synapse/profile-contracts/commit/868f01eeacf3b73892febf0a079a362584580247))

## [3.5.0](https://github.com/octopus-synapse/profile-contracts/compare/v3.4.0...v3.5.0) (2026-01-10)


### Features

* add shared constants and extend DTO library ([45588d0](https://github.com/octopus-synapse/profile-contracts/commit/45588d0337e65f9652fd504a340a10b8d97e70f6))

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

## [5.0.1] - Manual publish test

### Fixed
- Workflow npm publish authentication
