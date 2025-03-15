import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{svelte,html,ts,js}'],
  theme: {
    extend: {},
  },
  plugins: [forms, typography, daisyui],
};

export default config;
