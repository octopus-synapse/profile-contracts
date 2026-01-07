import { z } from "zod";

/**
 * User Role Enum
 *
 * Single source of truth for user roles across all packages.
 * Synchronized with Prisma UserRole enum.
 *
 * @see profile-services/prisma/schema/enums.prisma
 */
export const UserRoleSchema = z.enum(["USER", "ADMIN", "APPROVER"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * Type guard for UserRole
 */
export const isUserRole = (value: unknown): value is UserRole => {
 return UserRoleSchema.safeParse(value).success;
};

/**
 * User roles as const object for iteration
 */
export const UserRoles = {
 USER: "USER",
 ADMIN: "ADMIN",
 APPROVER: "APPROVER",
} as const satisfies Record<UserRole, UserRole>;
