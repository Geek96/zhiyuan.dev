// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import cloudflare from "@astrojs/cloudflare";
import keystatic from "@keystatic/astro";

// https://astro.build/config
// Set SITE_URL in the host's env (Cloudflare Pages) to your live URL —
// e.g. https://zhiyuan-dev.pages.dev until the custom domain is attached.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://zhiyuan.dev",
  // Stays "static" (the default) — everything prerenders except the two
  // routes Keystatic injects (/keystatic, /api/keystatic/*), which mark
  // themselves `prerender: false`. The adapter below just gives those two
  // routes somewhere to run as Cloudflare Pages Functions.
  adapter: cloudflare(),
  integrations: [mdx(), sitemap(), react(), markdoc(), keystatic()],
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
