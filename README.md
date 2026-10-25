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

---

## Štruktúra projektu

```text
/
├── index.html                  # Hlavná HTML štruktúra aplikácie (v slovenčine)
├── src/
│   ├── main.js                 # Riadenie aplikácie, stav, filtre, téma a skratky
│   ├── data/
│   │   └── elements.js         # Overená databáza všetkých 118 prvkov (SK + latinské názvy)
│   ├── components/
│   │   ├── periodic-table.js   # 18-stĺpcová periodická tabuľka, klávesnica a filtre
│   │   ├── element-details.js  # Detail prvku, výber izotopu a tabuľka vlastností
│   │   ├── atom-model.js       # Animovaný 2D Bohrov model vybraného prvku
│   │   └── atom-editor.js      # Interaktívny editor atómu s priamym klikaním na vrstvy
│   └── styles/
│       ├── main.css            # Material 3 Expressive Green téma (tmavá/svetlá) a rozloženie
│       ├── table.css           # Štýly periodickej tabuľky a buniek prvkov
│       ├── atom.css            # Štýly 2D modelu atómu
│       └── editor.css          # Štýly interaktívneho editora atómu
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
