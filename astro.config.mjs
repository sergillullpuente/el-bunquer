import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'hybrid',

  integrations: [    tailwind({
      applyBaseStyles: false,
      nesting: true
  }), preact()],

  adapter: netlify(),
});