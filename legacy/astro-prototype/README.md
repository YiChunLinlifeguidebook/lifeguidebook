# Legacy Astro Prototype

A minimal Astro site that uses the `@astrojs/cloudflare` adapter (SSR via Cloudflare Workers).

## ⚠️ Platform Support

| Platform | Supported |
| -------- | --------- |
| Linux (x86_64 / arm64) | ✅ |
| macOS (x86_64 / Apple Silicon) | ✅ |
| Windows (WSL) | ✅ |
| **Android / Termux (arm64)** | ❌ |

`@astrojs/cloudflare` depends on [`workerd`](https://github.com/cloudflare/workerd), which does **not**
support `android arm64 LE`.  Running `npm run build` on Termux will fail with:

```
Unsupported platform: android arm64 LE
```

Use the root-level helper instead — it detects Android automatically and exits cleanly:

```bash
# from the repository root
npm run legacy:build
```

### Recommended: verify with GitHub Actions (Ubuntu)

The [`.github/workflows/legacy-build.yml`](../../.github/workflows/legacy-build.yml)
workflow builds this project on Ubuntu on every push and pull request.

## Local Development (Linux / macOS only)

```bash
cd legacy/astro-prototype
npm install
npm run build
```
