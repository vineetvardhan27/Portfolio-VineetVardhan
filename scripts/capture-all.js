const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/VINEET VARDHAN/.gemini/antigravity/brain/3d41223e-6406-4b36-9beb-61a2227e279d';

const configs = [
  { name: 'hero-dark-1440.png', width: 1440, height: 900, dark: true },
  { name: 'hero-dark-768.png', width: 768, height: 1024, dark: true },
  { name: 'hero-dark-375.png', width: 375, height: 667, dark: true },
  { name: 'hero-light-1440.png', width: 1440, height: 900, dark: false },
  { name: 'hero-light-768.png', width: 768, height: 1024, dark: false },
  { name: 'hero-light-375.png', width: 375, height: 667, dark: false },
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });

  for (const cfg of configs) {
    const page = await browser.newPage({
      viewport: { width: cfg.width, height: cfg.height },
      colorScheme: cfg.dark ? 'dark' : 'light'
    });
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(600);

    await page.evaluate((isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, cfg.dark);

    await page.waitForTimeout(400);

    const outPath = path.join(ARTIFACT_DIR, cfg.name);
    await page.screenshot({ path: outPath });
    console.log(`Saved ${cfg.name}`);
    await page.close();
  }

  await browser.close();
})();

