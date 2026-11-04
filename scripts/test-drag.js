const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(600);

  const carousel = page.locator('[role="region"][aria-label="Selected projects"]');
  const box = await carousel.boundingBox();
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;

  console.log('Testing drag to right (previous)...');
  // Drag to right: moves previous slide into view
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 150, startY, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(700);

  const snap1 = await page.evaluate(() => {
    const region = document.querySelector('[role="region"][aria-label="Selected projects"]');
    const activeDot = region.querySelector('[aria-selected="true"]');
    return activeDot?.getAttribute('aria-label');
  });
  console.log('After drag right, active is:', snap1);
  await page.screenshot({ path: 'drag-right.png' });

  console.log('Testing drag to left (next)...');
  // Drag to left: moves next slide into view
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 200, startY, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(700);

  const snap2 = await page.evaluate(() => {
    const region = document.querySelector('[role="region"][aria-label="Selected projects"]');
    const activeDot = region.querySelector('[aria-selected="true"]');
    return activeDot?.getAttribute('aria-label');
  });
  console.log('After drag left, active is:', snap2);
  await page.screenshot({ path: 'drag-left.png' });

  await browser.close();
})();

