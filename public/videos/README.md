# Videos Directory

This directory contains video assets for the Bliss Braids website.

## Required Videos

### Hero Background Video

**File**: `hero-braiding.mp4` and `hero-braiding.webm`

**Specifications**:
- **Duration**: 10-15 seconds (looping)
- **Dimensions**: 1920x1080 (Full HD)
- **Frame Rate**: 24-30 fps
- **File Size**: < 2MB (critical for mobile performance)
- **Audio**: None (removed for smaller file size)
- **Content**: Close-up shots of braiding process, hands working, finished styles

**Formats**:
1. **MP4 (H.264)**: Primary format, best browser compatibility
2. **WebM (VP9)**: Better compression, modern browsers

## Video Compression

### Using FFmpeg (Recommended)

Install FFmpeg: https://ffmpeg.org/download.html

#### MP4 Format (H.264)
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf scale=1920:1080 \
  -an \
  -movflags +faststart \
  public/videos/hero-braiding.mp4
```

#### WebM Format (VP9)
```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf scale=1920:1080 \
  -an \
  public/videos/hero-braiding.webm
```

### Compression Parameters Explained

- **-crf 28/35**: Quality level (lower = better quality, larger file)
  - MP4: 23 (high quality) to 28 (good quality, smaller)
  - WebM: 30 (high quality) to 35 (good quality, smaller)
- **-preset slow**: Better compression (takes longer to encode)
- **-vf scale=1920:1080**: Resize to Full HD
- **-an**: Remove audio track
- **-movflags +faststart**: Enable progressive download (video starts before fully loaded)

### Creating Poster Image

Extract a frame from the video to use as poster:

```bash
ffmpeg -i public/videos/hero-braiding.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  public/images/hero-poster.jpg
```

This creates a high-quality JPEG from the 2-second mark of the video.

## Video Optimization Tips

1. **Keep it short**: 10-15 seconds is ideal for looping
2. **Remove audio**: Background videos don't need sound
3. **Optimize for mobile**: Test on 3G connection
4. **Use poster image**: Provides instant visual feedback
5. **Provide fallback**: Static image for browsers that don't support video

## Testing

Test video performance:
1. Check file size: `ls -lh public/videos/`
2. Test on mobile device with throttled connection
3. Verify autoplay works on iOS (requires `muted` and `playsInline`)
4. Check that poster image displays before video loads

## Alternative: Using Online Tools

If FFmpeg is not available:

1. **HandBrake** (https://handbrake.fr/)
   - Free, cross-platform video converter
   - Use "Web Optimized" preset
   - Set quality to RF 28
   - Remove audio track

2. **CloudConvert** (https://cloudconvert.com/)
   - Online video converter
   - Upload video
   - Select MP4/WebM output
   - Set quality to 85%

3. **Clideo** (https://clideo.com/compress-video)
   - Simple online compression
   - Upload and compress
   - Download optimized version

## Performance Impact

A well-optimized hero video:
- Loads in < 2 seconds on 4G
- Doesn't block page rendering
- Provides smooth playback
- Enhances visual appeal without hurting performance

Target metrics:
- **File Size**: < 2MB
- **Load Time**: < 2s on 4G
- **First Frame**: < 500ms (with poster)
