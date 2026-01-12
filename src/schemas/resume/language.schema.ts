import { z } from "zod";
import {
  LanguageProficiencyEnum,
  CefrLevelEnum,
} from "../../validations/onboarding-data.schema";

/**
 * Create Language Schema
 */
export const CreateLanguageSchema = z.object({
  name: z.string().min(1, "Language is required").max(50),
  level: LanguageProficiencyEnum,
  cefrLevel: CefrLevelEnum.optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateLanguage = z.infer<typeof CreateLanguageSchema>;

/**
 * Update Language Schema
 */
export const UpdateLanguageSchema = CreateLanguageSchema.partial();

export type UpdateLanguage = z.infer<typeof UpdateLanguageSchema>;
