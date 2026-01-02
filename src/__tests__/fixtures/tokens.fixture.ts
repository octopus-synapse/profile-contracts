import type { DesignTokens } from "../../dsl/tokens.schema";

export const validDesignTokens: DesignTokens = {
 typography: {
  fontFamily: {
   heading: "inter",
   body: "roboto",
  },
  fontSize: "base",
  headingStyle: "bold",
 },
 colors: {
  colors: {
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
  },
  borderRadius: "md",
  shadows: "subtle",
  gradients: {
   enabled: true,
   direction: "to-right",
  },
 },
 spacing: {
  density: "comfortable",
  sectionGap: "lg",
  itemGap: "md",
  contentPadding: "md",
 },
};

export const minimalDesignTokens: DesignTokens = {
 typography: {
  fontFamily: {
   heading: "merriweather",
   body: "merriweather",
  },
  fontSize: "sm",
  headingStyle: "minimal",
 },
 colors: {
  colors: {
   primary: "#000000",
   secondary: "#666666",
   background: "#ffffff",
   surface: "#ffffff",
   text: {
    primary: "#000000",
    secondary: "#666666",
    accent: "#000000",
   },
   border: "#cccccc",
   divider: "#e0e0e0",
  },
  borderRadius: "none",
  shadows: "none",
 },
 spacing: {
  density: "compact",
  sectionGap: "sm",
  itemGap: "sm",
  contentPadding: "sm",
 },
};

export const invalidDesignTokens = [
 {
  description: "invalid font family",
  data: {
   ...validDesignTokens,
   typography: {
    ...validDesignTokens.typography,
    fontFamily: {
     heading: "comic-sans", // invalid
     body: "roboto",
    },
   },
  },
 },
 {
  description: "invalid border radius",
  data: {
   ...validDesignTokens,
   colors: {
    ...validDesignTokens.colors,
    borderRadius: "xl" as any, // invalid value
   },
  },
 },
 {
  description: "invalid spacing density",
  data: {
   ...validDesignTokens,
   spacing: {
    ...validDesignTokens.spacing,
    density: "super-compact" as any,
   },
  },
 },
];
