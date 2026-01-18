/**
 * Resume Sections Schemas Tests
 *
 * TDD tests for all resume section validation schemas.
 * Tests both valid and invalid data scenarios.
 */

import { describe, expect, test } from "bun:test";

// Core Sections
import {
 CreateExperienceSchema,
 UpdateExperienceSchema,
 ExperienceSchema,
 CreateEducationSchema,
 CreateSkillSchema,
 BulkCreateSkillsSchema,
 CreateLanguageSchema,
 CreateCertificationSchema,
 CreateProjectSchema,
} from "../../src/schemas/resume/sections";

// Advanced Sections
import {
 AchievementTypeSchema,
 CreateAchievementSchema,
 CreateAwardSchema,
 SeverityLevelSchema,
 CreateBugBountySchema,
 CreateHackathonSchema,
 CreateInterestSchema,
 OpenSourceRoleSchema,
 CreateOpenSourceSchema,
 PublicationTypeSchema,
 CreatePublicationSchema,
 CreateRecommendationSchema,
 EventTypeSchema,
 CreateTalkSchema,
} from "../../src/schemas/resume/sections";

// ============================================================================
// Core Sections Tests
// ============================================================================

describe("Experience Schema", () => {
 const validExperience = {
  company: "Tech Corp",
  position: "Senior Developer",
  location: "San Francisco, CA",
  startDate: "2020-01",
  endDate: "2023-12",
  current: false,
  description: "Led development of cloud infrastructure",
  achievements: ["Reduced costs by 40%", "Improved performance 2x"],
  skills: ["TypeScript", "AWS", "Kubernetes"],
  order: 0,
 };

 test("validates valid experience data", () => {
  const result = CreateExperienceSchema.safeParse(validExperience);
  expect(result.success).toBe(true);
 });

 test("requires company", () => {
  const invalid = { ...validExperience, company: "" };
  const result = CreateExperienceSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires position", () => {
  const invalid = { ...validExperience, position: "" };
  const result = CreateExperienceSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires startDate", () => {
  const { startDate: _startDate, ...invalid } = validExperience;
  const result = CreateExperienceSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates date format YYYY-MM", () => {
  const result = CreateExperienceSchema.safeParse({
   ...validExperience,
   startDate: "2020-01",
  });
  expect(result.success).toBe(true);
 });

 test("validates date format YYYY-MM-DD", () => {
  const result = CreateExperienceSchema.safeParse({
   ...validExperience,
   startDate: "2020-01-15",
  });
  expect(result.success).toBe(true);
 });

 test("rejects invalid date format", () => {
  const result = CreateExperienceSchema.safeParse({
   ...validExperience,
   startDate: "January 2020",
  });
  expect(result.success).toBe(false);
 });

 test("allows partial updates", () => {
  const result = UpdateExperienceSchema.safeParse({
   position: "Lead Developer",
  });
  expect(result.success).toBe(true);
 });

 test("response schema includes id and timestamps", () => {
  const response = {
   ...validExperience,
   id: "clx123abc",
   resumeId: "clx456def",
   createdAt: new Date(),
   updatedAt: new Date(),
  };
  const result = ExperienceSchema.safeParse(response);
  expect(result.success).toBe(true);
 });
});

describe("Education Schema", () => {
 const validEducation = {
  institution: "MIT",
  degree: "Bachelor of Science",
  field: "Computer Science",
  location: "Cambridge, MA",
  startDate: "2016-09",
  endDate: "2020-05",
  current: false,
  description: "Focus on distributed systems",
  gpa: "3.9",
  order: 0,
 };

 test("validates valid education data", () => {
  const result = CreateEducationSchema.safeParse(validEducation);
  expect(result.success).toBe(true);
 });

 test("requires institution", () => {
  const invalid = { ...validEducation, institution: "" };
  const result = CreateEducationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires degree", () => {
  const invalid = { ...validEducation, degree: "" };
  const result = CreateEducationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("allows current education without endDate", () => {
  const { endDate: _endDate, ...current } = validEducation;
  const result = CreateEducationSchema.safeParse({
   ...current,
   current: true,
  });
  expect(result.success).toBe(true);
 });
});

describe("Skill Schema", () => {
 const validSkill = {
  name: "TypeScript",
  level: "ADVANCED",
  category: "Programming Languages",
  yearsOfExperience: 5,
  order: 0,
 };

 test("validates valid skill data", () => {
  const result = CreateSkillSchema.safeParse(validSkill);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validSkill, name: "" };
  const result = CreateSkillSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates skill levels", () => {
  const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
  levels.forEach((level) => {
   const result = CreateSkillSchema.safeParse({ ...validSkill, level });
   expect(result.success).toBe(true);
  });
 });

 test("rejects invalid skill level", () => {
  const result = CreateSkillSchema.safeParse({
   ...validSkill,
   level: "MASTER",
  });
  expect(result.success).toBe(false);
 });

 test("bulk create validates array of skills", () => {
  const result = BulkCreateSkillsSchema.safeParse({
   skills: [validSkill, { ...validSkill, name: "JavaScript" }],
  });
  expect(result.success).toBe(true);
 });

 test("bulk create requires at least one skill", () => {
  const result = BulkCreateSkillsSchema.safeParse({ skills: [] });
  expect(result.success).toBe(false);
 });
});

describe("Language Schema", () => {
 const validLanguage = {
  name: "English",
  level: "NATIVE",
  cefrLevel: "C2",
  isNative: true,
  order: 0,
 };

 test("validates valid language data", () => {
  const result = CreateLanguageSchema.safeParse(validLanguage);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validLanguage, name: "" };
  const result = CreateLanguageSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates proficiency levels", () => {
  const levels = ["BASIC", "INTERMEDIATE", "ADVANCED", "FLUENT", "NATIVE"];
  levels.forEach((level) => {
   const result = CreateLanguageSchema.safeParse({ ...validLanguage, level });
   expect(result.success).toBe(true);
  });
 });

 test("validates CEFR levels", () => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  levels.forEach((cefrLevel) => {
   const result = CreateLanguageSchema.safeParse({
    ...validLanguage,
    cefrLevel,
   });
   expect(result.success).toBe(true);
  });
 });
});

describe("Certification Schema", () => {
 const validCertification = {
  name: "AWS Solutions Architect Professional",
  issuer: "Amazon Web Services",
  issueDate: "2023-06",
  expiryDate: "2026-06",
  credentialId: "ABC123DEF456",
  credentialUrl: "https://aws.amazon.com/verification",
  description: "Advanced cloud architecture certification",
  order: 0,
 };

 test("validates valid certification data", () => {
  const result = CreateCertificationSchema.safeParse(validCertification);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validCertification, name: "" };
  const result = CreateCertificationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires issuer", () => {
  const invalid = { ...validCertification, issuer: "" };
  const result = CreateCertificationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates credential URL format", () => {
  const invalid = {
   ...validCertification,
   credentialUrl: "not-a-url",
  };
  const result = CreateCertificationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Project Schema", () => {
 const validProject = {
  name: "Open Source Framework",
  description: "A modern TypeScript framework",
  url: "https://project.example.com",
  repositoryUrl: "https://github.com/user/project",
  imageUrl: "https://cdn.example.com/image.png",
  startDate: "2022-01",
  endDate: "2023-06",
  current: false,
  highlights: ["10k+ stars", "100+ contributors"],
  technologies: ["TypeScript", "Node.js", "PostgreSQL"],
  role: "Creator & Maintainer",
  order: 0,
 };

 test("validates valid project data", () => {
  const result = CreateProjectSchema.safeParse(validProject);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validProject, name: "" };
  const result = CreateProjectSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates URL formats", () => {
  const invalid = { ...validProject, url: "not-a-url" };
  const result = CreateProjectSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

// ============================================================================
// Advanced Sections Tests
// ============================================================================

describe("Achievement Schema", () => {
 const validAchievement = {
  type: "CERTIFICATION_BADGE",
  title: "AWS Certified Solutions Architect",
  description: "Achieved professional level certification",
  badgeUrl: "https://cdn.example.com/badge.svg",
  verificationUrl: "https://aws.amazon.com/verification",
  achievedAt: new Date("2023-06-15"),
  value: 1000,
  rank: "Top 5%",
  order: 0,
 };

 test("validates valid achievement data", () => {
  const result = CreateAchievementSchema.safeParse(validAchievement);
  expect(result.success).toBe(true);
 });

 test("validates achievement types", () => {
  const types = [
   "CERTIFICATION_BADGE",
   "PERFORMANCE_AWARD",
   "GAMIFICATION_BADGE",
   "MILESTONE",
   "RECOGNITION",
   "LEADERBOARD",
   "OTHER",
  ];
  types.forEach((type) => {
   const result = AchievementTypeSchema.safeParse(type);
   expect(result.success).toBe(true);
  });
 });

 test("requires type", () => {
  const { type: _type, ...invalid } = validAchievement;
  const result = CreateAchievementSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires title", () => {
  const invalid = { ...validAchievement, title: "" };
  const result = CreateAchievementSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Award Schema", () => {
 const validAward = {
  title: "Best Technical Innovation",
  issuer: "Tech Conference 2023",
  date: "2023-09",
  description: "Awarded for innovative cloud architecture solution",
  url: "https://conference.example.com/awards",
  order: 0,
 };

 test("validates valid award data", () => {
  const result = CreateAwardSchema.safeParse(validAward);
  expect(result.success).toBe(true);
 });

 test("requires title", () => {
  const invalid = { ...validAward, title: "" };
  const result = CreateAwardSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires issuer", () => {
  const invalid = { ...validAward, issuer: "" };
  const result = CreateAwardSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Bug Bounty Schema", () => {
 const validBugBounty = {
  platform: "HackerOne",
  company: "Tech Corp",
  severity: "CRITICAL",
  vulnerabilityType: "SQL Injection",
  cveId: "CVE-2023-12345",
  reward: 5000,
  currency: "USD",
  reportUrl: "https://hackerone.com/reports/123456",
  reportedAt: new Date("2023-03-15"),
  resolvedAt: new Date("2023-04-20"),
  order: 0,
 };

 test("validates valid bug bounty data", () => {
  const result = CreateBugBountySchema.safeParse(validBugBounty);
  expect(result.success).toBe(true);
 });

 test("validates severity levels", () => {
  const levels = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFORMATIONAL"];
  levels.forEach((severity) => {
   const result = SeverityLevelSchema.safeParse(severity);
   expect(result.success).toBe(true);
  });
 });

 test("requires platform", () => {
  const invalid = { ...validBugBounty, platform: "" };
  const result = CreateBugBountySchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires company", () => {
  const invalid = { ...validBugBounty, company: "" };
  const result = CreateBugBountySchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Hackathon Schema", () => {
 const validHackathon = {
  name: "Global AI Hackathon 2023",
  organizer: "Tech Giants Inc",
  date: "2023-06",
  location: "Virtual",
  projectName: "AI Assistant",
  projectDescription: "Intelligent code review assistant",
  projectUrl: "https://devpost.com/project",
  position: "1st Place",
  teamSize: 4,
  technologies: ["Python", "TensorFlow", "FastAPI"],
  prize: "$10,000",
  order: 0,
 };

 test("validates valid hackathon data", () => {
  const result = CreateHackathonSchema.safeParse(validHackathon);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validHackathon, name: "" };
  const result = CreateHackathonSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires organizer", () => {
  const invalid = { ...validHackathon, organizer: "" };
  const result = CreateHackathonSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Interest Schema", () => {
 const validInterest = {
  name: "Machine Learning",
  category: "Technology",
  description: "Exploring neural networks and deep learning",
  order: 0,
 };

 test("validates valid interest data", () => {
  const result = CreateInterestSchema.safeParse(validInterest);
  expect(result.success).toBe(true);
 });

 test("requires name", () => {
  const invalid = { ...validInterest, name: "" };
  const result = CreateInterestSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Open Source Schema", () => {
 const validOpenSource = {
  projectName: "Amazing Framework",
  projectUrl: "https://github.com/user/amazing-framework",
  role: "MAINTAINER",
  description: "Creator and lead maintainer",
  technologies: ["TypeScript", "Node.js"],
  commits: 500,
  prsCreated: 100,
  prsMerged: 80,
  issuesClosed: 200,
  stars: 10000,
  startDate: new Date("2020-01-15"),
  isCurrent: true,
  order: 0,
 };

 test("validates valid open source data", () => {
  const result = CreateOpenSourceSchema.safeParse(validOpenSource);
  expect(result.success).toBe(true);
 });

 test("validates open source roles", () => {
  const roles = [
   "MAINTAINER",
   "CORE_CONTRIBUTOR",
   "CONTRIBUTOR",
   "REVIEWER",
   "DOCUMENTATION",
   "TRANSLATOR",
   "OTHER",
  ];
  roles.forEach((role) => {
   const result = OpenSourceRoleSchema.safeParse(role);
   expect(result.success).toBe(true);
  });
 });

 test("requires project name", () => {
  const invalid = { ...validOpenSource, projectName: "" };
  const result = CreateOpenSourceSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates project URL", () => {
  const invalid = { ...validOpenSource, projectUrl: "not-a-url" };
  const result = CreateOpenSourceSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Publication Schema", () => {
 const validPublication = {
  title: "Scaling Microservices in Production",
  publisher: "IEEE Software",
  publicationType: "JOURNAL_ARTICLE",
  coAuthors: ["John Doe", "Jane Smith"],
  publishedAt: new Date("2023-06-15"),
  url: "https://ieeexplore.ieee.org/document/123456",
  abstract: "This paper explores strategies for scaling microservices...",
  citations: 50,
  order: 0,
 };

 test("validates valid publication data", () => {
  const result = CreatePublicationSchema.safeParse(validPublication);
  expect(result.success).toBe(true);
 });

 test("validates publication types", () => {
  const types = [
   "JOURNAL_ARTICLE",
   "CONFERENCE_PAPER",
   "BOOK",
   "BOOK_CHAPTER",
   "THESIS",
   "WHITEPAPER",
   "BLOG_POST",
   "TECHNICAL_REPORT",
   "OTHER",
  ];
  types.forEach((type) => {
   const result = PublicationTypeSchema.safeParse(type);
   expect(result.success).toBe(true);
  });
 });

 test("requires title", () => {
  const invalid = { ...validPublication, title: "" };
  const result = CreatePublicationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires publisher", () => {
  const invalid = { ...validPublication, publisher: "" };
  const result = CreatePublicationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Recommendation Schema", () => {
 const validRecommendation = {
  author: "Jane Smith",
  position: "Engineering Director",
  company: "Tech Corp",
  content:
   "John is an exceptional engineer who consistently delivers high-quality work and mentors junior developers effectively.",
  date: new Date("2023-06-15"),
  order: 0,
 };

 test("validates valid recommendation data", () => {
  const result = CreateRecommendationSchema.safeParse(validRecommendation);
  expect(result.success).toBe(true);
 });

 test("requires author", () => {
  const invalid = { ...validRecommendation, author: "" };
  const result = CreateRecommendationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires content with minimum length", () => {
  const invalid = { ...validRecommendation, content: "Short" };
  const result = CreateRecommendationSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});

describe("Talk Schema", () => {
 const validTalk = {
  title: "Building Resilient Distributed Systems",
  event: "KubeCon 2023",
  eventType: "CONFERENCE",
  date: new Date("2023-11-15"),
  location: "Chicago, IL",
  description: "A deep dive into building fault-tolerant systems",
  slidesUrl: "https://speakerdeck.com/user/talk",
  videoUrl: "https://youtube.com/watch?v=abc123",
  attendees: 500,
  order: 0,
 };

 test("validates valid talk data", () => {
  const result = CreateTalkSchema.safeParse(validTalk);
  expect(result.success).toBe(true);
 });

 test("validates event types", () => {
  const types = [
   "CONFERENCE",
   "MEETUP",
   "WORKSHOP",
   "WEBINAR",
   "PODCAST",
   "INTERNAL",
   "UNIVERSITY",
   "OTHER",
  ];
  types.forEach((eventType) => {
   const result = EventTypeSchema.safeParse(eventType);
   expect(result.success).toBe(true);
  });
 });

 test("requires title", () => {
  const invalid = { ...validTalk, title: "" };
  const result = CreateTalkSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("requires event name", () => {
  const invalid = { ...validTalk, event: "" };
  const result = CreateTalkSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });

 test("validates URL formats", () => {
  const invalid = { ...validTalk, slidesUrl: "not-a-url" };
  const result = CreateTalkSchema.safeParse(invalid);
  expect(result.success).toBe(false);
 });
});
