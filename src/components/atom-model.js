import { SHELL_LABELS } from '../data/elements.js';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Interaktívny 2D Bohrov model atómovej štruktúry (Material 3 Expressive).
 *
 * Vlastnosti:
 * - Čisto 2D rovinné zobrazenie (bez 3D hĺbky).
 * - Ploché 2D usporiadanie jednotlivých protónov a neutrónov v jadre.
 * - Sústredné 2D kruhové elektrónové vrstvy (K..Q) s presným počtom elektrónov.
 * - Plynulá 2D animácia obehu s ovládaním Pozastaviť/Spustiť, priblížením a posunom.
 */
export class AtomModel {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container
   */
  constructor({ container }) {
    this.container = container;
    this.element = null;
    this.massNumber = 1;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.isPaused = Boolean(prefersReducedMotion);
    this.zoom = 1.0;
    this.minZoom = 0.65;
    this.maxZoom = 2.25;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    this.animTime = 0;
    this.lastFrameTime = performance.now();
    this.rafId = null;

    this.nucleons = [];
    this.shellsData = [];

    if (!this.container) return;
    this.initDOM();
    this.bindEvents();
    this.startAnimationLoop();
  }

  initDOM() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="atom-panel-header">
        <div class="atom-title-block">
          <span class="atom-eyebrow">2D Bohrov model atómu</span>
          <h2 class="atom-element-heading" id="atom-heading">1 · Vodík / Hydrogenium (¹H)</h2>
        </div>
        <div class="atom-toolbar" role="toolbar" aria-label="Ovládanie 2D modelu atómu">
          <button type="button" class="atom-ctrl-btn atom-primary-pill" id="atom-pause-btn" aria-pressed="${this.isPaused}" title="Pozastaviť alebo spustiť animáciu obehu elektrónov (Skratka: P)">
            ${this.isPaused ? '▶ Spustiť' : '⏸ Pozastaviť'}
          </button>
          <button type="button" class="atom-ctrl-btn atom-icon-btn" id="atom-zoom-in-btn" title="Priblížiť (+)" aria-label="Priblížiť">+</button>
          <button type="button" class="atom-ctrl-btn atom-icon-btn" id="atom-zoom-out-btn" title="Oddialiť (−)" aria-label="Oddialiť">−</button>
          <button type="button" class="atom-ctrl-btn atom-icon-btn" id="atom-reset-view-btn" title="Resetovať pohľad a priblíženie" aria-label="Resetovať pohľad">⟲</button>
        </div>
      </div>

      <div class="atom-stage-wrapper">
        <canvas id="atom-canvas" class="atom-canvas" aria-label="Animovaný 2D Bohrov model atómu"></canvas>
        <div class="atom-interaction-hint" id="atom-interaction-hint">
          2D rovinný Bohrov model · Ťahaním posúvaj · Kolieskom priblíž
        </div>
      </div>

      <div class="atom-stats-bar" aria-live="polite">
        <div class="particle-stat stat-proton" title="Počet kladne nabitých protónov v jadre (Protónové číslo Z)">
          <span class="particle-dot dot-proton"></span>
          <span class="particle-label">Protóny (p⁺)</span>
          <strong class="particle-value" id="atom-proton-count">1</strong>
        </div>
        <div class="particle-stat stat-neutron" title="Počet elektricky neutrálnych neutrónov v jadre vybraného izotopu (N = A − Z)">
          <span class="particle-dot dot-neutron"></span>
          <span class="particle-label">Neutróny (n⁰)</span>
          <strong class="particle-value" id="atom-neutron-count">0</strong>
        </div>
        <div class="particle-stat stat-electron" title="Počet záporne nabitých elektrónov v obale neutrálneho atómu">
          <span class="particle-dot dot-electron"></span>
          <span class="particle-label">Elektróny (e⁻)</span>
          <strong class="particle-value" id="atom-electron-count">1</strong>
        </div>
      </div>

      <div class="atom-shell-strip" id="atom-shell-strip" aria-label="Rozloženie elektrónov vo vrstvách"></div>

      <p class="atom-disclaimer">
        <span class="disclaimer-badge">2D vzdelávací model</span>
        Zjednodušený 2D Bohrov diagram znázorňujúci obsadenie elektrónových vrstiev a nukleónové zloženie jadra. Mierka je ilustračná; nezobrazuje kvantovomechanické oblaky pravdepodobnosti orbitálov.
      </p>
    `;

    this.canvas = this.container.querySelector('#atom-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.headingEl = this.container.querySelector('#atom-heading');
    this.protonCountEl = this.container.querySelector('#atom-proton-count');
    this.neutronCountEl = this.container.querySelector('#atom-neutron-count');
    this.electronCountEl = this.container.querySelector('#atom-electron-count');
    this.shellStripEl = this.container.querySelector('#atom-shell-strip');
    this.pauseBtn = this.container.querySelector('#atom-pause-btn');
    this.zoomInBtn = this.container.querySelector('#atom-zoom-in-btn');
    this.zoomOutBtn = this.container.querySelector('#atom-zoom-out-btn');
    this.resetViewBtn = this.container.querySelector('#atom-reset-view-btn');
  }

  bindEvents() {
    this.pauseBtn.addEventListener('click', () => {
      this.togglePause();
    });

    this.zoomInBtn.addEventListener('click', () => {
      this.setZoom(this.zoom * 1.18);
    });

    this.zoomOutBtn.addEventListener('click', () => {
      this.setZoom(this.zoom / 1.18);
    });

    this.resetViewBtn.addEventListener('click', () => {
      this.zoom = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.renderFrame();
    });

    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      this.panX = Math.max(-160, Math.min(160, this.panX + dx));
      this.panY = Math.max(-160, Math.min(160, this.panY + dy));
      this.renderFrame();
    });

    const stopDrag = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    };
    this.canvas.addEventListener('pointerup', stopDrag);
    this.canvas.addEventListener('pointercancel', stopDrag);

    this.canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.91;
        this.setZoom(this.zoom * factor);
      },
      { passive: false }
    );

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.renderFrame();
    });
    this.resizeObserver.observe(this.canvas);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseBtn.setAttribute('aria-pressed', String(this.isPaused));
    this.pauseBtn.textContent = this.isPaused ? '▶ Spustiť' : '⏸ Pozastaviť';
  }

  setZoom(nextZoom) {
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, nextZoom));
    this.renderFrame();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(240, Math.floor(rect.width));
    const height = Math.max(240, Math.floor(rect.height));

    if (this.canvas.width !== width * dpr || this.canvas.height !== height * dpr) {
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
    }
    this.logicalWidth = width;
    this.logicalHeight = height;
    this.dpr = dpr;
  }

  /**
   * @param {Object} element
   * @param {number} [isotopeMassNumber]
   */
  setElement(element, isotopeMassNumber) {
    if (!this.container || !element) return;
    this.element = element;
    this.massNumber = isotopeMassNumber || element.defaultIsotope;

    const protons = element.atomicNumber;
    const neutrons = Math.max(0, this.massNumber - protons);
    const electrons = element.atomicNumber;

    const superMass = String(this.massNumber)
      .split('')
      .map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)] || d)
      .join('');

    this.headingEl.textContent = `${element.atomicNumber} · ${element.name} / ${element.latinName} (${superMass}${element.symbol})`;
    this.protonCountEl.textContent = String(protons);
    this.neutronCountEl.textContent = String(neutrons);
    this.electronCountEl.textContent = String(electrons);

    this.shellStripEl.innerHTML = element.shells
      .map(
        (count, idx) => `
        <div class="shell-pill" title="Vrstva ${SHELL_LABELS[idx]} (n = ${idx + 1}): ${count} elektrónov">
          <span class="shell-pill-key">${SHELL_LABELS[idx]}<sub>n=${idx + 1}</sub></span>
          <strong class="shell-pill-val">${count}e⁻</strong>
        </div>
      `
      )
      .join('');

    this.build2DNucleusGeometry(protons, neutrons);
    this.build2DShellsGeometry(element.shells);
    this.resizeCanvas();
    this.renderFrame();
  }

  build2DNucleusGeometry(protons, neutrons) {
    const total = protons + neutrons;
    this.nucleons = [];

    if (total === 1) {
      this.nucleons.push({ x: 0, y: 0, isProton: true });
      return;
    }

    let pRemaining = protons;
    let nRemaining = neutrons;

    const temp = [];
    for (let i = 0; i < total; i++) {
      let isProton;
      if (pRemaining > 0 && nRemaining > 0) {
        isProton = pRemaining / (pRemaining + nRemaining) >= ((i * 0.61803398875) % 1);
      } else {
        isProton = pRemaining > 0;
      }
      if (isProton) {
        pRemaining--;
      } else {
        nRemaining--;
      }

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

  build2DShellsGeometry(shells) {
    const numShells = shells.length;
    this.shellsData = shells.map((count, idx) => {
      const radiusFactor =
        numShells === 1
          ? 0.54
          : 0.26 + (0.67 * idx) / Math.max(1, numShells - 1);

      const electrons = [];
      for (let e = 0; e < count; e++) {
        const shellOffset = idx * 0.35 - Math.PI / 2;
        electrons.push({
          baseAngle: shellOffset + (2 * Math.PI * e) / count,
        });
      }

      return {
        shellIndex: idx,
        label: SHELL_LABELS[idx],
        count,
        radiusFactor,
        angularSpeed: (idx % 2 === 0 ? 1 : -0.82) * (0.95 / (1 + idx * 0.3)),
        electrons,
      };
    });
  }

  startAnimationLoop() {
    const step = (now) => {
      const dt = Math.min(0.05, (now - this.lastFrameTime) / 1000);
      this.lastFrameTime = now;

      if (!this.isPaused) {
        this.animTime += dt;
        this.renderFrame();
      }
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  renderFrame() {
    if (!this.ctx || !this.element) return;
    if (!this.logicalWidth || !this.logicalHeight) {
      this.resizeCanvas();
    }

    const ctx = this.ctx;
    const w = this.logicalWidth;
    const h = this.logicalHeight;
    const dpr = this.dpr || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2 + this.panX;
    const cy = h / 2 + this.panY;
    const minDim = Math.min(w, h);
    const maxRadius = minDim * 0.43 * this.zoom;

    const isLight = document.documentElement.getAttribute('data-theme') !== 'dark';
    const ringStroke = isLight ? 'rgba(37, 99, 235, 0.30)' : 'rgba(96, 165, 250, 0.32)';
    const labelBg = isLight ? '#dbeafe' : '#1e3a8a';
    const labelBorder = isLight ? 'rgba(37, 99, 235, 0.35)' : 'rgba(96, 165, 250, 0.40)';
    const labelText = isLight ? '#1e40af' : '#dbeafe';

    for (const shell of this.shellsData) {
      const r = shell.radiusFactor * maxRadius;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = ringStroke;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const tagY = cy - r;
      const text = `${shell.label}:${shell.count}`;
      ctx.font = '700 10px ui-monospace, SFMono-Regular, Menlo, monospace';
      const metrics = ctx.measureText(text);
      const boxW = metrics.width + 10;
      const boxH = 15;

      ctx.fillStyle = labelBg;
      ctx.strokeStyle = labelBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - boxW / 2, tagY - boxH / 2, boxW, boxH, 7);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = labelText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, cx, tagY + 0.5);
    }

    this.draw2DNucleus(ctx, cx, cy, maxRadius, isLight);

    const numShells = this.shellsData.length;
    const electronRadius = Math.max(3.2, Math.min(5.8, (6.4 - numShells * 0.4) * Math.sqrt(this.zoom)));

    for (const shell of this.shellsData) {
      const r = shell.radiusFactor * maxRadius;
      const phase = this.animTime * shell.angularSpeed;

      for (const elParticle of shell.electrons) {
        const angle = elParticle.baseAngle + phase;
        const ex = cx + Math.cos(angle) * r;
        const ey = cy + Math.sin(angle) * r;
        this.draw2DElectron(ctx, ex, ey, electronRadius, isLight);
      }
    }

    ctx.restore();
  }

  draw2DNucleus(ctx, cx, cy, maxRadius, isLight) {
    const total = this.nucleons.length;
    const maxNucleusRadius = Math.min(
      maxRadius * 0.175,
      Math.max(7, (4.0 + Math.sqrt(total) * 1.45) * this.zoom)
    );

    const nucleonRadius =
      total === 1
        ? Math.max(6.5, 8.5 * this.zoom)
        : Math.max(2.3, Math.min(6.4, (maxNucleusRadius / Math.pow(total, 0.36)) * 1.05));

    ctx.beginPath();
    ctx.arc(cx, cy, maxNucleusRadius + nucleonRadius + 2, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(59, 130, 246, 0.10)';
    ctx.fill();

    const protonFill = isLight ? '#e11d48' : '#fb7185';
    const protonStroke = isLight ? '#881337' : '#4c0519';
    const neutronFill = isLight ? '#64748b' : '#94a3b8';
    const neutronStroke = isLight ? '#1e293b' : '#0f172a';

    for (let i = 0; i < total; i++) {
      const n = this.nucleons[i];
      const sx = cx + n.x * maxNucleusRadius;
      const sy = cy + n.y * maxNucleusRadius;

      ctx.beginPath();
      ctx.arc(sx, sy, nucleonRadius, 0, Math.PI * 2);
      ctx.fillStyle = n.isProton ? protonFill : neutronFill;
      ctx.fill();
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = n.isProton ? protonStroke : neutronStroke;
      ctx.stroke();
    }
  }

  draw2DElectron(ctx, x, y, r, isLight) {
    const electronFill = isLight ? '#2563eb' : '#3b82f6';
    const electronStroke = isLight ? '#ffffff' : '#0f172a';

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = electronFill;
    ctx.fill();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = electronStroke;
    ctx.stroke();
  }
}
