import type { LayoutConfig } from "../../dsl/layout.schema";

export const singleColumnLayout: LayoutConfig = {
 type: "single-column",
 paperSize: "a4",
 margins: "normal",
 pageBreakBehavior: "auto",
 showPageNumbers: false,
};

export const twoColumnLayout: LayoutConfig = {
 type: "two-column",
 paperSize: "letter",
 margins: "compact",
 columnDistribution: "70-30",
 pageBreakBehavior: "section-aware",
 showPageNumbers: true,
 pageNumberPosition: "bottom-right",
};

export const sidebarLeftLayout: LayoutConfig = {
 type: "sidebar-left",
 paperSize: "a4",
 margins: "relaxed",
 columnDistribution: "60-40",
 pageBreakBehavior: "manual",
 showPageNumbers: true,
 pageNumberPosition: "bottom-center",
};

export const magazineLayout: LayoutConfig = {
 type: "magazine",
 paperSize: "letter",
 margins: "wide",
 columnDistribution: "50-50",
 pageBreakBehavior: "auto",
 showPageNumbers: false,
};

export const invalidLayouts = [
 {
  description: "invalid layout type",
  data: {
   ...singleColumnLayout,
   type: "three-column" as any,
  },
 },
 {
  description: "invalid paper size",
  data: {
   ...singleColumnLayout,
   paperSize: "tabloid" as any,
  },
 },
 {
  description: "invalid column distribution",
  data: {
   ...twoColumnLayout,
   columnDistribution: "80-20" as any,
  },
 },
 {
  description: "invalid margin size",
  data: {
   ...singleColumnLayout,
   margins: "extra-wide" as any,
  },
 },
];
