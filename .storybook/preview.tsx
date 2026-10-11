import { useEffect, useState, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import brands from 'barges-design-tokens/brands.json';
import tokensPkg from 'barges-design-tokens/package.json';
import { BrandProvider, type Brand } from '../src/brand';

// Figma breakpoints (figma-breakpoint.json in barges-design-tokens).
const SCREENS = {
  mobile: { name: 'Mobile (<768)', styles: { width: '375px', height: '812px' }, type: 'mobile' },
  tablet: { name: 'Tablet (768–1023)', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  desktop: { name: 'Desktop (≥1024)', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
} as const;

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: Object.entries(brands).map(([value, title]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Light or dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'moon',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'purple-garden', theme: 'light' },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    viewport: { options: SCREENS },
    docs: { description: { component: `Tokens: barges-design-tokens v${tokensPkg.version}` } },
  },
  decorators: [
    (Story, { globals }) => (
      <Themed brand={globals.brand as Brand} theme={globals.theme}>
        <Story />
      </Themed>
    ),
  ],
};

// Inside the tokens Storybook (composition, ?refId=… in the URL) this Storybook's toolbar
// is hidden and its globals never change, so follow the Brand and Theme the tokens
// Storybook shares in localStorage (see barges-design-tokens/.storybook/manager.ts).
const COMPOSED = new URLSearchParams(window.location.search).has('refId');
const SHARED_KEY = 'barges-storybook-globals';

function readShared(): { brand?: Brand; theme?: string } {
  try {
    return JSON.parse(localStorage.getItem(SHARED_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function useShared() {
  const [shared, setShared] = useState(readShared);
  useEffect(() => {
    if (!COMPOSED) return;
    const onStorage = (e: StorageEvent) => e.key === SHARED_KEY && setShared(readShared());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return COMPOSED ? shared : {};
}

function Themed({ brand: ownBrand, theme: ownTheme, children }: { brand: Brand; theme: string; children: ReactNode }) {
  const shared = useShared();
  const brand = shared.brand ?? ownBrand;
  const theme = shared.theme ?? ownTheme;

  // Same mechanism as the tokens Storybook: swap the brand stylesheet and flip
  // data-theme; components only use CSS variables, so they re-theme.
  const id = 'brand-tokens';
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!link) {
    link = Object.assign(document.createElement('link'), { id, rel: 'stylesheet' });
    document.head.appendChild(link);
  }
  const href = `./css/${brand}.css`;
  if (link.getAttribute('href') !== href) link.setAttribute('href', href);
  document.documentElement.dataset.theme = theme;

  Object.assign(document.body.style, {
    margin: '0',
    background: 'var(--color-background-primary)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-family-body), system-ui, sans-serif',
  });
  return <BrandProvider brand={brand}>{children}</BrandProvider>;
}

export default preview;
