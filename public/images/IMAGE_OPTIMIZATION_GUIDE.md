# Image & Video Optimization Guide

This guide provides instructions for optimizing all media assets for the Bliss Braids website.

## Video Optimization

### Hero Video Requirements
- **Location**: `/public/videos/hero-braiding.mp4` and `/public/videos/hero-braiding.webm`
- **Target Size**: < 2MB
- **Recommended Dimensions**: 1920x1080 (Full HD)
- **Duration**: 10-15 seconds loop
- **Frame Rate**: 24-30 fps

### Compression Commands

Using FFmpeg (recommended):

```bash
# MP4 format (H.264 codec)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an -movflags +faststart public/videos/hero-braiding.mp4

# WebM format (VP9 codec) - better compression
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1920:1080 -an public/videos/hero-braiding.webm
```

**Parameters Explained**:
- `-crf 28` (MP4) / `-crf 35` (WebM): Quality level (higher = smaller file, lower quality)
- `-preset slow`: Better compression (takes longer to encode)
- `-vf scale=1920:1080`: Resize to Full HD
- `-an`: Remove audio (not needed for background video)
- `-movflags +faststart`: Enable streaming (video starts playing before fully downloaded)

### Poster Image
- **Location**: `/public/images/hero-poster.jpg`
- **Purpose**: Displays instantly while video loads
- **Dimensions**: 1920x1080
- **Format**: JPEG (optimized)
- **Size Target**: < 200KB

Create poster from video:
```bash
ffmpeg -i public/videos/hero-braiding.mp4 -ss 00:00:02 -vframes 1 -q:v 2 public/images/hero-poster.jpg
```

## Image Optimization

### Portfolio Images
- **Location**: `/public/images/portfolio/`
- **Format**: WebP (Next.js auto-converts)
- **Dimensions**: 
  - Square: 800x800
  - Portrait: 800x1067 (3:4 ratio)
  - Landscape: 1067x800 (4:3 ratio)
- **Quality**: 85%
- **Size Target**: < 150KB per image

### Service Images
- **Location**: `/public/images/services/`
- **Format**: WebP (Next.js auto-converts)
- **Dimensions**: 800x800 (square)
- **Quality**: 85%
- **Size Target**: < 100KB per image

### Conversion Tools

#### Using Sharp (Node.js - Recommended)

Install Sharp:
```bash
npm install sharp
```

Create optimization script (`scripts/optimize-images.js`):
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: 85 })
    .toFile(outputPath);
  
  const stats = fs.statSync(outputPath);
  console.log(`✓ ${outputPath} - ${(stats.size / 1024).toFixed(2)}KB`);
}

// Example usage
async function optimizePortfolio() {
  const portfolioDir = './public/images/portfolio';
  const files = fs.readdirSync(portfolioDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(portfolioDir, file);
      const outputPath = path.join(portfolioDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      await optimizeImage(inputPath, outputPath, 800, 800);
    }
  }
}

optimizePortfolio();
```

Run:
```bash
node scripts/optimize-images.js
```

#### Using Online Tools (No Installation)

1. **Squoosh** (https://squoosh.app/)
   - Upload image
   - Select WebP format
   - Set quality to 85%
   - Download optimized image

2. **TinyPNG** (https://tinypng.com/)
   - Upload JPEG/PNG
   - Download compressed version
   - Then convert to WebP using Squoosh

#### Using ImageMagick (Command Line)

```bash
# Convert to WebP
magick input.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 85 output.webp

# Batch convert all images in directory
for file in *.jpg; do magick "$file" -resize 800x800^ -gravity center -extent 800x800 -quality 85 "${file%.jpg}.webp"; done
```

## Next.js Image Component Benefits

The Next.js Image component automatically:
- Serves WebP/AVIF formats to supported browsers
- Generates multiple sizes for responsive images
- Lazy loads images below the fold
- Prevents Cumulative Layout Shift (CLS)
- Optimizes images on-demand

## Checklist

### Video Assets
- [ ] Hero video compressed to < 2MB (MP4)
- [ ] Hero video WebM version created
- [ ] Poster image created and optimized (< 200KB)
- [ ] Video tested on mobile devices

### Portfolio Images
- [ ] All images resized to appropriate dimensions
- [ ] All images converted to WebP format
- [ ] File sizes under 150KB each
- [ ] Images tested in gallery with lazy loading

### Service Images
- [ ] All service images resized to 800x800
- [ ] All images converted to WebP format
- [ ] File sizes under 100KB each
- [ ] Images tested on service cards

### Configuration
- [ ] Next.js config updated with image optimization settings
- [ ] Image components use `loading="lazy"` for below-fold images
- [ ] Image components use `priority` for above-fold images
- [ ] Proper `sizes` attribute set for responsive images

## Performance Targets

After optimization, aim for:
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Page Size**: < 3MB (including all images)
- **Portfolio Gallery Load Time**: < 3s on 3G connection

## Testing

Test performance using:
1. Chrome DevTools Lighthouse
2. PageSpeed Insights (https://pagespeed.web.dev/)
3. WebPageTest (https://www.webpagetest.org/)

Monitor:
- Image load times
- Total page weight
- Core Web Vitals scores
- Mobile performance (throttled 3G)
