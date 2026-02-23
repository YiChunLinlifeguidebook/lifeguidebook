# LifeGuide

## Project Direction

> **This project is NOT using Astro.**
>
> Astro-related files are a legacy prototype only. They live in [`legacy/astro-prototype/`](./legacy/astro-prototype/) and must not be expanded or referenced outside of that directory.

### Future Structure

| Directory | Purpose |
| :--- | :--- |
| `web/` | Frontend application *(TBD)* |
| `api/` | Backend / API layer *(TBD)* |
| `engine/` | Core business logic / AI layer *(TBD)* |
| `legacy/` | Archived prototypes — do not modify |

### Current Active Files

| Path | Description |
| :--- | :--- |
| `index.js` | Cloudflare Worker entry point |
| `functions/` | Cloudflare Pages Functions (API routes) |
| `lifeguide-proto/` | React + Vite frontend prototype |
| `legacy/astro-prototype/` | Archived Astro blog prototype |

### Commands

| Command | Action |
| :--- | :--- |
| `npm run deploy` | Deploy Cloudflare Worker via Wrangler |
| `npm run legacy:dev` | Start legacy Astro prototype dev server |
| `npm run legacy:build` | Build legacy Astro prototype |

---

