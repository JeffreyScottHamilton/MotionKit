import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { collectErrors, loadProvenance, playgroundPreview, playgroundUsage, repoFile, rewriteRegistryImports } from "./support";

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
      // The copy view rewrites registry imports to the install aliases (see rewriteRegistryImports).
      const expected = rewriteRegistryImports(readFileSync(repoFile(row.files[0]), "utf8"));
      expect(clipboard).toBe(expected);
    });

    test(`${row.id}: color hex input keeps a partial draft while typing and Reset clears it`, async ({ page }) => {
      await page.goto(`/components/${row.id}`);

      const section = page.locator('section[aria-labelledby="playground-heading"]');
      const hex = section.locator('input[aria-label$="hex value"]');
      if ((await hex.count()) === 0) {
        test.info().annotations.push({ type: "info", description: "no color control on this page" });
        return;
      }

      // Pages can have several color controls; the first picker belongs to the first hex input.
      const picker = section.locator('input[type="color"]').first();
      const initial = await picker.inputValue();

      await hex.first().fill("");
      await hex.first().pressSequentially("#12ab3f", { delay: 20 });
      await expect(hex.first()).toHaveValue("#12ab3f");
      await expect(picker).toHaveValue("#12ab3f");

      // A partial value must stay in the text input and not change the picker.
      await hex.first().fill("#1");
      await expect(hex.first()).toHaveValue("#1");
      await expect(picker).toHaveValue("#12ab3f");

      await section.getByRole("button", { name: "Reset" }).click();
      await expect(hex.first()).toHaveValue(initial);
      await expect(picker).toHaveValue(initial);
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
