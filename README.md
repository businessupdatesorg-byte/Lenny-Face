# Lenny Face Pro ( ͡° ͜ʖ ͡°)

> Ultra-fast, zero-framework text face repository, kaomoji directory, and interactive Lenny Face Generator built for 100/100 Google PageSpeed scores, complete international SEO, and instant 1-click clipboard copy.

[![PageSpeed](https://img.shields.io/badge/PageSpeed-100%2F100-success?style=for-the-badge&logo=googlechrome)](https://pagespeed.web.dev/)
[![Zero-Framework](https://img.shields.io/badge/Architecture-Zero--Framework_HTML5%2FCSS3-blueviolet?style=for-the-badge)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-cyan?style=for-the-badge)](LICENSE)

---

## ✨ Features

- **⚡ 1-Click Copy**: Instant clipboard copy with animated toast notifications across desktop and mobile.
- **🛠️ Interactive Lenny Face Maker**: Live face generator with customizable arms, eyes, and mouths, plus a one-click randomizer.
- **🚀 100/100 Core Web Vitals**: Pure vanilla HTML5/CSS3/JS architecture with pre-rendered static HTML cards for instantaneous loading (`< 0.5s` LCP, `0.00` CLS).
- **🎨 Modern Dark / Light Mode**: Sleek dark theme with neon glassmorphism accents (`#8B5CF6`, `#EC4899`, `#06B6D4`) and high-contrast light mode.
- **🌐 88 Programmatic SEO Pages**: Complete coverage across 6 main hubs and ~70 subcategories matching and surpassing competitor search footprints.
- **🗺️ Multilingual Clusters**: Full reciprocal hreflang support for English (`/`), Spanish (`/es/`), Japanese (`/jp/`), and Korean (`/kr/`).
- **🔍 Real-Time Search**: Instant multi-tag searching across all 190+ glyphs and symbols.
- **❤️ Favorites System**: Client-side bookmarking stored in `localStorage`.
- **📈 Rich Structured Data**: `WebApplication`, `FAQPage`, `BreadcrumbList`, and `ItemList` JSON-LD schemas on every page.

---

## 📁 Project Structure

```text
lenny-face-hub/
├── index.html                   # Master homepage with interactive generator & search
├── styles.css                   # Master design system (Dark/Light mode, glassmorphism)
├── data.js                      # Complete glyph database (191+ faces, kaomoji, symbols)
├── app.js                       # Client-side engine (generator, copy, search, favorites)
├── build-site.js                # Programmatic static site builder script
├── server.js                    # High-performance local dev server with clean URLs
├── vercel.json                  # Zero-error Vercel configuration
├── sitemap.xml                  # XML sitemap indexing all 88 URLs
├── robots.txt                   # Search crawler directives
├── text-faces/                  # Text faces hub + 16 category subpages
├── kaomoji/                     # Japanese kaomoji hub + 17 category subpages
├── emoticons/                   # Classic emoticons hub + 9 category subpages
├── symbols/                     # Aesthetic symbols hub + 18 category subpages
├── aesthetic/                   # Aesthetic bios, dividers, borders + 8 subpages
├── jp/                          # Japanese localized hub
├── kr/                          # Korean localized hub
└── es/                          # Spanish localized hub
```

---

## 🚀 Quick Start

### 1. Run Locally
```bash
# Start dev server on http://localhost:3001
npm start
```

### 2. Rebuild Static Pages
```bash
# Re-generate all 88 static pages and XML sitemap
npm run build
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
This repository includes a pre-configured `vercel.json` with clean URLs and performance caching headers:
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Click **Deploy** — deploys automatically in seconds with **zero build errors**.

---

## 📄 License
MIT © Lenny Face Pro
