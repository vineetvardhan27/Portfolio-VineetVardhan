const { chromium } = require('C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/VINEET VARDHAN/.gemini/antigravity/brain/3d41223e-6406-4b36-9beb-61a2227e279d';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });

  // 1. DESKTOP CAPTURES (1440x900)
  for (const dark of [true, false]) {
    const themeName = dark ? 'dark' : 'light';
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      colorScheme: dark ? 'dark' : 'light',
    });

    await page.goto('http://localhost:3000');
    await page.waitForTimeout(600);

    await page.evaluate((isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, dark);

    await page.waitForTimeout(300);

    // Scroll to #process header
    const processEl = page.locator('#process');
    await processEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Get the container dimensions to calculate scroll positions for each stage
    const metrics = await page.evaluate(() => {
      const container = document.querySelector('#process .h-\\[400vh\\]');
      if (!container) return null;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const top = rect.top + scrollTop;
      const height = rect.height;
      return { top, height, span: height - window.innerHeight };
    });

    console.log(`Desktop ${themeName} container metrics:`, metrics);

    if (metrics) {
      const stages = [
        { name: 'stage-1-understand', progress: 0.10 },
        { name: 'stage-2-design', progress: 0.38 },
        { name: 'stage-3-build', progress: 0.62 },
        { name: 'stage-4-launch', progress: 0.88 },
      ];

      for (const st of stages) {
        const targetY = metrics.top + st.progress * metrics.span;
        await page.evaluate((y) => window.scrollTo(0, y), targetY);
        await page.waitForTimeout(600);

        const outPath = path.join(ARTIFACT_DIR, `process-${themeName}-${st.name}-1440.png`);
        await page.screenshot({ path: outPath });
        console.log(`Saved ${outPath}`);
      }

      // Scroll back up to test reverse scrub
      const targetY2 = metrics.top + 0.38 * metrics.span;
      await page.evaluate((y) => window.scrollTo(0, y), targetY2);
      await page.waitForTimeout(600);
      const outReverse = path.join(ARTIFACT_DIR, `process-${themeName}-reverse-design-1440.png`);
      await page.screenshot({ path: outReverse });
      console.log(`Saved reverse scrub screenshot`);
    }

    await page.close();
  }

  // 2. MOBILE CAPTURES (390x844)
  for (const dark of [true, false]) {
    const themeName = dark ? 'dark' : 'light';
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      colorScheme: dark ? 'dark' : 'light',
    });

    await page.goto('http://localhost:3000');
    await page.waitForTimeout(600);

    await page.evaluate((isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, dark);

    await page.waitForTimeout(300);

    const processEl = page.locator('#process');
    await processEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const outMobile = path.join(ARTIFACT_DIR, `process-${themeName}-390.png`);
    await page.screenshot({ path: outMobile });
    console.log(`Saved ${outMobile}`);

    // Scroll through mobile stages
    for (let s = 1; s <= 4; s++) {
      await page.evaluate((step) => {
        const stageCards = Array.from(document.querySelectorAll('#process .space-y-16 > div')).filter(el => !el.classList.contains('w-px'));
        if (stageCards[step - 1]) {
          stageCards[step - 1].scrollIntoView({ behavior: 'instant', block: 'start' });
          window.scrollBy(0, -70);
        }
      }, s);
      await page.waitForTimeout(500);

      const outMobileStage = path.join(ARTIFACT_DIR, `process-${themeName}-mobile-stage-${s}-390.png`);
      await page.screenshot({ path: outMobileStage });
      console.log(`Saved ${outMobileStage}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('All captures complete!');
})();
