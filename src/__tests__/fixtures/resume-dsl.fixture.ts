import type { ResumeDsl } from "../../dsl/resume-dsl.schema";
import { validDesignTokens, minimalDesignTokens } from "./tokens.fixture";
import { twoColumnLayout, singleColumnLayout } from "./layout.fixture";
import { validSectionConfigs, validItemOverrides } from "./sections.fixture";

export const completeResumeDsl: ResumeDsl = {
 version: "1.0.0",
 layout: twoColumnLayout,
 tokens: validDesignTokens,
 sections: validSectionConfigs,
 itemOverrides: validItemOverrides,
};

export const minimalResumeDsl: ResumeDsl = {
 version: "1.0.0",
 layout: singleColumnLayout,
 tokens: minimalDesignTokens,
 sections: [
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
 ],
};

export const resumeDslWithoutItemOverrides: ResumeDsl = {
 version: "1.0.0",
 layout: twoColumnLayout,
 tokens: validDesignTokens,
 sections: validSectionConfigs,
 // itemOverrides is optional
};

export const invalidResumeDsls = [
 {
  description: "missing version",
  data: {
   layout: twoColumnLayout,
   tokens: validDesignTokens,
   sections: validSectionConfigs,
  },
 },
 {
  description: "invalid version format",
  data: {
   version: 1.0, // should be string
   layout: twoColumnLayout,
   tokens: validDesignTokens,
   sections: validSectionConfigs,
  },
 },
 {
  description: "invalid section column",
  data: {
   version: "1.0.0",
   layout: twoColumnLayout,
   tokens: validDesignTokens,
   sections: [
    {
     id: "experience",
     visible: true,
     order: 1,
     column: "left-side" as any, // invalid column id
    },
   ],
  },
 },
 {
  description: "invalid nested token",
  data: {
   version: "1.0.0",
   layout: twoColumnLayout,
   tokens: {
    ...validDesignTokens,
    typography: {
     ...validDesignTokens.typography,
     fontSize: "extra-large" as any,
    },
   },
   sections: validSectionConfigs,
  },
 },
];
