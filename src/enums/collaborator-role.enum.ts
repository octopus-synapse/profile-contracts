/**
 * Collaborator Role Enum
 *
 * Defines permission levels for resume collaboration.
 */
import { z } from "zod";

/**
 * Zod schema for collaborator role validation
 */
export const CollaboratorRoleSchema = z.enum(["VIEWER", "EDITOR", "ADMIN"]);

/**
 * TypeScript type derived from Zod schema
 */
export type CollaboratorRole = z.infer<typeof CollaboratorRoleSchema>;

/**
 * Enum values for runtime use
 */
export const CollaboratorRole = {
 VIEWER: "VIEWER",
 EDITOR: "EDITOR",
 ADMIN: "ADMIN",
} as const;

/**
 * Roles that have edit permission
 */
export const EDITABLE_ROLES: CollaboratorRole[] = ["EDITOR", "ADMIN"];

/**
 * Check if a role has edit permission
 */
export function canRoleEdit(role: CollaboratorRole): boolean {
 return EDITABLE_ROLES.includes(role);
}
