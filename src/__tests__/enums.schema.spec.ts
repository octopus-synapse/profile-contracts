/**
 * Enums Schema Tests
 *
 * Tests for centralized enum definitions.
 * These enums are the single source of truth for both frontend and backend.
 */

import { describe, it, expect } from "bun:test";
import {
 UserRoleSchema,
 UserRoles,
 isUserRole,
 SkillLevelSchema,
 SkillLevels,
 isSkillLevel,
 SkillLevelToNumeric,
 NumericToSkillLevel,
 ResumeStatusSchema,
 ResumeStatuses,
 isResumeStatus,
} from "../enums";

describe("UserRoleSchema", () => {
 describe("valid roles", () => {
  it.each(["USER", "ADMIN", "APPROVER"])('should accept "%s"', (role) => {
   expect(() => UserRoleSchema.parse(role)).not.toThrow();
  });
 });

 describe("invalid roles", () => {
  it.each(["user", "admin", "SUPERUSER", "GUEST", "", null, undefined, 123])(
   "should reject %p",
   (role) => {
    expect(() => UserRoleSchema.parse(role)).toThrow();
   }
  );
 });

 describe("UserRoles const object", () => {
  it("should have all roles", () => {
   expect(UserRoles.USER).toBe("USER");
   expect(UserRoles.ADMIN).toBe("ADMIN");
   expect(UserRoles.APPROVER).toBe("APPROVER");
  });

  it("should be iterable", () => {
   const roles = Object.values(UserRoles);
   expect(roles).toHaveLength(3);
   expect(roles).toContain("USER");
   expect(roles).toContain("ADMIN");
   expect(roles).toContain("APPROVER");
  });
 });

 describe("isUserRole type guard", () => {
  it("should return true for valid roles", () => {
   expect(isUserRole("USER")).toBe(true);
   expect(isUserRole("ADMIN")).toBe(true);
   expect(isUserRole("APPROVER")).toBe(true);
  });

  it("should return false for invalid roles", () => {
   expect(isUserRole("GUEST")).toBe(false);
   expect(isUserRole("")).toBe(false);
   expect(isUserRole(null)).toBe(false);
   expect(isUserRole(undefined)).toBe(false);
  });
 });
});

describe("SkillLevelSchema", () => {
 describe("valid levels", () => {
  it.each(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"])(
   'should accept "%s"',
   (level) => {
    expect(() => SkillLevelSchema.parse(level)).not.toThrow();
   }
  );
 });

 describe("invalid levels", () => {
  it.each(["beginner", "NOVICE", "MASTER", 1, 2, 3, 4, null])(
   "should reject %p",
   (level) => {
    expect(() => SkillLevelSchema.parse(level)).toThrow();
   }
  );
 });

 describe("SkillLevels const object", () => {
  it("should have all levels in order", () => {
   expect(SkillLevels.BEGINNER).toBe("BEGINNER");
   expect(SkillLevels.INTERMEDIATE).toBe("INTERMEDIATE");
   expect(SkillLevels.ADVANCED).toBe("ADVANCED");
   expect(SkillLevels.EXPERT).toBe("EXPERT");
  });
 });

 describe("isSkillLevel type guard", () => {
  it("should return true for valid levels", () => {
   expect(isSkillLevel("BEGINNER")).toBe(true);
   expect(isSkillLevel("EXPERT")).toBe(true);
  });

  it("should return false for invalid levels", () => {
   expect(isSkillLevel("NOVICE")).toBe(false);
   expect(isSkillLevel(1)).toBe(false);
  });
 });

 describe("numeric mapping", () => {
  it("should map string to numeric", () => {
   expect(SkillLevelToNumeric.BEGINNER).toBe(1);
   expect(SkillLevelToNumeric.INTERMEDIATE).toBe(2);
   expect(SkillLevelToNumeric.ADVANCED).toBe(3);
   expect(SkillLevelToNumeric.EXPERT).toBe(4);
  });

  it("should map numeric to string", () => {
   expect(NumericToSkillLevel[1]).toBe("BEGINNER");
   expect(NumericToSkillLevel[2]).toBe("INTERMEDIATE");
   expect(NumericToSkillLevel[3]).toBe("ADVANCED");
   expect(NumericToSkillLevel[4]).toBe("EXPERT");
  });

  it("should be bidirectional", () => {
   const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;
   levels.forEach((level) => {
    const numeric = SkillLevelToNumeric[level];
    expect(NumericToSkillLevel[numeric]).toBe(level);
   });
  });
 });
});

describe("ResumeStatusSchema", () => {
 describe("valid statuses", () => {
  it.each(["DRAFT", "PRIVATE", "PENDING_APPROVAL", "PUBLISHED", "REJECTED"])(
   'should accept "%s"',
   (status) => {
    expect(() => ResumeStatusSchema.parse(status)).not.toThrow();
   }
  );
 });

 describe("invalid statuses", () => {
  it.each(["draft", "ACTIVE", "DELETED", "ARCHIVED", null])(
   "should reject %p",
   (status) => {
    expect(() => ResumeStatusSchema.parse(status)).toThrow();
   }
  );
 });

 describe("ResumeStatuses const object", () => {
  it("should have all statuses", () => {
   expect(ResumeStatuses.DRAFT).toBe("DRAFT");
   expect(ResumeStatuses.PRIVATE).toBe("PRIVATE");
   expect(ResumeStatuses.PENDING_APPROVAL).toBe("PENDING_APPROVAL");
   expect(ResumeStatuses.PUBLISHED).toBe("PUBLISHED");
   expect(ResumeStatuses.REJECTED).toBe("REJECTED");
  });
 });

 describe("isResumeStatus type guard", () => {
  it("should return true for valid statuses", () => {
   expect(isResumeStatus("DRAFT")).toBe(true);
   expect(isResumeStatus("PUBLISHED")).toBe(true);
  });

  it("should return false for invalid statuses", () => {
   expect(isResumeStatus("ACTIVE")).toBe(false);
   expect(isResumeStatus(null)).toBe(false);
  });
 });
});
