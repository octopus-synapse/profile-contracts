import { z } from "zod";

/**
 * User Role Enum
 * Defines the different roles that a user can have in the system
 */
export const UserRoleSchema = z.enum(["USER", "ADMIN", "APPROVER"]);

export type UserRole = z.infer<typeof UserRoleSchema>;
