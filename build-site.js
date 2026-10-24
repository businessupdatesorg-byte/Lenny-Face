/**
 * Lenny Face Pro - Multilingual Static Site Generator (build-site.js)
 * Generates 100/100 Core Web Vitals HTML pages with:
 * - Pre-rendered SSR static cards across all language clusters
 * - Rich JSON-LD schemas (WebApplication, FAQPage, BreadcrumbList, ItemList)
 * - In-depth editorial guides & localized FAQs
 * - Complete Hreflang multilingual support (EN, ES, JA, KO) for all pages
 * - XML Sitemap & robots.txt with XHTML hreflang links
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_URL = 'https://thelennyfaces.com';

// Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Master Datasets
const ALL_GLYPHS = require('./glyphs-data.js');
const { CUSTOM_HUB_CONTENT, CUSTOM_SUBPAGE_CONTENT } = require('./editorial-data.js');
const LENNY_SUBPAGES = require('./lenny-subpages-data.js');
const {
  LANGUAGES,
  UI_STRINGS,
  HOMEPAGE_I18N,
  LENNY_SUBPAGES_I18N,
  HUBS_I18N,
  SUBPAGES_I18N
} = require('./i18n-data.js');

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

// Helper: Build relative or root-relative URL for a language
function getLangUrl(cleanPath, lang = 'en') {
  let prefix = '';
  if (lang === 'es') prefix = 'es/';
  else if (lang === 'ja') prefix = 'jp/';
  else if (lang === 'ko') prefix = 'kr/';

  const clean = (cleanPath || '').replace(/^\/+/, '');
  if (!clean) {
    return prefix ? `/${prefix}` : '/';
  }
  return `/${prefix}${clean}`;
}

// Helper: Build absolute canonical/hreflang URL for a language
function getAbsoluteLangUrl(cleanPath, lang = 'en') {
  return `${SITE_URL}${getLangUrl(cleanPath, lang)}`;
}

// Helper: Calculate rootPrefix (../ relative to root) based on output file path
function calculateRootPrefix(filePath) {
  const rel = path.relative(path.dirname(filePath), ROOT_DIR);
  return rel ? rel.replace(/\\/g, '/') + '/' : '';
}

// Helper: Generate authentic, non-stuffed editorial content for non-English pages
function getLocalizedEditorial(name, sample, lang) {
  const safeSample = sample ? escapeHtml(sample) : '';
  if (lang === 'es') {
    return `
      <h2>Guía Completa de ${escapeHtml(name)} ${safeSample}</h2>
      <p>Bienvenido a nuestra colección especializada de <strong>${escapeHtml(name)}</strong>. Esta selección incluye los mejores caracteres y emoticones diseñados con el estándar Unicode internacional para transmitir emociones precisas en tus mensajes y publicaciones.</p>
      
      <h3>¿Dónde Utilizar Estos Emoticones?</h3>
      <p>Nuestras caritas y símbolos funcionan en cualquier plataforma moderna sin requerir fuentes especiales:</p>
      <ul>
        <li><strong>Discord y Twitch:</strong> Dale estilo a tus comentarios, apodos y mensajes de servidor.</li>
        <li><strong>Redes Sociales:</strong> Ideales para destacar en biografías y descripciones de TikTok, Instagram, Twitter (X) y WhatsApp.</li>
        <li><strong>Videojuegos:</strong> Totalmente compatibles con el chat de Minecraft, Roblox, Valorant y League of Legends.</li>
      </ul>

      <h3>¿Cómo Copiar y Pegar en 1 Clic?</h3>
      <p>Copia cualquier cara o símbolo pulsando directamente sobre su tarjeta. Luego pégalo en tu aplicación preferida con <kbd>Ctrl</kbd> + <kbd>V</kbd> (Windows) o <kbd>Cmd</kbd> + <kbd>V</kbd> (Mac). En teléfonos celulares, mantén presionada la pantalla y selecciona "Pegar".</p>
    `;
  }
  if (lang === 'ja') {
    return `
      <h2>${escapeHtml(name)} ${safeSample} のコピペと使い方まとめ</h2>
      <p>ワンクリックでコピーできる<strong>${escapeHtml(name)}</strong>の厳選コレクションです。Unicode（ユニコード）の文字コードを組み合わせたテキストアートなので、画像を使わずに感情やニュアンスを表情豊かに伝えられます。</p>
      
      <h3>おすすめの利用シーン</h3>
      <ul>
        <li><strong>SNSでのコミュニケーション:</strong> Twitter (X)、LINE、Instagramのリプライやプロフィール装飾に。</li>
        <li><strong>ゲーム内チャット:</strong> Discord、APEX、VALORANT、Fortniteなどのチャット欄で手軽に使えます。</li>
        <li><strong>個性的なテキスト表現:</strong> メールやメッセージでちょっとしたアクセントを加えたい時に最適です。</li>
      </ul>

      <h3>ワンクリックで簡単コピペ</h3>
      <p>お好きなカードをタップまたはクリックするだけで、端末のクリップボードに自動的にコピーされます。<kbd>Ctrl</kbd> + <kbd>V</kbd>（Macは<kbd>Cmd</kbd> + <kbd>V</kbd>）でどこにでも貼り付け可能です。</p>
    `;
  }
  if (lang === 'ko') {
    return `
      <h2>${escapeHtml(name)} ${safeSample} 완벽 활용 가이드</h2>
      <p>원클릭으로 간편하게 복사할 수 있는 <strong>${escapeHtml(name)}</strong> 컬렉션입니다. 별도의 폰트 설치나 이미지 파일 없이 유니코드(Unicode) 텍스트 형태로 깔끔하게 표현됩니다.</p>
      
      <h3>추천 활용처</h3>
      <ul>
        <li><strong>커뮤니티 및 SNS:</strong> 인스타그램 바이오(소개글), 틱톡 캡션, 유튜브 댓글 등에서 시선을 끄는 텍스트 장식.</li>
        <li><strong>게임 및 보이스 채팅:</strong> 디스코드(Discord), 롤, 발로란트 게임 채팅에서 나만의 감정 표현.</li>
        <li><strong>메신저 대화:</strong> 카카오톡 및 모바일 메신저에서 빠르고 개성 넘치는 리액션 전달.</li>
      </ul>

      <h3>원클릭 간편 복사 안내</h3>
      <p>원하는 카드를 클릭하거나 탭하면 즉시 클립보드에 복사됩니다. <kbd>Ctrl</kbd> + <kbd>V</kbd> (Mac은 <kbd>Cmd</kbd> + <kbd>V</kbd>)로 원하는 입력창에 붙여넣어 바로 사용할 수 있습니다.</p>
    `;
  }
  return '';
}

// Helper: Localized FAQs
function getLocalizedFaqs(name, sample, lang) {
  if (lang === 'es') {
    return [
      { q: `¿Cómo copio ${name.toLowerCase()} al portapapeles?`, a: "Simplemente pulsa o haz clic en cualquier tarjeta para copiarla directamente a tu portapapeles en 1 solo segundo." },
      { q: "¿Son compatibles con iPhone, Android y consolas?", a: "¡Sí! Todos los símbolos utilizan caracteres estándar de Unicode UTF-8, por lo que se visualizan sin fallas ni cuadros vacíos en todos los dispositivos modernos." },
      { q: "¿Puedo usarlos en mi biografía de redes sociales?", a: "Totalmente. Son ideales para biografías de Instagram, TikTok, Discord y estados de WhatsApp." }
    ];
  }
  if (lang === 'ja') {
    return [
      { q: `${name}はどうやってコピーしますか？`, a: "カードをタップまたはクリックするだけで、自動的にお使いの端末のクリップボードにコピーされます。" },
      { q: "スマホやDiscordで文字化けしませんか？", a: "はい。当サイトのテキストはすべて世界標準のUnicode文字を使用しているため、iPhone、Android、PC環境で崩れずきれいに表示されます。" },
      { q: "お気に入りに登録することはできますか？", a: "各カードのハートアイコンをクリックすると、ローカルのお気に入りリストに保存され、いつでもワンクリックで再利用できます。" }
    ];
  }
  if (lang === 'ko') {
    return [
      { q: `${name} 이모티콘을 어떻게 복사하나요?`, a: "원하는 카드를 터치하거나 클릭하면 즉시 클립보드에 복사되며, 원하는 입력창에 바로 붙여넣기(Ctrl+V)할 수 있습니다." },
      { q: "모바일 스마트폰에서도 깨짐 없이 표시되나요?", a: "네! 아이폰, 갤럭시, PC 등 모든 표준 유니코드 지원 환경에서 글자 깨짐 없이 선명하게 표시됩니다." },
      { q: "자주 쓰는 이모티콘을 저장할 수 있나요?", a: "카드 오른쪽 상단의 하트 아이콘을 누르면 즐겨찾기 목록에 저장되어 언제든 간편하게 꺼내 쓸 수 있습니다." }
    ];
  }
  return [];
}

// Generate static card HTML with localized green copy button and share button
function renderStaticCard(item, lang = 'en') {
  const ui = UI_STRINGS[lang] || UI_STRINGS.en;
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
          <button type="button" class="face-action-btn" onclick="event.stopPropagation(); toggleFavAction(\`${safeAttr.replace(/`/g, '\\`')}\`)" title="${escapeHtml(ui.hubFavs)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button type="button" class="face-share-btn" onclick="event.stopPropagation(); shareGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, \`${safeName.replace(/`/g, '\\`')}\`)" title="${escapeHtml(ui.shareTitle)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button type="button" class="face-copy-btn" onclick="event.stopPropagation(); copyGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, this)" title="${escapeHtml(ui.copyBtn)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>${escapeHtml(ui.copyBtn)}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Render Breadcrumb Component
function renderBreadcrumbs(crumbs, lang = 'en') {
  if (!crumbs || crumbs.length === 0) return '';
  const crumbHtml = crumbs.map((c, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<span class="current">${escapeHtml(c.name)}</span>`;
    }
    const href = (c.url.startsWith('http') || c.url.startsWith('/')) ? c.url : getLangUrl(c.url, lang);
    return `<a href="${href}">${escapeHtml(c.name)}</a><span class="sep">/</span>`;
  }).join(' ');

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${crumbHtml}
    </nav>
  `;
}

// Render Related Categories Grid Component
function renderRelatedCategories(relatedCats, lang = 'en') {
  if (!relatedCats || relatedCats.length === 0) return '';
  const ui = UI_STRINGS[lang] || UI_STRINGS.en;
  return `
    <div style="margin-top: 3rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">${escapeHtml(ui.exploreRelated)}</h3>
      <div class="category-card-grid">
        ${relatedCats.map(cat => {
          const href = (cat.url.startsWith('http') || cat.url.startsWith('/')) ? cat.url : getLangUrl(cat.url, lang);
          return `
          <a href="${href}" class="cat-card">
            <span class="cat-sample">${cat.sample}</span>
            <span class="cat-name">${escapeHtml(cat.name)}</span>
            <span class="cat-count">${escapeHtml(cat.count || 'Explore')}</span>
          </a>
        `;
        }).join('')}
      </div>
    </div>
  `;
}

// Render Social Share Bar Component
function renderShareBar(title, url, lang = 'en') {
  const ui = UI_STRINGS[lang] || UI_STRINGS.en;
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  const waText = encodeURIComponent(`${title} — Copy & paste in 1-click! ${url}`);

  return `
    <!-- Social Share Buttons -->
    <div class="share-bar-container">
      <div class="share-bar-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span>${escapeHtml(ui.shareTitle)}</span>
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
          <span>${escapeHtml(ui.copyBtn)} Link</span>
        </button>
      </div>
    </div>
  `;
}

// Render Pre-rendered Static Subbars with Real Anchor Links for Instant Bottom-Left Preview
function renderAllSubbars(activeHub, activeSub, lang = 'en') {
  function getSubName(group, subKey, fallback) {
    if (subKey === 'all') {
      const ui = UI_STRINGS[lang] || UI_STRINGS.en;
      if (group === 'lenny') return ui.hubLenny;
      if (group === 'kaomoji') return ui.hubKaomoji;
      if (group === 'text-faces') return ui.hubTextFaces;
      if (group === 'emoticons') return ui.hubEmoticons;
      if (group === 'symbols') return ui.hubSymbols;
      if (group === 'aesthetic') return ui.hubAesthetic;
      return ui.hubAll;
    }
    if (group === 'lenny' && LENNY_SUBPAGES_I18N[subKey] && LENNY_SUBPAGES_I18N[subKey][lang]) {
      return LENNY_SUBPAGES_I18N[subKey][lang].name;
    }
    const fullKey = `${group}/${subKey}`;
    if (SUBPAGES_I18N[fullKey] && SUBPAGES_I18N[fullKey][lang]) {
      return SUBPAGES_I18N[fullKey][lang].name;
    }
    return fallback;
  }

  const lennyChips = [
    { sub: 'all', name: getSubName('lenny', 'all', 'All Lenny'), url: getLangUrl('', lang) + '#browse' },
    { sub: 'angry', name: getSubName('lenny', 'angry', 'Angry'), url: getLangUrl('angry-lenny-face/', lang) },
    { sub: 'crying', name: getSubName('lenny', 'crying', 'Crying'), url: getLangUrl('crying-lenny-face/', lang) },
    { sub: 'cute', name: getSubName('lenny', 'cute', 'Cute'), url: getLangUrl('cute-lenny-face/', lang) },
    { sub: 'sad', name: getSubName('lenny', 'sad', 'Sad'), url: getLangUrl('sad-lenny-face/', lang) },
    { sub: 'happy', name: getSubName('lenny', 'happy', 'Happy'), url: getLangUrl('happy-lenny-face/', lang) },
    { sub: 'blushing', name: getSubName('lenny', 'blushing', 'Blushing'), url: getLangUrl('blushing-lenny-face/', lang) },
    { sub: 'shrug', name: getSubName('lenny', 'shrug', 'Shrug'), url: getLangUrl('shrug-lenny-face/', lang) },
    { sub: 'middle-finger', name: getSubName('lenny', 'middle-finger', 'Middle Finger'), url: getLangUrl('middle-finger/', lang) },
    { sub: 'wink', name: getSubName('lenny', 'wink', 'Wink'), url: getLangUrl('wink-lenny-face/', lang) },
    { sub: 'cool', name: getSubName('lenny', 'cool', 'Cool'), url: getLangUrl('cool-lenny-face/', lang) },
    { sub: 'strong', name: getSubName('lenny', 'strong', 'Strong'), url: getLangUrl('strong-lenny-face/', lang) },
    { sub: 'hug', name: getSubName('lenny', 'hug', 'Hug'), url: getLangUrl('hug-lenny-face/', lang) },
    { sub: 'love', name: getSubName('lenny', 'love', 'Love'), url: getLangUrl('love-lenny-face/', lang) },
    { sub: 'donger', name: getSubName('lenny', 'donger', 'Donger'), url: getLangUrl('donger-lenny-face/', lang) },
    { sub: 'shocked', name: getSubName('lenny', 'shocked', 'Shocked'), url: getLangUrl('shocked-lenny-face/', lang) },
    { sub: 'sparkle', name: getSubName('lenny', 'sparkle', 'Sparkle'), url: getLangUrl('sparkle-lenny-face/', lang) },
    { sub: 'weapons', name: getSubName('lenny', 'weapons', 'Weapons'), url: getLangUrl('weapons-lenny-face/', lang) }
  ];

  const kaomojiChips = [
    { sub: 'all', name: getSubName('kaomoji', 'all', 'All Kaomoji'), url: getLangUrl('kaomoji/', lang) },
    { sub: 'cat', name: getSubName('kaomoji', 'cat', 'Cat'), url: getLangUrl('kaomoji/cat/', lang) },
    { sub: 'cute', name: getSubName('kaomoji', 'cute', 'Cute'), url: getLangUrl('kaomoji/cute/', lang) },
    { sub: 'heart', name: getSubName('kaomoji', 'heart', 'Heart'), url: getLangUrl('kaomoji/heart/', lang) },
    { sub: 'happy', name: getSubName('kaomoji', 'happy', 'Happy'), url: getLangUrl('kaomoji/happy/', lang) },
    { sub: 'hug', name: getSubName('kaomoji', 'hug', 'Hug'), url: getLangUrl('kaomoji/hug/', lang) },
    { sub: 'kiss', name: getSubName('kaomoji', 'kiss', 'Kiss'), url: getLangUrl('kaomoji/kiss/', lang) },
    { sub: 'sad', name: getSubName('kaomoji', 'sad', 'Sad'), url: getLangUrl('kaomoji/sad/', lang) },
    { sub: 'angry', name: getSubName('kaomoji', 'angry', 'Angry'), url: getLangUrl('kaomoji/angry/', lang) },
    { sub: 'dog', name: getSubName('kaomoji', 'dog', 'Dog'), url: getLangUrl('kaomoji/dog/', lang) },
    { sub: 'bunny', name: getSubName('kaomoji', 'bunny', 'Bunny'), url: getLangUrl('kaomoji/bunny/', lang) },
    { sub: 'bear', name: getSubName('kaomoji', 'bear', 'Bear'), url: getLangUrl('kaomoji/bear/', lang) },
    { sub: 'spider', name: getSubName('kaomoji', 'spider', 'Spider'), url: getLangUrl('kaomoji/spider/', lang) },
    { sub: 'begging', name: getSubName('kaomoji', 'begging', 'Begging'), url: getLangUrl('kaomoji/begging/', lang) },
    { sub: 'determined', name: getSubName('kaomoji', 'determined', 'Determined'), url: getLangUrl('kaomoji/determined/', lang) },
    { sub: 'dancing', name: getSubName('kaomoji', 'dancing', 'Dancing'), url: getLangUrl('kaomoji/dancing/', lang) },
    { sub: 'sleepy', name: getSubName('kaomoji', 'sleepy', 'Sleepy'), url: getLangUrl('kaomoji/sleepy/', lang) },
    { sub: 'sparkle', name: getSubName('kaomoji', 'sparkle', 'Sparkle'), url: getLangUrl('kaomoji/sparkle/', lang) },
    { sub: 'shocked', name: getSubName('kaomoji', 'shocked', 'Shocked'), url: getLangUrl('kaomoji/shocked/', lang) },
    { sub: 'scared', name: getSubName('kaomoji', 'scared', 'Scared'), url: getLangUrl('kaomoji/scared/', lang) },
    { sub: 'tired', name: getSubName('kaomoji', 'tired', 'Tired'), url: getLangUrl('kaomoji/tired/', lang) },
    { sub: 'nervous', name: getSubName('kaomoji', 'nervous', 'Nervous'), url: getLangUrl('kaomoji/nervous/', lang) },
    { sub: 'shrug', name: getSubName('kaomoji', 'shrug', 'Shrug'), url: getLangUrl('kaomoji/shrug/', lang) }
  ];

  const textFacesChips = [
    { sub: 'all', name: getSubName('text-faces', 'all', 'All Text Faces'), url: getLangUrl('text-faces/', lang) },
    { sub: 'donger', name: getSubName('text-faces', 'donger', 'Donger'), url: getLangUrl('text-faces/donger/', lang) },
    { sub: 'table-flipping', name: getSubName('text-faces', 'table-flipping', 'Table Flip'), url: getLangUrl('text-faces/table-flipping/', lang) },
    { sub: 'disapproval', name: getSubName('text-faces', 'disapproval', 'Disapproval'), url: getLangUrl('text-faces/disapproval/', lang) },
    { sub: 'fight', name: getSubName('text-faces', 'fight', 'Fighting'), url: getLangUrl('text-faces/fight/', lang) },
    { sub: 'bear', name: getSubName('text-faces', 'bear', 'Bear'), url: getLangUrl('text-faces/bear/', lang) },
    { sub: 'cat', name: getSubName('text-faces', 'cat', 'Cat'), url: getLangUrl('text-faces/cat/', lang) },
    { sub: 'dog', name: getSubName('text-faces', 'dog', 'Dog'), url: getLangUrl('text-faces/dog/', lang) },
    { sub: 'hug', name: getSubName('text-faces', 'hug', 'Hug'), url: getLangUrl('text-faces/hug/', lang) },
    { sub: 'crying', name: getSubName('text-faces', 'crying', 'Crying'), url: getLangUrl('text-faces/crying/', lang) },
    { sub: 'cool', name: getSubName('text-faces', 'cool', 'Cool'), url: getLangUrl('cool-lenny-face/', lang) },
    { sub: 'happy', name: getSubName('text-faces', 'happy', 'Happy'), url: getLangUrl('text-faces/happy/', lang) },
    { sub: 'cute', name: getSubName('text-faces', 'cute', 'Cute'), url: getLangUrl('text-faces/cute/', lang) },
    { sub: 'love', name: getSubName('text-faces', 'love', 'Love'), url: getLangUrl('text-faces/love/', lang) },
    { sub: 'sad', name: getSubName('text-faces', 'sad', 'Sad'), url: getLangUrl('text-faces/sad/', lang) },
    { sub: 'confused', name: getSubName('text-faces', 'confused', 'Confused'), url: getLangUrl('text-faces/confused/', lang) },
    { sub: 'blushing', name: getSubName('text-faces', 'blushing', 'Blushing'), url: getLangUrl('text-faces/blushing/', lang) },
    { sub: 'sleepy', name: getSubName('text-faces', 'sleepy', 'Sleepy'), url: getLangUrl('text-faces/sleepy/', lang) },
    { sub: 'shrug', name: getSubName('text-faces', 'shrug', 'Shrug'), url: getLangUrl('text-faces/shrug/', lang) },
    { sub: 'gaming', name: getSubName('text-faces', 'gaming', 'Gaming'), url: getLangUrl('text-faces/gaming/', lang) },
    { sub: 'funny', name: getSubName('text-faces', 'funny', 'Funny'), url: getLangUrl('text-faces/funny/', lang) }
  ];

  const emoticonsChips = [
    { sub: 'all', name: getSubName('emoticons', 'all', 'All Emoticons'), url: getLangUrl('emoticons/', lang) },
    { sub: 'laughing', name: getSubName('emoticons', 'laughing', 'Laughing'), url: getLangUrl('emoticons/laughing/', lang) },
    { sub: 'smiley', name: getSubName('emoticons', 'smiley', 'Smiley'), url: getLangUrl('emoticons/smiley/', lang) },
    { sub: 'winky', name: getSubName('emoticons', 'winky', 'Winky'), url: getLangUrl('emoticons/winky/', lang) },
    { sub: 'sad', name: getSubName('emoticons', 'sad', 'Sad'), url: getLangUrl('emoticons/sad/', lang) },
    { sub: 'mad', name: getSubName('emoticons', 'mad', 'Mad'), url: getLangUrl('emoticons/mad/', lang) },
    { sub: 'annoyed', name: getSubName('emoticons', 'annoyed', 'Annoyed'), url: getLangUrl('emoticons/annoyed/', lang) },
    { sub: 'kissy', name: getSubName('emoticons', 'kissy', 'Kissy'), url: getLangUrl('emoticons/kissy/', lang) },
    { sub: 'heart', name: getSubName('emoticons', 'heart', 'Heart'), url: getLangUrl('emoticons/heart/', lang) },
    { sub: 'cute', name: getSubName('emoticons', 'cute', 'Cute'), url: getLangUrl('emoticons/cute/', lang) },
    { sub: 'creepy', name: getSubName('emoticons', 'creepy', 'Creepy'), url: getLangUrl('emoticons/creepy/', lang) }
  ];

  const symbolsChips = [
    { sub: 'all', name: getSubName('symbols', 'all', 'All Symbols'), url: getLangUrl('symbols/', lang) },
    { sub: 'heart', name: getSubName('symbols', 'heart', 'Heart'), url: getLangUrl('symbols/heart/', lang) },
    { sub: 'star', name: getSubName('symbols', 'star', 'Star'), url: getLangUrl('symbols/star/', lang) },
    { sub: 'sparkle', name: getSubName('symbols', 'sparkle', 'Sparkle'), url: getLangUrl('symbols/sparkle/', lang) },
    { sub: 'flower', name: getSubName('symbols', 'flower', 'Flower'), url: getLangUrl('symbols/flower/', lang) },
    { sub: 'moon', name: getSubName('symbols', 'moon', 'Moon'), url: getLangUrl('symbols/moon/', lang) },
    { sub: 'skull', name: getSubName('symbols', 'skull', 'Skull'), url: getLangUrl('symbols/skull/', lang) },
    { sub: 'crown', name: getSubName('symbols', 'crown', 'Crown'), url: getLangUrl('symbols/crown/', lang) },
    { sub: 'weapons', name: getSubName('symbols', 'weapons', 'Weapons'), url: getLangUrl('symbols/weapons/', lang) },
    { sub: 'bow', name: getSubName('symbols', 'bow', 'Bow'), url: getLangUrl('symbols/bow/', lang) },
    { sub: 'music', name: getSubName('symbols', 'music', 'Music'), url: getLangUrl('symbols/music/', lang) },
    { sub: 'butterfly', name: getSubName('symbols', 'butterfly', 'Butterfly'), url: getLangUrl('symbols/butterfly/', lang) },
    { sub: 'fire', name: getSubName('symbols', 'fire', 'Fire'), url: getLangUrl('symbols/fire/', lang) },
    { sub: 'snowflake', name: getSubName('symbols', 'snowflake', 'Snowflake'), url: getLangUrl('symbols/snowflake/', lang) },
    { sub: 'sun', name: getSubName('symbols', 'sun', 'Sun'), url: getLangUrl('symbols/sun/', lang) },
    { sub: 'check-mark', name: getSubName('symbols', 'check-mark', 'Check Marks'), url: getLangUrl('symbols/check-mark/', lang) },
    { sub: 'bullet-point', name: getSubName('symbols', 'bullet-point', 'Bullet Points'), url: getLangUrl('symbols/bullet-point/', lang) },
    { sub: 'cross', name: getSubName('symbols', 'cross', 'Crosses'), url: getLangUrl('symbols/cross/', lang) },
    { sub: 'arrow', name: getSubName('symbols', 'arrow', 'Arrows'), url: getLangUrl('symbols/arrow/', lang) }
  ];

  const aestheticChips = [
    { sub: 'all', name: getSubName('aesthetic', 'all', 'All Aesthetic'), url: getLangUrl('aesthetic/', lang) },
    { sub: 'discord-bio', name: getSubName('aesthetic', 'discord-bio', 'Discord Bios'), url: getLangUrl('aesthetic/discord-bio/', lang) },
    { sub: 'instagram-bio', name: getSubName('aesthetic', 'instagram-bio', 'Instagram Bios'), url: getLangUrl('aesthetic/instagram-bio/', lang) },
    { sub: 'tiktok-bio', name: getSubName('aesthetic', 'tiktok-bio', 'TikTok Bios'), url: getLangUrl('aesthetic/tiktok-bio/', lang) },
    { sub: 'dividers', name: getSubName('aesthetic', 'dividers', 'Aesthetic Dividers'), url: getLangUrl('aesthetic/dividers/', lang) },
    { sub: 'borders', name: getSubName('aesthetic', 'borders', 'Fancy Borders'), url: getLangUrl('aesthetic/borders/', lang) },
    { sub: 'emoji-combos', name: getSubName('aesthetic', 'emoji-combos', 'Emoji Combos'), url: getLangUrl('aesthetic/emoji-combos/', lang) },
    { sub: 'bio-templates', name: getSubName('aesthetic', 'bio-templates', 'Bio Templates'), url: getLangUrl('aesthetic/bio-templates/', lang) },
    { sub: 'symbols', name: getSubName('aesthetic', 'symbols', 'Aesthetic Symbols'), url: getLangUrl('aesthetic/symbols/', lang) }
  ];

  const subbars = [
    { group: 'lenny', chips: lennyChips },
    { group: 'kaomoji', chips: kaomojiChips },
    { group: 'text-faces', chips: textFacesChips },
    { group: 'emoticons', chips: emoticonsChips },
    { group: 'symbols', chips: symbolsChips },
    { group: 'aesthetic', chips: aestheticChips }
  ];

  return subbars.map(sb => {
    const isVisible = (activeHub === sb.group) || (activeHub === 'all' && sb.group === 'lenny');
    const chipHtml = sb.chips.map(c => {
      const isChipActive = isVisible && (activeSub === c.sub || (activeSub === 'all' && c.sub === 'all'));
      return `<a href="${c.url}" class="sub-chip ${isChipActive ? 'active' : ''}" data-sub="${c.sub}">${escapeHtml(c.name)}</a>`;
    }).join('\n        ');

    return `
      <!-- Sub-category Bar: ${sb.group} -->
      <div class="subbar" id="subbar-${sb.group}" data-hub-group="${sb.group}" style="display: ${isVisible ? 'flex' : 'none'};" role="group" aria-label="${sb.group} subcategories">
        ${chipHtml}
      </div>
    `;
  }).join('\n');
}

// Base HTML Page Template
function generatePageTemplate({
  pageTitle,
  metaDescription,
  cleanPath = '',
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
  const ui = UI_STRINGS[lang] || UI_STRINGS.en;
  const canonicalUrl = getAbsoluteLangUrl(cleanPath, lang);
  const cardsHtml = glyphs.map(g => renderStaticCard(g, lang)).join('\n');

  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url.startsWith('http') ? c.url : getAbsoluteLangUrl(c.url, lang)
    }))
  } : null;

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
    }
  ];

  if (breadcrumbSchema) schemaGraph.push(breadcrumbSchema);
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
          <h2>${lang === 'es' ? 'Preguntas Frecuentes' : lang === 'ja' ? 'よくある質問' : lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
          <p>${lang === 'es' ? 'Respuestas rápidas sobre cómo copiar, compatibilidad y uso en Discord, WhatsApp y videojuegos.' : lang === 'ja' ? 'コピー方法、スマホ対応、Discord・LINEでの使い方に関するQ&Aまとめ。' : lang === 'ko' ? '복사 방법, 모바일 호환성 및 디스코드 활용에 관한 빠른 답변.' : 'Quick answers about copying, compatibility, and using text faces on Discord, TikTok, and mobile.'}</p>
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

  const ogLocale = (lang === 'es' ? 'es_ES' : lang === 'ja' ? 'ja_JP' : lang === 'ko' ? 'ko_KR' : 'en_US');

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
  <link rel="alternate" hreflang="x-default" href="${getAbsoluteLangUrl(cleanPath, 'en')}">
  <link rel="alternate" hreflang="en" href="${getAbsoluteLangUrl(cleanPath, 'en')}">
  <link rel="alternate" hreflang="es" href="${getAbsoluteLangUrl(cleanPath, 'es')}">
  <link rel="alternate" hreflang="ja" href="${getAbsoluteLangUrl(cleanPath, 'ja')}">
  <link rel="alternate" hreflang="ko" href="${getAbsoluteLangUrl(cleanPath, 'ko')}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:locale" content="${ogLocale}">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Favicon & Site Icons -->
  <link rel="icon" type="image/svg+xml" href="${rootPrefix}favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="${rootPrefix}favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="${rootPrefix}favicon-16x16.png">
  <link rel="icon" type="image/x-icon" href="${rootPrefix}favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="${rootPrefix}apple-touch-icon.png">
  <link rel="manifest" href="${rootPrefix}site.webmanifest">
  <meta name="theme-color" content="#10b981">

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
      <a href="${getLangUrl('', lang)}" class="brand-logo" title="${escapeHtml(ui.siteName)} Pro">
        <span class="brand-glyph">( ͡° ͜ʖ ͡°)</span>
        <span>Lenny<span class="highlight">Pro</span></span>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="${getLangUrl('', lang)}#browse">${escapeHtml(ui.navBrowse)}</a></li>
          <li><a href="${getLangUrl('text-faces/', lang)}">${escapeHtml(ui.navTextFaces)}</a></li>
          <li><a href="${getLangUrl('kaomoji/', lang)}">${escapeHtml(ui.navKaomoji)}</a></li>
          <li><a href="${getLangUrl('emoticons/', lang)}">${escapeHtml(ui.navEmoticons)}</a></li>
          <li><a href="${getLangUrl('symbols/', lang)}">${escapeHtml(ui.navSymbols)}</a></li>
          <li><a href="${getLangUrl('aesthetic/', lang)}">${escapeHtml(ui.navAesthetic)}</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <select class="lang-select" id="lang-select" onchange="handleLangSelect(this.value)" aria-label="Select Language">
          <option value="${getLangUrl(cleanPath, 'en')}" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
          <option value="${getLangUrl(cleanPath, 'es')}" ${lang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
          <option value="${getLangUrl(cleanPath, 'ja')}" ${lang === 'ja' ? 'selected' : ''}>🇯🇵 日本語</option>
          <option value="${getLangUrl(cleanPath, 'ko')}" ${lang === 'ko' ? 'selected' : ''}>🇰🇷 한국어</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero" id="browse">
    <div class="container">
      ${renderBreadcrumbs(breadcrumbs, lang)}
      <div class="hero-badge">${escapeHtml(heroBadge)}</div>
      <h1>${h1Text}</h1>
      <p>${escapeHtml(heroSub)}</p>

      <!-- Global Live Search -->
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="${escapeHtml(ui.searchPlaceholder)}" aria-label="Search text faces">
        <button type="button" id="search-clear" class="search-clear-btn" aria-label="Clear Search">✕</button>
      </div>

      <!-- Category Filter Chips with Real Links & Bottom-Left Link Preview -->
      <div class="hubbar" role="group" aria-label="Category Hubs">
        <a href="${getLangUrl('', lang)}" class="hub-chip ${activeHub === 'all' ? 'active' : ''}" data-hub="all">${escapeHtml(ui.hubAll)}</a>
        <button type="button" class="hub-chip ${activeHub === '__favs' ? 'active' : ''}" data-hub="__favs">${escapeHtml(ui.hubFavs)}</button>
        <a href="${getLangUrl('', lang)}#browse" class="hub-chip ${activeHub === 'lenny' ? 'active' : ''}" data-hub="lenny">${escapeHtml(ui.hubLenny)}</a>
        <a href="${getLangUrl('text-faces/', lang)}" class="hub-chip ${activeHub === 'text-faces' ? 'active' : ''}" data-hub="text-faces">${escapeHtml(ui.hubTextFaces)}</a>
        <a href="${getLangUrl('kaomoji/', lang)}" class="hub-chip ${activeHub === 'kaomoji' ? 'active' : ''}" data-hub="kaomoji">${escapeHtml(ui.hubKaomoji)}</a>
        <a href="${getLangUrl('emoticons/', lang)}" class="hub-chip ${activeHub === 'emoticons' ? 'active' : ''}" data-hub="emoticons">${escapeHtml(ui.hubEmoticons)}</a>
        <a href="${getLangUrl('symbols/', lang)}" class="hub-chip ${activeHub === 'symbols' ? 'active' : ''}" data-hub="symbols">${escapeHtml(ui.hubSymbols)}</a>
        <a href="${getLangUrl('aesthetic/', lang)}" class="hub-chip ${activeHub === 'aesthetic' ? 'active' : ''}" data-hub="aesthetic">${escapeHtml(ui.hubAesthetic)}</a>
      </div>

      <!-- Pre-rendered Static Subbars with Real Anchor Links -->
      ${renderAllSubbars(activeHub, activeSub, lang)}

      ${renderShareBar(pageTitle, canonicalUrl, lang)}
    </div>
  </section>

  <!-- Main Grid Section -->
  <main class="container">
    <div class="grid-controls">
      <div class="grid-count">${escapeHtml(ui.showingItems)} <strong>${glyphs.length}</strong> ${escapeHtml(ui.itemsInCategory)}</div>
      <div style="font-size: 0.85rem; color: var(--emerald); font-weight: 700;">${escapeHtml(ui.clickToCopy)}</div>
    </div>

    <!-- Static Pre-rendered Grid (SSR for Instant 100/100 CWV & SEO) -->
    <div class="face-grid" id="face-grid" data-initial-hub="${activeHub}" data-initial-sub="${activeSub}">
${cardsHtml}
    </div>

    ${renderRelatedCategories(relatedCats, lang)}
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
            ${escapeHtml(ui.footerDesc)}
          </p>
        </div>

        <div class="footer-col">
          <h4>${escapeHtml(ui.footerLennyStyles)}</h4>
          <ul>
            <li><a href="${getLangUrl('cute-lenny-face/', lang)}">${lang === 'es' ? 'Caritas Tiernas' : lang === 'ja' ? 'かわいいレニー' : lang === 'ko' ? '귀여운 레니' : 'Cute Lenny Face'}</a></li>
            <li><a href="${getLangUrl('sad-lenny-face/', lang)}">${lang === 'es' ? 'Caritas Tristes' : lang === 'ja' ? '悲しいレニー' : lang === 'ko' ? '슬픈 레니' : 'Sad Lenny Face'}</a></li>
            <li><a href="${getLangUrl('happy-lenny-face/', lang)}">${lang === 'es' ? 'Caritas Felices' : lang === 'ja' ? '笑顔のレニー' : lang === 'ko' ? '행복한 레니' : 'Happy Lenny Face'}</a></li>
            <li><a href="${getLangUrl('angry-lenny-face/', lang)}">${lang === 'es' ? 'Caritas Enojadas' : lang === 'ja' ? '怒るレニー' : lang === 'ko' ? '화난 레니' : 'Angry Lenny Face'}</a></li>
            <li><a href="${getLangUrl('crying-lenny-face/', lang)}">${lang === 'es' ? 'Caritas Llorando' : lang === 'ja' ? '泣くレニー' : lang === 'ko' ? '우는 레니' : 'Crying Lenny Face'}</a></li>
            <li><a href="${getLangUrl('middle-finger/', lang)}">${lang === 'es' ? 'Dedo Medio' : lang === 'ja' ? '中指レニー' : lang === 'ko' ? '손가락 욕 레니' : 'Middle Finger Face'}</a></li>
            <li><a href="${getLangUrl('shrug-lenny-face/', lang)}">${lang === 'es' ? 'Encogerse de Hombros' : lang === 'ja' ? 'やれやれ肩すくめ' : lang === 'ko' ? '어깨 으쓱 레니' : 'Shrug Lenny Face'}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${escapeHtml(ui.footerKaomojiEmoticons)}</h4>
          <ul>
            <li><a href="${getLangUrl('kaomoji/cat/', lang)}">${lang === 'es' ? 'Kaomojis de Gato' : lang === 'ja' ? '猫の顔文字' : lang === 'ko' ? '고양이 카오모지' : 'Cat Kaomoji'}</a></li>
            <li><a href="${getLangUrl('kaomoji/hug/', lang)}">${lang === 'es' ? 'Kaomojis de Abrazo' : lang === 'ja' ? '抱擁の顔文字' : lang === 'ko' ? '포옹 카오모지' : 'Hug Kaomoji'}</a></li>
            <li><a href="${getLangUrl('kaomoji/heart/', lang)}">${lang === 'es' ? 'Kaomojis con Corazón' : lang === 'ja' ? 'ハートの顔文字' : lang === 'ko' ? '하트 카오모지' : 'Heart Kaomoji'}</a></li>
            <li><a href="${getLangUrl('emoticons/smiley/', lang)}">${lang === 'es' ? 'Emoticones Sonrientes' : lang === 'ja' ? 'スマイリー絵文字' : lang === 'ko' ? '스마일리 이모티콘' : 'Smiley Emoticons'}</a></li>
            <li><a href="${getLangUrl('text-faces/donger/', lang)}">${lang === 'es' ? 'Caritas Donger' : lang === 'ja' ? 'ドンガー顔文字' : lang === 'ko' ? '동거 이모티콘' : 'Donger Faces'}</a></li>
            <li><a href="${getLangUrl('text-faces/table-flipping/', lang)}">${lang === 'es' ? 'Voltear Mesa' : lang === 'ja' ? 'ちゃぶ台返し' : lang === 'ko' ? '밥상 뒤집기' : 'Table Flip Faces'}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${escapeHtml(ui.footerSymbolsAesthetic)}</h4>
          <ul>
            <li><a href="${getLangUrl('symbols/heart/', lang)}">${lang === 'es' ? 'Símbolos de Corazón' : lang === 'ja' ? 'ハート記号' : lang === 'ko' ? '하트 특수문자' : 'Heart Symbols'}</a></li>
            <li><a href="${getLangUrl('symbols/sparkle/', lang)}">${lang === 'es' ? 'Símbolos de Brillo' : lang === 'ja' ? 'キラキラ記号' : lang === 'ko' ? '반짝이 특수문자' : 'Sparkle Symbols'}</a></li>
            <li><a href="${getLangUrl('aesthetic/discord-bio/', lang)}">${lang === 'es' ? 'Biografías Discord' : lang === 'ja' ? 'Discord用バイオ' : lang === 'ko' ? '디스코드 소개글' : 'Discord Bios'}</a></li>
            <li><a href="${getLangUrl('aesthetic/dividers/', lang)}">${lang === 'es' ? 'Separadores Estéticos' : lang === 'ja' ? 'おしゃれ飾り罫線' : lang === 'ko' ? '감성 구분선' : 'Aesthetic Dividers'}</a></li>
            <li><a href="${rootPrefix}sitemap.xml">XML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Lenny Face Pro. ${escapeHtml(ui.allRightsReserved)}</p>
        <p><a href="${getLangUrl('privacy.html', lang)}">${escapeHtml(ui.privacy)}</a> | <a href="${getLangUrl('terms.html', lang)}">${escapeHtml(ui.terms)}</a> | <a href="${getLangUrl('about.html', lang)}">${escapeHtml(ui.about)}</a></p>
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
// BUILD FUNCTIONS
// ----------------------------------------------------

// 1. Build Homepages (/, /es/, /jp/, /kr/)
function buildHomePage() {
  console.log('Building Multilingual Homepages...');

  for (const langObj of LANGUAGES) {
    const lang = langObj.code;
    const isEn = (lang === 'en');
    const outDir = langObj.dir ? path.join(ROOT_DIR, langObj.dir) : ROOT_DIR;
    ensureDir(outDir);

    const outPath = path.join(outDir, 'index.html');
    const rootPrefix = calculateRootPrefix(outPath);

    let pageTitle, metaDescription, h1Text, heroSub, heroBadge, editorialHtml, faqList;

    if (isEn) {
      pageTitle = 'Lenny Face ( ͡° ͜ʖ ͡°) — 1-Click Copy and Paste Text Faces, Kaomoji & Emoticons';
      metaDescription = 'Copy and paste Lenny Face ( ͡° ͜ʖ ͡°), text faces, Japanese kaomojis, and aesthetic symbols in 1-click. Free Unicode generator with cute, angry, sad, and custom styles.';
      h1Text = 'Lenny Face Pro <span>( ͡° ͜ʖ ͡°)</span>';
      heroSub = 'Click any face card to copy directly to your clipboard. Instant Unicode text emoticons for Discord, TikTok, Roblox, and gaming.';
      heroBadge = '⚡ 1-Click Copy • Unicode Compatible';
      editorialHtml = `
        <h2>The Complete Guide to Lenny Face ( ͡° ͜ʖ ͡°) &amp; Unicode Emoticons</h2>
        <p>Born on internet imageboards in November 2012, the <strong>Lenny Face ( ͡° ͜ʖ ͡°)</strong>—often called "Deg Deg" or "Le Lenny Face"—has become one of the most recognizable typographic memes in digital history. Created using exotic international Unicode characters, it expresses mischievous innuendo, playful skepticism, or knowing sarcasm without uttering a single word.</p>

        <h3>Why Text Faces Outperform Standard Emojis</h3>
        <p>While standard graphical emojis like 😉 or 😏 render differently across Apple, Google, and Samsung devices, text faces constructed with Unicode characters look 100% consistent across all platforms. Whether you paste them into Discord channels, Twitch chat, Minecraft servers, or social media bios, they preserve their exact aesthetic and ironic nuance.</p>

        <h3>Key Emoticon Categories</h3>
        <ul>
          <li><strong>Lenny Face Variants:</strong> Cute <code>( ͜° ͜ʊ ͜°)</code>, angry boxer <code>(ง ͠° ͟ل͜ ͡°)ง</code>, weeping <code>( ͡ಥ ͜ʖ ͡ಥ)</code>, and shrugs <code>¯\\_( ͡° ͜ʖ ͡°)_/¯</code>.</li>
          <li><strong>Japanese Kaomoji:</strong> Delicate anime expressions, playful cats <code>/ᐠ｡ꞈ｡ᐟ\\</code>, and sweet smiles <code>( ˶ˆ꒳ˆ˵ )</code>.</li>
          <li><strong>Text Faces &amp; Dongers:</strong> Table flippers <code>(╯°□°)╯︵ ┻━┻</code>, disapproval stares <code>ಠ_ಠ</code>, and Twitch fight faces.</li>
          <li><strong>Aesthetic Symbols:</strong> Sparkles <code>✦</code>, stars <code>★</code>, and hearts <code>♡</code> for social profiles.</li>
        </ul>

        <h3>How to Copy in 1-Click</h3>
        <p>Click or tap any card in our directory to copy it directly to your clipboard. Paste anywhere using <kbd>Ctrl</kbd> + <kbd>V</kbd> (Windows) or <kbd>Cmd</kbd> + <kbd>V</kbd> (Mac).</p>
      `;
      faqList = [
        { q: "What does the Lenny Face ( ͡° ͜ʖ ͡°) mean?", a: "The Lenny Face represents a cheeky, knowing smirk suggesting innuendo, sarcasm, or mischievous humor ('if you know what I mean')." },
        { q: "How do I type the Lenny Face on a keyboard?", a: "Because it requires combining Unicode characters (like degree signs and Bengali diacritics), typing it manually is difficult. Using our 1-click copy tool is the fastest and most reliable method." },
        { q: "Does this work on mobile (iOS / Android) and Discord?", a: "Yes! All symbols in our master dataset are standard Unicode UTF-8 glyphs, rendering crisply on iPhones, Android devices, Discord, TikTok, and gaming chats." }
      ];
    } else {
      const i18n = HOMEPAGE_I18N[lang];
      pageTitle = i18n.title;
      metaDescription = i18n.description;
      h1Text = i18n.h1;
      heroSub = i18n.heroSub;
      heroBadge = i18n.heroBadge || '⚡ 1-Click Copy • Unicode Compatible';
      editorialHtml = i18n.editorialHtml;
      faqList = i18n.faqList;
    }

    const html = generatePageTemplate({
      pageTitle,
      metaDescription,
      cleanPath: '',
      rootPrefix,
      breadcrumbs: [],
      heroBadge,
      h1Text,
      heroSub,
      activeHub: 'all',
      activeSub: 'all',
      glyphs: ALL_GLYPHS,
      editorialHtml,
      faqList,
      relatedCats: [
        { name: lang === 'es' ? 'Caritas Tiernas' : lang === 'ja' ? 'かわいいレニー' : lang === 'ko' ? '귀여운 레니' : 'Cute Lenny Face', url: 'cute-lenny-face/', sample: '( ͜° ͜ʊ ͜°)' },
        { name: lang === 'es' ? 'Caritas Enojadas' : lang === 'ja' ? '怒るレニー' : lang === 'ko' ? '화난 레니' : 'Angry Lenny Face', url: 'angry-lenny-face/', sample: '(ง ͠° ͟ل͜ ͡°)ง' },
        { name: lang === 'es' ? 'Kaomojis de Gato' : lang === 'ja' ? '猫の顔文字' : lang === 'ko' ? '고양이 카오모지' : 'Cat Kaomoji', url: 'kaomoji/cat/', sample: '/ᐠ｡ꞈ｡ᐟ\\' },
        { name: lang === 'es' ? 'Caras de Lucha' : lang === 'ja' ? '戦う顔文字' : lang === 'ko' ? '싸움 얼굴' : 'Fighting Faces', url: 'text-faces/fight/', sample: "(ง'̀-'́)ง" }
      ],
      lang
    });

    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  ✓ Generated Homepage: ${langObj.dir ? langObj.dir + '/' : ''}index.html`);
  }
}

// 2. Build Lenny Subpages across all 4 languages (17 subpages x 4 languages)
function buildLennySubpages() {
  console.log('Building Lenny Subpages across all languages...');

  for (const langObj of LANGUAGES) {
    const lang = langObj.code;
    const isEn = (lang === 'en');
    const baseDir = langObj.dir ? path.join(ROOT_DIR, langObj.dir) : ROOT_DIR;
    ensureDir(baseDir);

    for (const p of LENNY_SUBPAGES) {
      const glyphs = ALL_GLYPHS.filter(g => g.sub === p.sub || (g.hub === 'lenny' && g.sub === p.sub));
      const cleanSlug = p.slug.replace(/\.html$/, '');
      const cleanPath = `${cleanSlug}/`;

      let pageTitle, metaDescription, h1Text, heroSub, editorialHtml, faqList, relatedCats, pageName;

      if (isEn) {
        const custom = CUSTOM_SUBPAGE_CONTENT[cleanSlug];
        pageTitle = custom ? custom.pageTitle : p.title;
        metaDescription = custom ? custom.metaDescription : p.description;
        h1Text = custom ? custom.h1Text : p.h1;
        heroSub = custom ? custom.heroSub : p.heroSub;
        editorialHtml = custom ? custom.editorialHtml : p.editorial;
        faqList = custom ? custom.faqList : p.faqs;
        relatedCats = custom ? custom.relatedCats : p.related;
        pageName = p.h1.replace(/<[^>]*>?/gm, '').trim();
      } else {
        const i18n = (LENNY_SUBPAGES_I18N[p.sub] && LENNY_SUBPAGES_I18N[p.sub][lang]) || {};
        pageName = i18n.name || p.h1.replace(/<[^>]*>?/gm, '').trim();
        pageTitle = i18n.title || `${pageName} — Copy & Paste`;
        metaDescription = i18n.description || `Copy and paste ${pageName} in 1-click. Free Unicode text emoticons.`;
        h1Text = i18n.h1 || p.h1;
        heroSub = i18n.heroSub || p.heroSub;
        editorialHtml = getLocalizedEditorial(pageName, glyphs[0] ? glyphs[0].glyph : '', lang);
        faqList = getLocalizedFaqs(pageName, glyphs[0] ? glyphs[0].glyph : '', lang);
        relatedCats = (p.related || []).map(r => ({
          name: r.name,
          url: r.url.replace(/\.html$/, '') + '/',
          sample: r.sample
        }));
      }

      const ui = UI_STRINGS[lang] || UI_STRINGS.en;

      // 1. Direct .html file (e.g. es/angry-lenny-face.html)
      const directHtmlPath = path.join(baseDir, `${cleanSlug}.html`);
      const directRootPrefix = calculateRootPrefix(directHtmlPath);
      const directBreadcrumbs = [
        { name: ui.hubAll, url: '' },
        { name: ui.hubLenny, url: '#browse' },
        { name: pageName, url: cleanPath }
      ];

      const directHtml = generatePageTemplate({
        pageTitle,
        metaDescription,
        cleanPath,
        rootPrefix: directRootPrefix,
        breadcrumbs: directBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • 100/100 PageSpeed',
        h1Text,
        heroSub,
        activeHub: 'lenny',
        activeSub: p.sub,
        glyphs: glyphs.length > 0 ? glyphs : ALL_GLYPHS.slice(0, 15),
        editorialHtml,
        faqList,
        relatedCats,
        lang
      });
      fs.writeFileSync(directHtmlPath, directHtml, 'utf8');

      // 2. Clean Directory URL (e.g. es/angry-lenny-face/index.html)
      const cleanSubDir = path.join(baseDir, cleanSlug);
      ensureDir(cleanSubDir);
      const cleanHtmlPath = path.join(cleanSubDir, 'index.html');
      const cleanRootPrefix = calculateRootPrefix(cleanHtmlPath);

      const cleanBreadcrumbs = [
        { name: ui.hubAll, url: '' },
        { name: ui.hubLenny, url: '#browse' },
        { name: pageName, url: cleanPath }
      ];

      const cleanHtml = generatePageTemplate({
        pageTitle,
        metaDescription,
        cleanPath,
        rootPrefix: cleanRootPrefix,
        breadcrumbs: cleanBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • 100/100 PageSpeed',
        h1Text,
        heroSub,
        activeHub: 'lenny',
        activeSub: p.sub,
        glyphs: glyphs.length > 0 ? glyphs : ALL_GLYPHS.slice(0, 15),
        editorialHtml,
        faqList,
        relatedCats,
        lang
      });
      fs.writeFileSync(cleanHtmlPath, cleanHtml, 'utf8');
    }
    console.log(`  ✓ Built 17 Lenny subpages for language: ${lang}`);
  }
}

// 3. Build Hub Category Pages & All Subpages across 4 languages
function buildHubPages() {
  console.log('Building Hub Pages and Subpages across all languages...');

  // The 5 Hub Categories and their Subcategories
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

  for (const langObj of LANGUAGES) {
    const lang = langObj.code;
    const isEn = (lang === 'en');
    const baseDir = langObj.dir ? path.join(ROOT_DIR, langObj.dir) : ROOT_DIR;
    ensureDir(baseDir);
    const ui = UI_STRINGS[lang] || UI_STRINGS.en;

    for (const hubInfo of hubs) {
      const hubDir = path.join(baseDir, hubInfo.dir);
      ensureDir(hubDir);
      const hubCleanPath = `${hubInfo.dir}/`;

      // 1. Build Hub Index Page (e.g. /text-faces/index.html, /es/text-faces/index.html)
      const hubGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub);

      let hubTitle, hubDesc, hubH1, hubHeroSub, hubEditorial, hubFaqs, hubName;

      if (isEn) {
        const hubCustom = CUSTOM_HUB_CONTENT[hubInfo.hub];
        hubTitle = hubCustom ? hubCustom.pageTitle : hubInfo.title;
        hubDesc = hubCustom ? hubCustom.metaDescription : hubInfo.description;
        hubH1 = hubCustom ? hubCustom.h1Text : hubInfo.h1;
        hubHeroSub = hubCustom ? hubCustom.heroSub : hubInfo.heroSub;
        hubEditorial = hubCustom ? hubCustom.editorialHtml : `
          <h2>Comprehensive Guide to ${hubInfo.title.split('—')[0].trim()}</h2>
          <p>Welcome to the ultimate directory of <strong>${hubInfo.title.split('—')[0].trim()}</strong>. Whether you are styling your Discord profile bio, commenting on viral TikTok videos, or chatting in Twitch streams, our curated collection delivers zero-lag, instant 1-click clipboard copying across all operating systems.</p>
        `;
        hubFaqs = hubCustom ? hubCustom.faqList : [
          { q: `How do I copy these ${hubInfo.title.split('—')[0].trim()}?`, a: "Simply tap or click any card box on this page to copy directly to your clipboard. A toast notification will verify the copy." },
          { q: "Are these characters compatible on iPhone and Android?", a: "Yes! All characters use universal Unicode standards, ensuring flawless rendering on iOS, Android, macOS, Windows, and Linux." }
        ];
        hubName = hubInfo.title.split('—')[0].trim();
      } else {
        const i18n = (HUBS_I18N[hubInfo.dir] && HUBS_I18N[hubInfo.dir][lang]) || {};
        hubName = i18n.name || hubInfo.title.split('—')[0].trim();
        hubTitle = i18n.title || `${hubName} — Copy & Paste`;
        hubDesc = i18n.description || `Copy and paste ${hubName} in 1-click.`;
        hubH1 = i18n.h1 || hubInfo.h1;
        hubHeroSub = i18n.heroSub || hubInfo.heroSub;
        hubEditorial = getLocalizedEditorial(hubName, hubGlyphs[0] ? hubGlyphs[0].glyph : '', lang);
        hubFaqs = getLocalizedFaqs(hubName, hubGlyphs[0] ? hubGlyphs[0].glyph : '', lang);
      }

      const hubBreadcrumbs = [
        { name: ui.hubAll, url: '' },
        { name: hubName, url: hubCleanPath }
      ];

      const relatedCatCards = hubInfo.subpages.map(s => {
        const subKey = `${hubInfo.dir}/${s.sub}`;
        const subI18n = (!isEn && SUBPAGES_I18N[subKey] && SUBPAGES_I18N[subKey][lang]) ? SUBPAGES_I18N[subKey][lang] : null;
        return {
          name: subI18n ? subI18n.name : s.name,
          url: `${hubInfo.dir}/${s.sub}/`,
          sample: s.sample,
          count: 'Explore'
        };
      });

      const hubHtmlPath = path.join(hubDir, 'index.html');
      const hubRootPrefix = calculateRootPrefix(hubHtmlPath);

      const hubHtml = generatePageTemplate({
        pageTitle: hubTitle,
        metaDescription: hubDesc,
        cleanPath: hubCleanPath,
        rootPrefix: hubRootPrefix,
        breadcrumbs: hubBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • 1,000+ Items',
        h1Text: hubH1,
        heroSub: hubHeroSub,
        activeHub: hubInfo.hub,
        activeSub: 'all',
        glyphs: hubGlyphs,
        editorialHtml: hubEditorial,
        faqList: hubFaqs,
        relatedCats: relatedCatCards,
        lang
      });
      fs.writeFileSync(hubHtmlPath, hubHtml, 'utf8');

      // 2. Build Subpages within this Hub (e.g. /text-faces/fight/index.html and .html)
      for (const sub of hubInfo.subpages) {
        const subGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub && g.sub === sub.sub);
        const subCleanPath = `${hubInfo.dir}/${sub.sub}/`;
        const subCustomKey = `${hubInfo.dir}/${sub.sub}`;

        let subPageTitle, subMetaDesc, subH1, subHeroSub, subEditorial, subFaqList, subName;

        if (isEn) {
          const custom = CUSTOM_SUBPAGE_CONTENT[subCustomKey];
          subPageTitle = custom ? custom.pageTitle : `${sub.name} ${sub.sample} — 1-Click Copy and Paste`;
          subMetaDesc = custom ? custom.metaDescription : `Copy and paste ${sub.name} ${sub.sample} in 1-click. Free Unicode emoticons and text faces for Discord, TikTok, Roblox, and gaming.`;
          subH1 = custom ? custom.h1Text : `${sub.name} <span>${sub.sample}</span>`;
          subHeroSub = custom ? custom.heroSub : `Browse our curated collection of ${sub.name.toLowerCase()} for profiles, bios, and chat.`;
          subEditorial = custom ? custom.editorialHtml : `
            <h2>All About ${sub.name} ${sub.sample}</h2>
            <p>The <strong>${sub.name}</strong> collection offers expressive typographical art using international Unicode and special characters. Ideal for standing out on gaming servers, personal bios, and social media captions.</p>
          `;
          subFaqList = custom ? custom.faqList : [
            { q: `What is the most popular ${sub.name.toLowerCase()}?`, a: `The most iconic symbol in this category is ${sub.sample}, widely recognized across internet culture.` },
            { q: "Can I use these symbols in my bio?", a: "Yes, these characters are 100% compliant with Instagram, TikTok, Twitter, and Discord bio formatting rules." }
          ];
          subName = sub.name;
        } else {
          const i18n = (SUBPAGES_I18N[subCustomKey] && SUBPAGES_I18N[subCustomKey][lang]) || {};
          subName = i18n.name || sub.name;
          subPageTitle = i18n.title || `${subName} ${sub.sample} — 1-Click Copy`;
          subMetaDesc = `Copy and paste ${subName} ${sub.sample} in 1-click. Unicode text emoticons.`;
          subH1 = `${subName} <span>${sub.sample}</span>`;
          subHeroSub = `Colección de ${subName} para perfiles, bios y chats.`;
          subEditorial = getLocalizedEditorial(subName, sub.sample, lang);
          subFaqList = getLocalizedFaqs(subName, sub.sample, lang);
        }

        const subBreadcrumbs = [
          { name: ui.hubAll, url: '' },
          { name: hubName, url: hubCleanPath },
          { name: subName, url: subCleanPath }
        ];

        const subRelatedCats = relatedCatCards.filter(r => !r.url.endsWith(`${sub.sub}/`)).slice(0, 6);

        // a) Direct .html file (e.g. es/text-faces/fight.html)
        const subDirectHtmlPath = path.join(hubDir, `${sub.sub}.html`);
        const subDirectRootPrefix = calculateRootPrefix(subDirectHtmlPath);

        const subDirectHtml = generatePageTemplate({
          pageTitle: subPageTitle,
          metaDescription: subMetaDesc,
          cleanPath: subCleanPath,
          rootPrefix: subDirectRootPrefix,
          breadcrumbs: subBreadcrumbs,
          heroBadge: '⚡ 1-Click Copy • Unicode Compatible',
          h1Text: subH1,
          heroSub: subHeroSub,
          activeHub: hubInfo.hub,
          activeSub: sub.sub,
          glyphs: subGlyphs.length > 0 ? subGlyphs : hubGlyphs.slice(0, 12),
          editorialHtml: subEditorial,
          faqList: subFaqList,
          relatedCats: subRelatedCats,
          lang
        });
        fs.writeFileSync(subDirectHtmlPath, subDirectHtml, 'utf8');

        // b) Clean Directory URL (e.g. es/text-faces/fight/index.html)
        const subCleanDir = path.join(hubDir, sub.sub);
        ensureDir(subCleanDir);
        const subCleanHtmlPath = path.join(subCleanDir, 'index.html');
        const subCleanRootPrefix = calculateRootPrefix(subCleanHtmlPath);

        const subCleanHtml = generatePageTemplate({
          pageTitle: subPageTitle,
          metaDescription: subMetaDesc,
          cleanPath: subCleanPath,
          rootPrefix: subCleanRootPrefix,
          breadcrumbs: subBreadcrumbs,
          heroBadge: '⚡ 1-Click Copy • Unicode Compatible',
          h1Text: subH1,
          heroSub: subHeroSub,
          activeHub: hubInfo.hub,
          activeSub: sub.sub,
          glyphs: subGlyphs.length > 0 ? subGlyphs : hubGlyphs.slice(0, 12),
          editorialHtml: subEditorial,
          faqList: subFaqList,
          relatedCats: subRelatedCats,
          lang
        });
        fs.writeFileSync(subCleanHtmlPath, subCleanHtml, 'utf8');
      }
    }
    console.log(`  ✓ Built 5 Hubs and 68 Subpages for language: ${lang}`);
  }
}

// 4. Build Informational Pages (About, Privacy, Terms) across all 4 languages
function buildInfoPages() {
  console.log('Building Informational Pages across all languages...');

  const infoContent = {
    'about.html': {
      en: {
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
      es: {
        title: 'Sobre Nosotros — Caritas Lenny Pro',
        description: 'Conoce la misión de Caritas Lenny Pro, nuestro compromiso con 100/100 Core Web Vitals y nuestro directorio de emoticones Unicode.',
        h1: 'Sobre <span>Caritas Lenny Pro</span>',
        content: `
          <h2>Nuestra Misión</h2>
          <p>Caritas Lenny Pro fue creado con una premisa simple: las herramientas web deben ser rápidas, limpias y agradables de usar. Ofrecemos una experiencia instantánea con puntuación 100/100 en Google PageSpeed.</p>
          <h3>Compatibilidad Unicode Universal</h3>
          <p>Cada símbolo es compatible con WhatsApp, Discord, TikTok, Instagram y cualquier dispositivo móvil o PC sin fuentes adicionales.</p>
        `
      },
      ja: {
        title: '当サイトについて — レニーフェイス Pro',
        description: 'レニーフェイス Pro の運営方針、完全無料の顔文字・アスキーアートまとめ、Unicode互換性へのこだわり。',
        h1: '当サイトについて <span>( ͡° ͜ʖ ͡°)</span>',
        content: `
          <h2>私たちの想い</h2>
          <p>レニーフェイス Pro は、広告だらけで重い従来の顔文字サイトとは異なり、圧倒的な表示速度（PageSpeed 100点満点）とワンクリックでの簡単コピーを実現するために制作されました。</p>
          <h3>文字化けゼロへの取り組み</h3>
          <p>iPhone、Android、Windows、Macのあらゆる環境で正しく表示されるよう、国際規格Unicodeに準拠した文字のみを厳選しています。</p>
        `
      },
      ko: {
        title: '사이트 소개 — 레니페이스 Pro',
        description: '레니페이스 Pro의 철학, 100/100 페이지스피드 최적화 및 유니코드 텍스트 이모티콘 모음집 안내.',
        h1: '사이트 소개 <span>( ͡° ͜ʖ ͡°)</span>',
        content: `
          <h2>우리의 목표</h2>
          <p>레니페이스 Pro는 복잡하고 느린 웹사이트 대신, 군더더기 없는 초고속 원클릭 복사 경험을 제공하기 위해 구축되었습니다.</p>
          <h3>유니코드 완벽 호환</h3>
          <p>디스코드, 인스타그램, 롤 채팅 등 모든 최신 환경에서 깨짐 없이 표시되는 표준 텍스트 기호만을 제공합니다.</p>
        `
      }
    },
    'privacy.html': {
      en: {
        title: 'Privacy Policy — Lenny Face Pro',
        description: 'Lenny Face Pro Privacy Policy: We do not store personal data or track private chat information.',
        h1: 'Privacy <span>Policy</span>',
        content: `
          <h2>Your Privacy Matters</h2>
          <p>Lenny Face Pro does not collect personally identifiable information. We do not require account registration, passwords, or personal email addresses to use our 1-click copy tools and generators.</p>
          <h3>Local Storage</h3>
          <p>Your favorite emoticons and selected theme preference are saved locally on your own device using browser <code>localStorage</code>. This data never leaves your device and is never transmitted to any external servers.</p>
        `
      },
      es: {
        title: 'Política de Privacidad — Caritas Lenny Pro',
        description: 'Política de Privacidad de Caritas Lenny Pro: no almacenamos datos personales ni rastreamos tus conversaciones.',
        h1: 'Política de <span>Privacidad</span>',
        content: `
          <h2>Tu Privacidad es Nuestra Prioridad</h2>
          <p>No recopilamos información personal identificable. No solicitamos registros ni contraseñas para copiar caritas.</p>
          <h3>Almacenamiento Local (localStorage)</h3>
          <p>Tus caritas favoritas se guardan únicamente en la memoria local de tu propio navegador y nunca se envían a servidores externos.</p>
        `
      },
      ja: {
        title: 'プライバシーポリシー — レニーフェイス Pro',
        description: 'レニーフェイス Proのプライバシーポリシー：個人情報の取得やチャット内容の収集は一切行いません。',
        h1: 'プライバシー<span>ポリシー</span>',
        content: `
          <h2>プライバシーの保護について</h2>
          <p>当サイトではユーザーの個人情報を取得・保存・追跡することはありません。アカウント登録も不要です。</p>
          <h3>ローカルストレージの利用</h3>
          <p>お気に入りに追加された顔文字は、お使いの端末のブラウザ内（localStorage）にのみ保存され、外部サーバーに送信されることはありません。</p>
        `
      },
      ko: {
        title: '개인정보처리방침 — 레니페이스 Pro',
        description: '레니페이스 Pro 개인정보처리방침: 개인정보를 수집하거나 채팅 데이터를 추적하지 않습니다.',
        h1: '개인정보<span>처리방침</span>',
        content: `
          <h2>이용자의 개인정보 보호</h2>
          <p>레니페이스 Pro는 회원가입 없이 누구나 자유롭게 이용할 수 있으며, 어떠한 개인 식별 정보도 수집하지 않습니다.</p>
          <h3>로컬 저장소 안내</h3>
          <p>즐겨찾기 목록은 사용자의 웹 브라우저(localStorage)에만 안전하게 보관되며 외부 서버로 전송되지 않습니다.</p>
        `
      }
    },
    'terms.html': {
      en: {
        title: 'Terms of Service — Lenny Face Pro',
        description: 'Terms of Service for using Lenny Face Pro tools and text face collections.',
        h1: 'Terms of <span>Service</span>',
        content: `
          <h2>Usage Agreement</h2>
          <p>By accessing and utilizing Lenny Face Pro, you agree to use our free text generator and copying tools for personal, creative, and commercial communications in compliance with applicable laws.</p>
          <p>All Unicode characters and ASCII art combinations are provided free of charge for community expression across social networks and digital platforms.</p>
        `
      },
      es: {
        title: 'Términos de Servicio — Caritas Lenny Pro',
        description: 'Términos de servicio para el uso de herramientas y caritas de texto de Caritas Lenny Pro.',
        h1: 'Términos de <span>Servicio</span>',
        content: `
          <h2>Acuerdo de Uso</h2>
          <p>Todas las caritas, símbolos y arte ASCII están disponibles de forma 100% gratuita para comunicaciones personales y creativas en redes sociales y juegos.</p>
        `
      },
      ja: {
        title: '利用規約 — レニーフェイス Pro',
        description: 'レニーフェイス Pro のテキスト顔文字およびツールの利用規約。',
        h1: '利用<span>規約</span>',
        content: `
          <h2>ご利用条件</h2>
          <p>当サイトで提供しているすべての顔文字や特殊文字は、個人利用・SNSでのやり取り・ゲームチャットなどにおいて完全無料でご自由にお使いいただけます。</p>
        `
      },
      ko: {
        title: '이용약관 — 레니페이스 Pro',
        description: '레니페이스 Pro 텍스트 이모티콘 및 생성기 도구 이용약관.',
        h1: '이용<span>약관</span>',
        content: `
          <h2>서비스 이용 규정</h2>
          <p>본 사이트의 모든 텍스트 이모티콘 및 특수문자는 개인적, 창작적 커뮤니케이션 목적으로 누구나 무료로 자유롭게 사용할 수 있습니다.</p>
        `
      }
    }
  };

  for (const langObj of LANGUAGES) {
    const lang = langObj.code;
    const baseDir = langObj.dir ? path.join(ROOT_DIR, langObj.dir) : ROOT_DIR;
    ensureDir(baseDir);
    const ui = UI_STRINGS[lang] || UI_STRINGS.en;

    for (const slug of ['about.html', 'privacy.html', 'terms.html']) {
      const data = infoContent[slug][lang] || infoContent[slug].en;
      const outPath = path.join(baseDir, slug);
      const rootPrefix = calculateRootPrefix(outPath);

      const html = generatePageTemplate({
        pageTitle: data.title,
        metaDescription: data.description,
        cleanPath: slug,
        rootPrefix,
        breadcrumbs: [
          { name: ui.hubAll, url: '' },
          { name: data.title.split('—')[0].trim(), url: slug }
        ],
        heroBadge: 'ℹ️ Information & Transparency',
        h1Text: data.h1,
        heroSub: 'Learn more about our platform standards, security, and privacy commitments.',
        activeHub: 'all',
        activeSub: 'all',
        glyphs: [],
        editorialHtml: data.content,
        faqList: [],
        relatedCats: [],
        lang
      });

      fs.writeFileSync(outPath, html, 'utf8');
    }
    console.log(`  ✓ Built Informational pages for language: ${lang}`);
  }
}

// 5. Build XML Sitemap & robots.txt with Multi-Language Hreflang Clusters
function buildSitemapAndRobots() {
  console.log('Building sitemap.xml & robots.txt with full hreflang clusters...');

  const cleanPaths = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    ...LENNY_SUBPAGES.map(p => ({ path: `${p.slug.replace(/\.html$/, '')}/`, priority: '0.9', changefreq: 'weekly' })),
    { path: 'text-faces/', priority: '0.9', changefreq: 'weekly' },
    { path: 'kaomoji/', priority: '0.9', changefreq: 'weekly' },
    { path: 'emoticons/', priority: '0.9', changefreq: 'weekly' },
    { path: 'symbols/', priority: '0.9', changefreq: 'weekly' },
    { path: 'aesthetic/', priority: '0.9', changefreq: 'weekly' },
    { path: 'about.html', priority: '0.5', changefreq: 'monthly' },
    { path: 'privacy.html', priority: '0.3', changefreq: 'yearly' },
    { path: 'terms.html', priority: '0.3', changefreq: 'yearly' }
  ];

  // Add all hub subpages
  const hubFolders = ['text-faces', 'kaomoji', 'emoticons', 'symbols', 'aesthetic'];
  for (const folder of hubFolders) {
    const folderPath = path.join(ROOT_DIR, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith('.html') && file !== 'index.html') {
          const subSlug = file.replace(/\.html$/, '');
          cleanPaths.push({
            path: `${folder}/${subSlug}/`,
            priority: '0.8',
            changefreq: 'weekly'
          });
        }
      }
    }
  }

  const today = new Date().toISOString().split('T')[0];

  // Build <url> entries for each language variant of each clean path
  const urlEntries = [];

  for (const item of cleanPaths) {
    for (const langObj of LANGUAGES) {
      const lang = langObj.code;
      const loc = getAbsoluteLangUrl(item.path, lang);

      const hreflangLinks = LANGUAGES.map(l => {
        return `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${getAbsoluteLangUrl(item.path, l.code)}"/>`;
      });
      // Add x-default pointing to English
      hreflangLinks.unshift(`    <xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteLangUrl(item.path, 'en')}"/>`);

      urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
${hreflangLinks.join('\n')}
  </url>`);
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ✓ Generated: sitemap.xml (${urlEntries.length} total URLs indexed across 4 languages)`);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log('  ✓ Generated: robots.txt');
}

// 6. Update data.js with Master Dataset
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

// Execute All Builders
function buildAll() {
  console.log('🚀 Starting Lenny Face Pro Multilingual Site Builder...');
  updateDataJs();
  buildHomePage();
  buildLennySubpages();
  buildHubPages();
  buildInfoPages();
  buildSitemapAndRobots();
  console.log('🎉 Multilingual site build completed successfully!');
}

buildAll();
