import { describe, it, expect } from "bun:test";
import { ResumeDslSchema } from "../dsl/resume-dsl.schema";
import {
 completeResumeDsl,
 minimalResumeDsl,
 resumeDslWithoutItemOverrides,
 invalidResumeDsls,
} from "./fixtures/resume-dsl.fixture";

describe("resume-dsl.schema", () => {
 describe("ResumeDslSchema", () => {
  it("should validate complete resume DSL", () => {
   const result = ResumeDslSchema.parse(completeResumeDsl);
   expect(result).toEqual(completeResumeDsl);
  });

  it("should validate minimal resume DSL", () => {
   const result = ResumeDslSchema.parse(minimalResumeDsl);
   expect(result).toEqual(minimalResumeDsl);
  });

  it("should allow optional itemOverrides", () => {
   const result = ResumeDslSchema.parse(resumeDslWithoutItemOverrides);
   expect(result.itemOverrides).toBeUndefined();
  });

  it("should enforce required fields", () => {
   expect(() =>
    ResumeDslSchema.parse({
     // version missing
     layout: completeResumeDsl.layout,
     tokens: completeResumeDsl.tokens,
     sections: completeResumeDsl.sections,
    })
   ).toThrow();

   expect(() =>
    ResumeDslSchema.parse({
     version: "1.0.0",
     // layout missing
     tokens: completeResumeDsl.tokens,
     sections: completeResumeDsl.sections,
    })
   ).toThrow();

   expect(() =>
    ResumeDslSchema.parse({
     version: "1.0.0",
     layout: completeResumeDsl.layout,
     // tokens missing
     sections: completeResumeDsl.sections,
    })
   ).toThrow();

   expect(() =>
    ResumeDslSchema.parse({
     version: "1.0.0",
     layout: completeResumeDsl.layout,
     tokens: completeResumeDsl.tokens,
     // sections missing
    })
   ).toThrow();
  });

  it("should validate version as string", () => {
   const validVersions = ["1.0.0", "2.0", "v1", "latest"];

   validVersions.forEach((version) => {
    expect(() =>
     ResumeDslSchema.parse({
      ...minimalResumeDsl,
      version,
     })
    ).not.toThrow();
   });

   expect(() =>
    ResumeDslSchema.parse({
     ...minimalResumeDsl,
     version: 1.0, // number not allowed
    })
   ).toThrow();
  });

  it("should validate nested layout configuration", () => {
   const dsl = {
    ...completeResumeDsl,
    layout: {
     type: "single-column",
     paperSize: "a4",
     margins: "normal",
     pageBreakBehavior: "auto",
    },
   };

   expect(() => ResumeDslSchema.parse(dsl)).not.toThrow();
  });

  it("should validate nested design tokens", () => {
   const dsl = {
    ...completeResumeDsl,
    tokens: {
     typography: {
      fontFamily: {
       heading: "playfair-display",
       body: "source-serif",
      },
      fontSize: "lg",
      headingStyle: "accent-border",
     },
     colors: completeResumeDsl.tokens.colors,
     spacing: completeResumeDsl.tokens.spacing,
    },
   };

   expect(() => ResumeDslSchema.parse(dsl)).not.toThrow();
  });

  it("should validate sections array", () => {
   const dslWithManySections = {
    ...completeResumeDsl,
    sections: [
     { id: "summary", visible: true, order: 0, column: "full-width" },
     { id: "experience", visible: true, order: 1, column: "main" },
     { id: "education", visible: true, order: 2, column: "main" },
     { id: "skills", visible: true, order: 0, column: "sidebar" },
     { id: "languages", visible: true, order: 1, column: "sidebar" },
     { id: "projects", visible: true, order: 3, column: "main" },
     { id: "certifications", visible: false, order: 4, column: "main" },
     { id: "awards", visible: true, order: 2, column: "sidebar" },
    ],
   };

   expect(() => ResumeDslSchema.parse(dslWithManySections)).not.toThrow();
  });

  it("should validate itemOverrides with multiple sections", () => {
   const result = ResumeDslSchema.parse(completeResumeDsl);
   expect(result.itemOverrides).toBeDefined();
   expect(result.itemOverrides?.experience).toHaveLength(3);
   expect(result.itemOverrides?.education).toHaveLength(2);
  });

  it("should reject invalid resume DSLs", () => {
   invalidResumeDsls.forEach(({ description, data }) => {
    expect(() => ResumeDslSchema.parse(data)).toThrow();
   });
  });

  it("should reject invalid section column", () => {
   expect(() =>
    ResumeDslSchema.parse({
     version: "1.0.0",
     layout: completeResumeDsl.layout,
     tokens: completeResumeDsl.tokens,
     sections: [
      {
       id: "experience",
       visible: true,
       order: 1,
       column: "left-side", // not a valid column id
      },
     ],
    })
   ).toThrow();
  });

  it("should reject invalid nested schema values", () => {
   // Invalid layout type
   expect(() =>
    ResumeDslSchema.parse({
     ...completeResumeDsl,
     layout: {
      ...completeResumeDsl.layout,
      type: "three-column",
     },
    })
   ).toThrow();

   // Invalid font family
   expect(() =>
    ResumeDslSchema.parse({
     ...completeResumeDsl,
     tokens: {
      ...completeResumeDsl.tokens,
      typography: {
       ...completeResumeDsl.tokens.typography,
       fontFamily: {
        heading: "comic-sans",
        body: "roboto",
       },
      },
     },
    })
   ).toThrow();

   // Invalid column ID
   expect(() =>
    ResumeDslSchema.parse({
     ...completeResumeDsl,
     sections: [
      {
       id: "summary",
       visible: true,
       order: 0,
       column: "left-side", // invalid
      },
     ],
    })
   ).toThrow();
  });

  it("should provide correct TypeScript types", () => {
   const dsl = ResumeDslSchema.parse(completeResumeDsl);

   const version: string = dsl.version;
   const layoutType: string = dsl.layout.type;
   const fontSize: string = dsl.tokens.typography.fontSize;
   const sections: Array<any> = dsl.sections;
   const itemOverrides: Record<string, any> | undefined = dsl.itemOverrides;

   expect(version).toBe("1.0.0");
   expect(layoutType).toBe("two-column");
   expect(fontSize).toBe("base");
   expect(sections.length).toBeGreaterThan(0);
   expect(itemOverrides).toBeDefined();
  });

  it("should validate complex complete DSL structure", () => {
   const complexDsl = {
    version: "2.0.0",
    layout: {
     type: "magazine",
     paperSize: "letter",
     margins: "wide",
     columnDistribution: "50-50",
     pageBreakBehavior: "section-aware",
     showPageNumbers: true,
     pageNumberPosition: "bottom-center",
    },
    tokens: {
     typography: {
      fontFamily: {
       heading: "playfair-display",
       body: "merriweather",
      },
      fontSize: "lg",
      headingStyle: "accent-border",
     },
     colors: {
      colors: {
       primary: "#1e40af",
       secondary: "#7c3aed",
       background: "#fefefe",
       surface: "#f9fafb",
       text: {
        primary: "#111827",
        secondary: "#6b7280",
        accent: "#1e40af",
       },
       border: "#d1d5db",
       divider: "#e5e7eb",
      },
      borderRadius: "lg",
      shadows: "medium",
      gradients: {
       enabled: true,
       direction: "diagonal",
      },
     },
     spacing: {
      density: "spacious",
      sectionGap: "xl",
      itemGap: "lg",
      contentPadding: "lg",
     },
    },
    sections: [
     { id: "summary", visible: true, order: 0, column: "full-width" },
     { id: "experience", visible: true, order: 1, column: "main" },
     { id: "skills", visible: true, order: 0, column: "sidebar" },
    ],
    itemOverrides: {
     experience: [
      { itemId: "exp-1", visible: true, order: 0 },
      { itemId: "exp-2", visible: true, order: 1 },
      { itemId: "exp-3", visible: false, order: 2 },
     ],
    },
   };

   const result = ResumeDslSchema.parse(complexDsl);
   expect(result).toEqual(complexDsl);
  });
 });
});
