/**
 * Resume Analytics DTOs
 *
 * Zod schemas for analytics endpoints.
 * Export clean TypeScript types and validators.
 */

import { z } from "zod";

// ============================================================================
// ENUMS
// ============================================================================

export const IndustryEnum = z.enum([
  "software_engineering",
  "data_science",
  "devops",
  "product_management",
  "design",
  "marketing",
  "finance",
  "healthcare",
  "education",
  "other",
]);

export const ExperienceLevelEnum = z.enum([
  "entry",
  "junior",
  "mid",
  "senior",
  "lead",
  "principal",
  "executive",
]);

export const PeriodEnum = z.enum(["day", "week", "month", "year"]);
export const SeverityEnum = z.enum(["low", "medium", "high"]);
export const PriorityEnum = z.enum(["low", "medium", "high"]);
export const TrendEnum = z.enum(["improving", "stable", "declining"]);

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const TrackViewSchema = z.object({
  resumeId: z.string().min(1),
  userAgent: z.string().optional(),
  referer: z.string().optional(),
});

export const ViewStatsQuerySchema = z.object({
  period: PeriodEnum,
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const KeywordOptionsSchema = z.object({
  industry: IndustryEnum,
  targetRole: z.string().optional(),
});

export const JobMatchSchema = z.object({
  jobDescription: z.string().min(10),
});

export const BenchmarkOptionsSchema = z.object({
  industry: IndustryEnum,
  experienceLevel: ExperienceLevelEnum.optional(),
});

export const HistoryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const ViewStatsResponseSchema = z.object({
  totalViews: z.number().int().nonnegative(),
  uniqueVisitors: z.number().int().nonnegative(),
  viewsByDay: z.array(
    z.object({
      date: z.string(),
      count: z.number().int().nonnegative(),
    })
  ),
  topSources: z.array(
    z.object({
      source: z.string(),
      count: z.number().int().nonnegative(),
      percentage: z.number().min(0).max(100),
    })
  ),
});

export const ATSScoreResponseSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: z.object({
    keywords: z.number().min(0).max(100),
    format: z.number().min(0).max(100),
    completeness: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
  }),
  issues: z.array(
    z.object({
      type: z.string(),
      severity: SeverityEnum,
      message: z.string(),
    })
  ),
  recommendations: z.array(z.string()),
});

export const KeywordSuggestionsResponseSchema = z.object({
  existingKeywords: z.array(
    z.object({
      keyword: z.string(),
      count: z.number().int().nonnegative(),
      relevance: z.number().min(0).max(1),
    })
  ),
  missingKeywords: z.array(z.string()),
  keywordDensity: z.number().min(0).max(1),
  warnings: z.array(
    z.object({
      type: z.string(),
      message: z.string(),
      affectedKeywords: z.array(z.string()),
    })
  ),
  recommendations: z.array(z.string()),
});

export const JobMatchResponseSchema = z.object({
  matchScore: z.number().min(0).max(100),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export const BenchmarkResponseSchema = z.object({
  percentile: z.number().min(0).max(100),
  totalInIndustry: z.number().int().nonnegative(),
  comparison: z.object({
    avgATSScore: z.number().min(0).max(100),
    yourATSScore: z.number().min(0).max(100),
    avgViews: z.number().nonnegative(),
    yourViews: z.number().nonnegative(),
    avgSkillsCount: z.number().int().nonnegative(),
    yourSkillsCount: z.number().int().nonnegative(),
    avgExperienceYears: z.number().nonnegative(),
    yourExperienceYears: z.number().nonnegative(),
  }),
  topPerformers: z.object({
    commonSkills: z.array(z.string()),
    avgExperienceYears: z.number().nonnegative(),
    avgSkillsCount: z.number().int().nonnegative(),
    commonCertifications: z.array(z.string()),
  }),
  recommendations: z.array(
    z.object({
      type: z.string(),
      priority: PriorityEnum,
      message: z.string(),
      action: z.string(),
    })
  ),
});

export const DashboardResponseSchema = z.object({
  resumeId: z.string(),
  overview: z.object({
    totalViews: z.number().int().nonnegative(),
    uniqueVisitors: z.number().int().nonnegative(),
    atsScore: z.number().min(0).max(100),
    keywordScore: z.number().min(0).max(100),
    industryPercentile: z.number().min(0).max(100),
  }),
  viewTrend: z.array(
    z.object({
      date: z.string(),
      count: z.number().int().nonnegative(),
    })
  ),
  topSources: z.array(
    z.object({
      source: z.string(),
      count: z.number().int().nonnegative(),
    })
  ),
  keywordHealth: z.object({
    score: z.number().min(0).max(100),
    topKeywords: z.array(z.string()),
    missingCritical: z.array(z.string()),
  }),
  industryPosition: z.object({
    percentile: z.number().min(0).max(100),
    trend: TrendEnum,
  }),
  recommendations: z.array(
    z.object({
      type: z.string(),
      priority: PriorityEnum,
      message: z.string(),
    })
  ),
});

export const SnapshotResponseSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  atsScore: z.number().min(0).max(100),
  keywordScore: z.number().min(0).max(100),
  completenessScore: z.number().min(0).max(100),
  topKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  createdAt: z.date(),
});

export const ScoreProgressionResponseSchema = z.object({
  snapshots: z.array(
    z.object({
      date: z.date(),
      score: z.number().min(0).max(100),
    })
  ),
  trend: TrendEnum,
  changePercent: z.number(),
});

// ============================================================================
// TYPESCRIPT TYPES (Inferred from Zod schemas)
// ============================================================================

export type Industry = z.infer<typeof IndustryEnum>;
export type ExperienceLevel = z.infer<typeof ExperienceLevelEnum>;
export type Period = z.infer<typeof PeriodEnum>;
export type Severity = z.infer<typeof SeverityEnum>;
export type Priority = z.infer<typeof PriorityEnum>;
export type Trend = z.infer<typeof TrendEnum>;

export type TrackView = z.infer<typeof TrackViewSchema>;
export type ViewStatsQuery = z.infer<typeof ViewStatsQuerySchema>;
export type KeywordOptions = z.infer<typeof KeywordOptionsSchema>;
export type JobMatch = z.infer<typeof JobMatchSchema>;
export type BenchmarkOptions = z.infer<typeof BenchmarkOptionsSchema>;
export type HistoryQuery = z.infer<typeof HistoryQuerySchema>;

export type ViewStatsResponse = z.infer<typeof ViewStatsResponseSchema>;
export type ATSScoreResponse = z.infer<typeof ATSScoreResponseSchema>;
export type KeywordSuggestionsResponse = z.infer<
  typeof KeywordSuggestionsResponseSchema
>;
export type JobMatchResponse = z.infer<typeof JobMatchResponseSchema>;
export type BenchmarkResponse = z.infer<typeof BenchmarkResponseSchema>;
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
export type SnapshotResponse = z.infer<typeof SnapshotResponseSchema>;
export type ScoreProgressionResponse = z.infer<
  typeof ScoreProgressionResponseSchema
>;
