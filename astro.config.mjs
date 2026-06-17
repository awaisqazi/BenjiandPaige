// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mapouradventures.com',
  server: process.env.PORT ? { port: Number(process.env.PORT) } : {},
});
