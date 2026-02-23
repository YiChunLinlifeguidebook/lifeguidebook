# GitHub Copilot Instructions

## Project Status
This project is **NOT** using Astro. Any Astro-related code is legacy/prototype and must not be expanded unless explicitly working under `/legacy`.

## Goal
Build LifeGuide as a product with:
- clear modular structure
- Cloudflare-first deployment
- predictable APIs and data models
- minimal dependencies

## Tech Stack (fill-in)
- Frontend: <TBD>
- Backend/API: <TBD>
- Storage: <TBD>
- Deploy: <TBD>

## Coding Rules
- Prefer small, composable modules.
- Avoid introducing new frameworks unless requested.
- Keep configs minimal and documented.
- When adding features, update README and/or docs.

## Cloudflare Notes (if applicable)
- Use Wrangler for local dev and deploy
- Keep secrets out of git; use environment bindings
- KV/D1/R2 usage must be wrapped in a small data-access layer
