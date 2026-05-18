"""
Downsample / re-encode PNGs in static/images so the page stays lightweight
for GitHub Pages. Wide images are capped at 2000 px and saved as
optimized PNG. Run from the web/ folder:

    python optimize_images.py
"""
import os
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None  # allow large scientific figures

IMG_DIR = Path(__file__).parent / "static" / "images"
MAX_WIDTH = 2000  # px

def main():
    total_before = 0
    total_after = 0
    for p in sorted(IMG_DIR.glob("*.png")):
        before = p.stat().st_size
        total_before += before
        img = Image.open(p)
        if img.mode == "RGBA":
            # flatten transparency over white so PNG -> 8-bit palette doesn't go ugly
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != "RGB":
            img = img.convert("RGB")
        if img.width > MAX_WIDTH:
            new_h = round(img.height * MAX_WIDTH / img.width)
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
        img.save(p, "PNG", optimize=True)
        after = p.stat().st_size
        total_after += after
        print(f"{p.name:48s}  {before/1024:8.1f} KB -> {after/1024:8.1f} KB")
    print(f"\nTotal:  {total_before/1e6:.2f} MB -> {total_after/1e6:.2f} MB"
          f"  ({100*(1-total_after/total_before):.1f}% smaller)")

if __name__ == "__main__":
    main()
