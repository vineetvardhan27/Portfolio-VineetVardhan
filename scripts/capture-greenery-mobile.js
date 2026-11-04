const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await chromium.launch({ channel: 'msedge' });
    const context = await browser.newContext({
      viewport: { width: 390, height: 780 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    console.log('Navigating to https://hotelgreeneryview.com ...');
    await page.goto('https://hotelgreeneryview.com', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Click 'Accept All' cookie button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const acceptBtn = buttons.find(b => b.textContent && b.textContent.includes('Accept All'));
      if (acceptBtn) {
        acceptBtn.click();
      }
    });

    await page.waitForTimeout(1000);

    const outPath = path.join(process.cwd(), 'public/hero/greenery-view-mobile.webp');
    await page.screenshot({ path: outPath, type: 'webp', quality: 85 });
    console.log('Successfully saved clean mobile screenshot to', outPath);

    const stat = fs.statSync(outPath);
    console.log('File size:', (stat.size / 1024).toFixed(1), 'KB');

    await browser.close();
  } catch (err) {
    console.error('Failed to capture:', err);
  }
})();
