/**
 * Globálny modul pre rozšírenú pätičku (Footer), Cookie Banner a Zásady ochrany súkromia (Privacy Policy).
 * Made by Denis Varga · ChemLab v2.4.0
 */

export const APP_VERSION = '2.4.0';
const CONSENT_STORAGE_KEY = 'chemlab-cookie-consent';
const THEME_STORAGE_KEY = 'periodic_table_theme_v2_flat';

export const RELEASE_HISTORY = [
  {
    version: 'v2.4.0',
    date: 'Október 2026',
    tag: 'Aktuálna verzia',
    isCurrent: true,
    icon: 'fa-solid fa-flask-vial',
    title: 'Molekuly a zlúčeniny, Fullscreen 2D, Font Awesome & Privacy',
    highlights: [
      'Vizualizér chemických vzorcov a molekúl (4CO₂, H₂O, Ca(OH)₂, Al₂(SO₄)₃) s parserom zátvoriek a koeficientov.',
      'Inteligentné zadávanie čísel: číslo bez Shiftu = koeficient (4), Shift + číslo = dolný index (₂).',
      'Celoobrazovkový režim (Fullscreen) pre 2D Bohrov model atómu a kompletný prechod na vektorové ikony Font Awesome 6.',
      'Čistý Flat Blue & White dizajn so zachovaním 10 farieb kategórií periodickej tabuľky, nový Footer a Cookie/Privacy systém.',
    ],
  },
  {
    version: 'v2.0.0',
    date: '2026',
    tag: 'Architektúra',
    isCurrent: false,
    icon: 'fa-solid fa-layer-group',
    title: 'Viacstránková architektúra & Kompletné SK/LAT názvoslovie',
    highlights: [
      'Rozdelenie aplikácie na samostatné špecializované podstránky s priamymi URL odkazmi (#H, #Au, #4CO2).',
      'Kompletná slovenská a latinská nomenklatúra pre všetkých 118 prvkov IUPAC.',
      'Premiestnenie filtrov a výberových polí z horného navbaru do prehľadných pracovných panelov.',
    ],
  },
  {
    version: 'v1.5.0',
    date: '2026',
    tag: 'Interaktivita',
    isCurrent: false,
    icon: 'fa-solid fa-atom',
    title: 'Interaktívny 2D editor atómu & Katalóg porovnávania',
    highlights: [
      'Priama úprava elektrónových vrstiev K až Q klikaním na dráhy a elektróny v reálnom čase.',
      'Okamžitý výpočet iónového náboja, identifikácia prvku podľa počtu protónov a vedecká kontrola konfigurácie.',
      'Katalóg všetkých 118 prvkov s filtrovaním, radením a porovnaním 3 prvkov vedľa seba.',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026',
    tag: 'Základné vydanie',
    isCurrent: false,
    icon: 'fa-solid fa-table-cells',
    title: 'Periodická tabuľka (118 prvkov IUPAC) & 2D Bohrov model',
    highlights: [
      'Interaktívna periodická sústava prvkov s klávesovou navigáciou, vyhľadávaním a filtrovaním skupenstiev.',
      'Animovaný 2D rovinný Bohrov model atómu s reálnymi izotopmi a rozložením elektrónov.',
    ],
  },
];

export function renderFooterHTML() {
  return `
    <div class="app-footer-inner">
      <div class="footer-top-grid">
        <!-- 1. Stĺpec: Značka, popis a autor Denis Varga -->
        <div class="footer-col footer-col-brand">
          <div class="footer-brand-header">
            <a href="./index.html" class="footer-logo-badge" aria-label="ChemLab Domov">
              <span class="footer-logo-z">118</span>
              <span class="footer-logo-sym">Pt</span>
            </a>
            <div class="footer-brand-titles">
              <div class="footer-brand-name-row">
                <span class="footer-brand-name">ChemLab</span>
                <span class="footer-version-badge" title="Aktuálna produkčná verzia">
                  <i class="fa-solid fa-code-branch" aria-hidden="true"></i> v${APP_VERSION}
                </span>
              </div>
              <span class="footer-brand-sub">Interaktívne chemické laboratórium a periodická sústava</span>
            </div>
          </div>

          <p class="footer-about-text">
            Vzdelávacia vedecká webová aplikácia pre študentov, učiteľov a nadšencov chémie. Obsahuje presné dáta IUPAC pre všetkých 118 prvkov, 2D Bohrov model, interaktívny editor vrstiev a vizualizér chemických vzorcov.
          </p>

          <!-- Výrazná autorská karta: Made by Denis Varga -->
          <div class="footer-author-card">
            <div class="footer-author-avatar" aria-hidden="true">
              <i class="fa-solid fa-user-astronaut"></i>
            </div>
            <div class="footer-author-info">
              <span class="footer-author-eyebrow">Autor a vývojár projektu</span>
              <div class="footer-author-main">
                Made by <a href="https://denisvarga.eu" target="_blank" rel="noopener noreferrer" class="footer-author-link">Denis Varga <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
              </div>
              <div class="footer-author-links">
                <a href="https://denisvarga.eu" target="_blank" rel="noopener noreferrer">
                  <i class="fa-solid fa-globe" aria-hidden="true"></i> denisvarga.eu
                </a>
                <span aria-hidden="true">·</span>
                <a href="https://denisvarga.eu/chemlab/#H" target="_blank" rel="noopener noreferrer">
                  <i class="fa-solid fa-rocket" aria-hidden="true"></i> denisvarga.eu/chemlab
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Stĺpec: Hlavné verzie a história vývoja (Changelog) -->
        <div class="footer-col footer-col-versions" aria-label="Hlavné verzie aplikácie">
          <div class="footer-col-header">
            <h3 class="footer-col-title">
              <i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
              Hlavné verzie (Changelog)
            </h3>
            <span class="footer-col-tag">História vydaní</span>
          </div>

          <div class="footer-timeline">
            ${RELEASE_HISTORY.map(
              (rel) => `
              <div class="footer-release-item ${rel.isCurrent ? 'is-current' : ''}">
                <div class="footer-release-marker" aria-hidden="true">
                  <i class="${rel.icon}"></i>
                </div>
                <div class="footer-release-content">
                  <div class="footer-release-top">
                    <span class="footer-release-ver">${rel.version}</span>
                    <span class="footer-release-badge ${rel.isCurrent ? 'badge-current' : ''}">${rel.tag}</span>
                    <span class="footer-release-date">${rel.date}</span>
                  </div>
                  <strong class="footer-release-title">${rel.title}</strong>
                  <p class="footer-release-desc">${rel.highlights[0]}</p>
                </div>
              </div>
            `
            ).join('')}
          </div>

          <button type="button" class="footer-changelog-btn" data-open-changelog-modal>
            <i class="fa-solid fa-list-ul" aria-hidden="true"></i>
            Zobraziť kompletný prehľad verzií (v1.0 – v${APP_VERSION})
          </button>
        </div>

        <!-- 3. Stĺpec: Sekcie aplikácie a rýchle vedecké ukážky -->
        <div class="footer-col footer-col-nav">
          <div class="footer-col-header">
            <h3 class="footer-col-title">
              <i class="fa-solid fa-compass" aria-hidden="true"></i>
              Moduly aplikácie
            </h3>
          </div>

          <nav class="footer-nav-list" aria-label="Navigácia v pätičke">
            <a href="./index.html" class="footer-nav-item">
              <i class="fa-solid fa-table-cells" aria-hidden="true"></i>
              <span>Periodická tabuľka (118 prvkov)</span>
            </a>
            <a href="./prvok.html#H" class="footer-nav-item">
              <i class="fa-solid fa-microscope" aria-hidden="true"></i>
              <span>2D Bohrov model a detail prvku</span>
            </a>
            <a href="./editor.html#C" class="footer-nav-item">
              <i class="fa-solid fa-atom" aria-hidden="true"></i>
              <span>Interaktívny editor atómu (K–Q)</span>
            </a>
            <a href="./molekuly.html#4CO2" class="footer-nav-item">
              <i class="fa-solid fa-flask-vial" aria-hidden="true"></i>
              <span>Molekuly a chemické vzorce</span>
            </a>
            <a href="./prvky.html" class="footer-nav-item">
              <i class="fa-solid fa-list-check" aria-hidden="true"></i>
              <span>Katalóg a porovnanie prvkov</span>
            </a>
          </nav>

          <div class="footer-quick-chips-block">
            <span class="footer-sub-label">Rýchle ukážky:</span>
            <div class="footer-quick-chips">
              <a href="./prvok.html#H" class="footer-chip">¹H Vodík</a>
              <a href="./prvok.html#C" class="footer-chip">¹²C Uhlík</a>
              <a href="./prvok.html#Au" class="footer-chip">¹⁹⁷Au Zlato</a>
              <a href="./molekuly.html#4CO2" class="footer-chip">4CO₂</a>
              <a href="./molekuly.html#H2O" class="footer-chip">H₂O</a>
              <a href="./molekuly.html#Al2(SO4)3" class="footer-chip">Al₂(SO₄)₃</a>
            </div>
          </div>
        </div>

        <!-- 4. Stĺpec: Súkromie, Cookies, Font Awesome & Technológie -->
        <div class="footer-col footer-col-legal">
          <div class="footer-col-header">
            <h3 class="footer-col-title">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
              Súkromie, Cookies &amp; Ikony
            </h3>
          </div>

          <div class="footer-tech-cards">
            <div class="footer-tech-item">
              <i class="fa-brands fa-font-awesome footer-tech-icon" aria-hidden="true"></i>
              <div>
                <strong>Font Awesome 6 Free</strong>
                <p>Aplikácia používa vektorové ikony Font Awesome načítavané cez Cloudflare CDN.</p>
              </div>
            </div>

            <div class="footer-tech-item">
              <i class="fa-solid fa-cookie-bite footer-tech-icon" aria-hidden="true"></i>
              <div>
                <strong>Cookies &amp; LocalStorage</strong>
                <p>Nepoužívame reklamné ani sledovacie cookies. Ukladáme len tému vzhľadu a súhlas s bannerom.</p>
              </div>
            </div>
          </div>

          <div class="footer-legal-actions">
            <button type="button" class="footer-legal-btn footer-legal-btn-primary" data-open-privacy-modal>
              <i class="fa-solid fa-user-shield" aria-hidden="true"></i>
              <span>Privacy Policy (Ochrana súkromia)</span>
            </button>
            <button type="button" class="footer-legal-btn" data-open-cookie-banner>
              <i class="fa-solid fa-sliders" aria-hidden="true"></i>
              <span>Nastavenia Cookies a úložiska</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Spodná lišta pätičky -->
      <div class="footer-bottom-bar">
        <div class="footer-bottom-left">
          <span class="footer-copyright">
            <i class="fa-regular fa-copyright" aria-hidden="true"></i> 2026 <strong>ChemLab</strong> · Made by <a href="https://denisvarga.eu" target="_blank" rel="noopener noreferrer" class="footer-author-link">Denis Varga</a>
          </span>
          <span class="footer-sep" aria-hidden="true">•</span>
          <span class="footer-status-indicator">
            <span class="status-dot" aria-hidden="true"></span>
            Všetkých 118 prvkov IUPAC overených
          </span>
        </div>

        <div class="footer-bottom-right">
          <span class="footer-tech-pill">
            <i class="fa-brands fa-font-awesome" aria-hidden="true"></i> Font Awesome 6.5.2
          </span>
          <span class="footer-tech-pill">
            <i class="fa-solid fa-code" aria-hidden="true"></i> Verzia v${APP_VERSION}
          </span>
          <button type="button" class="footer-bottom-link" data-open-privacy-modal>
            Privacy Policy &amp; Cookies
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initSiteChrome() {
  // 1. Upgrade/hydrate .app-footer with rich interactive markup if present
  const footerEl = document.querySelector('.app-footer');
  if (footerEl) {
    footerEl.innerHTML = renderFooterHTML();
  }

  // 2. Inject Cookie Banner & Privacy/Changelog Modals if not yet in DOM
  if (!document.getElementById('chemlab-cookie-banner')) {
    const wrapper = document.createElement('div');
    wrapper.id = 'chemlab-site-overlays';
    wrapper.innerHTML = `
      <!-- Cookie & Privacy Policy Banner -->
      <aside
        id="chemlab-cookie-banner"
        class="cookie-banner"
        role="region"
        aria-label="Oznámenie o súboroch cookies, lokálnom úložisku a ochrane súkromia"
        hidden
      >
        <div class="cookie-banner-inner">
          <div class="cookie-banner-icon" aria-hidden="true">
            <i class="fa-solid fa-cookie-bite"></i>
          </div>

          <div class="cookie-banner-body">
            <div class="cookie-banner-title-row">
              <h2 class="cookie-banner-title">
                <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
                Ochrana súkromia, Cookies a Font Awesome (Privacy Policy)
              </h2>
              <span class="cookie-badge">Bez sledovacích cookies</span>
            </div>
            <p class="cookie-banner-text">
              Aplikácia <strong>ChemLab</strong> (autor <strong>Denis Varga</strong>) rešpektuje vaše súkromie. Nepoužívame žiadne reklamné ani analytické sledovacie cookies tretích strán.
              Pre uloženie zvolenej farebnej témy (svetlá/tmavá) a potvrdenia tohto banneru využívame výhradne technické <strong>lokálne úložisko prehliadača (<code>localStorage</code>)</strong>.
              Pre zobrazenie vektorových ikon sa načítava knižnica <strong><i class="fa-brands fa-font-awesome"></i> Font Awesome 6</strong> z verejnej siete <strong>Cloudflare CDN</strong> (<code>cdnjs.cloudflare.com</code>).
            </p>
          </div>

          <div class="cookie-banner-actions">
            <button type="button" id="cookie-accept-all-btn" class="cookie-btn cookie-btn-primary">
              <i class="fa-solid fa-check" aria-hidden="true"></i>
              <span>Rozumiem a súhlasím</span>
            </button>
            <button type="button" id="cookie-accept-essential-btn" class="cookie-btn cookie-btn-tonal">
              <i class="fa-solid fa-lock" aria-hidden="true"></i>
              <span>Len nevyhnutné</span>
            </button>
            <button type="button" id="cookie-open-policy-btn" class="cookie-btn cookie-btn-outline">
              <i class="fa-solid fa-file-shield" aria-hidden="true"></i>
              <span>Privacy Policy &amp; Podrobnosti</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Privacy Policy & Hlavné verzie Modal -->
      <div
        id="chemlab-privacy-modal"
        class="site-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        hidden
      >
        <div class="site-modal-card">
          <div class="site-modal-header">
            <div class="site-modal-title-wrap">
              <span class="site-modal-eyebrow">ChemLab v${APP_VERSION} · Made by Denis Varga</span>
              <h2 id="privacy-modal-title" class="site-modal-title">
                <i class="fa-solid fa-user-shield" aria-hidden="true"></i>
                Zásady ochrany súkromia (Privacy Policy), Cookies &amp; Hlavné verzie
              </h2>
            </div>
            <button type="button" class="site-modal-close" data-close-site-modal aria-label="Zavrieť okno">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <div class="site-modal-body">
            <!-- Sekcia 1: Privacy Policy & Cookies -->
            <section class="privacy-section">
              <h3><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> 1. Súbory Cookies a lokálne úložisko prehliadača (LocalStorage)</h3>
              <p>
                Webová aplikácia <strong>ChemLab</strong> (<a href="https://denisvarga.eu/chemlab/#H" target="_blank" rel="noopener noreferrer">denisvarga.eu/chemlab</a>) <strong>nevytvára žiadne marketingové, profilovacie ani analytické cookies</strong>. Všetky chemické výpočty, modely atómov a spracovanie vzorcov prebiehajú 100 % lokálne priamo vo vašom zariadení.
              </p>
              <div class="privacy-table-wrap">
                <table class="privacy-table">
                  <thead>
                    <tr>
                      <th>Názov kľúča</th>
                      <th>Typ úložiska</th>
                      <th>Účel použitia</th>
                      <th>Exspirácia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>periodic_table_theme_v2_flat</code></td>
                      <td><code>localStorage</code> (Nevyhnutné)</td>
                      <td>Uchovanie vašej voľby svetlého (Flat White/Blue) alebo tmavého režimu.</td>
                      <td>Trvalé (do vymazania)</td>
                    </tr>
                    <tr>
                      <td><code>chemlab-cookie-consent</code></td>
                      <td><code>localStorage</code> (Nevyhnutné)</td>
                      <td>Uloženie informácie, že ste sa oboznámili s týmto oznámením o súkromí.</td>
                      <td>Trvalé (do vymazania)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Sekcia 2: Font Awesome & Služby tretích strán -->
            <section class="privacy-section">
              <h3><i class="fa-brands fa-font-awesome" aria-hidden="true"></i> 2. Použitie ikon Font Awesome a Cloudflare CDN</h3>
              <p>
                Pre prehľadné a prístupné používateľské rozhranie aplikácia využíva vektorové ikony <strong>Font Awesome 6 Free</strong> (poskytovateľ <em>Fonticons, Inc.</em>), ktoré sú načítavané prostredníctvom distribučnej siete <strong>Cloudflare CDN</strong> (<code>https://cdnjs.cloudflare.com</code>).
              </p>
              <p>
                Pri sťahovaní súborov štýlov a fontov z CDN servera váš prehliadač technicky odovzdá IP adresu a štandardné HTTP hlavičky poskytovateľovi CDN za účelom doručenia obsahu a ochrany pred útokmi (v súlade s GDPR oprávneným záujmom na bezpečnom a rýchlom načítaní webu).
              </p>
            </section>

            <!-- Sekcia 3: Prehľad hlavných verzií -->
            <section class="privacy-section" id="modal-changelog-section">
              <h3><i class="fa-solid fa-code-branch" aria-hidden="true"></i> 3. Prehľad hlavných verzií aplikácie ChemLab</h3>
              <div class="modal-releases-grid">
                ${RELEASE_HISTORY.map(
                  (rel) => `
                  <div class="modal-release-card ${rel.isCurrent ? 'is-current' : ''}">
                    <div class="modal-release-head">
                      <span class="footer-release-ver"><i class="${rel.icon}" aria-hidden="true"></i> ${rel.version}</span>
                      <span class="footer-release-badge ${rel.isCurrent ? 'badge-current' : ''}">${rel.tag}</span>
                    </div>
                    <h4>${rel.title}</h4>
                    <ul>
                      ${rel.highlights.map((h) => `<li>${h}</li>`).join('')}
                    </ul>
                  </div>
                `
                ).join('')}
              </div>
            </section>

            <!-- Sekcia 4: Autor a kontakt -->
            <section class="privacy-section">
              <h3><i class="fa-solid fa-id-card" aria-hidden="true"></i> 4. Autor projektu a správa uložených dát</h3>
              <p>
                Autorom a prevádzkovateľom projektu <strong>ChemLab</strong> je <strong>Denis Varga</strong> (<a href="https://denisvarga.eu" target="_blank" rel="noopener noreferrer">https://denisvarga.eu</a>).
                Uložené lokálne nastavenia môžete kedykoľvek vymazať tlačidlom nižšie.
              </p>
            </section>
          </div>

          <div class="site-modal-footer">
            <button type="button" id="privacy-clear-storage-btn" class="cookie-btn cookie-btn-outline">
              <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
              <span>Resetovať uložené nastavenia (localStorage)</span>
            </button>
            <div class="site-modal-footer-right">
              <button type="button" id="privacy-modal-accept-btn" class="cookie-btn cookie-btn-primary">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>Rozumiem a súhlasím</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  const bannerEl = document.getElementById('chemlab-cookie-banner');
  const modalEl = document.getElementById('chemlab-privacy-modal');

  const saveConsent = (level) => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          level,
          version: APP_VERSION,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage restrictions
    }
    if (bannerEl) bannerEl.hidden = true;
    if (modalEl) modalEl.hidden = true;
  };

  // Check if consent already stored
  let hasConsent = false;
  try {
    hasConsent = Boolean(localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    hasConsent = false;
  }

  if (!hasConsent && bannerEl) {
    bannerEl.hidden = false;
  }

  // Bind Banner buttons
  document.getElementById('cookie-accept-all-btn')?.addEventListener('click', () => {
    saveConsent('all');
  });

  document.getElementById('cookie-accept-essential-btn')?.addEventListener('click', () => {
    saveConsent('essential');
  });

  document.getElementById('cookie-open-policy-btn')?.addEventListener('click', () => {
    if (modalEl) modalEl.hidden = false;
  });

  // Bind Footer & Modal buttons
  document.querySelectorAll('[data-open-privacy-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalEl) modalEl.hidden = false;
    });
  });

  document.querySelectorAll('[data-open-changelog-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalEl) {
        modalEl.hidden = false;
        const sec = document.getElementById('modal-changelog-section');
        sec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('[data-open-cookie-banner]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (bannerEl) {
        bannerEl.hidden = false;
        bannerEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  });

  document.querySelectorAll('[data-close-site-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalEl) modalEl.hidden = true;
    });
  });

  modalEl?.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      modalEl.hidden = true;
    }
  });

  document.getElementById('privacy-modal-accept-btn')?.addEventListener('click', () => {
    saveConsent('all');
  });

  document.getElementById('privacy-clear-storage-btn')?.addEventListener('click', () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // Ignore
    }
    if (modalEl) modalEl.hidden = true;
    if (bannerEl) bannerEl.hidden = false;
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && !modalEl.hidden) {
      modalEl.hidden = true;
    }
  });
}
