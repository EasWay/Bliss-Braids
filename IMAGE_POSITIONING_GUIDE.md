# Media Positioning Guide for Service Grid

## How to Control Image and Video Positioning

The service grid now supports both images and videos with precise control over which part of each media item is visible when using `object-fit: cover`. This is done through the `object-position` CSS property.

## Current Setup

Each media item in `src/data/serviceImages.ts` now has three properties:
- `src`: The image or video path
- `position`: The positioning string that controls which part shows
- `type`: Either 'image' or 'video'

## Position Values

### Vertical Positioning (Y-axis):
- `top`: Shows the top part of the image (best for hairstyles)
- `center`: Shows the middle part of the image
- `bottom`: Shows the bottom part of the image

### Horizontal Positioning (X-axis):
- `left`: Shows the left part of the image
- `center`: Shows the center part of the image
- `right`: Shows the right part of the image

### Combined Positioning:
- `center top`: Center horizontally, top vertically (RECOMMENDED for hairstyles)
- `center center`: Center both ways (default)
- `center bottom`: Center horizontally, bottom vertically
- `left top`: Left horizontally, top vertically
- `right top`: Right horizontally, top vertically

### Percentage Values (Advanced):
You can also use percentage values for precise control:
- `50% 0%`: Center horizontally, top vertically (same as "center top")
- `50% 25%`: Center horizontally, 25% from top
- `50% 50%`: Center both ways (same as "center center")
- `30% 20%`: 30% from left, 20% from top

## How to Adjust Positioning

1. **Open** `src/data/serviceImages.ts`

2. **Find the service** you want to adjust

3. **Change the position** for specific images:

```typescript
'boho-braids': [
  { src: '/images/Boho braids.jpg', position: 'center top', type: 'image' },     // Shows hair at top
  { src: '/images/Boho braids1.jpg', position: 'center 20%', type: 'image' },   // Shows hair slightly lower
  { src: '/videos/boho-process.mp4', position: 'center top', type: 'video' },    // Video showing process
],
```

## Common Use Cases

### For Hairstyle Photos:
- Use `center top` - This focuses on the hair/head area
- Use `50% 15%` - Shows hair with a bit more face visible

### For Full Body Shots:
- Use `center 30%` - Shows upper body including hair
- Use `center center` - Shows the middle portion

### For Close-up Hair Details:
- Use `center top` - Perfect for detailed hair work
- Use `left top` or `right top` - For side angle hair shots

## Testing Your Changes

1. Save the file after making changes
2. The development server will automatically reload
3. Hover over the service cards to see the cycling images
4. Adjust the position values until the hair shows perfectly

## Example Adjustments

If an image shows too much face and not enough hair:
```typescript
// Change from:
{ src: '/images/example.jpg', position: 'center center' }

// To:
{ src: '/images/example.jpg', position: 'center top' }
```

If the hair is cut off on the sides:
```typescript
// Try:
{ src: '/images/example.jpg', position: 'center 20%' }
```

If you need to show a specific side of the hairstyle:
```typescript
// For left side:
{ src: '/images/example.jpg', position: 'left top' }

// For right side:
{ src: '/images/example.jpg', position: 'right top' }
```

## Current Default Settings

All images are currently set to `center top` which should show the hairstyles well. You can fine-tune individual images as needed.

The system maintains `object-fit: cover` so images will always fill the container completely while showing the part you specify with the position value.
## Addi
ng Videos

### Video Format Support
The system supports MP4 videos. For best results:
- Use MP4 format with H.264 codec
- Keep file sizes reasonable (under 10MB recommended)
- Videos will autoplay, loop, and be muted by default

### Adding a Video
```typescript
'island-twist': [
  { src: '/images/Island twist.jpg', position: 'center top', type: 'image' },
  { src: '/videos/Island twist braids.mp4', position: 'center top', type: 'video' },
],
```

### Video Positioning
Videos use the same positioning system as images:
- `center top`: Shows the top part of the video (best for hairstyle videos)
- `center center`: Shows the middle part
- Custom percentages work the same way

### Video Behavior
- Videos autoplay when they appear in the cycle
- Videos are muted (no sound)
- Videos loop continuously
- Videos have the same hover scaling effects as images
- Videos show a 📹 icon in the media counter

### Best Practices for Videos
1. **File Size**: Keep videos under 10MB for fast loading
2. **Duration**: 5-15 seconds is ideal for cycling
3. **Content**: Show the braiding process or final result
4. **Quality**: Use good lighting and stable footage
5. **Format**: MP4 with H.264 codec for best compatibility

### Example Mixed Media Service
```typescript
'knotless-braids': [
  { src: '/images/knotless-1.jpg', position: 'center top', type: 'image' },
  { src: '/images/knotless-2.jpg', position: 'center top', type: 'image' },
  { src: '/videos/knotless-process.mp4', position: 'center top', type: 'video' },
  { src: '/images/knotless-final.jpg', position: 'center top', type: 'image' },
],
```

This creates a rich media experience showing multiple angles, the process, and final results.