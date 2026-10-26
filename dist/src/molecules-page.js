import {
  QUICK_FORMULA_EXAMPLES,
  getAtomVisualStyle,
} from './data/compounds.js';
import {
  parseChemicalFormula,
  handleSmartDigitInsertion,
  formatFormulaHtml,
  formatFormulaUnicode,
} from './lib/formula-parser.js';
import { MoleculeVisualizer } from './components/molecule-visualizer.js';

const THEME_STORAGE_KEY = 'periodic_table_theme_v2_flat';

const MODE_LABELS = {
  auto: 'Automaticky (Číslo = koeficient · Shift+číslo = dolný index ₂)',
  coefficient: 'Režim: Koeficient (vkladá veľké čísla 4)',
  subscript: 'Režim: Dolný index (vkladá malé indexy ₂ za prvok)',
};

class MoleculesPageApp {
  constructor() {
    this.inputMode = 'auto'; // 'auto' | 'coefficient' | 'subscript'
    this.transientWarning = null;

    this.initTheme();
    this.cacheDOM();
    this.renderExampleChips();

    this.visualizer = new MoleculeVisualizer({
      container: this.visualizerMount,
    });

    const initialFormula = this.resolveFormulaFromHash() || '4CO₂';
    if (this.formulaInput) {
      this.formulaInput.value = initialFormula;
    }

    this.bindEvents();
    this.evaluateCurrentFormula();
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
    if (this.visualizer) {
      this.visualizer.renderFrame();
    }
  }

  cacheDOM() {
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.randomExampleBtn = document.getElementById('mol-random-example-btn');

    this.formulaInput = document.getElementById('formula-input');
    this.clearBtn = document.getElementById('formula-clear-btn');
    this.livePreviewEl = document.getElementById('formula-live-preview');
    this.feedbackEl = document.getElementById('mol-input-feedback');

    this.modeIndicatorEl = document.getElementById('mol-active-mode-indicator');
    this.modeBtns = document.querySelectorAll('[data-input-mode]');

    this.examplesWrapEl = document.getElementById('mol-examples-chips');
    this.resultsContainerEl = document.getElementById('mol-results-container');
    this.substanceBannerEl = document.getElementById('mol-substance-banner');
    this.visualizerMount = document.getElementById('molecule-visualizer-mount');

    this.summaryTbodyEl = document.getElementById('mol-summary-tbody');
    this.dynamicExplanationEl = document.getElementById('mol-dynamic-explanation');
    this.bondingBoxEl = document.getElementById('mol-bonding-classification-box');

    this.aboutCardEl = document.getElementById('mol-about-card');
    this.thPerUnitCountEl = document.getElementById('th-per-unit-count');
    this.breakdownTbodyEl = document.getElementById('mol-breakdown-tbody');

    this.applyTheme(this.theme);
  }

  resolveFormulaFromHash() {
    const raw = decodeURIComponent((window.location.hash || '').replace(/^#/, '').trim());
    if (!raw) return null;
    return formatFormulaUnicode(raw);
  }

  renderExampleChips() {
    if (!this.examplesWrapEl) return;
    this.examplesWrapEl.innerHTML = QUICK_FORMULA_EXAMPLES.map(
      (ex) => `
        <button
          type="button"
          class="mol-example-chip"
          data-example-formula="${ex.display}"
          title="${ex.label} (${ex.display})"
        >
          <strong class="mol-ex-formula">${ex.display}</strong>
          <span class="mol-ex-label">${ex.label}</span>
        </button>
      `
    ).join('');
  }

  setInputMode(mode) {
    if (!MODE_LABELS[mode]) return;
    this.inputMode = mode;
    if (this.modeIndicatorEl) {
      this.modeIndicatorEl.textContent = MODE_LABELS[mode];
    }
    this.modeBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.inputMode === mode);
    });
  }

  bindEvents() {
    this.themeToggleBtn?.addEventListener('click', () => {
      const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });

    this.randomExampleBtn?.addEventListener('click', () => {
      const current = this.formulaInput?.value.trim();
      const candidates = QUICK_FORMULA_EXAMPLES.filter((e) => e.display !== current);
      const chosen =
        candidates[Math.floor(Math.random() * candidates.length)] || QUICK_FORMULA_EXAMPLES[0];
      if (this.formulaInput) {
        this.formulaInput.value = chosen.display;
        this.transientWarning = null;
        this.evaluateCurrentFormula();
      }
    });

    this.modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setInputMode(btn.dataset.inputMode);
        this.formulaInput?.focus();
      });
    });

    // Špeciálne ovládanie čísel v editore vzorcov (Číslo vs Shift+číslo)
    this.formulaInput?.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Rozpoznanie stlačenia číslice podľa e.code (Digit0-9 / Numpad0-9) aj e.key,
      // aby Shift+2 fungovalo spoľahlivo na anglickej aj slovenskej klávesnici.
      let digit = null;
      const codeMatch = (e.code || '').match(/^(?:Digit|Numpad)([0-9])$/);
      if (codeMatch) {
        digit = codeMatch[1];
      } else if (/^[0-9]$/.test(e.key)) {
        digit = e.key;
      }

      if (digit !== null) {
        e.preventDefault();
        const start = this.formulaInput.selectionStart ?? this.formulaInput.value.length;
        const end = this.formulaInput.selectionEnd ?? start;

        const res = handleSmartDigitInsertion({
          currentValue: this.formulaInput.value,
          selectionStart: start,
          selectionEnd: end,
          digit,
          shiftKey: e.shiftKey,
          inputMode: this.inputMode,
        });

        if (res) {
          this.formulaInput.value = res.newValue;
          this.formulaInput.setSelectionRange(res.newCursorPos, res.newCursorPos);
          this.transientWarning = res.warning || null;
          this.evaluateCurrentFormula();
        }
      }
    });

    this.formulaInput?.addEventListener('input', () => {
      this.transientWarning = null;
      this.evaluateCurrentFormula();
    });

    this.formulaInput?.addEventListener('paste', () => {
      // Po vložení zo schránky necháme prehliadač vložiť text a okamžite aktualizujeme
      setTimeout(() => {
        this.transientWarning = null;
        this.evaluateCurrentFormula();
      }, 0);
    });

    this.clearBtn?.addEventListener('click', () => {
      if (!this.formulaInput) return;
      this.formulaInput.value = '';
      this.transientWarning = null;
      this.evaluateCurrentFormula();
      this.formulaInput.focus();
    });

    // Tlačidlá pomocnej dotykovej klávesnice (vkladanie na pozíciu kurzora)
    document.querySelectorAll('[data-insert-coeff]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.insertWithHelper({ digit: btn.dataset.insertCoeff, forceMode: 'coefficient' });
      });
    });

    document.querySelectorAll('[data-insert-sub]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.insertWithHelper({ digit: btn.dataset.insertSub, forceMode: 'subscript' });
      });
    });

    document.querySelectorAll('[data-insert-raw]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.formulaInput) return;
        const rawChar = btn.dataset.insertRaw;
        const start = this.formulaInput.selectionStart ?? this.formulaInput.value.length;
        const end = this.formulaInput.selectionEnd ?? start;
        const val = this.formulaInput.value;
        this.formulaInput.value = `${val.slice(0, start)}${rawChar}${val.slice(end)}`;
        const nextPos = start + rawChar.length;
        this.formulaInput.focus();
        this.formulaInput.setSelectionRange(nextPos, nextPos);
        this.transientWarning = null;
        this.evaluateCurrentFormula();
      });
    });

    // Kliknutie na ukážkový vzorec
    this.examplesWrapEl?.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-example-formula]');
      if (!chip || !this.formulaInput) return;
      this.formulaInput.value = chip.dataset.exampleFormula;
      this.transientWarning = null;
      this.evaluateCurrentFormula();
    });

    window.addEventListener('hashchange', () => {
      const hashFormula = this.resolveFormulaFromHash();
      if (hashFormula && this.formulaInput && this.formulaInput.value !== hashFormula) {
        this.formulaInput.value = hashFormula;
        this.transientWarning = null;
        this.evaluateCurrentFormula();
      }
    });
  }

  insertWithHelper({ digit, forceMode }) {
    if (!this.formulaInput) return;
    const start = this.formulaInput.selectionStart ?? this.formulaInput.value.length;
    const end = this.formulaInput.selectionEnd ?? start;
    const res = handleSmartDigitInsertion({
      currentValue: this.formulaInput.value,
      selectionStart: start,
      selectionEnd: end,
      digit,
      shiftKey: forceMode === 'subscript',
      inputMode: forceMode,
    });
    if (res) {
      this.formulaInput.value = res.newValue;
      this.formulaInput.focus();
      this.formulaInput.setSelectionRange(res.newCursorPos, res.newCursorPos);
      this.transientWarning = res.warning || null;
      this.evaluateCurrentFormula();
    }
  }

  evaluateCurrentFormula() {
    const rawValue = this.formulaInput ? this.formulaInput.value : '';
    const parsed = parseChemicalFormula(rawValue);

    // Živý typografický náhľad
    if (this.livePreviewEl) {
      this.livePreviewEl.innerHTML = parsed.ok
        ? parsed.fullFormulaHtml
        : formatFormulaHtml(rawValue) || '<span class="mol-preview-empty">—</span>';
    }

    // Zvýraznenie aktívneho čipu v príkladoch
    if (this.examplesWrapEl) {
      this.examplesWrapEl.querySelectorAll('[data-example-formula]').forEach((chip) => {
        chip.classList.toggle(
          'is-active',
          parsed.ok && chip.dataset.exampleFormula === parsed.fullFormulaUnicode
        );
      });
    }

    // Zobrazenie spätnej väzby / chýb / upozornení
    this.renderInputFeedback(parsed);

    if (!parsed.ok) {
      if (this.resultsContainerEl) {
        this.resultsContainerEl.classList.add('is-dimmed');
      }
      return;
    }

    if (this.resultsContainerEl) {
      this.resultsContainerEl.classList.remove('is-dimmed');
    }

    if (history.replaceState) {
      history.replaceState(null, '', `#${encodeURIComponent(parsed.fullFormulaUnicode)}`);
    }

    this.renderSubstanceBanner(parsed);
    this.visualizer.setFormulaData(parsed);
    this.renderCalculationCard(parsed);
    this.renderAboutSubstanceCard(parsed);
    this.renderElementBreakdownTable(parsed);
  }

  renderInputFeedback(parsed) {
    if (!this.feedbackEl) return;

    if (!parsed.ok) {
      this.feedbackEl.hidden = false;
      this.feedbackEl.className = `mol-input-feedback ${parsed.isEmpty ? 'is-info' : 'is-error'}`;
      const suggestionHtml = parsed.suggestion
        ? `<button type="button" class="mol-fix-suggestion-btn" data-apply-suggestion="${parsed.suggestion}">Opraviť na <strong>${parsed.suggestion}</strong></button>`
        : '';
      this.feedbackEl.innerHTML = `
        <div class="mol-feedback-row">
          <span>${parsed.isEmpty ? 'ℹ' : '⚠'} ${parsed.error}</span>
          ${suggestionHtml}
        </div>
      `;

      const fixBtn = this.feedbackEl.querySelector('[data-apply-suggestion]');
      fixBtn?.addEventListener('click', () => {
        if (!this.formulaInput) return;
        this.formulaInput.value = fixBtn.dataset.applySuggestion;
        this.transientWarning = null;
        this.evaluateCurrentFormula();
        this.formulaInput.focus();
      });
      return;
    }

    if (this.transientWarning || parsed.caseSensitivityNote) {
      this.feedbackEl.hidden = false;
      this.feedbackEl.className = 'mol-input-feedback is-warning';
      const msg = this.transientWarning || parsed.caseSensitivityNote;
      this.feedbackEl.innerHTML = `<div class="mol-feedback-row"><span>💡 ${msg}</span></div>`;
      return;
    }

    this.feedbackEl.hidden = true;
    this.feedbackEl.innerHTML = '';
  }

  renderSubstanceBanner(parsed) {
    if (!this.substanceBannerEl) return;
    const cls = parsed.classification;
    const db = parsed.dbEntry;

    const systematicLine = db?.systematicName
      ? `<span class="mol-banner-sys">Systematický názov: <strong>${db.systematicName}</strong> · Latinsky: <em>${db.latinName}</em></span>`
      : `<span class="mol-banner-sys">Zloženie overené podľa periodickej tabuľky IUPAC (118 prvkov)</span>`;

    this.substanceBannerEl.innerHTML = `
      <div class="mol-banner-left">
        <div class="mol-banner-formula-badge">
          ${parsed.fullFormulaHtml}
        </div>
        <div class="mol-banner-titles">
          <div class="mol-banner-pills">
            <span class="mol-type-pill ${cls.isIonic ? 'is-ionic' : 'is-molecular'}">
              ${cls.badgeLabel}
            </span>
            <span class="mol-source-pill ${parsed.hasVerifiedDatabaseEntry ? 'is-db' : 'is-calc'}">
              ${parsed.hasVerifiedDatabaseEntry ? '✓ Overená látka v databáze ChemLab' : '⚙ Vypočítané priamo zo vzorca'}
            </span>
          </div>
          <h2 class="mol-banner-name">${parsed.substanceName}</h2>
          <p class="mol-banner-quantity">${parsed.quantitySubtitle}</p>
          ${systematicLine}
        </div>
      </div>

      <div class="mol-banner-metrics">
        <div class="mol-metric-box">
          <span class="mol-metric-label">Vzorec 1 ${cls.isIonic ? 'jednotky' : 'molekuly'}</span>
          <strong class="mol-metric-val">${parsed.unitFormulaUnicode}</strong>
        </div>
        <div class="mol-metric-box">
          <span class="mol-metric-label">${cls.isIonic ? 'Počet jednotiek' : 'Počet molekúl'}</span>
          <strong class="mol-metric-val">${parsed.coefficient}</strong>
        </div>
        <div class="mol-metric-box">
          <span class="mol-metric-label">Celkový počet atómov</span>
          <strong class="mol-metric-val">${parsed.totalAtomsAllUnits}</strong>
        </div>
        <div class="mol-metric-box">
          <span class="mol-metric-label">Molárna hmotnosť (1×)</span>
          <strong class="mol-metric-val">${parsed.molarMassPerUnit.toFixed(3)} g/mol</strong>
        </div>
      </div>
    `;
  }

  renderCalculationCard(parsed) {
    if (this.summaryTbodyEl) {
      this.summaryTbodyEl.innerHTML = parsed.summaryTableRows
        .map(
          (row) => `
          <tr class="${row.isTotal ? 'mol-row-total' : ''}">
            <td>${row.label}</td>
            <td class="mol-td-val">${row.value}</td>
          </tr>
        `
        )
        .join('');
    }

    if (this.dynamicExplanationEl) {
      this.dynamicExplanationEl.textContent = parsed.dynamicExplanation;
    }

    if (this.bondingBoxEl) {
      const cls = parsed.classification;
      if (cls.isIonic) {
        this.bondingBoxEl.innerHTML = `
          <div class="mol-bonding-note is-ionic">
            <strong>Rozlíšenie stavby — Iónová zlúčenina:</strong>
            Látka <code>${parsed.unitFormulaUnicode}</code> je <strong>iónová zlúčenina</strong>, ktorá v tuhom stave netvorí izolované molekuly, ale pravidelnú iónovú kryštálovú mriežku katiónov a aniónov. Zápis <code>${parsed.unitFormulaUnicode}</code> preto vyjadruje najmenšiu elektroneutrálnu <strong>vzorcovú jednotku</strong>.
          </div>
        `;
      } else if (cls.bondingType === 'atomic') {
        this.bondingBoxEl.innerHTML = `
          <div class="mol-bonding-note">
            <strong>Samostatný prvok:</strong>
            Zápis <code>${parsed.unitFormulaUnicode}</code> predstavuje atómy jedného chemického prvku (${parsed.elements[0].name}).
          </div>
        `;
      } else {
        this.bondingBoxEl.innerHTML = `
          <div class="mol-bonding-note is-molecular">
            <strong>Rozlíšenie stavby — Molekulová látka:</strong>
            Látka <code>${parsed.unitFormulaUnicode}</code> je <strong>molekulová zlúčenina</strong>, v ktorej sú atómy navzájom pospájané kovalentnými väzbami do samostatných molekúl.
          </div>
        `;
      }
    }
  }

  renderAboutSubstanceCard(parsed) {
    if (!this.aboutCardEl) return;
    const db = parsed.dbEntry;
    const cls = parsed.classification;

    const massBarsHtml = parsed.elements
      .map((el) => {
        const style = getAtomVisualStyle(el.symbol);
        const pct = el.massFractionPercent.toFixed(2);
        return `
          <div class="mol-mass-bar-item">
            <div class="mol-mass-bar-top">
              <span>
                <strong style="color:${style.fill === '#f8fafc' ? 'var(--text-primary)' : style.fill}">${el.symbol}</strong>
                · ${el.name} (${el.countPerUnit}×)
              </span>
              <span class="mol-mass-pct">${pct} % (${el.molarMassContribution.toFixed(2)} g/mol)</span>
            </div>
            <div class="mol-mass-track">
              <div class="mol-mass-fill" style="width:${Math.max(3, el.massFractionPercent)}%;background:${style.fill === '#f8fafc' ? 'var(--accent-primary)' : style.fill}"></div>
            </div>
          </div>
        `;
      })
      .join('');

    const dbSectionHtml = db
      ? `
        <div class="mol-about-block">
          <div class="mol-about-source-tag is-db">Overené údaje z databázy ChemLab</div>
          <div class="mol-about-descriptions">
            <div class="mol-desc-box">
              <h4>🎓 Jednoduché vysvetlenie pre študenta</h4>
              <p>${db.studentSummary}</p>
            </div>
            <div class="mol-desc-box">
              <h4>🔬 Odborné vysvetlenie zloženia a väzieb</h4>
              <p>${db.expertSummary}</p>
            </div>
          </div>
          ${
            db.usesAndFacts?.length
              ? `
            <div class="mol-facts-box">
              <h4>💡 Bežné využitie a overené fakty</h4>
              <ul class="mol-facts-list">
                ${db.usesAndFacts.map((f) => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          `
              : ''
          }
        </div>
      `
      : `
        <div class="mol-about-block">
          <div class="mol-about-source-tag is-calc">Informácia o pôvode údajov</div>
          <div class="mol-desc-box">
            <h4>🎓 Vysvetlenie zloženia zo vzorca</h4>
            <p>
              Pre vzorec <strong>${parsed.unitFormulaUnicode}</strong> aplikácia presne vypočítala stechiometrické zastúpenie prvkov, počet atómov a molárnu hmotnosť priamo z overených atómových hmotností IUPAC.
              Keďže rovnaký sumárny vzorec môže v chémii zodpovedať viacerým odlišným zlúčeninám alebo izomérom, aplikácia zámerne nevymýšľa neoverený názov ani vlastnosti a zobrazuje výlučne exaktné kvantitatívne údaje.
            </p>
          </div>
        </div>
      `;

    this.aboutCardEl.innerHTML = `
      <div class="mol-card-header">
        <span class="mol-eyebrow">Sekcia · O tejto látke</span>
        <h3 class="mol-card-title">${parsed.substanceName} (<span class="mol-inline-formula">${parsed.fullFormulaHtml}</span>)</h3>
      </div>

      ${dbSectionHtml}

      <div class="mol-about-block">
        <div class="mol-about-source-tag is-calc">Hodnoty vypočítané priamo zo vzorca</div>
        <div class="mol-molar-summary-row">
          <div class="mol-molar-pill">
            <span>Molárna hmotnosť 1 ${cls.isIonic ? 'vzorcovej jednotky' : 'molekuly'} (${parsed.unitFormulaUnicode}):</span>
            <strong>${parsed.molarMassPerUnit.toFixed(3)} g/mol</strong>
          </div>
          ${
            parsed.coefficient > 1
              ? `
            <div class="mol-molar-pill">
              <span>Hmotnosť pre ${parsed.coefficient} mol (${parsed.fullFormulaUnicode}):</span>
              <strong>${parsed.totalMassAllUnits.toFixed(3)} g</strong>
            </div>
          `
              : ''
          }
        </div>

        <h4 class="mol-sub-heading">Percentuálny hmotnostný podiel prvkov v ${parsed.unitFormulaUnicode}</h4>
        <div class="mol-mass-bars-list">
          ${massBarsHtml}
        </div>
      </div>
    `;
  }

  renderElementBreakdownTable(parsed) {
    if (!this.breakdownTbodyEl) return;
    const isIonic = parsed.classification?.isIonic;
    if (this.thPerUnitCountEl) {
      this.thPerUnitCountEl.textContent = isIonic
        ? 'Atómy v 1 vzorcovej jednotke'
        : 'Atómy v 1 molekule';
    }

    this.breakdownTbodyEl.innerHTML = parsed.elements
      .map((el) => {
        const style = getAtomVisualStyle(el.symbol);
        return `
          <tr class="mol-breakdown-row" data-open-symbol="${el.symbol}">
            <td>
              <span
                class="mol-tbl-sym-badge"
                style="background:${style.fill};border-color:${style.stroke};color:${style.text}"
              >${el.symbol}</span>
            </td>
            <td>
              <div class="mol-tbl-names">
                <strong>${el.name}</strong>
                <span class="mol-tbl-latin">${el.latinName} · Z = ${el.atomicNumber}</span>
              </div>
            </td>
            <td class="mol-td-mono"><strong>${el.countPerUnit}</strong></td>
            <td class="mol-td-mono"><strong class="mol-td-highlight">${el.totalCount}</strong></td>
            <td class="mol-td-mono">${el.atomicMass.toFixed(3)} g/mol</td>
            <td class="mol-td-mono">${el.massFractionPercent.toFixed(2)} %</td>
            <td>
              <div class="mol-tbl-links">
                <a href="./prvok.html#${el.symbol}" class="tbl-act-link" title="Otvoriť 2D model a detail prvku ${el.name}">
                  🔬 Detail prvku
                </a>
                <a href="./index.html#${el.symbol}" class="tbl-act-link" title="Zvýrazniť ${el.name} v periodickej tabuľke">
                  📊 Tabuľka
                </a>
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MoleculesPageApp();
});
