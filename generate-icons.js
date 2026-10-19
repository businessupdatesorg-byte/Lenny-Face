/**
 * Generate All Site Icons & Favicons for TheLennyFaces.com
 * Creates:
 * - favicon.svg (Vector SVG favicon for modern browsers)
 * - favicon.ico (Multi-size 16x16, 32x32, 48x48 ICO for legacy & search engines)
 * - favicon-16x16.png
 * - favicon-32x32.png
 * - apple-touch-icon.png (180x180 for iOS Safari)
 * - android-chrome-192x192.png (192x192 for Android / PWA)
 * - android-chrome-512x512.png (512x512 for PWA splash)
 * - site.webmanifest
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = __dirname;

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="45%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  
  <!-- Modern Squircle Background -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)"/>
  
  <!-- Subtle Inner Border Glow -->
  <rect x="8" y="8" width="496" height="496" rx="108" fill="none" stroke="#ffffff" stroke-width="8" stroke-opacity="0.28"/>
  
  <!-- Iconic Lenny Face Glyph -->
  <text x="50%" y="54%" 
        font-size="150" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'DejaVu Sans', Arial, sans-serif" 
        font-weight="bold" 
        fill="#ffffff" 
        stroke="#ffffff" 
        stroke-width="6" 
        stroke-linejoin="round" 
        text-anchor="middle" 
        dominant-baseline="middle">( ͡° ͜ʖ ͡°)</text>
</svg>
`;

// Helper: Create valid ICO file buffer from array of PNG buffers
function buildIcoBuffer(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + (16 * count);
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color count (0 = >=8bpp)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.data.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset to image data
    entries.push(entry);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.data)]);
}

async function generateAllIcons() {
  console.log('🎨 Generating high-res site icons and favicons...');

  // 1. Save favicon.svg
  fs.writeFileSync(path.join(ROOT_DIR, 'favicon.svg'), svgContent, 'utf8');
  console.log('  ✓ Generated: favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate standard PNGs
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'favicon-16x16.png'), png16);
  console.log('  ✓ Generated: favicon-16x16.png');

  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'favicon-32x32.png'), png32);
  console.log('  ✓ Generated: favicon-32x32.png');

  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'favicon-48x48.png'), png48);
  console.log('  ✓ Generated: favicon-48x48.png');

  const pngApple = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'apple-touch-icon.png'), pngApple);
  console.log('  ✓ Generated: apple-touch-icon.png (180x180)');

  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'android-chrome-192x192.png'), png192);
  console.log('  ✓ Generated: android-chrome-192x192.png');

  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(ROOT_DIR, 'android-chrome-512x512.png'), png512);
  console.log('  ✓ Generated: android-chrome-512x512.png');

  // 3. Build multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = buildIcoBuffer([
    { width: 16, height: 16, data: png16 },
    { width: 32, height: 32, data: png32 },
    { width: 48, height: 48, data: png48 }
  ]);
  fs.writeFileSync(path.join(ROOT_DIR, 'favicon.ico'), icoBuffer);
  console.log('  ✓ Generated: favicon.ico (Multi-size 16x16, 32x32, 48x48)');

  // 4. Generate site.webmanifest
  const manifest = {
    name: "Lenny Face ( ͡° ͜ʖ ͡°)",
    short_name: "Lenny Face",
    description: "Copy and paste Lenny Face ( ͡° ͜ʖ ͡°), text faces, kaomoji, and aesthetic symbols in 1-click.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#10b981",
    background_color: "#f8fafc",
    display: "standalone"
  };
  fs.writeFileSync(path.join(ROOT_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('  ✓ Generated: site.webmanifest');

  console.log('✨ All site icons generated successfully!');
}

generateAllIcons().catch(err => {
  console.error('❌ Icon generation failed:', err);
  process.exit(1);
});
