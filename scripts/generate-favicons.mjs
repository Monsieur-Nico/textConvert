import { favicons } from 'favicons';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('media/logo.png');
const outDir = path.resolve('media/favicons');

const configuration = {
  path: '/favicons/',
  appName: 'textConvert',
  appShortName: 'textConvert',
  appDescription: 'Public library to convert text into many conventions and formats.',
  background: '#ffffff',
  theme_color: '#ffffff',
  display: 'standalone',
  icons: {
    android: false,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
};

const response = await favicons(source, configuration);

await mkdir(outDir, { recursive: true });

for (const image of response.images) {
  await writeFile(path.join(outDir, image.name), image.contents);
}
for (const file of response.files) {
  await writeFile(path.join(outDir, file.name), file.contents);
}

console.log(
  'Generated:',
  [...response.images.map((i) => i.name), ...response.files.map((f) => f.name)].join(', '),
);
