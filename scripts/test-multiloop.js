const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(600);

  const prevBtn = page.locator('button[aria-label="Previous project"]');
  const nextBtn = page.locator('button[aria-label="Next project"]');

  console.log('Testing 6 Prev clicks:');
  for (let i = 0; i < 6; i++) {
    await prevBtn.click();
    await page.waitForTimeout(400);
    const active = await page.evaluate(() => {
      return document.querySelector('[role="region"][aria-label="Selected projects"] [aria-selected="true"]')?.getAttribute('aria-label');
    });
    console.log(`Prev ${i + 1}:`, active);
  }

  console.log('Testing 6 Next clicks:');
  for (let i = 0; i < 6; i++) {
    await nextBtn.click();
    await page.waitForTimeout(400);
    const active = await page.evaluate(() => {
      return document.querySelector('[role="region"][aria-label="Selected projects"] [aria-selected="true"]')?.getAttribute('aria-label');
    });
    console.log(`Next ${i + 1}:`, active);
  }

  await browser.close();
})();

