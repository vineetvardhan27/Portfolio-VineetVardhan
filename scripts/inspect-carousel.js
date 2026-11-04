const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(600);

  // Set dark theme if needed or check html class
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(300);

  await page.screenshot({ path: 'dark-initial.png' });

  // Test prev button
  const prevBtn = page.locator('button[aria-label="Previous project"]');
  await prevBtn.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'dark-after-prev.png' });

  // Test next button
  const nextBtn = page.locator('button[aria-label="Next project"]');
  await nextBtn.click();
  await page.waitForTimeout(700);
  await nextBtn.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'dark-after-next2.png' });

  await browser.close();
})();
