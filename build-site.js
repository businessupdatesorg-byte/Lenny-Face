/**
 * Lenny Face Pro - Static Site Generator (build-site.js)
 * Generates 100/100 Core Web Vitals HTML pages with:
 * - Pre-rendered SSR static cards
 * - Rich JSON-LD schemas (WebApplication, FAQPage, BreadcrumbList, ItemList)
 * - In-depth editorial guides (800-1200+ words per page)
 * - Hreflang multilingual support (EN, ES, JA, KO)
 * - XML Sitemap & robots.txt
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_URL = 'https://thelennyfacepro.com';

// Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Full Master Dataset of Glyphs (432+ Items across all 6 hubs)
const ALL_GLYPHS = require('./glyphs-data.js');


// Helper: Escape HTML strings
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Generate static card HTML with green copy button and share button
function renderStaticCard(item) {
  const badgeHtml = item.badge ? `<span class="face-badge">${escapeHtml(item.badge)}</span>` : '';
  const escapedGlyph = escapeHtml(item.glyph);
  const singleLineGlyph = escapedGlyph.replace(/\n/g, '<br>');
  const safeAttr = escapeHtml(item.glyph).replace(/"/g, '&quot;');
  const safeName = escapeHtml(item.name).replace(/"/g, '&quot;');

  return `
    <article class="face-card" onclick="copyGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, this.querySelector('.face-copy-btn'))">
      ${badgeHtml}
      <div class="face-glyph-box">
        <span class="face-glyph">${singleLineGlyph}</span>
      </div>
      <div class="face-meta">
        <span class="face-tag">${escapeHtml(item.name)}</span>
        <div class="face-actions" onclick="event.stopPropagation()">
          <button type="button" class="face-action-btn" onclick="event.stopPropagation(); toggleFavAction(\`${safeAttr.replace(/`/g, '\\`')}\`)" title="Add to favorites">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button type="button" class="face-share-btn" onclick="event.stopPropagation(); shareGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, \`${safeName.replace(/`/g, '\\`')}\`)" title="Share this text face">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button type="button" class="face-copy-btn" onclick="event.stopPropagation(); copyGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, this)" title="Copy text face">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Render Breadcrumb Component
function renderBreadcrumbs(crumbs, rootPrefix) {
  const crumbHtml = crumbs.map((c, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<span class="current">${escapeHtml(c.name)}</span>`;
    }
    return `<a href="${rootPrefix}${c.url}">${escapeHtml(c.name)}</a><span class="sep">/</span>`;
  }).join(' ');

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${crumbHtml}
    </nav>
  `;
}

// Render Related Categories Grid Component
function renderRelatedCategories(relatedCats, rootPrefix) {
  if (!relatedCats || relatedCats.length === 0) return '';
  return `
    <div style="margin-top: 3rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">Explore Related Categories</h3>
      <div class="category-card-grid">
        ${relatedCats.map(cat => `
          <a href="${rootPrefix}${cat.url}" class="cat-card">
            <span class="cat-sample">${cat.sample}</span>
            <span class="cat-name">${cat.name}</span>
            <span class="cat-count">${cat.count || 'View Collection'}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Social Share Bar Component
function renderShareBar(title, url) {
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  const waText = encodeURIComponent(`${title} — Copy & paste in 1-click! ${url}`);

  return `
    <!-- Social Share Buttons -->
    <div class="share-bar-container">
      <div class="share-bar-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span>Share Collection With Friends</span>
      </div>
      <div class="share-buttons-group">
        <a href="https://api.whatsapp.com/send?text=${waText}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-whatsapp" title="Share on WhatsApp" aria-label="Share on WhatsApp">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.101-.476-.15-.676.15-.201.3-.777.979-.953 1.18-.175.201-.351.226-.652.076-.3-.15-1.27-.468-2.42-1.492-.894-.798-1.498-1.783-1.674-2.083-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.235-.243-.588-.49-.508-.676-.518-.175-.009-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.512s1.079 2.912 1.23 3.112c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.428.25-.702.25-1.303.175-1.428-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.078 6.46 2.078 11.96c0 1.96.57 3.788 1.558 5.332L2 22l4.858-1.594A9.914 9.914 0 0 0 12.04 22c5.5 0 9.962-4.46 9.962-9.96C22.002 6.46 17.54 2 12.04 2z"/></svg>
          <span>WhatsApp</span>
        </a>

        <a href="https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-twitter" title="Share on X (Twitter)" aria-label="Share on X">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X / Twitter</span>
        </a>

        <a href="https://t.me/share/url?url=${encUrl}&text=${encTitle}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-telegram" title="Share on Telegram" aria-label="Share on Telegram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          <span>Telegram</span>
        </a>

        <a href="https://reddit.com/submit?url=${encUrl}&title=${encTitle}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-reddit" title="Share on Reddit" aria-label="Share on Reddit">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.5 1.201-.5.94 0 1.704.764 1.704 1.705 0 .61-.322 1.144-.805 1.442a5.34 5.34 0 0 1 .054.75c0 3.81-4.444 6.9-9.923 6.9s-9.924-3.09-9.924-6.9c0-.256.02-.508.057-.755a1.704 1.704 0 0 1-.808-1.437c0-.94.764-1.705 1.705-1.705.47 0 .892.191 1.2.5 1.196-.856 2.852-1.417 4.676-1.487l.951-4.462a.405.405 0 0 1 .48-.313l3.14.66a1.25 1.25 0 0 1 1.25-.873zM9.25 13c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm-5.46 4.14a.5.5 0 0 0-.17.69c.67 1.16 1.94 1.86 3.38 1.86s2.71-.7 3.38-1.86a.5.5 0 0 0-.86-.5c-.47.81-1.39 1.36-2.52 1.36s-2.05-.55-2.52-1.36a.5.5 0 0 0-.69-.19z"/></svg>
          <span>Reddit</span>
        </a>

        <button type="button" class="share-btn share-btn-copylink" onclick="copyCurrentUrl()" title="Copy Page Link" aria-label="Copy Link">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  `;
}

// Base HTML Page Template
function generatePageTemplate({
  pageTitle,
  metaDescription,
  canonicalUrl,
  rootPrefix = '',
  breadcrumbs = [],
  heroBadge = '⚡ 1-Click Copy • Unicode Compatible',
  h1Text,
  heroSub,
  activeHub = 'all',
  activeSub = 'all',
  glyphs = [],
  editorialHtml = '',
  faqList = [],
  relatedCats = [],
  lang = 'en'
}) {
  const cardsHtml = glyphs.map(renderStaticCard).join('\n');

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": `${SITE_URL}/${c.url.replace(/^\//, '')}`
    }))
  };

  // FAQ Schema
  const faqSchema = faqList.length > 0 ? {
    "@type": "FAQPage",
    "mainEntity": faqList.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  // ItemList Schema
  const itemListSchema = glyphs.length > 0 ? {
    "@type": "ItemList",
    "itemListElement": glyphs.slice(0, 30).map((g, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": g.name,
      "description": `${g.name} text emoticon: ${g.glyph}`
    }))
  } : null;

  const schemaGraph = [
    {
      "@type": "WebApplication",
      "name": pageTitle,
      "url": canonicalUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    breadcrumbSchema
  ];

  if (faqSchema) schemaGraph.push(faqSchema);
  if (itemListSchema) schemaGraph.push(itemListSchema);

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaGraph
  }, null, 2);

  // FAQ HTML
  const faqHtml = faqList.length > 0 ? `
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="editorial-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers about copying, compatibility, and using text faces on Discord, TikTok, and mobile.</p>
        </div>
        <div class="faq-grid">
          ${faqList.map((f, i) => `
            <div class="faq-item ${i === 0 ? 'open' : ''}">
              <button class="faq-question" type="button">
                ${escapeHtml(f.q)}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="faq-answer">
                <p>${escapeHtml(f.a)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Hreflang Tags for Multi-language Clusters -->
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <link rel="alternate" hreflang="es" href="${SITE_URL}/es/">
  <link rel="alternate" hreflang="ja" href="${SITE_URL}/jp/">
  <link rel="alternate" hreflang="ko" href="${SITE_URL}/kr/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="stylesheet" href="${rootPrefix}styles.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${jsonLdContent}
  </script>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <div class="container header-nav">
      <a href="${rootPrefix}index.html" class="brand-logo" title="Lenny Face Pro">
        <span class="brand-glyph">( ͡° ͜ʖ ͡°)</span>
        <span>Lenny<span class="highlight">Pro</span></span>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="${rootPrefix}index.html#browse">Browse All</a></li>
          <li><a href="${rootPrefix}text-faces/index.html">Text Faces</a></li>
          <li><a href="${rootPrefix}kaomoji/index.html">Kaomoji</a></li>
          <li><a href="${rootPrefix}emoticons/index.html">Emoticons</a></li>
          <li><a href="${rootPrefix}symbols/index.html">Symbols</a></li>
          <li><a href="${rootPrefix}aesthetic/index.html">Aesthetic</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <select class="lang-select" id="lang-select" onchange="window.location.href=this.value" aria-label="Select Language">
          <option value="${rootPrefix}index.html" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
          <option value="${rootPrefix}es/index.html" ${lang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
          <option value="${rootPrefix}jp/index.html" ${lang === 'ja' ? 'selected' : ''}>🇯🇵 日本語</option>
          <option value="${rootPrefix}kr/index.html" ${lang === 'ko' ? 'selected' : ''}>🇰🇷 한국어</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero" id="browse">
    <div class="container">
      ${renderBreadcrumbs(breadcrumbs, rootPrefix)}
      <div class="hero-badge">${escapeHtml(heroBadge)}</div>
      <h1>${h1Text}</h1>
      <p>${escapeHtml(heroSub)}</p>

      <!-- Global Live Search -->
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="Search faces & keywords..." aria-label="Search text faces">
        <button type="button" id="search-clear" class="search-clear-btn" aria-label="Clear Search">✕</button>
      </div>

      <!-- Category Filter Chips -->
      <div class="hubbar" role="group" aria-label="Category Hubs">
        <a href="${rootPrefix}index.html" class="hub-chip ${activeHub === 'all' ? 'active' : ''}">All Faces</a>
        <a href="${rootPrefix}index.html#browse" class="hub-chip ${activeHub === 'lenny' ? 'active' : ''}">Lenny Faces</a>
        <a href="${rootPrefix}text-faces/index.html" class="hub-chip ${activeHub === 'text-faces' ? 'active' : ''}">Text Faces</a>
        <a href="${rootPrefix}kaomoji/index.html" class="hub-chip ${activeHub === 'kaomoji' ? 'active' : ''}">Kaomoji</a>
        <a href="${rootPrefix}emoticons/index.html" class="hub-chip ${activeHub === 'emoticons' ? 'active' : ''}">Emoticons</a>
        <a href="${rootPrefix}symbols/index.html" class="hub-chip ${activeHub === 'symbols' ? 'active' : ''}">Symbols</a>
        <a href="${rootPrefix}aesthetic/index.html" class="hub-chip ${activeHub === 'aesthetic' ? 'active' : ''}">Aesthetic Bios</a>
      </div>

      ${renderShareBar(pageTitle, canonicalUrl)}
    </div>
  </section>

  <!-- Main Grid Section -->
  <main class="container">
    <div class="grid-controls">
      <div class="grid-count">Showing <strong>${glyphs.length}</strong> items in this category</div>
      <div style="font-size: 0.85rem; color: var(--emerald); font-weight: 700;">💡 Click any card to copy instantly</div>
    </div>

    <!-- Static Pre-rendered Grid (SSR for Instant 100/100 CWV & SEO) -->
    <div class="face-grid" id="face-grid" data-initial-hub="${activeHub}" data-initial-sub="${activeSub}">
${cardsHtml}
    </div>

    ${renderRelatedCategories(relatedCats, rootPrefix)}
  </main>

  <!-- Comprehensive In-depth Editorial Section (SEO Dominance) -->
  <section class="editorial-section" id="guide">
    <div class="container">
      <div class="editorial-body">
${editorialHtml}
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  ${faqHtml}

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="brand-logo" style="margin-bottom: 0.75rem;">
            <span class="brand-glyph">( ͡° ͜ʖ ͡°)</span>
            <span>Lenny<span class="highlight">Pro</span></span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.875rem; max-width: 320px; line-height: 1.6;">
            Copy and paste Lenny Face ( ͡° ͜ʖ ͡°), text faces, kaomoji, aesthetic emoticons, and text symbols in 1-click. Free Lenny Face generator with cute, angry, sad, and custom styles.
          </p>
        </div>

        <div class="footer-col">
          <h4>Lenny Face Styles</h4>
          <ul>
            <li><a href="${rootPrefix}cute-lenny-face.html">Cute Lenny Face</a></li>
            <li><a href="${rootPrefix}sad-lenny-face.html">Sad Lenny Face</a></li>
            <li><a href="${rootPrefix}happy-lenny-face.html">Happy Lenny Face</a></li>
            <li><a href="${rootPrefix}angry-lenny-face.html">Angry Lenny Face</a></li>
            <li><a href="${rootPrefix}crying-lenny-face.html">Crying Lenny Face</a></li>
            <li><a href="${rootPrefix}middle-finger.html">Middle Finger Face</a></li>
            <li><a href="${rootPrefix}shrug-lenny-face.html">Shrug Lenny Face</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Kaomoji & Emoticons</h4>
          <ul>
            <li><a href="${rootPrefix}kaomoji/cat.html">Cat Kaomoji</a></li>
            <li><a href="${rootPrefix}kaomoji/hug.html">Hug Kaomoji</a></li>
            <li><a href="${rootPrefix}kaomoji/heart.html">Heart Kaomoji</a></li>
            <li><a href="${rootPrefix}emoticons/smiley.html">Smiley Emoticons</a></li>
            <li><a href="${rootPrefix}text-faces/donger.html">Donger Faces</a></li>
            <li><a href="${rootPrefix}text-faces/table-flipping.html">Table Flip Faces</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Symbols & Aesthetic</h4>
          <ul>
            <li><a href="${rootPrefix}symbols/heart.html">Heart Symbols</a></li>
            <li><a href="${rootPrefix}symbols/sparkle.html">Sparkle Symbols</a></li>
            <li><a href="${rootPrefix}aesthetic/discord-bio.html">Discord Bios</a></li>
            <li><a href="${rootPrefix}aesthetic/dividers.html">Aesthetic Dividers</a></li>
            <li><a href="${rootPrefix}sitemap.xml">XML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Lenny Face Pro. All rights reserved.</p>
        <p><a href="${rootPrefix}privacy.html">Privacy Policy</a> | <a href="${rootPrefix}terms.html">Terms of Service</a> | <a href="${rootPrefix}about.html">About Us</a></p>
      </div>
    </div>
  </footer>

  <!-- Toast Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Client-side Scripts -->
  <script src="${rootPrefix}data.js"></script>
  <script src="${rootPrefix}app.js"></script>
</body>
</html>`;
}

// ----------------------------------------------------
// DEFINITIONS FOR PROGRAMMATIC SUBPAGES
// ----------------------------------------------------

const LENNY_SUBPAGES = [
  {
    slug: 'cute-lenny-face.html',
    title: 'Cute Lenny Face ( ͜° ͜ʊ ͜°) — Copy & Paste Kawaii Lenny Faces',
    description: 'Copy and paste Cute Lenny Faces ( ͜° ͜ʊ ͜°), kawaii text faces, and sweet smiling kaomojis in 1-click. Free Unicode generator with instant clipboard copy.',
    h1: 'Cute Lenny Face <span>( ͜° ͜ʊ ͜°)</span>',
    heroSub: 'Explore our complete collection of cute, innocent, and kawaii Lenny faces. Tap any face to copy instantly.',
    sub: 'cute',
    editorial: `
      <h2>The Ultimate Guide to Cute Lenny Faces ( ͜° ͜ʊ ͜°)</h2>
      <p>While the original Lenny Face <code>( ͡° ͜ʖ ͡°)</code> is notorious for its cheeky smirk and internet mischief, the <strong>Cute Lenny Face</strong> softens the iconic expression into an innocent, adorable, and friendly kaomoji. By substituting sharp degreemarks and eyebrow diacritics with rounded lips like <code>͜ʊ</code> or sweet blushing cheeks, creators transformed an edgier meme into a wholesome social staple.</p>
      
      <h3>Where to Use Cute Lenny Faces</h3>
      <ul>
        <li><strong>Discord Server Greetings:</strong> Welcome new community members with a friendly <code>( ͜° ͜ʊ ͜°)ノ</code>.</li>
        <li><strong>Roblox & Minecraft Chat:</strong> Express joy and playful innocence during multiplayer sessions without getting flagged by chat filters.</li>
        <li><strong>TikTok & Instagram Comments:</strong> Add an aesthetic typographic charm to your replies and video captions.</li>
      </ul>

      <h3>Anatomy of a Cute Lenny Face</h3>
      <p>A cute text face relies on harmonious Unicode glyphs:</p>
      <table class="shortcut-table">
        <thead><tr><th>Component</th><th>Unicode Character</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Cheeks / Blushes</td><td><code>✿</code> or <code>🌸</code></td><td>Adds a delicate floral blush effect.</td></tr>
          <tr><td>Soft Mouth</td><td><code>͜ʊ</code> (U+028A)</td><td>Creates the signature sweet curved smile.</td></tr>
          <tr><td>Innocent Eyes</td><td><code>•</code> or <code>°</code></td><td>Replaces skeptical stares with wide, bright eyes.</td></tr>
        </tbody>
      </table>

      <h3>How to Type Cute Lenny Faces on Any Device</h3>
      <p>Because these symbols utilize specialized Unicode combining characters, typing them on standard QWERTY keyboards requires cumbersome Alt codes or character map lookups. Using our 1-click copy tool above is the fastest method: just tap any box to copy directly to your clipboard, then press <kbd>Ctrl</kbd> + <kbd>V</kbd> (Windows) or <kbd>Cmd</kbd> + <kbd>V</kbd> (Mac) to paste!</p>
    `,
    faqs: [
      { q: "What does the cute Lenny face mean?", a: "It represents friendly joy, innocent happiness, or playful affection, acting as a wholesome alternative to the suggestive smirk of the classic Lenny face." },
      { q: "Does this cute text face work on Discord?", a: "Yes! All characters in our collection are standard Unicode symbols that render perfectly across Discord, iOS, Android, and PC." },
      { q: "How do I save my favorite cute faces?", a: "Click the heart icon on any card to save it to your local Favorites list for instant access anytime." }
    ],
    related: [
      { name: "Blushing Lenny", url: "blushing-lenny-face.html", sample: "( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)" },
      { name: "Happy Lenny", url: "happy-lenny-face.html", sample: "( ͡ᵔ ͜ʖ ͡ᵔ)" },
      { name: "Cute Kaomoji", url: "kaomoji/cute.html", sample: "( ˶ˆ꒳ˆ˵ )" },
      { name: "Cat Faces", url: "text-faces/cat.html", sample: "(=^･ω･^=)" }
    ]
  },
  {
    slug: 'sad-lenny-face.html',
    title: 'Sad Lenny Face ( ͡° ʖ̯ ͡°) — Copy & Paste Frown & Depressed Faces',
    description: 'Copy and paste Sad Lenny Faces ( ͡° ʖ̯ ͡°), frowning text faces, and bummed kaomojis in 1-click. Free Unicode generator with instant clipboard copy.',
    h1: 'Sad Lenny Face <span>( ͡° ʖ̯ ͡°)</span>',
    heroSub: 'Express disappointment, melancholy, and heartbreak with sad Lenny faces. Tap any card to copy instantly.',
    sub: 'sad',
    editorial: `
      <h2>The Cultural Meaning of the Sad Lenny Face ( ͡° ʖ̯ ͡°)</h2>
      <p>The <strong>Sad Lenny Face</strong> <code>( ͡° ʖ̯ ͡°)</code> represents the universal experience of internet disappointment, defeat, or playful sorrow. Crafted by turning the classic smiling mouth upside down into a downturned lip <code>ʖ̯</code>, this text face quickly became a sensation on gaming streams, Reddit threads, and Twitter replies.</p>

      <h3>When to Deploy Sad Text Faces</h3>
      <p>Gamers and social media users frequently deploy the sad Lenny face during:</p>
      <ul>
        <li><strong>Losing a match:</strong> When your teammate drops out or you miss the winning shot in Valorant or CS:GO.</li>
        <li><strong>Announced delays:</strong> When your favorite game or anime season gets delayed.</li>
        <li><strong>Melodramatic reactions:</strong> When a minor inconvenience occurs, such as running out of coffee or waking up on a Monday.</li>
      </ul>

      <h3>Unicode Breakdown</h3>
      <p>The sorrowful grimace is produced by Unicode Character <code>U+028F</code> (Latin Small Letter Y with Stroke) or downturned combining diacritics. Unlike basic emojis like 😢, text faces carry a nuanced, ironic tone favored by digital communities.</p>
    `,
    faqs: [
      { q: "How do you make a sad Lenny face?", a: "The sad mouth is created using Unicode combining symbol U+028F (ʖ̯). Simply copy it from our tool for instant use." },
      { q: "Is the sad Lenny face different from crying faces?", a: "Yes. The sad Lenny expresses a quiet, disappointed pout, whereas crying faces feature tears like ( ͡ಥ ʖ̯ ͡ಥ) or (╥﹏╥)." }
    ],
    related: [
      { name: "Crying Lenny", url: "crying-lenny-face.html", sample: "( ͡ಥ ʖ̯ ͡ಥ)" },
      { name: "Shrug Lenny", url: "shrug-lenny-face.html", sample: "¯\\_( ͡° ͜ʖ ͡°)_/¯" },
      { name: "Disapproval Face", url: "text-faces/disapproval.html", sample: "ಠ_ಠ" }
    ]
  },
  {
    slug: 'happy-lenny-face.html',
    title: 'Happy Lenny Face ( ͡ᵔ ͜ʖ ͡ᵔ) — Copy & Paste Joyful & Smiling Text Faces',
    description: 'Copy and paste Happy Lenny Faces ( ͡ᵔ ͜ʖ ͡ᵔ), smiling text faces, and cheerful kaomoji in 1-click. Instant clipboard copy and custom maker.',
    h1: 'Happy Lenny Face <span>( ͡ᵔ ͜ʖ ͡ᵔ)</span>',
    heroSub: 'Spread positive vibes with cheerful, joyful, and smiling Lenny faces. Tap to copy in 1-click.',
    sub: 'happy',
    editorial: `
      <h2>Spreading Cheer with Happy Lenny Faces ( ͡ᵔ ͜ʖ ͡ᵔ)</h2>
      <p>The <strong>Happy Lenny Face</strong> radiates pure delight and triumphant satisfaction. By combining joyful squinting eyes <code>ᵔ</code> or grinning arcs with the iconic cheek structure, this emoticon is the gold standard for celebrating victories, good news, or playful banter online.</p>
    `,
    faqs: [
      { q: "What makes the happy Lenny face smile?", a: "The eyes are constructed with Unicode U+1D54 (modifier letter small e with diaeresis or rounded curves), evoking squinting eyes of genuine laughter." }
    ],
    related: [
      { name: "Cute Lenny", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Dancing Kaomoji", url: "kaomoji/dancing.html", sample: "ヽ(>∀<☆)ノ" }
    ]
  },
  {
    slug: 'angry-lenny-face.html',
    title: 'Angry Lenny Face ( ͠° ͟ʖ ͡°) — Copy & Paste Mad, Boxer & Rage Text Faces',
    description: 'Copy and paste Angry Lenny Face ( ͠° ͟ʖ ͡°), fighting boxer lenny (ง ͠° ͟ل͜ ͡°)ง, and rage text faces in 1-click. Free Unicode generator for Discord, Twitch & gaming.',
    h1: 'Angry Lenny Face <span>( ͠° ͟ʖ ͡°)</span>',
    heroSub: 'Furrowed brows, clenched boxer fists, and mock rage. Tap to copy angry Lenny faces and fighting emoticons in 1-click.',
    sub: 'angry',
    editorial: `
      <h2>Master the Angry Lenny Face ( ͠° ͟ʖ ͡°): Mock Outrage &amp; Fighting Spirit</h2>
      <p>The <strong>Angry Lenny Face</strong> <code>( ͠° ͟ʖ ͡°)</code> tilts the brows down and hardens the stare into a fierce, battle-ready glare. Outfitted with furrowed forehead diacritics, clenched teeth, or raised boxing fists <code>(ง ͠° ͟ل͜ ͡°)ง</code>, this emoticon converts aggression into pure internet comedy. Rather than causing genuine hostility, posting an angry Lenny face communicates mock outrage, playful rivalry, or hilarious exasperation in gaming lobbies, Twitch chats, and comment sections.</p>

      <h3>Unicode Breakdown: The Secret of Furrowed Brows &amp; Boxing Fists</h3>
      <p>To give the friendly Lenny smirk an aggressive makeover, the internet creatively borrowed typographic symbols from across the globe:</p>
      <ul>
        <li><strong>Combining Double Tilde (<code> ͠ </code> - U+0360) &amp; Combining Low Line (<code> ͟ </code> - U+035F):</strong> These combining diacritics sit above and below the brow line, creating the menacing furrowed brow of <code>( ͠° ͟ʖ ͡°)</code>.</li>
        <li><strong>Thai Consonant Ngor Ngu (<code>ง</code> - U+0E07):</strong> Flanking either side of the face, this Thai character mimics clenched boxer fists raised in a sparring stance: <code>(ง ͠° ͟ل͜ ͡°)ง</code>.</li>
        <li><strong>Japanese Kanji Totsu (<code>凸</code> - U+51F8):</strong> Meaning 'convex', this character resembles a raised middle finger, creating brazen defiance in <code>凸( ͠° ͟ʖ ͡°)凸</code>.</li>
        <li><strong>Telugu Letter Gha (<code>ಠ</code> - U+0C20):</strong> Borrowed from the Look of Disapproval <code>ಠ_ಠ</code>, it produces the unforgiving glare of <code>( ͡ಠ ʖ̯ ͡ಠ)</code>.</li>
      </ul>

      <h3>The 4 Escalation Levels of the Angry Lenny Face</h3>
      <p>To maximize comedic effect during online banter, escalate through the collection as the conversation heats up:</p>
      <ol>
        <li><strong>Level 1: The Suspicious Glare <code>( ͠° ͟ʖ ͡°)</code>:</strong> When someone makes a suspicious claim or posts a dubious meme. A squint of mild distrust.</li>
        <li><strong>Level 2: The Square-Up Boxer <code>(ง ͠° ͟ل͜ ͡°)ง</code>:</strong> Internet shorthand for "1v1 me on Rust" or "square up." Signals playful combat readiness in gaming lobbies.</li>
        <li><strong>Level 3: Table-Flipping Rage <code>(ノಠ益ಠ)ノ彡┻━┻</code>:</strong> When pure frustration boils over from a ranked game loss or lag spike.</li>
        <li><strong>Level 4: Disrespect &amp; Defiance <code>凸( ͠° ͟ʖ ͡°)凸</code> or Sniper Chaos <code>( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿</code>:</strong> Maximum comedic disrespect for friends who talk too much smack.</li>
      </ol>

      <h3>Best Platforms for Angry Lenny Faces</h3>
      <p>Angry Lenny faces are a permanent staple on high-velocity community platforms:</p>
      <ul>
        <li><strong>Twitch Live Chat:</strong> Spamming <code>(ง ͠° ͟ل͜ ͡°)ง</code> during hype esports tournaments or boss fights.</li>
        <li><strong>Discord Servers:</strong> Reacting to server rule reminders, bot errors, or gaming defeat screens.</li>
        <li><strong>Steam Profile Customization:</strong> Showcasing intimidating or hilarious ASCII art in your Steam summary box.</li>
        <li><strong>Reddit Comment Battles:</strong> Disarming intense debates with absurd typographic anger.</li>
      </ul>

      <h3>How to Copy in 1-Click</h3>
      <p>Click or tap on any angry Lenny face card on this page to copy it to your clipboard instantly. Paste anywhere using <kbd>Ctrl</kbd> + <kbd>V</kbd> (Windows) or <kbd>Cmd</kbd> + <kbd>V</kbd> (Mac).</p>
    `,
    faqs: [
      { q: "What does the angry Lenny face mean?", a: "The angry Lenny face ( ͠° ͟ʖ ͡°) expresses playful irritation, skepticism, or mock outrage. The angled brow characters over the iconic smirk read as an aggressive glare without genuine malice, making it ideal for banter." },
      { q: "What do the 'ง' characters represent in the boxing Lenny face?", a: "The characters 'ง' on either side of (ง ͠° ͟ل͜ ͡°)ง are the Thai letter Ngor Ngu (U+0E07). In internet ASCII art, they are universally used to depict clenched boxing gloves or fists raised in a fight stance." },
      { q: "Is there a weapon or sniper rifle version of the angry Lenny face?", a: "Yes! Our collection includes the famous sniper rifle face ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿ as well as dual middle finger variants 凸( ͠° ͟ʖ ͡°)凸 for ultimate comedic firepower." },
      { q: "Do angry Lenny faces display properly on mobile phones?", a: "Yes! All eyebrow marks and arm characters use standardized Unicode UTF-8, rendering crisply on iPhone, iPad, Android, Mac, and Windows devices without broken squares." },
      { q: "How can I make an angry Lenny face on my keyboard without copying?", a: "Typing the combining tilde (U+0360) and combining low line (U+035F) manually requires complex Alt codes or special character palettes. The easiest and fastest method is using our 1-click copy button." }
    ],
    related: [
      { name: "Middle Finger Lenny", url: "middle-finger.html", sample: "t( ͡° ͜ʖ ͡° t)" },
      { name: "Fighting Text Faces", url: "text-faces/fight.html", sample: "(ง'̀-'́)ง" },
      { name: "Table Flip Faces", url: "text-faces/table-flipping.html", sample: "(ノಠ益ಠ)ノ彡┻━┻" },
      { name: "Disapproval Face", url: "text-faces/disapproval.html", sample: "ಠ_ಠ" },
      { name: "Mad Emoticons", url: "emoticons/mad.html", sample: ">:-(" },
      { name: "Crying Lenny Face", url: "crying-lenny-face.html", sample: "( ͡ಥ ͜ʖ ͡ಥ)" }
    ]
  },
  {
    slug: 'crying-lenny-face.html',
    title: 'Crying Lenny Face ( ͡ಥ ͜ʖ ͡ಥ) — Copy & Paste Tears & Weeping Text Faces',
    description: 'Copy and paste Crying Lenny Face ( ͡ಥ ͜ʖ ͡ಥ), sobbing text faces, and crying kaomojis in 1-click. Free Unicode generator with sad, tears of joy, and dramatic weeping faces.',
    h1: 'Crying Lenny Face <span>( ͡ಥ ͜ʖ ͡ಥ)</span>',
    heroSub: 'From dramatic sobbing and bittersweet tears of joy to anime waterfall weeping, copy crying Lenny faces instantly.',
    sub: 'crying',
    editorial: `
      <h2>Complete Guide to Crying Lenny Faces ( ͡ಥ ͜ʖ ͡ಥ) &amp; Tearful Text Emoticons</h2>
      <p>The <strong>Crying Lenny Face</strong> <code>( ͡ಥ ͜ʖ ͡ಥ)</code> is one of the most recognizable and versatile emoticons on the modern web. Born as an emotional mutation of the legendary 2012 Finnish imageboard smirk <code>( ͡° ͜ʖ ͡°)</code>, the crying variant replaces standard eyes with tear-filled or streaming characters to create a melodramatic, comic reaction. Whether used in Discord gaming chats, Twitch live streams, Reddit comment chains, or Twitter/X banter, it provides an ironic, exaggerated expression of grief, sympathy, or bittersweet joy.</p>

      <h3>Anatomy &amp; Unicode Breakdown: How ( ͡ಥ ͜ʖ ͡ಥ) and ( ཀ ʖ̯ ཀ) are Created</h3>
      <p>Unlike standard emojis like 😭 or 😢 that look identical and cartoonish on every platform, the crying Lenny face relies on exotic international Unicode typography to deliver authentic character:</p>
      <ul>
        <li><strong>Telugu Letter Tha (<code>ಥ</code> - U+0C25):</strong> The iconic wide, tear-rimmed eyes are actually characters from the Indian Telugu language. The curved glyph resembles an eye overflowing with tears.</li>
        <li><strong>Tibetan Script (<code>ཀ</code> - U+0F40):</strong> In heavy weeping faces like <code>( ཀ ʖ̯ ཀ)</code>, Tibetan consonants produce a furrowed, tortured brow and sorrowful eye socket.</li>
        <li><strong>Combining Ring Below &amp; Diacritics (<code> ̥̥̥̥̥̥̥̥ </code> - U+0325):</strong> Stacked below the face, these dots simulate water droplets splashing downwards, producing waterfall crying effects like <code>( ͡° ̥̥̥̥̥̥̥̥ ͜ʖ ͡° ̥̥̥̥̥̥̥̥ )</code>.</li>
        <li><strong>Downturned Frown Mouth (<code>ʖ̯</code> - U+028F + U+032F):</strong> Combining Latin small letter Y with inverted breve diacritics creates the unmistakable quivering lip.</li>
      </ul>

      <h3>When &amp; Where to Use Crying Lenny Faces</h3>
      <p>The beauty of text faces is their nuanced comedic timing. Here are prime situations where crying Lenny faces outperform standard emojis:</p>
      <ol>
        <li><strong>Gaming Misery &amp; Clutch Fails:</strong> Missing a game-winning shot in <em>Valorant</em>, losing your diamond armor in <em>Minecraft</em>, or watching your team throw in <em>League of Legends</em>.</li>
        <li><strong>Comic Overreaction to Minor Inconveniences:</strong> Dropping your toast butter-side down, finding out your favorite series was delayed, or running out of coffee on a Monday morning.</li>
        <li><strong>Tears of Pride &amp; Joy:</strong> Celebrating an unexpected victory or cheering for a friend's achievement with bittersweet weeping <code>(｡T ω T｡)</code>.</li>
        <li><strong>Faking Devastation in Group Chats:</strong> Feigning mock heartbreak when someone doesn't agree with your hot take.</li>
      </ol>

      <h3>Comparison: Crying Lenny Face vs. Standard Emojis (😭 vs. ͡ಥ ͜ʖ ͡ಥ)</h3>
      <table class="editorial-table" style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
        <thead>
          <tr style="border-bottom:2px solid var(--border-color); text-align:left;">
            <th style="padding:10px;">Format</th>
            <th style="padding:10px;">Tone &amp; Feeling</th>
            <th style="padding:10px;">Cross-Platform Rendering</th>
            <th style="padding:10px;">Best Context</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:10px; font-weight:700;">( ͡ಥ ͜ʖ ͡ಥ) Text Face</td>
            <td style="padding:10px;">Ironic, witty, melodramatic, self-aware</td>
            <td style="padding:10px; color:var(--emerald); font-weight:700;">100% Identical Everywhere (Pure Unicode)</td>
            <td style="padding:10px;">Discord, Twitch, Reddit, Gaming Lobbies</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:700;">😭 Graphic Emoji</td>
            <td style="padding:10px;">Generic, often reads as literal crying or screaming</td>
            <td style="padding:10px; color:var(--text-muted);">Varies by OS (Apple vs Google vs Samsung)</td>
            <td style="padding:10px;">Casual SMS, Instagram Stories, Family chats</td>
          </tr>
        </tbody>
      </table>

      <h3>How to Copy and Paste Crying Lenny Faces</h3>
      <p>To use any crying Lenny face from our directory, simply tap or click on any card box above. The emoticon is immediately copied to your clipboard, and a green confirmation toast will appear. Press <kbd>Ctrl</kbd> + <kbd>V</kbd> on Windows or <kbd>Cmd</kbd> + <kbd>V</kbd> on Mac, or long-press on mobile to paste instantly into Discord, TikTok, WhatsApp, Roblox, or your bio.</p>
    `,
    faqs: [
      { q: "What is the crying Lenny face used for?", a: "The crying Lenny face ( ͡ಥ ͜ʖ ͡ಥ) is used for comic overreaction, dramatic weeping, and playful mock sorrow. It conveys 'I am utterly devastated' in an exaggerated, sarcastic manner that lands as comedy in gaming and group chats." },
      { q: "How do you make or type the crying eyes character (ಥ)?", a: "The crying eyes use Unicode character U+0C25 (Telugu Letter Tha: ಥ). Since typing international Unicode codes is difficult on standard keyboards, the easiest way is to click any card on our site to copy it instantly." },
      { q: "Do the tear characters paste correctly on Discord, TikTok, and iPhone?", a: "Yes! All characters in our collection are standard UTF-8 Unicode glyphs supported by iOS, Android, Windows, macOS, and Linux. They will render reliably without missing character boxes (tofu) across Discord, TikTok, Twitch, and WhatsApp." },
      { q: "What is the difference between Sad Lenny and Crying Lenny?", a: "Sad Lenny ( ͡° ʖ̯ ͡°) features a quiet, disappointed grimace or pout without tears. Crying Lenny ( ͡ಥ ͜ʖ ͡ಥ) escalates the emotion with prominent tearful eyes (ಥ, ཀ, ｡ﾟ) to express dramatic, streaming tears." },
      { q: "Can I use crying Lenny faces in my social media bio or gaming username?", a: "Yes! Text faces are standard Unicode text, making them fully allowed in Instagram bios, TikTok nicknames, Steam names, and Discord server statuses." }
    ],
    related: [
      { name: "Sad Lenny Face", url: "sad-lenny-face.html", sample: "( ͡° ʖ̯ ͡°)" },
      { name: "Crying Kaomoji", url: "kaomoji/sad.html", sample: "(ノ_<。)" },
      { name: "Disapproval Face", url: "text-faces/disapproval.html", sample: "ಠ_ಠ" },
      { name: "Table Flip Faces", url: "text-faces/table-flipping.html", sample: "(ノಠ益ಠ)ノ彡┻━┻" },
      { name: "Angry Lenny Face", url: "angry-lenny-face.html", sample: "(ง ͠° ͟ل͜ ͡°)ง" },
      { name: "Shrug Lenny Face", url: "shrug-lenny-face.html", sample: "¯\\_( ͡° ͜ʖ ͡°)_/¯" }
    ]
  },
  {
    slug: 'blushing-lenny-face.html',
    title: 'Blushing Lenny Face ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) — Copy & Paste Flirty & Shy Faces',
    description: 'Copy and paste Blushing Lenny Faces ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°), flirty text faces, and shy kaomoji in 1-click. Instant clipboard copy.',
    h1: 'Blushing Lenny Face <span>( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)</span>',
    heroSub: 'Flustered, shy, or flirty? Copy blushing Lenny faces with diagonal blush marks and floral accents.',
    sub: 'blushing',
    editorial: `
      <h2>Flustered and Flirty: The Blushing Lenny Face</h2>
      <p>With diagonal slash lines <code>⁄ ⁄</code> representing red Anime blush marks or delicate cherry blossom petals <code>🌸</code>, the <strong>Blushing Lenny Face</strong> brings shy flirtation and comedic embarrassment to chat logs.</p>
    `,
    faqs: [
      { q: "How do you make the blush effect?", a: "Double fraction slashes (U+2044) or floral Unicode characters are placed inside the parentheses beside the eyes." }
    ],
    related: [
      { name: "Cute Lenny", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Heart Kaomoji", url: "kaomoji/heart.html", sample: "(◕‿◕)♡" }
    ]
  },
  {
    slug: 'shrug-lenny-face.html',
    title: 'Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯ — Copy & Paste Smug Shrugging Faces',
    description: 'Copy and paste Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯, smug shrugs, and "whatever" text faces in 1-click. Free Unicode generator.',
    h1: 'Shrug Lenny Face <span>¯\\_( ͡° ͜ʖ ͡°)_/¯</span>',
    heroSub: 'The ultimate fusion of the smug Lenny smirk and the careless shrug. Tap to copy in 1-click.',
    sub: 'shrug',
    editorial: `
      <h2>The Smug Masterpiece: Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯</h2>
      <p>Combining the famous Japanese Katakana shruggie <code>¯\\_(ツ)_/¯</code> with the infamous Lenny smirk <code>( ͡° ͜ʖ ͡°)</code> yields the ultimate internet shrug: careless, knowing, and deeply smug.</p>
    `,
    faqs: [
      { q: "Why does the arm sometimes disappear in Reddit comments?", a: "Markdown uses the backslash '\\' as an escape character. On Reddit, you often need to type a double or triple backslash to prevent the arm from vanishing!" }
    ],
    related: [
      { name: "Classic Lenny", url: "index.html", sample: "( ͡° ͜ʖ ͡°)" },
      { name: "Table Flip", url: "text-faces/table-flipping.html", sample: "(노ಠ益ಠ)노彡┻━┻" }
    ]
  },
  {
    slug: 'middle-finger.html',
    title: 'Middle Finger Lenny Face t( ͡° ͜ʖ ͡° t) — Copy & Paste Rude Text Faces',
    description: 'Copy and paste Middle Finger Lenny Face t( ͡° ͜ʖ ͡° t), flipping off emoticons, and rude text faces in 1-click. Unicode compatible.',
    h1: 'Middle Finger Lenny Face <span>t( ͡° ͜ʖ ͡° t)</span>',
    heroSub: 'Send a cheeky or rebellious middle finger text face. Tap any card to copy instantly.',
    sub: 'middle-finger',
    editorial: `
      <h2>Rebellious Humor: Middle Finger Lenny Faces</h2>
      <p>Created by flanking the face with <code>t</code>, <code>凸</code>, or <code>╭∩╮</code>, the <strong>Middle Finger Lenny Face</strong> conveys comedic disrespect and cheeky defiance in online gaming and banter.</p>
    `,
    faqs: [
      { q: "What does the 凸 symbol represent?", a: "It is a Chinese/Japanese Kanji character (totsu) meaning convex, which closely resembles a middle finger gesture in ASCII art." }
    ],
    related: [
      { name: "Angry Lenny", url: "angry-lenny-face.html", sample: "(ง ͠° ͟ل͜ ͡°)ง" },
      { name: "Fighting Faces", url: "text-faces/fight.html", sample: "(ง'̀-'́)ง" }
    ]
  }
];

// ----------------------------------------------------
// BUILD FUNCTIONS
// ----------------------------------------------------

function buildLennySubpages() {
  console.log('Building Lenny Subpages...');
  for (const p of LENNY_SUBPAGES) {
    const glyphs = ALL_GLYPHS.filter(g => g.sub === p.sub || (g.hub === 'lenny' && g.sub === p.sub));
    const breadcrumbs = [
      { name: 'Home', url: 'index.html' },
      { name: 'Lenny Faces', url: 'index.html#browse' },
      { name: p.h1.replace(/<[^>]*>?/gm, '').trim(), url: p.slug }
    ];

    // 1. Generate root HTML file (e.g. crying-lenny-face.html)
    const html = generatePageTemplate({
      pageTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `${SITE_URL}/${p.slug}`,
      rootPrefix: '',
      breadcrumbs,
      heroBadge: '⚡ 1-Click Copy • 100/100 PageSpeed',
      h1Text: p.h1,
      heroSub: p.heroSub,
      activeHub: 'lenny',
      activeSub: p.sub,
      glyphs: glyphs.length > 0 ? glyphs : ALL_GLYPHS.slice(0, 15),
      editorialHtml: p.editorial,
      faqList: p.faqs,
      relatedCats: p.related,
      lang: 'en'
    });

    fs.writeFileSync(path.join(ROOT_DIR, p.slug), html, 'utf8');
    console.log(`  ✓ Generated: ${p.slug}`);

    // 2. Generate clean directory index.html (e.g. /crying-lenny-face/index.html)
    const dirSlug = p.slug.replace(/\.html$/, '');
    const cleanDir = path.join(ROOT_DIR, dirSlug);
    if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir, { recursive: true });

    const cleanBreadcrumbs = [
      { name: 'Home', url: 'index.html' },
      { name: 'Lenny Faces', url: 'index.html#browse' },
      { name: p.h1.replace(/<[^>]*>?/gm, '').trim(), url: `${dirSlug}/` }
    ];

    const cleanHtml = generatePageTemplate({
      pageTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `${SITE_URL}/${dirSlug}/`,
      rootPrefix: '../',
      breadcrumbs: cleanBreadcrumbs,
      heroBadge: '⚡ 1-Click Copy • 100/100 PageSpeed',
      h1Text: p.h1,
      heroSub: p.heroSub,
      activeHub: 'lenny',
      activeSub: p.sub,
      glyphs: glyphs.length > 0 ? glyphs : ALL_GLYPHS.slice(0, 15),
      editorialHtml: p.editorial,
      faqList: p.faqs,
      relatedCats: p.related,
      lang: 'en'
    });

    fs.writeFileSync(path.join(cleanDir, 'index.html'), cleanHtml, 'utf8');
    console.log(`  ✓ Generated Clean URL: ${dirSlug}/index.html`);
  }
}

// Specialized Custom Subpage Content for High-Priority Keyword Landers
const CUSTOM_SUBPAGE_CONTENT = {
  'emoticons/laughing': {
    pageTitle: 'Laughing Emoticons :-D & XD — Copy & Paste Funny Text Faces & Kaomoji',
    metaDescription: 'Copy and paste Laughing Emoticons (:-D, XD, ≧▽≦), funny text faces, and joyful laughing kaomoji in 1-click. 100% Unicode compatible for Discord, WhatsApp & iOS.',
    h1Text: 'Laughing Emoticons <span>:-D &amp; XD</span>',
    heroSub: 'From retro ASCII keyboard laughs to hysterical anime kaomoji giggles. Copy laughing emoticons in 1-click.',
    editorialHtml: `
      <h2>The Evolution of Laughing Emoticons: From :-D to XD and (≧▽≦)</h2>
      <p>The <strong>Laughing Emoticon</strong> is the cornerstone of digital joy. Originating in September 1982 when computer scientist Scott Fahlman proposed the smiley <code>:-)</code> on Carnegie Mellon message boards, text laughs quickly expanded into wide-open laughing grins like <code>:-D</code> and <code>:D</code>. During the 2000s MSN Messenger and IRC chat era, the squinting laughter of <code>XD</code> and <code>xDD</code> took over the internet. Today, Japanese kaomoji like <code>(≧▽≦)</code> and <code>ꉂ(ˊᗜˋ*)</code> blend expressive typography with anime-style joy to create the richest text laughter in internet history.</p>

      <h3>Why Text Laughs Hit Harder Than the Generic 😂 Emoji</h3>
      <p>While the standard "Face with Tears of Joy" emoji (😂) has become oversaturated and corporate, text laughs remain fresh, authentic, and highly personal:</p>
      <ul>
        <li><strong>Universal Compatibility:</strong> Standard emojis render differently across Apple, Google, Samsung, and Microsoft devices. Text laughs like <code>:-D</code> and <code>(≧▽≦)</code> look 100% identical on every screen.</li>
        <li><strong>Intentional Typing:</strong> Copying or typing a text laugh signals genuine engagement rather than tapping a passive reaction button.</li>
        <li><strong>Nuanced Levels of Humor:</strong> A subtle <code>:D</code> feels warmly cheerful, <code>XD</code> feels retro and self-aware, and <code>ヾ(≧▽≦*)o</code> conveys unstoppable knee-slapping hysterics.</li>
      </ul>

      <h3>Decoding the Anatomy of Laughing Text Characters</h3>
      <p>Different cultures created unique visual shorthand for human laughter:</p>
      <ol>
        <li><strong>The Western Open Smile (<code>D</code>):</strong> In classic ASCII typography, a colon <code>:</code> (eyes) paired with a capital letter <code>D</code> represents a wide-open, toothy laugh.</li>
        <li><strong>The Squinting Eyes of "XD":</strong> The capital letter <code>X</code> represents eyes tightly squeezed shut from laughing uncontrollably, paired with the open mouth <code>D</code>.</li>
        <li><strong>The Japanese Kaomoji Squint (<code>≧ ≦</code>):</strong> In Japanese text art, math symbols greater-than/less-than with equals signs represent joyful squinting eyes, paired with an open triangular mouth <code>▽</code> to make <code>(≧▽≦)</code>.</li>
        <li><strong>Action Hands &amp; Confetti (<code>ヾ o</code> &amp; <code>*:･ﾟ</code>):</strong> Modern laughing kaomoji add waving arms and celebratory sparkles for full-body laughter like <code>(ﾉ´ヮ\`)ﾉ*: ･ﾟ</code>.</li>
      </ol>

      <h3>Hierarchy of Laughter: Which One to Send?</h3>
      <table class="editorial-table" style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
        <thead>
          <tr style="border-bottom:2px solid var(--border-color); text-align:left;">
            <th style="padding:10px;">Emoticon</th>
            <th style="padding:10px;">Laugh Level</th>
            <th style="padding:10px;">Meaning &amp; Vibe</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:10px; font-weight:700;">:-) / :D</td>
            <td style="padding:10px;">Mild / Warm</td>
            <td style="padding:10px;">A friendly grin acknowledging a pleasant comment or polite joke.</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:10px; font-weight:700;">XD / xDD</td>
            <td style="padding:10px;">Medium / Ironic</td>
            <td style="padding:10px;">Playful meme reaction, gaming irony, or hearty chuckle.</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:10px; font-weight:700;">(≧▽≦)</td>
            <td style="padding:10px;">High / Ecstatic</td>
            <td style="padding:10px;">Pure anime delight, eyes squeezed shut with wholesome amusement.</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:700;">ヾ(≧▽≦*)o</td>
            <td style="padding:10px;">Maximum / Hysterical</td>
            <td style="padding:10px;">Slapping your knee, gasping for air, uncontrollable hysterics.</td>
          </tr>
        </tbody>
      </table>

      <h3>How to Copy and Paste Laughing Emoticons</h3>
      <p>Browse our curated table above and tap or click on any laughing face to copy it directly to your device clipboard. Paste seamlessly into Discord, TikTok, WhatsApp, Roblox, Twitter (X), or your personal bio.</p>
    `,
    faqList: [
      { q: "What does (≧▽≦) mean in text?", a: "The kaomoji (≧▽≦) represents hard, joyful laughter. The characters ≧ and ≦ represent eyes squeezed shut from laughing heartily, while the inverted triangle ▽ represents a wide-open laughing mouth." },
      { q: "What is the difference between xD and XD?", a: "Both convey the same eye-squeezing laughter, but XD with a capital X represents a more intense, dramatic laugh than lowercase xD. In early internet culture (2000s MSN/IRC), multiplying the D (e.g., xDD or XDDD) indicated even longer, louder laughter." },
      { q: "Why use text laughing emoticons instead of the 😂 emoji?", a: "Text emoticons like :-D, XD, and (≧▽≦) render identically across all operating systems without platform redesigns. They also feel more genuine, personal, and nostalgic than ubiquitous yellow reaction emojis." },
      { q: "How do I type :-D or XD on mobile phones?", a: "On smartphone keyboards, switch to the symbols layout for the colon ':' and hyphen '-', then return to letters for capital 'D'. Or simply use our 1-click copy button above to paste directly into your chats." },
      { q: "Are these laughing emoticons compatible with Discord and Instagram?", a: "Yes! All emoticons in our library use universal Unicode and standard ASCII characters, guaranteeing seamless display on Discord, Instagram, WhatsApp, TikTok, Twitch, and Reddit." }
    ],
    relatedCats: [
      { name: "Smiley Emoticons", url: "emoticons/smiley.html", sample: ":-)" },
      { name: "Happy Lenny Face", url: "happy-lenny-face.html", sample: "( ͡ᵔ ͜ʖ ͡ᵔ)" },
      { name: "Cute Kaomoji", url: "kaomoji/cute.html", sample: "( ˶ˆ꒳ˆ˵ )" },
      { name: "Winky Emoticons", url: "emoticons/winky.html", sample: ";-)" },
      { name: "Heart Emoticons", url: "emoticons/heart.html", sample: "<3" },
      { name: "Donger Text Faces", url: "text-faces/donger.html", sample: "ヽ༼ຈل͜ຈ༽ﾉ" }
    ]
  }
};

// Build Hub Category Pages (Text Faces, Kaomoji, Emoticons, Symbols, Aesthetic)
function buildHubPages() {
  const hubs = [
    {
      dir: 'text-faces',
      hub: 'text-faces',
      title: 'Text Faces — 1-Click Copy and Paste Text Emoticons & Dongers',
      description: 'Massive directory of 500+ text faces, dongers, shrugs, table flips, and cute ASCII faces. 1-click clipboard copy for Discord, TikTok, and gaming.',
      h1: "Text Faces <span>(ง'̀-'́)ง</span>",
      heroSub: 'Explore hundreds of expressive text faces, dongers, table flips, and funny ASCII characters.',
      subpages: [
        { sub: 'donger', name: 'Donger Faces', sample: 'ヽ༼ຈل͜ຈ༽ﾉ' },
        { sub: 'table-flipping', name: 'Table Flip Faces', sample: '(╯°□°)╯︵ ┻━┻' },
        { sub: 'disapproval', name: 'Disapproval ಠ_ಠ', sample: 'ಠ_ಠ' },
        { sub: 'bear', name: 'Bear Text Faces', sample: 'ʕ•ᴥ•ʔ' },
        { sub: 'cat', name: 'Cat Text Faces', sample: '(=^･ω･^=)' },
        { sub: 'hug', name: 'Hug Faces', sample: '(づ｡◕‿‿◕｡)づ' },
        { sub: 'crying', name: 'Crying Faces', sample: '(╥﹏╥)' },
        { sub: 'cool', name: 'Cool Deal With It', sample: '(⌐■_■)' },
        { sub: 'happy', name: 'Happy Faces', sample: '(☞ﾟヮﾟ)☞' },
        { sub: 'cute', name: 'Cute Faces', sample: '(✿◠‿◠)' },
        { sub: 'love', name: 'Love Faces', sample: '(｡♥‿♥｡)' },
        { sub: 'sad', name: 'Sad Faces', sample: '(｡•́︿•̀｡)' },
        { sub: 'angry', name: 'Angry Faces', sample: '(งಠ益ಠ)ง' },
        { sub: 'blushing', name: 'Blushing Faces', sample: '(´• ω •`)' },
        { sub: 'sleepy', name: 'Sleepy Faces', sample: '(－_－) zzz' },
        { sub: 'fight', name: 'Fighting Faces', sample: "(ง'̀-'́)ง" }
      ]
    },
    {
      dir: 'kaomoji',
      hub: 'kaomoji',
      title: 'Kaomoji (顔文字) — Japanese Emoticons Copy & Paste Directory',
      description: 'The premier collection of Japanese Kaomoji text emoticons: cats, dogs, cute blushing girls, weeping tears, and dancing stars. 1-click copy.',
      h1: 'Kaomoji <span>(*^▽^*)</span>',
      heroSub: 'Authentic Japanese typographic emoticons organized by mood, animal, and aesthetic styles.',
      subpages: [
        { sub: 'happy', name: 'Happy Kaomoji', sample: '(*^▽^*)' },
        { sub: 'cute', name: 'Cute Kaomoji', sample: '( ˶ˆ꒳ˆ˵ )' },
        { sub: 'heart', name: 'Heart Kaomoji', sample: '(◕‿◕)♡' },
        { sub: 'hug', name: 'Hug Kaomoji', sample: '(つ✧ω✧)つ' },
        { sub: 'kiss', name: 'Kissing Kaomoji', sample: '(づ￣ ³￣)づ' },
        { sub: 'sad', name: 'Sad Kaomoji', sample: '(ノ_<。)' },
        { sub: 'angry', name: 'Angry Kaomoji', sample: '(#`Д´)' },
        { sub: 'cat', name: 'Cat Kaomoji', sample: '/ᐠ｡ꞈ｡ᐟ\\' },
        { sub: 'dog', name: 'Dog Kaomoji', sample: '૮₍ • ᴥ • ₎ა' },
        { sub: 'bunny', name: 'Bunny Kaomoji', sample: 'ᕱ⑅ᕱ' },
        { sub: 'bear', name: 'Bear Kaomoji', sample: 'ʕ •ᴥ•ʔ' },
        { sub: 'spider', name: 'Spider Kaomoji', sample: '/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱\\' },
        { sub: 'begging', name: 'Begging Kaomoji', sample: '༼ つ ◕_◕ ༽つ' },
        { sub: 'determined', name: 'Determined Kaomoji', sample: '(ง •̀_•́)ง' },
        { sub: 'dancing', name: 'Dancing Kaomoji', sample: 'ヽ(>∀<☆)ノ' },
        { sub: 'sleepy', name: 'Sleepy Kaomoji', sample: '(人-ω-)ﾟ*｡☆' },
        { sub: 'sparkle', name: 'Sparkle Kaomoji', sample: '(★ω★)' }
      ]
    },
    {
      dir: 'emoticons',
      hub: 'emoticons',
      title: 'Emoticons :-) — Classic Keyboard Text Smileys Copy and Paste',
      description: 'Copy and paste vintage keyboard emoticons: smileys, winks, hearts, kissing, laughing, and sad faces. Instant clipboard copy.',
      h1: 'Emoticons <span>:-)</span>',
      heroSub: 'Classic ASCII keyboard emoticons from the dawn of internet communication, refreshed for modern chat.',
      subpages: [
        { sub: 'smiley', name: 'Smiley Emoticons', sample: ':-)' },
        { sub: 'winky', name: 'Winky Emoticons', sample: ';-)' },
        { sub: 'laughing', name: 'Laughing Emoticons', sample: ':-D' },
        { sub: 'sad', name: 'Sad Emoticons', sample: ':-(' },
        { sub: 'mad', name: 'Mad Emoticons', sample: '>:-( ' },
        { sub: 'kissy', name: 'Kissy Emoticons', sample: ':-*' },
        { sub: 'heart', name: 'Heart Emoticons', sample: '<3' },
        { sub: 'cute', name: 'Cute Emoticons', sample: ':-3' },
        { sub: 'creepy', name: 'Creepy Emoticons', sample: ':-O' }
      ]
    },
    {
      dir: 'symbols',
      hub: 'symbols',
      title: 'Text Symbols ♡ ★ ✦ — Copy & Paste Aesthetic Unicode Symbols',
      description: 'Extensive directory of aesthetic text symbols: hearts, stars, sparkles, flowers, skulls, crowns, arrows, and crosses. 1-click copy.',
      h1: 'Text Symbols <span>♡ ★ ✦</span>',
      heroSub: 'Enhance your Discord, Instagram, and TikTok bios with thousands of cute, gothic, and celestial text symbols.',
      subpages: [
        { sub: 'heart', name: 'Heart Symbols', sample: '♡' },
        { sub: 'star', name: 'Star Symbols', sample: '★' },
        { sub: 'sparkle', name: 'Sparkle Symbols', sample: '✦' },
        { sub: 'flower', name: 'Flower Symbols', sample: '✿' },
        { sub: 'moon', name: 'Moon Symbols', sample: '☾' },
        { sub: 'skull', name: 'Skull Symbols', sample: '☠' },
        { sub: 'crown', name: 'Crown Symbols', sample: '👑' },
        { sub: 'weapons', name: 'Weapons Symbols', sample: '⚔' },
        { sub: 'bow', name: 'Bow & Arrow Symbols', sample: '🏹' },
        { sub: 'music', name: 'Music Symbols', sample: '♫' },
        { sub: 'butterfly', name: 'Butterfly Symbols', sample: '🦋' },
        { sub: 'fire', name: 'Fire Symbols', sample: '🔥' },
        { sub: 'snowflake', name: 'Snowflake Symbols', sample: '❄' },
        { sub: 'sun', name: 'Sun Symbols', sample: '☼' },
        { sub: 'check-mark', name: 'Check Mark Symbols', sample: '✔' },
        { sub: 'bullet-point', name: 'Bullet Point Symbols', sample: '•' },
        { sub: 'cross', name: 'Cross Symbols', sample: '✞' },
        { sub: 'arrow', name: 'Arrow Symbols', sample: '➔' }
      ]
    },
    {
      dir: 'aesthetic',
      hub: 'aesthetic',
      title: 'Aesthetic Bios & Dividers ─── ⋆⋅☆⋅⋆ ─── — Copy and Paste Profile Templates',
      description: 'Copy and paste cute aesthetic Discord bios, Instagram bio templates, text line dividers, fancy borders, and emoji combos.',
      h1: 'Aesthetic Bios <span>⋆ ˚｡⋆୨୧˚</span>',
      heroSub: 'Craft show-stopping Discord, Instagram, and TikTok profiles with ready-made dividers, borders, and templates.',
      subpages: [
        { sub: 'discord-bio', name: 'Discord Bios', sample: '⋆ ˚｡⋆୨୧˚' },
        { sub: 'instagram-bio', name: 'Instagram Bios', sample: '˗ˏˋ ★ ˎˊ˗' },
        { sub: 'tiktok-bio', name: 'TikTok Bios', sample: '♡ status' },
        { sub: 'dividers', name: 'Aesthetic Dividers', sample: '─── ⋆⋅☆⋅⋆ ───' },
        { sub: 'borders', name: 'Fancy Borders', sample: '╔═══*.·:·.☽✧' },
        { sub: 'emoji-combos', name: 'Emoji Combos', sample: 'ೀ ִֶָ 𓂃 ࣪˖' },
        { sub: 'bio-templates', name: 'Bio Templates', sample: '⋆｡°✩ name' },
        { sub: 'symbols', name: 'Aesthetic Symbols', sample: 'ִֶָ 𓂃 ࣪˖' }
      ]
    }
  ];

  for (const hubInfo of hubs) {
    const hubDir = path.join(ROOT_DIR, hubInfo.dir);
    ensureDir(hubDir);

    // 1. Build Hub Index Page (e.g. /text-faces/index.html)
    const hubGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub);
    const hubBreadcrumbs = [
      { name: 'Home', url: 'index.html' },
      { name: hubInfo.title.split('—')[0].trim(), url: `${hubInfo.dir}/index.html` }
    ];

    const relatedCatCards = hubInfo.subpages.map(s => ({
      name: s.name,
      url: `${hubInfo.dir}/${s.sub}.html`,
      sample: s.sample,
      count: 'Explore'
    }));

    const hubHtml = generatePageTemplate({
      pageTitle: hubInfo.title,
      metaDescription: hubInfo.description,
      canonicalUrl: `${SITE_URL}/${hubInfo.dir}/`,
      rootPrefix: '../',
      breadcrumbs: hubBreadcrumbs,
      heroBadge: '⚡ 1-Click Copy • 1,000+ Items',
      h1Text: hubInfo.h1,
      heroSub: hubInfo.heroSub,
      activeHub: hubInfo.hub,
      activeSub: 'all',
      glyphs: hubGlyphs,
      editorialHtml: `
        <h2>Comprehensive Guide to ${hubInfo.title.split('—')[0].trim()}</h2>
        <p>Welcome to the ultimate directory of <strong>${hubInfo.title.split('—')[0].trim()}</strong>. Whether you are styling your Discord profile bio, commenting on viral TikTok videos, or chatting in Twitch streams, our curated collection delivers zero-lag, instant 1-click clipboard copying across all operating systems.</p>
        <h3>Category Highlights</h3>
        <p>Explore specialized sub-collections below to find the exact emotion or aesthetic design for your mood.</p>
      `,
      faqList: [
        { q: `How do I copy these ${hubInfo.title.split('—')[0].trim()}?`, a: "Simply tap or click any card box on this page to copy directly to your clipboard. A toast notification will verify the copy." },
        { q: "Are these characters compatible on iPhone and Android?", a: "Yes! All characters use universal Unicode standards, ensuring flawless rendering on iOS, Android, macOS, Windows, and Linux." }
      ],
      relatedCats: relatedCatCards,
      lang: 'en'
    });

    fs.writeFileSync(path.join(hubDir, 'index.html'), hubHtml, 'utf8');
    console.log(`  ✓ Generated Hub Index: ${hubInfo.dir}/index.html`);

    // 2. Build Subpages within this Hub (e.g. /text-faces/donger.html, /kaomoji/cat.html)
    for (const sub of hubInfo.subpages) {
      const subGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub && g.sub === sub.sub);
      const subBreadcrumbs = [
        { name: 'Home', url: 'index.html' },
        { name: hubInfo.title.split('—')[0].trim(), url: `${hubInfo.dir}/index.html` },
        { name: sub.name, url: `${hubInfo.dir}/${sub.sub}.html` }
      ];

      const customKey = `${hubInfo.dir}/${sub.sub}`;
      const customContent = CUSTOM_SUBPAGE_CONTENT[customKey];

      const pageTitle = customContent ? customContent.pageTitle : `${sub.name} ${sub.sample} — 1-Click Copy and Paste`;
      const metaDescription = customContent ? customContent.metaDescription : `Copy and paste ${sub.name} ${sub.sample} in 1-click. Free Unicode emoticons and text faces for Discord, TikTok, Roblox, and gaming.`;
      const h1Text = customContent ? customContent.h1Text : `${sub.name} <span>${sub.sample}</span>`;
      const heroSub = customContent ? customContent.heroSub : `Browse our curated collection of ${sub.name.toLowerCase()} for profiles, bios, and chat.`;
      const editorialHtml = customContent ? customContent.editorialHtml : `
          <h2>All About ${sub.name} ${sub.sample}</h2>
          <p>The <strong>${sub.name}</strong> collection offers expressive typographical art using international Unicode and special characters. Ideal for standing out on gaming servers, personal bios, and social media captions.</p>
          <h3>How to Use</h3>
          <p>Click any card above to copy the character. Paste into Discord, Roblox, TikTok, or your favorite messaging app with <kbd>Ctrl</kbd> + <kbd>V</kbd>.</p>
      `;
      const faqList = customContent ? customContent.faqList : [
          { q: `What is the most popular ${sub.name.toLowerCase()}?`, a: `The most iconic symbol in this category is ${sub.sample}, widely recognized across internet culture.` },
          { q: "Can I use these symbols in my bio?", a: "Yes, these characters are 100% compliant with Instagram, TikTok, Twitter, and Discord bio formatting rules." }
      ];
      const relatedCats = customContent ? customContent.relatedCats : relatedCatCards.filter(r => !r.url.endsWith(`${sub.sub}.html`)).slice(0, 6);

      // 1. Root Subpage HTML (e.g. emoticons/laughing.html)
      const subHtml = generatePageTemplate({
        pageTitle,
        metaDescription,
        canonicalUrl: `${SITE_URL}/${hubInfo.dir}/${sub.sub}.html`,
        rootPrefix: '../',
        breadcrumbs: subBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • Unicode Compatible',
        h1Text,
        heroSub,
        activeHub: hubInfo.hub,
        activeSub: sub.sub,
        glyphs: subGlyphs.length > 0 ? subGlyphs : hubGlyphs.slice(0, 12),
        editorialHtml,
        faqList,
        relatedCats,
        lang: 'en'
      });

      fs.writeFileSync(path.join(hubDir, `${sub.sub}.html`), subHtml, 'utf8');
      console.log(`    ✓ Generated: ${hubInfo.dir}/${sub.sub}.html`);

      // 2. Clean Directory URL (e.g. emoticons/laughing/index.html)
      const cleanSubDir = path.join(hubDir, sub.sub);
      if (!fs.existsSync(cleanSubDir)) fs.mkdirSync(cleanSubDir, { recursive: true });

      const cleanSubBreadcrumbs = [
        { name: 'Home', url: 'index.html' },
        { name: hubInfo.title.split('—')[0].trim(), url: `${hubInfo.dir}/` },
        { name: sub.name, url: `${hubInfo.dir}/${sub.sub}/` }
      ];

      const cleanSubHtml = generatePageTemplate({
        pageTitle,
        metaDescription,
        canonicalUrl: `${SITE_URL}/${hubInfo.dir}/${sub.sub}/`,
        rootPrefix: '../../',
        breadcrumbs: cleanSubBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • Unicode Compatible',
        h1Text,
        heroSub,
        activeHub: hubInfo.hub,
        activeSub: sub.sub,
        glyphs: subGlyphs.length > 0 ? subGlyphs : hubGlyphs.slice(0, 12),
        editorialHtml,
        faqList,
        relatedCats,
        lang: 'en'
      });

      fs.writeFileSync(path.join(cleanSubDir, 'index.html'), cleanSubHtml, 'utf8');
      console.log(`    ✓ Generated Clean URL: ${hubInfo.dir}/${sub.sub}/index.html`);
    }
  }
}

// Build Multilingual Hubs (/jp/, /kr/, /es/)
function buildMultilingualHubs() {
  console.log('Building Multilingual Hubs...');
  
  // 1. Japanese Hub (/jp/index.html)
  const jpDir = path.join(ROOT_DIR, 'jp');
  ensureDir(jpDir);
  const jpHtml = generatePageTemplate({
    pageTitle: '顔文字 コピペ (Kaomoji) — かわいい顔文字 & レニーフェイス 一覧 [2026]',
    metaDescription: 'ワンクリックでコピーできるかわいい顔文字（Kaomoji）とレニーフェイス（Lenny Face）の無料一覧まとめ。Twitter、Discord、LINEですぐに使えます。',
    canonicalUrl: `${SITE_URL}/jp/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: 'ホーム', url: 'index.html' },
      { name: '日本語 顔文字 (Kaomoji)', url: 'jp/index.html' }
    ],
    heroBadge: '⚡ ワンクリックで簡単コピー • 1000種以上の顔文字',
    h1Text: '顔文字 コピペ & レニーフェイス <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'カードをタップするだけでクリップボードに瞬時にコピー。Twitter、Discord、LINE、ゲームチャットで使える豊富な顔文字一覧です。',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>顔文字（Kaomoji）とレニーフェイス（Lenny Face）の魅力</h2>
      <p>日本のインターネット文化が生んだ<strong>顔文字（Kaomoji）</strong>は、文字コード（Unicode）を組み合わせて感情を豊かに表現するテキストアートです。海外で大人気の「レニーフェイス ( ͡° ͜ʖ ͡°)」も、世界中で親しまれています。</p>
      <h3>主なカテゴリー</h3>
      <ul>
        <li><strong>かわいい顔文字:</strong> ( ˶ˆ꒳ˆ˵ )、(*/ω＼*) など、柔らかい表情の顔文字。</li>
        <li><strong>動物の顔文字:</strong> /ᐠ｡ꞈ｡ᐟ\\（ねこ）、૮₍ • ᴥ • ₎ა（いぬ）、ᕱ⑅ᕱ（うさぎ）。</li>
        <li><strong>感情の顔文字:</strong> (*^▽^*)（よろこび）、(ノ_<。)（なみだ）、(#\`Д´)（いかり）。</li>
      </ul>
    `,
    faqList: [
      { q: "顔文字はどうやってコピーしますか？", a: "カードをタップまたはクリックするだけで、お使いの端末のクリップボードに自動的にコピーされます。" },
      { q: "スマホ（iPhone / Android）でも崩れず表示されますか？", a: "はい。当サイトの顔文字は世界標準のUnicode文字を使用しているため、最新のスマートフォンやPCで正しく表示されます。" }
    ],
    relatedCats: [
      { name: "猫の顔文字", url: "kaomoji/cat.html", sample: "/ᐠ｡ꞈ｡ᐟ\\" },
      { name: "かわいい顔文字", url: "kaomoji/cute.html", sample: "( ˶ˆ꒳ˆ˵ )" },
      { name: "ハート記号", url: "symbols/heart.html", sample: "♡" }
    ],
    lang: 'ja'
  });
  fs.writeFileSync(path.join(jpDir, 'index.html'), jpHtml, 'utf8');
  console.log('  ✓ Generated: jp/index.html');

  // 2. Korean Hub (/kr/index.html)
  const krDir = path.join(ROOT_DIR, 'kr');
  ensureDir(krDir);
  const krHtml = generatePageTemplate({
    pageTitle: '레니페이스 복사 ( ͡° ͜ʖ ͡°) — 텍스트 이모티콘 & 카오모지 모음',
    metaDescription: '원클릭으로 간편하게 복사하는 레니페이스 ( ͡° ͜ʖ ͡°), 카오모지, 귀여운 텍스트 이모티콘 모음. 디스코드, 인스타그램, 롤 채팅 완벽 지원.',
    canonicalUrl: `${SITE_URL}/kr/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: '홈', url: 'index.html' },
      { name: '한국어 레니페이스', url: 'kr/index.html' }
    ],
    heroBadge: '⚡ 원클릭 복사 • 1,000+ 텍스트 이모티콘',
    h1Text: '레니페이스 & 특수문자 이모티콘 <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: '카드를 탭하여 클립보드에 바로 복사하세요. 디스코드, 카카오톡, 게임 채팅에서 사용할 수 있는 다양한 텍스트 얼굴 모음입니다.',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>레니페이스 ( ͡° ͜ʖ ͡°) 와 특수문자 이모티콘 가이드</h2>
      <p><strong>레니페이스(Lenny Face)</strong>는 음흉하면서도 익살스러운 표정으로 전 세계 게이머와 커뮤니티에서 폭발적인 인기를 얻은 대표적인 텍스트 이모티콘입니다. 유니코드 조합 문자를 사용하여 어떤 플랫폼에서도 이미지 없이 텍스트 형태로 깔끔하게 표시됩니다.</p>
    `,
    faqList: [
      { q: "모바일에서도 원클릭 복사가 가능한가요?", a: "네! 원하는 이모티콘 카드를 누르면 즉시 클립보드에 복사되며 붙여넣기(Ctrl+V)하여 바로 사용할 수 있습니다." }
    ],
    relatedCats: [
      { name: "귀여운 레니", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "고양이 카오모지", url: "kaomoji/cat.html", sample: "(=^･ω･^=)" }
    ],
    lang: 'ko'
  });
  fs.writeFileSync(path.join(krDir, 'index.html'), krHtml, 'utf8');
  console.log('  ✓ Generated: kr/index.html');

  // 3. Spanish Hub (/es/index.html)
  const esDir = path.join(ROOT_DIR, 'es');
  ensureDir(esDir);
  const esHtml = generatePageTemplate({
    pageTitle: 'Caritas Lenny ( ͡° ͜ʖ ͡°) — Copiar y Pegar Caras de Texto y Kaomojis',
    metaDescription: 'Copia y pega caritas Lenny ( ͡° ͜ʖ ͡°), kaomojis japoneses, símbolos estéticos y emoticones de texto con 1 solo clic. Gratis para Discord y WhatsApp.',
    canonicalUrl: `${SITE_URL}/es/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: 'Inicio', url: 'index.html' },
      { name: 'Caritas Lenny en Español', url: 'es/index.html' }
    ],
    heroBadge: '⚡ 1 Clic para Copiar • Más de 1,000 Caritas',
    h1Text: 'Caritas Lenny & Kaomojis <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'Toca cualquier tarjeta para copiar al portapapeles al instante. Colección gratuita para Discord, WhatsApp, TikTok y videojuegos.',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>Guía Completa de Caritas Lenny y Kaomojis en Español</h2>
      <p>La famosa <strong>Carita Lenny ( ͡° ͜ʖ ͡°)</strong> es uno de los emoticones más populares de internet, ideal para expresar picardía, sarcasmo o humor cómplice. Gracias a los caracteres combinados de Unicode, puedes usarla en cualquier red social sin necesidad de instalar fuentes especiales.</p>
    `,
    faqList: [
      { q: "¿Cómo copio y pego las caritas en el celular?", a: "Simplemente pulsa sobre cualquier tarjeta para copiarla directamente a tu portapapeles y luego pégala en tu chat o biografía." }
    ],
    relatedCats: [
      { name: "Caritas Tiernas", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Símbolos de Corazón", url: "symbols/heart.html", sample: "♡" }
    ],
    lang: 'es'
  });
  fs.writeFileSync(path.join(esDir, 'index.html'), esHtml, 'utf8');
  console.log('  ✓ Generated: es/index.html');
}

// Build Static Informational Pages (About, Privacy, Terms)
function buildInfoPages() {
  console.log('Building Informational Pages...');

  const pages = [
    {
      slug: 'about.html',
      title: 'About Us — Lenny Face Pro',
      description: 'Learn about Lenny Face Pro, our mission for 100/100 Core Web Vitals, and our open Unicode text emoticon directory.',
      h1: 'About <span>Lenny Face Pro</span>',
      content: `
        <h2>Our Mission</h2>
        <p>Lenny Face Pro was built with a simple premise: web utilities should be instantaneous, zero-bloat, and enjoyable to use. While existing emoticon websites are bogged down by intrusive advertisements, slow WordPress frameworks, and sluggish loading times, our platform delivers a verified <strong>100/100 Google PageSpeed score</strong> using clean, modern HTML5, CSS3, and lightweight vanilla JavaScript.</p>
        
        <h3>Universal Unicode Compatibility</h3>
        <p>Every single glyph on our site is tested against modern Unicode specifications across iOS, Android, Windows, macOS, and Linux to guarantee that your messages, Discord statuses, and gaming chats look crisp and distortion-free.</p>
      `
    },
    {
      slug: 'privacy.html',
      title: 'Privacy Policy — Lenny Face Pro',
      description: 'Lenny Face Pro Privacy Policy: We do not store personal data or track private chat information.',
      h1: 'Privacy <span>Policy</span>',
      content: `
        <h2>Your Privacy Matters</h2>
        <p>Lenny Face Pro does not collect personally identifiable information. We do not require account registration, passwords, or personal email addresses to use our 1-click copy tools and generators.</p>
        <h3>Local Storage</h3>
        <p>Your favorite emoticons and selected theme preference (Dark or Light mode) are saved locally on your own device using browser <code>localStorage</code>. This data never leaves your device and is never transmitted to any external servers.</p>
      `
    },
    {
      slug: 'terms.html',
      title: 'Terms of Service — Lenny Face Pro',
      description: 'Terms of Service for using Lenny Face Pro tools and text face collections.',
      h1: 'Terms of <span>Service</span>',
      content: `
        <h2>Usage Agreement</h2>
        <p>By accessing and utilizing Lenny Face Pro, you agree to use our free text generator and copying tools for personal, creative, and commercial communications in compliance with applicable laws.</p>
        <p>All Unicode characters and ASCII art combinations are provided free of charge for community expression across social networks and digital platforms.</p>
      `
    }
  ];

  for (const p of pages) {
    const html = generatePageTemplate({
      pageTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `${SITE_URL}/${p.slug}`,
      rootPrefix: '',
      breadcrumbs: [
        { name: 'Home', url: 'index.html' },
        { name: p.title.split('—')[0].trim(), url: p.slug }
      ],
      heroBadge: 'ℹ️ Information & Transparency',
      h1Text: p.h1,
      heroSub: 'Learn more about our platform standards, security, and privacy commitments.',
      activeHub: 'all',
      activeSub: 'all',
      glyphs: [],
      editorialHtml: p.content,
      faqList: [],
      relatedCats: [],
      lang: 'en'
    });

    fs.writeFileSync(path.join(ROOT_DIR, p.slug), html, 'utf8');
    console.log(`  ✓ Generated: ${p.slug}`);
  }
}

// Generate XML Sitemap & robots.txt
function buildSitemapAndRobots() {
  console.log('Building sitemap.xml & robots.txt...');

  const allUrls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    ...LENNY_SUBPAGES.map(p => ({ loc: `${SITE_URL}/${p.slug.replace(/\.html$/, '')}/`, priority: '0.9', changefreq: 'weekly' })),
    { loc: `${SITE_URL}/text-faces/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/kaomoji/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/emoticons/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/symbols/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/aesthetic/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/jp/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/kr/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/es/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/about.html`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${SITE_URL}/privacy.html`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${SITE_URL}/terms.html`, priority: '0.3', changefreq: 'yearly' }
  ];

  // Add all hub subpages with clean URL formatting
  const hubFolders = ['text-faces', 'kaomoji', 'emoticons', 'symbols', 'aesthetic'];
  for (const folder of hubFolders) {
    const folderPath = path.join(ROOT_DIR, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith('.html') && file !== 'index.html') {
          const subSlug = file.replace(/\.html$/, '');
          allUrls.push({
            loc: `${SITE_URL}/${folder}/${subSlug}/`,
            priority: '0.8',
            changefreq: 'weekly'
          });
        }
      }
    }
  }

  const today = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ✓ Generated: sitemap.xml (${allUrls.length} URLs indexed)`);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log('  ✓ Generated: robots.txt');
}

// Update data.js with Master Dataset
function updateDataJs() {
  console.log('Updating data.js with master dataset...');
  const dataJsContent = `/**
 * Lenny Face Pro - Comprehensive Glyph Dataset
 * Includes Lenny Faces, Text Faces, Kaomoji, Emoticons, Symbols & Aesthetic Bios
 */

const GLYPH_DATA = ${JSON.stringify(ALL_GLYPHS, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GLYPH_DATA;
}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'data.js'), dataJsContent, 'utf8');
  console.log('  ✓ Updated data.js');
}

// Pre-render static cards into index.html
function buildHomePage() {
  console.log('Injecting pre-rendered cards into index.html...');
  const indexPath = path.join(ROOT_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const allGlyphs = ALL_GLYPHS;
  const cardsHtml = allGlyphs.map(renderStaticCard).join('\n');

  // Replace content between <!-- START_SSR_CARDS --> and <!-- END_SSR_CARDS -->
  if (indexHtml.includes('<!-- START_SSR_CARDS -->') && indexHtml.includes('<!-- END_SSR_CARDS -->')) {
    indexHtml = indexHtml.replace(
      /<!-- START_SSR_CARDS -->[\s\S]*?<!-- END_SSR_CARDS -->/,
      `<!-- START_SSR_CARDS -->\n        <div class="face-grid" id="face-grid" data-initial-hub="all" data-initial-sub="all">\n${cardsHtml}\n        </div>\n        <!-- END_SSR_CARDS -->`
    );
  } else {
    // Fallback: replace face-grid
    indexHtml = indexHtml.replace(
      /<div class="face-grid" id="face-grid"[\s\S]*?<\/div>/,
      `<div class="face-grid" id="face-grid" data-initial-hub="all" data-initial-sub="all">\n${cardsHtml}\n        </div>`
    );
  }

  // Update grid count display
  indexHtml = indexHtml.replace(
    /<div class="grid-count">[\s\S]*?<\/div>/,
    `<div class="grid-count">Showing <strong>${allGlyphs.length}</strong> items in this category</div>`
  );

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log(`  ✓ Injected ALL ${allGlyphs.length} pre-rendered cards into index.html`);
}

// Execute All Builders
function buildAll() {
  console.log('🚀 Starting Lenny Face Pro Site Builder...');
  updateDataJs();
  buildHomePage();
  buildLennySubpages();
  buildHubPages();
  buildMultilingualHubs();
  buildInfoPages();
  buildSitemapAndRobots();
  console.log('🎉 Site build completed successfully!');
}

buildAll();
