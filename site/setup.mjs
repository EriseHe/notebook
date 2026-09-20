import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = '3.11';
const builds = {
  'win32-x64': ['windows-x86_64.zip', '2ab72baf2399450e148ddf7a2a8689806c42e1bba71862b57e220fd9b8456d3d'],
  'linux-x64': ['linux-amd64.tar.gz', '37edb3bbcf722f921a009941bf5874e2e0c09263226c9b4a2d980788cb062ab6'],
  'linux-arm64': ['linux-arm64.tar.gz', '56ed5566ec41d22ec9ee0704e6ac0b98ba102e92384efd5306173a22d314c79a'],
  'darwin-arm64': ['arm64-macOS.zip', '15806bedf9517bfead72e88fe6a6696635c3691efbb6e152173440e9c5bb50b4'],
  'darwin-x64': ['x86_64-macOS.zip', '3b1c1b57f160112c821d02f23d946ede8b7f57a6ccf4632a25a512d334a9291f'],
};

export async function findPandoc() {
  if (process.env.PANDOC_PATH) return process.env.PANDOC_PATH;
  const toolDir = path.join(root, '.tools');
  async function search(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
      const full = path.join(dir, entry.name);
      if (entry.isFile() && entry.name === (process.platform === 'win32' ? 'pandoc.exe' : 'pandoc'))
        return full;
      if (entry.isDirectory()) {
        const result = await search(full);
        if (result) return result;
      }
    }
  }
  const local = await search(toolDir);
  if (local) return local;
  try {
    await exec('pandoc', ['--version']);
    return 'pandoc';
  } catch {}
  throw new Error(
    'Pandoc is missing. Run npm run setup, or set PANDOC_PATH to your existing Pandoc executable.',
  );
}

async function setup() {
  try {
    const found = await findPandoc();
    console.log(`Pandoc ready: ${found}`);
    return;
  } catch {}
  const build = builds[`${process.platform}-${process.arch}`];
  if (!build) throw new Error('Install Pandoc for your platform and set PANDOC_PATH.');
  const [suffix, digest] = build;
  const name = `pandoc-${version}-${suffix}`;
  const toolDir = path.join(root, '.tools');
  await fs.mkdir(toolDir, { recursive: true });
  console.log(`Downloading the official Pandoc ${version} release…`);
  const response = await fetch(`https://github.com/jgm/pandoc/releases/download/${version}/${name}`);
  if (!response.ok) throw new Error(`Pandoc download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (createHash('sha256').update(bytes).digest('hex') !== digest)
    throw new Error('Pandoc checksum mismatch. Nothing was extracted.');
  const archive = path.join(toolDir, name);
  await fs.writeFile(archive, bytes);
  if (process.platform === 'win32') {
    await exec('tar.exe', ['-xf', archive, '-C', toolDir]);
  } else {
    await exec(
      suffix.endsWith('.zip') ? 'unzip' : 'tar',
      suffix.endsWith('.zip') ? ['-q', archive, '-d', toolDir] : ['-xzf', archive, '-C', toolDir],
    );
  }
  console.log(`Pandoc ready: ${await findPandoc()}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  setup().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
