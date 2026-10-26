/**
 * Overená databáza chemických zlúčenín, molekúl a iónových vzorcových jednotiek.
 * Obsahuje geometriu (3D súradnice pre interaktívne otáčanie na plátne), väzby,
 * slovenské a systematické názvy, typ väzby a overené encyklopedické informácie.
 */

export const ELEMENT_CPK_COLORS = {
  H: { fill: '#f8fafc', stroke: '#64748b', text: '#0f172a' },
  C: { fill: '#334155', stroke: '#94a3b8', text: '#f8fafc' },
  N: { fill: '#3b82f6', stroke: '#1d4ed8', text: '#ffffff' },
  O: { fill: '#ef4444', stroke: '#b91c1c', text: '#ffffff' },
  F: { fill: '#22c55e', stroke: '#15803d', text: '#052e16' },
  Cl: { fill: '#10b981', stroke: '#047857', text: '#022c22' },
  Br: { fill: '#991b1b', stroke: '#7f1d1d', text: '#ffffff' },
  I: { fill: '#6b21a8', stroke: '#4c1d95', text: '#ffffff' },
  S: { fill: '#eab308', stroke: '#a16207', text: '#1c1917' },
  P: { fill: '#f97316', stroke: '#c2410c', text: '#ffffff' },
  Na: { fill: '#8b5cf6', stroke: '#5b21b6', text: '#ffffff' },
  K: { fill: '#a855f7', stroke: '#6b21a8', text: '#ffffff' },
  Ca: { fill: '#14b8a6', stroke: '#0f766e', text: '#042f2e' },
  Mg: { fill: '#2dd4bf', stroke: '#0d9488', text: '#042f2e' },
  Al: { fill: '#94a3b8', stroke: '#475569', text: '#0f172a' },
  Fe: { fill: '#d97706', stroke: '#92400e', text: '#ffffff' },
  Cu: { fill: '#ea580c', stroke: '#9a3412', text: '#ffffff' },
  Zn: { fill: '#64748b', stroke: '#334155', text: '#ffffff' },
  Ag: { fill: '#cbd5e1', stroke: '#64748b', text: '#0f172a' },
  Au: { fill: '#facc15', stroke: '#a16207', text: '#1c1917' },
  Mn: { fill: '#c084fc', stroke: '#7e22ce', text: '#1e1b4b' },
};

export function getAtomVisualStyle(symbol) {
  if (ELEMENT_CPK_COLORS[symbol]) {
    return ELEMENT_CPK_COLORS[symbol];
  }
  // Deterministická farba pre ostatné prvky podľa protónového/znakového kódu
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    fill: `hsl(${hue}, 62%, 52%)`,
    stroke: `hsl(${hue}, 65%, 32%)`,
    text: '#ffffff',
  };
}

/**
 * Pomocný zoznam kovových kategórií na rozlíšenie iónových a molekulových zlúčenín.
 */
export const METAL_CATEGORIES = new Set([
  'alkali-metal',
  'alkaline-earth-metal',
  'transition-metal',
  'post-transition-metal',
  'lanthanide',
  'actinide',
]);

/**
 * Rýchle ukážkové vzorce pre tlačidlá v editore.
 */
export const QUICK_FORMULA_EXAMPLES = [
  { formula: '4CO2', display: '4CO₂', label: '4 molekuly oxidu uhličitého' },
  { formula: 'H2O', display: 'H₂O', label: 'Voda' },
  { formula: '2H2O', display: '2H₂O', label: '2 molekuly vody' },
  { formula: 'CO2', display: 'CO₂', label: 'Oxid uhličitý' },
  { formula: 'NH3', display: 'NH₃', label: 'Amoniak' },
  { formula: 'CH4', display: 'CH₄', label: 'Metán' },
  { formula: 'Ca(OH)2', display: 'Ca(OH)₂', label: 'Hydroxid vápenatý' },
  { formula: 'Al2(SO4)3', display: 'Al₂(SO₄)₃', label: 'Síran hlinitý' },
  { formula: 'CH3COOH', display: 'CH₃COOH', label: 'Kyselina octová' },
  { formula: 'NaCl', display: 'NaCl', label: 'Chlorid sodný' },
  { formula: 'H2SO4', display: 'H₂SO₄', label: 'Kyselina sírová' },
  { formula: 'C6H12O6', display: 'C₆H₁₂O₆', label: 'Glukóza' },
];

/**
 * Overená databáza konkrétnych látok.
 * Kľúčom je kanonický zápis jednotky vzorca v ASCII (napr. 'CO2', 'H2O', 'Ca(OH)2', 'CH3COOH').
 */
export const COMPOUNDS_DATABASE = {
  H2O: {
    formula: 'H2O',
    name: 'Voda',
    systematicName: 'Oxidán (oxid vodný)',
    latinName: 'Aqua / Oxidane',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (pri 20 °C)',
    geometryLabel: 'Lomená molekula (väzbový uhol 104,5°)',
    studentSummary:
      'Voda je najdôležitejšia kvapalina na Zemi. Každá jej molekula sa skladá z jedného atómu kyslíka, na ktorý sú pod uhlom 104,5° naviazané dva atómy vodíka.',
    expertSummary:
      'Polárna kovalentná molekula s dvoma väzbami O–H a dvoma voľnými elektrónovými pármi na atóme kyslíka (hybridizácia sp³). Medzi molekulami vznikajú silné vodíkové väzby, ktoré spôsobujú vysokú teplotu varu a anomáliu hustoty vody.',
    usesAndFacts: [
      'Univerzálne polárne rozpúšťadlo nevyhnutné pre všetky známe formy života a biochemické reakcie.',
      'Ľad má nižšiu hustotu ako kvapalná voda, preto pláva na hladine (maximum hustoty má voda pri 3,98 °C).',
      'V priemysle a laboratóriách slúži ako chladiace médium, reaktant a štandard pre kalibráciu vlastností látok.',
    ],
    structure: {
      atoms: [
        { el: 'O', x: 0, y: -0.22, z: 0, role: 'Centrálny atóm kyslíka' },
        { el: 'H', x: -0.88, y: 0.48, z: 0.12, role: 'Atóm vodíka' },
        { el: 'H', x: 0.88, y: 0.48, z: -0.12, role: 'Atóm vodíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
      ],
    },
  },

  CO2: {
    formula: 'CO2',
    name: 'Oxid uhličitý',
    systematicName: 'Oxid uhličitý (uhličitanový anhydrid)',
    latinName: 'Carbonei dioxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný plyn)',
    geometryLabel: 'Lineárna molekula (väzbový uhol 180°)',
    studentSummary:
      'Oxid uhličitý je bezfarebný plyn, ktorý vydychujeme pri dýchaní a rastliny ho využívajú pri fotosyntéze. V každej molekule je uprostred jeden atóm uhlíka pevne spojený dvojitými väzbami s dvoma atómami kyslíka.',
    expertSummary:
      'Nepolárna lineárna molekula so symetriou D∞h. Centrálny atóm uhlíka v hybridizácii sp tvorí dve dvojité kovalentné väzby (O=C=O). Aj keď sú jednotlivé väzby C=O polárne, ich dipólové momenty sa navzájom vyrušia.',
    usesAndFacts: [
      'Kľúčový reaktant fotosyntézy v zelených rastlinách a prirodzená súčasť uhlíkového cyklu Zeme.',
      'V tuhom skupenstve je známy ako „suchý ľad“ (sublimuje pri −78,5 °C bez topenia na kvapalinu).',
      'Používa sa na sýtenie nápojov, v snehových hasiacich prístrojoch a ako ochranná atmosféra pri zváraní.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Centrálny atóm uhlíka' },
        { el: 'O', x: -1.18, y: 0, z: 0, role: 'Krajný atóm kyslíka' },
        { el: 'O', x: 1.18, y: 0, z: 0, role: 'Krajný atóm kyslíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
      ],
    },
  },

  NH3: {
    formula: 'NH3',
    name: 'Amoniak',
    systematicName: 'Azán (trihydrid dusíka)',
    latinName: 'Ammoniacum / Azane',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (charakteristický štipľavý zápach)',
    geometryLabel: 'Trigonálna pyramída (väzbový uhol 107,8°)',
    studentSummary:
      'Amoniak je bezfarebný plyn so silným zápachom, ktorý tvorí jeden atóm dusíka a tri atómy vodíka. Vo vode sa výborne rozpúšťa a vytvára zásaditý roztok.',
    expertSummary:
      'Polárna kovalentná molekula tvaru trigonálnej pyramídy (hybridizácia sp³ na dusíku). Voľný elektrónový pár na atóme dusíka umožňuje amoniaku pôsobiť ako Brønstedova aj Lewisova zásada (tvorba amónneho katiónu NH₄⁺).',
    usesAndFacts: [
      'Vyrába sa Haberovým-Boschovým procesom priamo z dusíka a vodíka za vysokého tlaku a teploty.',
      'Základná surovina na výrobu priemyselných dusíkatých hnojív a kyseliny dusičnej.',
      'Kvapalný amoniak sa využíva ako priemyselné chladivo (R-717).',
    ],
    structure: {
      atoms: [
        { el: 'N', x: 0, y: -0.28, z: 0, role: 'Vrcholový atóm dusíka' },
        { el: 'H', x: -0.92, y: 0.42, z: 0.35, role: 'Atóm vodíka' },
        { el: 'H', x: 0.92, y: 0.42, z: 0.35, role: 'Atóm vodíka' },
        { el: 'H', x: 0, y: 0.25, z: -0.95, role: 'Atóm vodíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
      ],
    },
  },

  CH4: {
    formula: 'CH4',
    name: 'Metán',
    systematicName: 'Metán (karbán)',
    latinName: 'Methanum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (horľavý plyn bez zápachu)',
    geometryLabel: 'Tetraédrická molekula (väzbový uhol 109,5°)',
    studentSummary:
      'Metán je najjednoduchší uhľovodík a hlavná zložka zemného plynu. Jeden atóm uhlíka v strede je obklopený štyrmi atómami vodíka v rohoch pravidelného štvorstena.',
    expertSummary:
      'Najjednoduchší alkán s atómom uhlíka v hybridizácii sp³. Štyri ekvivalentné väzby C–H smerujú do vrcholov pravidelného tetraédra (uhol 109,47°), vďaka čomu je molekula navonok nepolárna.',
    usesAndFacts: [
      'Tvorí približne 75 až 98 % objemu zemného plynu používaného na vykurovanie a výrobu energie.',
      'Je základnou surovinou pre parný reforming na výrobu vodíka a syntézneho plynu.',
      'Vzniká aj biologicky rozkladom organickej hmoty bez prístupu vzduchu (bahenný plyn, bioplyn).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Centrálny atóm uhlíka' },
        { el: 'H', x: 0, y: -0.98, z: 0.1, role: 'Vrcholový atóm vodíka' },
        { el: 'H', x: -0.92, y: 0.48, z: 0.38, role: 'Atóm vodíka' },
        { el: 'H', x: 0.92, y: 0.48, z: 0.38, role: 'Atóm vodíka' },
        { el: 'H', x: 0, y: 0.18, z: -0.96, role: 'Atóm vodíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
      ],
    },
  },

  'Ca(OH)2': {
    formula: 'Ca(OH)2',
    name: 'Hydroxid vápenatý',
    systematicName: 'Dihydroxid vápenatý',
    latinName: 'Calcii hydroxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biely prášok — hasené vápno)',
    geometryLabel: 'Iónová vzorcová jednotka: Ca²⁺ a 2× anión OH⁻',
    studentSummary:
      'Hydroxid vápenatý (známy ako hasené vápno) je iónová zlúčenina. Vzorcová jednotka obsahuje jeden vápenatý katión Ca²⁺ a dve hydroxidové skupiny OH⁻ (zátvorka s dolným indexom 2 znamená, že sa celá skupina OH opakuje dvakrát).',
    expertSummary:
      'Iónová zlúčenina kryštalizujúca v trigonálnej sústave. Vo vzorcovej jednotke je dvojmocný katión vápnika Ca²⁺ elektrostaticky viazaný s dvoma polyatómovými hydroxidovými aniónmi OH⁻, pričom v každom anióne OH⁻ je kyslík viazaný s vodíkom kovalentnou väzbou.',
    usesAndFacts: [
      'Vzniká exotermickou reakciou páleného vápna (CaO) s vodou — proces nazývaný „hasenie vápna“.',
      'Vodný roztok hydroxidu vápenatého sa nazýva vápenná voda a používa sa na dôkaz oxidu uhličitého (zbelie vznikom CaCO₃).',
      'Široko sa využíva v stavebníctve (vápenná malta, omietky) a na úpravu kyslosti pôdy a pitnej vody.',
    ],
    structure: {
      atoms: [
        { el: 'Ca', x: 0, y: 0, z: 0, charge: '2+', role: 'Vápenatý katión Ca²⁺' },
        { el: 'O', x: -1.15, y: 0, z: 0.1, charge: '−', role: 'Kyslík v 1. skupine OH⁻' },
        { el: 'H', x: -1.85, y: -0.45, z: 0.25, role: 'Vodík v 1. skupine OH⁻' },
        { el: 'O', x: 1.15, y: 0, z: -0.1, charge: '−', role: 'Kyslík v 2. skupine OH⁻' },
        { el: 'H', x: 1.85, y: 0.45, z: -0.25, role: 'Vodík v 2. skupine OH⁻' },
      ],
      bonds: [
        { from: 0, to: 1, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 'ionic' },
        { from: 3, to: 4, order: 1 },
      ],
    },
  },

  'Al2(SO4)3': {
    formula: 'Al2(SO4)3',
    name: 'Síran hlinitý',
    systematicName: 'Tris(tetraoxosíran) dihlinitý',
    latinName: 'Aluminii sulfas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela kryštalická látka)',
    geometryLabel: 'Iónová vzorcová jednotka: 2× Al³⁺ a 3× anión SO₄²⁻',
    studentSummary:
      'Síran hlinitý je iónová soľ zložená z dvoch hlinitých katiónov Al³⁺ a troch síranových skupín SO₄²⁻. Každá zo 3 skupín (SO₄) obsahuje 1 atóm síry a 4 atómy kyslíka, takže celá vzorcová jednotka má až 17 atómov (2 Al + 3 S + 12 O).',
    expertSummary:
      'Iónová zlúčenina, v ktorej elektroneutralitu zabezpečuje pomer dvoch trojmocných katiónov Al³⁺ (spolu +6) a troch dvojmocných tetraédrických síranových aniónov SO₄²⁻ (spolu −6). Vnútri každého aniónu SO₄²⁻ sú atómy kyslíka kovalentne viazané na centrálny atóm síry.',
    usesAndFacts: [
      'Kľúčové koagulačné činidlo pri čriení a úprave pitnej a odpadovej vody (zráža nečistoty do vločiek).',
      'Používa sa pri výrobe papiera na glejenie a úpravu nasiakavosti.',
      'V záhradníctve sa využíva na zníženie pH pôdy (napr. pre modré sfarbenie kvetov hortenzií).',
    ],
    structure: {
      atoms: [
        { el: 'Al', x: -0.95, y: -0.82, z: 0.25, charge: '3+', role: 'Hlinitý katión Al³⁺ (1)' },
        { el: 'Al', x: 0.95, y: -0.82, z: -0.25, charge: '3+', role: 'Hlinitý katión Al³⁺ (2)' },
        // SO4 skupina 1 (vľavo)
        { el: 'S', x: -1.55, y: 0.42, z: 0, role: 'Síra v 1. skupine SO₄²⁻' },
        { el: 'O', x: -2.25, y: 0.05, z: 0.45, role: 'Kyslík v 1. skupine SO₄²⁻' },
        { el: 'O', x: -2.15, y: 1.05, z: -0.45, role: 'Kyslík v 1. skupine SO₄²⁻' },
        { el: 'O', x: -1.05, y: 1.08, z: 0.52, role: 'Kyslík v 1. skupine SO₄²⁻' },
        { el: 'O', x: -0.95, y: -0.05, z: -0.52, role: 'Kyslík v 1. skupine SO₄²⁻' },
        // SO4 skupina 2 (stred)
        { el: 'S', x: 0, y: 0.65, z: 0, role: 'Síra v 2. skupine SO₄²⁻' },
        { el: 'O', x: -0.52, y: 0.15, z: 0.55, role: 'Kyslík v 2. skupine SO₄²⁻' },
        { el: 'O', x: 0.52, y: 0.15, z: -0.55, role: 'Kyslík v 2. skupine SO₄²⁻' },
        { el: 'O', x: -0.48, y: 1.32, z: -0.48, role: 'Kyslík v 2. skupine SO₄²⁻' },
        { el: 'O', x: 0.48, y: 1.32, z: 0.48, role: 'Kyslík v 2. skupine SO₄²⁻' },
        // SO4 skupina 3 (vpravo)
        { el: 'S', x: 1.55, y: 0.42, z: 0, role: 'Síra v 3. skupine SO₄²⁻' },
        { el: 'O', x: 2.25, y: 0.05, z: -0.45, role: 'Kyslík v 3. skupine SO₄²⁻' },
        { el: 'O', x: 2.15, y: 1.05, z: 0.45, role: 'Kyslík v 3. skupine SO₄²⁻' },
        { el: 'O', x: 1.05, y: 1.08, z: -0.52, role: 'Kyslík v 3. skupine SO₄²⁻' },
        { el: 'O', x: 0.95, y: -0.05, z: 0.52, role: 'Kyslík v 3. skupine SO₄²⁻' },
      ],
      bonds: [
        // Väzby v 1. SO4
        { from: 2, to: 3, order: 2 },
        { from: 2, to: 4, order: 2 },
        { from: 2, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
        // Väzby v 2. SO4
        { from: 7, to: 8, order: 1 },
        { from: 7, to: 9, order: 1 },
        { from: 7, to: 10, order: 2 },
        { from: 7, to: 11, order: 2 },
        // Väzby v 3. SO4
        { from: 12, to: 13, order: 2 },
        { from: 12, to: 14, order: 2 },
        { from: 12, to: 15, order: 1 },
        { from: 12, to: 16, order: 1 },
        // Iónové interakcie s Al3+
        { from: 0, to: 6, order: 'ionic' },
        { from: 0, to: 8, order: 'ionic' },
        { from: 1, to: 9, order: 'ionic' },
        { from: 1, to: 16, order: 'ionic' },
      ],
    },
  },

  CH3COOH: {
    formula: 'CH3COOH',
    name: 'Kyselina octová',
    systematicName: 'Kyselina etánová',
    latinName: 'Acidum aceticum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná kvapalina s octovým zápachom)',
    geometryLabel: 'Organická molekula: metylová skupina –CH₃ + karboxylová skupina –COOH',
    studentSummary:
      'Kyselina octová je organická kyselina, ktorej 5 až 8 % vodný roztok poznáme v domácnosti ako kuchynský ocot. Zápis CH₃COOH ukazuje jej dve časti: metylovú skupinu (CH₃) a kyslú karboxylovú skupinu (COOH), spolu 2 uhlíky, 4 vodíky a 2 kyslíky.',
    expertSummary:
      'Jednosýtna karboxylová kyselina so vzorcom CH₃–C(=O)–OH (sumárne C₂H₄O₂). Prvý uhlík (metylový) má hybridizáciu sp³, druhý uhlík (karboxylový) má planárnu hybridizáciu sp² s jednou dvojitou väzbou C=O a jednou jednoduchou väzbou C–OH.',
    usesAndFacts: [
      'Kuchynský ocot obsahuje 5–8 % kyseliny octovej a používa sa na dochucovanie a konzervovanie potravín (E260).',
      'Bezvodá (100 %) kyselina octová tuhne už pri 16,6 °C na kryštály podobné ľadu, preto sa nazýva „ľadová kyselina octová“.',
      'Dôležitá surovina na výrobu vinylacetátu (lepidlá, farby), acetanhydridu a esterov.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.78, y: 0.1, z: 0, role: 'Metylový uhlík (–CH₃)' },
        { el: 'H', x: -1.42, y: -0.58, z: 0.42, role: 'Vodík metylovej skupiny' },
        { el: 'H', x: -1.32, y: 0.92, z: 0.28, role: 'Vodík metylovej skupiny' },
        { el: 'H', x: -0.82, y: 0.02, z: -0.92, role: 'Vodík metylovej skupiny' },
        { el: 'C', x: 0.42, y: -0.05, z: 0, role: 'Karboxylový uhlík (–COOH)' },
        { el: 'O', x: 0.92, y: -1.02, z: 0.15, role: 'Karbonylový kyslík (=O)' },
        { el: 'O', x: 1.08, y: 0.92, z: -0.15, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 1.88, y: 0.82, z: -0.15, role: 'Kyslý karboxylový vodík' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 4, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
      ],
    },
  },

  NaCl: {
    formula: 'NaCl',
    name: 'Chlorid sodný',
    systematicName: 'Chlorid sodný',
    latinName: 'Natrii chloridum (Halit)',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biele kubické kryštály — kuchynská soľ)',
    geometryLabel: 'Iónová vzorcová jednotka: katión Na⁺ a anión Cl⁻ (kubická mriežka)',
    studentSummary:
      'Chlorid sodný je bežná kuchynská soľ. Ide o iónovú zlúčeninu, nie o izolovanú molekulu — v kryštáli sa pravidelne striedajú kladné sodné katióny Na⁺ a záporné chloridové anióny Cl⁻ v pomere 1 : 1.',
    expertSummary:
      'Typická iónová zlúčenina kryštalizujúca v plošne centrovanej kubickej sústave (typ halitu), kde každý katión Na⁺ je oktaédricky obklopený šiestimi aniónmi Cl⁻ a naopak (koordinačné číslo 6 : 6). Zápis NaCl predstavuje najmenšiu vzorcovú jednotku.',
    usesAndFacts: [
      'Nevyhnutný elektrolyt pre ľudský organizmus (udržiavanie osmotického tlaku a prenos nervových vzruchov).',
      'V prírode sa nachádza ako minerál kamenná soľ (halit) a rozpustený v morskej vode.',
      'Priemyselne sa elektrolýzou roztoku NaCl vyrába chlór, vodík a hydroxid sodný (NaOH).',
    ],
    structure: {
      atoms: [
        { el: 'Na', x: -0.78, y: 0, z: 0, charge: '+', role: 'Sodný katión Na⁺' },
        { el: 'Cl', x: 0.78, y: 0, z: 0, charge: '−', role: 'Chloridový anión Cl⁻' },
      ],
      bonds: [{ from: 0, to: 1, order: 'ionic' }],
    },
  },

  H2SO4: {
    formula: 'H2SO4',
    name: 'Kyselina sírová',
    systematicName: 'Kyselina tetraoxosírová',
    latinName: 'Acidum sulfuricum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (hustá olejovitá kvapalina)',
    geometryLabel: 'Tetraédrický stred síry: S(=O)₂(OH)₂',
    studentSummary:
      'Kyselina sírová je veľmi silná dvojsýtna minerálna kyselina. Jej molekula má v strede atóm síry obklopený štyrmi atómami kyslíka, pričom na dvoch z nich sú naviazané atómy vodíka.',
    expertSummary:
      'Silná dvojsýtna kyselina s centrálnym atómom síry v oxidačnom stupni +VI. Dva atómy kyslíka sú viazané dvojitou väzbou (S=O) a dva tvoria hydroxylové skupiny (S–OH). Miešanie s vodou je silne exotermické (kyselina sa vždy leje do vody, nikdy naopak).',
    usesAndFacts: [
      'Jedna z priemyselne najvyrábanejších chemikálií na svete — používa sa pri výrobe fosforečných hnojív.',
      'Slúži ako elektrolyt v olovených automobilových akumulátoroch.',
      'Koncentrovaná kyselina sírová má silné dehydratačné (vysušujúce) a oxidačné účinky.',
    ],
    structure: {
      atoms: [
        { el: 'S', x: 0, y: 0, z: 0, role: 'Centrálny atóm síry' },
        { el: 'O', x: -0.62, y: -0.88, z: 0.42, role: 'Oxo kyslík (=O)' },
        { el: 'O', x: 0.62, y: -0.88, z: -0.42, role: 'Oxo kyslík (=O)' },
        { el: 'O', x: -0.88, y: 0.72, z: -0.25, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'O', x: 0.88, y: 0.72, z: 0.25, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: -1.62, y: 0.58, z: -0.35, role: 'Kyslý vodík' },
        { el: 'H', x: 1.62, y: 0.58, z: 0.35, role: 'Kyslý vodík' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 3, to: 5, order: 1 },
        { from: 4, to: 6, order: 1 },
      ],
    },
  },

  HCl: {
    formula: 'HCl',
    name: 'Chlorovodík (Kyselina chlorovodíková)',
    systematicName: 'Chlorovodík / Kyselina chlorovodíková',
    latinName: 'Hydrogenii chloridum / Acidum hydrochloricum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (vo vodnom roztoku kvapalná kyselina)',
    geometryLabel: 'Lineárna dvojatómová molekula',
    studentSummary:
      'Molekula chlorovodíka pozostáva z jedného atómu vodíka a jedného atómu chlóru spojených jednoduchou kovalentnou väzbou. Rozpustením vo vode vytvára silnú kyselinu chlorovodíkovú.',
    expertSummary:
      'Polárna dvojatómová molekula H–Cl. Vo vodnom roztoku prakticky úplne ionizuje na oxóniové katióny H₃O⁺ a chloridové anióny Cl⁻.',
    usesAndFacts: [
      'Nachádza sa v žalúdočnej šťave človeka (~0,3–0,5 %), kde pomáha tráviť bielkoviny a ničí baktérie.',
      'Technický 30–38 % roztok sa v praxi označuje aj ako kyselina soľná.',
    ],
    structure: {
      atoms: [
        { el: 'H', x: -0.72, y: 0, z: 0, role: 'Atóm vodíka' },
        { el: 'Cl', x: 0.55, y: 0, z: 0, role: 'Atóm chlóru' },
      ],
      bonds: [{ from: 0, to: 1, order: 1 }],
    },
  },

  NaOH: {
    formula: 'NaOH',
    name: 'Hydroxid sodný',
    systematicName: 'Hydroxid sodný',
    latinName: 'Natrii hydroxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biele hygroskopické šupinky alebo pecičky)',
    geometryLabel: 'Iónová vzorcová jednotka: Na⁺ a OH⁻',
    studentSummary:
      'Hydroxid sodný je silná zásada zložená zo sodného katiónu Na⁺ a hydroxidového aniónu OH⁻. Vo vode sa ľahko rozpúšťa za uvoľňovania tepla.',
    expertSummary:
      'Iónová zlúčenina tvorená katiónom Na⁺ a polyatómovým aniónom OH⁻ (medzi O a H je polárna kovalentná väzba). Silná elektrolytická zásada.',
    usesAndFacts: [
      'Používa sa pri výrobe mydla (zmydelňovanie tukov), papiera, hliníka a na čistenie odpadových potrubí.',
    ],
    structure: {
      atoms: [
        { el: 'Na', x: -0.95, y: 0, z: 0, charge: '+', role: 'Sodný katión Na⁺' },
        { el: 'O', x: 0.35, y: 0, z: 0, charge: '−', role: 'Kyslík v anióne OH⁻' },
        { el: 'H', x: 1.15, y: 0, z: 0, role: 'Vodík v anióne OH⁻' },
      ],
      bonds: [
        { from: 0, to: 1, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
      ],
    },
  },

  O2: {
    formula: 'O2',
    name: 'Dikyslík (Molekulový kyslík)',
    systematicName: 'Dikyslík',
    latinName: 'Dioxygenium',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný plyn bez zápachu)',
    geometryLabel: 'Lineárna dvojatómová molekula (O=O)',
    studentSummary:
      'Bežný vzdušný kyslík netvoria jednotlivé atómy, ale dvojatómové molekuly O₂ spojené dvojitou väzbou.',
    expertSummary:
      'Homonukleárna dvojatómová molekula s dvojitou väzbou O=O (v základnom stave paramagnetický biradikál v tripletovom stave ³Σg⁻).',
    usesAndFacts: [
      'Tvorí približne 20,95 % objemu zemskej atmosféry a je nevyhnutný pre bunkové dýchanie a horenie.',
    ],
    structure: {
      atoms: [
        { el: 'O', x: -0.68, y: 0, z: 0, role: 'Atóm kyslíka (1)' },
        { el: 'O', x: 0.68, y: 0, z: 0, role: 'Atóm kyslíka (2)' },
      ],
      bonds: [{ from: 0, to: 1, order: 2 }],
    },
  },

  N2: {
    formula: 'N2',
    name: 'Didusík (Molekulový dusík)',
    systematicName: 'Didusík',
    latinName: 'Dinitrogenium',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (inertný plyn)',
    geometryLabel: 'Lineárna dvojatómová molekula (N≡N)',
    studentSummary:
      'Molekulový dusík tvorí 78 % vzduchu. Dva atómy dusíka sú v ňom spojené mimoriadne pevnou trojitou väzbou.',
    expertSummary:
      'Nepolárna dvojatómová molekula s trojitou väzbou N≡N (väzbová energia 945 kJ/mol), ktorá spôsobuje vysokú chemickú inertnosť pri izbovej teplote.',
    usesAndFacts: [
      'Používa sa ako ochranná atmosféra v potravinárstve a elektronike; kvapalný dusík vrie pri −195,8 °C.',
    ],
    structure: {
      atoms: [
        { el: 'N', x: -0.65, y: 0, z: 0, role: 'Atóm dusíka (1)' },
        { el: 'N', x: 0.65, y: 0, z: 0, role: 'Atóm dusíka (2)' },
      ],
      bonds: [{ from: 0, to: 1, order: 3 }],
    },
  },

  H2: {
    formula: 'H2',
    name: 'Divodík (Molekulový vodík)',
    systematicName: 'Divodík',
    latinName: 'Dihydrogenium',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (najľahší plyn)',
    geometryLabel: 'Lineárna dvojatómová molekula (H–H)',
    studentSummary:
      'Najjednoduchšia molekula vo vesmíre — tvoria ju dva atómy vodíka spojené jednou spoločnou dvojicou elektrónov.',
    expertSummary:
      'Kovalentná molekula H–H s jednou väzbou σ (dĺžka väzby 74 pm).',
    usesAndFacts: [
      'Čisté palivo pre vodíkové palivové články (pri spaľovaní vzniká iba čistá voda H₂O).',
    ],
    structure: {
      atoms: [
        { el: 'H', x: -0.55, y: 0, z: 0, role: 'Atóm vodíka (1)' },
        { el: 'H', x: 0.55, y: 0, z: 0, role: 'Atóm vodíka (2)' },
      ],
      bonds: [{ from: 0, to: 1, order: 1 }],
    },
  },

  C6H12O6: {
    formula: 'C6H12O6',
    name: 'Glukóza (alebo iná hexóza)',
    systematicName: 'D-glukóza (hexóza)',
    latinName: 'Glucosum',
    bondingType: 'molecular',
    stateAtSTP: 'Pevné (biela kryštalická sladká látka)',
    geometryLabel: 'Molekulový vzorec (existuje viac štruktúrnych izomérov)',
    isomerWarning:
      'Upozornenie: Sumárny vzorec C₆H₁₂O₆ prislúcha viacerým izomérom (napr. glukóza, fruktóza, galaktóza, manóza). Nižšie uvádzame prehľad atómového zloženia a informácie pre najrozšírenejší izomér — glukózu.',
    studentSummary:
      'Glukóza (hroznový cukor) je jednoduchý sacharid a hlavný zdroj energie pre bunky živých organizmov. Každá jej molekula obsahuje 6 atómov uhlíka, 12 atómov vodíka a 6 atómov kyslíka.',
    expertSummary:
      'Monosacharid zo skupiny aldohexóz (v cyklickej forme pyranózový kruh). Vzniká pri fotosyntéze zo šiestich molekúl CO₂ a šiestich molekúl H₂O.',
    usesAndFacts: [
      'Okamžitý zdroj energie v krvi cicavcov (glykémia) a stavebná jednotka škrobu, glykogénu a celulózy.',
    ],
    structure: null, // Sumárny vzorec C6H12O6 má viac izomérov — zobrazíme overené zloženie s upozornením
  },
};

/**
 * Klasifikuje typ látky (molekulová vs. iónová vs. atómová) na základe zloženia prvkov
 * a prípadného záznamu v databáze.
 */
export function classifyFormulaSubstance(parsedResult) {
  if (!parsedResult || !parsedResult.ok) return null;

  const dbEntry = COMPOUNDS_DATABASE[parsedResult.unitFormulaAscii] || null;
  if (dbEntry) {
    return {
      bondingType: dbEntry.bondingType,
      isIonic: dbEntry.bondingType === 'ionic',
      unitLabelSingular:
        dbEntry.bondingType === 'ionic' ? 'vzorcová jednotka' : 'molekula',
      unitLabelPlural2to4:
        dbEntry.bondingType === 'ionic' ? 'vzorcové jednotky' : 'molekuly',
      unitLabelPlural5Plus:
        dbEntry.bondingType === 'ionic' ? 'vzorcových jednotiek' : 'molekúl',
      unitLabelGenitiveSingular:
        dbEntry.bondingType === 'ionic' ? 'jednej vzorcovej jednotky' : 'jednej molekuly',
      unitLabelLocativeSingular:
        dbEntry.bondingType === 'ionic' ? 'v jednej vzorcovej jednotke' : 'v jednej molekule',
      badgeLabel:
        dbEntry.bondingType === 'ionic'
          ? 'Iónová zlúčenina (vzorcová jednotka)'
          : 'Molekulová látka (kovalentná molekula)',
      dbEntry,
    };
  }

  // Automatická chemická heuristika podľa typov prvkov v periodickej tabuľke
  const hasMetal = parsedResult.elements.some((e) => METAL_CATEGORIES.has(e.category));
  const hasNonMetal = parsedResult.elements.some((e) => !METAL_CATEGORIES.has(e.category));
  const hasAmmonium =
    parsedResult.unitFormulaAscii.startsWith('NH4') && parsedResult.elements.length > 2;

  const isIonic = (hasMetal && hasNonMetal) || hasAmmonium;
  const isSingleAtom =
    parsedResult.elements.length === 1 && parsedResult.totalAtomsPerUnit === 1;

  if (isSingleAtom) {
    return {
      bondingType: 'atomic',
      isIonic: false,
      unitLabelSingular: 'atóm / častica',
      unitLabelPlural2to4: 'atómy / častice',
      unitLabelPlural5Plus: 'atómov / častíc',
      unitLabelGenitiveSingular: 'jednej častice',
      unitLabelLocativeSingular: 'v jednej častici',
      badgeLabel: 'Samostatný chemický prvok',
      dbEntry: null,
    };
  }

  return {
    bondingType: isIonic ? 'ionic' : 'molecular',
    isIonic,
    unitLabelSingular: isIonic ? 'vzorcová jednotka' : 'molekula',
    unitLabelPlural2to4: isIonic ? 'vzorcové jednotky' : 'molekuly',
    unitLabelPlural5Plus: isIonic ? 'vzorcových jednotiek' : 'molekúl',
    unitLabelGenitiveSingular: isIonic ? 'jednej vzorcovej jednotky' : 'jednej molekuly',
    unitLabelLocativeSingular: isIonic ? 'v jednej vzorcovej jednotke' : 'v jednej molekule',
    badgeLabel: isIonic
      ? 'Iónová zlúčenina (vzorcová jednotka)'
      : 'Molekulová zlúčenina (molekula)',
    dbEntry: null,
  };
}
