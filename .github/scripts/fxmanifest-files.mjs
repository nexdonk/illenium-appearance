// Parses fxmanifest.lua to determine which repo files are actually part of the
// FiveM resource (server/client/shared scripts, ui_page, files, escrow_ignore).
// Changes to anything else (.github, README, .gitignore, etc.) are excluded
// from release notes — they don't affect the running script.

import { existsSync, readFileSync } from 'node:fs';

const BLOCK_DIRECTIVES = [
  'shared_scripts', 'shared_script',
  'client_scripts', 'client_script',
  'server_scripts', 'server_script',
  'files',
  'escrow_ignore',
];

const STRING_DIRECTIVES = ['ui_page'];

function parseManifestPatterns(text) {
  const patterns = [];

  for (const dir of BLOCK_DIRECTIVES) {
    const re = new RegExp(`\\b${dir}\\s*\\{([\\s\\S]*?)\\}`, 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      const items = m[1].match(/['"]([^'"]+)['"]/g) || [];
      for (const it of items) {
        const v = it.slice(1, -1);
        if (v.startsWith('@')) continue; // external resource reference
        patterns.push(v);
      }
    }
  }

  for (const dir of STRING_DIRECTIVES) {
    const re = new RegExp(`^\\s*${dir}\\s+['"]([^'"]+)['"]`, 'gm');
    let m;
    while ((m = re.exec(text)) !== null) {
      if (!m[1].startsWith('@')) patterns.push(m[1]);
    }
  }

  return patterns;
}

function globToRegex(glob) {
  let s = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') { s += '.*'; i++; }
      else                     { s += '[^/]*'; }
    } else if (c === '?') {
      s += '[^/]';
    } else if (/[.+^${}()|[\]\\]/.test(c)) {
      s += '\\' + c;
    } else {
      s += c;
    }
  }
  return new RegExp('^' + s + '$');
}

export function getFxFileMatcher(manifestPath = 'fxmanifest.lua') {
  if (!existsSync(manifestPath)) return () => true;
  const text = readFileSync(manifestPath, 'utf8');
  const patterns = parseManifestPatterns(text);
  const regexes = patterns.map(globToRegex);

  // The ui_page bundle (e.g. web/dist) is compiled from source living beside
  // it (web/src, package.json, vite config). The manifest only declares the
  // dist files, which would drop UI source commits from release notes — so
  // treat the ui_page's whole top-level folder as part of the resource. Those
  // files still collapse to `web/*` in the changed-files list.
  const uiPrefixes = [];
  const uiRe = /^\s*ui_page\s+['"]([^'"@]+)['"]/gm;
  let m;
  while ((m = uiRe.exec(text)) !== null) {
    const top = m[1].split('/')[0];
    if (top && top !== m[1]) uiPrefixes.push(top + '/');
  }

  return (file) => {
    if (file === manifestPath) return true;
    if (uiPrefixes.some(p => file.startsWith(p))) return true;
    return regexes.some(r => r.test(file));
  };
}
