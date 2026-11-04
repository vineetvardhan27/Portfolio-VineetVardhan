from PIL import Image, ImageDraw

def generate_circular_icons():
    # Load source image
    fav = Image.open('Favicon.jpeg').convert('RGB')
    w, h = fav.size

    # Crop with y_offset = 20 for optimal face centering
    y_off = 20
    crop = fav.crop((0, y_off, w, y_off + w))

    # Create high-res antialiased circular mask at 4x resolution
    scale = 4
    mask_size = w * scale
    mask_high = Image.new('L', (mask_size, mask_size), 0)
    draw = ImageDraw.Draw(mask_high)
    draw.ellipse((0, 0, mask_size, mask_size), fill=255)
    mask = mask_high.resize((w, w), Image.Resampling.LANCZOS)

    # Compose RGBA image with transparent corners
    circle_img = Image.new('RGBA', (w, w), (0, 0, 0, 0))
    circle_img.paste(crop, (0, 0), mask)

    # 1. public/icon.png (512x512)
    icon_512 = circle_img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save('public/icon.png', 'PNG')
    print('Generated public/icon.png (512x512, RGBA)')

    # 2. public/avatar.png (256x256)
    avatar_256 = circle_img.resize((256, 256), Image.Resampling.LANCZOS)
    avatar_256.save('public/avatar.png', 'PNG')
    print('Generated public/avatar.png (256x256, RGBA)')

    # 3. public/favicon.ico (16x16, 32x32, 48x48)
    circle_img.save(
        'public/favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print('Generated public/favicon.ico (16, 32, 48, RGBA)')

if __name__ == '__main__':
    generate_circular_icons()

