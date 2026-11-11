import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE});
const page=await browser.newPage({reducedMotion:'reduce'});
for(const [name,width] of [['desktop',1440],['mobile',390]]){
 await page.setViewportSize({width,height:1000});
 await page.goto('http://127.0.0.1:3100/story/'); await page.evaluate(()=>document.fonts.ready);
 await page.getByRole('button',{name:'Earlier events & aftermath'}).click();
 await page.locator('section[aria-labelledby="timeline-title"]').screenshot({path:`.impeccable/review/story-chronology-${name}.png`,animations:'disabled'});
}
await page.setViewportSize({width:320,height:844});await page.goto('http://127.0.0.1:3100/characters/');await page.evaluate(()=>document.fonts.ready);
await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>{image.loading='eager';return image.decode()})));
await page.screenshot({path:'.impeccable/review/characters-mobile320.png',fullPage:true,animations:'disabled'});
await browser.close();console.log('Captured reviewed chronology state and 320px character index.');
