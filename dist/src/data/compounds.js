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
  { formula: 'HNO3', display: 'HNO₃', label: 'Kyselina dusičná' },
  { formula: 'H3PO4', display: 'H₃PO₄', label: 'Kyselina fosforečná' },
  { formula: 'CaCO3', display: 'CaCO₃', label: 'Uhličitan vápenatý' },
  { formula: 'NaHCO3', display: 'NaHCO₃', label: 'Sóda bikarbóna' },
  { formula: 'KMnO4', display: 'KMnO₄', label: 'Manganistan draselný' },
  { formula: 'CuSO4', display: 'CuSO₄', label: 'Síran meďnatý' },
  { formula: 'H2O2', display: 'H₂O₂', label: 'Peroxid vodíka' },
  { formula: 'SO2', display: 'SO₂', label: 'Oxid siričitý' },
  { formula: 'O3', display: 'O₃', label: 'Ozón' },
  { formula: 'C2H5OH', display: 'C₂H₅OH', label: 'Etanol' },
  { formula: 'C6H6', display: 'C₆H₆', label: 'Benzén' },
  { formula: 'CO(NH2)2', display: 'CO(NH₂)₂', label: 'Močovina' },
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

  /* ==========================================================================
     Rozšírená databáza: Oxidy, peroxidy a plynné molekuly
     ========================================================================== */

  CO: {
    formula: 'CO',
    name: 'Oxid uhoľnatý',
    systematicName: 'Oxid uhoľnatý (monoxid uhlíka)',
    latinName: 'Carbonei monoxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný jedovatý plyn bez zápachu)',
    geometryLabel: 'Lineárna dvojatómová molekula (C≡O)',
    studentSummary:
      'Oxid uhoľnatý je nebezpečný plyn bez farby a zápachu, ktorý vzniká pri nedokonalom spaľovaní palív s nedostatkom kyslíka. Skladá sa z jedného atómu uhlíka a jedného atómu kyslíka.',
    expertSummary:
      'Dvojatómová molekula s trojitou väzbou C≡O (dve kovalentné väzby a jedna koordinačno-kovalentná väzba od kyslíka k uhlíku), ktorá má najvyššiu disociačnú energiu väzby zo všetkých známych dvojatómových molekúl (1072 kJ/mol).',
    usesAndFacts: [
      'Viaže sa na hemoglobín v krvi približne 200-krát silnejšie než kyslík (tvorí karboxyhemoglobín), čím znemožňuje prenos kyslíka.',
      'V priemysle je dôležitým redukčným činidlom pri výrobe surového železa vo vysokej peci a zložkou syntézneho plynu.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.62, y: 0, z: 0, role: 'Atóm uhlíka' },
        { el: 'O', x: 0.62, y: 0, z: 0, role: 'Atóm kyslíka' },
      ],
      bonds: [{ from: 0, to: 1, order: 3 }],
    },
  },

  H2O2: {
    formula: 'H2O2',
    name: 'Peroxid vodíka',
    systematicName: 'Dioxidán (peroxid vodíka)',
    latinName: 'Hydrogenii peroxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bledomodrá viskózna kvapalina)',
    geometryLabel: 'Lomená neplanárna štruktúra (H–O–O–H)',
    studentSummary:
      'Peroxid vodíka má oproti vode o jeden atóm kyslíka viac. Dva atómy kyslíka sú v ňom spojené jednoduchou peroxidovou väzbou O–O a na každom z nich je naviazaný jeden atóm vodíka.',
    expertSummary:
      'Najjednoduchší peroxid s charakteristickou jednoduchou väzbou –O–O– (oxidačný stupeň kyslíka je −I). Molekula má neplanárnu šikmú konformáciu v dôsledku odpudzovania voľných elektrónových párov na kyslíkoch.',
    usesAndFacts: [
      'Zriedený 3 % vodný roztok sa používa v lekárnictve ako dezinfekčné a antiseptické činidlo.',
      'Katalyzátorom (napr. oxidom manganičitým MnO₂ alebo enzýmom katalázou v krvi) sa rýchlo rozkladá na vodu a plynný kyslík.',
    ],
    structure: {
      atoms: [
        { el: 'O', x: -0.68, y: -0.15, z: 0.12, role: 'Peroxidový kyslík (1)' },
        { el: 'O', x: 0.68, y: -0.15, z: -0.12, role: 'Peroxidový kyslík (2)' },
        { el: 'H', x: -1.18, y: 0.58, z: -0.38, role: 'Atóm vodíka (1)' },
        { el: 'H', x: 1.18, y: 0.58, z: 0.38, role: 'Atóm vodíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
      ],
    },
  },

  SO2: {
    formula: 'SO2',
    name: 'Oxid siričitý',
    systematicName: 'Oxid siričitý (dioxid síry)',
    latinName: 'Sulfuris dioxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný štipľavý plyn)',
    geometryLabel: 'Lomená molekula (väzbový uhol 119°)',
    studentSummary:
      'Oxid siričitý je bezfarebný plyn s dusivým zápachom, ktorý vzniká pri horení síry alebo spaľovaní uhlia. V strede molekuly je atóm síry spojený s dvoma atómami kyslíka.',
    expertSummary:
      'Polárna lomená molekula so symetriou C2v a sírou v oxidačnom stupni +IV (hybridizácia sp², jeden voľný elektrónový pár na síre zmenšuje väzbový uhol O–S–O na 119°).',
    usesAndFacts: [
      'Medziprodukt pri priemyselnej výrobe kyseliny sírovej kontaktným spôsobom.',
      'V potravinárstve a vinárstve sa používa ako konzervant a antioxidant (E220 — sírenie sudov).',
    ],
    structure: {
      atoms: [
        { el: 'S', x: 0, y: -0.28, z: 0, role: 'Centrálny atóm síry' },
        { el: 'O', x: -1.12, y: 0.38, z: 0.1, role: 'Atóm kyslíka (1)' },
        { el: 'O', x: 1.12, y: 0.38, z: -0.1, role: 'Atóm kyslíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
      ],
    },
  },

  SO3: {
    formula: 'SO3',
    name: 'Oxid sírový',
    systematicName: 'Oxid sírový (trioxid síry)',
    latinName: 'Sulfuris trioxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné / Pevné (prchavá látka silne dymiaca na vzduchu)',
    geometryLabel: 'Trigonálna planárna molekula (väzbový uhol 120°)',
    studentSummary:
      'Oxid sírový má v strede atóm síry symetricky obklopený troma atómami kyslíka v jednej rovine. Jeho reakciou s vodou vzniká kyselina sírová.',
    expertSummary:
      'Nepolárna trigonálne planárna molekula (symetria D3h) so sírou v oxidačnom stupni +VI a hybridizácii sp². Všetky tri väzby S=O sú rovnocenné s uhlom 120°.',
    usesAndFacts: [
      'Priamy anhydrid kyseliny sírovej (H₂SO₄); v priemysle sa absorbuje do koncentrovanej H₂SO₄ za vzniku olea.',
    ],
    structure: {
      atoms: [
        { el: 'S', x: 0, y: 0, z: 0, role: 'Centrálny atóm síry' },
        { el: 'O', x: 0, y: -1.18, z: 0, role: 'Atóm kyslíka (1)' },
        { el: 'O', x: -1.02, y: 0.59, z: 0, role: 'Atóm kyslíka (2)' },
        { el: 'O', x: 1.02, y: 0.59, z: 0, role: 'Atóm kyslíka (3)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
        { from: 0, to: 3, order: 2 },
      ],
    },
  },

  NO: {
    formula: 'NO',
    name: 'Oxid dusnatý',
    systematicName: 'Oxid dusnatý (monoxid dusíka)',
    latinName: 'Nitrogenii monoxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný reaktívny plyn)',
    geometryLabel: 'Lineárna dvojatómová molekula (radikál)',
    studentSummary:
      'Oxid dusnatý sa skladá z jedného atómu dusíka a jedného atómu kyslíka. Na vzduchu sa okamžite zlučuje s kyslíkom na hnedý oxid dusičitý (NO₂).',
    expertSummary:
      'Paramagnetická dvojatómová molekula s nepárnym počtom elektrónov (11 valenčných elektrónov, väzbový poriadok 2,5). Medziprodukt pri výrobe kyseliny dusičnej Ostwaldovým procesom.',
    usesAndFacts: [
      'V ľudskom tele pôsobí ako dôležitá signálna molekula uvoľňujúca hladké svalstvo ciev (vazodilatácia).',
    ],
    structure: {
      atoms: [
        { el: 'N', x: -0.62, y: 0, z: 0, role: 'Atóm dusíka' },
        { el: 'O', x: 0.62, y: 0, z: 0, role: 'Atóm kyslíka' },
      ],
      bonds: [{ from: 0, to: 1, order: 2 }],
    },
  },

  NO2: {
    formula: 'NO2',
    name: 'Oxid dusičitý',
    systematicName: 'Oxid dusičitý (dioxid dusíka)',
    latinName: 'Nitrogenii dioxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (červenohnedý jedovatý plyn)',
    geometryLabel: 'Lomená molekula (väzbový uhol 134°)',
    studentSummary:
      'Oxid dusičitý je charakteristický červenohnedý plyn s dráždivým zápachom, v ktorom je jeden atóm dusíka viazaný na dva atómy kyslíka.',
    expertSummary:
      'Lomená paramagnetická molekula (radikál s jedným nespáreným elektrónom na dusíku, uhol O–N–O 134,3°). Pri nízkych teplotách dimerizuje na bezfarebný oxidaničitan N₂O₄.',
    usesAndFacts: [
      'Kľúčový medziprodukt pri priemyselnej výrobe kyseliny dusičnej (HNO₃).',
      'Patrí medzi hlavné zložky priemyselného a dopravného smogu (NOₓ).',
    ],
    structure: {
      atoms: [
        { el: 'N', x: 0, y: -0.22, z: 0, role: 'Centrálny atóm dusíka' },
        { el: 'O', x: -1.08, y: 0.32, z: 0.08, role: 'Atóm kyslíka (1)' },
        { el: 'O', x: 1.08, y: 0.32, z: -0.08, role: 'Atóm kyslíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
      ],
    },
  },

  N2O: {
    formula: 'N2O',
    name: 'Oxid dusný (Rajský plyn)',
    systematicName: 'Oxid dusný (monoxid didusíka)',
    latinName: 'Dinitrogenii oxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný plyn s jemne sladkastou vôňou)',
    geometryLabel: 'Lineárna nesymetrická molekula (N≡N–O)',
    studentSummary:
      'Oxid dusný, známy ako rajský plyn, sa skladá z dvoch atómov dusíka a jedného atómu kyslíka usporiadaných v priamke (N–N–O).',
    expertSummary:
      'Lineárna rezonančne stabilizovaná molekula (N≡N⁺–O⁻ ↔ ⁻N=N⁺=O), izoelektrónová s molekulou CO₂.',
    usesAndFacts: [
      'V medicíne a zubnom lekárstve sa používa ako inhalačné anestetikum a analgetikum.',
      'V potravinárstve slúži ako hnací plyn do šľahačkových bombičiek (E942).',
    ],
    structure: {
      atoms: [
        { el: 'N', x: -1.12, y: 0, z: 0, role: 'Koncový atóm dusíka' },
        { el: 'N', x: 0, y: 0, z: 0, role: 'Stredový atóm dusíka' },
        { el: 'O', x: 1.15, y: 0, z: 0, role: 'Koncový atóm kyslíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 3 },
        { from: 1, to: 2, order: 1 },
      ],
    },
  },

  O3: {
    formula: 'O3',
    name: 'Ozón (Trikyslík)',
    systematicName: 'Trikyslík (ozón)',
    latinName: 'Ozonum / Trioxygenium',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bledomodrý plyn s charakteristickým zápachom)',
    geometryLabel: 'Lomená molekula (väzbový uhol 116,8°)',
    studentSummary:
      'Ozón je trojatómová forma kyslíka (O₃). V stratosfére tvorí ozónovú vrstvu, ktorá chráni život na Zemi pred nebezpečným ultrafialovým žiarením Slnka.',
    expertSummary:
      'Alotropická modifikácia kyslíka s lomenou symetriou C2v. Dve väzby O–O sú rezonančne rovnocenné s väzbovým poriadkom 1,5.',
    usesAndFacts: [
      'Silné oxidačné činidlo používané na dezinfekciu pitnej vody (ozonizácia namiesto chlórovania).',
      'Vzniká v atmosfére účinkom UV žiarenia alebo pri elektrických výbojoch počas búrky.',
    ],
    structure: {
      atoms: [
        { el: 'O', x: 0, y: -0.32, z: 0, role: 'Stredový atóm kyslíka' },
        { el: 'O', x: -1.05, y: 0.35, z: 0.08, role: 'Krajný atóm kyslíka (1)' },
        { el: 'O', x: 1.05, y: 0.35, z: -0.08, role: 'Krajný atóm kyslíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
      ],
    },
  },

  Cl2: {
    formula: 'Cl2',
    name: 'Dichlór (Molekulový chlór)',
    systematicName: 'Dichlór',
    latinName: 'Dichlorum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (žltozelený ťažký jedovatý plyn)',
    geometryLabel: 'Lineárna dvojatómová molekula (Cl–Cl)',
    studentSummary:
      'Elementárny chlór existuje ako dvojatómová molekula Cl₂. Je to žltozelený plyn so silnými bieliacimi a dezinfekčnými účinkami.',
    expertSummary:
      'Nepolárna homonukleárna molekula spojená jednoduchou kovalentnou väzbou σ (dĺžka väzby 199 pm). Silné oxidačné činidlo.',
    usesAndFacts: [
      'Používa sa na hygienické zabezpečenie pitnej a bazénovej vody a pri výrobe plastov (PVC).',
    ],
    structure: {
      atoms: [
        { el: 'Cl', x: -0.78, y: 0, z: 0, role: 'Atóm chlóru (1)' },
        { el: 'Cl', x: 0.78, y: 0, z: 0, role: 'Atóm chlóru (2)' },
      ],
      bonds: [{ from: 0, to: 1, order: 1 }],
    },
  },

  CaO: {
    formula: 'CaO',
    name: 'Oxid vápenatý (Pálené vápno)',
    systematicName: 'Oxid vápenatý',
    latinName: 'Calcii oxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela žiaruvzdorná pevná látka)',
    geometryLabel: 'Iónová vzorcová jednotka: Ca²⁺ a O²⁻',
    studentSummary:
      'Oxid vápenatý, známy ako pálené vápno, je iónová zlúčenina vápnika a kyslíka v pomere 1 : 1. Vyrába sa pálením vápenca (CaCO₃) pri vysokej teplote.',
    expertSummary:
      'Iónový kryštál s kubickou mriežkou typu NaCl tvorený dvojmocnými katiónmi Ca²⁺ a oxidovými aniónmi O²⁻. S vodou prudko exotermicky reaguje za vzniku Ca(OH)₂.',
    usesAndFacts: [
      'Základná surovina v stavebníctve (výroba cementu, malty a haseného vápna) a v hutníctve.',
    ],
    structure: {
      atoms: [
        { el: 'Ca', x: -0.75, y: 0, z: 0, charge: '2+', role: 'Vápenatý katión Ca²⁺' },
        { el: 'O', x: 0.75, y: 0, z: 0, charge: '2−', role: 'Oxidový anión O²⁻' },
      ],
      bonds: [{ from: 0, to: 1, order: 'ionic' }],
    },
  },

  MgO: {
    formula: 'MgO',
    name: 'Oxid horečnatý (Magnézia)',
    systematicName: 'Oxid horečnatý',
    latinName: 'Magnesii oxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biely prášok s vysokou teplotou topenia 2852 °C)',
    geometryLabel: 'Iónová vzorcová jednotka: Mg²⁺ a O²⁻',
    studentSummary:
      'Oxid horečnatý je biely prášok, ktorý vzniká aj pri horení horčíkovej pásky oslnivým bielym plameňom. Vzorcová jednotka obsahuje katión Mg²⁺ a anión O²⁻.',
    expertSummary:
      'Iónová zlúčenina s vysokou mriežkovou energiou (kubická sústava typu halitu), vďaka ktorej má mimoriadne vysokú teplotu topenia (2852 °C).',
    usesAndFacts: [
      'Používa sa ako žiaruvzdorná výmurovka pecí, v medicíne proti prekysleniu žalúdka a v športe ako prášková magnézia.',
    ],
    structure: {
      atoms: [
        { el: 'Mg', x: -0.72, y: 0, z: 0, charge: '2+', role: 'Horečnatý katión Mg²⁺' },
        { el: 'O', x: 0.72, y: 0, z: 0, charge: '2−', role: 'Oxidový anión O²⁻' },
      ],
      bonds: [{ from: 0, to: 1, order: 'ionic' }],
    },
  },

  Fe2O3: {
    formula: 'Fe2O3',
    name: 'Oxid železitý (Hematit / Hrdza)',
    systematicName: 'Trioxid diželezitý',
    latinName: 'Ferri(III) oxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (červenohnedá pevná látka)',
    geometryLabel: 'Vzorcová jednotka: 2× Fe³⁺ a 3× O²⁻',
    studentSummary:
      'Oxid železitý tvorí hlavnú zložku železnej rudy hematitu (krveľa) a červenohnedej hrdze. Vzorcová jednotka obsahuje 2 atómy železa a 3 atómy kyslíka.',
    expertSummary:
      'Iónovo-kovalentný oxid so železom v oxidačnom stupni +III (2 × (+III) + 3 × (−II) = 0). Kryštalizuje v trigonálnej sústave (α-Fe₂O₃).',
    usesAndFacts: [
      'Najdôležitejšia železná ruda na výrobu železa a ocele a prírodný červený pigment (železitá červeň).',
    ],
    structure: {
      atoms: [
        { el: 'Fe', x: -0.85, y: -0.25, z: 0.15, charge: '3+', role: 'Železitý katión Fe³⁺ (1)' },
        { el: 'Fe', x: 0.85, y: -0.25, z: -0.15, charge: '3+', role: 'Železitý katión Fe³⁺ (2)' },
        { el: 'O', x: 0, y: 0.65, z: 0, charge: '2−', role: 'Oxidový anión O²⁻ (stred)' },
        { el: 'O', x: -1.65, y: 0.42, z: -0.25, charge: '2−', role: 'Oxidový anión O²⁻ (vľavo)' },
        { el: 'O', x: 1.65, y: 0.42, z: 0.25, charge: '2−', role: 'Oxidový anión O²⁻ (vpravo)' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 0, to: 3, order: 'ionic' },
        { from: 1, to: 2, order: 'ionic' },
        { from: 1, to: 4, order: 'ionic' },
      ],
    },
  },

  Al2O3: {
    formula: 'Al2O3',
    name: 'Oxid hlinitý (Korund)',
    systematicName: 'Trioxid dihlinitý',
    latinName: 'Aluminii oxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (veľmi tvrdá biela kryštalická látka)',
    geometryLabel: 'Vzorcová jednotka: 2× Al³⁺ a 3× O²⁻',
    studentSummary:
      'Oxid hlinitý je mimoriadne tvrdá látka, z ktorej sa vyrába kovový hliník. V prírode tvorí minerál korund a drahokamy rubín a zafír.',
    expertSummary:
      'Amfotérny oxid s iónovo-kovalentnou mriežkou (2× Al³⁺ a 3× O²⁻). Na povrchu kovového hliníka vytvára tenkú pasivačnú vrstvičku, ktorá ho chráni pred ďalšou koróziou.',
    usesAndFacts: [
      'Surovina na elektrolytickú výrobu hliníka (Hallov-Héroultov proces) a brúsny materiál (šmirgeľ).',
    ],
    structure: {
      atoms: [
        { el: 'Al', x: -0.85, y: -0.25, z: 0.15, charge: '3+', role: 'Hlinitý katión Al³⁺ (1)' },
        { el: 'Al', x: 0.85, y: -0.25, z: -0.15, charge: '3+', role: 'Hlinitý katión Al³⁺ (2)' },
        { el: 'O', x: 0, y: 0.65, z: 0, charge: '2−', role: 'Oxidový anión O²⁻ (stred)' },
        { el: 'O', x: -1.65, y: 0.42, z: -0.25, charge: '2−', role: 'Oxidový anión O²⁻ (vľavo)' },
        { el: 'O', x: 1.65, y: 0.42, z: 0.25, charge: '2−', role: 'Oxidový anión O²⁻ (vpravo)' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 0, to: 3, order: 'ionic' },
        { from: 1, to: 2, order: 'ionic' },
        { from: 1, to: 4, order: 'ionic' },
      ],
    },
  },

  SiO2: {
    formula: 'SiO2',
    name: 'Oxid kremičitý (Kremeň)',
    systematicName: 'Dioxid kremíka',
    latinName: 'Silicii dioxidum',
    bondingType: 'molecular',
    stateAtSTP: 'Pevné (tvrdý minerál kremeň, kremenný piesok)',
    geometryLabel: 'Vzorcová jednotka kovalentnej priestorovej siete SiO₂',
    studentSummary:
      'Oxid kremičitý tvorí kremeň a bežný piesok. Zápis SiO₂ udáva pomer 1 atómu kremíka na 2 atómy kyslíka v priestorovej kryštálovej mriežke.',
    expertSummary:
      'Atómový (kovalentný) kryštál tvorený nekonečnou trojrozmernou sieťou tetraédrov [SiO₄], kde každý atóm kremíka je viazaný so 4 kyslíkmi a každý kyslík premosťuje 2 kremíky (sumárny pomer Si : O = 1 : 2).',
    usesAndFacts: [
      'Hlavná surovina na výrobu skla, optických vlákien, keramiky a čistého polovodičového kremíka.',
    ],
    structure: {
      atoms: [
        { el: 'Si', x: 0, y: 0, z: 0, role: 'Atóm kremíka' },
        { el: 'O', x: -1.18, y: 0, z: 0, role: 'Atóm kyslíka (1)' },
        { el: 'O', x: 1.18, y: 0, z: 0, role: 'Atóm kyslíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
      ],
    },
  },

  /* ==========================================================================
     Rozšírená databáza: Anorganické a organické kyseliny
     ========================================================================== */

  HF: {
    formula: 'HF',
    name: 'Fluorovodík (Kyselina fluorovodíková)',
    systematicName: 'Fluorovodík / Kyselina fluorovodíková',
    latinName: 'Hydrogenii fluoridum / Acidum hydrofluoricum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné / Kvapalné (teplota varu 19,5 °C)',
    geometryLabel: 'Lineárna silne polárna molekula (H–F)',
    studentSummary:
      'Fluorovodík je zlúčenina vodíka a fluóru. Jeho vodný roztok — kyselina fluorovodíková — dokáže ako jedna z mála látok rozpúšťať sklo.',
    expertSummary:
      'Silne polárna kovalentná molekula H–F s veľkým rozdielom elektronegativít, ktorá vytvára silné medzimolekulové vodíkové väzby (reťazce (HF)ₙ).',
    usesAndFacts: [
      'Používa sa na leptanie skla (reaguje s SiO₂ za vzniku plynného SiF₄) a pri výrobe fluórovaných polymérov (teflón).',
    ],
    structure: {
      atoms: [
        { el: 'H', x: -0.62, y: 0, z: 0, role: 'Atóm vodíka' },
        { el: 'F', x: 0.52, y: 0, z: 0, role: 'Atóm fluóru' },
      ],
      bonds: [{ from: 0, to: 1, order: 1 }],
    },
  },

  H2S: {
    formula: 'H2S',
    name: 'Sulfán (Sírovodík)',
    systematicName: 'Sulfán (dihydrid síry)',
    latinName: 'Hydrogenii sulfidum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný jedovatý plyn so zápachom skazených vajec)',
    geometryLabel: 'Lomená molekula (väzbový uhol 92,1°)',
    studentSummary:
      'Sulfán (staršie sírovodík) je jedovatý plyn s typickým zápachom po skazených vajciach. V jeho molekule je jeden atóm síry viazaný na dva atómy vodíka.',
    expertSummary:
      'Lomená kovalentná molekula analogická vode, avšak s podstatne menším väzbovým uhlom H–S–H (92,1°). Vo vodnom roztoku tvorí slabú dvojsýtnu kyselinu sulfánovú.',
    usesAndFacts: [
      'Nachádza sa v sírnych minerálnych prameňoch (napr. Piešťany, Smrdáky) a v sopečných plynoch.',
    ],
    structure: {
      atoms: [
        { el: 'S', x: 0, y: -0.25, z: 0, role: 'Centrálny atóm síry' },
        { el: 'H', x: -0.88, y: 0.48, z: 0.1, role: 'Atóm vodíka (1)' },
        { el: 'H', x: 0.88, y: 0.48, z: -0.1, role: 'Atóm vodíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
      ],
    },
  },

  HNO3: {
    formula: 'HNO3',
    name: 'Kyselina dusičná',
    systematicName: 'Kyselina trioxodusičná',
    latinName: 'Acidum nitricum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná silne oxidujúca kyselina)',
    geometryLabel: 'Planárna nitrátová skupina HO–NO₂',
    studentSummary:
      'Kyselina dusičná (staršie lúčavka) je silná jednosýtna kyselina zložená z 1 atómu vodíka, 1 atómu dusíka a 3 atómov kyslíka.',
    expertSummary:
      'Silná jednosýtna minerálna kyselina a silné oxidačné činidlo s dusíkom v oxidačnom stupni +V. Zmes koncentrovanej HNO₃ a HCl v pomere 1 : 3 tvorí lúčavku kráľovskú (rozpúšťa aj zlato a platinu).',
    usesAndFacts: [
      'Základná surovina na výrobu priemyselných hnojív (dusičnan amónny), farbív a výbušnín.',
    ],
    structure: {
      atoms: [
        { el: 'N', x: 0, y: 0, z: 0, role: 'Centrálny atóm dusíka (+V)' },
        { el: 'O', x: -0.88, y: -0.78, z: 0.1, role: 'Nitro kyslík (1)' },
        { el: 'O', x: 0.88, y: -0.78, z: -0.1, role: 'Nitro kyslík (2)' },
        { el: 'O', x: 0, y: 1.05, z: 0, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 0.78, y: 1.48, z: 0, role: 'Kyslý vodík' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
        { from: 0, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
      ],
    },
  },

  H2CO3: {
    formula: 'H2CO3',
    name: 'Kyselina uhličitá',
    systematicName: 'Kyselina trioxouhličitá',
    latinName: 'Acidum carbonicum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (existuje vo vodnom roztoku CO₂)',
    geometryLabel: 'Planárny stred uhlíka: O=C(OH)₂',
    studentSummary:
      'Kyselina uhličitá je slabá kyselina, ktorá vzniká rozpúšťaním oxidu uhličitého (CO₂) vo vode — napríklad v sýtenej minerálke alebo sóde.',
    expertSummary:
      'Slabá dvojsýtna kyselina v rovnováhe s rozpusteným CO₂ a H₂O. Tvorí dva rady solí: hydrogénuhličitany (HCO₃⁻) a uhličitany (CO₃²⁻).',
    usesAndFacts: [
      'Hydrogenuhličitanový tlmivý systém (H₂CO₃ / HCO₃⁻) udržuje stabilné pH ľudskej krvi (~7,4).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Centrálny atóm uhlíka' },
        { el: 'O', x: 0, y: -1.08, z: 0, role: 'Karbonylový kyslík (=O)' },
        { el: 'O', x: -0.95, y: 0.65, z: 0.1, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'O', x: 0.95, y: 0.65, z: -0.1, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: -1.68, y: 0.42, z: 0.2, role: 'Kyslý vodík (1)' },
        { el: 'H', x: 1.68, y: 0.42, z: -0.2, role: 'Kyslý vodík (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 },
        { from: 3, to: 5, order: 1 },
      ],
    },
  },

  H3PO4: {
    formula: 'H3PO4',
    name: 'Kyselina trihydrogenfosforečná',
    systematicName: 'Kyselina tetraoxofosforečná',
    latinName: 'Acidum phosphoricum',
    bondingType: 'molecular',
    stateAtSTP: 'Pevné / Kvapalné (bezfarebné kryštály alebo 85 % sirupovitý roztok)',
    geometryLabel: 'Tetraédrický stred fosforu: O=P(OH)₃',
    studentSummary:
      'Kyselina fosforečná je trojsýtna kyselina, ktorá má v strede atóm fosforu obklopený štyrmi kyslíkmi a troma odštiepiteľnými vodíkmi.',
    expertSummary:
      'Stredne silná trojsýtna kyselina s fosforom v oxidačnom stupni +V (jeden oxo kyslík P=O a tri hydroxylové skupiny P–OH). Tvorí tri rady fosforečnanových solí.',
    usesAndFacts: [
      'Používa sa pri výrobe fosforečných hnojív, na odhrdzovanie kovov a v potravinárstve ako okysľujúca látka v kolových nápojoch (E338).',
      'Zvyšky kyseliny fosforečnej tvoria kostru molekúl DNA, RNA a energetického nosiča ATP.',
    ],
    structure: {
      atoms: [
        { el: 'P', x: 0, y: 0, z: 0, role: 'Centrálny atóm fosforu (+V)' },
        { el: 'O', x: 0, y: -1.12, z: 0, role: 'Oxo kyslík (=O)' },
        { el: 'O', x: -1.02, y: 0.45, z: 0.42, role: 'Hydroxylový kyslík (1)' },
        { el: 'O', x: 1.02, y: 0.45, z: 0.42, role: 'Hydroxylový kyslík (2)' },
        { el: 'O', x: 0, y: 0.35, z: -1.05, role: 'Hydroxylový kyslík (3)' },
        { el: 'H', x: -1.72, y: 0.25, z: 0.55, role: 'Kyslý vodík (1)' },
        { el: 'H', x: 1.72, y: 0.25, z: 0.55, role: 'Kyslý vodík (2)' },
        { el: 'H', x: 0.25, y: 0.98, z: -1.55, role: 'Kyslý vodík (3)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 2, to: 5, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 4, to: 7, order: 1 },
      ],
    },
  },

  HCOOH: {
    formula: 'HCOOH',
    name: 'Kyselina mravčia (Kyselina metánová)',
    systematicName: 'Kyselina metánová',
    latinName: 'Acidum formicum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná štipľavá kvapalina)',
    geometryLabel: 'Planárna molekula H–C(=O)–OH',
    studentSummary:
      'Kyselina mravčia je najjednoduchšia karboxylová kyselina — obsahuje iba jeden atóm uhlíka. V prírode sa nachádza v jede mravcov, včiel a v chĺpkoch pŕhľavy.',
    expertSummary:
      'Najnižšia jednosýtna karboxylová kyselina (H–COOH), ktorá má pre prítomnosť vodíka viazaného priamo na karboxylový uhlík aj redukčné vlastnosti (podobne ako aldehydy).',
    usesAndFacts: [
      'Používa sa v včelárstve na liečenie včelstiev proti klieštikovi (varroáze), pri spracovaní kože a konzervovaní siláže.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Karboxylový uhlík' },
        { el: 'H', x: -0.98, y: 0.15, z: 0, role: 'Vodík viazaný na uhlík' },
        { el: 'O', x: 0.45, y: -1.02, z: 0.1, role: 'Karbonylový kyslík (=O)' },
        { el: 'O', x: 0.72, y: 0.88, z: -0.1, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 1.55, y: 0.72, z: -0.1, role: 'Kyslý vodík' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 2 },
        { from: 0, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
      ],
    },
  },

  /* ==========================================================================
     Rozšírená databáza: Hydroxidy, soli a iónové zlúčeniny
     ========================================================================== */

  KOH: {
    formula: 'KOH',
    name: 'Hydroxid draselný',
    systematicName: 'Hydroxid draselný',
    latinName: 'Kalii hydroxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela silne hygroskopická látka)',
    geometryLabel: 'Iónová vzorcová jednotka: K⁺ a OH⁻',
    studentSummary:
      'Hydroxid draselný je silná zásada tvorená draselným katiónom K⁺ a hydroxidovým aniónom OH⁻.',
    expertSummary:
      'Typický iónový hydroxid alkalického kovu, vo vode úplne disociujúci na K⁺ a OH⁻.',
    usesAndFacts: [
      'Slúži ako elektrolyt v alkalických batériách a pri výrobe tekutých draselných mydiel.',
    ],
    structure: {
      atoms: [
        { el: 'K', x: -0.95, y: 0, z: 0, charge: '+', role: 'Draselný katión K⁺' },
        { el: 'O', x: 0.35, y: 0, z: 0, charge: '−', role: 'Kyslík v anióne OH⁻' },
        { el: 'H', x: 1.15, y: 0, z: 0, role: 'Vodík v anióne OH⁻' },
      ],
      bonds: [
        { from: 0, to: 1, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
      ],
    },
  },

  'Mg(OH)2': {
    formula: 'Mg(OH)2',
    name: 'Hydroxid horečnatý',
    systematicName: 'Dihydroxid horečnatý',
    latinName: 'Magnesii hydroxidum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela málo rozpustná látka)',
    geometryLabel: 'Iónová vzorcová jednotka: Mg²⁺ a 2× OH⁻',
    studentSummary:
      'Hydroxid horečnatý má vo vzorcovej jednotke jeden katión horčíka Mg²⁺ a dve hydroxidové skupiny OH⁻.',
    expertSummary:
      'Iónový hydroxid kovu alkalických zemín, v prírode sa vyskytujúci ako minerál brucit.',
    usesAndFacts: [
      'Vodná suspenzia („magnéziové mlieko“) sa používa v medicíne ako antacidum na neutralizáciu žalúdočnej kyseliny.',
    ],
    structure: {
      atoms: [
        { el: 'Mg', x: 0, y: 0, z: 0, charge: '2+', role: 'Horečnatý katión Mg²⁺' },
        { el: 'O', x: -1.12, y: 0, z: 0.1, charge: '−', role: 'Kyslík v 1. skupine OH⁻' },
        { el: 'H', x: -1.82, y: -0.42, z: 0.2, role: 'Vodík v 1. skupine OH⁻' },
        { el: 'O', x: 1.12, y: 0, z: -0.1, charge: '−', role: 'Kyslík v 2. skupine OH⁻' },
        { el: 'H', x: 1.82, y: 0.42, z: -0.2, role: 'Vodík v 2. skupine OH⁻' },
      ],
      bonds: [
        { from: 0, to: 1, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 'ionic' },
        { from: 3, to: 4, order: 1 },
      ],
    },
  },

  KCl: {
    formula: 'KCl',
    name: 'Chlorid draselný (Sylvín)',
    systematicName: 'Chlorid draselný',
    latinName: 'Kalii chloridum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biele kryštály)',
    geometryLabel: 'Iónová vzorcová jednotka: K⁺ a Cl⁻',
    studentSummary:
      'Chlorid draselný je iónová soľ zložená z draselného katiónu K⁺ a chloridového aniónu Cl⁻.',
    expertSummary:
      'Iónová zlúčenina kryštalizujúca v kubickej sústave (v prírode minerál sylvín).',
    usesAndFacts: [
      'Najdôležitejšie draselné hnojivo v poľnohospodárstve a súčasť infúznych roztokov v medicíne.',
    ],
    structure: {
      atoms: [
        { el: 'K', x: -0.82, y: 0, z: 0, charge: '+', role: 'Draselný katión K⁺' },
        { el: 'Cl', x: 0.82, y: 0, z: 0, charge: '−', role: 'Chloridový anión Cl⁻' },
      ],
      bonds: [{ from: 0, to: 1, order: 'ionic' }],
    },
  },

  CaCl2: {
    formula: 'CaCl2',
    name: 'Chlorid vápenatý',
    systematicName: 'Dichlorid vápenatý',
    latinName: 'Calcii chloridum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela silne hygroskopická soľ)',
    geometryLabel: 'Iónová vzorcová jednotka: Ca²⁺ a 2× Cl⁻',
    studentSummary:
      'Chlorid vápenatý sa skladá z jedného vápenatého katiónu Ca²⁺ a dvoch chloridových aniónov Cl⁻. Silne pohlcuje vlhkosť zo vzduchu.',
    expertSummary:
      'Iónová halogénová soľ kovu alkalických zemín. Rozpúšťanie bezvodého CaCl₂ vo vode je výrazne exotermické.',
    usesAndFacts: [
      'Používa sa ako sušidlo v laboratórnych exsikátoroch a na zimný posyp ciest proti námraze.',
    ],
    structure: {
      atoms: [
        { el: 'Ca', x: 0, y: 0, z: 0, charge: '2+', role: 'Vápenatý katión Ca²⁺' },
        { el: 'Cl', x: -1.18, y: 0.15, z: 0, charge: '−', role: 'Chloridový anión Cl⁻ (1)' },
        { el: 'Cl', x: 1.18, y: -0.15, z: 0, charge: '−', role: 'Chloridový anión Cl⁻ (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 'ionic' },
        { from: 0, to: 2, order: 'ionic' },
      ],
    },
  },

  CaCO3: {
    formula: 'CaCO3',
    name: 'Uhličitan vápenatý (Vápenec)',
    systematicName: 'Trioxouhličitan vápenatý',
    latinName: 'Calcii carbonas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela nerastná látka — vápenec, mramor, krieda)',
    geometryLabel: 'Iónová vzorcová jednotka: Ca²⁺ a planárny anión CO₃²⁻',
    studentSummary:
      'Uhličitan vápenatý tvorí horninu vápenec, mramor, kriedu, ale aj schránky morských živočíchov, perly a vaječné škrupiny. Skladá sa z katiónu Ca²⁺ a uhličitanového aniónu CO₃²⁻.',
    expertSummary:
      'Iónová soľ zložená z katiónu Ca²⁺ a trigonálne planárneho uhličitanového aniónu CO₃²⁻. V prírode je polymorfný (minerály kalcit, aragonit a vaterit).',
    usesAndFacts: [
      'Pôsobením vody s rozpusteným CO₂ sa mení na rozpustný Ca(HCO₃)₂, čím vznikajú krasové jaskyne a kvaple.',
      'Základná surovina na výrobu cementu a páleného vápna.',
    ],
    structure: {
      atoms: [
        { el: 'Ca', x: -1.25, y: 0, z: 0, charge: '2+', role: 'Vápenatý katión Ca²⁺' },
        { el: 'C', x: 0.55, y: 0, z: 0, role: 'Uhlík v anióne CO₃²⁻' },
        { el: 'O', x: 1.55, y: 0, z: 0, role: 'Kyslík v anióne CO₃²⁻' },
        { el: 'O', x: -0.05, y: -0.88, z: 0.15, charge: '−', role: 'Kyslík v anióne CO₃²⁻' },
        { el: 'O', x: -0.05, y: 0.88, z: -0.15, charge: '−', role: 'Kyslík v anióne CO₃²⁻' },
      ],
      bonds: [
        { from: 1, to: 2, order: 2 },
        { from: 1, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 0, to: 3, order: 'ionic' },
        { from: 0, to: 4, order: 'ionic' },
      ],
    },
  },

  Na2CO3: {
    formula: 'Na2CO3',
    name: 'Uhličitan sodný (Sóda)',
    systematicName: 'Trioxouhličitan disodný',
    latinName: 'Natrii carbonas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biely prášok — kalcinovaná sóda)',
    geometryLabel: 'Iónová vzorcová jednotka: 2× Na⁺ a CO₃²⁻',
    studentSummary:
      'Uhličitan sodný (známy ako sóda na pranie) obsahuje dva sodné katióny Na⁺ a jeden uhličitanový anión CO₃²⁻.',
    expertSummary:
      'Sodná soľ kyseliny uhličitej, ktorej vodný roztok reaguje v dôsledku hydrolýzy aniónu CO₃²⁻ výrazne zásadito.',
    usesAndFacts: [
      'Kľúčová surovina pri výrobe skla, zmäkčovaní vody a výrobe pracích prostriedkov (Solvayov proces).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Uhlík v anióne CO₃²⁻' },
        { el: 'O', x: 0, y: -1.05, z: 0, role: 'Kyslík (=O)' },
        { el: 'O', x: -0.92, y: 0.55, z: 0.1, charge: '−', role: 'Kyslík (–O⁻)' },
        { el: 'O', x: 0.92, y: 0.55, z: -0.1, charge: '−', role: 'Kyslík (–O⁻)' },
        { el: 'Na', x: -1.78, y: -0.15, z: 0.2, charge: '+', role: 'Sodný katión Na⁺ (1)' },
        { el: 'Na', x: 1.78, y: -0.15, z: -0.2, charge: '+', role: 'Sodný katión Na⁺ (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 4, to: 2, order: 'ionic' },
        { from: 5, to: 3, order: 'ionic' },
      ],
    },
  },

  NaHCO3: {
    formula: 'NaHCO3',
    name: 'Hydrogenuhličitan sodný (Sóda bikarbóna)',
    systematicName: 'Hydrogentrioxouhličitan sodný',
    latinName: 'Natrii hydrogencarbonas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biely kryštalický prášok)',
    geometryLabel: 'Iónová vzorcová jednotka: Na⁺ a HCO₃⁻',
    studentSummary:
      'Sóda bikarbóna je bežná súčasť prášku do pečiva. Skladá sa zo sodného katiónu Na⁺ a hydrogénuhličitanového aniónu HCO₃⁻.',
    expertSummary:
      'Kyslá soľ kyseliny uhličitej. Pri zahrievaní nad 50 °C sa rozkladá na Na₂CO₃, H₂O a plynný CO₂, čo spôsobuje nakysnutie cesta.',
    usesAndFacts: [
      'Používa sa v potravinárstve (kypriaci prášok E500), v šumivých tabletách a v práškových hasiacich prístrojoch.',
    ],
    structure: {
      atoms: [
        { el: 'Na', x: -1.45, y: 0, z: 0, charge: '+', role: 'Sodný katión Na⁺' },
        { el: 'C', x: 0.25, y: 0, z: 0, role: 'Uhlík v anióne HCO₃⁻' },
        { el: 'O', x: -0.45, y: -0.85, z: 0.1, charge: '−', role: 'Kyslík v anióne HCO₃⁻' },
        { el: 'O', x: 0.25, y: 1.02, z: -0.1, role: 'Karbonylový kyslík (=O)' },
        { el: 'O', x: 1.22, y: -0.45, z: 0, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 1.92, y: -0.15, z: 0, role: 'Vodík v skupine –OH' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 1, to: 4, order: 1 },
        { from: 4, to: 5, order: 1 },
      ],
    },
  },

  CuSO4: {
    formula: 'CuSO4',
    name: 'Síran meďnatý',
    systematicName: 'Tetraoxosíran meďnatý',
    latinName: 'Cupri(II) sulfas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (bezvodý je biely, pentahydrát modrá skalica je sýtomodrý)',
    geometryLabel: 'Iónová vzorcová jednotka: Cu²⁺ a tetraédrický anión SO₄²⁻',
    studentSummary:
      'Síran meďnatý je iónová soľ zložená z meďnatého katiónu Cu²⁺ a síranového aniónu SO₄²⁻. S piatimi molekulami vody tvorí známe modré kryštály modrej skalice (CuSO₄·5H₂O).',
    expertSummary:
      'Iónová zlúčenina katiónu Cu²⁺ a tetraédrického aniónu SO₄²⁻. Bezvodý CuSO₄ je biely a pri styku so stopami vody zmodrie hydratáciou katiónov medi na [Cu(H₂O)₄]²⁺.',
    usesAndFacts: [
      'Používa sa v poľnohospodárstve ako fungicíd (Bordeauxská jícha), pri galvanickom pokovovaní a v školských chemických pokusoch.',
    ],
    structure: {
      atoms: [
        { el: 'Cu', x: -1.35, y: 0, z: 0, charge: '2+', role: 'Meďnatý katión Cu²⁺' },
        { el: 'S', x: 0.45, y: 0, z: 0, role: 'Centrálna síra v SO₄²⁻' },
        { el: 'O', x: -0.35, y: -0.78, z: 0.25, charge: '−', role: 'Kyslík v SO₄²⁻ (1)' },
        { el: 'O', x: -0.35, y: 0.78, z: -0.25, charge: '−', role: 'Kyslík v SO₄²⁻ (2)' },
        { el: 'O', x: 1.25, y: -0.68, z: -0.45, role: 'Kyslík v SO₄²⁻ (3)' },
        { el: 'O', x: 1.25, y: 0.68, z: 0.45, role: 'Kyslík v SO₄²⁻ (4)' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 0, to: 3, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 1, to: 4, order: 2 },
        { from: 1, to: 5, order: 2 },
      ],
    },
  },

  KMnO4: {
    formula: 'KMnO4',
    name: 'Manganistan draselný (Hypermangán)',
    systematicName: 'Tetraoxomanganistan draselný',
    latinName: 'Kalii permanganas',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (tmavofialové lesklé kryštály)',
    geometryLabel: 'Iónová vzorcová jednotka: K⁺ a tetraédrický anión MnO₄⁻',
    studentSummary:
      'Manganistan draselný (hypermangán) tvorí tmavofialové kryštáliky, ktoré už v malom množstve sfarbia vodu do sýtofialova. Obsahuje katión K⁺ a anión MnO₄⁻.',
    expertSummary:
      'Silné oxidačné činidlo s mangánom v najvyššom oxidačnom stupni +VII (tetraédrický anión MnO₄⁻). Intenzívne fialové sfarbenie je spôsobené prenosom náboja z kyslíka na mangán (LMCT prechod).',
    usesAndFacts: [
      'Využíva sa v analytickej chémii (manganometria), na dezinfekciu a pri úprave vody.',
    ],
    structure: {
      atoms: [
        { el: 'K', x: -1.42, y: 0, z: 0, charge: '+', role: 'Draselný katión K⁺' },
        { el: 'Mn', x: 0.42, y: 0, z: 0, role: 'Centrálny mangán (+VII)' },
        { el: 'O', x: -0.42, y: 0, z: 0.55, charge: '−', role: 'Kyslík v MnO₄⁻ (1)' },
        { el: 'O', x: 0.42, y: -0.98, z: -0.35, role: 'Kyslík v MnO₄⁻ (2)' },
        { el: 'O', x: 0.42, y: 0.98, z: -0.35, role: 'Kyslík v MnO₄⁻ (3)' },
        { el: 'O', x: 1.38, y: 0, z: 0.35, role: 'Kyslík v MnO₄⁻ (4)' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 1, to: 4, order: 2 },
        { from: 1, to: 5, order: 2 },
      ],
    },
  },

  AgNO3: {
    formula: 'AgNO3',
    name: 'Dusičnan strieborný (Lapis)',
    systematicName: 'Trioxodusičnan strieborný',
    latinName: 'Argenti nitras',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (bezfarebné kryštály citlivé na svetlo)',
    geometryLabel: 'Iónová vzorcová jednotka: Ag⁺ a NO₃⁻',
    studentSummary:
      'Dusičnan strieborný je rozpustná strieborná soľ zložená zo strieborného katiónu Ag⁺ a dusičnanového aniónu NO₃⁻.',
    expertSummary:
      'Iónová zlúčenina katiónu Ag⁺ a trigonálne planárneho aniónu NO₃⁻. V analytickej chémii (argentometria) slúži ako dôkazové činidlo na halogenidové ióny (zráža biely AgCl).',
    usesAndFacts: [
      'Používa sa pri výrobe zrkadiel, fotografických citlivých vrstiev a v medicíne na leptanie bradavíc (lapis).',
    ],
    structure: {
      atoms: [
        { el: 'Ag', x: -1.32, y: 0, z: 0, charge: '+', role: 'Strieborný katión Ag⁺' },
        { el: 'N', x: 0.48, y: 0, z: 0, role: 'Dusík v anióne NO₃⁻' },
        { el: 'O', x: -0.25, y: 0, z: 0.45, charge: '−', role: 'Kyslík v NO₃⁻ (1)' },
        { el: 'O', x: 0.95, y: -0.88, z: -0.15, role: 'Kyslík v NO₃⁻ (2)' },
        { el: 'O', x: 0.95, y: 0.88, z: -0.15, role: 'Kyslík v NO₃⁻ (3)' },
      ],
      bonds: [
        { from: 0, to: 2, order: 'ionic' },
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 1, to: 4, order: 2 },
      ],
    },
  },

  NH4Cl: {
    formula: 'NH4Cl',
    name: 'Chlorid amónny (Salmiak)',
    systematicName: 'Chlorid amónny',
    latinName: 'Ammonii chloridum',
    bondingType: 'ionic',
    stateAtSTP: 'Pevné (biela kryštalická soľ)',
    geometryLabel: 'Iónová vzorcová jednotka: katión NH₄⁺ a anión Cl⁻',
    studentSummary:
      'Chlorid amónny (salmiak) je zaujímavá iónová soľ, ktorá vôbec neobsahuje kov — kladným iónom je v nej amónny katión NH₄⁺ a záporným chloridový anión Cl⁻.',
    expertSummary:
      'Iónová zlúčenina zložená z tetraédrického polyatómového katiónu NH₄⁺ (kovalentné väzby N–H) a aniónu Cl⁻. Pri zahrievaní sublimuje (rozkladom na NH₃ a HCl).',
    usesAndFacts: [
      'Používa sa pri spájkovaní kovov na čistenie spájkovačky, v suchých zinkovo-uhlíkových článkoch a v lekárnictve.',
    ],
    structure: {
      atoms: [
        { el: 'N', x: -0.62, y: 0, z: 0, charge: '+', role: 'Dusík v katióne NH₄⁺' },
        { el: 'H', x: -0.62, y: -0.88, z: 0.25, role: 'Vodík v NH₄⁺ (1)' },
        { el: 'H', x: -1.45, y: 0.35, z: 0.35, role: 'Vodík v NH₄⁺ (2)' },
        { el: 'H', x: -0.62, y: 0.45, z: -0.82, role: 'Vodík v NH₄⁺ (3)' },
        { el: 'H', x: 0.18, y: 0.08, z: 0.22, role: 'Vodík v NH₄⁺ (4)' },
        { el: 'Cl', x: 1.28, y: 0, z: 0, charge: '−', role: 'Chloridový anión Cl⁻' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 4, to: 5, order: 'ionic' },
      ],
    },
  },

  /* ==========================================================================
     Rozšírená databáza: Organické zlúčeniny
     ========================================================================== */

  C2H6: {
    formula: 'C2H6',
    name: 'Etán',
    systematicName: 'Etán',
    latinName: 'Ethanum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný horľavý plyn)',
    geometryLabel: 'Nasýtený uhľovodík: H₃C–CH₃',
    studentSummary:
      'Etán je druhý najjednoduchší alkán po metáne. Tvoria ho dva atómy uhlíka spojené jednoduchou väzbou, na ktorých je naviazaných šesť atómov vodíka.',
    expertSummary:
      'Nasýtený acyklický uhľovodík (alkán) s dvoma tetraédrickými uhlíkmi v hybridizácii sp³ a voľnou rotáciou okolo väzby C–C.',
    usesAndFacts: [
      'Druhá najzastúpenejšia zložka zemného plynu; priemyselne sa pyrolýzou (krakovaním) mení na etylén (C₂H₄).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.68, y: 0, z: 0, role: 'Atóm uhlíka (1)' },
        { el: 'C', x: 0.68, y: 0, z: 0, role: 'Atóm uhlíka (2)' },
        { el: 'H', x: -1.18, y: -0.82, z: 0.35, role: 'Atóm vodíka' },
        { el: 'H', x: -1.18, y: 0.82, z: 0.35, role: 'Atóm vodíka' },
        { el: 'H', x: -1.12, y: 0, z: -0.88, role: 'Atóm vodíka' },
        { el: 'H', x: 1.18, y: -0.82, z: -0.35, role: 'Atóm vodíka' },
        { el: 'H', x: 1.18, y: 0.82, z: -0.35, role: 'Atóm vodíka' },
        { el: 'H', x: 1.12, y: 0, z: 0.88, role: 'Atóm vodíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
      ],
    },
  },

  C2H4: {
    formula: 'C2H4',
    name: 'Etylén (Etén)',
    systematicName: 'Etén',
    latinName: 'Ethenum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (bezfarebný plyn so sladkastou vôňou)',
    geometryLabel: 'Planárna molekula s dvojitou väzbou (H₂C=CH₂)',
    studentSummary:
      'Etylén (systematicky etén) je najjednoduchší alkén — medzi dvoma atómami uhlíka má dvojitú väzbu a všetky jeho atómy ležia v jednej rovine.',
    expertSummary:
      'Nenasýtený uhľovodík s oboma uhlíkmi v trigonálnej hybridizácii sp² (uhly H–C–H a H–C=C blízke 120°). Dvojitá väzba C=C pozostáva z jednej väzby σ a jednej väzby π.',
    usesAndFacts: [
      'Najvyrábanejšia organická zlúčenina na svete — monomér na výrobu polyetylénu (PE).',
      'V prírode pôsobí ako rastlinný hormón, ktorý urýchľuje dozrievanie ovocia (napr. banánov a jabĺk).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.62, y: 0, z: 0, role: 'Atóm uhlíka (1)' },
        { el: 'C', x: 0.62, y: 0, z: 0, role: 'Atóm uhlíka (2)' },
        { el: 'H', x: -1.25, y: -0.82, z: 0, role: 'Atóm vodíka' },
        { el: 'H', x: -1.25, y: 0.82, z: 0, role: 'Atóm vodíka' },
        { el: 'H', x: 1.25, y: -0.82, z: 0, role: 'Atóm vodíka' },
        { el: 'H', x: 1.25, y: 0.82, z: 0, role: 'Atóm vodíka' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 1, to: 4, order: 1 },
        { from: 1, to: 5, order: 1 },
      ],
    },
  },

  C2H2: {
    formula: 'C2H2',
    name: 'Acetylén (Etín)',
    systematicName: 'Etín',
    latinName: 'Ethynum',
    bondingType: 'molecular',
    stateAtSTP: 'Plynné (horľavý plyn)',
    geometryLabel: 'Lineárna molekula s trojitou väzbou (H–C≡C–H)',
    studentSummary:
      'Acetylén (etín) je najjednoduchší alkín. Dva atómy uhlíka sú v ňom spojené trojitou väzbou a celá molekula H–C≡C–H je priama (lineárna).',
    expertSummary:
      'Nenasýtený uhľovodík s uhlíkmi v digonálnej hybridizácii sp (väzbový uhol 180°). Trojitá väzba C≡C obsahuje jednu väzbu σ a dve navzájom kolmé väzby π.',
    usesAndFacts: [
      'Pri horení s čistým kyslíkom vytvára kyslíkovo-acetylénový plameň s teplotou vyše 3100 °C, používaný na zváranie a rezanie ocele.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.58, y: 0, z: 0, role: 'Atóm uhlíka (1)' },
        { el: 'C', x: 0.58, y: 0, z: 0, role: 'Atóm uhlíka (2)' },
        { el: 'H', x: -1.55, y: 0, z: 0, role: 'Atóm vodíka (1)' },
        { el: 'H', x: 1.55, y: 0, z: 0, role: 'Atóm vodíka (2)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 3 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
      ],
    },
  },

  C6H6: {
    formula: 'C6H6',
    name: 'Benzén',
    systematicName: 'Benzén (cyklohexa-1,3,5-trién)',
    latinName: 'Benzenum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná aromatická kvapalina)',
    geometryLabel: 'Planárny šesťčlenný aromatický kruh (D6h)',
    studentSummary:
      'Benzén je najznámejší aromatický uhľovodík. Jeho 6 atómov uhlíka tvorí pravidelný šesťuholníkový prsteň a na každom uhlíku je naviazaný jeden atóm vodíka.',
    expertSummary:
      'Typický arén spĺňajúci Hückelovo pravidlo aromaticity (6 delokalizovaných π elektrónov nad a pod rovinou kruhu). Všetky väzby C–C v kruhu sú rovnocenné s dĺžkou 139 pm.',
    usesAndFacts: [
      'Základná petrochemická surovina na výrobu styrénu (polystyrén), fenolu, anilínu a liečiv.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: -1.1, z: 0, role: 'Aromatický uhlík C1' },
        { el: 'C', x: 0.95, y: -0.55, z: 0, role: 'Aromatický uhlík C2' },
        { el: 'C', x: 0.95, y: 0.55, z: 0, role: 'Aromatický uhlík C3' },
        { el: 'C', x: 0, y: 1.1, z: 0, role: 'Aromatický uhlík C4' },
        { el: 'C', x: -0.95, y: 0.55, z: 0, role: 'Aromatický uhlík C5' },
        { el: 'C', x: -0.95, y: -0.55, z: 0, role: 'Aromatický uhlík C6' },
        { el: 'H', x: 0, y: -1.92, z: 0, role: 'Vodík H1' },
        { el: 'H', x: 1.66, y: -0.96, z: 0, role: 'Vodík H2' },
        { el: 'H', x: 1.66, y: 0.96, z: 0, role: 'Vodík H3' },
        { el: 'H', x: 0, y: 1.92, z: 0, role: 'Vodík H4' },
        { el: 'H', x: -1.66, y: 0.96, z: 0, role: 'Vodík H5' },
        { el: 'H', x: -1.66, y: -0.96, z: 0, role: 'Vodík H6' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 2, to: 8, order: 1 },
        { from: 3, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
        { from: 5, to: 11, order: 1 },
      ],
    },
  },

  CH3OH: {
    formula: 'CH3OH',
    name: 'Metanol (Drevný lieh)',
    systematicName: 'Metanol',
    latinName: 'Methanolum',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná prchavá jedovatá kvapalina)',
    geometryLabel: 'Najjednoduchší alkohol: H₃C–OH',
    studentSummary:
      'Metanol je najjednoduchší alkohol, ktorý vznikne nahradením jedného vodíka v metáne hydroxylovou skupinou –OH. Je prudko jedovatý (spôsobuje slepotu).',
    expertSummary:
      'Jednosýtny primárny alkohol CH₃OH. V ľudskom tele sa enzýmom alkoholdehydrogenázou metabolizuje na toxický formaldehyd a kyselinu mravčiu.',
    usesAndFacts: [
      'Dôležité priemyselné rozpúšťadlo, palivo a surovina na výrobu formaldehydu, kyseliny octovej a bionafty.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -0.52, y: 0, z: 0, role: 'Metylový uhlík (–CH₃)' },
        { el: 'O', x: 0.72, y: -0.15, z: 0, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 1.25, y: 0.58, z: 0, role: 'Vodík skupiny –OH' },
        { el: 'H', x: -0.95, y: -0.82, z: 0.35, role: 'Metylový vodík' },
        { el: 'H', x: -0.95, y: 0.82, z: 0.35, role: 'Metylový vodík' },
        { el: 'H', x: -0.88, y: 0, z: -0.88, role: 'Metylový vodík' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
      ],
    },
  },

  C2H5OH: {
    formula: 'C2H5OH',
    name: 'Etanol (Etylalkohol / Lieh)',
    systematicName: 'Etanol',
    latinName: 'Ethanolum / Spiritus vini',
    bondingType: 'molecular',
    stateAtSTP: 'Kvapalné (bezfarebná horľavá kvapalina)',
    geometryLabel: 'Primárny alkohol: CH₃–CH₂–OH',
    studentSummary:
      'Etanol (lieh) je dvojuhlíkový alkohol s charakteristickou hydroxylovou skupinou –OH. Vzniká alkoholovým kvasením cukrov pomocou kvasiniek.',
    expertSummary:
      'Jednosýtny alifatický alkohol CH₃CH₂OH. Vďaka polárnej skupine –OH vytvára vodíkové väzby a mieša sa s vodou v každom pomere.',
    usesAndFacts: [
      'Používa sa v medicíne a farmácii ako dezinfekčné činidlo a rozpúšťadlo (tinktúry), v priemysle ako biopalivo (E10/E85).',
    ],
    structure: {
      atoms: [
        { el: 'C', x: -1.05, y: 0.15, z: 0, role: 'Metylový uhlík (–CH₃)' },
        { el: 'C', x: 0.18, y: -0.25, z: 0, role: 'Metylénový uhlík (–CH₂–)' },
        { el: 'O', x: 1.18, y: 0.55, z: 0, role: 'Hydroxylový kyslík (–OH)' },
        { el: 'H', x: 1.92, y: 0.25, z: 0, role: 'Vodík skupiny –OH' },
        { el: 'H', x: -1.68, y: -0.58, z: 0.35, role: 'Vodík (–CH₃)' },
        { el: 'H', x: -1.45, y: 0.98, z: 0.35, role: 'Vodík (–CH₃)' },
        { el: 'H', x: -1.12, y: 0.25, z: -0.88, role: 'Vodík (–CH₃)' },
        { el: 'H', x: 0.35, y: -1.05, z: 0.55, role: 'Vodík (–CH₂–)' },
        { el: 'H', x: 0.35, y: -0.68, z: -0.82, role: 'Vodík (–CH₂–)' },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 1, to: 8, order: 1 },
      ],
    },
  },

  'CO(NH2)2': {
    formula: 'CO(NH2)2',
    name: 'Močovina (Karbamid)',
    systematicName: 'Karbonyldiamid (močovina)',
    latinName: 'Urea / Carbamidum',
    bondingType: 'molecular',
    stateAtSTP: 'Pevné (biele kryštáliky dobre rozpustné vo vode)',
    geometryLabel: 'Karbonylová skupina =C=O s dvoma amido skupinami –NH₂',
    studentSummary:
      'Močovina bola prvou organickou látkou v histórii, ktorú sa podarilo vyrobiť v laboratóriu z anorganických látok (Friedrich Wöhler, 1828). Obsahuje skupinu C=O a dve skupiny NH₂.',
    expertSummary:
      'Diamid kyseliny uhličitej so vzorcom O=C(NH₂)₂. V organizme cicavcov je konečným produktom odbúravania dusíka bielkovín v ornitínovom (močovinovom) cykle.',
    usesAndFacts: [
      'Najpoužívanejšie pevné dusíkaté hnojivo na svete (obsahuje až 46 % hmotnostných dusíka).',
      'Vodný roztok (32,5 %) močoviny sa používa v dieselových vozidlách pod názvom AdBlue na redukciu oxidov dusíka.',
    ],
    structure: {
      atoms: [
        { el: 'C', x: 0, y: 0, z: 0, role: 'Karbonylový uhlík' },
        { el: 'O', x: 0, y: -1.12, z: 0, role: 'Karbonylový kyslík (=O)' },
        { el: 'N', x: -1.02, y: 0.62, z: 0.1, role: 'Atóm dusíka (1. skupina –NH₂)' },
        { el: 'N', x: 1.02, y: 0.62, z: -0.1, role: 'Atóm dusíka (2. skupina –NH₂)' },
        { el: 'H', x: -1.78, y: 0.18, z: 0.25, role: 'Vodík v 1. skupine –NH₂' },
        { el: 'H', x: -1.02, y: 1.48, z: 0.15, role: 'Vodík v 1. skupine –NH₂' },
        { el: 'H', x: 1.78, y: 0.18, z: -0.25, role: 'Vodík v 2. skupine –NH₂' },
        { el: 'H', x: 1.02, y: 1.48, z: -0.15, role: 'Vodík v 2. skupine –NH₂' },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 },
        { from: 2, to: 5, order: 1 },
        { from: 3, to: 6, order: 1 },
        { from: 3, to: 7, order: 1 },
      ],
    },
  },

  C12H22O11: {
    formula: 'C12H22O11',
    name: 'Sacharóza (Repný / Trstinový cukor)',
    systematicName: 'β-D-fruktofuranozyl-α-D-glukopyranozid',
    latinName: 'Saccharosum',
    bondingType: 'molecular',
    stateAtSTP: 'Pevné (biele sladké kryštáliky — stolový cukor)',
    geometryLabel: 'Disacharid (molekula glukózy + molekula fruktózy)',
    isomerWarning:
      'Upozornenie: Sumárny vzorec C₁₂H₂₂O₁₁ zodpovedá disacharidom (sacharóza, laktóza, maltóza). Nižšie uvádzame informácie pre najbežnejší disacharid — sacharózu (stolový cukor).',
    studentSummary:
      'Sacharóza je bežný kuchynský cukor získavaný z cukrovej repy alebo cukrovej trstiny. Každá molekula vzniká spojením jednej glukózy a jednej fruktózy pri odštiepení vody (C₆H₁₂O₆ + C₆H₁₂O₆ − H₂O = C₁₂H₂₂O₁₁).',
    expertSummary:
      'neredukujúci disacharid tvorený α-D-glukopyranózou a β-D-fruktofuranózou spojenými O-glykozidovou väzbou α(1→2)β.',
    usesAndFacts: [
      'Najrozšírenejšie prírodné sladidlo a zdroj rýchlej energie v potravinárstve.',
    ],
    structure: null,
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
