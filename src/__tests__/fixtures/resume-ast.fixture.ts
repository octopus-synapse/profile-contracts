import type { ResumeAst } from "../../ast/resume-ast.schema";

export const completeResumeAst: ResumeAst = {
 meta: {
  version: "1.0.0",
  generatedAt: "2026-01-02T12:00:00.000Z",
 },
 page: {
  widthMm: 210,
  heightMm: 297,
  marginTopMm: 15,
  marginBottomMm: 15,
  marginLeftMm: 15,
  marginRightMm: 15,
  columns: [
   {
    id: "main",
    widthPercentage: 70,
    order: 0,
   },
   {
    id: "sidebar",
    widthPercentage: 30,
    order: 1,
   },
  ],
  columnGapMm: 5,
 },
 sections: [
  {
   sectionId: "summary",
   columnId: "full-width",
   order: 0,
   data: {
    type: "summary",
    data: {
     content:
      "Experienced software engineer with a passion for building scalable applications.",
    },
   },
   styles: {
    container: {
     backgroundColor: "#ffffff",
     borderColor: "#e2e8f0",
     borderWidthPx: 0,
     borderRadiusPx: 4,
     paddingPx: 16,
     marginBottomPx: 24,
     shadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    title: {
     fontFamily: "Inter, sans-serif",
     fontSizePx: 18,
     lineHeight: 1.5,
     fontWeight: 700,
     textTransform: "uppercase",
     textDecoration: "none",
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
  },
  {
   sectionId: "experience",
   columnId: "main",
   order: 1,
   data: {
    type: "experience",
    items: [
     {
      id: "exp-1",
      title: "Senior Engineer",
      company: "Tech Corp",
      dateRange: {
       startDate: "2020-01-01",
       isCurrent: true,
      },
      achievements: ["Built cool stuff", "Fixed bugs"],
      skills: ["React", "Node.js"],
     },
    ],
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
  },
 ],
 globalStyles: {
  background: "#ffffff",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  accent: "#2563eb",
 },
};

export const singleColumnAst: ResumeAst = {
 meta: {
  version: "1.0.0",
  generatedAt: "2026-01-02T12:00:00.000Z",
 },
 page: {
  widthMm: 210,
  heightMm: 297,
  marginTopMm: 20,
  marginBottomMm: 20,
  marginLeftMm: 20,
  marginRightMm: 20,
  columns: [
   {
    id: "main",
    widthPercentage: 100,
    order: 0,
   },
  ],
  columnGapMm: 0,
 },
 sections: [
  {
   sectionId: "summary",
   columnId: "main",
   order: 0,
   data: {
    type: "summary",
    data: {
     content: "Summary content",
    },
   },
   styles: {
    container: {
     backgroundColor: "#ffffff",
     borderColor: "#000000",
     borderWidthPx: 0,
     borderRadiusPx: 0,
     paddingPx: 12,
     marginBottomPx: 16,
    },
    title: {
     fontFamily: "Merriweather, serif",
     fontSizePx: 14,
     lineHeight: 1.4,
     fontWeight: 700,
     textTransform: "none",
     textDecoration: "none",
    },
    content: {
     fontFamily: "Merriweather, serif",
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
  background: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#666666",
  accent: "#000000",
 },
};

export const invalidResumeAsts = [
 {
  description: "missing meta.version",
  data: {
   meta: {
    generatedAt: "2026-01-02T12:00:00.000Z",
   },
   page: completeResumeAst.page,
   sections: completeResumeAst.sections,
   globalStyles: completeResumeAst.globalStyles,
  },
 },
 {
  description: "invalid column id type",
  data: {
   ...completeResumeAst,
   page: {
    ...completeResumeAst.page,
    columns: [
     {
      id: 123, // should be string
      widthPercentage: 100,
      order: 0,
     },
    ],
   },
  },
 },
 {
  description: "invalid font weight",
  data: {
   ...completeResumeAst,
   sections: [
    {
     ...completeResumeAst.sections[0],
     styles: {
      ...completeResumeAst.sections[0].styles,
      title: {
       ...completeResumeAst.sections[0].styles.title,
       fontWeight: "bold" as any, // should be number
      },
     },
    },
   ],
  },
 },
 {
  description: "invalid textTransform enum",
  data: {
   ...completeResumeAst,
   sections: [
    {
     ...completeResumeAst.sections[0],
     styles: {
      ...completeResumeAst.sections[0].styles,
      content: {
       ...completeResumeAst.sections[0].styles.content,
       textTransform: "title-case" as any,
      },
     },
    },
   ],
  },
 },
];
