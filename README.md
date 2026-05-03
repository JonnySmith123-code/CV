# Personal Website

A minimal, plain HTML/CSS/JS personal site — home, CV, research, articles. No build step.

## Structure

```
.
├── index.html              # Home (name, tagline, recent articles, social icons)
├── cv.html                 # CV (education, research, publications, awards, ...)
├── research.html           # Publications list
├── 404.html                # Not found page
├── feed.xml                # RSS feed (edit when adding articles)
├── articles/
│   ├── index.html          # Articles list (add a row for each new article)
│   └── *.html              # Individual articles
└── assets/
    ├── style.css           # All styles (light/dark theme via CSS vars)
    ├── theme.js            # Theme toggle + system-preference sync
    ├── toc.js              # Article TOC sidebar + reading progress bar
    ├── photo.jpg           # Profile photo (add your own)
    └── pgp.txt             # PGP public key (optional)
```

## Editing

Open the folder in VSCode. Search-and-replace `Your Name`, `you@example.com`, and `example.com` to set your identity. Update social links in `index.html` (`#` placeholders → real URLs).

### Adding an article

1. Copy an existing file in `articles/` to `articles/your-slug.html`.
2. Edit the title, date, and body.
3. Add a row to `articles/index.html` and (optionally) to the home page list in `index.html`.
4. Add an `<item>` to `feed.xml`.

### Adding a publication

Duplicate an `<article class="publication">` block in `research.html` and edit the title, authors, tags, links, venue, and abstract. Drop figure images in `assets/`.

## Running locally

### Option A — VSCode Live Server (easiest)

1. Install the **Live Server** extension (by Ritwick Dey) in VSCode.
2. Right-click `index.html` → **Open with Live Server**.
3. The site opens at `http://127.0.0.1:5500/` and reloads on save.

### Option B — Python

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

### Option C — Node

```bash
npx serve .
```

## Deploying

All paths are relative, so the site works on any static host.

### GitHub Pages (free)

1. Create a repo (e.g. `yourusername.github.io` for a user site, or any name for a project site).
2. Push this folder to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:yourusername/REPO.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build from branch → `main` / root**.
4. Live in ~1 minute at `https://yourusername.github.io/REPO/` (or `https://yourusername.github.io/` for a user site).

For a custom domain: add a `CNAME` file containing your domain (e.g. `example.com`) and configure DNS at your registrar (an `A` record for the apex pointing at GitHub's IPs, or a `CNAME` for `www` pointing at `yourusername.github.io`).

### Cloudflare Pages (free, faster CDN)

1. Push the repo to GitHub (as above).
2. At [pages.cloudflare.com](https://pages.cloudflare.com): **Create project → Connect to Git → pick the repo**.
3. Build settings: **build command** empty, **output directory** `/`. Deploy.
4. Add a custom domain under **Custom domains**.

### Netlify (free)

1. Push to GitHub.
2. At [app.netlify.com](https://app.netlify.com): **Add new site → Import from Git → pick the repo**.
3. Build settings: leave empty. Deploy.

### Vercel (free)

1. Push to GitHub.
2. At [vercel.com/new](https://vercel.com/new): import the repo, framework preset **Other**, deploy.

### Drag-and-drop (no Git)

Both Netlify and Cloudflare Pages let you drag the folder onto their dashboard for an instant deploy without using Git — useful for a first preview.

## Notes

- The dark/light theme follows the OS preference by default; the moon icon toggles and persists the choice in `localStorage`.
- The `feed.xml` is hand-maintained — update it when you publish a post.
- Update `<link>` URLs in `feed.xml` to your real domain after deploying.
- Drop a `favicon.ico` in the root if you want a browser tab icon.
