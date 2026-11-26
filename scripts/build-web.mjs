// Copies the web app into www/ (Capacitor "webDir").
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';

const out = 'www';
const files = ['index.html'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) {
  if (!existsSync(f)) throw new Error(`Missing ${f}`);
  cpSync(f, `${out}/${f}`);
}
console.log(`Copied ${files.join(', ')} -> ${out}/`);
