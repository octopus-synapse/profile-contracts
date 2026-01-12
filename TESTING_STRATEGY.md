# Testing Strategy with Bun

## Test Philosophy (Uncle Bob Style)

> "Tests are specifications. They describe what the system does, not how it does it."
> — Robert C. Martin

### Principles

1. **Test Behavior, Not Implementation**
   - Assert on observable outcomes
   - Ignore internal details
   - Tests should survive refactoring

2. **Tests Are First-Class Citizens**
   - Clean, readable, maintainable
   - Follow same standards as production code
   - One assertion per concept

3. **Coverage Targets by Layer**
   - Factories (validators): **100%** (critical infrastructure)
   - Schemas: **90%+** (boundary tests for all rules)
   - Integration: **80%+** (happy paths + error paths)

## Test Structure

```
tests/
├── validators/              # Critical: 100% coverage
│   └── validator.test.ts
├── schemas/                 # Important: 90%+ coverage
│   ├── auth.test.ts
│   ├── resume.test.ts
│   └── primitives.test.ts
└── integration/             # Nice-to-have: 80%+ coverage
    └── validation.test.ts
```

## Running Tests

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Coverage report
bun test --coverage

# Run specific test file
bun test tests/validators/validator.test.ts

# Run tests matching pattern
bun test --test-name-pattern="EmailSchema"
```

## Test Categories

### 1. Validator Tests (CRITICAL - 100% coverage)

**Why critical?** If `validate()` has a bug, ALL validators inherit the bug.

**What to test:**
- ✅ Success cases (valid data returns success)
- ✅ Failure cases (invalid data returns errors)
- ✅ Error structure (path, message, code)
- ✅ Nested objects and arrays
- ✅ Type coercion and transformations
- ✅ Edge cases (null, undefined, empty)

**Example:**
```typescript
describe("validate()", () => {
  it("should return success for valid data", () => {
    const schema = z.object({ name: z.string() });
    const result = validate(schema, { name: "John" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John");
    }
  });
});
```

### 2. Schema Tests (HIGH PRIORITY - 90%+ coverage)

**Why important?** Schemas are the contracts between frontend and backend.

**What to test:**
- ✅ Boundary conditions (min/max length, min/max values)
- ✅ Format validation (email, URL, date)
- ✅ Required vs optional fields
- ✅ Type coercion (string → date, string → number)
- ✅ Transformations (trim, lowercase, etc)
- ✅ Error messages (user-facing)

**Example:**
```typescript
describe("PasswordSchema", () => {
  it(`should reject password shorter than ${PASSWORD_POLICY.minLength}`, () => {
    const short = "aA1@xxx";
    expect(() => PasswordSchema.parse(short)).toThrow(/8 characters/);
  });

  it("should reject password without uppercase", () => {
    expect(() => PasswordSchema.parse("aa1@aaaa")).toThrow(/uppercase/i);
  });
});
```

### 3. Integration Tests (NICE-TO-HAVE - 80%+ coverage)

**Why useful?** Validates that schemas compose correctly.

**What to test:**
- ✅ Complex nested schemas
- ✅ Schema composition (unions, intersections)
- ✅ Cross-schema dependencies
- ✅ Real-world data examples

**Example:**
```typescript
describe("User Registration Flow", () => {
  it("should validate complete registration data", () => {
    const data = {
      email: "user@example.com",
      password: "P@ssw0rd123",
      name: "John Doe",
    };

    const result = validate(RegisterCredentialsSchema, data);
    expect(result.success).toBe(true);
  });
});
```

## Test Naming Conventions

### Good Test Names (Describes behavior)
```typescript
it("should reject email without @ symbol")
it("should transform email to lowercase")
it("should return error with path 'user.email'")
```

### Bad Test Names (Describes implementation)
```typescript
it("should call EmailSchema.parse()")
it("should use regex /^[a-z]+$/")
it("should throw ZodError")
```

## Test Organization

### Arrange-Act-Assert Pattern

```typescript
it("should reject invalid email", () => {
  // Arrange
  const invalidEmail = "not-an-email";

  // Act
  const result = validate(EmailSchema, invalidEmail);

  // Assert
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.errors[0].message).toContain("email");
  }
});
```

## Coverage Requirements

### Must Have (Blocking)
- `validators/validator.ts`: **100%**
- Password schemas: **100%** (security critical)
- Email schema: **100%** (used everywhere)

### Should Have (High Priority)
- Auth schemas: **90%+**
- Resume schemas: **90%+**
- Common schemas: **90%+**

### Nice to Have
- Integration tests: **80%+**
- Edge case scenarios: **70%+**

## Running Coverage

```bash
# Generate coverage report
bun test --coverage

# Coverage will be in coverage/ directory
# Open coverage/index.html in browser
```

## Coverage Thresholds (package.json)

```json
{
  "scripts": {
    "test": "bun test",
    "test:coverage": "bun test --coverage",
    "test:watch": "bun test --watch"
  }
}
```

## CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test --coverage
      - name: Check coverage
        run: |
          # Fail if coverage below threshold
          bun test --coverage --coverage-threshold=90
```

## What NOT to Test

❌ **Don't test Zod internals**
```typescript
// BAD - testing Zod, not your code
it("should use z.string().email()", () => {
  expect(EmailSchema._def.typeName).toBe("ZodString");
});
```

❌ **Don't test implementation details**
```typescript
// BAD - testing how, not what
it("should call safeParse internally", () => {
  const spy = jest.spyOn(schema, "safeParse");
  validate(schema, data);
  expect(spy).toHaveBeenCalled();
});
```

❌ **Don't test framework behavior**
```typescript
// BAD - testing NestJS, not your code
it("should throw BadRequestException", () => {
  // This test belongs in profile-services, not contracts
});
```

## Summary

| Layer | Priority | Coverage | Why |
|-------|----------|----------|-----|
| Validators | CRITICAL | 100% | If broken, everything breaks |
| Schemas | HIGH | 90%+ | Contract between frontend/backend |
| Integration | MEDIUM | 80%+ | Validates composition |

**Remember:** Tests are specifications. They tell you what the system does. If a test breaks, either:
1. The system is broken (fix the code), OR
2. The specification changed (update the test)

Never update a test just to make it pass. That's lying to yourself.
