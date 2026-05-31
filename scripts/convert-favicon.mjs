import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

async function renderPng(svgPath, size) {
  return sharp(svgPath)
    .resize(size, size)
    .png()
    .toBuffer();
}

function createIco(images) {
  const directorySize = images.length * 16;
  const headerSize = 6 + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 for icon
  header.writeUInt16LE(images.length, 4);

  let offset = headerSize;
  images.forEach(({ size, buffer }, index) => {
    const entryOffset = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entryOffset);
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2); // Color count
    header.writeUInt8(0, entryOffset + 3); // Reserved
    header.writeUInt16LE(1, entryOffset + 4); // Planes
    header.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    header.writeUInt32LE(buffer.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, ...images.map(({ buffer }) => buffer)]);
}

async function main() {
  const svgPath = 'public/favicon.svg';
  
  try {
    const favicon16 = await renderPng(svgPath, 16);
    const favicon32 = await renderPng(svgPath, 32);
    const favicon64 = await renderPng(svgPath, 64);
    const appleTouchIcon = await renderPng(svgPath, 180);

    await Promise.all([
      writeFile('public/favicon-16x16.png', favicon16),
      writeFile('public/favicon-32x32.png', favicon32),
      writeFile('public/apple-touch-icon.png', appleTouchIcon),
      writeFile('public/favicon.ico', createIco([
        { size: 16, buffer: favicon16 },
        { size: 32, buffer: favicon32 },
        { size: 64, buffer: favicon64 },
      ])),
    ]);

    console.log('✓ Successfully generated favicon.ico, PNG favicons, and Apple touch icon');
  } catch (err) {
    console.error('✗ Failed to convert favicon:', err);
    process.exit(1);
  }
}

main();
