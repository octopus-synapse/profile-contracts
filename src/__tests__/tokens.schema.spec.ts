import { describe, it, expect } from "bun:test";
import {
 DesignTokensSchema,
 TypographyTokensSchema,
 ColorTokensSchema,
 SpacingTokensSchema,
 FontFamilySchema,
 FontSizeSchema,
 HeadingStyleSchema,
 ColorPaletteSchema,
 BorderRadiusSchema,
 ShadowSchema,
 SpacingDensitySchema,
 SpacingSizeSchema,
} from "../dsl/tokens.schema";
import {
 validDesignTokens,
 minimalDesignTokens,
 invalidDesignTokens,
} from "./fixtures/tokens.fixture";

describe("tokens.schema", () => {
 describe("FontFamilySchema", () => {
  it("should validate valid font families", () => {
   const validFonts = [
    "inter",
    "merriweather",
    "roboto",
    "open-sans",
    "playfair-display",
    "source-serif",
    "lato",
    "poppins",
   ];

   validFonts.forEach((font) => {
    expect(() => FontFamilySchema.parse(font)).not.toThrow();
   });
  });

  it("should reject invalid font families", () => {
   expect(() => FontFamilySchema.parse("comic-sans")).toThrow();
   expect(() => FontFamilySchema.parse("times-new-roman")).toThrow();
   expect(() => FontFamilySchema.parse("")).toThrow();
  });
 });

 describe("FontSizeSchema", () => {
  it("should validate valid font sizes", () => {
   ["sm", "base", "lg"].forEach((size) => {
    expect(() => FontSizeSchema.parse(size)).not.toThrow();
   });
  });

  it("should reject invalid font sizes", () => {
   expect(() => FontSizeSchema.parse("xl")).toThrow();
   expect(() => FontSizeSchema.parse("medium")).toThrow();
  });
 });

 describe("HeadingStyleSchema", () => {
  it("should validate valid heading styles", () => {
   ["bold", "underline", "uppercase", "accent-border", "minimal"].forEach(
    (style) => {
     expect(() => HeadingStyleSchema.parse(style)).not.toThrow();
    }
   );
  });

  it("should reject invalid heading styles", () => {
   expect(() => HeadingStyleSchema.parse("italic")).toThrow();
   expect(() => HeadingStyleSchema.parse("shadow")).toThrow();
  });
 });

 describe("TypographyTokensSchema", () => {
  it("should validate complete typography tokens", () => {
   const tokens = {
    fontFamily: {
     heading: "inter",
     body: "roboto",
    },
    fontSize: "base",
    headingStyle: "bold",
   };

   const result = TypographyTokensSchema.parse(tokens);
   expect(result).toEqual(tokens);
  });

  it("should reject invalid typography tokens", () => {
   expect(() =>
    TypographyTokensSchema.parse({
     fontFamily: { heading: "invalid", body: "roboto" },
     fontSize: "base",
     headingStyle: "bold",
    })
   ).toThrow();

   expect(() =>
    TypographyTokensSchema.parse({
     fontFamily: { heading: "inter" }, // missing body
     fontSize: "base",
     headingStyle: "bold",
    })
   ).toThrow();
  });
 });

 describe("ColorPaletteSchema", () => {
  it("should validate complete color palette", () => {
   const palette = {
    primary: "#2563eb",
    secondary: "#64748b",
    background: "#ffffff",
    surface: "#f8fafc",
    text: {
     primary: "#0f172a",
     secondary: "#475569",
     accent: "#2563eb",
    },
    border: "#e2e8f0",
    divider: "#cbd5e1",
   };

   const result = ColorPaletteSchema.parse(palette);
   expect(result).toEqual(palette);
  });

  it("should accept any string format for colors", () => {
   // Note: Schema doesn't enforce hex format, just string
   const palette = {
    primary: "blue",
    secondary: "rgb(100, 116, 139)",
    background: "#fff",
    surface: "#f8fafc",
    text: {
     primary: "#0f172a",
     secondary: "#475569",
     accent: "#2563eb",
    },
    border: "#e2e8f0",
    divider: "#cbd5e1",
   };

   expect(() => ColorPaletteSchema.parse(palette)).not.toThrow();
  });
 });

 describe("BorderRadiusSchema", () => {
  it("should validate valid border radius values", () => {
   ["none", "sm", "md", "lg", "full"].forEach((radius) => {
    expect(() => BorderRadiusSchema.parse(radius)).not.toThrow();
   });
  });

  it("should reject invalid border radius", () => {
   expect(() => BorderRadiusSchema.parse("xl")).toThrow();
   expect(() => BorderRadiusSchema.parse("rounded")).toThrow();
  });
 });

 describe("ShadowSchema", () => {
  it("should validate valid shadow values", () => {
   ["none", "subtle", "medium", "strong"].forEach((shadow) => {
    expect(() => ShadowSchema.parse(shadow)).not.toThrow();
   });
  });

  it("should reject invalid shadow", () => {
   expect(() => ShadowSchema.parse("heavy")).toThrow();
   expect(() => ShadowSchema.parse("light")).toThrow();
  });
 });

 describe("ColorTokensSchema", () => {
  it("should validate complete color tokens", () => {
   const tokens = {
    colors: validDesignTokens.colors.colors,
    borderRadius: "md",
    shadows: "subtle",
    gradients: {
     enabled: true,
     direction: "to-right",
    },
   };

   const result = ColorTokensSchema.parse(tokens);
   expect(result).toEqual(tokens);
  });

  it("should allow optional gradients", () => {
   const tokens = {
    colors: validDesignTokens.colors.colors,
    borderRadius: "md",
    shadows: "subtle",
    // gradients omitted
   };

   expect(() => ColorTokensSchema.parse(tokens)).not.toThrow();
  });

  it("should validate gradient directions", () => {
   const tokens = {
    colors: validDesignTokens.colors.colors,
    borderRadius: "md",
    shadows: "subtle",
    gradients: {
     enabled: true,
     direction: "diagonal",
    },
   };

   expect(() => ColorTokensSchema.parse(tokens)).not.toThrow();
  });
 });

 describe("SpacingDensitySchema", () => {
  it("should validate valid spacing densities", () => {
   ["compact", "comfortable", "spacious"].forEach((density) => {
    expect(() => SpacingDensitySchema.parse(density)).not.toThrow();
   });
  });

  it("should reject invalid density", () => {
   expect(() => SpacingDensitySchema.parse("tight")).toThrow();
   expect(() => SpacingDensitySchema.parse("relaxed")).toThrow();
  });
 });

 describe("SpacingSizeSchema", () => {
  it("should validate valid spacing sizes", () => {
   ["sm", "md", "lg", "xl"].forEach((size) => {
    expect(() => SpacingSizeSchema.parse(size)).not.toThrow();
   });
  });

  it("should reject invalid spacing size", () => {
   expect(() => SpacingSizeSchema.parse("xs")).toThrow();
   expect(() => SpacingSizeSchema.parse("2xl")).toThrow();
  });
 });

 describe("SpacingTokensSchema", () => {
  it("should validate complete spacing tokens", () => {
   const tokens = {
    density: "comfortable",
    sectionGap: "lg",
    itemGap: "md",
    contentPadding: "md",
   };

   const result = SpacingTokensSchema.parse(tokens);
   expect(result).toEqual(tokens);
  });

  it("should reject invalid spacing tokens", () => {
   expect(() =>
    SpacingTokensSchema.parse({
     density: "comfortable",
     sectionGap: "2xl", // invalid
     itemGap: "md",
     contentPadding: "md",
    })
   ).toThrow();
  });
 });

 describe("DesignTokensSchema", () => {
  it("should validate complete design tokens", () => {
   const result = DesignTokensSchema.parse(validDesignTokens);
   expect(result).toEqual(validDesignTokens);
  });

  it("should validate minimal design tokens", () => {
   const result = DesignTokensSchema.parse(minimalDesignTokens);
   expect(result).toEqual(minimalDesignTokens);
  });

  it("should reject invalid design tokens", () => {
   invalidDesignTokens.forEach(({ description, data }) => {
    expect(() => DesignTokensSchema.parse(data)).toThrow();
   });
  });

  it("should enforce all required fields", () => {
   expect(() =>
    DesignTokensSchema.parse({
     typography: validDesignTokens.typography,
     colors: validDesignTokens.colors,
     // spacing missing
    })
   ).toThrow();
  });

  it("should provide correct TypeScript types", () => {
   const tokens = DesignTokensSchema.parse(validDesignTokens);

   // Type assertions to verify inference
   const fontFamily: string = tokens.typography.fontFamily.heading;
   const primary: string = tokens.colors.colors.primary;
   const density: "compact" | "comfortable" | "spacious" =
    tokens.spacing.density;

   expect(fontFamily).toBe("inter");
   expect(primary).toBe("#2563eb");
   expect(density).toBe("comfortable");
  });
 });
});
