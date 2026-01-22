# @octopus-synapse/profile-contracts

Shared domain contracts, validation schemas, and TypeScript types for the Profile platform.

## Purpose

This package serves as the **single source of truth** for:

- Data validation schemas (Zod)
- TypeScript types
- Domain entity structures
- Cross-service contracts

Used by:

- `profile-services` (backend)
- `profile-frontend` (web app)
- `api-client` (HTTP client library)

## Installation

```bash
bun add @octopus-synapse/profile-contracts
```

## Usage

### When to Use Contracts

✅ **Use contracts for:**

- User authentication (email, username, password validation)
- Resume domain entities (experience, education, skills)
- Onboarding data (personal info, professional profile)
- Any data shared between frontend and backend
- Cross-service domain validation

❌ **Do NOT use contracts for:**

- Backend-only concerns (pagination, sorting, filters)
- Infrastructure types (database IDs, timestamps, internal status)
- Framework-specific types (Express Request/Response, NestJS DTOs)
- UI-specific validation (form state, display logic)

### Integration Examples

#### Backend (NestJS)

```typescript
import { RegisterSchema, LoginSchema } from '@octopus-synapse/profile-contracts';

@Post('register')
async register(@Body() dto: unknown) {
  // Validate using contract schema
  const validatedData = RegisterSchema.parse(dto);
  return this.authService.register(validatedData);
}
```

#### Frontend (React)

```typescript
import { UsernameSchema } from '@octopus-synapse/profile-contracts';

function UsernameInput({ value, onChange }) {
  const result = UsernameSchema.safeParse(value);
  
  return (
    <div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      {!result.success && <span>{result.error.message}</span>}
    </div>
  );
}
```

### Authentication Schemas

```typescript
import {
 RegisterSchema,
 LoginSchema,
 UsernameSchema,
} from "@octopus-synapse/profile-contracts";

// Validate registration data
const result = RegisterSchema.safeParse({
 email: "user@example.com",
 username: "johndoe",
 password: "SecurePass123!",
});
```

### Onboarding Schemas

```typescript
import { OnboardingDtoSchema } from "@octopus-synapse/profile-contracts";

const onboardingData = OnboardingDtoSchema.parse({
 fullName: "John Doe",
 jobTitle: "Software Engineer",
 // ... other fields
});
```

### Resume AST & DSL

```typescript
import type { ResumeAst, ResumeDsl } from "@octopus-synapse/profile-contracts";

const ast: ResumeAst = {
 // ... AST structure
};
```

## Versioning Policy

This package follows [Semantic Versioning 2.0.0](https://semver.org/):

### MAJOR Version (`X.0.0`)

Breaking changes that require code updates:

- Renaming schemas or types
- Removing fields
- Making optional fields required
- Changing validation rules (stricter)

**Example:** `Location` → `UserLocation`

### MINOR Version (`0.X.0`)

Backward-compatible additions:

- New validation schemas
- New optional fields
- New types/interfaces
- Relaxing validation rules

**Example:** Adding `PasswordSchema`

### PATCH Version (`0.0.X`)

Backward-compatible bug fixes:

- Documentation updates
- Test improvements
- Internal refactoring (no API changes)

## Migration Guides

### v1.0.0

- No breaking changes from v0.0.4
- Establishes SemVer compliance baseline

### v0.0.4

**Breaking Change:** `Location` renamed to `UserLocation`

```typescript
// Before
import { Location } from "@octopus-synapse/profile-contracts";

// After
import { UserLocation } from "@octopus-synapse/profile-contracts";
```

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Run tests
bun test
```

## License

UNLICENSED - Private package

## Links

- [CHANGELOG](./CHANGELOG.md)
- [GitHub Repository](https://github.com/octopus-synapse/profile-contracts)
