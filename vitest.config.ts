import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "text-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      enabled: true,
      provider: "v8",
      all: true,
      exclude: ["**/*.test.ts", "src/tests/**"],
    },
  },
});
