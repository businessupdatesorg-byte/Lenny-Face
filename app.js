/**
 * Lenny Face Pro - Client Application Engine
 * Features: One-Click Copy, Live Generator, Favorites, Search, Multilingual Switcher
 */

// Language switcher handler with preference persistence
window.handleLangSelect = function(url) {
  if (url.includes('/es/')) {
    localStorage.setItem('lenny_lang_pref', 'es');
  } else if (url.includes('/jp/')) {
    localStorage.setItem('lenny_lang_pref', 'ja');
  } else if (url.includes('/kr/')) {
    localStorage.setItem('lenny_lang_pref', 'ko');
  } else {
    localStorage.setItem('lenny_lang_pref', 'en');
  }
  window.location.href = url;
};

// Client-side Geo/Language Detection for first-time visitors on root homepage (Google International SEO compliant)
(function checkGeoLanguage() {
  const path = window.location.pathname;
  const isRoot = (path === '/' || path === '/index.html' || path === '');
  if (!isRoot) return;

  const savedPref = localStorage.getItem('lenny_lang_pref');
  if (savedPref) {
    if (savedPref === 'es') window.location.replace('/es/');
    else if (savedPref === 'ja') window.location.replace('/jp/');
    else if (savedPref === 'ko') window.location.replace('/kr/');
    return;
  }

  // Detect browser language preferences for first-time visitors
  const userLangs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
  for (const l of userLangs) {
    const langLower = (l || '').toLowerCase();
    if (langLower.startsWith('es')) {
      localStorage.setItem('lenny_lang_pref', 'es');
      window.location.replace('/es/');
      break;
    } else if (langLower.startsWith('ja')) {
      localStorage.setItem('lenny_lang_pref', 'ja');
      window.location.replace('/jp/');
      break;
    } else if (langLower.startsWith('ko')) {
      localStorage.setItem('lenny_lang_pref', 'ko');
      window.location.replace('/kr/');
      break;
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Always clean permanent light mode
  document.documentElement.setAttribute('data-theme', 'light');

  const currentLang = document.documentElement.lang || 'en';

  const I18N_RUNTIME = {
    en: {
      copiedBtn: 'Copied! ✔',
      copyBtn: 'Copy',
      copiedToast: (d) => `Copied "${d}" to clipboard!`,
      favAdd: '❤️ Saved to Favorites!',
      favRemove: '🤍 Removed from Favorites',
      showing: 'Showing',
      items: 'items in this category',
      noItemsTitle: 'No matching text faces found',
      noItemsSub: 'Try searching for different keywords or select "All" categories.',
      linkCopied: '🔗 Page link copied to clipboard!',
      shareTitle: 'Share Text Face',
      cancelBtn: 'Cancel',
      favTitleAdd: 'Add to favorites',
      favTitleRemove: 'Remove from favorites',
      shareFaceTitle: 'Share this text face'
    },
    es: {
      copiedBtn: '¡Copiado! ✔',
      copyBtn: 'Copiar',
      copiedToast: (d) => `¡Copiado "${d}" al portapapeles!`,
      favAdd: '❤️ ¡Guardado en Favoritos!',
      favRemove: '🤍 Eliminado de Favoritos',
      showing: 'Mostrando',
      items: 'elementos en esta categoría',
      noItemsTitle: 'No se encontraron caritas coincidentes',
      noItemsSub: 'Prueba a buscar con otras palabras o selecciona "Todas las Caritas".',
      linkCopied: '🔗 ¡Enlace de página copiado al portapapeles!',
      shareTitle: 'Compartir Cara de Texto',
      cancelBtn: 'Cancelar',
      favTitleAdd: 'Añadir a favoritos',
      favTitleRemove: 'Eliminar de favoritos',
      shareFaceTitle: 'Compartir esta carita'
    },
    ja: {
      copiedBtn: 'コピー完了! ✔',
      copyBtn: 'コピー',
      copiedToast: (d) => `"${d}" をクリップボードにコピーしました！`,
      favAdd: '❤️ お気に入りに追加しました！',
      favRemove: '🤍 お気に入りから削除しました',
      showing: '表示中:',
      items: '件の顔文字',
      noItemsTitle: '一致する顔文字が見つかりませんでした',
      noItemsSub: '別のキーワードで検索するか、「すべての顔文字」を選択してください。',
      linkCopied: '🔗 リンクをクリップボードにコピーしました！',
      shareTitle: '顔文字をシェア',
      cancelBtn: '閉じる',
      favTitleAdd: 'お気に入りに追加',
      favTitleRemove: 'お気に入りから削除',
      shareFaceTitle: 'この顔文字をシェア'
    },
    ko: {
      copiedBtn: '복사 완료! ✔',
      copyBtn: '복사',
      copiedToast: (d) => `"${d}" 클립보드에 복사되었습니다!`,
      favAdd: '❤️ 즐겨찾기에 저장되었습니다!',
      favRemove: '🤍 즐겨찾기에서 제거되었습니다',
      showing: '표시 중:',
      items: '개 이모티콘',
      noItemsTitle: '일치하는 텍스트 얼굴이 없습니다',
      noItemsSub: '다른 검색어를 입력하거나 "전체 이모티콘"을 선택해보세요.',
      linkCopied: '🔗 페이지 링크가 클립보드에 복사되었습니다!',
      shareTitle: '텍스트 얼굴 공유하기',
      cancelBtn: '닫기',
      favTitleAdd: '즐겨찾기에 추가',
      favTitleRemove: '즐겨찾기에서 제거',
      shareFaceTitle: '이 텍스트 얼굴 공유하기'
    }
  };

  const ui = I18N_RUNTIME[currentLang] || I18N_RUNTIME.en;

  // Favorites Management
  let favorites = JSON.parse(localStorage.getItem('lenny_favs')) || [];

  function toggleFavorite(glyph) {
    if (favorites.includes(glyph)) {
      favorites = favorites.filter(f => f !== glyph);
    } else {
      favorites.push(glyph);
    }
    localStorage.setItem('lenny_favs', JSON.stringify(favorites));
    renderGlyphGrid();
    showToast(favorites.includes(glyph) ? ui.favAdd : ui.favRemove);
  }

  // Toast System
  const toastContainer = document.getElementById('toast-container');
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2000);
  }

  // Copy to Clipboard with Feedback & Button Highlight
  window.copyGlyph = function(glyph, btnElement) {
    const displayText = glyph.length > 20 ? glyph.substring(0, 18) + '...' : glyph;
    
    // Button visual feedback
    if (btnElement) {
      const origText = btnElement.innerText;
      btnElement.innerText = ui.copiedBtn;
      btnElement.classList.add('copied');
      setTimeout(() => {
        btnElement.innerText = origText;
        btnElement.classList.remove('copied');
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(glyph).then(() => {
        showToast(ui.copiedToast(displayText));
      }).catch(() => {
        fallbackCopy(glyph, displayText);
      });
    } else {
      fallbackCopy(glyph, displayText);
    }
  };

  function fallbackCopy(text, displayText) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(ui.copiedToast(displayText));
  }

  // Social Share: Copy Page Link
  window.copyCurrentUrl = function() {
    const currentUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast(ui.linkCopied);
      });
    } else {
      fallbackCopy(currentUrl, currentUrl);
      showToast(ui.linkCopied);
    }
  };

  // Social Share: Native Mobile Share
  window.sharePage = function(title, text) {
    if (navigator.share) {
      navigator.share({
        title: title || document.title,
        text: text || 'Copy and paste awesome Lenny faces and kaomojis!',
        url: window.location.href
      }).catch(() => {});
    } else {
      window.copyCurrentUrl();
    }
  };

  // Individual Face Sharing
  window.shareGlyph = function(glyph, name) {
    const title = `${name || 'Text Face'} ${glyph}`;
    const text = `Check out this ${name || 'text face'}: ${glyph}`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      }).catch(() => {});
    } else {
      openShareModal(glyph, name);
    }
  };

  function openShareModal(glyph, name) {
    let modalBackdrop = document.getElementById('glyph-share-modal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'glyph-share-modal';
      modalBackdrop.className = 'share-modal-backdrop';
      document.body.appendChild(modalBackdrop);
    }

    const pageUrl = encodeURIComponent(window.location.href);
    const waText = encodeURIComponent(`Check out this ${name || 'text face'}: ${glyph} — ${window.location.href}`);

    modalBackdrop.innerHTML = `
      <div class="share-modal-card" onclick="event.stopPropagation()">
        <div class="share-modal-title">${escapeHtml(ui.shareTitle)}</div>
        <div class="share-modal-sub">${escapeHtml(name || 'Lenny Face')}</div>
        <div class="share-modal-glyph">${escapeHtml(glyph)}</div>
        <div class="share-modal-grid">
          <a href="https://api.whatsapp.com/send?text=${waText}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-whatsapp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.101-.476-.15-.676.15-.201.3-.777.979-.953 1.18-.175.201-.351.226-.652.076-.3-.15-1.27-.468-2.42-1.492-.894-.798-1.498-1.783-1.674-2.083-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.235-.243-.588-.49-.508-.676-.518-.175-.009-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.512s1.079 2.912 1.23 3.112c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.428.25-.702.25-1.303.175-1.428-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.078 6.46 2.078 11.96c0 1.96.57 3.788 1.558 5.332L2 22l4.858-1.594A9.914 9.914 0 0 0 12.04 22c5.5 0 9.962-4.46 9.962-9.96C22.002 6.46 17.54 2 12.04 2z"/></svg>
            <span>WhatsApp</span>
          </a>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(glyph + ' - ' + (name || 'Text Face'))}&url=${pageUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>X / Twitter</span>
          </a>
          <a href="https://t.me/share/url?url=${pageUrl}&text=${encodeURIComponent(glyph + ' ' + (name || 'Text Face'))}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-telegram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            <span>Telegram</span>
          </a>
          <button type="button" class="share-btn share-btn-copylink" onclick="copyGlyph('${escapeHtml(glyph)}'); closeShareModal();">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span>${escapeHtml(ui.copyBtn)} Face</span>
          </button>
        </div>
        <button type="button" class="share-modal-close-btn" onclick="closeShareModal()">${escapeHtml(ui.cancelBtn)}</button>
      </div>
    `;

    modalBackdrop.classList.add('active');
    modalBackdrop.onclick = closeShareModal;
  }

  window.closeShareModal = function() {
    const modalBackdrop = document.getElementById('glyph-share-modal');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  };

  // Grid Rendering & Filtering
  const faceGrid = document.getElementById('face-grid');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear');
  const hubChips = document.querySelectorAll('.hub-chip');
  const subbar = document.getElementById('subbar');

  let activeHub = 'all';
  let activeSub = 'all';
  let searchQuery = '';

  function renderGlyphGrid() {
    if (!faceGrid || typeof GLYPH_DATA === 'undefined') return;

    let filtered = GLYPH_DATA.filter(item => {
      // Hub filter
      if (activeHub === '__favs') {
        if (!favorites.includes(item.glyph)) return false;
      } else if (activeHub !== 'all' && item.hub !== activeHub) {
        return false;
      }

      // Sub filter
      if (activeSub !== 'all' && item.sub !== activeSub) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesGlyph = item.glyph.toLowerCase().includes(query);
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        return matchesGlyph || matchesName || matchesTags;
      }

      return true;
    });

    const gridCountEl = document.querySelector('.grid-count');
    if (gridCountEl) {
      gridCountEl.innerHTML = `${escapeHtml(ui.showing)} <strong>${filtered.length}</strong> ${escapeHtml(ui.items)}`;
    }

    if (filtered.length === 0) {
      faceGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">(ノ_<。)</div>
          <h3>${escapeHtml(ui.noItemsTitle)}</h3>
          <p>${escapeHtml(ui.noItemsSub)}</p>
        </div>
      `;
      return;
    }

    faceGrid.innerHTML = filtered.map(item => {
      const isFav = favorites.includes(item.glyph);
      const badgeHtml = item.badge ? `<span class="face-badge">${item.badge}</span>` : '';

      return `
        <article class="face-card" onclick="copyGlyph('${escapeHtml(item.glyph)}', this.querySelector('.face-copy-btn'))">
          ${badgeHtml}
          <div class="face-glyph-box">
            <span class="face-glyph">${escapeHtml(item.glyph)}</span>
          </div>
          <div class="face-meta">
            <span class="face-tag">${escapeHtml(item.name)}</span>
            <div class="face-actions" onclick="event.stopPropagation()">
              <button type="button" class="face-action-btn ${isFav ? 'is-fav' : ''}" 
                onclick="event.stopPropagation(); toggleFavAction('${escapeHtml(item.glyph)}')" 
                title="${isFav ? ui.favTitleRemove : ui.favTitleAdd}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button type="button" class="face-share-btn" 
                onclick="event.stopPropagation(); shareGlyph('${escapeHtml(item.glyph)}', '${escapeHtml(item.name)}')" 
                title="${escapeHtml(ui.shareFaceTitle)}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <button type="button" class="face-copy-btn" onclick="event.stopPropagation(); copyGlyph('${escapeHtml(item.glyph)}', this)" title="${escapeHtml(ui.copyBtn)}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>${escapeHtml(ui.copyBtn)}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  window.toggleFavAction = function(glyph) {
    toggleFavorite(glyph);
  };

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Hub Category Chips Handling (Instant In-Place Filtering with Native Link Support)
  document.querySelectorAll('.hub-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      // Allow middle click, Ctrl-click, Cmd-click, Shift-click to open in new tab
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

      const targetHub = chip.getAttribute('data-hub');
      if (!targetHub) return;

      e.preventDefault();

      document.querySelectorAll('.hub-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      activeHub = targetHub;
      activeSub = 'all';

      updateSubbarVisibility();
      renderGlyphGrid();
    });
  });

  function updateSubbarVisibility() {
    const allSubbars = document.querySelectorAll('.subbar');
    if (allSubbars.length === 0) return;

    allSubbars.forEach(sb => {
      const group = sb.getAttribute('data-hub-group');
      let shouldShow = false;

      if (activeHub === '__favs') {
        shouldShow = false;
      } else if (activeHub === 'all') {
        shouldShow = (group === 'lenny');
      } else {
        shouldShow = (group === activeHub);
      }

      sb.style.display = shouldShow ? 'flex' : 'none';

      if (shouldShow) {
        sb.querySelectorAll('.sub-chip').forEach(sc => {
          if (sc.getAttribute('data-sub') === 'all') {
            sc.classList.add('active');
          } else {
            sc.classList.remove('active');
          }
        });
      }
    });
  }

  // Sub-category Filter Delegation (In-place filtering on normal left click)
  document.addEventListener('click', (e) => {
    const subChip = e.target.closest('.sub-chip');
    if (!subChip) return;

    // Allow middle click / new tab modifiers
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    const parentSubbar = subChip.closest('.subbar');
    if (parentSubbar) {
      parentSubbar.querySelectorAll('.sub-chip').forEach(sc => sc.classList.remove('active'));
    }
    subChip.classList.add('active');

    activeSub = subChip.getAttribute('data-sub') || 'all';
    renderGlyphGrid();
  });

  // Search Input Handling
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchClearBtn) searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      renderGlyphGrid();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      renderGlyphGrid();
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // Initial Render: Ensure all items are rendered on homepage or when grid is empty
  const initialHub = faceGrid ? faceGrid.getAttribute('data-initial-hub') : null;
  const initialSub = faceGrid ? faceGrid.getAttribute('data-initial-sub') : null;
  if (initialHub) activeHub = initialHub;
  if (initialSub) activeSub = initialSub;

  const isHomeAll = !initialHub || (initialHub === 'all' && (!initialSub || initialSub === 'all'));
  if (faceGrid) {
    if (isHomeAll) {
      if (typeof GLYPH_DATA !== 'undefined' && faceGrid.children.length < GLYPH_DATA.length) {
        renderGlyphGrid();
      }
    } else if (faceGrid.children.length === 0) {
      renderGlyphGrid();
    }
  }
});
