// Run after `cap add android`. Applies versionName / versionCode and the extra manifest permissions.
// Usage: VERSION_NAME=1.2.3 VERSION_CODE=12 node scripts/configure-android.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const name = process.env.VERSION_NAME;
const code = process.env.VERSION_CODE;
if (!name || !/^[0-9A-Za-z][0-9A-Za-z._+-]*$/.test(name)) throw new Error(`Invalid VERSION_NAME: "${name}"`);
if (!code || !/^[1-9][0-9]{0,9}$/.test(code) || Number(code) > 2100000000) throw new Error(`Invalid VERSION_CODE: "${code}" (1 - 2100000000)`);

/* ---- versionName / versionCode ---- */
const gradleFile = ['android/app/build.gradle', 'android/app/build.gradle.kts'].find(existsSync);
if (!gradleFile) throw new Error('android/app/build.gradle not found. Run `npx cap add android` first.');
let g = readFileSync(gradleFile, 'utf8');
const g0 = g;
g = g.replace(/(versionCode\s*=?\s*)\d+/, `$1${code}`).replace(/(versionName\s*=?\s*)"[^"]*"/, `$1"${name}"`);
if (!g.includes(`${code}`) || !g.includes(`"${name}"`) || g === g0 && !(g0.includes(`versionCode ${code}`) && g0.includes(`"${name}"`)))
  throw new Error(`Could not patch versionCode/versionName in ${gradleFile}`);
writeFileSync(gradleFile, g);
console.log(`${gradleFile}: versionName=${name} versionCode=${code}`);

/* ---- manifest: storage permissions needed by Filesystem (Documents) on Android 10 and older ---- */
const mf = 'android/app/src/main/AndroidManifest.xml';
let m = readFileSync(mf, 'utf8');
const perms = [
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="29" />',
  '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />',
];
for (const p of perms) {
  const key = p.match(/android:name="([^"]+)"/)[1];
  if (!m.includes(key)) m = m.replace('</manifest>', `    ${p}\n</manifest>`);
}
writeFileSync(mf, m);
console.log('AndroidManifest.xml: storage permissions OK');
