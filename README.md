# Barges design components

React components from the Figma [Components](https://www.figma.com/design/vpbbr2KgylpqMOQdBi52Gf/Components) file, styled only with tokens from [barges-design-tokens](https://github.com/alexandravilensky-wq/barges-design-tokens).

Storybook: https://alexandravilensky-wq.github.io/barges-design-components/

## Run locally

```bash
npm install
npm run storybook
```

Use the **Brand** and **Theme** buttons in the toolbar to check every brand in light and dark.

## Tokens

Tokens are installed from GitHub. While the Figma library is still changing, this repo follows `main` of barges-design-tokens:

```json
"barges-design-tokens": "github:alexandravilensky-wq/barges-design-tokens#main"
```

The published Storybook rebuilds every night (and on **Actions → Storybook → Run workflow**) with the latest tokens, so token and icon changes show up without changing this repo. Once the library is stable, pin a tag instead (`#v1.0.0`).

**Get the latest tokens locally:**

```bash
npm i github:alexandravilensky-wq/barges-design-tokens#main
npm run check:tokens
```

Components use only CSS variables (`var(--color-text-primary)`) and the text style classes (`text-title-small-emphasis`). Never hardcode colors or fonts.

`check:tokens` runs on every build. It fails if a component uses a token or text style that the current tokens don't have (e.g. renamed in Figma), or a hardcoded color.
