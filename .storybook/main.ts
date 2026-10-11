import { existsSync } from 'node:fs';
import type { StorybookConfig } from '@storybook/react-vite';

// Brand CSS comes from the installed barges-design-tokens package (pinned tag in package.json).
const tokensCss = new URL('../node_modules/barges-design-tokens/build/css', import.meta.url).pathname;
// Licensed fonts (ABC Social) are never committed; use the local tokens checkout when it's next to this repo.
const licensedFonts = new URL('../../barges-design-tokens/fonts/licensed', import.meta.url).pathname;

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: [
    { from: tokensCss, to: '/css' },
    ...(existsSync(licensedFonts) ? [{ from: licensedFonts, to: '/fonts' }] : []),
  ],
};

export default config;
