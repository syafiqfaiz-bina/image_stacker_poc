import sharp from 'sharp';
import fs from 'fs';

const stampMetadata = await sharp('stamp.png').metadata();
const signatureMetadata = await sharp('signature.png').metadata();
const stampOffset = {
    top: 0,
    left: 0
};
const signatureOffset = {
    top: stampMetadata.height,
    left: (stampMetadata.width - signatureMetadata.width)/2
};
const output = await sharp('template.png', { animated: true })
  .composite([
    { input: 'stamp.png', top: 0, left: stampOffset.left, blend: 'over'},
    { input: 'signature.png', top: signatureOffset.top, left: signatureOffset.left, blend: 'over'}
  ])
  .resize({
    height: stampMetadata.height + signatureMetadata.height,
    width: stampMetadata.width,
    fit: sharp.fit.contain,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .toBuffer();

//   save the output buffer to a file
fs.writeFileSync('output.png', output);
