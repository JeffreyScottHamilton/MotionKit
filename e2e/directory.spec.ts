import { expect, test, type Page } from "@playwright/test";
import { loadProvenance } from "./support";

const total = loadProvenance().length;

/** Directory cards: each card is an <li> that links to its component page. */
function cards(page: Page) {
  return page.locator('li:has(a[href^="/components/"])');
}

/** The aria-live status line above the grid, e.g. "35 components" or "3 of 35 components". */
function countStatus(page: Page) {
  return page.locator('p[aria-live="polite"]', { hasText: /components?$/ });
}

test.describe("component directory", () => {
  test(`shows one card per provenance entry (${total})`, async ({ page }) => {
    await page.goto("/components");
    await expect(cards(page)).toHaveCount(total);
    await expect(countStatus(page)).toHaveText(`${total} components`);
  });

  test("searching for \"text\" reduces the card count and updates the live count", async ({ page }) => {
    await page.goto("/components");
    await expect(cards(page)).toHaveCount(total);

    await page.getByRole("searchbox", { name: "Search components" }).fill("text");

    await expect(countStatus(page)).toHaveText(/^\d+ of \d+ components$/);
    const shown = await cards(page).count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
    await expect(countStatus(page)).toHaveText(`${shown} of ${total} components`);
  });

  test("clicking a category filter reduces the results", async ({ page }) => {
    await page.goto("/components");
    await expect(cards(page)).toHaveCount(total);

    const aside = page.getByRole("complementary", { name: "Filters" });
    await aside.getByLabel("Text", { exact: true }).check();

    await expect(countStatus(page)).toHaveText(/^\d+ of \d+ components$/);
    const shown = await cards(page).count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
  });

  test("favorite star toggles aria-pressed and persists after reload", async ({ page }) => {
    await page.goto("/components");
    await expect(cards(page)).toHaveCount(total);

    const star = page.getByRole("button", { name: /^Add .+ to favorites$/ }).first();
    const label = (await star.getAttribute("aria-label")) ?? "";
    const name = label.replace(/^Add /, "").replace(/ to favorites$/, "");
    await expect(star).toHaveAttribute("aria-pressed", "false");

    await star.click();

    const pressed = page.getByRole("button", { name: `Remove ${name} from favorites` });
    await expect(pressed).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(cards(page)).toHaveCount(total);
    await expect(page.getByRole("button", { name: `Remove ${name} from favorites` })).toHaveAttribute("aria-pressed", "true");
  });

  test("\"Favorites only\" shows just the favorited card", async ({ page }) => {
    await page.goto("/components");
    await expect(cards(page)).toHaveCount(total);

    const star = page.getByRole("button", { name: /^Add .+ to favorites$/ }).first();
    const label = (await star.getAttribute("aria-label")) ?? "";
    const name = label.replace(/^Add /, "").replace(/ to favorites$/, "");
    await star.click();
    await expect(page.getByRole("button", { name: `Remove ${name} from favorites` })).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("complementary", { name: "Filters" }).getByLabel("Favorites only", { exact: true }).check();

    await expect(cards(page)).toHaveCount(1);
    await expect(cards(page).first().getByRole("link", { name, exact: true })).toBeVisible();
  });
});
