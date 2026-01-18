import { describe, it, expect } from "bun:test";
import {
 LayoutConfigSchema,
 LayoutTypeSchema,
 PaperSizeSchema,
 MarginSizeSchema,
 ColumnDistributionSchema,
 PageBreakBehaviorSchema,
 PageNumberPositionSchema,
} from "../dsl/layout.schema";
import {
 singleColumnLayout,
 twoColumnLayout,
 sidebarLeftLayout,
 magazineLayout,
 invalidLayouts,
} from "./fixtures/layout.fixture";

describe("layout.schema", () => {
 describe("LayoutTypeSchema", () => {
  it("should validate all layout types", () => {
   const types = [
    "single-column",
    "two-column",
    "sidebar-left",
    "sidebar-right",
    "magazine",
    "compact",
   ];

   types.forEach((type) => {
    expect(() => LayoutTypeSchema.parse(type)).not.toThrow();
   });
  });

  it("should reject invalid layout types", () => {
   expect(() => LayoutTypeSchema.parse("three-column")).toThrow();
   expect(() => LayoutTypeSchema.parse("grid")).toThrow();
  });
 });

 describe("PaperSizeSchema", () => {
  it("should validate valid paper sizes", () => {
   ["a4", "letter", "legal"].forEach((size) => {
    expect(() => PaperSizeSchema.parse(size)).not.toThrow();
   });
  });

  it("should reject invalid paper sizes", () => {
   expect(() => PaperSizeSchema.parse("tabloid")).toThrow();
   expect(() => PaperSizeSchema.parse("a3")).toThrow();
  });
 });

 describe("MarginSizeSchema", () => {
  it("should validate valid margin sizes", () => {
   ["compact", "normal", "relaxed", "wide"].forEach((margin) => {
    expect(() => MarginSizeSchema.parse(margin)).not.toThrow();
   });
  });

  it("should reject invalid margin sizes", () => {
   expect(() => MarginSizeSchema.parse("narrow")).toThrow();
   expect(() => MarginSizeSchema.parse("extra-wide")).toThrow();
  });
 });

 describe("ColumnDistributionSchema", () => {
  it("should validate valid column distributions", () => {
   ["60-40", "70-30", "65-35", "50-50"].forEach((dist) => {
    expect(() => ColumnDistributionSchema.parse(dist)).not.toThrow();
   });
  });

  it("should reject invalid distributions", () => {
   expect(() => ColumnDistributionSchema.parse("80-20")).toThrow();
   expect(() => ColumnDistributionSchema.parse("equal")).toThrow();
  });
 });

 describe("PageBreakBehaviorSchema", () => {
  it("should validate valid page break behaviors", () => {
   ["auto", "section-aware", "manual"].forEach((behavior) => {
    expect(() => PageBreakBehaviorSchema.parse(behavior)).not.toThrow();
   });
  });

  it("should reject invalid behaviors", () => {
   expect(() => PageBreakBehaviorSchema.parse("never")).toThrow();
   expect(() => PageBreakBehaviorSchema.parse("always")).toThrow();
  });
 });

 describe("PageNumberPositionSchema", () => {
  it("should validate valid page number positions", () => {
   ["bottom-center", "bottom-right", "top-right"].forEach((position) => {
    expect(() => PageNumberPositionSchema.parse(position)).not.toThrow();
   });
  });

  it("should reject invalid positions", () => {
   expect(() => PageNumberPositionSchema.parse("top-left")).toThrow();
   expect(() => PageNumberPositionSchema.parse("center")).toThrow();
  });
 });

 describe("LayoutConfigSchema", () => {
  it("should validate single-column layout", () => {
   const result = LayoutConfigSchema.parse(singleColumnLayout);
   expect(result).toEqual(singleColumnLayout);
  });

  it("should validate two-column layout with columnDistribution", () => {
   const result = LayoutConfigSchema.parse(twoColumnLayout);
   expect(result).toEqual(twoColumnLayout);
   expect(result.columnDistribution).toBe("70-30");
  });

  it("should validate sidebar-left layout", () => {
   const result = LayoutConfigSchema.parse(sidebarLeftLayout);
   expect(result).toEqual(sidebarLeftLayout);
  });

  it("should validate magazine layout", () => {
   const result = LayoutConfigSchema.parse(magazineLayout);
   expect(result).toEqual(magazineLayout);
  });

  it("should allow optional fields", () => {
   const minimal = {
    type: "single-column",
    paperSize: "a4",
    margins: "normal",
    pageBreakBehavior: "auto",
   };

   const result = LayoutConfigSchema.parse(minimal);
   expect(result.showPageNumbers).toBeUndefined();
   expect(result.pageNumberPosition).toBeUndefined();
   expect(result.columnDistribution).toBeUndefined();
  });

  it("should validate page numbers configuration", () => {
   const withPageNumbers = {
    ...singleColumnLayout,
    showPageNumbers: true,
    pageNumberPosition: "bottom-right",
   };

   const result = LayoutConfigSchema.parse(withPageNumbers);
   expect(result.showPageNumbers).toBe(true);
   expect(result.pageNumberPosition).toBe("bottom-right");
  });

  it("should reject invalid layouts", () => {
   invalidLayouts.forEach(({ description: _description, data }) => {
    expect(() => LayoutConfigSchema.parse(data)).toThrow();
   });
  });

  it("should enforce required fields", () => {
   expect(() =>
    LayoutConfigSchema.parse({
     type: "single-column",
     paperSize: "a4",
     // margins missing
     pageBreakBehavior: "auto",
    })
   ).toThrow();
  });

  it("should provide correct TypeScript types", () => {
   const layout = LayoutConfigSchema.parse(twoColumnLayout);

   const layoutType: string = layout.type;
   const paperSize: string = layout.paperSize;
   const distribution: string | undefined = layout.columnDistribution;

   expect(layoutType).toBe("two-column");
   expect(paperSize).toBe("letter");
   expect(distribution).toBe("70-30");
  });
 });
});
