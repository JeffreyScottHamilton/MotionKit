import { expect, test } from "@playwright/test";
import { collectErrors, loadProvenance } from "./support";

const total = loadProvenance().length;

test.describe("site pages", () => {
  test("home page loads without errors", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "MotionKit" })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("docs index loads and every /docs/* link loads without errors", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const hrefs = await page
      .locator('a[href^="/docs/"]')
      .evaluateAll((links) => Array.from(new Set(links.map((a) => a.getAttribute("href") ?? ""))));
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      const errors = collectErrors(page);
      await page.goto(href);
      await expect(page.getByRole("heading", { level: 1 }), `heading on ${href}`).toBeVisible();
      await page.waitForTimeout(1000);
      expect(errors, `${href}\n${errors.join("\n")}`).toEqual([]);
    }
  });

  test("notices page loads without errors and lists one table row per provenance entry", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/notices");
    await expect(page.getByRole("heading", { level: 1, name: "Third-party notices" })).toBeVisible();

    const rows = page.locator('section[aria-labelledby="provenance-heading"] tbody tr');
    await expect(rows).toHaveCount(total);

    await page.waitForTimeout(1000);
    expect(errors, errors.join("\n")).toEqual([]);
  });
});

test.describe("no horizontal scroll at 375x800", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  for (const path of ["/", "/components", "/components/text-effect", "/docs/installation", "/notices"]) {
    test(`${path} has scrollWidth <= 375`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.waitForTimeout(500);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `scrollWidth on ${path}`).toBeLessThanOrEqual(375);
    });
  }
});
