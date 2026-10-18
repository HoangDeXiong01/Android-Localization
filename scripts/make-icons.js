// Generates the launcher icons into the Capacitor Android project.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RES = path.join('android', 'app', 'src', 'main', 'res');
const BG = '#1B7F4B';
const GLYPH = 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z';

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108">${inner}</svg>`;
const glyph = (scale) => {
  const t = 54 - 12 * scale;
  return `<g transform="translate(${t} ${t}) scale(${scale})" fill="#fff"><path d="${GLYPH}"/></g>`;
};
const FOREGROUND = svg(glyph(1.9));
const SQUARE = svg(`<rect width="108" height="108" rx="24" fill="${BG}"/>${glyph(2.5)}`);
const ROUND = svg(`<circle cx="54" cy="54" r="54" fill="${BG}"/>${glyph(2.3)}`);

const dens = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const render = (s, size, file) =>
  sharp(Buffer.from(s), { density: 600 }).resize(size, size).png().toFile(file);

(async () => {
  for (const [d, m] of Object.entries(dens)) {
    const dir = path.join(RES, `mipmap-${d}`);
    await render(SQUARE, Math.round(48 * m), path.join(dir, 'ic_launcher.png'));
    await render(ROUND, Math.round(48 * m), path.join(dir, 'ic_launcher_round.png'));
    await render(FOREGROUND, Math.round(108 * m), path.join(dir, 'ic_launcher_foreground.png'));
  }
  fs.writeFileSync(
    path.join(RES, 'values', 'ic_launcher_background.xml'),
    `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BG}</color>\n</resources>\n`
  );
  console.log('Icons generated');
})();
