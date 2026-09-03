# zhiyuan.dev

Personal site — notes, projects, and a `/now` page. Text-first, dark by default,
built to stay fast.

## Stack

| Piece        | Choice                                    |
| ------------ | ----------------------------------------- |
| Framework    | [Astro 5](https://astro.build) (static)   |
| Styling      | Plain CSS + custom properties, a little Tailwind v4 for layout |
| Motion       | [Motion One](https://motion.dev) (~4kb) — scroll reveals, magnetic hovers |
| Content      | Markdown in `src/content/` (notes + projects) |
| Fonts        | Fraunces (display), Inter (body), JetBrains Mono (labels) — self-hosted via Fontsource |

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the build
```

> Requires Node ≥ 20.19. (Astro 6 needs Node 22 — pinned to Astro 5 for now.)

## Making it yours

- **Identity & links** — `src/lib/site.ts`
- **Colours / type / spacing** — the token block at the top of `src/styles/global.css`
  (swap `--accent` for your own hue)
- **Notes** — add a `.md` file to `src/content/notes/` with `title` + `date` frontmatter
- **Projects** — add a `.md` file to `src/content/projects/`; set `featured: true`
  to surface it on the homepage, `span: "2"` for a wide bento cell
- **/now** — edit `src/pages/now.astro` and bump the `updated` date

## Deploy

Static output — drop `dist/` on any host. Cloudflare Pages / Netlify / Vercel /
GitHub Pages all work with zero config (build: `npm run build`, output: `dist`).
