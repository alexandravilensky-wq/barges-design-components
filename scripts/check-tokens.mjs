/**
 * Fails when a component uses a token or text style the installed barges-design-tokens
 * version doesn't have (e.g. renamed in Figma), or a hardcoded color instead of a token.
 *
 *   npm run check:tokens
 */
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';

const require = createRequire(import.meta.url);
const tokensDir = dirname(require.resolve('barges-design-tokens/package.json'));
const { version } = JSON.parse(readFileSync(join(tokensDir, 'package.json'), 'utf8'));
const brands = Object.keys(JSON.parse(readFileSync(join(tokensDir, 'build/brands.json'), 'utf8')));

// Every brand must define the token, otherwise one brand renders broken.
const defined = brands.map(brand => {
  const css = readFileSync(join(tokensDir, 'build/css', `${brand}.css`), 'utf8');
  return {
    brand,
    vars: new Set(css.match(/--[\w-]+(?=\s*:)/g)),
    classes: new Set([...css.matchAll(/^\.(text-[\w-]+)\s*\{/gm)].map(m => m[1])),
  };
});

const files = readdirSync('src', { recursive: true, withFileTypes: true })
  .filter(f => f.isFile() && /\.(css|tsx?)$/.test(f.name) && !f.name.includes('.stories.'))
  .map(f => join(f.parentPath, f.name));

const problems = [];
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const at = `${relative('.', file)}:${i + 1}`;
    for (const [, name] of line.matchAll(/var\(\s*(--[\w-]+)/g)) {
      const missing = defined.filter(d => !d.vars.has(name)).map(d => d.brand);
      if (missing.length) problems.push(`${at}  ${name} is not in tokens v${version} (${missing.join(', ')})`);
    }
    for (const [, name] of line.matchAll(/['"\s](text-(?:display|title|subtitle|body|caption|button)-[\w-]+)/g)) {
      const missing = defined.filter(d => !d.classes.has(name)).map(d => d.brand);
      if (missing.length) problems.push(`${at}  text style .${name} is not in tokens v${version} (${missing.join(', ')})`);
    }
    if (file.endsWith('.css') && /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(line)) {
      problems.push(`${at}  hardcoded color, use a --color-* token`);
    }
  });
}

if (problems.length) {
  console.error(`✗ ${problems.length} token problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${files.length} files use only tokens from barges-design-tokens v${version} (${brands.join(', ')})`);
