const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function processImage(filename) {
  try {
    console.log(`Processing ${filename}...`);
    const blob = await removeBackground(filename);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(filename.replace('.jpeg', '_transparent.png'), buffer);
    console.log(`Processed ${filename}`);
  } catch (err) {
    console.error(`Error on ${filename}:`, err);
  }
}

async function main() {
  await processImage('pato.jpeg');
  await processImage('pepe.jpeg');
  await processImage('juancarlos.jpeg');
  await processImage('damian.jpeg');
}
main();
