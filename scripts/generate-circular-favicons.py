from PIL import Image, ImageDraw

def generate_circular_icons():
    # Load source image
    fav = Image.open('Favicon.jpeg').convert('RGB')
    w, h = fav.size

    # Square crop 840x840 centered at x=494, y=480
    # Head fills ~80% of diameter with proportional 35px hair margin and 125px neck/collar anchor
    crop_x = 74
    crop_y = 60
    crop_size = 840
    crop = fav.crop((crop_x, crop_y, crop_x + crop_size, crop_y + crop_size))

    # 4x supersampled circular mask for ultra-smooth antialiasing
    scale = 4
    mask_hi = Image.new('L', (crop_size * scale, crop_size * scale), 0)
    draw = ImageDraw.Draw(mask_hi)
    draw.ellipse((0, 0, crop_size * scale, crop_size * scale), fill=255)
    mask = mask_hi.resize((crop_size, crop_size), Image.Resampling.LANCZOS)

    # Circular RGBA image with transparent corners
    circle_img = Image.new('RGBA', (crop_size, crop_size), (0, 0, 0, 0))
    circle_img.paste(crop, (0, 0), mask)

    # 1. public/icon.png (512x512, master icon)
    circle_img.resize((512, 512), Image.Resampling.LANCZOS).save('public/icon.png', 'PNG')
    print('Generated public/icon.png (512x512, RGBA)')

    # 2. public/icon-192.png (192x192, Android & Google Search)
    circle_img.resize((192, 192), Image.Resampling.LANCZOS).save('public/icon-192.png', 'PNG')
    print('Generated public/icon-192.png (192x192, RGBA)')

    # 3. public/icon-96.png (96x96, Google Search 2x multiple)
    circle_img.resize((96, 96), Image.Resampling.LANCZOS).save('public/icon-96.png', 'PNG')
    print('Generated public/icon-96.png (96x96, RGBA)')

    # 4. public/icon-48.png (48x48, Google Search baseline multiple)
    circle_img.resize((48, 48), Image.Resampling.LANCZOS).save('public/icon-48.png', 'PNG')
    print('Generated public/icon-48.png (48x48, RGBA)')

    # 5. public/avatar.png (256x256, navbar and schema markup)
    circle_img.resize((256, 256), Image.Resampling.LANCZOS).save('public/avatar.png', 'PNG')
    print('Generated public/avatar.png (256x256, RGBA)')

    # 6. public/favicon.ico (16x16, 32x32, 48x48 RGBA)
    circle_img.save(
        'public/favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print('Generated public/favicon.ico (16, 32, 48, RGBA)')

    # 7. public/apple-icon.png (180x180, square RGB for Apple squircle)
    crop.resize((180, 180), Image.Resampling.LANCZOS).save('public/apple-icon.png', 'PNG')
    print('Generated public/apple-icon.png (180x180, RGB)')

    # 8. public/avatar.jpg (512x512, 1:1 square fallback)
    crop.resize((512, 512), Image.Resampling.LANCZOS).save('public/avatar.jpg', 'JPEG', quality=95)
    print('Generated public/avatar.jpg (512x512, RGB)')

if __name__ == '__main__':
    generate_circular_icons()
