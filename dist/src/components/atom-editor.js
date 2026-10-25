import {
  ELEMENTS_BY_NUMBER,
  SHELL_LABELS,
  CATEGORY_MAP,
} from '../data/elements.js';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Kapacitné pravidlá pre elektrónové vrstvy K..Q (n = 1..7)
 */
export const CAPACITY_RULES = {
  quantum: {
    id: 'quantum',
    label: 'Kvantový limit 2n² (2, 8, 18, 32…)',
    capacities: [2, 8, 18, 32, 50, 72, 98],
    description:
      'Maximálna teoretická kapacita hlavnej kvantovej vrstvy n je 2n² elektrónov (K=2, L=8, M=18, N=32, O=50, P=72, Q=98). V reálnych atómoch v základnom stave však vonkajšia vrstva nikdy neobsahuje viac ako 8 valenčných elektrónov (oktet).',
  },
  periodic: {
    id: 'periodic',
    label: 'Periodické obsadzovanie (2, 8, 18, 32, 32, 18, 8)',
    capacities: [2, 8, 18, 32, 32, 18, 8],
    description:
      'Zodpovedá skutočnému maximálnemu obsadeniu vrstiev K až Q u známych 118 chemických prvkov v základnom stave podľa Madelungovho pravidla (n + l).',
  },
  octet: {
    id: 'octet',
    label: 'Zjednodušený školský Bohrov model (2, 8, 8, 18…)',
    capacities: [2, 8, 8, 18, 18, 32, 32],
    description:
      'Zjednodušený školský model pre prvých 20 prvkov (H až Ca), kde sa 3. vrstva (M) najprv zapĺňa do 8 elektrónov pred obsadzovaním 4. vrstvy (N).',
  },
};

export const ATOM_PRESETS = [
  {
    id: 'h1',
    label: '¹H Vodík (neutrálny)',
    protons: 1,
    neutrons: 0,
    shells: [1],
  },
  {
    id: 'he4',
    label: '⁴He Hélium (uzavretá K)',
    protons: 2,
    neutrons: 2,
    shells: [2],
  },
  {
    id: 'c12',
    label: '¹²C Uhlík (Z = 6)',
    protons: 6,
    neutrons: 6,
    shells: [2, 4],
  },
  {
    id: 'o16',
    label: '¹⁶O Kyslík (Z = 8)',
    protons: 8,
    neutrons: 8,
    shells: [2, 6],
  },
  {
    id: 'na23',
    label: '²³Na Sodík (neutrálny)',
    protons: 11,
    neutrons: 12,
    shells: [2, 8, 1],
  },
  {
    id: 'na_plus',
    label: '²³Na⁺ Katión sodíka (+1)',
    protons: 11,
    neutrons: 12,
    shells: [2, 8],
  },
  {
    id: 'cl_minus',
    label: '³⁵Cl⁻ Anión chlóru (−1)',
    protons: 17,
    neutrons: 18,
    shells: [2, 8, 8],
  },
  {
    id: 'fe56',
    label: '⁵⁶Fe Železo (Z = 26)',
    protons: 26,
    neutrons: 30,
    shells: [2, 8, 14, 2],
  },
  {
    id: 'au197',
    label: '¹⁹⁷Au Zlato (Z = 79)',
    protons: 79,
    neutrons: 118,
    shells: [2, 8, 18, 32, 18, 1],
  },
];

function toSuperscript(num) {
  return String(num)
    .split('')
    .map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)] || d)
    .join('');
}

/**
 * Interaktívny editor atómu — Priama vizuálna úprava elektrónových vrstiev klikaním.
 */
export class AtomEditor {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container
   * @param {(atomicNumber: number) => void} [options.onSyncToTable]
   */
  constructor({ container, onSyncToTable }) {
    this.container = container;
    this.onSyncToTable = onSyncToTable;

    // Editor state
    this.protons = 6; // Uhlík (C)
    this.neutrons = 6;
    this.shells = [2, 4]; // K: 2, L: 4
    this.selectedShellIndex = 1; // Active highlighted shell (L)
    this.capacityRuleId = 'quantum';

    // Undo / Redo history stacks
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 50;

    // Pending shell removal confirmation state
    this.pendingRemoveShellIndex = null;

    // Animation & interaction state
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.isAnimating = !prefersReducedMotion;
    this.animTime = 0;
    this.lastFrameTime = performance.now();
    this.rafId = null;

    // Hover state on canvas
    this.hoveredElectron = null; // { shellIndex, electronIndex, x, y }
    this.hoveredShellIndex = null;
    this.pointerCanvasX = null;
    this.pointerCanvasY = null;

    // Newly spawned electron pop-in animations: Array of { shellIndex, electronIndex, spawnTime }
    this.spawnAnimations = [];
    // Visual pulse rings when adding/removing: Array of { x, y, color, startTime }
    this.rippleEffects = [];

    // Cached rendered positions for accurate hit-testing even during animation
    this.renderedShellRadii = []; // [r0, r1, ...]
    this.renderedElectrons = []; // [{ shellIndex, electronIndex, x, y, r }]
    this.nucleons = [];

    this.initDOM();
    this.bindEvents();
    this.rebuildNucleusGeometry();
    this.updateUI();
    this.startLoop();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="editor-header">
        <div class="editor-title-group">
          <span class="editor-eyebrow">Interaktívne laboratórium · Priama manipulácia s vrstvami</span>
          <h2 class="editor-main-title">Editor atómu — Staviteľ elektrónových vrstiev</h2>
          <p class="editor-subtitle">
            Klikni priamo na ľubovoľnú kruhovú vrstvu pre <strong>pridanie elektrónu (+1 e⁻)</strong> alebo klikni na existujúci elektrón pre <strong>jeho odstránenie (−1 e⁻)</strong>.
          </p>
        </div>

        <!-- Top Action Toolbar: Presets, Undo, Redo, Animation, Reset -->
        <div class="editor-top-actions">
          <div class="editor-presets-wrap">
            <span class="presets-label">Predvoľby:</span>
            <div class="presets-pills" id="editor-presets-bar">
              ${ATOM_PRESETS.map(
                (p) => `
                <button type="button" class="preset-pill-btn" data-preset="${p.id}" title="Načítať predvoľbu: ${p.label}">
                  ${p.label}
                </button>
              `
              ).join('')}
            </div>
          </div>

          <div class="editor-history-bar" role="toolbar" aria-label="Nástroje editora atómu">
            <button type="button" class="ed-tool-btn" id="ed-undo-btn" disabled title="Späť (Ctrl+Z)">
              ↶ Späť
            </button>
            <button type="button" class="ed-tool-btn" id="ed-redo-btn" disabled title="Dopredu (Ctrl+Y)">
              ↷ Dopredu
            </button>
            <button type="button" class="ed-tool-btn ed-tool-tonal" id="ed-anim-btn" aria-pressed="${this.isAnimating}">
              ${this.isAnimating ? '⏸ Pozastaviť obeh' : '▶ Spustiť obeh'}
            </button>
            <button type="button" class="ed-tool-btn" id="ed-ground-btn" title="Nastaviť elektróny do stabilného základného stavu pre aktuálny počet protónov">
              ✨ Základný stav
            </button>
            <button type="button" class="ed-tool-btn ed-tool-danger" id="ed-reset-btn" title="Resetovať atóm na Uhlík-12">
              ↺ Resetovať
            </button>
          </div>
        </div>
      </div>

      <!-- Main 3-Column Editor Workspace:
           Left: Nucleus & Real-Time Element/Ion Identification + Warnings
           Center: Direct Interactive 2D Shell Canvas
           Right: Interactive Shell Manager (Add/Remove Shells, +/- per shell, Capacity Rules) -->
      <div class="editor-body-grid">
        <!-- LEFT COLUMN: Element Identity, Charge & Nucleus (+/-) Controls -->
        <div class="editor-col editor-identity-col">
          <div class="ed-card ed-element-banner" id="ed-element-banner"></div>

          <!-- Nucleus Stepper Controls (Protons & Neutrons via +/- buttons) -->
          <div class="ed-card ed-nucleus-controls">
            <h3 class="ed-section-title">Jadro atómu (Protóny a Neutróny)</h3>
            <p class="ed-helper-text">Zmena počtu protónov okamžite mení chemický prvok.</p>

            <div class="ed-stepper-row">
              <div class="stepper-info">
                <span class="particle-dot dot-proton"></span>
                <div>
                  <strong class="stepper-name">Protóny (p⁺)</strong>
                  <span class="stepper-sub">Protónové číslo Z (1–118)</span>
                </div>
              </div>
              <div class="stepper-btns">
                <button type="button" class="step-btn" id="ed-proton-minus" aria-label="Odobrať jeden protón" title="Odobrať 1 protón (−1 p⁺)">−</button>
                <span class="step-val" id="ed-proton-val">6</span>
                <button type="button" class="step-btn" id="ed-proton-plus" aria-label="Pridať jeden protón" title="Pridať 1 protón (+1 p⁺)">+</button>
              </div>
            </div>

            <div class="ed-stepper-row">
              <div class="stepper-info">
                <span class="particle-dot dot-neutron"></span>
                <div>
                  <strong class="stepper-name">Neutróny (n⁰)</strong>
                  <span class="stepper-sub">Izotopové číslo N = A − Z</span>
                </div>
              </div>
              <div class="stepper-btns">
                <button type="button" class="step-btn" id="ed-neutron-minus" aria-label="Odobrať jeden neutrón" title="Odobrať 1 neutrón (−1 n⁰)">−</button>
                <span class="step-val" id="ed-neutron-val">6</span>
                <button type="button" class="step-btn" id="ed-neutron-plus" aria-label="Pridať jeden neutrón" title="Pridať 1 neutrón (+1 n⁰)">+</button>
              </div>
            </div>

            <div class="ed-stepper-row ed-electron-readonly-row">
              <div class="stepper-info">
                <span class="particle-dot dot-electron"></span>
                <div>
                  <strong class="stepper-name">Elektróny spolu (e⁻)</strong>
                  <span class="stepper-sub">Uprav priamo klikaním na vrstvy</span>
                </div>
              </div>
              <div class="stepper-btns">
                <span class="step-val step-val-accent" id="ed-electron-total">6</span>
              </div>
            </div>
          </div>

          <!-- Scientific Diagnostics & Warnings Box -->
          <div class="ed-card ed-warnings-card" id="ed-warnings-box" aria-live="polite"></div>
        </div>

        <!-- CENTER COLUMN: Interactive 2D Shell Canvas -->
        <div class="editor-col editor-canvas-col">
          <div class="ed-canvas-stage" id="ed-canvas-stage">
            <canvas
              id="ed-atom-canvas"
              class="ed-atom-canvas"
              tabindex="0"
              role="application"
              aria-label="Interaktívne plátno atómu. Kliknutím na vrstvu pridáš elektrón, kliknutím na elektrón ho odstrániš. Šípkami hore/dole vyberieš vrstvu a klávesmi + alebo - upravíš počet elektrónov."
            ></canvas>

            <!-- Floating live action indicator badge -->
            <div class="ed-canvas-status" id="ed-canvas-status">
              Klikni na vrstvu pre <strong>+1 e⁻</strong> · Klikni na elektrón pre <strong>−1 e⁻</strong>
            </div>

            <!-- Quick floating Add Shell button on canvas corner -->
            <button type="button" class="ed-floating-add-shell-btn" id="ed-canvas-add-shell-btn" title="Pridať novú prázdnu elektrónovú vrstvu">
              + Pridať vrstvu
            </button>
          </div>

          <div class="ed-keyboard-hint">
            <span><strong>Ovládanie myšou / dotykom:</strong> Klik na kružnicu vrstvy = pridať 1 elektrón · Klik na guličku elektrónu = odstrániť 1 elektrón</span>
            <span><strong>Klávesnica (po kliknutí na plátno):</strong> <kbd>1</kbd>–<kbd>7</kbd> výber vrstvy K–Q · <kbd>+</kbd> / <kbd>−</kbd> elektrón vo vybranej vrstve</span>
          </div>
        </div>

        <!-- RIGHT COLUMN: Direct Shell Management List & Capacity Rules -->
        <div class="editor-col editor-shells-col">
          <div class="ed-card ed-shells-manager-card">
            <div class="ed-shells-header">
              <div>
                <h3 class="ed-section-title">Elektrónové vrstvy (K – Q)</h3>
                <span class="ed-helper-text">Klikni na vrstvu alebo použi + / −</span>
              </div>
              <button type="button" class="ed-add-shell-btn" id="ed-add-shell-btn">
                + Pridať vrstvu
              </button>
            </div>

            <!-- Confirmation Dialog when removing a non-empty shell -->
            <div class="ed-remove-confirm-banner" id="ed-remove-confirm-banner" hidden role="alertdialog" aria-labelledby="ed-confirm-title"></div>

            <!-- Dynamic List of Shells K..Q -->
            <div class="ed-shells-list" id="ed-shells-list" role="list"></div>

            <!-- Capacity Rule Selector & Model Explanation -->
            <div class="ed-capacity-rules-box">
              <label class="ed-rule-label" for="ed-capacity-select">Pravidlo kapacity vrstiev:</label>
              <select id="ed-capacity-select" class="ed-capacity-select">
                ${Object.values(CAPACITY_RULES)
                  .map(
                    (rule) =>
                      `<option value="${rule.id}" ${
                        rule.id === this.capacityRuleId ? 'selected' : ''
                      }>${rule.label}</option>`
                  )
                  .join('')}
              </select>
              <p class="ed-rule-desc" id="ed-rule-desc">
                ${CAPACITY_RULES[this.capacityRuleId].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#ed-atom-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.statusEl = this.container.querySelector('#ed-canvas-status');
    this.elementBannerEl = this.container.querySelector('#ed-element-banner');
    this.warningsBoxEl = this.container.querySelector('#ed-warnings-box');
    this.shellsListEl = this.container.querySelector('#ed-shells-list');
    this.confirmBannerEl = this.container.querySelector('#ed-remove-confirm-banner');

    this.protonValEl = this.container.querySelector('#ed-proton-val');
    this.neutronValEl = this.container.querySelector('#ed-neutron-val');
    this.electronTotalEl = this.container.querySelector('#ed-electron-total');

    this.protonMinusBtn = this.container.querySelector('#ed-proton-minus');
    this.protonPlusBtn = this.container.querySelector('#ed-proton-plus');
    this.neutronMinusBtn = this.container.querySelector('#ed-neutron-minus');
    this.neutronPlusBtn = this.container.querySelector('#ed-neutron-plus');

    this.addShellBtn = this.container.querySelector('#ed-add-shell-btn');
    this.canvasAddShellBtn = this.container.querySelector('#ed-canvas-add-shell-btn');
    this.undoBtn = this.container.querySelector('#ed-undo-btn');
    this.redoBtn = this.container.querySelector('#ed-redo-btn');
    this.animBtn = this.container.querySelector('#ed-anim-btn');
    this.groundBtn = this.container.querySelector('#ed-ground-btn');
    this.resetBtn = this.container.querySelector('#ed-reset-btn');
    this.capacitySelect = this.container.querySelector('#ed-capacity-select');
    this.ruleDescEl = this.container.querySelector('#ed-rule-desc');
  }

  bindEvents() {
    // Proton +/-
    this.protonMinusBtn.addEventListener('click', () => {
      if (this.protons > 1) {
        this.pushUndoState();
        this.protons--;
        this.rebuildNucleusGeometry();
        this.updateUI();
      }
    });

    this.protonPlusBtn.addEventListener('click', () => {
      if (this.protons < 118) {
        this.pushUndoState();
        this.protons++;
        this.rebuildNucleusGeometry();
        this.updateUI();
      }
    });

    // Neutron +/-
    this.neutronMinusBtn.addEventListener('click', () => {
      if (this.neutrons > 0) {
        this.pushUndoState();
        this.neutrons--;
        this.rebuildNucleusGeometry();
        this.updateUI();
      }
    });

    this.neutronPlusBtn.addEventListener('click', () => {
      if (this.neutrons < 200) {
        this.pushUndoState();
        this.neutrons++;
        this.rebuildNucleusGeometry();
        this.updateUI();
      }
    });

    // Add shell buttons
    const handleAddShell = () => {
      if (this.shells.length < SHELL_LABELS.length) {
        this.pushUndoState();
        this.shells.push(0); // Always creates an empty shell without changing proton count!
        this.selectedShellIndex = this.shells.length - 1;
        this.pendingRemoveShellIndex = null;
        this.updateUI();
      }
    };
    this.addShellBtn.addEventListener('click', handleAddShell);
    this.canvasAddShellBtn.addEventListener('click', handleAddShell);

    // Undo / Redo / Animation / Ground State / Reset
    this.undoBtn.addEventListener('click', () => this.undo());
    this.redoBtn.addEventListener('click', () => this.redo());

    this.animBtn.addEventListener('click', () => {
      this.isAnimating = !this.isAnimating;
      this.animBtn.setAttribute('aria-pressed', String(this.isAnimating));
      this.animBtn.textContent = this.isAnimating ? '⏸ Pozastaviť obeh' : '▶ Spustiť obeh';
      this.renderCanvas();
    });

    this.groundBtn.addEventListener('click', () => {
      const el = ELEMENTS_BY_NUMBER[this.protons];
      if (el) {
        this.pushUndoState();
        this.shells = [...el.shells];
        this.selectedShellIndex = this.shells.length - 1;
        this.pendingRemoveShellIndex = null;
        this.updateUI();
      }
    });

    this.resetBtn.addEventListener('click', () => {
      this.pushUndoState();
      this.protons = 6;
      this.neutrons = 6;
      this.shells = [2, 4];
      this.selectedShellIndex = 1;
      this.pendingRemoveShellIndex = null;
      this.rebuildNucleusGeometry();
      this.updateUI();
    });

    // Capacity rules selector
    this.capacitySelect.addEventListener('change', (e) => {
      this.capacityRuleId = e.target.value;
      const rule = CAPACITY_RULES[this.capacityRuleId];
      if (rule && this.ruleDescEl) {
        this.ruleDescEl.textContent = rule.description;
      }
      this.updateUI();
    });

    // Presets bar
    const presetBtns = this.container.querySelectorAll('.preset-pill-btn');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const preset = ATOM_PRESETS.find((p) => p.id === btn.dataset.preset);
        if (preset) {
          this.pushUndoState();
          this.protons = preset.protons;
          this.neutrons = preset.neutrons;
          this.shells = [...preset.shells];
          this.selectedShellIndex = this.shells.length - 1;
          this.pendingRemoveShellIndex = null;
          this.rebuildNucleusGeometry();
          this.updateUI();
        }
      });
    });

    // Direct Canvas Pointer Hover & Click Manipulation
    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointerCanvasX = e.clientX - rect.left;
      this.pointerCanvasY = e.clientY - rect.top;
      this.updateCanvasHoverState();
      if (!this.isAnimating) {
        this.renderCanvas();
      }
    });

    this.canvas.addEventListener('pointerleave', () => {
      this.pointerCanvasX = null;
      this.pointerCanvasY = null;
      this.hoveredElectron = null;
      this.hoveredShellIndex = null;
      this.canvas.style.cursor = 'default';
      this.statusEl.innerHTML =
        'Klikni na vrstvu pre <strong>+1 e⁻</strong> · Klikni na elektrón pre <strong>−1 e⁻</strong>';
      if (!this.isAnimating) {
        this.renderCanvas();
      }
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.handleCanvasClick(clickX, clickY);
    });

    // Keyboard accessibility on canvas
    this.canvas.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '7') {
        const idx = Number(e.key) - 1;
        if (idx < this.shells.length) {
          e.preventDefault();
          this.selectedShellIndex = idx;
          this.updateUI();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (this.shells.length > 0) {
          this.selectedShellIndex = (this.selectedShellIndex + 1) % this.shells.length;
          this.updateUI();
        }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (this.shells.length > 0) {
          this.selectedShellIndex =
            (this.selectedShellIndex - 1 + this.shells.length) % this.shells.length;
          this.updateUI();
        }
      } else if (e.key === '+' || e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        if (this.selectedShellIndex >= 0 && this.selectedShellIndex < this.shells.length) {
          this.addElectronToShell(this.selectedShellIndex);
        }
      } else if (e.key === '-' || e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        if (
          this.selectedShellIndex >= 0 &&
          this.selectedShellIndex < this.shells.length &&
          this.shells[this.selectedShellIndex] > 0
        ) {
          this.removeElectronFromShell(this.selectedShellIndex);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.redo();
      }
    });

    // ResizeObserver for crisp Canvas rendering
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.renderCanvas();
    });
    this.resizeObserver.observe(this.canvas);
  }

  /**
   * Loads a chemical element from the periodic table into the Atomic Editor.
   * @param {Object} element
   * @param {number} [isotopeMassNumber]
   */
  loadFromElement(element, isotopeMassNumber) {
    if (!element) return;
    this.pushUndoState();
    this.protons = element.atomicNumber;
    const mass = isotopeMassNumber || element.defaultIsotope;
    this.neutrons = Math.max(0, mass - element.atomicNumber);
    this.shells = [...element.shells];
    this.selectedShellIndex = this.shells.length - 1;
    this.pendingRemoveShellIndex = null;
    this.rebuildNucleusGeometry();
    this.updateUI();
  }

  pushUndoState() {
    this.undoStack.push({
      protons: this.protons,
      neutrons: this.neutrons,
      shells: [...this.shells],
      selectedShellIndex: this.selectedShellIndex,
    });
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  undo() {
    if (this.undoStack.length === 0) return;
    this.redoStack.push({
      protons: this.protons,
      neutrons: this.neutrons,
      shells: [...this.shells],
      selectedShellIndex: this.selectedShellIndex,
    });
    const prev = this.undoStack.pop();
    this.protons = prev.protons;
    this.neutrons = prev.neutrons;
    this.shells = [...prev.shells];
    this.selectedShellIndex = Math.min(prev.selectedShellIndex, Math.max(0, this.shells.length - 1));
    this.pendingRemoveShellIndex = null;
    this.rebuildNucleusGeometry();
    this.updateUI();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    this.undoStack.push({
      protons: this.protons,
      neutrons: this.neutrons,
      shells: [...this.shells],
      selectedShellIndex: this.selectedShellIndex,
    });
    const next = this.redoStack.pop();
    this.protons = next.protons;
    this.neutrons = next.neutrons;
    this.shells = [...next.shells];
    this.selectedShellIndex = Math.min(next.selectedShellIndex, Math.max(0, this.shells.length - 1));
    this.pendingRemoveShellIndex = null;
    this.rebuildNucleusGeometry();
    this.updateUI();
  }

  addElectronToShell(shellIndex, ripplePos = null) {
    if (shellIndex < 0 || shellIndex >= this.shells.length) return;
    this.pushUndoState();
    this.shells[shellIndex] += 1;
    this.selectedShellIndex = shellIndex;

    const newElectronIdx = this.shells[shellIndex] - 1;
    this.spawnAnimations.push({
      shellIndex,
      electronIndex: newElectronIdx,
      spawnTime: performance.now(),
    });

    if (ripplePos) {
      this.rippleEffects.push({
        x: ripplePos.x,
        y: ripplePos.y,
        color: '#55e686',
        startTime: performance.now(),
      });
    }

    this.updateUI();
  }

  removeElectronFromShell(shellIndex, ripplePos = null) {
    if (shellIndex < 0 || shellIndex >= this.shells.length) return;
    if (this.shells[shellIndex] <= 0) return;

    this.pushUndoState();
    this.shells[shellIndex] -= 1;
    this.selectedShellIndex = shellIndex;

    if (ripplePos) {
      this.rippleEffects.push({
        x: ripplePos.x,
        y: ripplePos.y,
        color: '#fb7185',
        startTime: performance.now(),
      });
    }

    this.updateUI();
  }

  requestRemoveShell(shellIndex) {
    if (shellIndex < 0 || shellIndex >= this.shells.length) return;
    if (this.shells.length <= 1) {
      // Keep at least 1 shell (K)
      return;
    }

    const countInShell = this.shells[shellIndex];
    if (countInShell === 0) {
      // Empty shell: safe to remove immediately
      this.pushUndoState();
      this.shells.splice(shellIndex, 1);
      this.selectedShellIndex = Math.min(this.selectedShellIndex, this.shells.length - 1);
      this.pendingRemoveShellIndex = null;
      this.updateUI();
    } else {
      // Never silently delete electrons! Ask user to confirm or move electrons to another shell
      this.pendingRemoveShellIndex = shellIndex;
      this.renderRemoveShellConfirmation();
    }
  }

  renderRemoveShellConfirmation() {
    const idx = this.pendingRemoveShellIndex;
    if (idx === null || idx < 0 || idx >= this.shells.length) {
      this.confirmBannerEl.hidden = true;
      this.confirmBannerEl.innerHTML = '';
      return;
    }

    const label = SHELL_LABELS[idx];
    const count = this.shells[idx];
    const otherShellOptions = this.shells
      .map((c, i) => ({ index: i, label: SHELL_LABELS[i], count: c }))
      .filter((s) => s.index !== idx);

    this.confirmBannerEl.hidden = false;
    this.confirmBannerEl.innerHTML = `
      <div class="confirm-title" id="ed-confirm-title">
        ⚠️ Vrstva <strong>${label} (n=${idx + 1})</strong> obsahuje <strong>${count} e⁻</strong>
      </div>
      <p class="confirm-text">
        Elektróny sa pri odstraňovaní vrstvy nikdy nemažú bez potvrdenia. Chceš presunúť týchto ${count} elektrónov do inej vrstvy, alebo vymazať vrstvu aj s elektrónmi?
      </p>
      <div class="confirm-actions">
        ${
          otherShellOptions.length > 0
            ? `<div class="confirm-transfer-row">
                <label for="ed-transfer-target">Presunúť do:</label>
                <select id="ed-transfer-target" class="ed-transfer-select">
                  ${otherShellOptions
                    .map(
                      (s) =>
                        `<option value="${s.index}">Vrstva ${s.label} (aktuálne ${s.count} e⁻)</option>`
                    )
                    .join('')}
                </select>
                <button type="button" class="ed-confirm-btn ed-confirm-move" id="ed-confirm-move-btn">
                  Presunúť ${count} e⁻ a odstrániť vrstvu
                </button>
              </div>`
            : ''
        }
        <div class="confirm-bottom-btns">
          <button type="button" class="ed-confirm-btn ed-confirm-delete" id="ed-confirm-delete-btn">
            Vymazať vrstvu aj s ${count} e⁻
          </button>
          <button type="button" class="ed-confirm-btn ed-confirm-cancel" id="ed-confirm-cancel-btn">
            Zrušiť
          </button>
        </div>
      </div>
    `;

    const moveBtn = this.confirmBannerEl.querySelector('#ed-confirm-move-btn');
    const targetSelect = this.confirmBannerEl.querySelector('#ed-transfer-target');
    if (moveBtn && targetSelect) {
      moveBtn.addEventListener('click', () => {
        const targetIdx = Number(targetSelect.value);
        this.pushUndoState();
        this.shells[targetIdx] += this.shells[idx];
        this.shells.splice(idx, 1);
        this.selectedShellIndex = Math.min(this.selectedShellIndex, this.shells.length - 1);
        this.pendingRemoveShellIndex = null;
        this.updateUI();
      });
    }

    const deleteBtn = this.confirmBannerEl.querySelector('#ed-confirm-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        this.pushUndoState();
        this.shells.splice(idx, 1);
        this.selectedShellIndex = Math.min(this.selectedShellIndex, this.shells.length - 1);
        this.pendingRemoveShellIndex = null;
        this.updateUI();
      });
    }

    const cancelBtn = this.confirmBannerEl.querySelector('#ed-confirm-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.pendingRemoveShellIndex = null;
        this.renderRemoveShellConfirmation();
      });
    }
  }

  updateCanvasHoverState() {
    if (this.pointerCanvasX === null || this.pointerCanvasY === null) return;
    const px = this.pointerCanvasX;
    const py = this.pointerCanvasY;

    // 1. Check if pointer is hovering over an existing electron sphere
    let hitElectron = null;
    for (const eObj of this.renderedElectrons) {
      const dist = Math.hypot(px - eObj.x, py - eObj.y);
      if (dist <= Math.max(11, eObj.r + 6)) {
        hitElectron = eObj;
        break;
      }
    }

    if (hitElectron) {
      this.hoveredElectron = hitElectron;
      this.hoveredShellIndex = hitElectron.shellIndex;
      this.canvas.style.cursor = 'pointer';
      const shLabel = SHELL_LABELS[hitElectron.shellIndex];
      this.statusEl.innerHTML = `Kliknutím <strong>odstrániš elektrón (−1 e⁻)</strong> z vrstvy <strong>${shLabel}</strong>`;
      return;
    }

    this.hoveredElectron = null;

    // 2. Check if pointer is near any circular shell ring
    const cx = (this.logicalWidth || 400) / 2;
    const cy = (this.logicalHeight || 400) / 2;
    const distFromCenter = Math.hypot(px - cx, py - cy);

    let closestShellIdx = null;
    let minDiff = Infinity;
    for (let i = 0; i < this.renderedShellRadii.length; i++) {
      const diff = Math.abs(distFromCenter - this.renderedShellRadii[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closestShellIdx = i;
      }
    }

    const shellHitThreshold = Math.max(16, 26 - this.shells.length * 1.5);
    if (closestShellIdx !== null && minDiff <= shellHitThreshold) {
      this.hoveredShellIndex = closestShellIdx;
      this.canvas.style.cursor = 'pointer';
      const shLabel = SHELL_LABELS[closestShellIdx];
      const cap = CAPACITY_RULES[this.capacityRuleId].capacities[closestShellIdx];
      this.statusEl.innerHTML = `Kliknutím <strong>pridáš elektrón (+1 e⁻)</strong> do vrstvy <strong>${shLabel} (${this.shells[closestShellIdx]}/${cap})</strong>`;
    } else {
      this.hoveredShellIndex = null;
      this.canvas.style.cursor = 'default';
      this.statusEl.innerHTML =
        'Klikni na vrstvu pre <strong>+1 e⁻</strong> · Klikni na elektrón pre <strong>−1 e⁻</strong>';
    }
  }

  handleCanvasClick(clickX, clickY) {
    this.pointerCanvasX = clickX;
    this.pointerCanvasY = clickY;
    this.updateCanvasHoverState();

    if (this.hoveredElectron) {
      // Clicking an existing electron removes exactly that electron
      const { shellIndex, x, y } = this.hoveredElectron;
      this.removeElectronFromShell(shellIndex, { x, y });
      this.updateCanvasHoverState();
      return;
    }

    if (this.hoveredShellIndex !== null) {
      // Clicking an empty position on a shell adds exactly one electron
      this.addElectronToShell(this.hoveredShellIndex, { x: clickX, y: clickY });
      this.updateCanvasHoverState();
    }
  }

  rebuildNucleusGeometry() {
    const total = this.protons + this.neutrons;
    this.nucleons = [];

    if (total === 1) {
      this.nucleons.push({ x: 0, y: 0, isProton: true });
      return;
    }

    let pRem = this.protons;
    let nRem = this.neutrons;
    const temp = [];

    for (let i = 0; i < total; i++) {
      let isProton;
      if (pRem > 0 && nRem > 0) {
        isProton = pRem / (pRem + nRem) >= ((i * 0.61803398875) % 1);
      } else {
        isProton = pRem > 0;
      }
      if (isProton) pRem--;
      else nRem--;

      const rNorm = total <= 3 ? 0.48 : Math.sqrt((i + 0.5) / total);
      const theta = i * GOLDEN_ANGLE;
      temp.push({
        x: Math.cos(theta) * rNorm,
        y: Math.sin(theta) * rNorm,
        isProton,
      });
    }

    this.nucleons = temp.reverse();
  }

  updateUI() {
    const element = ELEMENTS_BY_NUMBER[this.protons];
    const totalElectrons = this.shells.reduce((acc, n) => acc + n, 0);
    const netCharge = this.protons - totalElectrons;
    const massNumber = this.protons + this.neutrons;

    // Update stepper readouts & button states
    this.protonValEl.textContent = String(this.protons);
    this.neutronValEl.textContent = String(this.neutrons);
    this.electronTotalEl.textContent = String(totalElectrons);

    this.protonMinusBtn.disabled = this.protons <= 1;
    this.protonPlusBtn.disabled = this.protons >= 118;
    this.neutronMinusBtn.disabled = this.neutrons <= 0;
    this.neutronPlusBtn.disabled = this.neutrons >= 200;

    this.undoBtn.disabled = this.undoStack.length === 0;
    this.redoBtn.disabled = this.redoStack.length === 0;

    const maxShellsReached = this.shells.length >= SHELL_LABELS.length;
    this.addShellBtn.disabled = maxShellsReached;
    this.canvasAddShellBtn.disabled = maxShellsReached;

    // Format charge badge & symbol notation
    let chargeStr = '0';
    let chargeSup = '';
    let ionTypeLabel = 'Neutrálny atóm';
    let ionBadgeClass = 'ion-neutral';

    if (netCharge > 0) {
      chargeStr = `+${netCharge}`;
      chargeSup = netCharge === 1 ? '⁺' : `${toSuperscript(netCharge)}⁺`;
      ionTypeLabel = `Kladný ión — Katión (${chargeStr})`;
      ionBadgeClass = 'ion-cation';
    } else if (netCharge < 0) {
      const absC = Math.abs(netCharge);
      chargeStr = `−${absC}`;
      chargeSup = absC === 1 ? '⁻' : `${toSuperscript(absC)}⁻`;
      ionTypeLabel = `Záporný ión — Anión (${chargeStr})`;
      ionBadgeClass = 'ion-anion';
    }

    const catMeta = CATEGORY_MAP[element.category] || { label: element.category };

    // Render Element Identification Banner
    this.elementBannerEl.innerHTML = `
      <div class="ed-el-top">
        <div class="ed-symbol-tile cat-${element.category}">
          <span class="ed-tile-z">${this.protons}</span>
          <span class="ed-tile-sym">${toSuperscript(massNumber)}${element.symbol}${chargeSup}</span>
          <span class="ed-tile-name">${element.name}</span>
        </div>

        <div class="ed-el-meta">
          <div class="ed-ion-badge ${ionBadgeClass}">${ionTypeLabel}</div>
          <h3 class="ed-el-title">
            ${element.name}
            <span class="ed-el-latin">(${element.latinName})</span>
          </h3>
          <span class="ed-el-cat">${catMeta.label} · Značka: <strong>${element.symbol}</strong></span>
        </div>
      </div>

      <div class="ed-metrics-strip">
        <div class="ed-metric-item">
          <span class="ed-m-lbl">Protónové č. (Z)</span>
          <strong class="ed-m-val">${this.protons}</strong>
        </div>
        <div class="ed-metric-item">
          <span class="ed-m-lbl">Neutróny (N)</span>
          <strong class="ed-m-val">${this.neutrons}</strong>
        </div>
        <div class="ed-metric-item">
          <span class="ed-m-lbl">Nukleónové č. (A)</span>
          <strong class="ed-m-val">${massNumber}</strong>
        </div>
        <div class="ed-metric-item">
          <span class="ed-m-lbl">Elektróny (e⁻)</span>
          <strong class="ed-m-val">${totalElectrons}</strong>
        </div>
        <div class="ed-metric-item">
          <span class="ed-m-lbl">Celkový náboj (Q)</span>
          <strong class="ed-m-val ed-charge-val ${ionBadgeClass}">${chargeStr}</strong>
        </div>
      </div>

      <div class="ed-sync-row">
        <span>Vrstvy v editore: <strong>${this.shells.map((c, i) => `${SHELL_LABELS[i]}:${c}`).join(' · ')}</strong></span>
        ${
          this.onSyncToTable
            ? `<button type="button" class="ed-sync-table-btn" id="ed-sync-table-btn" title="Zobraziť prvok ${element.name} v hornej periodickej tabuľke">
                Zobraziť v tabuľke ↑
              </button>`
            : ''
        }
      </div>
    `;

    const syncBtn = this.elementBannerEl.querySelector('#ed-sync-table-btn');
    if (syncBtn && this.onSyncToTable) {
      syncBtn.addEventListener('click', () => {
        this.onSyncToTable(this.protons);
      });
    }

    this.renderShellsList();
    this.renderRemoveShellConfirmation();
    this.renderScientificDiagnostics(element, totalElectrons, netCharge, massNumber);
    this.renderCanvas();
  }

  renderShellsList() {
    const capacities = CAPACITY_RULES[this.capacityRuleId].capacities;

    this.shellsListEl.innerHTML = this.shells
      .map((count, idx) => {
        const label = SHELL_LABELS[idx];
        const cap = capacities[idx] || 32;
        const isOverCap = count > cap;
        const isSelected = idx === this.selectedShellIndex;
        const pct = Math.min(100, Math.round((count / cap) * 100));

        return `
          <div
            class="ed-shell-row ${isSelected ? 'is-selected' : ''} ${isOverCap ? 'is-over-cap' : ''}"
            data-shell-index="${idx}"
            role="listitem"
          >
            <button
              type="button"
              class="ed-shell-select-area"
              data-select-shell="${idx}"
              title="Vybrať vrstvu ${label} (n = ${idx + 1})"
            >
              <span class="ed-sh-badge">${label}</span>
              <div class="ed-sh-info">
                <div class="ed-sh-top">
                  <strong class="ed-sh-name">Vrstva ${label} (n=${idx + 1})</strong>
                  <span class="ed-sh-ratio ${isOverCap ? 'ratio-warn' : ''}">${label}: ${count}/${cap}</span>
                </div>
                <div class="ed-sh-bar-track">
                  <div class="ed-sh-bar-fill" style="width: ${pct}%"></div>
                </div>
              </div>
            </button>

            <div class="ed-sh-controls">
              <button
                type="button"
                class="ed-sh-step-btn"
                data-shell-minus="${idx}"
                ${count <= 0 ? 'disabled' : ''}
                title="Odobrať 1 elektrón z vrstvy ${label}"
                aria-label="Odobrať elektrón z vrstvy ${label}"
              >−</button>
              <button
                type="button"
                class="ed-sh-step-btn ed-sh-plus"
                data-shell-plus="${idx}"
                title="Pridať 1 elektrón do vrstvy ${label}"
                aria-label="Pridať elektrón do vrstvy ${label}"
              >+</button>
              <button
                type="button"
                class="ed-sh-remove-btn"
                data-shell-remove="${idx}"
                ${this.shells.length <= 1 ? 'disabled' : ''}
                title="Odstrániť vrstvu ${label}"
                aria-label="Odstrániť vrstvu ${label}"
              >✕</button>
            </div>
          </div>
        `;
      })
      .join('');

    // Bind events for each row
    this.shellsListEl.querySelectorAll('[data-select-shell]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.selectedShellIndex = Number(btn.dataset.selectShell);
        this.updateUI();
      });
    });

    this.shellsListEl.querySelectorAll('[data-shell-minus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.shellMinus);
        this.removeElectronFromShell(idx);
      });
    });

    this.shellsListEl.querySelectorAll('[data-shell-plus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.shellPlus);
        this.addElectronToShell(idx);
      });
    });

    this.shellsListEl.querySelectorAll('[data-shell-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.shellRemove);
        this.requestRemoveShell(idx);
      });
    });
  }

  /**
   * Analyzes the user-built atom and displays clear scientific feedback/warnings
   * if shell capacities are exceeded, shells are in an excited/non-ground state,
   * or the isotope/ion configuration is unusual.
   */
  renderScientificDiagnostics(element, totalElectrons, netCharge, massNumber) {
    const warnings = [];
    const capacities = CAPACITY_RULES[this.capacityRuleId].capacities;
    const ruleName = CAPACITY_RULES[this.capacityRuleId].label;

    // 1. Check capacity violations per shell
    const overCapShells = [];
    this.shells.forEach((count, idx) => {
      const cap = capacities[idx] || 32;
      if (count > cap) {
        overCapShells.push(`${SHELL_LABELS[idx]} (${count}/${cap})`);
      }
    });

    if (overCapShells.length > 0) {
      warnings.push({
        type: 'error',
        title: 'Prekročená kapacita elektrónovej vrstvy',
        text: `Vrstva ${overCapShells.join(', ')} prekračuje kapacitný limit zvoleného modelu (${ruleName}). Podľa Pauliho vylučovacieho princípu môže vrstva n obsadiť najviac 2n² elektrónov.`,
      });
    }

    // 2. Check for empty inner shells while outer shells have electrons
    for (let i = 0; i < this.shells.length - 1; i++) {
      const hasOuterElectrons = this.shells.slice(i + 1).some((c) => c > 0);
      if (this.shells[i] === 0 && hasOuterElectrons) {
        warnings.push({
          type: 'warn',
          title: `Prázdna vnútorná vrstva ${SHELL_LABELS[i]}`,
          text: `Vnútorná vrstva ${SHELL_LABELS[i]} (n=${i + 1}) je prázdna, zatiaľ čo vyššia vrstva obsahuje elektróny. Takéto usporiadanie je v reálnom atóme vysoko nestabilné — elektróny okamžite prejdú na nižšiu energetickú hladinu.`,
        });
        break;
      }
    }

    // 3. Compare with known ground-state shell distribution for neutral atom
    const trimmedEditorShells = [...this.shells];
    while (trimmedEditorShells.length > 1 && trimmedEditorShells[trimmedEditorShells.length - 1] === 0) {
      trimmedEditorShells.pop();
    }

    const groundShells = element.shells;
    const isExactGroundDistribution =
      totalElectrons === this.protons &&
      trimmedEditorShells.length === groundShells.length &&
      trimmedEditorShells.every((c, i) => c === groundShells[i]);

    if (totalElectrons === this.protons && !isExactGroundDistribution && overCapShells.length === 0) {
      const expectedStr = groundShells.map((c, i) => `${SHELL_LABELS[i]}:${c}`).join(', ');
      warnings.push({
        type: 'warn',
        title: 'Vzbudený (excitovaný) stav — nejde o základný stav',
        text: `Neutrálny atóm prvku ${element.name} (${element.symbol}) má v základnom stave rozloženie elektrónov [${expectedStr}] (${element.electronConfiguration}). Aktuálne rozloženie predstavuje excitovaný alebo nestabilný stav.`,
      });
    }

    // 4. High ionic charge check
    if (Math.abs(netCharge) > 4) {
      warnings.push({
        type: 'warn',
        title: `Extrémny iónový náboj (${netCharge > 0 ? '+' : '−'}${Math.abs(netCharge)})`,
        text: `Voľný ión s nábojom ${netCharge > 0 ? '+' : '−'}${Math.abs(netCharge)} vyžaduje vysokú ionizačnú energiu (alebo vykazuje silné elektrostatické odpudzovanie elektrónov) a v bežných chemických zlúčeninách sa nevyskytuje.`,
      });
    }

    // 5. Isotope check
    const matchingIso = element.isotopes.find((iso) => iso.massNumber === massNumber);
    if (!matchingIso) {
      warnings.push({
        type: 'info',
        title: `Nezvyčajný izotop ${toSuperscript(massNumber)}${element.symbol} (N = ${this.neutrons})`,
        text: `Pre ${element.name} (Z = ${this.protons}) je hlavným referenčným izotopom ${toSuperscript(element.defaultIsotope)}${element.symbol} s ${element.defaultIsotope - this.protons} neutrónmi. Zvolený pomer protónov a neutrónov zodpovedá nestabilnému nuklidu.`,
      });
    }

    if (warnings.length === 0) {
      this.warningsBoxEl.innerHTML = `
        <div class="ed-diag-ok">
          <span class="diag-icon">✓</span>
          <div>
            <strong>Vedecky korektná konfigurácia</strong>
            <p>
              ${
                netCharge === 0
                  ? `Atóm ${toSuperscript(massNumber)}${element.symbol} (${element.name}) je v stabilnom elektricky neutrálnom základnom stave (${element.electronConfiguration}).`
                  : `Ión ${toSuperscript(massNumber)}${element.symbol} s nábojom ${netCharge > 0 ? '+' + netCharge : '−' + Math.abs(netCharge)} neprekračuje kapacitné limity vrstiev.`
              }
            </p>
          </div>
        </div>
      `;
    } else {
      this.warningsBoxEl.innerHTML = `
        <h4 class="ed-diag-heading">Vedecká kontrola konfigurácie (${warnings.length})</h4>
        <div class="ed-diag-list">
          ${warnings
            .map(
              (w) => `
              <div class="ed-diag-item diag-${w.type}">
                <strong>${w.title}</strong>
                <p>${w.text}</p>
              </div>
            `
            )
            .join('')}
        </div>
      `;
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(280, Math.floor(rect.height));

    if (this.canvas.width !== width * dpr || this.canvas.height !== height * dpr) {
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
    }
    this.logicalWidth = width;
    this.logicalHeight = height;
    this.dpr = dpr;
  }

  startLoop() {
    const step = (now) => {
      const dt = Math.min(0.05, (now - this.lastFrameTime) / 1000);
      this.lastFrameTime = now;

      if (this.isAnimating) {
        this.animTime += dt;
      }

      // Clean up expired spawn animations & ripples
      this.spawnAnimations = this.spawnAnimations.filter((s) => now - s.spawnTime < 450);
      this.rippleEffects = this.rippleEffects.filter((r) => now - r.startTime < 500);

      if (this.isAnimating || this.spawnAnimations.length > 0 || this.rippleEffects.length > 0) {
        this.renderCanvas();
        if (this.pointerCanvasX !== null) {
          this.updateCanvasHoverState();
        }
      }

      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  renderCanvas() {
    if (!this.ctx) return;
    if (!this.logicalWidth || !this.logicalHeight) {
      this.resizeCanvas();
    }

    const now = performance.now();
    const ctx = this.ctx;
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    const dpr = this.dpr || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const minDim = Math.min(w, h);
    const maxOuterRadius = minDim * 0.44;
    const innerStartRadius = minDim * 0.145;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const capacities = CAPACITY_RULES[this.capacityRuleId].capacities;
    const numShells = this.shells.length;

    this.renderedShellRadii = [];
    this.renderedElectrons = [];

    // 1. Compute and draw concentric circular electron shells
    for (let idx = 0; idx < numShells; idx++) {
      const r =
        numShells === 1
          ? minDim * 0.30
          : innerStartRadius + ((maxOuterRadius - innerStartRadius) * idx) / Math.max(1, numShells - 1);
      this.renderedShellRadii.push(r);

      const count = this.shells[idx];
      const cap = capacities[idx] || 32;
      const isOverCap = count > cap;
      const isSelected = idx === this.selectedShellIndex;
      const isHoveredShell = idx === this.hoveredShellIndex && !this.hoveredElectron;

      // Shell orbit circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);

      if (isOverCap) {
        ctx.strokeStyle = isLight ? 'rgba(225, 29, 72, 0.78)' : 'rgba(251, 113, 133, 0.85)';
        ctx.lineWidth = isHoveredShell || isSelected ? 3.0 : 2.0;
      } else if (isHoveredShell) {
        ctx.strokeStyle = isLight ? '#146c32' : '#6dd58c';
        ctx.lineWidth = 3.2;
      } else if (isSelected) {
        ctx.strokeStyle = isLight ? 'rgba(20, 108, 50, 0.68)' : 'rgba(109, 213, 140, 0.68)';
        ctx.lineWidth = 2.2;
      } else {
        ctx.strokeStyle = isLight ? 'rgba(20, 108, 50, 0.25)' : 'rgba(109, 213, 140, 0.25)';
        ctx.lineWidth = 1.5;
      }
      ctx.stroke();

      // Shell label pill at top of ring (e.g. K: 2/2)
      const labelY = cy - r;
      const labelText = `${SHELL_LABELS[idx]}: ${count}/${cap}`;
      ctx.font = '700 10.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      const tw = ctx.measureText(labelText).width;
      const bw = tw + 12;
      const bh = 17;

      ctx.fillStyle = isOverCap
        ? isLight
          ? '#ffe4e6'
          : '#3f1520'
        : isSelected || isHoveredShell
        ? isLight
          ? '#a3f4b5'
          : '#005227'
        : isLight
        ? '#e2f0e5'
        : '#18291e';

      ctx.strokeStyle = isOverCap
        ? '#fb7185'
        : isSelected || isHoveredShell
        ? isLight
          ? '#146c32'
          : '#6dd58c'
        : isLight
        ? 'rgba(20, 108, 50, 0.3)'
        : 'rgba(109, 213, 140, 0.3)';
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.roundRect(cx - bw / 2, labelY - bh / 2, bw, bh, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isOverCap
        ? isLight
          ? '#9f1239'
          : '#fecdd3'
        : isSelected || isHoveredShell
        ? isLight
          ? '#00210a'
          : '#89f3a6'
        : isLight
        ? '#14532d'
        : '#a7f3d0';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, cx, labelY + 0.5);
    }

    // 2. If user is hovering over a shell (and not on an existing electron), draw a ghost "+1 e⁻" preview on that shell
    if (
      this.hoveredShellIndex !== null &&
      !this.hoveredElectron &&
      this.pointerCanvasX !== null &&
      this.pointerCanvasY !== null
    ) {
      const r = this.renderedShellRadii[this.hoveredShellIndex];
      const angle = Math.atan2(this.pointerCanvasY - cy, this.pointerCanvasX - cx);
      const gx = cx + Math.cos(angle) * r;
      const gy = cy + Math.sin(angle) * r;

      ctx.save();
      ctx.beginPath();
      ctx.arc(gx, gy, 8.5, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(20, 108, 50, 0.25)' : 'rgba(85, 230, 134, 0.28)';
      ctx.fill();
      ctx.setLineDash([3, 2]);
      ctx.strokeStyle = isLight ? '#146c32' : '#55e686';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Draw visually separated 2D Nucleus in the center
    this.drawEditorNucleus(ctx, cx, cy, innerStartRadius * 0.64, isLight);

    // 4. Draw Electrons on each shell & record their exact positions for direct click hit-testing
    const baseElectronRadius = Math.max(4.6, Math.min(7.2, 7.6 - numShells * 0.35));

    for (let sIdx = 0; sIdx < numShells; sIdx++) {
      const count = this.shells[sIdx];
      const r = this.renderedShellRadii[sIdx];
      const angularSpeed = (sIdx % 2 === 0 ? 1 : -0.82) * (0.65 / (1 + sIdx * 0.28));
      const phase = this.animTime * angularSpeed;
      const shellOffset = sIdx * 0.4 - Math.PI / 2;

      for (let eIdx = 0; eIdx < count; eIdx++) {
        const angle = shellOffset + (2 * Math.PI * eIdx) / count + phase;
        const ex = cx + Math.cos(angle) * r;
        const ey = cy + Math.sin(angle) * r;

        // Check if this electron has an active pop-in spawn animation
        let scale = 1.0;
        const spawnAnim = this.spawnAnimations.find(
          (a) => a.shellIndex === sIdx && a.electronIndex === eIdx
        );
        if (spawnAnim) {
          const t = Math.min(1, (now - spawnAnim.spawnTime) / 360);
          // Spring overshoot curve: 0 -> 1.35 -> 1.0
          scale = t < 0.6 ? (t / 0.6) * 1.35 : 1.35 - ((t - 0.6) / 0.4) * 0.35;
        }

        const isHoveredThisElectron =
          this.hoveredElectron &&
          this.hoveredElectron.shellIndex === sIdx &&
          this.hoveredElectron.electronIndex === eIdx;

        const rad = baseElectronRadius * scale * (isHoveredThisElectron ? 1.28 : 1.0);

        this.renderedElectrons.push({
          shellIndex: sIdx,
          electronIndex: eIdx,
          x: ex,
          y: ey,
          r: baseElectronRadius,
        });

        // Draw electron sphere
        if (isHoveredThisElectron) {
          // Hover ring indicating click-to-remove
          ctx.beginPath();
          ctx.arc(ex, ey, rad + 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 113, 133, 0.28)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(ex, ey, rad, 0, Math.PI * 2);
        ctx.fillStyle = isHoveredThisElectron
          ? '#fb7185'
          : isLight
          ? '#146c32'
          : '#55e686';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isLight ? '#ffffff' : '#062612';
        ctx.stroke();
      }
    }

    // 5. Draw click ripple effects
    for (const rip of this.rippleEffects) {
      const progress = Math.min(1, (now - rip.startTime) / 450);
      const ripR = 6 + progress * 22;
      ctx.save();
      ctx.globalAlpha = 1 - progress;
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, ripR, 0, Math.PI * 2);
      ctx.strokeStyle = rip.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  drawEditorNucleus(ctx, cx, cy, maxNucleusRadius, isLight) {
    const total = this.nucleons.length;
    const clusterRadius = Math.min(
      maxNucleusRadius * 0.82,
      Math.max(8, 4.5 + Math.sqrt(total) * 1.4)
    );

    // Distinct nucleus boundary ring separating nucleus from K-shell
    ctx.beginPath();
    ctx.arc(cx, cy, maxNucleusRadius, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? 'rgba(20, 108, 50, 0.07)' : 'rgba(109, 213, 140, 0.07)';
    ctx.fill();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = isLight ? 'rgba(20, 108, 50, 0.25)' : 'rgba(109, 213, 140, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    const nucleonRadius =
      total === 1
        ? 7.5
        : Math.max(2.3, Math.min(6.2, (clusterRadius / Math.pow(total, 0.36)) * 1.05));

    const protonFill = isLight ? '#e11d48' : '#fb7185';
    const protonStroke = isLight ? '#881337' : '#4c0519';
    const neutronFill = isLight ? '#64748b' : '#94a3b8';
    const neutronStroke = isLight ? '#1e293b' : '#0f172a';

    for (let i = 0; i < total; i++) {
      const n = this.nucleons[i];
      const sx = cx + n.x * clusterRadius;
      const sy = cy + n.y * clusterRadius;

      ctx.beginPath();
      ctx.arc(sx, sy, nucleonRadius, 0, Math.PI * 2);
      ctx.fillStyle = n.isProton ? protonFill : neutronFill;
      ctx.fill();
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = n.isProton ? protonStroke : neutronStroke;
      ctx.stroke();
    }
  }
}
