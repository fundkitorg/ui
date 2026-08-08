# @dono/ui

The Dono design system — shared admin UI components, design tokens, and dashboard
widgets used across the Dono plugin and its add-ons.

## Principle: stick to the designs

Dono has a deliberate, polished visual language. **Never hand-roll one-off styles
in a consuming plugin.** If a UI piece is missing, add it here, composed from the
existing primitives and tokens. Everything routes through the token catalogue —
no hardcoded colours, spacing, radii, or shadows outside `src/scss/_tokens.scss`.

This is what keeps every product built on it visually identical.

## What's here

- `src/components/` — primitives (Btn, Card, Notice, Dialog, Drawer, Field,
  Segmented, Switch, Slider, ColorInput, ...).
- `src/widgets/` — dashboard widgets (MetricCard, WidgetGrid, RevenueChart, ...).
- `src/styling/` — the brand-panel preview machinery (StylePreview, TokenEditor).
- `src/scss/` — tokens + per-component SCSS partials.
- `src/utils/` — `format`, `currency`, `countries`, and the `notify` toast store.

## Consuming it

Components ship as **source** (JSX + SCSS). Consumers transpile with their own
`@wordpress/scripts` toolchain so the JSX compiles identically everywhere.

Install (git tag, no npm registry yet):

```sh
npm install getdono/ui#v0.1.0
```

JS:

```js
import { Btn, Card, Notice, MetricCard } from '@dono/ui';
```

Tell the consumer's webpack to transpile this package's source (the
`@wordpress/scripts` default excludes `node_modules`):

```js
// webpack.config.js
babelRule.exclude = /node_modules\/(?!@dono\/ui)/;
```

SCSS (in a page-level stylesheet):

```scss
@import '@dono/ui/scss/tokens';
@import '@dono/ui/scss/components/buttons';
```

## Storybook

```sh
npm install
npm run storybook
```

Renders every component against the Dono tokens. Storybook uses its own Vite
preview; production consumers use their own build.
