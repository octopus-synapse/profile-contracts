import type {
 SectionConfig,
 SectionItemOverrides,
} from "../../dsl/sections.schema";

export const validSectionConfigs: SectionConfig[] = [
 {
  id: "summary",
  visible: true,
  order: 0,
  column: "full-width",
 },
 {
  id: "experience",
  visible: true,
  order: 1,
  column: "main",
 },
 {
  id: "education",
  visible: true,
  order: 2,
  column: "main",
 },
 {
  id: "skills",
  visible: true,
  order: 0,
  column: "sidebar",
 },
 {
  id: "languages",
  visible: true,
  order: 1,
  column: "sidebar",
 },
 {
  id: "certifications",
  visible: false,
  order: 3,
  column: "main",
 },
];

export const validItemOverrides: SectionItemOverrides = {
 experience: [
  {
   itemId: "exp-1",
   visible: true,
   order: 0,
  },
  {
   itemId: "exp-2",
   visible: true,
   order: 1,
  },
  {
   itemId: "exp-3",
   visible: false,
   order: 2,
  },
 ],
 education: [
  {
   itemId: "edu-1",
   visible: true,
   order: 0,
  },
  {
   itemId: "edu-2",
   visible: true,
   order: 1,
  },
 ],
};

export const invalidSectionConfigs = [
 {
  description: "invalid column",
  data: {
   id: "summary",
   visible: true,
   order: 0,
   column: "left-column" as any,
  },
 },
 {
  description: "missing required field",
  data: {
   id: "experience",
   visible: true,
   // order missing
   column: "main",
  },
 },
 {
  description: "invalid order type",
  data: {
   id: "skills",
   visible: true,
   order: "first" as any,
   column: "sidebar",
  },
 },
];
