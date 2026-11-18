import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["registry/**/*.test.ts", "scripts/**/*.test.ts"],
    exclude: ["node_modules", ".next", "e2e/**"],
  },
});
