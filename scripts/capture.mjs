import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const output = ".impeccable/review";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
const page = await browser.newPage({ reducedMotion: "reduce" });
const routes = [
  ["home", "/"],
  ["story", "/story/"],
  ["characters", "/characters/"],
  ["analysis", "/analysis/"],
  ["passages", "/passages/"],
  ["activities", "/activities/"],
  ["about", "/about/"],
];
for (const [viewport, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  await page.setViewportSize({ width, height });
  for (const [name, route] of routes) {
    await page.goto("http://127.0.0.1:3100" + route);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("img").evaluateAll((images) =>
      Promise.all(
        images.map((image) => {
          image.loading = "eager";
          return image.decode();
        }),
      ),
    );
    await page.screenshot({
      path: `${output}/${name}-${viewport}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await page.screenshot({
      path: `${output}/${name}-${viewport}-first.png`,
      animations: "disabled",
    });
  }
}
await browser.close();
console.log(
  "Captured desktop and mobile for all seven routes, including readable first-view captures.",
);
