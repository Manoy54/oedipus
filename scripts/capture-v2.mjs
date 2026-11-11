import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const output = ".impeccable/review-v2";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
const routes = [
  ["home", "/"],
  ["story", "/story/"],
  ["characters", "/characters/"],
  ["analysis", "/analysis/"],
  ["passages", "/passages/"],
  ["activities", "/activities/"],
  ["about", "/about/"],
];
const checks = [];
const errors = [];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((image) => {
        image.loading = "eager";
        return image.decode();
      }),
    ),
  );
}
async function capture(page, name, fullPage = true) {
  await settle(page);
  await page.screenshot({
    path: `${output}/${name}.png`,
    fullPage,
    animations: "disabled",
  });
}
for (const [viewport, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [name, route] of routes) {
    await page.goto(`http://127.0.0.1:3100${route}`);
    await capture(page, `${name}-${viewport}`);
    await capture(page, `${name}-${viewport}-first`, false);
    checks.push({
      route,
      width,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
    });
  }
  await page.goto("http://127.0.0.1:3100/story/#investigation-accusation");
  await page
    .getByRole("heading", { name: "A Difficult Accusation", exact: true })
    .waitFor();
  await page
    .locator("summary")
    .filter({ hasText: "Read the evidence" })
    .first()
    .click();
  await page.evaluate(() => scrollTo(0, 0));
  await capture(page, `story-evidence-${viewport}`);
  await page
    .locator("details[open]")
    .filter({ hasText: "At this point in the investigation" })
    .evaluate((element) =>
      scrollTo(0, element.getBoundingClientRect().top + scrollY - 24),
    );
  await capture(page, `story-evidence-${viewport}-detail`, false);
  await page.goto("http://127.0.0.1:3100/characters/");
  await page
    .getByRole("button", { name: "Select Jocasta", exact: true })
    .click();
  await page.getByRole("button", { name: "Family", exact: true }).click();
  await page.evaluate(() => scrollTo(0, 0));
  await capture(page, `characters-family-${viewport}`);
  await page
    .getByRole("group", {
      name: "Choose a character in the relationship network",
    })
    .evaluate((element) =>
      scrollTo(0, element.getBoundingClientRect().top + scrollY - 24),
    );
  await capture(page, `characters-family-${viewport}-detail`, false);
  await page.goto("http://127.0.0.1:3100/passages/");
  await page.getByLabel("Suggested comparison").selectOption({ index: 1 });
  await page.evaluate(() => scrollTo(0, 0));
  await capture(page, `passages-compare-${viewport}`);
  await page
    .locator("#compare-passages")
    .evaluate((element) =>
      scrollTo(0, element.getBoundingClientRect().top + scrollY - 24),
    );
  await capture(page, `passages-compare-${viewport}-detail`, false);
  await page.close();
}
const laptop = await browser.newPage({
  viewport: { width: 1366, height: 768 },
  reducedMotion: "reduce",
});
await laptop.goto("http://127.0.0.1:3100/");
await capture(laptop, "home-laptop-first", false);
const action = await laptop
  .getByRole("link", { name: "Begin the investigation", exact: true })
  .boundingBox();
checks.push({
  route: "/",
  width: 1366,
  height: 768,
  primaryActionInsideViewport:
    !!action && action.y >= 0 && action.y + action.height <= 768,
});
await laptop.close();
const comp = await browser.newPage({
  viewport: { width: 1536, height: 1024 },
  reducedMotion: "reduce",
});
await comp.goto("http://127.0.0.1:3100/");
await capture(comp, "home-comp-size", false);
await comp.close();
const tablet = await browser.newPage({
  viewport: { width: 1024, height: 900 },
  reducedMotion: "reduce",
});
await tablet.goto("http://127.0.0.1:3100/story/#investigation-accusation");
await tablet
  .getByRole("heading", { name: "A Difficult Accusation", exact: true })
  .waitFor();
await tablet.evaluate(() => scrollTo(0, 0));
await capture(tablet, "story-tablet");
await tablet
  .getByRole("complementary", { name: "Knowledge at this episode" })
  .evaluate((element) =>
    scrollTo(0, element.getBoundingClientRect().top + scrollY - 24),
  );
await capture(tablet, "story-tablet-knowledge", false);
await tablet.close();
const anchors = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
for (const id of ["reversal", "dramatic-irony"]) {
  await anchors.goto(`http://127.0.0.1:3100/analysis/#technique-${id}`);
  await settle(anchors);
  await anchors
    .locator(`#technique-${id}`)
    .evaluate((element) =>
      scrollTo({
        top: element.getBoundingClientRect().top + scrollY - 24,
        behavior: "instant",
      }),
    );
  await capture(anchors, `analysis-${id}-anchor`, false);
}
await anchors.close();
await browser.close();
await writeFile(
  `${output}/checks.json`,
  JSON.stringify({ checks, errors }, null, 2),
);
console.log(JSON.stringify({ captures: 46, checks, errors }, null, 2));
