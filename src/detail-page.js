import {
  ELEMENTS,
  ELEMENTS_BY_NUMBER,
  ELEMENTS_BY_SYMBOL,
} from './data/elements.js';
import { AtomModel } from './components/atom-model.js';
import { ElementDetails } from './components/element-details.js';

const THEME_STORAGE_KEY = 'periodic_table_theme_v2_flat';

class DetailPageApp {
  constructor() {
    this.selectedElement = this.resolveElementFromHash() || ELEMENTS_BY_NUMBER[1];
    this.selectedIsotopeMass = this.selectedElement.defaultIsotope;

    this.initTheme();
    this.cacheDOM();
    this.populatePicker();

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
          this.atomModel?.setElement(this.selectedElement, massNumber);
        },
        onNavigateElement: (el) => this.selectElement(el),
        onHighlightGroup: (group) => {
          window.location.href = `./index.html?group=${group}#${this.selectedElement.symbol}`;
        },
        onHighlightPeriod: (period) => {
          window.location.href = `./index.html?period=${period}#${this.selectedElement.symbol}`;
        },
        onOpenInEditor: (el) => {
          if (el) {
            window.location.href = `./editor.html#${el.symbol}`;
          }
        },
      });
    }

    this.selectElement(this.selectedElement);
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
    this.atomModel?.renderFrame();
  }

  cacheDOM() {
    this.atomContainer = document.getElementById('atom-model-container');
    this.detailsContainer = document.getElementById('element-details-container');
    this.elementPicker = document.getElementById('detail-element-picker');
    this.randomBtn = document.getElementById('detail-random-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');

    this.navLinkTable = document.getElementById('nav-link-table');
    this.navLinkEditor = document.getElementById('nav-link-editor');
    this.navLinkCatalog = document.getElementById('nav-link-catalog');

    this.applyTheme(this.theme);
  }

  populatePicker() {
    if (!this.elementPicker) return;
    this.elementPicker.innerHTML = ELEMENTS.map(
      (el) =>
        `<option value="${el.atomicNumber}">${el.atomicNumber}. ${el.name} (${el.latinName} · ${el.symbol})</option>`
    ).join('');
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

  selectElement(element) {
    if (!element) return;
    this.selectedElement = element;
    this.selectedIsotopeMass = element.defaultIsotope;

    this.atomModel?.setElement(element, this.selectedIsotopeMass);
    this.elementDetails?.render(element, this.selectedIsotopeMass);

    if (this.elementPicker) {
      this.elementPicker.value = String(element.atomicNumber);
    }
    if (history.replaceState) {
      history.replaceState(null, '', `#${element.symbol}`);
    }

    if (this.navLinkTable) this.navLinkTable.href = `./index.html#${element.symbol}`;
    if (this.navLinkEditor) this.navLinkEditor.href = `./editor.html#${element.symbol}`;
    if (this.navLinkCatalog) this.navLinkCatalog.href = `./prvky.html#${element.symbol}`;
  }

  bindEvents() {
    this.elementPicker?.addEventListener('change', (e) => {
      const el = ELEMENTS_BY_NUMBER[Number(e.target.value)];
      if (el) this.selectElement(el);
    });

    this.randomBtn?.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * ELEMENTS.length);
      this.selectElement(ELEMENTS[randomIndex]);
    });

    this.themeToggleBtn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });

    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT') return;
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        this.atomModel?.togglePause();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        const randomIndex = Math.floor(Math.random() * ELEMENTS.length);
        this.selectElement(ELEMENTS[randomIndex]);
      } else if (e.key === '[' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevZ =
          this.selectedElement.atomicNumber > 1 ? this.selectedElement.atomicNumber - 1 : 118;
        this.selectElement(ELEMENTS_BY_NUMBER[prevZ]);
      } else if (e.key === ']' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextZ =
          this.selectedElement.atomicNumber < 118 ? this.selectedElement.atomicNumber + 1 : 1;
        this.selectElement(ELEMENTS_BY_NUMBER[nextZ]);
      }
    });

    window.addEventListener('hashchange', () => {
      const el = this.resolveElementFromHash();
      if (el && el.atomicNumber !== this.selectedElement.atomicNumber) {
        this.selectElement(el);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DetailPageApp();
});
