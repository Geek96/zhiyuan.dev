// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Set SITE_URL in the host's env (Cloudflare Pages) to your live URL —
// e.g. https://zhiyuan-dev.pages.dev until the custom domain is attached.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://zhiyuan.dev",
  integrations: [mdx(), sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
