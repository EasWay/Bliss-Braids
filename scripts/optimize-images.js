/**
 * Image Optimization Script for Bliss Braids
 * 
 * This script optimizes all images in the public directory:
 * - Converts to WebP format
 * - Resizes to appropriate dimensions
 * - Compresses to target quality
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  portfolio: {
    inputDir: './public/images/portfolio',
    dimensions: { width: 800, height: 800 },
    quality: 85,
    targetSize: 150 * 1024 // 150KB
  },
  services: {
    inputDir: './public/images/services',
    dimensions: { width: 800, height: 800 },
    quality: 85,
    targetSize: 100 * 1024 // 100KB
  },
  hero: {
    inputPath: './public/images/hero-fallback.jpg',
    outputPath: './public/images/hero-fallback-optimized.jpg',
    dimensions: { width: 1920, height: 1080 },
    quality: 85,
    targetSize: 200 * 1024 // 200KB
  }
};

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputPath, width, height, quality = 85) {
  try {
    const info = await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality })
      .toFile(outputPath);
    
    const sizeKB = (info.size / 1024).toFixed(2);
    console.log(`✓ ${path.basename(outputPath)} - ${sizeKB}KB (${info.width}x${info.height})`);
    
    return info;
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Optimize all images in a directory
 */
async function optimizeDirectory(config) {
  const { inputDir, dimensions, quality } = config;
  
  if (!fs.existsSync(inputDir)) {
    console.log(`⚠ Directory not found: ${inputDir}`);
    return;
  }
  
  console.log(`\n📁 Processing ${inputDir}...`);
  
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('-optimized')
  );
  
  if (imageFiles.length === 0) {
    console.log('  No images to optimize');
    return;
  }
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      inputDir, 
      file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    );
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;
    
    // Optimize
    const info = await optimizeImage(
      inputPath, 
      outputPath, 
      dimensions.width, 
      dimensions.height, 
      quality
    );
    
    if (info) {
      totalOptimizedSize += info.size;
    }
  }
  
  // Summary
  const savedBytes = totalOriginalSize - totalOptimizedSize;
  const savedPercent = ((savedBytes / totalOriginalSize) * 100).toFixed(1);
  
  console.log(`\n  Original: ${(totalOriginalSize / 1024).toFixed(2)}KB`);
  console.log(`  Optimized: ${(totalOptimizedSize / 1024).toFixed(2)}KB`);
  console.log(`  Saved: ${(savedBytes / 1024).toFixed(2)}KB (${savedPercent}%)`);
}

/**
 * Create poster image from video (requires FFmpeg)
 */
function createPosterImage() {
  const { execSync } = require('child_process');
  
  const videoPath = './public/videos/hero-braiding.mp4';
  const posterPath = './public/images/hero-poster.jpg';
  
  if (!fs.existsSync(videoPath)) {
    console.log('\n⚠ Hero video not found. Skipping poster generation.');
    return;
  }
  
  try {
    console.log('\n🎬 Creating poster image from video...');
    execSync(
      `ffmpeg -i ${videoPath} -ss 00:00:02 -vframes 1 -q:v 2 ${posterPath}`,
      { stdio: 'inherit' }
    );
    console.log(`✓ Poster image created: ${posterPath}`);
  } catch (error) {
    console.log('⚠ FFmpeg not available. Please create poster image manually.');
    console.log('  See IMAGE_OPTIMIZATION_GUIDE.md for instructions.');
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Bliss Braids Image Optimization\n');
  console.log('='.repeat(50));
  
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp is not installed. Please run: npm install sharp');
    process.exit(1);
  }
  
  // Optimize portfolio images
  await optimizeDirectory(CONFIG.portfolio);
  
  // Optimize service images
  await optimizeDirectory(CONFIG.services);
  
  // Optimize hero fallback image
  if (fs.existsSync(CONFIG.hero.inputPath)) {
    console.log('\n📁 Processing hero fallback image...');
    await optimizeImage(
      CONFIG.hero.inputPath,
      CONFIG.hero.outputPath,
      CONFIG.hero.dimensions.width,
      CONFIG.hero.dimensions.height,
      CONFIG.hero.quality
    );
  }
  
  // Create poster image (optional - requires FFmpeg)
  createPosterImage();
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Optimization complete!\n');
  console.log('Next steps:');
  console.log('1. Review optimized images in their directories');
  console.log('2. Update image references to use .webp extensions');
  console.log('3. Test the website to ensure images load correctly');
  console.log('4. Run Lighthouse audit to verify performance improvements');
  console.log('\nSee IMAGE_OPTIMIZATION_GUIDE.md for more details.');
}

// Run the script
main().catch(console.error);
