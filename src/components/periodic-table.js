import {
  ELEMENTS,
  CATEGORY_MAP,
  GROUP_NAMES,
  ELEMENTS_BY_NUMBER,
} from '../data/elements.js';

const STATE_LABELS_SK = {
  solid: 'Pevné',
  liquid: 'Kvapalné',
  gas: 'Plynné',
  unknown: 'Neznáme',
};

export function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Vykresľuje a spravuje interaktívnu 18-stĺpcovú periodickú tabuľku prvkov (so slovenskými a latinskými názvami).
 */
export class PeriodicTable {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container
   * @param {HTMLElement} options.tooltipEl
   * @param {(element: Object) => void} options.onSelectElement
   * @param {(group: number|null) => void} options.onToggleGroup
   * @param {(period: number|null) => void} options.onTogglePeriod
   * @param {(category: string|null) => void} options.onToggleCategory
   */
  constructor({
    container,
    tooltipEl,
    onSelectElement,
    onToggleGroup,
    onTogglePeriod,
    onToggleCategory,
  }) {
    this.container = container;
    this.tooltipEl = tooltipEl;
    this.onSelectElement = onSelectElement;
    this.onToggleGroup = onToggleGroup;
    this.onTogglePeriod = onTogglePeriod;
    this.onToggleCategory = onToggleCategory;

    this.tileMap = new Map(); // atomicNumber -> HTMLButtonElement
    this.coordMap = new Map(); // "row:col" -> atomicNumber
    this.groupHeaderMap = new Map(); // group -> HTMLButtonElement
    this.periodHeaderMap = new Map(); // period -> HTMLButtonElement
    this.seriesMarkerMap = new Map(); // 'lanthanide' | 'actinide' -> HTMLButtonElement

    this.selectedAtomicNumber = 1;
    this.activeFilterState = {
      searchQuery: '',
      category: 'all',
      stateAtSTP: 'all',
      highlightGroup: null,
      highlightPeriod: null,
      previewCategory: null,
    };

    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.tileMap.clear();
    this.coordMap.clear();
    this.groupHeaderMap.clear();
    this.periodHeaderMap.clear();
    this.seriesMarkerMap.clear();

    const scrollWrapper = document.createElement('div');
    scrollWrapper.className = 'ptable-scroll-container';

    const grid = document.createElement('div');
    grid.className = 'ptable-grid';
    grid.setAttribute('role', 'grid');
    grid.setAttribute('aria-label', 'Periodická tabuľka prvkov');

    // Top-left corner cell (Period / Group axis indicator)
    const corner = document.createElement('div');
    corner.className = 'ptable-corner-key';
    corner.style.gridRow = '1';
    corner.style.gridColumn = '1';
    corner.innerHTML = `<span class="axis-g" title="Stĺpce označujú chemické skupiny (1–18)">S→</span><span class="axis-p" title="Riadky označujú periódy (1–7)">P↓</span>`;
    grid.appendChild(corner);

    // Group column headers (1..18) in grid row 1, columns 2..19
    for (let g = 1; g <= 18; g++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ptable-header-btn ptable-group-btn';
      btn.style.gridRow = '1';
      btn.style.gridColumn = String(g + 1);
      btn.dataset.group = String(g);
      const groupName = GROUP_NAMES[g] || `${g}. skupina`;
      btn.setAttribute('aria-label', `Zvýrazniť ${g}. skupinu (${groupName})`);
      btn.title = `${g}. skupina: ${groupName} (Kliknutím zvýrazníš skupinu)`;
      btn.innerHTML = `<span class="hdr-num">${g}</span>`;
      btn.addEventListener('click', () => {
        this.onToggleGroup(g);
      });
      this.groupHeaderMap.set(g, btn);
      grid.appendChild(btn);
    }

    // Period row headers (1..7) in grid rows 2..8, column 1
    for (let p = 1; p <= 7; p++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ptable-header-btn ptable-period-btn';
      btn.style.gridRow = String(p + 1);
      btn.style.gridColumn = '1';
      btn.dataset.period = String(p);
      btn.setAttribute('aria-label', `Zvýrazniť ${p}. periódu`);
      btn.title = `${p}. perióda (Kliknutím zvýrazníš periódu)`;
      btn.innerHTML = `<span class="hdr-num">${p}</span>`;
      btn.addEventListener('click', () => {
        this.onTogglePeriod(p);
      });
      this.periodHeaderMap.set(p, btn);
      grid.appendChild(btn);
    }

    // Group 3 Period 6 & 7 reference cells for Lanthanides (57-71) and Actinides (89-103)
    const lanthMarker = this.createSeriesReferenceCell({
      seriesId: 'lanthanide',
      rangeText: '57–71',
      symbolText: 'La–Lu',
      label: 'Lantanoidy',
      gridRow: 7, // Period 6
      gridColumn: 4, // Group 3
    });
    this.seriesMarkerMap.set('lanthanide', lanthMarker);
    grid.appendChild(lanthMarker);

    const actMarker = this.createSeriesReferenceCell({
      seriesId: 'actinide',
      rangeText: '89–103',
      symbolText: 'Ac–Lr',
      label: 'Aktinoidy',
      gridRow: 8, // Period 7
      gridColumn: 4, // Group 3
    });
    this.seriesMarkerMap.set('actinide', actMarker);
    grid.appendChild(actMarker);

    // Spacer row between main table and f-block rows (gridRow 9)
    const spacer = document.createElement('div');
    spacer.className = 'ptable-fblock-spacer';
    spacer.style.gridRow = '9';
    spacer.style.gridColumn = '1 / 20';
    grid.appendChild(spacer);

    // Row labels for Lanthanide row (gridRow 10) and Actinide row (gridRow 11)
    const lanthRowHeader = document.createElement('button');
    lanthRowHeader.type = 'button';
    lanthRowHeader.className = 'ptable-series-row-label cat-lanthanide';
    lanthRowHeader.style.gridRow = '10';
    lanthRowHeader.style.gridColumn = '2 / 5';
    lanthRowHeader.title = 'Kliknutím vyfiltruješ Lantanoidy (57–71)';
    lanthRowHeader.innerHTML = `<span class="series-title">Lantanoidy</span><span class="series-sub">57–71 · rad 4f</span>`;
    lanthRowHeader.addEventListener('click', () => this.onToggleCategory('lanthanide'));
    grid.appendChild(lanthRowHeader);

    const actRowHeader = document.createElement('button');
    actRowHeader.type = 'button';
    actRowHeader.className = 'ptable-series-row-label cat-actinide';
    actRowHeader.style.gridRow = '11';
    actRowHeader.style.gridColumn = '2 / 5';
    actRowHeader.title = 'Kliknutím vyfiltruješ Aktinoidy (89–103)';
    actRowHeader.innerHTML = `<span class="series-title">Aktinoidy</span><span class="series-sub">89–103 · rad 5f</span>`;
    actRowHeader.addEventListener('click', () => this.onToggleCategory('actinide'));
    grid.appendChild(actRowHeader);

    // Render all 118 element tiles
    for (const el of ELEMENTS) {
      const tile = this.createElementTile(el);
      grid.appendChild(tile);
      this.tileMap.set(el.atomicNumber, tile);
      this.coordMap.set(`${el.gridRow}:${el.gridColumn}`, el.atomicNumber);
    }

    scrollWrapper.appendChild(grid);
    this.container.appendChild(scrollWrapper);
  }

  createSeriesReferenceCell({ seriesId, rangeText, symbolText, label, gridRow, gridColumn }) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `ptable-series-ref cat-${seriesId}`;
    btn.style.gridRow = String(gridRow);
    btn.style.gridColumn = String(gridColumn);
    btn.title = `${label} (${rangeText}): Kliknutím vyfiltruješ ${label}`;
    btn.setAttribute('aria-label', `${label} ${rangeText}, kliknutím filtrovať`);
    btn.innerHTML = `
      <span class="ref-range">${rangeText}</span>
      <span class="ref-sym">${symbolText}</span>
      <span class="ref-name">${label}</span>
    `;
    btn.addEventListener('click', () => {
      this.onToggleCategory(seriesId);
    });
    return btn;
  }

  createElementTile(el) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `element-tile cat-${el.category}`;
    btn.dataset.atomicNumber = String(el.atomicNumber);
    btn.dataset.symbol = el.symbol;
    btn.dataset.category = el.category;

    const cssRow = el.gridRow + 1;
    const cssCol = el.gridColumn + 1;
    btn.style.gridRow = String(cssRow);
    btn.style.gridColumn = String(cssCol);

    const catName = CATEGORY_MAP[el.category]?.label || el.category;
    btn.setAttribute(
      'aria-label',
      `${el.atomicNumber} ${el.name} (${el.latinName}, ${el.symbol}), ${catName}, atómová hmotnosť ${el.atomicMassDisplay}`
    );

    btn.innerHTML = `
      <div class="tile-top">
        <span class="tile-number">${el.atomicNumber}</span>
        ${el.isRadioactive ? '<span class="tile-radio-dot" aria-hidden="true" title="Rádioaktívny prvok"></span>' : ''}
      </div>
      <span class="tile-symbol">${el.symbol}</span>
      <span class="tile-name">${el.name}</span>
      <span class="tile-latin">${el.latinName}</span>
    `;

    btn.addEventListener('click', () => {
      this.onSelectElement(el);
    });

    btn.addEventListener('mouseenter', (e) => {
      this.showTooltip(el, e);
    });
    btn.addEventListener('mousemove', (e) => {
      this.positionTooltip(e);
    });
    btn.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
    btn.addEventListener('keydown', (e) => {
      this.handleTileKeyDown(e, el);
    });

    return btn;
  }

  handleTileKeyDown(e, el) {
    const key = e.key;
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
      return;
    }
    e.preventDefault();

    if (key === 'Home') {
      this.focusAndSelect(1);
      return;
    }
    if (key === 'End') {
      this.focusAndSelect(118);
      return;
    }

    let targetZ = null;
    if (key === 'ArrowRight') {
      targetZ = el.atomicNumber < 118 ? el.atomicNumber + 1 : 1;
    } else if (key === 'ArrowLeft') {
      targetZ = el.atomicNumber > 1 ? el.atomicNumber - 1 : 118;
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      const dir = key === 'ArrowDown' ? 1 : -1;
      targetZ = this.findVerticalNeighbor(el, dir);
    }

    if (targetZ !== null) {
      this.focusAndSelect(targetZ);
    }
  }

  findVerticalNeighbor(el, dir) {
    const rowsOrder = [1, 2, 3, 4, 5, 6, 7, 9, 10];
    const currentIdx = rowsOrder.indexOf(el.gridRow);
    const col = el.gridColumn;

    for (let step = 1; step <= rowsOrder.length; step++) {
      const nextIdx = (currentIdx + dir * step + rowsOrder.length) % rowsOrder.length;
      const candidateRow = rowsOrder[nextIdx];
      const matchZ = this.coordMap.get(`${candidateRow}:${col}`);
      if (matchZ) {
        return matchZ;
      }
      if (col === 3 && candidateRow === 9) return 57;
      if (col === 3 && candidateRow === 10) return 89;
    }
    return el.atomicNumber;
  }

  focusAndSelect(atomicNumber) {
    const targetEl = ELEMENTS_BY_NUMBER[atomicNumber];
    const tile = this.tileMap.get(atomicNumber);
    if (targetEl && tile) {
      tile.focus();
      this.onSelectElement(targetEl);
    }
  }

  setSelectedElement(atomicNumber) {
    const prevTile = this.tileMap.get(this.selectedAtomicNumber);
    if (prevTile) {
      prevTile.classList.remove('is-selected');
      prevTile.setAttribute('aria-selected', 'false');
    }

    this.selectedAtomicNumber = atomicNumber;
    const nextTile = this.tileMap.get(atomicNumber);
    if (nextTile) {
      nextTile.classList.add('is-selected');
      nextTile.setAttribute('aria-selected', 'true');
    }
  }

  /**
   * Aplikuje vyhľadávanie (vrátane slovenských a latinských názvov bez diakritiky),
   * filtrovanie podľa kategórie, skupenstva a zvýraznenie skupiny/periódy.
   */
  applyFilters(filterState) {
    this.activeFilterState = { ...this.activeFilterState, ...filterState };
    const {
      searchQuery,
      category,
      stateAtSTP,
      highlightGroup,
      highlightPeriod,
      previewCategory,
    } = this.activeFilterState;

    const queryNorm = normalizeText((searchQuery || '').trim());
    const hasFilter =
      queryNorm.length > 0 ||
      (category && category !== 'all') ||
      (stateAtSTP && stateAtSTP !== 'all') ||
      highlightGroup !== null ||
      highlightPeriod !== null ||
      previewCategory !== null;

    for (const [g, btn] of this.groupHeaderMap.entries()) {
      btn.classList.toggle('is-active', highlightGroup === g);
    }
    for (const [p, btn] of this.periodHeaderMap.entries()) {
      btn.classList.toggle('is-active', highlightPeriod === p);
    }

    const matchedElements = [];

    for (const el of ELEMENTS) {
      const tile = this.tileMap.get(el.atomicNumber);
      if (!tile) continue;

      let matchesSearch = true;
      if (queryNorm.length > 0) {
        const isNumberPrefix = String(el.atomicNumber).startsWith(queryNorm);
        const isSymbolMatch = el.symbol.toLowerCase().includes(queryNorm);
        const isSkNameMatch = normalizeText(el.name).includes(queryNorm);
        const isLatinNameMatch = normalizeText(el.latinName).includes(queryNorm);
        const isEnNameMatch = normalizeText(el.englishName).includes(queryNorm);
        matchesSearch =
          isNumberPrefix || isSymbolMatch || isSkNameMatch || isLatinNameMatch || isEnNameMatch;
      }

      const activeCategory = previewCategory || (category !== 'all' ? category : null);
      const matchesCategory = !activeCategory || el.category === activeCategory;
      const matchesState = !stateAtSTP || stateAtSTP === 'all' || el.stateAtSTP === stateAtSTP;

      let matchesGroup = true;
      if (highlightGroup !== null) {
        if (highlightGroup === 3) {
          matchesGroup =
            el.group === 3 || el.category === 'lanthanide' || el.category === 'actinide';
        } else {
          matchesGroup = el.group === highlightGroup;
        }
      }

      const matchesPeriod = highlightPeriod === null || el.period === highlightPeriod;

      const isMatch =
        matchesSearch && matchesCategory && matchesState && matchesGroup && matchesPeriod;

      if (isMatch) {
        matchedElements.push(el);
      }

      tile.classList.toggle('is-dimmed', hasFilter && !isMatch);
      tile.classList.toggle('is-highlighted', hasFilter && isMatch);
    }

    const lanthMarker = this.seriesMarkerMap.get('lanthanide');
    if (lanthMarker) {
      const lanthDimmed =
        hasFilter &&
        ((previewCategory && previewCategory !== 'lanthanide') ||
          (category !== 'all' && category !== 'lanthanide') ||
          (highlightPeriod !== null && highlightPeriod !== 6) ||
          (highlightGroup !== null && highlightGroup !== 3));
      lanthMarker.classList.toggle('is-dimmed', Boolean(lanthDimmed));
    }

    const actMarker = this.seriesMarkerMap.get('actinide');
    if (actMarker) {
      const actDimmed =
        hasFilter &&
        ((previewCategory && previewCategory !== 'actinide') ||
          (category !== 'all' && category !== 'actinide') ||
          (highlightPeriod !== null && highlightPeriod !== 7) ||
          (highlightGroup !== null && highlightGroup !== 3));
      actMarker.classList.toggle('is-dimmed', Boolean(actDimmed));
    }

    return matchedElements;
  }

  showTooltip(el, event) {
    if (!this.tooltipEl) return;
    const catLabel = CATEGORY_MAP[el.category]?.label || el.category;
    const stateLabel = STATE_LABELS_SK[el.stateAtSTP] || el.stateAtSTP;
    const shellsText = el.shells.join(' · ');

    this.tooltipEl.innerHTML = `
      <div class="tt-header">
        <span class="tt-sym cat-badge-${el.category}">${el.symbol}</span>
        <div class="tt-title-wrap">
          <strong class="tt-name">${el.name} <span class="tt-latin">(${el.latinName})</span></strong>
          <span class="tt-cat">${catLabel}</span>
        </div>
        <span class="tt-z">Z = ${el.atomicNumber}</span>
      </div>
      <div class="tt-grid">
        <span>Hmotnosť: <strong>${el.atomicMassDisplay}</strong></span>
        <span>Skupenstvo: <strong>${stateLabel}</strong></span>
        <span>Vrstvy: <strong>${shellsText}</strong></span>
        <span>Konfig.: <strong>${el.electronConfiguration}</strong></span>
      </div>
    `;
    this.tooltipEl.classList.add('is-visible');
    this.tooltipEl.setAttribute('aria-hidden', 'false');
    this.positionTooltip(event);
  }

  positionTooltip(event) {
    if (!this.tooltipEl || !this.tooltipEl.classList.contains('is-visible')) return;
    const offset = 14;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = this.tooltipEl.getBoundingClientRect();

    let left = event.clientX + offset;
    let top = event.clientY + offset;

    if (left + rect.width + 12 > vw) {
      left = event.clientX - rect.width - offset;
    }
    if (top + rect.height + 12 > vh) {
      top = event.clientY - rect.height - offset;
    }

    this.tooltipEl.style.transform = `translate3d(${Math.max(8, left)}px, ${Math.max(8, top)}px, 0)`;
  }

  hideTooltip() {
    if (!this.tooltipEl) return;
    this.tooltipEl.classList.remove('is-visible');
    this.tooltipEl.setAttribute('aria-hidden', 'true');
  }
}
