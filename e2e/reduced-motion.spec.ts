import { expect, test } from "@playwright/test";
import { collectErrors, loadProvenance } from "./support";

test.use({ reducedMotion: "reduce" });

test.describe("component pages with prefers-reduced-motion: reduce", () => {
  for (const row of loadProvenance()) {
    test(`${row.id}: no page or console errors`, async ({ page }) => {
      const errors = collectErrors(page);

      await page.goto(`/components/${row.id}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.waitForTimeout(1000);

      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
