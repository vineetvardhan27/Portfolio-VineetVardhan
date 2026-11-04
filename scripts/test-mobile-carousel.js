const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 },
    colorScheme: 'dark'
  });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(600);

  // Scroll to carousel
  const carousel = page.locator('[role="region"][aria-label="Selected projects"]');
  await carousel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'mobile-carousel.png' });
  await browser.close();
})();

