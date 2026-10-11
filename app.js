/**
 * Lenny Face Pro - Client Application Engine
 * Features: One-Click Copy, Live Generator, Favorites, Search & Theme Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('lenny_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lenny_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }

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
    showToast(favorites.includes(glyph) ? '❤️ Saved to Favorites!' : '🤍 Removed from Favorites');
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

  // Copy to Clipboard with Feedback
  window.copyGlyph = function(glyph) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(glyph).then(() => {
        showToast(`Copied "${glyph.length > 20 ? glyph.substring(0, 18) + '...' : glyph}" to clipboard!`);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = glyph;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(`Copied to clipboard!`);
    }
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

    if (filtered.length === 0) {
      faceGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">(ノ_<。)</div>
          <h3>No matching text faces found</h3>
          <p>Try searching for different keywords or select "All" categories.</p>
        </div>
      `;
      return;
    }

    faceGrid.innerHTML = filtered.map(item => {
      const isFav = favorites.includes(item.glyph);
      const badgeHtml = item.badge ? `<span class="face-badge">${item.badge}</span>` : '';

      return `
        <article class="face-card" onclick="copyGlyph('${escapeHtml(item.glyph)}')">
          ${badgeHtml}
          <div class="face-glyph-box">
            <span class="face-glyph">${escapeHtml(item.glyph)}</span>
          </div>
          <div class="face-meta">
            <span class="face-tag">${escapeHtml(item.name)}</span>
            <div class="face-actions" onclick="event.stopPropagation()">
              <button type="button" class="face-action-btn ${isFav ? 'is-fav' : ''}" 
                onclick="event.stopPropagation(); toggleFavAction('${escapeHtml(item.glyph)}')" 
                title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                ${isFav ? '❤️' : '🤍'}
              </button>
              <button type="button" class="face-copy-btn" onclick="event.stopPropagation(); copyGlyph('${escapeHtml(item.glyph)}')">
                Copy
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

  // Hub Category Chips Handling
  hubChips.forEach(chip => {
    chip.addEventListener('click', () => {
      hubChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeHub = chip.getAttribute('data-hub');
      activeSub = 'all';
      updateSubbar();
      renderGlyphGrid();
    });
  });

  function updateSubbar() {
    if (!subbar || typeof GLYPH_DATA === 'undefined') return;

    if (activeHub === 'all' || activeHub === '__favs') {
      subbar.style.display = 'none';
      return;
    }

    // Get unique subs for active hub
    const hubItems = GLYPH_DATA.filter(i => i.hub === activeHub);
    const uniqueSubs = Array.from(new Set(hubItems.map(i => i.sub)));

    if (uniqueSubs.length <= 1) {
      subbar.style.display = 'none';
      return;
    }

    subbar.style.display = 'flex';
    subbar.innerHTML = `
      <button type="button" class="sub-chip ${activeSub === 'all' ? 'active' : ''}" data-sub="all">All ${activeHub}</button>
      ${uniqueSubs.map(sub => `
        <button type="button" class="sub-chip ${activeSub === sub ? 'active' : ''}" data-sub="${sub}">
          ${sub.replace('-', ' ')}
        </button>
      `).join('')}
    `;

    subbar.querySelectorAll('.sub-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        subbar.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSub = btn.getAttribute('data-sub');
        renderGlyphGrid();
      });
    });
  }

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

  // Interactive Custom Lenny Face Generator / Maker
  const genPreview = document.getElementById('gen-preview');
  const selArmsLeft = document.getElementById('sel-arms-left');
  const selEyes = document.getElementById('sel-eyes');
  const selMouth = document.getElementById('sel-mouth');
  const selArmsRight = document.getElementById('sel-arms-right');
  const btnCopyGen = document.getElementById('btn-copy-gen');
  const btnRandomGen = document.getElementById('btn-random-gen');

  function updateGeneratorPreview() {
    if (!genPreview || !selArmsLeft || !selEyes || !selMouth || !selArmsRight) return;
    const aL = selArmsLeft.value;
    const eye = selEyes.value;
    const mouth = selMouth.value;
    const aR = selArmsRight.value;

    const fullGlyph = `${aL}( ${eye} ${mouth} ${eye} )${aR}`;
    genPreview.innerText = fullGlyph;
  }

  [selArmsLeft, selEyes, selMouth, selArmsRight].forEach(el => {
    if (el) el.addEventListener('change', updateGeneratorPreview);
  });

  if (btnCopyGen) {
    btnCopyGen.addEventListener('click', () => {
      if (genPreview) copyGlyph(genPreview.innerText);
    });
  }

  if (btnRandomGen) {
    btnRandomGen.addEventListener('click', () => {
      if (!selArmsLeft || !selEyes || !selMouth || !selArmsRight) return;
      randomizeSelect(selArmsLeft);
      randomizeSelect(selEyes);
      randomizeSelect(selMouth);
      randomizeSelect(selArmsRight);
      updateGeneratorPreview();
      showToast('🎲 Generated random Lenny face!');
    });
  }

  function randomizeSelect(selectEl) {
    const opts = selectEl.options;
    const randomIdx = Math.floor(Math.random() * opts.length);
    selectEl.selectedIndex = randomIdx;
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

  // Initial Render: only render dynamically if grid is empty or on home page
  updateGeneratorPreview();
  const initialHub = faceGrid ? faceGrid.getAttribute('data-initial-hub') : null;
  const initialSub = faceGrid ? faceGrid.getAttribute('data-initial-sub') : null;
  if (initialHub) activeHub = initialHub;
  if (initialSub) activeSub = initialSub;

  if (faceGrid && faceGrid.children.length === 0) {
    renderGlyphGrid();
  }
});
