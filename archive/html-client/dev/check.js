import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const files = (await Promise.all(['public/assets/js', 'dev', 'tests'].map(walk))).flat().filter((file) => /\.[cm]?js$/.test(file));
let failed = false;
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) { console.error(result.stderr); failed = true; }
}
for (const file of (await walk('public')).filter((file) => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  if (/<(?:script|link)\b[^>]*(?:src|href)=["'](?:https?:)?\/\//i.test(html)) {
    console.error(`External dependency: ${file}`); failed = true;
  }
}
console.log(`Checked ${files.length} JS files and offline HTML assets.`);
process.exitCode = failed ? 1 : 0;
