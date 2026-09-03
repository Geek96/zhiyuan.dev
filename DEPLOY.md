# Deploying zhiyuan.dev

Target: **GitHub (public repo) → Cloudflare Pages**. One-time setup, then every
`git push` redeploys automatically.

---

## 1 · Put the repo on GitHub

You need a GitHub account. Two ways — pick one.

### A. Website (no tools to install)

1. Open <https://github.com/new>
   - **Repository name:** `zhiyuan.dev`
   - **Public**
   - Do **not** add a README / .gitignore / license (the repo already has them)
   - Create repository
2. In a terminal:

   ```bash
   cd ~/Desktop/SharedDocs/Github/zhiyuan.dev
   git remote add origin https://github.com/<YOUR_USERNAME>/zhiyuan.dev.git
   git branch -M main
   git push -u origin main
   ```

3. When git asks to authenticate: sign in via the browser popup, **or** use your
   username + a [Personal Access Token](https://github.com/settings/tokens)
   (classic, scope `repo`) as the password.

### B. GitHub CLI

If you'd rather use `gh` (install from <https://cli.github.com> — there's a macOS
`.pkg` if you don't have Homebrew):

```bash
gh auth login
cd ~/Desktop/SharedDocs/Github/zhiyuan.dev
gh repo create zhiyuan.dev --public --source=. --remote=origin --push
```

---

## 2 · Connect Cloudflare Pages

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages**
   → **Connect to Git**
2. Authorise GitHub, pick the **`zhiyuan.dev`** repo
3. Build settings:

   | Field                  | Value           |
   | ---------------------- | --------------- |
   | Framework preset       | Astro           |
   | Build command          | `npm run build` |
   | Build output directory | `dist`          |

4. **Environment variables** → add:

   | Name       | Value                                              |
   | ---------- | -------------------------------------------------- |
   | `SITE_URL` | `https://<project>.pages.dev` (the URL CF assigns) |

   This feeds `astro.config.mjs` so canonical URLs / sitemap / RSS are correct.
   `.nvmrc` already pins Node, so no `NODE_VERSION` var is needed.
5. **Save and Deploy.** ~1 minute later you get a public URL:
   `https://<project>.pages.dev` — share that with anyone.

Every push to `main` now triggers a new deploy. PRs get preview URLs for free.

---

## 3 · (Later) Use the real `zhiyuan.dev` domain

1. Buy `zhiyuan.dev` — Cloudflare Registrar is simplest since Pages is already
   here (~$10–15/yr; `.dev` is HTTPS-only, which this setup already satisfies).
2. Cloudflare Pages project → **Custom domains** → **Set up a domain** →
   `zhiyuan.dev` → follow the prompts (DNS records are added for you if the
   domain is on Cloudflare).
3. Update the `SITE_URL` env var to `https://zhiyuan.dev` and redeploy.

---

## Rollbacks & checks

- Cloudflare Pages keeps every deploy — roll back from the dashboard in one click.
- Locally, sanity-check a production build before pushing:

  ```bash
  npm run build && npm run preview
  ```
