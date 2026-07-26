from PIL import Image, ImageDraw, ImageFont
import os

PRIMARY = (11, 31, 23, 255)    # #0b1f17
SECONDARY = (248, 244, 230, 255) # #f8f4e6
ACCENT = (217, 154, 40, 255)     # #d99a28

FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

def make_icon(size, maskable=False, filename=None):
    img = Image.new("RGBA", (size, size), PRIMARY)
    draw = ImageDraw.Draw(img)

    if maskable:
        # Safe zone padding ~10% on each side for maskable icons
        pad = int(size * 0.10)
    else:
        pad = int(size * 0.06)

    # Outer gold ring
    ring_w = max(2, int(size * 0.025))
    draw.ellipse([pad, pad, size - pad, size - pad], outline=ACCENT, width=ring_w)

    # Inner circle fill (slightly darker feel via same primary, just for structure)
    inner_pad = pad + ring_w + int(size * 0.02)
    draw.ellipse([inner_pad, inner_pad, size - inner_pad, size - inner_pad], outline=SECONDARY, width=max(1, int(size*0.006)))

    # Monogram "S"
    letter = "S"
    font_size = int(size * 0.5)
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), letter, font=font, fill=ACCENT)

    img.save(filename)
    print("saved", filename, size, "maskable" if maskable else "")

OUT = "/home/claude/Scotly/scotly/public"
os.makedirs(OUT, exist_ok=True)

make_icon(192, False, f"{OUT}/pwa-192x192.png")
make_icon(512, False, f"{OUT}/pwa-512x512.png")
make_icon(512, True, f"{OUT}/pwa-maskable-512x512.png")
make_icon(180, False, f"{OUT}/apple-touch-icon.png")
make_icon(32, False, f"{OUT}/favicon-32x32.png")
make_icon(16, False, f"{OUT}/favicon-16x16.png")
