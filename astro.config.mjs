// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://lifeguidebook.pages.dev",
	integrations: [mdx(), sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
		routes: {
			strategy: "auto",
		},
	}),
	vite: {
		build: {
			cssMinify: true,
			minify: "terser",
		},
	},
});
