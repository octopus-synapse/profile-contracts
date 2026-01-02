/** @type {import('jest').Config} */
module.exports = {
 preset: "ts-jest",
 moduleFileExtensions: ["ts", "js", "json"],
 rootDir: ".",
 testRegex: ".*\\.test\\.ts$",
 globals: {
  "ts-jest": {
   tsconfig: "tsconfig.test.json",
   isolatedModules: true,
   diagnostics: {
    ignoreCodes: [2307, 7031, 7006],
   },
  },
 },
 collectCoverageFrom: [
  "src/**/*.ts",
  "!src/**/__tests__/**",
  "!src/**/*.fixture.ts",
  "!src/**/index.ts",
 ],
 coverageDirectory: "./coverage",
 testEnvironment: "node",
 coverageThreshold: {
  global: {
   branches: 80,
   functions: 80,
   lines: 80,
   statements: 80,
  },
 },
 verbose: true,
};
