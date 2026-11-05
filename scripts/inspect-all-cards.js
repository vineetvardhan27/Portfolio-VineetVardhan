const { chromium } = require("C:/Users/VINEET VARDHAN/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright");
const path = require("path");

const ARTIFACT_DIR = "C:\\Users\\VINEET VARDHAN\\.gemini\\antigravity\\brain\\3d41223e-6406-4b36-9beb-61a2227e279d";

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Scroll down to #work so whileInView triggers for all project cards
  await page.evaluate(() => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(1000);

  const workSection = page.locator("#work");
  await workSection.screenshot({ path: path.join(ARTIFACT_DIR, "inspect-work-all-cards.png") });
  console.log("Captured inspect-work-all-cards.png");

  await browser.close();
}

main().catch(console.error);

