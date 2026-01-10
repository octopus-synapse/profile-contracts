/**
 * GraphQL Integration Utilities
 *
 * Provides utilities for integrating Zod schemas with NestJS GraphQL.
 *
 * Architecture Decision:
 * Zod schemas remain the single source of truth for validation.
 * GraphQL inputs are thin wrappers that leverage Zod for runtime validation.
 *
 * Usage Pattern:
 * 1. Define Zod schema in profile-contracts (already exists)
 * 2. Create GraphQL InputType class using zodToGraphQLFields() for metadata
 * 3. Use ZodValidationPipe for runtime validation
 */

import { z } from "zod";

/**
 * Field metadata extracted from Zod schema for GraphQL field configuration
 */
export interface GraphQLFieldMeta {
 /**
  * Field name
  */
 name: string;

 /**
  * Whether the field is optional/nullable
  */
 nullable: boolean;

 /**
  * GraphQL type hint (String, Int, Boolean, Float, [String])
  */
 graphqlType:
  | "String"
  | "Int"
  | "Float"
  | "Boolean"
  | "[String]"
  | "[Int]"
  | "ID"
  | "unknown";

 /**
  * Description from Zod schema (if available)
  */
 description?: string;

 /**
  * Default value (if defined in schema)
  */
 defaultValue?: unknown;
}

/**
 * Infers GraphQL type from Zod schema type
 */
function inferGraphQLType(
 schema: z.ZodTypeAny
): GraphQLFieldMeta["graphqlType"] {
 // Unwrap optional, nullable, default wrappers
 let inner = schema;

 while (
  inner instanceof z.ZodOptional ||
  inner instanceof z.ZodNullable ||
  inner instanceof z.ZodDefault
 ) {
  inner = inner._def.innerType;
 }

 if (inner instanceof z.ZodString) return "String";
 if (inner instanceof z.ZodNumber) {
  // Check if it's an integer
  const checks = (inner._def as z.ZodNumberDef).checks || [];
  const isInt = checks.some((c: { kind: string }) => c.kind === "int");
  return isInt ? "Int" : "Float";
 }
 if (inner instanceof z.ZodBoolean) return "Boolean";
 if (inner instanceof z.ZodArray) {
  const elementType = inferGraphQLType(inner._def.type);
  if (elementType === "String") return "[String]";
  if (elementType === "Int") return "[Int]";
 }
 if (inner instanceof z.ZodEnum) return "String";

 return "unknown";
}

/**
 * Checks if a Zod schema field is optional/nullable
 */
function isFieldNullable(schema: z.ZodTypeAny): boolean {
 return (
  schema instanceof z.ZodOptional ||
  schema instanceof z.ZodNullable ||
  schema.isOptional()
 );
}

/**
 * Extracts default value from Zod schema if present
 */
function extractDefaultValue(schema: z.ZodTypeAny): unknown | undefined {
 if (schema instanceof z.ZodDefault) {
  return schema._def.defaultValue();
 }
 return undefined;
}

/**
 * Extracts GraphQL field metadata from a Zod object schema
 *
 * @example
 * ```typescript
 * const fields = zodToGraphQLFields(CreateExperienceSchema);
 * // Returns array of field metadata for GraphQL InputType configuration
 * ```
 */
export function zodToGraphQLFields<T extends z.ZodRawShape>(
 schema: z.ZodObject<T>
): GraphQLFieldMeta[] {
 const shape = schema.shape;
 const fields: GraphQLFieldMeta[] = [];

 for (const [name, fieldSchema] of Object.entries(shape)) {
  const zodSchema = fieldSchema as z.ZodTypeAny;

  fields.push({
   name,
   nullable: isFieldNullable(zodSchema),
   graphqlType: inferGraphQLType(zodSchema),
   defaultValue: extractDefaultValue(zodSchema),
  });
 }

 return fields;
}

/**
 * Creates a partial version of field metadata (all fields become nullable)
 * Useful for Update DTOs
 */
export function makeFieldsPartial(
 fields: GraphQLFieldMeta[]
): GraphQLFieldMeta[] {
 return fields.map((field) => ({
  ...field,
  nullable: true,
 }));
}

/**
 * Type helper: Infer TypeScript type from Zod schema
 * Re-exported for convenience
 */
export type InferSchema<T extends z.ZodTypeAny> = z.infer<T>;

/**
 * Generates a documentation comment for GraphQL InputType based on Zod schema
 */
export function generateInputTypeDoc<T extends z.ZodRawShape>(
 schema: z.ZodObject<T>,
 inputTypeName: string
): string {
 const fields = zodToGraphQLFields(schema);
 const requiredFields = fields.filter((f) => !f.nullable);
 const optionalFields = fields.filter((f) => f.nullable);

 return `/**
 * ${inputTypeName}
 *
 * Generated from Zod schema. Validation is handled by ZodValidationPipe.
 *
 * Required fields: ${requiredFields.map((f) => f.name).join(", ") || "none"}
 * Optional fields: ${optionalFields.map((f) => f.name).join(", ") || "none"}
 */`;
}
