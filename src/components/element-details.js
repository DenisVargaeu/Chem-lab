import {
  CATEGORY_MAP,
  GROUP_NAMES,
  SHELL_LABELS,
  ELEMENTS_BY_NUMBER,
} from '../data/elements.js';

const SHELL_CAPACITIES = [2, 8, 18, 32, 32, 18, 8];

const STATE_LABELS_SK = {
  solid: 'Pevné (tuhé)',
  liquid: 'Kvapalné',
  gas: 'Plynné',
  unknown: 'Neznáme / Predpokladané (syntetický prvok)',
};

function formatKelvinAndCelsius(kelvin) {
  if (kelvin === null || kelvin === undefined) {
    return null;
  }
  const celsius = kelvin - 273.15;
  const kStr = Number.isInteger(kelvin) ? String(kelvin) : kelvin.toFixed(2).replace(/\.?0+$/, '');
  const cStr = celsius.toFixed(2).replace(/\.?0+$/, '');
  return `${kStr} K (${cStr} °C)`;
}

function toSuperscript(num) {
  return String(num)
    .split('')
    .map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)] || d)
    .join('');
}

/**
 * Vykresľuje panel detailu vybraného prvku v slovenčine, vrátane slovenského a latinského názvu,
 * interaktívneho výberu izotopu, elektrónovej konfigurácie a fyzikálno-chemických vlastností.
 */
export class ElementDetails {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container
   * @param {(massNumber: number) => void} options.onSelectIsotope
   * @param {(element: Object) => void} options.onNavigateElement
   * @param {(group: number) => void} options.onHighlightGroup
   * @param {(period: number) => void} options.onHighlightPeriod
   */
  constructor({
    container,
    onSelectIsotope,
    onNavigateElement,
    onHighlightGroup,
    onHighlightPeriod,
    onOpenInEditor,
  }) {
    this.container = container;
    this.onSelectIsotope = onSelectIsotope;
    this.onNavigateElement = onNavigateElement;
    this.onHighlightGroup = onHighlightGroup;
    this.onHighlightPeriod = onHighlightPeriod;
    this.onOpenInEditor = onOpenInEditor;

    this.currentElement = null;
    this.selectedMassNumber = null;
  }

  /**
   * @param {Object} element
   * @param {number} [massNumber]
   */
  render(element, massNumber) {
    this.currentElement = element;
    this.selectedMassNumber = massNumber || element.defaultIsotope;

    const categoryMeta = CATEGORY_MAP[element.category] || { label: element.category };
    const selectedIso =
      element.isotopes.find((iso) => iso.massNumber === this.selectedMassNumber) ||
      element.isotopes[0];

    const protons = element.atomicNumber;
    const neutrons = selectedIso.massNumber - protons;
    const electrons = element.atomicNumber;

    const stateLabel = STATE_LABELS_SK[element.stateAtSTP] || element.stateAtSTP;

    let groupDisplay;
    if (element.group !== null) {
      const gName = GROUP_NAMES[element.group];
      groupDisplay = gName ? `${element.group}. skupina (${gName})` : `${element.group}. skupina`;
    } else if (element.category === 'lanthanide') {
      groupDisplay = 'Lantanoidy (f-blok, 3. skupina)';
    } else {
      groupDisplay = 'Aktinoidy (f-blok, 3. skupina)';
    }

    let electronegativityDisplay;
    if (element.electronegativity !== null && element.electronegativity !== undefined) {
      electronegativityDisplay = `${element.electronegativity.toFixed(2)} (Paulingova stupnica)`;
    } else if (element.category === 'noble-gas' && element.atomicNumber < 118) {
      electronegativityDisplay = 'Neuvádza sa (inertný vzácny plyn)';
    } else {
      electronegativityDisplay = 'Nedostupné (syntetický prvok, krátky polčas rozpadu)';
    }

    const meltingDisplay =
      formatKelvinAndCelsius(element.meltingPointK) ||
      'Nedostupné (syntetický / nemerané)';
    const boilingDisplay =
      formatKelvinAndCelsius(element.boilingPointK) ||
      'Nedostupné (syntetický / nemerané)';

    const prevZ = element.atomicNumber > 1 ? element.atomicNumber - 1 : 118;
    const nextZ = element.atomicNumber < 118 ? element.atomicNumber + 1 : 1;
    const prevEl = ELEMENTS_BY_NUMBER[prevZ];
    const nextEl = ELEMENTS_BY_NUMBER[nextZ];

    this.container.innerHTML = `
      <div class="details-header">
        <div class="details-symbol-box cat-${element.category}">
          <span class="details-z">${element.atomicNumber}</span>
          <span class="details-sym">${element.symbol}</span>
          <span class="details-mass">${element.atomicMassDisplay}</span>
        </div>

        <div class="details-title-area">
          <div class="details-badges">
            <span class="badge-category cat-pill-${element.category}">${categoryMeta.label}</span>
            <span class="badge-state state-${element.stateAtSTP}" title="Skupenstvo pri štandardnej teplote a tlaku (20 °C, 1 atm)">
              STP: ${stateLabel}
            </span>
            ${
              element.isRadioactive
                ? '<span class="badge-radioactive" title="Všetky izotopy tohto prvku sú rádioaktívne (nemá stabilné izotopy)">☢ Rádioaktívny</span>'
                : '<span class="badge-stable" title="Prvok má aspoň jeden stabilný izotop">Stabilný nuklid</span>'
            }
          </div>

          <h2 class="details-name">
            ${element.name}
            <span class="details-latin-inline" title="Latinský názov prvku">(${element.latinName})</span>
          </h2>

          <div class="details-submeta">
            <span>Protónové číslo (Z): <strong>${element.atomicNumber}</strong></span>
            <span class="meta-sep">·</span>
            <span>Latinský názov: <strong>${element.latinName}</strong></span>
            <span class="meta-sep">·</span>
            <span title="${
              element.isMassBracketed
                ? 'Nukleónové číslo najstabilnejšieho známeho izotopu (prvok nemá stabilné prírodné izotopové zloženie)'
                : 'Štandardná relatívna atómová hmotnosť (vážený priemer prírodných izotopov podľa IUPAC)'
            }">
              Relatívna atómová hmotnosť (Aᵣ): <strong>${element.atomicMassDisplay}</strong>
              ${element.isMassBracketed ? '<em class="meta-note">(najstabilnejší izotop)</em>' : ''}
            </span>
          </div>
        </div>

        <div class="details-nav-btns">
          <button type="button" class="nav-el-btn" id="detail-open-editor-btn" title="Načítať prvok ${element.name} do interaktívneho editora atómu nižšie">
            ⚛ Upraviť v editore ↓
          </button>
          <button type="button" class="nav-el-btn" id="detail-prev-btn" title="Predchádzajúci prvok: ${prevEl.atomicNumber} ${prevEl.name} (${prevEl.latinName}, ${prevEl.symbol})">
            ← ${prevEl.symbol}
          </button>
          <button type="button" class="nav-el-btn" id="detail-next-btn" title="Ďalší prvok: ${nextEl.atomicNumber} ${nextEl.name} (${nextEl.latinName}, ${nextEl.symbol})">
            ${nextEl.symbol} →
          </button>
        </div>
      </div>

      <p class="details-summary">${element.summary}</p>

      <!-- Izotop a subatómové častice -->
      <div class="details-section">
        <div class="section-header-row">
          <h3 class="section-title">Vybraný neutrálny izotop a subatómové častice</h3>
          <label class="isotope-select-label" for="isotope-selector">
            <span>Izotop:</span>
            <select id="isotope-selector" class="isotope-select" aria-label="Vyber izotop prvku ${element.name}">
              ${element.isotopes
                .map(
                  (iso) => `
                  <option value="${iso.massNumber}" ${
                    iso.massNumber === selectedIso.massNumber ? 'selected' : ''
                  }>
                    ${iso.name} — ${iso.abundance}
                  </option>
                `
                )
                .join('')}
            </select>
          </label>
        </div>

        <div class="nucleon-cards-grid">
          <div class="nucleon-card card-protons">
            <span class="nc-label">Protóny (Z)</span>
            <strong class="nc-val">${protons}</strong>
            <span class="nc-sub">Určuje prvok ${element.symbol} (${element.name})</span>
          </div>
          <div class="nucleon-card card-neutrons">
            <span class="nc-label">Neutróny (N = A − Z)</span>
            <strong class="nc-val">${neutrons}</strong>
            <span class="nc-sub">Pre izotop ${toSuperscript(selectedIso.massNumber)}${element.symbol} (A = ${selectedIso.massNumber})</span>
          </div>
          <div class="nucleon-card card-electrons">
            <span class="nc-label">Elektróny (neutrálny atóm)</span>
            <strong class="nc-val">${electrons}</strong>
            <span class="nc-sub">Obsadené vrstvy: ${element.shells.length}</span>
          </div>
        </div>

        <div class="isotope-meta-bar">
          <span>Zápis nuklidu: <strong>${toSuperscript(selectedIso.massNumber)}${element.symbol}</strong></span>
          <span>Stabilita: <strong>${selectedIso.stable ? 'Stabilný izotop' : 'Rádioaktívny izotop'}</strong></span>
          <span>Zastúpenie / Polčas rozpadu: <strong>${selectedIso.abundance}</strong></span>
        </div>
      </div>

      <!-- Elektrónová konfigurácia a vrstvy -->
      <div class="details-section">
        <div class="section-header-row">
          <h3 class="section-title">Elektrónová konfigurácia a rozdelenie vo vrstvách</h3>
          ${
            element.isConfigurationException
              ? '<span class="exception-badge" title="Konfigurácia základného stavu sa odchyľuje od jednoduchého Madelungovho pravidla (n + l) v dôsledku výmennej energie alebo relativistických javov">Madelungova výnimka</span>'
              : ''
          }
        </div>

        <div class="config-box">
          <div class="config-row">
            <span class="config-key">Skrátený zápis:</span>
            <code class="config-code">${element.electronConfiguration}</code>
          </div>
          ${
            element.electronConfigurationFull !== element.electronConfiguration
              ? `<div class="config-row">
                  <span class="config-key">Úplný spektroskopický:</span>
                  <code class="config-code config-full">${element.electronConfigurationFull}</code>
                </div>`
              : ''
          }
        </div>

        <div class="shells-bars-grid" aria-label="Počet elektrónov v jednotlivých vrstvách">
          ${element.shells
            .map((count, idx) => {
              const cap = SHELL_CAPACITIES[idx] || 32;
              const pct = Math.min(100, Math.round((count / cap) * 100));
              return `
                <div class="shell-bar-item" title="Vrstva ${SHELL_LABELS[idx]} (n = ${idx + 1}): ${count} elektrónov">
                  <div class="shell-bar-top">
                    <span class="shell-name">Vrstva ${SHELL_LABELS[idx]} (n=${idx + 1})</span>
                    <strong class="shell-count">${count} e⁻</strong>
                  </div>
                  <div class="shell-progress-track">
                    <div class="shell-progress-fill" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Fyzikálne a chemické vlastnosti -->
      <div class="details-section">
        <h3 class="section-title">Fyzikálne, periodické a termodynamické vlastnosti</h3>
        <dl class="props-grid">
          <div class="prop-item">
            <dt>Slovenský a latinský názov</dt>
            <dd><span>${element.name} / <em>${element.latinName}</em></span></dd>
          </div>
          <div class="prop-item">
            <dt>Chemická skupina</dt>
            <dd>
              <span>${groupDisplay}</span>
              <button type="button" class="inline-action-btn" id="highlight-group-btn" title="Zvýrazniť túto skupinu v periodickej tabuľke">
                Zvýrazniť
              </button>
            </dd>
          </div>
          <div class="prop-item">
            <dt>Perióda a blok</dt>
            <dd>
              <span>${element.period}. perióda · ${element.block}-blok</span>
              <button type="button" class="inline-action-btn" id="highlight-period-btn" title="Zvýrazniť ${element.period}. periódu v periodickej tabuľke">
                Zvýrazniť
              </button>
            </dd>
          </div>
          <div class="prop-item">
            <dt>Kategória prvku</dt>
            <dd>${categoryMeta.label}</dd>
          </div>
          <div class="prop-item">
            <dt>Skupenstvo pri STP (20 °C, 1 atm)</dt>
            <dd>${stateLabel}</dd>
          </div>
          <div class="prop-item">
            <dt>Elektronegativita</dt>
            <dd>${electronegativityDisplay}</dd>
          </div>
          <div class="prop-item">
            <dt>Teplota topenia (1 atm)</dt>
            <dd>${meltingDisplay}</dd>
          </div>
          <div class="prop-item">
            <dt>Teplota varu (1 atm)</dt>
            <dd>${boilingDisplay}</dd>
          </div>
        </dl>

        ${
          element.isMassBracketed
            ? `<p class="scientific-data-note">
                <strong>Poznámka k rádioaktívnym a syntetickým prvkom:</strong> Prvok ${element.name} (${element.latinName}) nemá žiadne stabilné izotopy ani ustálené prírodné izotopové zloženie. Hodnota v hranatých zátvorkách <code>${element.atomicMassDisplay}</code> označuje nukleónové číslo jeho najstabilnejšieho známeho izotopu.
              </p>`
            : `<p class="scientific-data-note">
                <strong>Poznámka k atómovej hmotnosti a nukleónovému číslu:</strong> Relatívna atómová hmotnosť (<code>${element.atomicMassDisplay}</code>) je váženým priemerom prírodných izotopov, zatiaľ čo počet neutrónov vyššie (<code>N = ${neutrons}</code>) platí presne pre vybraný izotop <strong>${toSuperscript(selectedIso.massNumber)}${element.symbol}</strong> (rok objavu prvku: <strong>${element.discoveryYear}</strong>).
              </p>`
        }
      </div>
    `;

    const isoSelect = this.container.querySelector('#isotope-selector');
    if (isoSelect) {
      isoSelect.addEventListener('change', (e) => {
        const nextMass = Number(e.target.value);
        this.render(this.currentElement, nextMass);
        this.onSelectIsotope(nextMass);
      });
    }

    const openEditorBtn = this.container.querySelector('#detail-open-editor-btn');
    if (openEditorBtn && this.onOpenInEditor) {
      openEditorBtn.addEventListener('click', () => {
        this.onOpenInEditor(this.currentElement, this.selectedMassNumber);
      });
    }

    const prevBtn = this.container.querySelector('#detail-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.onNavigateElement(prevEl));
    }

    const nextBtn = this.container.querySelector('#detail-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.onNavigateElement(nextEl));
    }

    const hlGroupBtn = this.container.querySelector('#highlight-group-btn');
    if (hlGroupBtn) {
      hlGroupBtn.addEventListener('click', () => {
        const targetGroup = element.group !== null ? element.group : 3;
        this.onHighlightGroup(targetGroup);
      });
    }

    const hlPeriodBtn = this.container.querySelector('#highlight-period-btn');
    if (hlPeriodBtn) {
      hlPeriodBtn.addEventListener('click', () => {
        this.onHighlightPeriod(element.period);
      });
    }
  }
}
