/**
 * DTOs Schema Tests
 *
 * Tests for centralized DTO definitions.
 * DTOs use Zod schemas for runtime validation.
 */

import { describe, it, expect } from "bun:test";
import {
 LoginCredentialsSchema,
 RegisterCredentialsSchema,
 ResetPasswordRequestSchema,
 NewPasswordSchema,
 ChangePasswordSchema,
 UpdateUserSchema,
 AdminUserFiltersSchema,
 CreateExperienceSchema,
 CreateEducationSchema,
 CreateSkillSchema,
 CreateLanguageSchema,
 CreateResumeSchema,
 UpdateResumeSchema,
} from "../dtos";

describe("Auth DTOs", () => {
 describe("LoginCredentialsSchema", () => {
  it("should accept valid credentials", () => {
   const credentials = {
    email: "user@example.com",
    password: "anypassword",
   };
   expect(() => LoginCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should reject invalid email", () => {
   const credentials = {
    email: "invalid-email",
    password: "password",
   };
   expect(() => LoginCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should reject empty password", () => {
   const credentials = {
    email: "user@example.com",
    password: "",
   };
   expect(() => LoginCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should NOT validate password format (allows legacy passwords)", () => {
   const credentials = {
    email: "user@example.com",
    password: "weak", // No special char, short - but allowed for login
   };
   expect(() => LoginCredentialsSchema.parse(credentials)).not.toThrow();
  });
 });

 describe("RegisterCredentialsSchema", () => {
  it("should accept valid registration", () => {
   const credentials = {
    email: "newuser@example.com",
    password: "StrongP@ss1",
    name: "John Doe",
   };
   expect(() => RegisterCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should accept registration without name", () => {
   const credentials = {
    email: "newuser@example.com",
    password: "StrongP@ss1",
   };
   expect(() => RegisterCredentialsSchema.parse(credentials)).not.toThrow();
  });

  it("should reject weak password", () => {
   const credentials = {
    email: "newuser@example.com",
    password: "weak",
   };
   expect(() => RegisterCredentialsSchema.parse(credentials)).toThrow();
  });

  it("should reject password without special char", () => {
   const credentials = {
    email: "newuser@example.com",
    password: "StrongPass1", // No special char
   };
   expect(() => RegisterCredentialsSchema.parse(credentials)).toThrow();
  });
 });

 describe("ResetPasswordRequestSchema", () => {
  it("should accept valid email", () => {
   expect(() =>
    ResetPasswordRequestSchema.parse({ email: "user@example.com" })
   ).not.toThrow();
  });

  it("should reject invalid email", () => {
   expect(() =>
    ResetPasswordRequestSchema.parse({ email: "invalid" })
   ).toThrow();
  });
 });

 describe("NewPasswordSchema", () => {
  it("should accept valid token and password", () => {
   const data = {
    token: "valid-reset-token-123",
    password: "NewStrongP@ss1",
   };
   expect(() => NewPasswordSchema.parse(data)).not.toThrow();
  });

  it("should reject empty token", () => {
   const data = {
    token: "",
    password: "NewStrongP@ss1",
   };
   expect(() => NewPasswordSchema.parse(data)).toThrow();
  });
 });

 describe("ChangePasswordSchema", () => {
  it("should accept valid password change", () => {
   const data = {
    currentPassword: "OldP@ssword1",
    newPassword: "NewStrongP@ss1",
   };
   expect(() => ChangePasswordSchema.parse(data)).not.toThrow();
  });

  it("should reject weak new password", () => {
   const data = {
    currentPassword: "OldP@ssword1",
    newPassword: "weak",
   };
   expect(() => ChangePasswordSchema.parse(data)).toThrow();
  });
 });
});

describe("User DTOs", () => {
 describe("UpdateUserSchema", () => {
  it("should accept complete update", () => {
   const update = {
    name: "Jane Doe",
    username: "janedoe",
    bio: "Software developer",
    location: "San Francisco, CA",
    website: "https://janedoe.dev",
    company: "Tech Corp",
    title: "Senior Engineer",
    phone: "+1 555 123 4567",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
   };
   expect(() => UpdateUserSchema.parse(update)).not.toThrow();
  });

  it("should accept partial update", () => {
   expect(() => UpdateUserSchema.parse({ name: "Jane" })).not.toThrow();
   expect(() => UpdateUserSchema.parse({ bio: "New bio" })).not.toThrow();
   expect(() => UpdateUserSchema.parse({})).not.toThrow();
  });

  it("should reject bio over 500 chars", () => {
   const update = { bio: "x".repeat(501) };
   expect(() => UpdateUserSchema.parse(update)).toThrow();
  });

  it("should reject invalid LinkedIn URL", () => {
   const update = { linkedin: "https://twitter.com/user" };
   expect(() => UpdateUserSchema.parse(update)).toThrow();
  });

  it("should reject invalid GitHub URL", () => {
   const update = { github: "https://gitlab.com/user" };
   expect(() => UpdateUserSchema.parse(update)).toThrow();
  });
 });

 describe("AdminUserFiltersSchema", () => {
  it("should accept valid filters", () => {
   const filters = {
    search: "john",
    role: "ADMIN",
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
   };
   expect(() => AdminUserFiltersSchema.parse(filters)).not.toThrow();
  });

  it("should apply defaults", () => {
   const result = AdminUserFiltersSchema.parse({});
   expect(result.page).toBe(1);
   expect(result.limit).toBe(20);
   expect(result.sortBy).toBe("createdAt");
   expect(result.sortOrder).toBe("desc");
  });

  it("should coerce string numbers", () => {
   const result = AdminUserFiltersSchema.parse({ page: "5", limit: "50" });
   expect(result.page).toBe(5);
   expect(result.limit).toBe(50);
  });

  it("should reject invalid role", () => {
   expect(() => AdminUserFiltersSchema.parse({ role: "SUPERUSER" })).toThrow();
  });

  it("should accept APPROVER role", () => {
   const result = AdminUserFiltersSchema.parse({ role: "APPROVER" });
   expect(result.role).toBe("APPROVER");
  });
 });
});

describe("Resume DTOs", () => {
 describe("CreateExperienceSchema", () => {
  it("should accept valid experience", () => {
   const experience = {
    company: "Tech Corp",
    position: "Software Engineer",
    startDate: "2020-01",
    current: true,
    description: "Building awesome products",
   };
   expect(() => CreateExperienceSchema.parse(experience)).not.toThrow();
  });

  it("should accept experience with end date", () => {
   const experience = {
    company: "Old Corp",
    position: "Junior Dev",
    startDate: "2018-06-01",
    endDate: "2020-01-15",
    current: false,
   };
   expect(() => CreateExperienceSchema.parse(experience)).not.toThrow();
  });

  it("should reject missing required fields", () => {
   expect(() => CreateExperienceSchema.parse({})).toThrow();
   expect(() => CreateExperienceSchema.parse({ company: "Corp" })).toThrow();
  });

  it("should reject invalid date format", () => {
   const experience = {
    company: "Corp",
    position: "Dev",
    startDate: "January 2020",
   };
   expect(() => CreateExperienceSchema.parse(experience)).toThrow();
  });
 });

 describe("CreateEducationSchema", () => {
  it("should accept valid education", () => {
   const education = {
    institution: "MIT",
    degree: "BSc",
    field: "Computer Science",
    startDate: "2014-09",
    endDate: "2018-05",
    current: false,
   };
   expect(() => CreateEducationSchema.parse(education)).not.toThrow();
  });
 });

 describe("CreateSkillSchema", () => {
  it("should accept valid skill with level", () => {
   const skill = {
    name: "TypeScript",
    level: "ADVANCED",
    category: "Programming",
   };
   expect(() => CreateSkillSchema.parse(skill)).not.toThrow();
  });

  it("should reject invalid skill level", () => {
   const skill = {
    name: "TypeScript",
    level: "MASTER", // Invalid
   };
   expect(() => CreateSkillSchema.parse(skill)).toThrow();
  });
 });

 describe("CreateLanguageSchema", () => {
  it("should accept valid language", () => {
   const language = {
    name: "English",
    level: "NATIVE",
   };
   expect(() => CreateLanguageSchema.parse(language)).not.toThrow();
  });

  it("should accept language with CEFR level", () => {
   const language = {
    name: "Spanish",
    level: "INTERMEDIATE",
    cefrLevel: "B1",
   };
   expect(() => CreateLanguageSchema.parse(language)).not.toThrow();
  });

  it("should reject invalid proficiency level", () => {
   const language = {
    name: "French",
    level: "CONVERSATIONAL", // Not in contract
   };
   expect(() => CreateLanguageSchema.parse(language)).toThrow();
  });
 });

 describe("CreateResumeSchema", () => {
  it("should accept minimal resume", () => {
   const resume = {
    title: "My Resume",
   };
   expect(() => CreateResumeSchema.parse(resume)).not.toThrow();
  });

  it("should apply defaults", () => {
   const result = CreateResumeSchema.parse({ title: "My Resume" });
   expect(result.template).toBe("PROFESSIONAL");
   expect(result.isPublic).toBe(false);
  });

  it("should accept complete resume", () => {
   const resume = {
    title: "Full Resume",
    summary: "Experienced developer",
    template: "MODERN",
    isPublic: true,
    fullName: "John Doe",
    jobTitle: "Senior Engineer",
    experiences: [
     {
      company: "Tech Corp",
      position: "Engineer",
      startDate: "2020-01",
      current: true,
     },
    ],
    skills: [{ name: "TypeScript", level: "EXPERT" }],
   };
   expect(() => CreateResumeSchema.parse(resume)).not.toThrow();
  });

  it("should reject invalid template", () => {
   const resume = {
    title: "Resume",
    template: "INVALID_TEMPLATE",
   };
   expect(() => CreateResumeSchema.parse(resume)).toThrow();
  });
 });

 describe("UpdateResumeSchema", () => {
  it("should accept partial updates", () => {
   expect(() => UpdateResumeSchema.parse({ title: "New Title" })).not.toThrow();
   expect(() => UpdateResumeSchema.parse({ isPublic: true })).not.toThrow();
   expect(() => UpdateResumeSchema.parse({})).not.toThrow();
  });
 });
});
