import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath:
    "C:/Users/armen/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe",
});
const page = await browser.newPage();
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
    await page.goto("http://127.0.0.1:3100" + route);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("main *, footer *, header *")]
        .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          text: el.textContent?.slice(0, 55),
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 8),
    }));
    if (result.width > width + 1)
      console.log(JSON.stringify({ width, route, ...result }));
  }
}
await browser.close();
