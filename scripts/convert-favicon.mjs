import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

async function main() {
  const svgPath = 'public/favicon.svg';
  const icoPath = 'public/favicon.ico';
  
  try {
    // Render SVG to 64x64 PNG buffer
    const pngBuffer = await sharp(svgPath)
      .resize(64, 64)
      .png()
      .toBuffer();
      
    // Create 22-byte ICO header
    const header = Buffer.alloc(22);
    header.writeUInt16LE(0, 0);       // Reserved
    header.writeUInt16LE(1, 2);       // Type: 1 for icon
    header.writeUInt16LE(1, 4);       // Count: 1 image
    
    header.writeUInt8(64, 6);         // Width: 64
    header.writeUInt8(64, 7);         // Height: 64
    header.writeUInt8(0, 8);          // Color count
    header.writeUInt8(0, 9);          // Reserved
    header.writeUInt16LE(1, 10);      // Planes
    header.writeUInt16LE(32, 12);     // Bits per pixel
    header.writeUInt32LE(pngBuffer.length, 14); // Size of PNG data
    header.writeUInt32LE(22, 18);     // Offset of PNG data: 22
    
    const icoBuffer = Buffer.concat([header, pngBuffer]);
    await writeFile(icoPath, icoBuffer);
    console.log('✓ Successfully converted SVG to ICO at:', icoPath);
  } catch (err) {
    console.error('✗ Failed to convert favicon:', err);
    process.exit(1);
  }
}

main();
