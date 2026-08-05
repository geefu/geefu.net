# geefu.net

Minimal static site. **Nuxt 4** (Vue 3), dark terminal aesthetic, deployed to Netlify as fully static output.

- `/` — wordmark landing page.
- `/billing` — private billing details, **AES-256-GCM encrypted** and gated behind a PIN. The site ships only ciphertext; decryption happens in the browser via Web Crypto. Also `noindex` + robots-disallowed so it stays out of search engines.

## Requirements

- Node.js **>= 20** (CI + Netlify use 22)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static)

```bash
npm run generate   # output in .output/public (also symlinked as ./dist)
npm run preview    # preview the static build
```

Netlify config lives in `netlify.toml` (`npm run generate` → publish `dist`).

> Nitro chooses its preset from the environment. Locally it uses `static` and
> writes `.output/public`; on Netlify it detects `NETLIFY` and uses
> `netlify-static`, which writes `dist`. Netlify publishes `dist` because that
> path is valid in both places (Nuxt symlinks `dist` → `.output/public` locally).

## Updating billing details

Billing data lives in `billing.json` (git-ignored — **never committed**). Only the
encrypted `public/billing.enc.json` is committed. To change the data or rotate the PIN:

```bash
# edit billing.json, then:
npm run encrypt        # prompts for a PIN (hidden), writes public/billing.enc.json
git add public/billing.enc.json && git commit && git push
```

The PIN is never stored in the repo — it's the only key to the data, so keep it safe.
Losing it means re-running `encrypt` with a new PIN.
