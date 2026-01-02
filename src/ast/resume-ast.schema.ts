import { z } from "zod";
import { SectionDataSchema } from "./section-data.schema";

// Resolved Style Values (Concrete values, not tokens)
export const ResolvedTypographySchema = z.object({
 fontFamily: z.string(), // e.g., "Inter, sans-serif"
 fontSizePx: z.number(),
 lineHeight: z.number(),
 fontWeight: z.number(), // 400, 700
 textTransform: z.enum(["none", "uppercase", "lowercase", "capitalize"]),
 textDecoration: z.enum(["none", "underline", "line-through"]),
});

export const ResolvedBoxStyleSchema = z.object({
 backgroundColor: z.string(), // Hex
 borderColor: z.string(),
 borderWidthPx: z.number(),
 borderRadiusPx: z.number(),
 paddingPx: z.number(),
 marginBottomPx: z.number(),
 shadow: z.string().optional(), // CSS box-shadow string
});

// Layout Structure
export const ColumnDefinitionSchema = z.object({
 id: z.string(), // 'main', 'sidebar'
 widthPercentage: z.number(), // 70, 30
 order: z.number(),
});

export const PageLayoutSchema = z.object({
 widthMm: z.number(), // 210 for A4
 heightMm: z.number(), // 297 for A4
 marginTopMm: z.number(),
 marginBottomMm: z.number(),
 marginLeftMm: z.number(),
 marginRightMm: z.number(),
 columns: z.array(ColumnDefinitionSchema),
 columnGapMm: z.number(),
});

// Content Placement
export const PlacedSectionSchema = z.object({
 sectionId: z.string(),
 columnId: z.string(), // Reference to ColumnDefinition.id
 order: z.number(),
 data: SectionDataSchema, // Resolved data for this section
 // Resolved styles for this specific section instance
 styles: z.object({
  container: ResolvedBoxStyleSchema,
  title: ResolvedTypographySchema,
  content: ResolvedTypographySchema,
 }),
});

export const ResumeAstSchema = z.object({
 meta: z.object({
  version: z.string(),
  generatedAt: z.string(), // ISO date
 }),
 page: PageLayoutSchema,
 sections: z.array(PlacedSectionSchema),
 globalStyles: z.object({
  background: z.string(),
  textPrimary: z.string(),
  textSecondary: z.string(),
  accent: z.string(),
 }),
});

export type ResumeAst = z.infer<typeof ResumeAstSchema>;
