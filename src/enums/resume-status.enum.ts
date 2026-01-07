import { z } from "zod";

/**
 * Resume Status Enum
 *
 * Single source of truth for resume publication status.
 * Synchronized with Prisma ResumeStatus enum (if exists) or ThemeStatus pattern.
 */
export const ResumeStatusSchema = z.enum([
 "DRAFT",
 "PRIVATE",
 "PENDING_APPROVAL",
 "PUBLISHED",
 "REJECTED",
]);
export type ResumeStatus = z.infer<typeof ResumeStatusSchema>;

/**
 * Type guard for ResumeStatus
 */
export const isResumeStatus = (value: unknown): value is ResumeStatus => {
 return ResumeStatusSchema.safeParse(value).success;
};

/**
 * Resume statuses as const object
 */
export const ResumeStatuses = {
 DRAFT: "DRAFT",
 PRIVATE: "PRIVATE",
 PENDING_APPROVAL: "PENDING_APPROVAL",
 PUBLISHED: "PUBLISHED",
 REJECTED: "REJECTED",
} as const satisfies Record<ResumeStatus, ResumeStatus>;
