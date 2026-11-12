import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
const directory = 'src/assets/images';
for (const name of await readdir(directory)) {
  if (!name.endsWith('.jpg')) continue;
  await sharp(`${directory}/${name}`).resize({width:1200,withoutEnlargement:true}).webp({quality:78}).toFile(`${directory}/${name.replace('.jpg','.webp')}`);
}
