import {
  ELEMENTS,
  ELEMENT_CATEGORIES,
  CATEGORY_MAP,
  GROUP_NAMES,
  SHELL_LABELS,
  ELEMENTS_BY_NUMBER,
  ELEMENTS_BY_SYMBOL,
} from './data/elements.js';
import { PeriodicTable } from './components/periodic-table.js';
import { AtomModel } from './components/atom-model.js';
import { ElementDetails } from './components/element-details.js';

const THEME_STORAGE_KEY = 'periodic_table_theme_v1';

const STATE_LABELS_SK = {
  solid: 'Pevné skupenstvo',
  liquid: 'Kvapalné skupenstvo',
  gas: 'Plynné skupenstvo',
  unknown: 'Predpokladané skupenstvo',
};

class PeriodicTableApp {
  constructor() {
    this.selectedElement = ELEMENTS_BY_NUMBER[1]; // Predvolený prvok: Vodík (Z = 1)
    this.selectedIsotopeMass = this.selectedElement.defaultIsotope;

    this.filterState = {
      searchQuery: '',
      category: 'all',
      stateAtSTP: 'all',
      highlightGroup: null,
      highlightPeriod: null,
      previewCategory: null,
    };

    this.init();
  }

  init() {
    try {
      this.validateDataIntegrity();
      this.initTheme();
      this.cacheDOM();
      this.populateFilterControls();
      this.renderCategoryLegend();

      if (this.tableContainer) {
        this.periodicTable = new PeriodicTable({
          container: this.tableContainer,
          tooltipEl: this.tooltipEl,
          onSelectElement: (el) => this.selectElement(el, { scrollMobile: true }),
          onToggleGroup: (group) => this.toggleGroupHighlight(group),
          onTogglePeriod: (period) => this.togglePeriodHighlight(period),
          onToggleCategory: (categoryId) => this.toggleCategoryFilter(categoryId),
        });
      }

      if (this.atomContainer) {
        this.atomModel = new AtomModel({
          container: this.atomContainer,
        });
      }

      if (this.detailsContainer) {
        this.elementDetails = new ElementDetails({
          container: this.detailsContainer,
          onSelectIsotope: (massNumber) => {
            this.selectedIsotopeMass = massNumber;
            if (this.atomModel) {
              this.atomModel.setElement(this.selectedElement, massNumber);
            }
          },
          onNavigateElement: (el) => this.selectElement(el),
          onHighlightGroup: (group) => this.toggleGroupHighlight(group, true),
          onHighlightPeriod: (period) => this.togglePeriodHighlight(period, true),
          onOpenInEditor: (el) => {
            if (el) {
              window.location.href = `./editor.html#${el.symbol}`;
            }
          },
        });
      }

      this.bindGlobalEvents();
      this.applyUrlQueryParams();

      const initialEl = this.resolveElementFromHash() || ELEMENTS_BY_NUMBER[1];
      this.selectElement(initialEl, { scrollMobile: false });
      this.updateFilters();
    } catch (err) {
      console.error('Chyba pri inicializácii periodickej tabuľky:', err);
      this.renderFatalError(err);
    }
  }

  validateDataIntegrity() {
    if (!Array.isArray(ELEMENTS) || ELEMENTS.length !== 118) {
      throw new Error(
        `Chyba integrity dát: očakávalo sa 118 prvkov, našlo sa ${ELEMENTS?.length ?? 0}.`
      );
    }
  }

  initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme = savedTheme;
    } else {
      const prefersLight =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      this.theme = prefersLight ? 'light' : 'dark';
    }

    this.applyTheme(this.theme);
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
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
    if (this.atomModel) {
      this.atomModel.renderFrame();
    }
  }

  cacheDOM() {
    this.tableContainer = document.getElementById('periodic-table-container');
    this.selectedBarEl = document.getElementById('selected-element-bar');
    this.atomContainer = document.getElementById('atom-model-container');
    this.detailsContainer = document.getElementById('element-details-container');
    this.inspectorPane = document.getElementById('inspector-pane');
    this.tooltipEl = document.getElementById('element-tooltip');

    this.searchInput = document.getElementById('element-search');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.categorySelect = document.getElementById('category-filter');
    this.groupSelect = document.getElementById('group-select');
    this.periodSelect = document.getElementById('period-select');
    this.stateSelect = document.getElementById('state-filter');

    this.randomBtn = document.getElementById('random-element-btn');
    this.resetBtn = document.getElementById('reset-all-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');

    this.legendContainer = document.getElementById('category-legend');
    this.matchCounterEl = document.getElementById('match-counter');
  }

  applyUrlQueryParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const groupParam = Number(params.get('group'));
      const periodParam = Number(params.get('period'));
      if (Number.isInteger(groupParam) && groupParam >= 1 && groupParam <= 18) {
        this.filterState.highlightGroup = groupParam;
        if (this.groupSelect) this.groupSelect.value = String(groupParam);
      }
      if (Number.isInteger(periodParam) && periodParam >= 1 && periodParam <= 7) {
        this.filterState.highlightPeriod = periodParam;
        if (this.periodSelect) this.periodSelect.value = String(periodParam);
      }
    } catch {
      // Ignore URLSearchParams errors
    }
  }

  populateFilterControls() {
    if (this.categorySelect) {
      const optionsHtml = [
        '<option value="all">Všetky kategórie (118)</option>',
        ...ELEMENT_CATEGORIES.map((cat) => {
          const count = ELEMENTS.filter((e) => e.category === cat.id).length;
          return `<option value="${cat.id}">${cat.label} (${count})</option>`;
        }),
      ].join('');
      this.categorySelect.innerHTML = optionsHtml;
    }

    if (this.groupSelect) {
      const groupOpts = ['<option value="">Všetky skupiny (1–18)</option>'];
      for (let g = 1; g <= 18; g++) {
        groupOpts.push(`<option value="${g}">${g}. skupina — ${GROUP_NAMES[g]}</option>`);
      }
      this.groupSelect.innerHTML = groupOpts.join('');
    }

    if (this.periodSelect) {
      const periodOpts = ['<option value="">Všetky periódy (1–7)</option>'];
      for (let p = 1; p <= 7; p++) {
        const count = ELEMENTS.filter((e) => e.period === p).length;
        periodOpts.push(`<option value="${p}">${p}. perióda (${count} prvkov)</option>`);
      }
      this.periodSelect.innerHTML = periodOpts.join('');
    }

    this.applyTheme(this.theme);
  }

  renderCategoryLegend() {
    if (!this.legendContainer) return;

    const allChip = document.createElement('button');
    allChip.type = 'button';
    allChip.className = 'legend-chip is-active';
    allChip.dataset.category = 'all';
    allChip.innerHTML = `<span class="chip-label">Všetky</span><span class="chip-count">118</span>`;
    allChip.addEventListener('click', () => this.setCategoryFilter('all'));
    this.legendContainer.appendChild(allChip);

    for (const cat of ELEMENT_CATEGORIES) {
      const count = ELEMENTS.filter((e) => e.category === cat.id).length;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `legend-chip cat-chip-${cat.id}`;
      chip.dataset.category = cat.id;
      chip.title = `Filtrovať: ${cat.label} (${count} prvkov)`;
      chip.innerHTML = `
        <span class="chip-swatch swatch-${cat.id}"></span>
        <span class="chip-label">${cat.label}</span>
        <span class="chip-count">${count}</span>
      `;

      chip.addEventListener('click', () => {
        this.toggleCategoryFilter(cat.id);
      });
      chip.addEventListener('mouseenter', () => {
        this.filterState.previewCategory = cat.id;
        if (this.periodicTable) this.periodicTable.applyFilters(this.filterState);
      });
      chip.addEventListener('mouseleave', () => {
        this.filterState.previewCategory = null;
        if (this.periodicTable) this.periodicTable.applyFilters(this.filterState);
      });

      this.legendContainer.appendChild(chip);
    }
  }

  bindGlobalEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        this.filterState.searchQuery = val;
        if (this.clearSearchBtn) this.clearSearchBtn.hidden = val.length === 0;
        const matched = this.updateFilters();

        const trimmed = val.trim().toLowerCase();
        if (trimmed.length > 0) {
          const exactZ = Number(trimmed);
          if (Number.isInteger(exactZ) && ELEMENTS_BY_NUMBER[exactZ]) {
            this.selectElement(ELEMENTS_BY_NUMBER[exactZ], { scrollMobile: false });
          } else if (ELEMENTS_BY_SYMBOL[trimmed]) {
            this.selectElement(ELEMENTS_BY_SYMBOL[trimmed], { scrollMobile: false });
          } else if (matched.length === 1) {
            this.selectElement(matched[0], { scrollMobile: false });
          }
        }
      });

      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const matched = this.periodicTable ? this.periodicTable.applyFilters(this.filterState) : [];
          if (matched.length > 0) {
            this.selectElement(matched[0], { scrollMobile: true });
          }
        } else if (e.key === 'Escape') {
          this.searchInput.value = '';
          this.filterState.searchQuery = '';
          if (this.clearSearchBtn) this.clearSearchBtn.hidden = true;
          this.updateFilters();
          this.searchInput.blur();
        }
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
        this.filterState.searchQuery = '';
        this.clearSearchBtn.hidden = true;
        this.updateFilters();
      });
    }

    this.categorySelect?.addEventListener('change', (e) => {
      this.setCategoryFilter(e.target.value);
    });

    this.groupSelect?.addEventListener('change', (e) => {
      const val = e.target.value;
      this.filterState.highlightGroup = val ? Number(val) : null;
      this.updateFilters();
    });

    this.periodSelect?.addEventListener('change', (e) => {
      const val = e.target.value;
      this.filterState.highlightPeriod = val ? Number(val) : null;
      this.updateFilters();
    });

    this.stateSelect?.addEventListener('change', (e) => {
      this.filterState.stateAtSTP = e.target.value;
      this.updateFilters();
    });

    this.randomBtn?.addEventListener('click', () => {
      this.selectRandomElement();
    });

    this.resetBtn?.addEventListener('click', () => {
      this.resetAll();
    });

    this.themeToggleBtn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });

    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement?.tagName;
      const isInputFocused = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        this.searchInput?.focus();
        this.searchInput?.select();
        return;
      }

      if (e.key === 'Escape') {
        if (isInputFocused) {
          document.activeElement.blur();
        }
        this.resetFiltersOnly();
        return;
      }

      if (isInputFocused) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        this.selectRandomElement();
      } else if (e.key === 'p' || e.key === 'P') {
        if (this.atomModel) {
          e.preventDefault();
          this.atomModel.togglePause();
        }
      } else if (e.key === '[') {
        e.preventDefault();
        const prevZ =
          this.selectedElement.atomicNumber > 1 ? this.selectedElement.atomicNumber - 1 : 118;
        this.selectElement(ELEMENTS_BY_NUMBER[prevZ]);
      } else if (e.key === ']') {
        e.preventDefault();
        const nextZ =
          this.selectedElement.atomicNumber < 118 ? this.selectedElement.atomicNumber + 1 : 1;
        this.selectElement(ELEMENTS_BY_NUMBER[nextZ]);
      }
    });

    window.addEventListener('hashchange', () => {
      const el = this.resolveElementFromHash();
      if (el && el.atomicNumber !== this.selectedElement.atomicNumber) {
        this.selectElement(el, { scrollMobile: false });
      }
    });
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

  selectElement(element, { scrollMobile = false } = {}) {
    if (!element) return;
    this.selectedElement = element;
    this.selectedIsotopeMass = element.defaultIsotope;

    if (this.periodicTable) {
      this.periodicTable.setSelectedElement(element.atomicNumber);
    }
    if (this.atomModel) {
      this.atomModel.setElement(element, this.selectedIsotopeMass);
    }
    if (this.elementDetails) {
      this.elementDetails.render(element, this.selectedIsotopeMass);
    }

    this.renderSelectedElementBar(element);

    if (history.replaceState) {
      history.replaceState(null, '', `#${element.symbol}`);
    }

    const navDetail = document.getElementById('nav-link-detail');
    if (navDetail) {
      navDetail.href = `./prvok.html#${element.symbol}`;
    }
    const navEditor = document.getElementById('nav-link-editor');
    if (navEditor) {
      navEditor.href = `./editor.html#${element.symbol}`;
    }
    const navCatalog = document.getElementById('nav-link-catalog');
    if (navCatalog) {
      navCatalog.href = `./prvky.html#${element.symbol}`;
    }

    if (scrollMobile && window.innerWidth < 1024 && this.selectedBarEl) {
      this.selectedBarEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  renderSelectedElementBar(element) {
    if (!this.selectedBarEl || !element) return;

    const categoryLabel = CATEGORY_MAP[element.category]?.label || element.category;
    const stateLabel = STATE_LABELS_SK[element.stateAtSTP] || element.stateAtSTP;
    const groupDisplay = element.group
      ? `${element.group}. skupina (${GROUP_NAMES[element.group] || ''})`
      : 'f-blok (Lantanoidy / Aktinoidy)';
    const shellsPills = element.shells
      .map(
        (count, idx) =>
          `<span class="sel-bar-shell-pill" title="Vrstva ${SHELL_LABELS[idx]}: ${count} e⁻"><strong>${SHELL_LABELS[idx]}</strong>:${count}</span>`
      )
      .join('');

    this.selectedBarEl.innerHTML = `
      <div class="sel-bar-main">
        <div class="sel-bar-identity">
          <div class="sel-bar-badge cat-${element.category}">
            <span class="sel-bar-z">${element.atomicNumber}</span>
            <strong class="sel-bar-sym">${element.symbol}</strong>
            <span class="sel-bar-mass">${element.atomicMassDisplay}</span>
          </div>
          <div class="sel-bar-titles">
            <div class="sel-bar-tags">
              <span class="detail-cat-pill cat-chip-${element.category}">${categoryLabel}</span>
              <span class="detail-state-pill state-${element.stateAtSTP}">${stateLabel}</span>
              <span class="detail-block-pill">${element.period}. perióda · ${groupDisplay}</span>
            </div>
            <h2 class="sel-bar-name">
              ${element.name}
              <span class="sel-bar-latin" title="Latinský vedecký názov">(${element.latinName})</span>
            </h2>
            <p class="sel-bar-summary">${element.summary}</p>
          </div>
        </div>

        <div class="sel-bar-QuickStats">
          <div class="sel-bar-stat">
            <span class="sel-bar-stat-label">Elektrónová konfigurácia</span>
            <code class="sel-bar-stat-val">${element.electronConfiguration}</code>
          </div>
          <div class="sel-bar-stat">
            <span class="sel-bar-stat-label">Vrstvy (K–Q)</span>
            <div class="sel-bar-shells">${shellsPills}</div>
          </div>
        </div>

        <div class="sel-bar-actions">
          <a href="./prvok.html#${element.symbol}" class="sel-bar-btn sel-bar-btn-primary">
            <span aria-hidden="true">🔬</span>
            <span>2D Model a Detail prvku →</span>
          </a>
          <a href="./editor.html#${element.symbol}" class="sel-bar-btn sel-bar-btn-tonal">
            <span aria-hidden="true">⚛</span>
            <span>Upraviť v editore atómu →</span>
          </a>
          <a href="./prvky.html#${element.symbol}" class="sel-bar-btn sel-bar-btn-outline">
            <span aria-hidden="true">📋</span>
            <span>Porovnať v katalógu</span>
          </a>
        </div>
      </div>
    `;
  }

  selectRandomElement() {
    let candidate = this.selectedElement;
    while (candidate.atomicNumber === this.selectedElement.atomicNumber) {
      const randomIndex = Math.floor(Math.random() * ELEMENTS.length);
      candidate = ELEMENTS[randomIndex];
    }
    this.selectElement(candidate, { scrollMobile: true });
    const tile = this.periodicTable?.tileMap.get(candidate.atomicNumber);
    if (tile && window.innerWidth >= 1024) {
      tile.focus({ preventScroll: true });
    }
  }

  toggleCategoryFilter(categoryId) {
    const nextCat = this.filterState.category === categoryId ? 'all' : categoryId;
    this.setCategoryFilter(nextCat);
  }

  setCategoryFilter(categoryId) {
    this.filterState.category = categoryId;
    if (this.categorySelect) {
      this.categorySelect.value = categoryId;
    }
    this.updateFilters();
  }

  toggleGroupHighlight(group, forceEnable = false) {
    if (forceEnable) {
      this.filterState.highlightGroup = group;
    } else {
      this.filterState.highlightGroup =
        this.filterState.highlightGroup === group ? null : group;
    }
    if (this.groupSelect) {
      this.groupSelect.value = this.filterState.highlightGroup
        ? String(this.filterState.highlightGroup)
        : '';
    }
    this.updateFilters();
  }

  togglePeriodHighlight(period, forceEnable = false) {
    if (forceEnable) {
      this.filterState.highlightPeriod = period;
    } else {
      this.filterState.highlightPeriod =
        this.filterState.highlightPeriod === period ? null : period;
    }
    if (this.periodSelect) {
      this.periodSelect.value = this.filterState.highlightPeriod
        ? String(this.filterState.highlightPeriod)
        : '';
    }
    this.updateFilters();
  }

  resetFiltersOnly() {
    this.filterState = {
      searchQuery: '',
      category: 'all',
      stateAtSTP: 'all',
      highlightGroup: null,
      highlightPeriod: null,
      previewCategory: null,
    };
    if (this.searchInput) this.searchInput.value = '';
    if (this.clearSearchBtn) this.clearSearchBtn.hidden = true;
    if (this.categorySelect) this.categorySelect.value = 'all';
    if (this.groupSelect) this.groupSelect.value = '';
    if (this.periodSelect) this.periodSelect.value = '';
    if (this.stateSelect) this.stateSelect.value = 'all';
    this.updateFilters();
  }

  resetAll() {
    this.resetFiltersOnly();
    this.selectElement(ELEMENTS_BY_NUMBER[1], { scrollMobile: false });
  }

  updateFilters() {
    if (this.legendContainer) {
      const chips = this.legendContainer.querySelectorAll('.legend-chip');
      chips.forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.category === this.filterState.category);
      });
    }

    const matched = this.periodicTable
      ? this.periodicTable.applyFilters(this.filterState)
      : ELEMENTS;
    if (this.matchCounterEl) {
      this.matchCounterEl.textContent = `${matched.length} / 118 prvkov`;
    }
    return matched;
  }

  renderFatalError(err) {
    const root = document.getElementById('periodic-table-container') || document.body;
    root.innerHTML = `
      <div class="error-banner" role="alert">
        <h2>Nepodarilo sa načítať databázu periodickej tabuľky</h2>
        <p>${err?.message || 'Nastala neočakávaná chyba pri spúšťaní aplikácie.'}</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PeriodicTableApp();
});
