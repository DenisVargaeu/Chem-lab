import {
  ELEMENTS,
  ELEMENTS_BY_NUMBER,
  ELEMENTS_BY_SYMBOL,
} from './data/elements.js';
import { AtomEditor } from './components/atom-editor.js';

const THEME_STORAGE_KEY = 'periodic_table_theme_v2_flat';

class EditorPageApp {
  constructor() {
    this.initTheme();
    this.cacheDOM();
    this.populateElementPicker();

    this.atomEditor = new AtomEditor({
      container: this.editorContainer,
      onSyncToTable: (atomicNumber) => {
        const el = ELEMENTS_BY_NUMBER[atomicNumber];
        if (el) {
          window.location.href = `./index.html#${el.symbol}`;
        }
      },
    });

    // Load element from URL hash if present (e.g. editor.html#Au or editor.html#79), else Carbon-12
    const initialEl = this.resolveElementFromHash() || ELEMENTS_BY_NUMBER[6];
    this.atomEditor.loadFromElement(initialEl, initialEl.defaultIsotope);
    if (this.elementPicker) {
      this.elementPicker.value = String(initialEl.atomicNumber);
    }
    this.syncNavLinks(initialEl.symbol);

    this.bindEvents();
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
    if (this.atomEditor) {
      this.atomEditor.renderCanvas();
    }
  }

  cacheDOM() {
    this.editorContainer = document.getElementById('atom-editor-container');
    this.elementPicker = document.getElementById('editor-element-picker');
    this.randomBtn = document.getElementById('editor-random-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.navLinkTable = document.getElementById('nav-link-table');
    this.navLinkDetail = document.getElementById('nav-link-detail');
    this.navLinkCatalog = document.getElementById('nav-link-catalog');
    this.applyTheme(this.theme);
  }

  populateElementPicker() {
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

  syncNavLinks(symbol) {
    if (this.navLinkTable && symbol) {
      this.navLinkTable.href = `./index.html#${symbol}`;
    }
    if (this.navLinkDetail && symbol) {
      this.navLinkDetail.href = `./prvok.html#${symbol}`;
    }
    if (this.navLinkCatalog && symbol) {
      this.navLinkCatalog.href = `./prvky.html#${symbol}`;
    }
  }

  bindEvents() {
    if (this.elementPicker) {
      this.elementPicker.addEventListener('change', (e) => {
        const z = Number(e.target.value);
        const el = ELEMENTS_BY_NUMBER[z];
        if (el) {
          this.atomEditor.loadFromElement(el, el.defaultIsotope);
          if (history.replaceState) {
            history.replaceState(null, '', `#${el.symbol}`);
          }
          this.syncNavLinks(el.symbol);
        }
      });
    }

    if (this.randomBtn) {
      this.randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * ELEMENTS.length);
        const el = ELEMENTS[randomIndex];
        this.atomEditor.loadFromElement(el, el.defaultIsotope);
        if (this.elementPicker) {
          this.elementPicker.value = String(el.atomicNumber);
        }
        if (history.replaceState) {
          history.replaceState(null, '', `#${el.symbol}`);
        }
        this.syncNavLinks(el.symbol);
      });
    }

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }

    window.addEventListener('hashchange', () => {
      const el = this.resolveElementFromHash();
      if (el) {
        this.atomEditor.loadFromElement(el, el.defaultIsotope);
        if (this.elementPicker) {
          this.elementPicker.value = String(el.atomicNumber);
        }
        this.syncNavLinks(el.symbol);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new EditorPageApp();
});
