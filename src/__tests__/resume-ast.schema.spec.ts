import { describe, it, expect } from "bun:test";
import {
 ResumeAstSchema,
 ResolvedTypographySchema,
 ResolvedBoxStyleSchema,
 ColumnDefinitionSchema,
 PageLayoutSchema,
 PlacedSectionSchema,
 type ResumeAst,
} from "../ast/resume-ast.schema";
import {
 completeResumeAst,
 singleColumnAst,
 invalidResumeAsts,
} from "./fixtures/resume-ast.fixture";

describe("resume-ast.schema", () => {
 describe("ResolvedTypographySchema", () => {
  it("should validate complete typography", () => {
   const typography = {
    fontFamily: "Inter, sans-serif",
    fontSizePx: 16,
    lineHeight: 1.5,
    fontWeight: 400,
    textTransform: "none",
    textDecoration: "none",
   };

   const result = ResolvedTypographySchema.parse(typography);
   expect(result).toEqual(typography);
  });

  it("should validate all text transform values", () => {
   ["none", "uppercase", "lowercase", "capitalize"].forEach((transform) => {
    expect(() =>
     ResolvedTypographySchema.parse({
      fontFamily: "Roboto, sans-serif",
      fontSizePx: 14,
      lineHeight: 1.6,
      fontWeight: 400,
      textTransform: transform,
      textDecoration: "none",
     })
    ).not.toThrow();
   });
  });

  it("should validate all text decoration values", () => {
   ["none", "underline", "line-through"].forEach((decoration) => {
    expect(() =>
     ResolvedTypographySchema.parse({
      fontFamily: "Merriweather, serif",
      fontSizePx: 18,
      lineHeight: 1.4,
      fontWeight: 700,
      textTransform: "none",
      textDecoration: decoration,
     })
    ).not.toThrow();
   });
  });

  it("should reject invalid typography", () => {
   expect(() =>
    ResolvedTypographySchema.parse({
     fontFamily: "Inter",
     fontSizePx: "16px", // should be number
     lineHeight: 1.5,
     fontWeight: 400,
     textTransform: "none",
     textDecoration: "none",
    })
   ).toThrow();

   expect(() =>
    ResolvedTypographySchema.parse({
     fontFamily: "Inter",
     fontSizePx: 16,
     lineHeight: 1.5,
     fontWeight: "bold", // should be number
     textTransform: "none",
     textDecoration: "none",
    })
   ).toThrow();
  });
 });

 describe("ResolvedBoxStyleSchema", () => {
  it("should validate complete box style", () => {
   const boxStyle = {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderWidthPx: 1,
    borderRadiusPx: 4,
    paddingPx: 16,
    marginBottomPx: 24,
    shadow: "0 1px 3px rgba(0,0,0,0.1)",
   };

   const result = ResolvedBoxStyleSchema.parse(boxStyle);
   expect(result).toEqual(boxStyle);
  });

  it("should allow optional shadow", () => {
   const boxStyle = {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidthPx: 0,
    borderRadiusPx: 0,
    paddingPx: 12,
    marginBottomPx: 16,
    // shadow omitted
   };

   expect(() => ResolvedBoxStyleSchema.parse(boxStyle)).not.toThrow();
  });

  it("should reject invalid box style", () => {
   expect(() =>
    ResolvedBoxStyleSchema.parse({
     backgroundColor: "#fff",
     borderColor: "#000",
     borderWidthPx: "1px", // should be number
     borderRadiusPx: 4,
     paddingPx: 16,
     marginBottomPx: 24,
    })
   ).toThrow();
  });
 });

 describe("ColumnDefinitionSchema", () => {
  it("should validate column definition", () => {
   const column = {
    id: "main",
    widthPercentage: 70,
    order: 0,
   };

   const result = ColumnDefinitionSchema.parse(column);
   expect(result).toEqual(column);
  });

  it("should reject invalid column definition", () => {
   expect(() =>
    ColumnDefinitionSchema.parse({
     id: "main",
     widthPercentage: "70%", // should be number
     order: 0,
    })
   ).toThrow();
  });
 });

 describe("PageLayoutSchema", () => {
  it("should validate complete page layout", () => {
   const layout = {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 15,
    marginBottomMm: 15,
    marginLeftMm: 15,
    marginRightMm: 15,
    columns: [
     { id: "main", widthPercentage: 70, order: 0 },
     { id: "sidebar", widthPercentage: 30, order: 1 },
    ],
    columnGapMm: 5,
   };

   const _result = PageLayoutSchema.parse(layout);
   expect(_result).toEqual(layout);
  });

  it("should validate single column layout", () => {
   const layout = {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 20,
    marginBottomMm: 20,
    marginLeftMm: 20,
    marginRightMm: 20,
    columns: [{ id: "main", widthPercentage: 100, order: 0 }],
    columnGapMm: 0,
   };

   expect(() => PageLayoutSchema.parse(layout)).not.toThrow();
  });

  it("should reject invalid page layout", () => {
   expect(() =>
    PageLayoutSchema.parse({
     widthMm: "210mm", // should be number
     heightMm: 297,
     marginTopMm: 15,
     marginBottomMm: 15,
     marginLeftMm: 15,
     marginRightMm: 15,
     columns: [],
     columnGapMm: 5,
    })
   ).toThrow();
  });
 });

 describe("PlacedSectionSchema", () => {
  it("should validate placed section with complete styles", () => {
   const section = {
    sectionId: "experience",
    columnId: "main",
    order: 1,
    data: {
     type: "experience",
     items: [],
    },
    styles: {
     container: {
      backgroundColor: "#ffffff",
      borderColor: "#e2e8f0",
      borderWidthPx: 0,
      borderRadiusPx: 4,
      paddingPx: 16,
      marginBottomPx: 24,
     },
     title: {
      fontFamily: "Inter, sans-serif",
      fontSizePx: 16,
      lineHeight: 1.5,
      fontWeight: 700,
      textTransform: "none",
      textDecoration: "underline",
     },
     content: {
      fontFamily: "Roboto, sans-serif",
      fontSizePx: 14,
      lineHeight: 1.6,
      fontWeight: 400,
      textTransform: "none",
      textDecoration: "none",
     },
    },
   };

   const _result = PlacedSectionSchema.parse(section);
   expect(_result).toEqual(section);
  });

  it("should enforce required style fields", () => {
   expect(() =>
    PlacedSectionSchema.parse({
     sectionId: "summary",
     columnId: "main",
     order: 0,
     data: {
      type: "summary",
      data: { content: "test" },
     },
     styles: {
      container: {
       backgroundColor: "#ffffff",
       borderColor: "#e2e8f0",
       borderWidthPx: 0,
       borderRadiusPx: 4,
       paddingPx: 16,
       marginBottomPx: 24,
      },
      title: {
       fontFamily: "Inter, sans-serif",
       fontSizePx: 16,
       lineHeight: 1.5,
       fontWeight: 700,
       textTransform: "none",
       textDecoration: "none",
      },
      // content missing
     },
    })
   ).toThrow();
  });
 });

 describe("ResumeAstSchema", () => {
  it("should validate complete resume AST", () => {
   const result = ResumeAstSchema.parse(completeResumeAst);
   expect(result).toEqual(completeResumeAst);
  });

  it("should validate single column AST", () => {
   const result = ResumeAstSchema.parse(singleColumnAst);
   expect(result).toEqual(singleColumnAst);
  });

  it("should enforce required meta fields", () => {
   expect(() =>
    ResumeAstSchema.parse({
     meta: {
      // version missing
      generatedAt: "2026-01-02T12:00:00.000Z",
     },
     page: completeResumeAst.page,
     sections: completeResumeAst.sections,
     globalStyles: completeResumeAst.globalStyles,
    })
   ).toThrow();

   expect(() =>
    ResumeAstSchema.parse({
     meta: {
      version: "1.0.0",
      // generatedAt missing
     },
     page: completeResumeAst.page,
     sections: completeResumeAst.sections,
     globalStyles: completeResumeAst.globalStyles,
    })
   ).toThrow();
  });

  it("should enforce required top-level fields", () => {
   expect(() =>
    ResumeAstSchema.parse({
     // meta missing
     page: completeResumeAst.page,
     sections: completeResumeAst.sections,
     globalStyles: completeResumeAst.globalStyles,
    })
   ).toThrow();

   expect(() =>
    ResumeAstSchema.parse({
     meta: completeResumeAst.meta,
     // page missing
     sections: completeResumeAst.sections,
     globalStyles: completeResumeAst.globalStyles,
    })
   ).toThrow();

   expect(() =>
    ResumeAstSchema.parse({
     meta: completeResumeAst.meta,
     page: completeResumeAst.page,
     // sections missing
     globalStyles: completeResumeAst.globalStyles,
    })
   ).toThrow();

   expect(() =>
    ResumeAstSchema.parse({
     meta: completeResumeAst.meta,
     page: completeResumeAst.page,
     sections: completeResumeAst.sections,
     // globalStyles missing
    })
   ).toThrow();
  });

  it("should validate global styles", () => {
   const ast = {
    ...completeResumeAst,
    globalStyles: {
     background: "#000000",
     textPrimary: "#ffffff",
     textSecondary: "#cccccc",
     accent: "#ff0000",
    },
   };

   expect(() => ResumeAstSchema.parse(ast)).not.toThrow();
  });

  it("should reject invalid resume ASTs", () => {
   invalidResumeAsts.forEach(({ description: _description, data }) => {
    expect(() => ResumeAstSchema.parse(data)).toThrow();
   });
  });

  it("should validate multiple sections", () => {
   const ast = {
    ...completeResumeAst,
    sections: [
     completeResumeAst.sections[0],
     completeResumeAst.sections[1],
     {
      sectionId: "education",
      columnId: "main",
      order: 2,
      data: {
       type: "education",
       items: [],
      },
      styles: completeResumeAst.sections[0].styles,
     },
    ],
   };

   expect(() => ResumeAstSchema.parse(ast)).not.toThrow();
  });

  it("should provide correct TypeScript types", () => {
   const ast: ResumeAst = ResumeAstSchema.parse(completeResumeAst);

   const version: string = ast.meta.version;
   const _widthMm: number = ast.page.widthMm;
   const sections: ResumeAst["sections"] = ast.sections;
   const _background: string = ast.globalStyles.background;

   expect(version).toBe("1.0.0");
   expect(_widthMm).toBe(210);
   expect(sections.length).toBe(2);
   expect(_background).toBe("#ffffff");
  });

  it("should validate ISO date format in meta", () => {
   const ast = {
    ...completeResumeAst,
    meta: {
     version: "1.0.0",
     generatedAt: new Date().toISOString(),
    },
   };

   expect(() => ResumeAstSchema.parse(ast)).not.toThrow();
  });

  it("should validate complex multi-column layout", () => {
   const complexAst = {
    meta: {
     version: "2.0.0",
     generatedAt: "2026-01-02T15:30:00.000Z",
    },
    page: {
     widthMm: 215.9, // Letter
     heightMm: 279.4,
     marginTopMm: 25,
     marginBottomMm: 25,
     marginLeftMm: 25,
     marginRightMm: 25,
     columns: [
      { id: "sidebar", widthPercentage: 35, order: 0 },
      { id: "main", widthPercentage: 65, order: 1 },
     ],
     columnGapMm: 8,
    },
    sections: [
     {
      sectionId: "summary",
      columnId: "main",
      order: 0,
      styles: {
       container: {
        backgroundColor: "#f8fafc",
        borderColor: "#cbd5e1",
        borderWidthPx: 1,
        borderRadiusPx: 8,
        paddingPx: 20,
        marginBottomPx: 32,
        shadow: "0 4px 6px rgba(0,0,0,0.15)",
       },
       title: {
        fontFamily: "Playfair Display, serif",
        fontSizePx: 24,
        lineHeight: 1.3,
        fontWeight: 700,
        textTransform: "uppercase",
        textDecoration: "none",
       },
       content: {
        fontFamily: "Merriweather, serif",
        fontSizePx: 16,
        lineHeight: 1.8,
        fontWeight: 400,
        textTransform: "none",
        textDecoration: "none",
       },
      },
     },
     {
      sectionId: "skills",
      columnId: "sidebar",
      order: 0,
      styles: {
       container: {
        backgroundColor: "#ffffff",
        borderColor: "#e2e8f0",
        borderWidthPx: 0,
        borderRadiusPx: 4,
        paddingPx: 12,
        marginBottomPx: 20,
       },
       title: {
        fontFamily: "Inter, sans-serif",
        fontSizePx: 14,
        lineHeight: 1.4,
        fontWeight: 600,
        textTransform: "uppercase",
        textDecoration: "underline",
       },
       content: {
        fontFamily: "Roboto, sans-serif",
        fontSizePx: 12,
        lineHeight: 1.5,
        fontWeight: 400,
        textTransform: "none",
        textDecoration: "none",
       },
      },
     },
    ],
    globalStyles: {
     background: "#fefefe",
     textPrimary: "#111827",
     textSecondary: "#6b7280",
     accent: "#1e40af",
    },
   };

   // Add data to sections
   complexAst.sections[0].data = {
    type: "summary",
    data: { content: "Summary" },
   };
   complexAst.sections[1].data = { type: "skills", items: [] };

   const _result = ResumeAstSchema.parse(complexAst);
   expect(_result).toEqual(complexAst);
  });
 });
});
