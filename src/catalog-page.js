import {
  ELEMENTS,
  ELEMENT_CATEGORIES,
  CATEGORY_MAP,
  ELEMENTS_BY_NUMBER,
  ELEMENTS_BY_SYMBOL,
  SHELL_LABELS,
} from './data/elements.js';
import { normalizeText } from './components/periodic-table.js';

const THEME_STORAGE_KEY = 'periodic_table_theme_v2_flat';

const STATE_LABELS_SK = {
  solid: 'Pevné',
  liquid: 'Kvapalné',
  gas: 'Plynné',
  unknown: 'Neznáme',
};

class CatalogPageApp {
  constructor() {
    this.compareZ = [26, 29, 79]; // Default comparison: Železo (26), Meď (29), Zlato (79)
    this.nextCompareSlot = 0;

    this.searchQuery = '';
    this.categoryFilter = 'all';
    this.sortBy = 'z-asc';

    this.initTheme();
    this.cacheDOM();
    this.populateControls();

    const hashEl = this.resolveElementFromHash();
    if (hashEl) {
      this.compareZ[0] = hashEl.atomicNumber;
      if (this.cmpSelect1) this.cmpSelect1.value = String(hashEl.atomicNumber);
    }

    this.renderComparison();
    this.renderCatalogTable();
    this.bindEvents();
  }

  initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Ignore
    }
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme = savedTheme;
    } else {
      this.theme = 'light';
    }
    this.applyTheme(this.theme);
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore
    }
    if (this.themeToggleBtn) {
      const isLight = theme === 'light';
      this.themeToggleBtn.setAttribute(
        'aria-label',
        `Prepnúť na ${isLight ? 'tmavý' : 'svetlý'} režim`
      );
      this.themeToggleBtn.innerHTML = isLight
        ? '<span class="theme-icon" aria-hidden="true">☾</span><span class="btn-text">Tmavý</span>'
        : '<span class="theme-icon" aria-hidden="true">☀</span><span class="btn-text">Svetlý</span>';
    }
  }

  cacheDOM() {
    this.searchInput = document.getElementById('catalog-search');
    this.categorySelect = document.getElementById('catalog-category');
    this.sortSelect = document.getElementById('catalog-sort');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');

    this.cmpSelect1 = document.getElementById('cmp-select-1');
    this.cmpSelect2 = document.getElementById('cmp-select-2');
    this.cmpSelect3 = document.getElementById('cmp-select-3');
    this.compareGridEl = document.getElementById('compare-cards-grid');

    this.tbodyEl = document.getElementById('catalog-tbody');
    this.countBadgeEl = document.getElementById('catalog-count-badge');

    this.applyTheme(this.theme);
  }

  populateControls() {
    if (this.categorySelect) {
      this.categorySelect.innerHTML = [
        '<option value="all">Všetky kategórie (118)</option>',
        ...ELEMENT_CATEGORIES.map((cat) => `<option value="${cat.id}">${cat.label}</option>`),
      ].join('');
    }

    const elOptions = ELEMENTS.map(
      (el) => `<option value="${el.atomicNumber}">${el.atomicNumber}. ${el.name} (${el.latinName})</option>`
    ).join('');

    if (this.cmpSelect1) {
      this.cmpSelect1.innerHTML = elOptions;
      this.cmpSelect1.value = String(this.compareZ[0]);
    }
    if (this.cmpSelect2) {
      this.cmpSelect2.innerHTML = elOptions;
      this.cmpSelect2.value = String(this.compareZ[1]);
    }
    if (this.cmpSelect3) {
      this.cmpSelect3.innerHTML = elOptions;
      this.cmpSelect3.value = String(this.compareZ[2]);
    }
  }

  resolveElementFromHash() {
    const raw = (window.location.hash || '').replace(/^#/, '').trim();
    if (!raw) return null;
    const asNum = Number(raw);
    if (Number.isInteger(asNum) && ELEMENTS_BY_NUMBER[asNum]) {
      return ELEMENTS_BY_NUMBER[asNum];
    }
    return ELEMENTS_BY_SYMBOL[raw.toLowerCase()] || null;
  }

  bindEvents() {
    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderCatalogTable();
    });

    this.categorySelect?.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.renderCatalogTable();
    });

    this.sortSelect?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.renderCatalogTable();
    });

    this.cmpSelect1?.addEventListener('change', (e) => {
      this.compareZ[0] = Number(e.target.value);
      this.renderComparison();
    });
    this.cmpSelect2?.addEventListener('change', (e) => {
      this.compareZ[1] = Number(e.target.value);
      this.renderComparison();
    });
    this.cmpSelect3?.addEventListener('change', (e) => {
      this.compareZ[2] = Number(e.target.value);
      this.renderComparison();
    });

    this.themeToggleBtn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });
  }

  renderComparison() {
    if (!this.compareGridEl) return;

    this.compareGridEl.innerHTML = this.compareZ
      .map((z, idx) => {
        const el = ELEMENTS_BY_NUMBER[z];
        const cat = CATEGORY_MAP[el.category]?.label || el.category;
        const stateLabel = STATE_LABELS_SK[el.stateAtSTP] || el.stateAtSTP;
        const shellsStr = el.shells.map((c, i) => `${SHELL_LABELS[i]}:${c}`).join(' · ');
        const mpStr = el.meltingPointK
          ? `${el.meltingPointK} K (${(el.meltingPointK - 273.15).toFixed(1)} °C)`
          : 'Nedostupné';
        const bpStr = el.boilingPointK
          ? `${el.boilingPointK} K (${(el.boilingPointK - 273.15).toFixed(1)} °C)`
          : 'Nedostupné';

        return `
          <article class="cmp-card">
            <div class="cmp-card-top">
              <div class="cmp-badge cat-${el.category}">
                <span class="cmp-z">${el.atomicNumber}</span>
                <strong class="cmp-sym">${el.symbol}</strong>
              </div>
              <div class="cmp-headings">
                <span class="cmp-slot-tag">Porovnávaný prvok ${String.fromCharCode(65 + idx)}</span>
                <h3 class="cmp-name">${el.name}</h3>
                <span class="cmp-latin">${el.latinName}</span>
              </div>
            </div>

            <dl class="cmp-dl">
              <div><dt>Kategória</dt><dd>${cat}</dd></div>
              <div><dt>Relatívna hmotnosť</dt><dd>${el.atomicMassDisplay}</dd></div>
              <div><dt>Skupina / Perióda</dt><dd>${el.group ? `${el.group}. skupina` : 'f-blok'} · ${el.period}. perióda</dd></div>
              <div><dt>Skupenstvo (STP)</dt><dd>${stateLabel}</dd></div>
              <div><dt>Konfigurácia</dt><dd><code>${el.electronConfiguration}</code></dd></div>
              <div><dt>Vrstvy</dt><dd>${shellsStr}</dd></div>
              <div><dt>Elektronegativita</dt><dd>${el.electronegativity ?? '—'}</dd></div>
              <div><dt>Teplota topenia</dt><dd>${mpStr}</dd></div>
              <div><dt>Teplota varu</dt><dd>${bpStr}</dd></div>
              <div><dt>Rok objavu</dt><dd>${el.discoveryYear}</dd></div>
            </dl>

            <div class="cmp-card-links">
              <a href="./prvok.html#${el.symbol}" class="cmp-link-btn">🔬 2D Model a Detail</a>
              <a href="./editor.html#${el.symbol}" class="cmp-link-btn cmp-link-tonal">⚛ V editore atómu</a>
              <a href="./index.html#${el.symbol}" class="cmp-link-btn">📊 V tabuľke</a>
            </div>
          </article>
        `;
      })
      .join('');
  }

  renderCatalogTable() {
    if (!this.tbodyEl) return;
    const q = normalizeText(this.searchQuery.trim());

    const filtered = ELEMENTS.filter((el) => {
      if (this.categoryFilter !== 'all' && el.category !== this.categoryFilter) {
        return false;
      }
      if (q.length > 0) {
        const matchZ = String(el.atomicNumber).startsWith(q);
        const matchSym = el.symbol.toLowerCase().includes(q);
        const matchSk = normalizeText(el.name).includes(q);
        const matchLat = normalizeText(el.latinName).includes(q);
        return matchZ || matchSym || matchSk || matchLat;
      }
      return true;
    });

    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'z-desc':
          return b.atomicNumber - a.atomicNumber;
        case 'name-asc':
          return a.name.localeCompare(b.name, 'sk');
        case 'latin-asc':
          return a.latinName.localeCompare(b.latinName, 'la');
        case 'mass-asc':
          return a.atomicMass - b.atomicMass;
        case 'eneg-desc':
          return (b.electronegativity ?? -1) - (a.electronegativity ?? -1);
        case 'mp-desc':
          return (b.meltingPointK ?? -1) - (a.meltingPointK ?? -1);
        case 'z-asc':
        default:
          return a.atomicNumber - b.atomicNumber;
      }
    });

    if (this.countBadgeEl) {
      this.countBadgeEl.textContent = `${filtered.length} / 118 prvkov`;
    }

    this.tbodyEl.innerHTML = filtered
      .map((el) => {
        const cat = CATEGORY_MAP[el.category]?.label || el.category;
        const stateLabel = STATE_LABELS_SK[el.stateAtSTP] || el.stateAtSTP;
        return `
          <tr>
            <td class="td-mono"><strong>${el.atomicNumber}</strong></td>
            <td><span class="cat-mini-pill cat-${el.category}">${el.symbol}</span></td>
            <td><strong>${el.name}</strong></td>
            <td class="td-latin">${el.latinName}</td>
            <td>${cat}</td>
            <td class="td-mono">${el.atomicMassDisplay}</td>
            <td class="td-mono"><code>${el.electronConfiguration}</code></td>
            <td class="td-mono">${el.shells.join(', ')}</td>
            <td>${stateLabel}</td>
            <td class="td-mono">${el.electronegativity ?? '—'}</td>
            <td class="td-mono">${el.meltingPointK ?? '—'}</td>
            <td class="td-actions">
              <a href="./prvok.html#${el.symbol}" class="tbl-act-link" title="Zobraziť 2D model a detail prvku ${el.name}">🔬 Detail</a>
              <a href="./editor.html#${el.symbol}" class="tbl-act-link" title="Otvoriť ${el.name} v editore atómu">⚛ Editor</a>
              <button type="button" class="tbl-act-btn" data-add-cmp="${el.atomicNumber}" title="Pridať ${el.name} do porovnania vyššie">⚖️ Porovnať</button>
            </td>
          </tr>
        `;
      })
      .join('');

    this.tbodyEl.querySelectorAll('[data-add-cmp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const z = Number(btn.dataset.addCmp);
        this.compareZ[this.nextCompareSlot] = z;
        const selects = [this.cmpSelect1, this.cmpSelect2, this.cmpSelect3];
        if (selects[this.nextCompareSlot]) {
          selects[this.nextCompareSlot].value = String(z);
        }
        this.nextCompareSlot = (this.nextCompareSlot + 1) % 3;
        this.renderComparison();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CatalogPageApp();
});
