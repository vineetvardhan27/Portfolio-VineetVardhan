import os
import shutil
from PIL import Image

ASSETS_DIR = "Assets"
PUBLIC_IMAGES_DIR = os.path.join("public", "images")
PUBLIC_HERO_DIR = os.path.join("public", "hero")
PUBLIC_ASSETS_DIR = os.path.join("public", "assets")

os.makedirs(PUBLIC_IMAGES_DIR, exist_ok=True)
os.makedirs(PUBLIC_HERO_DIR, exist_ok=True)
os.makedirs(PUBLIC_ASSETS_DIR, exist_ok=True)

# 1. Copy exact assets to public/assets/
shutil.copy2(os.path.join(ASSETS_DIR, "hotelgreeneryview.png"), os.path.join(PUBLIC_ASSETS_DIR, "hotelgreeneryview.png"))
shutil.copy2(os.path.join(ASSETS_DIR, "anugratravels..png"), os.path.join(PUBLIC_ASSETS_DIR, "anugratravels.png"))
shutil.copy2(os.path.join(ASSETS_DIR, "anugratravels..png"), os.path.join(PUBLIC_ASSETS_DIR, "anugratravels..png"))
shutil.copy2(os.path.join(ASSETS_DIR, "Grove PMS.png"), os.path.join(PUBLIC_ASSETS_DIR, "grove-pms.png"))
shutil.copy2(os.path.join(ASSETS_DIR, "Grove PMS.png"), os.path.join(PUBLIC_ASSETS_DIR, "Grove PMS.png"))

# 2. Copy high-res PNGs to public/images/
shutil.copy2(os.path.join(ASSETS_DIR, "hotelgreeneryview.png"), os.path.join(PUBLIC_IMAGES_DIR, "hotel-greenery.png"))
shutil.copy2(os.path.join(ASSETS_DIR, "anugratravels..png"), os.path.join(PUBLIC_IMAGES_DIR, "anugra-travels.png"))
shutil.copy2(os.path.join(ASSETS_DIR, "Grove PMS.png"), os.path.join(PUBLIC_IMAGES_DIR, "grove-pms.png"))

# 3. Create WebP versions for public/hero/
mapping = [
    ("greenery-view.webp", os.path.join(ASSETS_DIR, "hotelgreeneryview.png")),
    ("anugra.webp", os.path.join(ASSETS_DIR, "anugratravels..png")),
    ("grove.webp", os.path.join(ASSETS_DIR, "Grove PMS.png")),
]

for out_name, src_path in mapping:
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    # Target 1400px wide for extra crispness on retina screens while keeping under 100KB
    target_w = 1400
    target_h = int(h * (target_w / w))
    resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    out_path = os.path.join(PUBLIC_HERO_DIR, out_name)
    resized.save(out_path, "WEBP", quality=88, method=6)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Generated {out_path}: {resized.size}, {size_kb:.1f} KB")

print("Asset processing complete!")

