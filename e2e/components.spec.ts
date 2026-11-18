import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { collectErrors, loadProvenance, playgroundPreview, playgroundUsage, repoFile } from "./support";

const rows = loadProvenance();

test.describe("component pages", () => {
  for (const row of rows) {
    test(`${row.id}: renders, preview is populated, no console or page errors`, async ({ page }) => {
      const errors = collectErrors(page);

      await page.goto(`/components/${row.id}`);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const preview = playgroundPreview(page);
      await expect(preview).toBeVisible();
      await expect
        .poll(() => preview.evaluate((el) => el.querySelectorAll("*").length), { message: "preview has no rendered content" })
        .toBeGreaterThan(0);

      // Let entrance/loop animations run before checking for runtime errors.
      await page.waitForTimeout(1000);

      expect(errors, errors.join("\n")).toEqual([]);
    });

    test(`${row.id}: Copy puts the first registry file on the clipboard`, async ({ page, context }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);

      await page.goto(`/components/${row.id}`);

      const codeSection = page.locator('section[aria-labelledby="code-heading"]');
      const copy = codeSection.getByRole("button", { name: /^Copy/ }).first();
      await expect(copy).toBeVisible();
      await copy.click();
      await expect(codeSection.getByRole("button", { name: /^Copy/ }).first()).toHaveText(/Copied/);

      const clipboard = await page.evaluate(() => navigator.clipboard.readText());
      const expected = readFileSync(repoFile(row.files[0]), "utf8");
      expect(clipboard).toBe(expected);
    });

    test(`${row.id}: changing a control changes the generated usage`, async ({ page }) => {
      await page.goto(`/components/${row.id}`);

      const section = page.locator('section[aria-labelledby="playground-heading"]');
      const controls = section.locator("fieldset", { has: page.locator("legend", { hasText: "Controls" }) });
      if ((await controls.count()) === 0) {
        // No controls on this component: nothing to change, so there is no assertion to make.
        test.info().annotations.push({ type: "info", description: "no controls on this page" });
        return;
      }

      const usage = playgroundUsage(page);
      const before = await usage.textContent();

      const control = controls
        .locator('[role="switch"], [role="slider"], button[role="combobox"], input[type="text"], input[type="color"]')
        .first();
      const kind = await control.evaluate((el) => {
        const role = el.getAttribute("role");
        if (role) return role;
        return el.tagName.toLowerCase() === "input" ? `input:${(el as HTMLInputElement).type}` : el.tagName.toLowerCase();
      });

      if (kind === "slider") {
        await control.focus();
        await control.press("ArrowRight");
        if ((await usage.textContent()) === before) {
          await control.press("ArrowLeft");
          await control.press("ArrowLeft");
        }
      } else if (kind === "switch") {
        await control.click();
      } else if (kind === "combobox") {
        const current = (await control.textContent())?.trim();
        await control.click();
        const labels = await page.getByRole("option").allTextContents();
        const index = labels.findIndex((label) => label.trim() !== current);
        await page.getByRole("option").nth(index).click();
      } else if (kind === "input:color") {
        await control.fill("#123456");
      } else {
        await control.fill("motionkit-e2e");
      }

      await expect
        .poll(() => usage.textContent(), { message: `usage snippet did not change after editing a ${kind} control` })
        .not.toBe(before);
    });
  }
});
