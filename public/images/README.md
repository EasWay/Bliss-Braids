# Images Directory Structure

This directory contains all static images for the Bliss Braids website.

## Directory Structure

```
images/
├── hero-fallback.jpg          # Hero section fallback image (1920x1080)
├── hero-poster.jpg            # Video poster image (1920x1080)
├── portfolio/                 # Portfolio gallery images
│   ├── style-1.webp          # Optimized portfolio images
│   ├── style-2.webp
│   └── ...
├── services/                  # Service card images
│   ├── knotless-braids.jpg   # 800x800 square images
│   ├── box-braids.jpg
│   ├── cornrows.jpg
│   └── ...
└── IMAGE_OPTIMIZATION_GUIDE.md

videos/
├── hero-braiding.mp4          # Hero background video (< 2MB)
└── hero-braiding.webm         # WebM version for better compression
```

## Image Requirements

### Hero Images
- **hero-fallback.jpg**: 1920x1080, < 200KB, JPEG format
- **hero-poster.jpg**: 1920x1080, < 200KB, extracted from video

### Portfolio Images
- **Format**: WebP (auto-converted by Next.js from JPG/PNG)
- **Dimensions**: 800x800 (square), 800x1067 (portrait), or 1067x800 (landscape)
- **Quality**: 85%
- **Size**: < 150KB per image
- **Naming**: Descriptive names (e.g., `knotless-braids-long.webp`)

### Service Images
- **Format**: WebP (auto-converted by Next.js from JPG/PNG)
- **Dimensions**: 800x800 (square)
- **Quality**: 85%
- **Size**: < 100KB per image
- **Naming**: Must match service ID from `src/data/services.ts`
  - `knotless-braids.jpg`
  - `box-braids.jpg`
  - `cornrows.jpg`

## Adding New Images

1. Place original high-resolution images in the appropriate directory
2. Run the optimization script:
   ```bash
   npm run optimize:images
   ```
3. The script will create optimized WebP versions
4. Update image references in code if needed

## Optimization Tools

- **Automated**: Use `npm run optimize:images` (requires Sharp)
- **Manual**: See `IMAGE_OPTIMIZATION_GUIDE.md` for detailed instructions
- **Online**: Use Squoosh.app or TinyPNG for quick optimization

## Performance Notes

- All images use Next.js Image component for automatic optimization
- Portfolio images use lazy loading (`loading="lazy"`)
- Hero fallback uses priority loading (`priority`)
- Responsive sizes are automatically generated
- WebP/AVIF formats served to supported browsers
