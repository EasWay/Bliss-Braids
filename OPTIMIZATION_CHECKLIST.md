# Image & Video Optimization Checklist

This checklist helps ensure all media assets are properly optimized for the Bliss Braids website.

## ✅ Completed Optimizations

### Code Changes
- [x] Next.js config updated with image optimization settings
- [x] Hero video component includes `poster` attribute
- [x] Hero video includes `preload="metadata"` for faster loading
- [x] Portfolio images use `loading="lazy"` for lazy loading
- [x] Portfolio images use `quality={85}` for optimal compression
- [x] Service card images use `loading="lazy"` for lazy loading
- [x] Service card images use `quality={85}` for optimal compression
- [x] Hero fallback image uses `priority` for above-fold loading
- [x] All Image components have proper `sizes` attribute

### Tools & Scripts
- [x] Image optimization script created (`scripts/optimize-images.js`)
- [x] Sharp dependency added to package.json
- [x] NPM script added (`npm run optimize:images`)
- [x] Comprehensive optimization guide created
- [x] Directory structure documentation created

## 📋 Asset Preparation Checklist

### Hero Video (Required)
- [ ] Source video obtained (10-15 seconds of braiding footage)
- [ ] Video compressed to MP4 format (< 2MB)
- [ ] Video compressed to WebM format (< 2MB)
- [ ] Poster image extracted from video
- [ ] Files placed in `public/videos/` directory
- [ ] Video tested on mobile devices
- [ ] Autoplay and loop verified

### Hero Images (Required)
- [ ] Hero fallback image created (1920x1080)
- [ ] Hero poster image created (1920x1080)
- [ ] Images optimized (< 200KB each)
- [ ] Files placed in `public/images/` directory

### Service Images (Required)
- [ ] Knotless braids image (`knotless-braids.jpg`)
- [ ] Box braids image (`box-braids.jpg`)
- [ ] Cornrows image (`cornrows.jpg`)
- [ ] All images are 800x800 square
- [ ] Images optimized using `npm run optimize:images`
- [ ] Files placed in `public/images/services/` directory

### Portfolio Images (Required)
- [ ] At least 12-20 portfolio images collected
- [ ] Images represent different styles (box braids, knotless, cornrows)
- [ ] Mix of aspect ratios (square, portrait, landscape)
- [ ] Images optimized using `npm run optimize:images`
- [ ] Files placed in `public/images/portfolio/` directory
- [ ] Image data updated in `src/data/portfolio.ts`

## 🚀 Optimization Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Prepare Source Images
1. Collect high-resolution images
2. Place in appropriate directories:
   - `public/images/services/` - Service images
   - `public/images/portfolio/` - Portfolio images
   - `public/images/` - Hero images

### Step 3: Run Optimization
```bash
npm run optimize:images
```

### Step 4: Compress Video
```bash
# MP4 format
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an -movflags +faststart public/videos/hero-braiding.mp4

# WebM format
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1920:1080 -an public/videos/hero-braiding.webm

# Poster image
ffmpeg -i public/videos/hero-braiding.mp4 -ss 00:00:02 -vframes 1 -q:v 2 public/images/hero-poster.jpg
```

### Step 5: Verify Optimization
```bash
# Check file sizes
ls -lh public/images/services/
ls -lh public/images/portfolio/
ls -lh public/videos/

# Run development server
npm run dev

# Test in browser at http://localhost:3000
```

## 🧪 Testing Checklist

### Visual Testing
- [ ] All images load correctly on homepage
- [ ] Portfolio gallery displays all images
- [ ] Service cards show correct images
- [ ] Hero video plays automatically
- [ ] Hero poster displays before video loads
- [ ] Fallback image works when video fails

### Performance Testing
- [ ] Run Lighthouse audit (target score: 90+)
- [ ] Check LCP (target: < 2.5s)
- [ ] Check CLS (target: < 0.1)
- [ ] Test on mobile device
- [ ] Test on throttled 3G connection
- [ ] Verify lazy loading works (images load as you scroll)

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 📊 Performance Targets

After optimization, you should achieve:

| Metric | Target | Current |
|--------|--------|---------|
| Hero video size | < 2MB | - |
| Portfolio image size | < 150KB | - |
| Service image size | < 100KB | - |
| Total page size | < 3MB | - |
| LCP | < 2.5s | - |
| CLS | < 0.1 | - |
| Lighthouse Performance | > 90 | - |

## 🔧 Troubleshooting

### Images not loading
- Check file paths match exactly (case-sensitive)
- Verify files are in `public/` directory
- Check browser console for errors

### Video not playing
- Ensure video is < 2MB
- Check video format (MP4 H.264)
- Verify `muted` and `playsInline` attributes
- Test poster image displays

### Optimization script fails
- Ensure Sharp is installed: `npm install sharp`
- Check Node.js version (18+)
- Verify source images exist

### Poor performance
- Run `npm run optimize:images` again
- Check video file size (must be < 2MB)
- Verify lazy loading is working
- Test with throttled connection

## 📚 Additional Resources

- **Detailed Guide**: `public/images/IMAGE_OPTIMIZATION_GUIDE.md`
- **Video Guide**: `public/videos/README.md`
- **Directory Structure**: `public/images/README.md`
- **Next.js Image Docs**: https://nextjs.org/docs/app/api-reference/components/image
- **FFmpeg Documentation**: https://ffmpeg.org/documentation.html

## 🎯 Next Steps

After completing this checklist:

1. Run full Lighthouse audit
2. Test on real mobile devices
3. Monitor Core Web Vitals in production
4. Consider adding more portfolio images over time
5. Update video seasonally for fresh content
