/**
 * Translation DTOs
 */

import { z } from "zod";

export const TranslateTextSchema = z.object({
 text: z.string().min(1),
 sourceLanguage: z.string().min(2).max(10),
 targetLanguage: z.string().min(2).max(10),
});

export type TranslateText = z.infer<typeof TranslateTextSchema>;

export const TranslateBatchSchema = z.object({
 texts: z.array(z.string().min(1)),
 sourceLanguage: z.string().min(2).max(10),
 targetLanguage: z.string().min(2).max(10),
});

export type TranslateBatch = z.infer<typeof TranslateBatchSchema>;
