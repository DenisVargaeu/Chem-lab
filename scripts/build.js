import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './validate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function build() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  const targets = ['index.html', 'src', 'assets'];
  for (const item of targets) {
    const srcPath = path.join(rootDir, item);
    if (fs.existsSync(srcPath)) {
      copyRecursive(srcPath, path.join(distDir, item));
    }
  }

  // Create .nojekyll for seamless GitHub Pages deployment
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

  console.log(`✓ Production build created in ${distDir}`);
}

build();
