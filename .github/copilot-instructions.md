# GitHub Copilot Instructions

## Project Overview

This is **Life Guide Book** — an Astro-based personal blog and life guide website deployed on Cloudflare Workers/Pages.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Language**: TypeScript
- **Content**: Markdown (`.md`) and MDX (`.mdx`) files via Astro Content Collections
- **Styling**: Plain CSS (no CSS framework)
- **Adapter**: `@astrojs/cloudflare` for Cloudflare Workers deployment
- **Integrations**: `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`
- **Deployment**: Cloudflare Workers via Wrangler

## Project Structure

```
src/
  components/    # Reusable Astro components (BaseHead, Header, Footer, etc.)
  content/
    blog/        # Blog posts as .md or .mdx files
  layouts/       # Page layout components (BlogPost.astro)
  pages/         # File-based routing (index.astro, about.astro, blog/)
  styles/        # Global CSS (global.css)
  consts.ts      # Shared constants (SITE_TITLE, SITE_DESCRIPTION)
  content.config.ts  # Content collection schema definitions
public/          # Static assets (images, fonts, favicon)
functions/       # Cloudflare Functions
```

## Coding Conventions

- Use **TypeScript** for all `.astro` component frontmatter and `.ts` files.
- Define component props using an `interface Props` block in the frontmatter of `.astro` files.
- Import styles globally through `BaseHead.astro` using `import '../styles/global.css'`.
- Use Astro's built-in `<slot />` for content projection in layout components.
- Blog posts must include frontmatter fields: `title`, `description`, `pubDate`. Optional: `updatedDate`, `heroImage`.
- Use `SITE_TITLE` and `SITE_DESCRIPTION` from `src/consts.ts` for site-wide metadata.
- Components use scoped `<style>` blocks inside `.astro` files.
- Prefer CSS custom properties (`var(--token)`) already defined in `global.css` for colors and spacing.
- Keep pages and components focused; extract reusable logic into separate components.
- Use `CollectionEntry<'blog'>['data']` to type blog post props in layout files.

## Content Guidelines

- Blog posts go in `src/content/blog/` as `.md` or `.mdx` files.
- Use `pubDate` in ISO 8601 format (e.g., `2024-01-15`).
- Hero images should be placed in `public/` and referenced with a root-relative path (e.g., `/blog-placeholder-1.jpg`).

## Build & Deploy

- `npm run dev` — Start local dev server
- `npm run build` — Production build
- `npm run preview` — Build and preview with Wrangler locally
- `npm run deploy` — Deploy to Cloudflare Workers
- `npm run check` — Type-check and dry-run deploy
