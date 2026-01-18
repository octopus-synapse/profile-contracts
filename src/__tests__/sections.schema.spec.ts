import { describe, it, expect } from "bun:test";
import {
 SectionConfigSchema,
 SectionItemOverridesSchema,
 SectionIdSchema,
 ColumnIdSchema,
 ItemOverrideSchema,
} from "../dsl/sections.schema";
import {
 validSectionConfigs,
 validItemOverrides,
 invalidSectionConfigs,
} from "./fixtures/sections.fixture";

describe("sections.schema", () => {
 describe("SectionIdSchema", () => {
  it("should validate valid section IDs", () => {
   [
    "basics",
    "experience",
    "education",
    "skills",
    "languages",
    "certifications",
    "projects",
    "publications",
    "awards",
    "interests",
    "references",
    "summary",
    "objective",
    "volunteer",
   ].forEach((id) => {
    expect(() => SectionIdSchema.parse(id)).not.toThrow();
   });
  });

  it("should reject non-string values", () => {
   expect(() => SectionIdSchema.parse(123)).toThrow();
   expect(() => SectionIdSchema.parse(null)).toThrow();
  });
 });

 describe("ColumnIdSchema", () => {
  it("should validate valid column IDs", () => {
   ["main", "sidebar", "full-width"].forEach((id) => {
    expect(() => ColumnIdSchema.parse(id)).not.toThrow();
   });
  });

  it("should reject invalid column IDs", () => {
   expect(() => ColumnIdSchema.parse("left-column")).toThrow();
   expect(() => ColumnIdSchema.parse("right")).toThrow();
  });
 });

 describe("SectionConfigSchema", () => {
  it("should validate complete section config", () => {
   const config = {
    id: "experience",
    visible: true,
    order: 1,
    column: "main",
   };

   const result = SectionConfigSchema.parse(config);
   expect(result).toEqual(config);
  });

  it("should validate all valid section configs", () => {
   validSectionConfigs.forEach((config) => {
    expect(() => SectionConfigSchema.parse(config)).not.toThrow();
   });
  });

  it("should enforce required fields", () => {
   expect(() =>
    SectionConfigSchema.parse({
     id: "summary",
     visible: true,
     // order missing
     column: "main",
    })
   ).toThrow();

   expect(() =>
    SectionConfigSchema.parse({
     id: "summary",
     // visible missing
     order: 0,
     column: "main",
    })
   ).toThrow();
  });

  it("should validate boolean visible field", () => {
   const visible = {
    id: "skills",
    visible: true,
    order: 0,
    column: "sidebar",
   };

   const hidden = {
    id: "certifications",
    visible: false,
    order: 3,
    column: "main",
   };

   expect(() => SectionConfigSchema.parse(visible)).not.toThrow();
   expect(() => SectionConfigSchema.parse(hidden)).not.toThrow();

   expect(() =>
    SectionConfigSchema.parse({
     ...visible,
     visible: "true", // string not allowed
    })
   ).toThrow();
  });

  it("should validate numeric order field", () => {
   const config = {
    id: "education",
    visible: true,
    order: 5,
    column: "main",
   };

   expect(() => SectionConfigSchema.parse(config)).not.toThrow();

   expect(() =>
    SectionConfigSchema.parse({
     ...config,
     order: "1", // string not allowed
    })
   ).toThrow();
  });

  it("should reject invalid section configs", () => {
   invalidSectionConfigs.forEach(({ description: _description, data }) => {
    expect(() => SectionConfigSchema.parse(data)).toThrow();
   });
  });
 });

 describe("ItemOverrideSchema", () => {
  it("should validate complete item override", () => {
   const override = {
    itemId: "exp-1",
    visible: true,
    order: 0,
   };

   const result = ItemOverrideSchema.parse(override);
   expect(result).toEqual(override);
  });

  it("should enforce required fields", () => {
   expect(() =>
    ItemOverrideSchema.parse({
     itemId: "exp-1",
     visible: true,
     // order missing
    })
   ).toThrow();
  });

  it("should validate hidden items", () => {
   const hidden = {
    itemId: "exp-old",
    visible: false,
    order: 99,
   };

   expect(() => ItemOverrideSchema.parse(hidden)).not.toThrow();
  });
 });

 describe("SectionItemOverridesSchema", () => {
  it("should validate complete item overrides", () => {
   const result = SectionItemOverridesSchema.parse(validItemOverrides);
   expect(result).toEqual(validItemOverrides);
  });

  it("should validate empty overrides object", () => {
   const empty = {};
   expect(() => SectionItemOverridesSchema.parse(empty)).not.toThrow();
  });

  it("should validate single section overrides", () => {
   const singleSection = {
    experience: [
     {
      itemId: "exp-1",
      visible: true,
      order: 0,
     },
    ],
   };

   const result = SectionItemOverridesSchema.parse(singleSection);
   expect(result).toEqual(singleSection);
  });

  it("should validate multiple sections with overrides", () => {
   const result = SectionItemOverridesSchema.parse(validItemOverrides);
   expect(Object.keys(result)).toContain("experience");
   expect(Object.keys(result)).toContain("education");
   expect(result.experience).toHaveLength(3);
   expect(result.education).toHaveLength(2);
  });

  it("should reject invalid override arrays", () => {
   expect(() =>
    SectionItemOverridesSchema.parse({
     experience: [
      {
       itemId: "exp-1",
       visible: "yes", // should be boolean
       order: 0,
      },
     ],
    })
   ).toThrow();
  });

  it("should provide correct TypeScript types", () => {
   const overrides = SectionItemOverridesSchema.parse(validItemOverrides);

   const expOverrides = overrides.experience;
   if (expOverrides) {
    const firstOverride = expOverrides[0];
    const itemId: string = firstOverride.itemId;
    const visible: boolean = firstOverride.visible;
    const order: number = firstOverride.order;

    expect(itemId).toBe("exp-1");
    expect(visible).toBe(true);
    expect(order).toBe(0);
   }
  });
 });
});
