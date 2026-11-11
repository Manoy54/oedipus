import { test, expect } from "@playwright/test";
import { questions } from "../src/lib/content";

test("client navigation opens linked evidence and mobile menu works by keyboard", async ({
  page,
}) => {
  await page.goto("/analysis/");
  await page
    .locator("summary")
    .filter({ hasText: "Read the passage in context" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/analysis\/$/);
  await page
    .getByRole("link", { name: "Open complete passage", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/passages\/#sight-own-hand$/);
  await expect(page.locator("#sight-own-hand")).toBeInViewport();
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator("header details summary");
  await menu.focus();
  await menu.press("Enter");
  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNavigation).toBeVisible();
  const characters = mobileNavigation.getByRole("link", {
    name: "Characters",
    exact: true,
  });
  await characters.focus();
  await characters.press("Enter");
  await expect(page).toHaveURL(/\/characters\/$/);
  await expect(mobileNavigation).toBeHidden();
  const search = page.getByLabel("Find a character");
  await search.focus();
  await page.keyboard.type("jocasta");
  const profile = page.locator("#jocasta > summary");
  await profile.focus();
  await profile.press("Enter");
  await expect(page.locator("#jocasta")).toHaveAttribute("open", "");
});

test("all seven routes, assets, and mobile layouts work", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1366, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/story/",
      "/characters/",
      "/analysis/",
      "/passages/",
      "/activities/",
      "/about/",
    ]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
      await page.locator("img").evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            if (!(image instanceof HTMLImageElement))
              throw new Error("Unexpected image element");
            image.loading = "eager";
            return image.decode();
          }),
        ),
      );
    }
  }
  expect(errors).toEqual([]);
});
test("character aliases, relationships, and direct profile anchors", async ({
  page,
}) => {
  await page.goto("/characters/");
  await page.getByLabel("Find a character").fill(" TEIRESIAS ");
  await expect(
    page
      .locator('section[aria-label="Character collection"]')
      .getByRole("status"),
  ).toContainText("1 character");
  await page.getByLabel("Find a character").fill("no such person");
  await expect(page.getByText("No characters match that name.")).toBeVisible();
  await page.goto("/characters/#jocasta");
  await expect(page.locator("#jocasta")).toHaveAttribute("open", "");
});
test("timeline comparison changes the records and restores linked episode", async ({
  page,
}) => {
  await page.goto("/story/");
  await page
    .getByRole("button", {
      name: "Full study timeline (spoilers)",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Earlier events & aftermath" })
    .click();
  await expect(
    page.getByText("Chronological order", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Recognition", exact: true })
    .first()
    .click();
  await expect(page.locator("#recognition")).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Collapse all" }).click();
  await expect(page.locator("main details[open]")).toHaveCount(0);
  await page.getByRole("button", { name: "Expand all" }).click();
  await expect(page.locator("main details[open]")).toHaveCount(8);
});
test("passage filtering, bookmarks, and empty saved view", async ({ page }) => {
  await page.goto("/passages/");
  await page.getByLabel("Saved only").check();
  await expect(page.getByText("No saved passages yet.")).toBeVisible();
  await page.getByRole("button", { name: "Show all passages" }).click();
  await page.getByLabel("Search the text").fill("BURDEN");
  await page.getByLabel("Speaker", { exact: true }).selectOption("Oedipus");
  await page.getByLabel("Theme", { exact: true }).selectOption("authority");
  await expect(page.locator("main article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Bookmark The burden of a city", exact: true })
    .click();
  await page.reload();
  await page.getByLabel("Saved only").check();
  await expect(page.locator("main article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Remove bookmark for The burden of a city" })
    .click();
  await expect(page.getByText("No saved passages yet.")).toBeVisible();
});
test("quiz validates, locks each answer, scores, and retries", async ({
  page,
}) => {
  await page.goto("/activities/");
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.locator("#quiz").getByRole("alert")).toContainText(
    "Choose an answer",
  );
  for (let index = 0; index < questions.length; index++) {
    await page
      .locator("#quiz input[type=radio]")
      .nth(questions[index].correctIndex)
      .check();
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(
      page.locator("#quiz input[type=radio]").first(),
    ).toBeDisabled();
    await page
      .getByRole("button", {
        name: index === questions.length - 1 ? "See results" : "Next question",
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "You scored 10 out of 10." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Retry quiz" }).click();
  await expect(
    page.getByText("Question 1 of 10", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#quiz input:checked")).toHaveCount(0);
});
test("reflection saves locally, copies, counts words, and handles failed saving", async ({
  page,
}) => {
  await page.goto("/activities/#reflection");
  const editor = page.locator("#reflection article").first();
  await expect(editor).toContainText("0 words");
  await editor.locator("textarea").fill("Truth requires careful evidence.");
  await expect(editor).toContainText("4 words");
  await editor.getByRole("button", { name: "Save on this device" }).click();
  await page.reload();
  await expect(editor.locator("textarea")).toHaveValue(
    "Truth requires careful evidence.",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.resolve() },
    });
  });
  await editor.getByRole("button", { name: "Copy response" }).click();
  await expect(
    editor.getByRole("status").filter({ hasText: "Copied" }),
  ).toBeVisible();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "QuotaExceededError");
    };
  });
  await editor.locator("textarea").fill("Keep this unsaved text.");
  await editor.getByRole("button", { name: "Save on this device" }).click();
  await expect(editor).toContainText("Browser storage is unavailable");
  await expect(editor.locator("textarea")).toHaveValue(
    "Keep this unsaved text.",
  );
});
test("corrupt browser data does not break reading or make false save claims", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("oedipus-guide:activity:v1", "invalid json"),
  );
  await page.goto("/passages/");
  await expect(page.locator("main article")).toHaveCount(14);
  await expect(
    page.getByText("Saved activity could not be read.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Bookmark The burden of a city",
      exact: true,
    }),
  ).toBeDisabled();
});
test("ordering remains operable through buttons and reveals its explanation", async ({
  page,
}) => {
  await page.goto("/activities/#ordering");
  await page
    .getByRole("button", { name: "Move News from Corinth down" })
    .click();
  await expect(page.locator("#ordering [role=status]")).toContainText(
    "position 2",
  );
  await page.getByRole("button", { name: "Check sequence" }).click();
  await expect(
    page.getByRole("heading", { name: "The order of discovery" }),
  ).toBeVisible();
});
