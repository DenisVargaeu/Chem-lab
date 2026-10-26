import { getAtomVisualStyle } from '../data/compounds.js';
import { EXACT_SYMBOL_MAP } from '../lib/formula-parser.js';

const MAX_DRAWN_UNITS = 12;

export class MoleculeVisualizer {
  constructor({ container, onSelectElement }) {
    this.container = container;
    this.onSelectElement = onSelectElement;

    this.parsedData = null;
    this.viewMode = 'all'; // 'all' (všetky molekuly podľa koeficientu) | 'single' (1 molekula detailne)
    this.rotX = 0.22;
    this.rotY = -0.35;
    this.zoom = 1;
    this.autoRotate = false;

    this.isDragging = false;
    this.dragMoved = false;
    this.lastPointer = { x: 0, y: 0 };

    this.hoveredAtom = null;
    this.selectedAtom = null;
    this.renderedHitTargets = [];
    this.rafId = null;

    if (!this.container) return;
    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="mol-viz-header">
        <div class="mol-viz-titles">
          <div class="mol-viz-badge-row">
            <span class="atom-model-badge">Interaktívny model látky</span>
            <span id="mol-viz-structure-badge" class="mol-structure-badge">Overená geometria</span>
          </div>
          <h3 id="mol-viz-heading" class="atom-title">Vizualizácia molekúl</h3>
          <p id="mol-viz-subtitle" class="mol-viz-subtitle">Potiahnutím myšou model otočíte, kliknutím na guľu atómu zobrazíte jeho podrobnosti.</p>
        </div>

        <div class="mol-viz-controls">
          <div class="mol-view-mode-group" role="group" aria-label="Prepínač zobrazenia počtu molekúl">
            <button type="button" id="mol-mode-all-btn" class="mol-mode-btn is-active">
              Všetky molekuly (<span id="mol-mode-all-count">1</span>×)
            </button>
            <button type="button" id="mol-mode-single-btn" class="mol-mode-btn">
              Jedna molekula (1×)
            </button>
          </div>

          <div class="mol-cam-btns">
            <button type="button" id="mol-autorotate-btn" class="atom-ctrl-btn" title="Automatické otáčanie modelu">
              ⟳ Otáčať
            </button>
            <button type="button" id="mol-zoom-in-btn" class="atom-ctrl-btn" title="Priblížiť model">+</button>
            <button type="button" id="mol-zoom-out-btn" class="atom-ctrl-btn" title="Oddialiť model">−</button>
            <button type="button" id="mol-reset-cam-btn" class="atom-ctrl-btn" title="Obnoviť predvolený pohľad">
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Upozornenie pri neznámej presnej štruktúre alebo vysokom koeficiente -->
      <div id="mol-viz-notice" class="mol-viz-notice" hidden></div>

      <!-- Plátno pre interaktívne kreslenie molekúl -->
      <div class="mol-canvas-stage" id="mol-canvas-stage">
        <canvas id="mol-canvas" aria-label="Interaktívne zobrazenie molekúl a atómov"></canvas>
      </div>

      <!-- Legenda prvkov vo vzorci -->
      <div class="mol-legend-bar">
        <span class="mol-legend-title">Legenda prvkov v modeli (kliknite na prvok):</span>
        <div id="mol-element-legend" class="mol-legend-chips"></div>
      </div>

      <!-- Inšpektor kliknutého atómu -->
      <div id="mol-selected-atom-card" class="mol-selected-atom-card" aria-live="polite"></div>
    `;

    this.structureBadgeEl = this.container.querySelector('#mol-viz-structure-badge');
    this.headingEl = this.container.querySelector('#mol-viz-heading');
    this.subtitleEl = this.container.querySelector('#mol-viz-subtitle');
    this.noticeEl = this.container.querySelector('#mol-viz-notice');

    this.modeAllBtn = this.container.querySelector('#mol-mode-all-btn');
    this.modeAllCountEl = this.container.querySelector('#mol-mode-all-count');
    this.modeSingleBtn = this.container.querySelector('#mol-mode-single-btn');

    this.autoRotateBtn = this.container.querySelector('#mol-autorotate-btn');
    this.zoomInBtn = this.container.querySelector('#mol-zoom-in-btn');
    this.zoomOutBtn = this.container.querySelector('#mol-zoom-out-btn');
    this.resetCamBtn = this.container.querySelector('#mol-reset-cam-btn');

    this.stageEl = this.container.querySelector('#mol-canvas-stage');
    this.canvas = this.container.querySelector('#mol-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.legendEl = this.container.querySelector('#mol-element-legend');
    this.atomCardEl = this.container.querySelector('#mol-selected-atom-card');
  }

  bindEvents() {
    if (!this.container) return;

    this.modeAllBtn?.addEventListener('click', () => {
      this.viewMode = 'all';
      this.syncModeButtons();
      this.renderFrame();
    });

    this.modeSingleBtn?.addEventListener('click', () => {
      this.viewMode = 'single';
      this.syncModeButtons();
      this.renderFrame();
    });

    this.autoRotateBtn?.addEventListener('click', () => {
      this.autoRotate = !this.autoRotate;
      this.autoRotateBtn.classList.toggle('is-active', this.autoRotate);
      this.autoRotateBtn.textContent = this.autoRotate ? '⏸Zastaviť' : '⟳ Otáčať';
      if (this.autoRotate) {
        this.startAnimationLoop();
      } else {
        this.stopAnimationLoop();
        this.renderFrame();
      }
    });

    this.zoomInBtn?.addEventListener('click', () => {
      this.zoom = Math.min(2.2, this.zoom * 1.18);
      this.renderFrame();
    });

    this.zoomOutBtn?.addEventListener('click', () => {
      this.zoom = Math.max(0.55, this.zoom / 1.18);
      this.renderFrame();
    });

    this.resetCamBtn?.addEventListener('click', () => {
      this.rotX = 0.22;
      this.rotY = -0.35;
      this.zoom = 1;
      this.renderFrame();
    });

    // Otáčanie a klikanie na atómy na plátne
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragMoved = false;
      this.lastPointer = { x: e.clientX, y: e.clientY };
      this.canvas.setPointerCapture?.(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = e.clientX - this.lastPointer.x;
        const dy = e.clientY - this.lastPointer.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          this.dragMoved = true;
        }
        this.rotY += dx * 0.011;
        this.rotX = Math.max(-1.35, Math.min(1.35, this.rotX + dy * 0.011));
        this.lastPointer = { x: e.clientX, y: e.clientY };
        this.renderFrame();
        return;
      }

      const hit = this.findAtomAt(px, py);
      if (hit !== this.hoveredAtom) {
        this.hoveredAtom = hit;
        this.canvas.style.cursor = hit ? 'pointer' : 'grab';
        this.renderFrame();
      }
    });

    const endPointer = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.canvas.releasePointerCapture?.(e.pointerId);

      if (!this.dragMoved) {
        const rect = this.canvas.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const hit = this.findAtomAt(px, py);
        if (hit) {
          this.selectedAtom = hit;
          this.renderSelectedAtomInspector();
          this.renderFrame();
        }
      }
    };

    this.canvas.addEventListener('pointerup', endPointer);
    this.canvas.addEventListener('pointercancel', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.08 : 0.92;
        this.zoom = Math.max(0.55, Math.min(2.2, this.zoom * factor));
        this.renderFrame();
      },
      { passive: false }
    );

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.stageEl);
    } else {
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  startAnimationLoop() {
    if (this.rafId) return;
    const tick = () => {
      if (!this.autoRotate) {
        this.rafId = null;
        return;
      }
      this.rotY += 0.012;
      this.renderFrame();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stopAnimationLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resizeCanvas() {
    if (!this.stageEl || !this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(260, Math.floor(this.stageEl.clientWidth));
    const height = Math.max(280, Math.floor(this.stageEl.clientHeight));

    const targetW = Math.floor(width * dpr);
    const targetH = Math.floor(height * dpr);

    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.logicalWidth = width;
    this.logicalHeight = height;

    this.renderFrame();
  }

  setFormulaData(parsedData) {
    this.parsedData = parsedData;
    if (!this.container || !parsedData || !parsedData.ok) return;

    // Pri zmene vzorca predvolene ukážeme všetky molekuly, aby napr. 4CO2 hneď ukázalo 4 modely CO2
    this.viewMode = 'all';

    // Nastavíme predvolený vybraný atóm na prvý prvok vo vzorci
    const firstEl = parsedData.elements[0];
    this.selectedAtom = firstEl
      ? {
          symbol: firstEl.symbol,
          role: parsedData.dbEntry?.structure?.atoms?.[0]?.role || 'Atóm v zlúčenine',
          unitIndex: 1,
        }
      : null;

    this.updateHeaderAndNotices();
    this.syncModeButtons();
    this.renderLegend();
    this.renderSelectedAtomInspector();
    this.resizeCanvas();
  }

  syncModeButtons() {
    if (!this.parsedData || !this.parsedData.ok) return;
    const coeff = this.parsedData.coefficient;
    const isIonic = this.parsedData.classification?.isIonic;

    if (this.modeAllCountEl) {
      this.modeAllCountEl.textContent = String(coeff);
    }
    if (this.modeAllBtn) {
      const noun = isIonic ? 'Všetky jednotky' : 'Všetky molekuly';
      this.modeAllBtn.innerHTML = `${noun} (<span>${coeff}</span>×)`;
      this.modeAllBtn.classList.toggle('is-active', this.viewMode === 'all');
    }
    if (this.modeSingleBtn) {
      const singleNoun = isIonic ? 'Jedna jednotka (1×)' : 'Jedna molekula (1×)';
      this.modeSingleBtn.textContent = singleNoun;
      this.modeSingleBtn.classList.toggle('is-active', this.viewMode === 'single');
    }
  }

  updateHeaderAndNotices() {
    const d = this.parsedData;
    if (!d) return;

    const isIonic = d.classification?.isIonic;
    if (this.headingEl) {
      this.headingEl.textContent = `${d.substanceName} — ${d.fullFormulaUnicode}`;
    }

    if (this.subtitleEl) {
      if (d.hasKnownStructure) {
        this.subtitleEl.textContent = `${d.dbEntry.geometryLabel} · Potiahnutím myšou model otočíte, kliknutím na atóm zobrazíte detail.`;
      } else {
        this.subtitleEl.textContent = `Prehľad atómového zloženia (${d.totalAtomsPerUnit} atómov v 1 jednotke) · Kliknutím na guľu atómu zobrazíte detail prvku.`;
      }
    }

    if (this.structureBadgeEl) {
      if (d.hasKnownStructure) {
        this.structureBadgeEl.textContent = isIonic
          ? '⚡ Iónová vzorcová jednotka'
          : '✓ Overená molekulová štruktúra';
        this.structureBadgeEl.className = 'mol-structure-badge is-verified';
      } else {
        this.structureBadgeEl.textContent = 'ℹ Zloženie prvkov (bez väzbovej schémy)';
        this.structureBadgeEl.className = 'mol-structure-badge is-composition';
      }
    }

    const notices = [];
    if (!d.hasKnownStructure && d.totalAtomsPerUnit > 1) {
      notices.push(
        `<strong>Vedecké upozornenie k štruktúre:</strong> Samotný chemický vzorec <code>${d.unitFormulaUnicode}</code> neurčuje jednoznačnú priestorovú geometriu väzieb (alebo nie je v databáze väzbových modelov). Aplikácia preto zámerne <strong>nevymýšľa neoverené väzby</strong> a zobrazuje presné počty atómov jednotlivých prvkov.`
      );
    }
    if (d.dbEntry?.isomerWarning) {
      notices.push(d.dbEntry.isomerWarning);
    }
    if (d.coefficient > MAX_DRAWN_UNITS) {
      notices.push(
        `Pre zachovanie prehľadnosti plátna zobrazujeme prvých <strong>${MAX_DRAWN_UNITS}</strong> samostatných modelov z celkového koeficientu <strong>${d.coefficient}</strong>. Všetky výpočty nižšie zahŕňajú plný počet <strong>${d.coefficient}</strong>.`
      );
    }

    if (this.noticeEl) {
      if (notices.length > 0) {
        this.noticeEl.hidden = false;
        this.noticeEl.innerHTML = notices.map((n) => `<p>${n}</p>`).join('');
      } else {
        this.noticeEl.hidden = true;
        this.noticeEl.innerHTML = '';
      }
    }
  }

  renderLegend() {
    if (!this.legendEl || !this.parsedData?.ok) return;
    this.legendEl.innerHTML = this.parsedData.elements
      .map((el) => {
        const style = getAtomVisualStyle(el.symbol);
        const isSelected = this.selectedAtom?.symbol === el.symbol;
        return `
          <button
            type="button"
            class="mol-legend-chip ${isSelected ? 'is-selected' : ''}"
            data-legend-symbol="${el.symbol}"
            title="Kliknutím vyberiete prvok ${el.name} (${el.latinName})"
          >
            <span
              class="mol-legend-sphere"
              style="background:${style.fill};border-color:${style.stroke};color:${style.text}"
            >${el.symbol}</span>
            <span class="mol-legend-name">${el.name}</span>
            <span class="mol-legend-count">${el.countPerUnit}× / ${el.totalCount}×</span>
          </button>
        `;
      })
      .join('');

    this.legendEl.querySelectorAll('[data-legend-symbol]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sym = btn.dataset.legendSymbol;
        this.selectedAtom = {
          symbol: sym,
          role: 'Vybraný prvok z legendy',
          unitIndex: 1,
        };
        this.renderLegend();
        this.renderSelectedAtomInspector();
        this.renderFrame();
      });
    });
  }

  renderSelectedAtomInspector() {
    if (!this.atomCardEl || !this.parsedData?.ok || !this.selectedAtom) return;
    const sym = this.selectedAtom.symbol;
    const elData = EXACT_SYMBOL_MAP[sym];
    const formulaEl = this.parsedData.elements.find((e) => e.symbol === sym);
    if (!elData || !formulaEl) return;

    const style = getAtomVisualStyle(sym);
    const unitNoun = this.parsedData.classification?.unitLabelLocativeSingular || 'v jednej molekule';

    this.atomCardEl.innerHTML = `
      <div class="mol-atom-inspector-inner">
        <div class="mol-atom-ins-left">
          <div
            class="mol-atom-ins-sphere"
            style="background:${style.fill};border-color:${style.stroke};color:${style.text}"
          >
            <span class="mol-atom-ins-z">${elData.atomicNumber}</span>
            <strong>${elData.symbol}</strong>
          </div>
          <div class="mol-atom-ins-titles">
            <span class="mol-atom-ins-eyebrow">Vybraný atóm v modeli</span>
            <h4>${elData.name} <span class="mol-atom-ins-latin">(${elData.latinName})</span></h4>
            <p class="mol-atom-ins-meta">
              Protónové číslo <strong>Z = ${elData.atomicNumber}</strong> ·
              Relatívna atómová hmotnosť <strong>Aᵣ = ${elData.atomicMassDisplay}</strong> ·
              Počet ${unitNoun}: <strong>${formulaEl.countPerUnit}</strong> ·
              Celkovo vo vzorci (${this.parsedData.fullFormulaUnicode}): <strong>${formulaEl.totalCount}</strong>
            </p>
          </div>
        </div>
        <div class="mol-atom-ins-actions">
          <a href="./prvok.html#${elData.symbol}" class="mol-ins-link mol-ins-link-primary">
            🔬 2D Model a Detail prvku ${elData.symbol} →
          </a>
          <a href="./index.html#${elData.symbol}" class="mol-ins-link">
            📊 Zobraziť v periodickej tabuľke
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Vytvorí 3D uzly a väzby pre jednu jednotku vzorca.
   * Ak má látka overenú štruktúru v databáze, použije ju; inak rozloží atómy do prehľadného prstenca/mriežky bez falošných väzieb.
   */
  getUnitGeometry() {
    const d = this.parsedData;
    if (!d || !d.ok) return { atoms: [], bonds: [], hasBonds: false };

    if (d.hasKnownStructure && d.dbEntry.structure) {
      return {
        atoms: d.dbEntry.structure.atoms,
        bonds: d.dbEntry.structure.bonds || [],
        hasBonds: true,
      };
    }

    // Zostavíme neväzbové zoskupenie jednotlivých atómov podľa počtu v 1 jednotke
    const atomList = [];
    for (const elItem of d.elements) {
      const cap = Math.min(elItem.countPerUnit, 24);
      for (let i = 0; i < cap; i++) {
        atomList.push({
          el: elItem.symbol,
          role: `Atóm prvku ${elItem.name} (zloženie vzorca)`,
        });
      }
    }

    const total = atomList.length;
    if (total === 1) {
      return {
        atoms: [{ ...atomList[0], x: 0, y: 0, z: 0 }],
        bonds: [],
        hasBonds: false,
      };
    }

    // Rozmiestnenie do 2D/3D kružníc (slnečnicová špirála), aby sa atómy neprekrývali
    const positioned = atomList.map((a, idx) => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const r = total <= 4 ? 0.85 : 0.48 * Math.sqrt(idx + 1);
      const theta = idx * goldenAngle;
      return {
        ...a,
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
        z: ((idx % 3) - 1) * 0.18,
      };
    });

    return {
      atoms: positioned,
      bonds: [],
      hasBonds: false,
    };
  }

  findAtomAt(px, py) {
    // Hľadáme od naposledy nakreslených (najbližších k pozorovateľovi)
    for (let i = this.renderedHitTargets.length - 1; i >= 0; i--) {
      const t = this.renderedHitTargets[i];
      const dx = px - t.cx;
      const dy = py - t.cy;
      if (dx * dx + dy * dy <= (t.r + 4) * (t.r + 4)) {
        return t;
      }
    }
    return null;
  }

  renderFrame() {
    if (!this.ctx || !this.logicalWidth || !this.parsedData?.ok) return;

    const ctx = this.ctx;
    const W = this.logicalWidth;
    const H = this.logicalHeight;
    ctx.clearRect(0, 0, W, H);

    const isLight = document.documentElement.getAttribute('data-theme') !== 'dark';
    const d = this.parsedData;

    const unitCountToDraw =
      this.viewMode === 'single' ? 1 : Math.min(d.coefficient, MAX_DRAWN_UNITS);

    // Rozdelenie plátna na bunky pre jednotlivé molekuly (napr. 4CO2 -> 4 bunky vedľa seba / 2x2)
    let cols = 1;
    let rows = 1;
    if (unitCountToDraw === 2) {
      cols = W >= 520 ? 2 : 1;
      rows = Math.ceil(2 / cols);
    } else if (unitCountToDraw === 3) {
      cols = W >= 680 ? 3 : W >= 460 ? 2 : 1;
      rows = Math.ceil(3 / cols);
    } else if (unitCountToDraw === 4) {
      cols = W >= 760 ? 4 : 2;
      rows = Math.ceil(4 / cols);
    } else if (unitCountToDraw > 4) {
      cols = W >= 860 ? 4 : W >= 560 ? 3 : 2;
      rows = Math.ceil(unitCountToDraw / cols);
    }

    const pad = 14;
    const gap = 12;
    const cellW = (W - pad * 2 - gap * (cols - 1)) / cols;
    const cellH = (H - pad * 2 - gap * (rows - 1)) / rows;

    const unitGeom = this.getUnitGeometry();
    this.renderedHitTargets = [];

    for (let u = 0; u < unitCountToDraw; u++) {
      const col = u % cols;
      const row = Math.floor(u / cols);
      const cellX = pad + col * (cellW + gap);
      const cellY = pad + row * (cellH + gap);

      // Plochý rámček karty každej samostatnej molekuly pri zobrazení viacerých molekúl
      if (unitCountToDraw > 1) {
        ctx.save();
        ctx.fillStyle = isLight ? '#ffffff' : 'rgba(37, 99, 235, 0.06)';
        ctx.strokeStyle = isLight ? '#cbd5e1' : 'rgba(96, 165, 250, 0.28)';
        ctx.lineWidth = 1.4;
        this.roundRect(ctx, cellX, cellY, cellW, cellH, 10);
        ctx.fill();
        ctx.stroke();

        // Označenie poradia molekuly (napr. Molekula #1 · CO₂)
        ctx.fillStyle = isLight ? '#2563eb' : '#60a5fa';
        ctx.font = '700 11.5px system-ui, -apple-system, sans-serif';
        const unitLabel = d.classification?.isIonic ? 'Jednotka' : 'Molekula';
        ctx.fillText(
          `${unitLabel} #${u + 1} (${d.unitFormulaUnicode})`,
          cellX + 12,
          cellY + 20
        );
        ctx.restore();
      }

      const centerX = cellX + cellW / 2;
      const centerY = cellY + cellH / 2 + (unitCountToDraw > 1 ? 8 : 0);

      // Mierka podľa veľkosti bunky a rozpätia súradníc modelu
      const maxExtent = Math.max(
        1.45,
        ...unitGeom.atoms.map((a) => Math.hypot(a.x || 0, a.y || 0, a.z || 0) + 0.55)
      );
      const baseScale = (Math.min(cellW, cellH) * 0.42) / maxExtent;
      const scale = baseScale * this.zoom;
      const baseAtomRadius = Math.max(
        13,
        Math.min(28, Math.min(cellW, cellH) * (unitGeom.atoms.length > 10 ? 0.075 : 0.115)) *
          Math.sqrt(this.zoom)
      );

      // 3D rotácia atómov v bunke
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);
      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);

      const projectedAtoms = unitGeom.atoms.map((atom, idx) => {
        const x0 = atom.x || 0;
        const y0 = atom.y || 0;
        const z0 = atom.z || 0;

        // Rotácia okolo Y
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        // Rotácia okolo X
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const radiusFactor = atom.el === 'H' ? 0.74 : 1.0;
        return {
          idx,
          symbol: atom.el,
          charge: atom.charge || null,
          role: atom.role || `Atóm ${atom.el}`,
          unitIndex: u + 1,
          cx: centerX + x1 * scale,
          cy: centerY + y2 * scale,
          zDepth: z2,
          r: baseAtomRadius * radiusFactor,
        };
      });

      // 1. Vykreslenie väzieb (ak sú známe)
      for (const bond of unitGeom.bonds) {
        const a = projectedAtoms[bond.from];
        const b = projectedAtoms[bond.to];
        if (!a || !b) continue;
        this.drawBond(ctx, a, b, bond.order, isLight);
      }

      // 2. Zoradenie atómov podľa hĺbky Z (od najvzdialenejších po najbližšie)
      const sortedAtoms = [...projectedAtoms].sort((a, b) => a.zDepth - b.zDepth);

      // 3. Vykreslenie gúľ atómov so značkami
      for (const pAtom of sortedAtoms) {
        this.drawAtomSphere(ctx, pAtom, isLight);
        this.renderedHitTargets.push(pAtom);
      }
    }
  }

  drawBond(ctx, a, b, order, isLight) {
    const dx = b.cx - a.cx;
    const dy = b.cy - a.cy;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    ctx.save();
    if (order === 'ionic') {
      ctx.strokeStyle = isLight ? 'rgba(37, 99, 235, 0.55)' : 'rgba(96, 165, 250, 0.65)';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(a.cx, a.cy);
      ctx.lineTo(b.cx, b.cy);
      ctx.stroke();
      ctx.restore();
      return;
    }

    const baseColor = isLight ? '#475569' : '#94a3b8';
    ctx.strokeStyle = baseColor;
    ctx.lineCap = 'round';

    if (order === 2) {
      const offset = 4.2;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(a.cx + nx * offset, a.cy + ny * offset);
      ctx.lineTo(b.cx + nx * offset, b.cy + ny * offset);
      ctx.moveTo(a.cx - nx * offset, a.cy - ny * offset);
      ctx.lineTo(b.cx - nx * offset, b.cy - ny * offset);
      ctx.stroke();
    } else if (order === 3) {
      const offset = 5.2;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(a.cx, a.cy);
      ctx.lineTo(b.cx, b.cy);
      ctx.moveTo(a.cx + nx * offset, a.cy + ny * offset);
      ctx.lineTo(b.cx + nx * offset, b.cy + ny * offset);
      ctx.moveTo(a.cx - nx * offset, a.cy - ny * offset);
      ctx.lineTo(b.cx - nx * offset, b.cy - ny * offset);
      ctx.stroke();
    } else {
      ctx.lineWidth = 4.2;
      ctx.beginPath();
      ctx.moveTo(a.cx, a.cy);
      ctx.lineTo(b.cx, b.cy);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawAtomSphere(ctx, pAtom, isLight) {
    const style = getAtomVisualStyle(pAtom.symbol);
    const isHovered =
      this.hoveredAtom &&
      this.hoveredAtom.unitIndex === pAtom.unitIndex &&
      this.hoveredAtom.idx === pAtom.idx;
    const isSelected = this.selectedAtom && this.selectedAtom.symbol === pAtom.symbol;

    ctx.save();

    // Zvýraznenie vybraného/hoverovaného atómu
    if (isHovered || isSelected) {
      ctx.beginPath();
      ctx.arc(pAtom.cx, pAtom.cy, pAtom.r + 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered
        ? isLight
          ? '#2563eb'
          : '#60a5fa'
        : isLight
          ? 'rgba(37, 99, 235, 0.55)'
          : 'rgba(96, 165, 250, 0.55)';
      ctx.lineWidth = isHovered ? 2.6 : 1.8;
      ctx.stroke();
    }

    // Plochý (flat) kruh atómu s výrazným okrajom
    ctx.beginPath();
    ctx.arc(pAtom.cx, pAtom.cy, pAtom.r, 0, Math.PI * 2);
    ctx.fillStyle = style.fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = style.stroke;
    ctx.stroke();

    // Chemická značka v strede gule
    const fontSize = Math.max(10, Math.round(pAtom.r * 0.76));
    ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = style.text;
    ctx.fillText(pAtom.symbol, pAtom.cx, pAtom.cy + 0.5);

    // Ak ide o ión so známym nábojom (napr. Ca²⁺, Na⁺, Cl⁻)
    if (pAtom.charge) {
      const bx = pAtom.cx + pAtom.r * 0.72;
      const by = pAtom.cy - pAtom.r * 0.72;
      ctx.font = '800 10px ui-monospace, monospace';
      ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
      ctx.fillText(pAtom.charge, bx, by);
    }

    ctx.restore();
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
