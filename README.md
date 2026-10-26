# Interaktívna periodická tabuľka prvkov (Interactive Periodic Table & Atom Editor)

🌐 **Živá aplikácia (Live Demo):** [https://denisvarga.eu/chemlab/#H](https://denisvarga.eu/chemlab/#H)

Moderná, vedecky presná interaktívna periodická tabuľka všetkých 118 chemických prvkov podľa IUPAC v dizajne **Material 3 Expressive** so slovenskými aj latinskými názvami prvkov, animovaným **2D Bohrovým modelom atómu**, prehľadom izotopov a **interaktívnym editorom atómových vrstiev**. Postavené na čistom HTML5, CSS3 a ES moduloch bez externých závislostí.

---

## Hlavné funkcie

### 1. Interaktívna 18-stĺpcová periodická tabuľka
- **Všetkých 118 prvkov IUPAC**: Kompletná databáza od vodíka ($Z = 1$) po oganesón ($Z = 118$) v štandardnom 18-stĺpcovom rozložení na celú šírku obrazovky vrátane oddelených radov lantanoidov ($57\text{–}71$) a aktinoidov ($89\text{–}103$).
- **Slovenské a latinské názvy**: Každá bunka prvku aj detailný panel zobrazujú slovenský názov (*Vodík, Železo, Zlato, Ortuť…*) aj latinský názov (*Hydrogenium, Ferrum, Aurum, Hydrargyrum…*).
- **Okamžité vyhľadávanie (aj bez diakritiky)**: Vyhľadávanie podľa slovenského názvu (`zlato`, `zelez`, `železo`), latinského názvu (`Aurum`, `Ferrum`, `Natrium`), chemickej značky (`Au`, `Fe`) alebo protónového čísla (`79`).
- **Filtrovanie a zvýrazňovanie**: Filtrovanie podľa 10 chemických kategórií a skupenstva pri STP (*Pevné, Kvapalné, Plynné, Neznáme*) a zvýraznenie celej skupiny (`1–18`) alebo periódy (`1–7`).
- **Klávesové skratky**:
  - `↑` `↓` `←` `→` — Pohyb v mriežke tabuľky
  - `[` / `]` — Predchádzajúci / Ďalší prvok podľa $Z$
  - `/` — Vyhľadávanie
  - `R` — Náhodný prvok
  - `P` — Pozastaviť / Spustiť animáciu 2D atómu
  - `Esc` — Zrušiť filtre

### 2. 2D Bohrov model atómu a inšpektor izotopov
- **2D jadro atómu**: Zobrazuje jednotlivé protóny ($p^+$) a neutróny ($n^0$) v plochom 2D usporiadaní, ktoré sa okamžite prispôsobuje vybranému prvku a izotopu.
- **Presné obsadenie elektrónových vrstiev**: Zobrazuje kruhové vrstvy $K, L, M, N, O, P, Q$ ($n = 1\dots7$) s presným počtom elektrónov v základnom stave vrátane všetkých 20 Madelungových výnimiek ($\text{Cr}, \text{Cu}, \text{Pd}, \text{Ag}, \text{Pt}, \text{Au}$ atď.).
- **Výber izotopu**: Prepínanie medzi prírodnými a syntetickými izotopmi (napr. $^{1}\text{H}$, $^{2}\text{H}$, $^{3}\text{H}$ alebo $^{12}\text{C}$, $^{13}\text{C}$, $^{14}\text{C}$) s okamžitým prepočtom neutrónov ($N = A - Z$).

### 3. Interaktívny editor atómu — Priama úprava vrstiev klikaním
- **Priama manipulácia na plátne**:
  - Kliknutie na prázdne miesto na kruhovej vrstve pridá presne **1 elektrón (`+1 e⁻`)**.
  - Kliknutie na existujúci elektrón (aj počas animácie!) odstráni presne **tento 1 elektrón (`−1 e⁻`)**.
- **Správa vrstiev (`K` až `Q`)**: Dynamické pridávanie a odstraňovanie vrstiev s ochranou pred nechceným vymazaním elektrónov (ponúka presun elektrónov do inej vrstvy alebo potvrdenie vymazania).
- **Určenie prvku, náboja a vedecká diagnostika v reálnom čase**:
  - Úprava počtu protónov a neutrónov pomocou tlačidiel `+` / `−`.
  - Okamžitý výpočet celkového náboja ($Q = Z - e^-$) a rozlíšenie na **Neutrálny atóm**, **Kladný ión — Katión** a **Záporný ión — Anión**.
  - Vedecké upozornenia pri prekročení kapacity vrstvy, prázdnej vnútornej vrstve, excitovanom stave alebo nestabilnom izotope.
  - Podpora histórie úprav (`↶ Späť` / `↷ Dopredu`) a predvolieb bežných atómov a iónov.

### 4. Molekuly a zlúčeniny — Vizualizér chemických vzorcov (`molekuly.html`)
- **Inteligentný editor chemických vzorcov**:
  - **Číslo bez Shiftu** vloží normálne veľké číslo — stechiometrický **koeficient** (napr. `4` v `4CO₂`).
  - **Shift + číslo** vloží **dolný index** (napr. `₂` v `4CO₂` alebo `Ca(OH)₂`) s kontextovou kontrolou pozície kurzora.
  - Viditeľný prepínač režimu **Auto / Koeficient / Dolný index** a dotyková pomocná klávesnica pre mobilné zariadenia.
- **Vedecky presný parser chemických vzorcov**:
  - Podporuje koeficienty (`4CO2`, `2H2O`), dolné indexy (`H₂O`), okrúhle a hranaté zátvorky s násobiteľmi (`Ca(OH)2`, `Al2(SO4)3`), organické vzorce (`CH3COOH`), hydráty (`CuSO4·5H2O`) a prísne rozlišuje veľkosť písmen (`Co` = kobalt vs. `CO` = oxid uhoľnatý).
- **Interaktívny 3D/2D model molekúl a vzorcových jednotiek**:
  - Pri koeficiente väčšom ako 1 (napr. `4CO₂`) zobrazuje samostatné modely molekúl s prepínačom medzi pohľadom na **všetky molekuly** a **jednu molekulu**.
  - Kliknutím na ľubovoľnú guľu atómu sa zobrazia podrobnosti prvku s priamym preklikom do periodickej tabuľky a 2D Bohrovho modelu.
  - Rozlišuje **molekulové zlúčeniny** (napr. $\text{CO}_2$, $\text{H}_2\text{O}$) a **iónové zlúčeniny so vzorcovými jednotkami** (napr. $\text{NaCl}$, $\text{Ca(OH)}_2$, $\text{Al}_2(\text{SO}_4)_3$).

---

## Viacstránková architektúra (Multi-Page)

Aplikácia je rozdelená na 5 samostatných stránok prepojených hornou navigáciou:
1. **`index.html` — Periodická tabuľka**: Interaktívna 18-stĺpcová periodická tabuľka všetkých 118 prvkov s kompaktným prehľadom vybraného prvku a priamymi prechodmi na detail, editor, molekuly a katalóg.
2. **`prvok.html` — 2D Model a Detail prvku**: Samostatná stránka s animovaným 2D Bohrovým modelom vybraného prvku, výberom izotopov, obsadením vrstiev a kompletnými fyzikálnymi a termodynamickými vlastnosťami.
3. **`editor.html` — Editor atómu**: Samostatná stránka s interaktívnym 2D editorom elektrónových vrstiev (`K` až `Q`), kde používateľ stavia atómy a ióny priamym klikaním na vrstvy a elektróny.
4. **`molekuly.html` — Molekuly a zlúčeniny**: Samostatná stránka s vizualizérom chemických vzorcov, inteligentným zadávaním koeficientov a dolných indexov (`Shift + číslo`), interaktívnym modelom molekúl, výpočtom molárnej hmotnosti a rozpisom atómov.
5. **`prvky.html` — Katalóg a porovnanie prvkov**: Samostatná stránka na porovnávanie 3 prvkov vedľa seba a prehľadnú zoraditeľnú tabuľku všetkých 118 prvkov so slovenskými a latinskými názvami.

## Štruktúra projektu

```text
/
├── index.html                  # Stránka 1: Interaktívna periodická tabuľka prvkov
├── prvok.html                  # Stránka 2: 2D Bohrov model atómu a podrobný detail prvku
├── editor.html                 # Stránka 3: Interaktívny editor atómu a elektrónových vrstiev
├── molekuly.html               # Stránka 4: Molekuly a zlúčeniny (Chemical Formula Visualizer)
├── prvky.html                  # Stránka 5: Katalóg všetkých 118 prvkov a porovnávanie
├── src/
│   ├── main.js                 # Vstupný skript pre index.html
│   ├── detail-page.js          # Vstupný skript pre prvok.html
│   ├── editor-page.js          # Vstupný skript pre editor.html
│   ├── molecules-page.js       # Vstupný skript pre molekuly.html
│   ├── catalog-page.js         # Vstupný skript pre prvky.html
│   ├── lib/
│   │   └── formula-parser.js   # Parser chemických vzorcov, výpočet atómov a Shift+číslo logika
│   ├── data/
│   │   ├── elements.js         # Overená databáza všetkých 118 prvkov (SK + latinské názvy)
│   │   └── compounds.js        # Overená databáza molekúl, iónových zlúčenín a ich geometrie
│   ├── components/
│   │   ├── periodic-table.js   # 18-stĺpcová periodická tabuľka, klávesnica a filtre
│   │   ├── element-details.js  # Detail prvku, výber izotopu a tabuľka vlastností
│   │   ├── atom-model.js       # Animovaný 2D Bohrov model vybraného prvku
│   │   ├── atom-editor.js      # Interaktívny editor atómu s priamym klikaním na vrstvy
│   │   └── molecule-visualizer.js # Interaktívny model molekúl a vzorcových jednotiek
│   └── styles/
│       ├── main.css            # Material 3 Expressive Green téma (tmavá/svetlá) a navigácia
│       ├── table.css           # Štýly periodickej tabuľky a buniek prvkov
│       ├── atom.css            # Štýly 2D modelu atómu
│       ├── editor.css          # Štýly interaktívneho editora atómu
│       ├── molecules.css       # Štýly vizualizéra chemických vzorcov a molekúl
│       └── catalog.css         # Štýly katalógu a porovnávania prvkov
├── assets/
│   └── favicon.svg             # Ikona aplikácie
├── scripts/
│   ├── dev-server.js           # Lokálny vývojový HTTP server
│   ├── build.js                # Produkčný build skript (výstup do dist/)
│   └── validate.js             # Automatická validácia všetkých 118 prvkov a súborov
├── package.json
└── README.md
```

---

## Spustenie a vývoj lokálne

### 1. Validácia databázy prvkov
```bash
npm run validate
```

### 2. Spustenie lokálneho servera
```bash
npm run dev
```
Následne otvorte **http://127.0.0.1:4173** v prehliadači.

### 3. Produkčný build a nasadenie (GitHub Pages / Web)
```bash
npm run build
npm run preview
```
Produkčná verzia sa vygeneruje do priečinka `dist/` a živá verzia beží na adrese **[https://denisvarga.eu/chemlab/#H](https://denisvarga.eu/chemlab/#H)**.
