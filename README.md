# UniCal — Anonymous Project Page

This folder contains a self-contained static project page for the paper:

> **UniCal: A Unified Calibration System for Visuotactile Sensors via Optical Transparency**
> *Anonymous submission (under review).*

The page is fully anonymized for double-blind review — no author names, no
institutional affiliations, no tracking scripts, no analytics.

## Local preview

The site is plain HTML/CSS/JS. Open `index.html` directly, or run a tiny local
server from this folder:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages (anonymized)

1. Create a **new GitHub account** with no link to your real identity
   (different email, no profile picture, anonymized username).
2. Create a public repo named e.g. `unical-anonymous` and push the contents
   of this `web/` folder to its root.

   ```bash
   cd web
   git init
   git checkout -b main
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<anon-user>/unical-anonymous.git
   git push -u origin main
   ```

3. In the repo settings → **Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
4. The page will be live at
   `https://<anon-user>.github.io/unical-anonymous/`.

   The included `.nojekyll` file disables Jekyll processing so paths like
   `static/...` resolve correctly.

> Before pushing, double-check that no PDFs/embedded metadata in
> `static/images/` reveal author or institution names. The page itself
> contains no identifying information.

## File layout

```
web/
├── index.html               # The page itself
├── README.md                # This file
├── .nojekyll                # Disables Jekyll on GitHub Pages
├── optimize_images.py       # Re-encode / downsample PNGs
└── static/
    ├── css/style.css
    ├── js/script.js
    ├── images/              # PNGs converted from TRO/figures_pdf  (~19 MB)
    └── videos/              # Supplementary videos 1–12  (~280 MB total)
```

## Video size note

The 12 supplementary videos total ~280 MB. Every individual file is below the
**100 MB per-file** GitHub limit, and the total is well within the **1 GB**
GitHub Pages soft limit. All `<video>` tags use `preload="metadata"`, so
visitors only download a video when they press play.

If the page feels heavy, optional ways to shrink:

- Re-encode with ffmpeg at lower bitrate (e.g. `ffmpeg -i in.mp4 -vcodec libx264
  -crf 28 -preset slow -an out.mp4`) — typically cuts size 50–70 % with
  imperceptible quality loss for screen-recorded content.
- Host the heaviest 1–2 videos on an anonymous Google Drive / OSF and embed via
  `<iframe>` instead.

## Editing the page

All content lives in `index.html` — abstract, contributions, results tables,
figure captions, BibTeX. CSS variables at the top of `static/css/style.css`
control the color scheme.
