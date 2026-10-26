import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ELEMENTS,
  ELEMENT_CATEGORIES,
  CATEGORY_MAP,
  GROUP_NAMES,
  ELEMENTS_BY_NUMBER,
  ELEMENTS_BY_SYMBOL,
  SHELL_LABELS,
} from '../src/data/elements.js';
import {
  parseChemicalFormula,
  handleSmartDigitInsertion,
} from '../src/lib/formula-parser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Validation failed: ${message}`);
  }
}

function validateDataset() {
  console.log('1. Validating periodic table dataset (118 elements)...');

  assert(Array.isArray(ELEMENTS), 'ELEMENTS must be an array');
  assert(ELEMENTS.length === 118, `Expected 118 elements, found ${ELEMENTS.length}`);

  const seenNumbers = new Set();
  const seenSymbols = new Set();
  const seenNames = new Set();
  const seenGridCells = new Set();

  // Known Madelung exception atomic numbers
  const expectedExceptions = new Set([
    24, 29, 41, 42, 44, 45, 46, 47, 57, 58, 64, 78, 79, 89, 90, 91, 92, 93, 96, 103,
  ]);

  for (let i = 0; i < ELEMENTS.length; i++) {
    const el = ELEMENTS[i];
    const expectedZ = i + 1;

    assert(
      el.atomicNumber === expectedZ,
      `Element at index ${i} has atomicNumber ${el.atomicNumber}, expected ${expectedZ}`
    );
    assert(!seenNumbers.has(el.atomicNumber), `Duplicate atomic number ${el.atomicNumber}`);
    seenNumbers.add(el.atomicNumber);

    assert(
      typeof el.symbol === 'string' && el.symbol.length >= 1 && el.symbol.length <= 2,
      `Invalid symbol for Z=${el.atomicNumber}`
    );
    assert(!seenSymbols.has(el.symbol), `Duplicate symbol ${el.symbol}`);
    seenSymbols.add(el.symbol);

    assert(typeof el.name === 'string' && el.name.length > 0, `Invalid Slovak name for Z=${el.atomicNumber}`);
    assert(!seenNames.has(el.name), `Duplicate Slovak name ${el.name}`);
    seenNames.add(el.name);

    assert(typeof el.latinName === 'string' && el.latinName.length > 0, `Missing Latin name for Z=${el.atomicNumber}`);

    assert(CATEGORY_MAP[el.category], `Unknown category "${el.category}" for ${el.name} (Z=${el.atomicNumber})`);

    assert(Number.isInteger(el.period) && el.period >= 1 && el.period <= 7, `Invalid period for ${el.name}`);
    if (el.group !== null) {
      assert(Number.isInteger(el.group) && el.group >= 1 && el.group <= 18, `Invalid group ${el.group} for ${el.name}`);
    }

    const cellKey = `${el.gridRow}:${el.gridColumn}`;
    assert(!seenGridCells.has(cellKey), `Duplicate grid cell ${cellKey} for ${el.name}`);
    seenGridCells.add(cellKey);

    assert(
      Array.isArray(el.shells) && el.shells.length >= 1 && el.shells.length <= SHELL_LABELS.length,
      `Invalid shells array for ${el.name}`
    );
    const shellSum = el.shells.reduce((acc, n) => acc + n, 0);
    assert(
      shellSum === el.atomicNumber,
      `Shell electrons sum (${shellSum}) !== atomicNumber (${el.atomicNumber}) for ${el.name}`
    );
    const expectedShellCount = el.atomicNumber === 46 ? 4 : el.period; // Pd (46) uniquely has [Kr] 4d¹⁰ 5s⁰
    assert(
      el.shells.length === expectedShellCount,
      `Number of shells (${el.shells.length}) !== expected (${expectedShellCount}) for ${el.name}`
    );

    assert(
      el.isConfigurationException === expectedExceptions.has(el.atomicNumber),
      `Unexpected exception flag for Z=${el.atomicNumber} (${el.symbol})`
    );

    assert(Array.isArray(el.isotopes) && el.isotopes.length >= 1, `Missing isotopes for ${el.name}`);
    const defaultIso = el.isotopes.find((iso) => iso.massNumber === el.defaultIsotope);
    assert(Boolean(defaultIso), `Default isotope ${el.defaultIsotope} not found in isotopes list for ${el.name}`);
    for (const iso of el.isotopes) {
      const neutrons = iso.massNumber - el.atomicNumber;
      assert(neutrons >= 0, `Negative neutron count for isotope ${iso.name} of ${el.name}`);
    }

    assert(
      typeof el.electronConfiguration === 'string' && el.electronConfiguration.length > 0,
      `Missing electronConfiguration for ${el.name}`
    );
    assert(
      typeof el.electronConfigurationFull === 'string' && el.electronConfigurationFull.length > 0,
      `Missing electronConfigurationFull for ${el.name}`
    );
    assert(typeof el.summary === 'string' && el.summary.length >= 40, `Summary too short or missing for ${el.name}`);
  }

  assert(Object.keys(ELEMENTS_BY_NUMBER).length === 118, 'ELEMENTS_BY_NUMBER must contain 118 entries');
  assert(Object.keys(ELEMENTS_BY_SYMBOL).length === 118, 'ELEMENTS_BY_SYMBOL must contain 118 entries');
  assert(ELEMENT_CATEGORIES.length === 10, 'Expected 10 element categories');
  assert(Object.keys(GROUP_NAMES).length === 18, 'Expected 18 IUPAC group names');

  console.log('   ✓ All 118 elements passed scientific & structural validation.');
}

function validateProjectFiles() {
  console.log('2. Validating project file structure & asset references...');
  const requiredFiles = [
    'index.html',
    'prvok.html',
    'editor.html',
    'molekuly.html',
    'prvky.html',
    'package.json',
    'README.md',
    'assets/favicon.svg',
    'src/main.js',
    'src/detail-page.js',
    'src/editor-page.js',
    'src/molecules-page.js',
    'src/catalog-page.js',
    'src/data/elements.js',
    'src/data/compounds.js',
    'src/lib/formula-parser.js',
    'src/components/periodic-table.js',
    'src/components/element-details.js',
    'src/components/atom-model.js',
    'src/components/atom-editor.js',
    'src/components/molecule-visualizer.js',
    'src/styles/main.css',
    'src/styles/table.css',
    'src/styles/atom.css',
    'src/styles/editor.css',
    'src/styles/molecules.css',
    'src/styles/catalog.css',
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(rootDir, relPath);
    assert(fs.existsSync(fullPath), `Missing required file: ${relPath}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 0, `File is empty: ${relPath}`);
  }

  // Overenie konzistentnej 5-stránkovej navigácie vo všetkých HTML súboroch
  const htmlPages = ['index.html', 'prvok.html', 'editor.html', 'molekuly.html', 'prvky.html'];
  const expectedNavLinks = [
    'href="./index.html"',
    'href="./prvok.html"',
    'href="./editor.html"',
    'href="./molekuly.html"',
    'href="./prvky.html"',
  ];
  for (const page of htmlPages) {
    const html = fs.readFileSync(path.join(rootDir, page), 'utf8');
    for (const link of expectedNavLinks) {
      assert(
        html.includes(link),
        `Navbar in ${page} is missing navigation link ${link}`
      );
    }
  }

  console.log('   ✓ All required modular project files & 5-page navbars are valid.');
}

function validateFormulaParserAndSmartInput() {
  console.log('3. Validating chemical formula parser, stoichiometry & Shift+number input...');

  const testCases = [
    {
      input: 'H2O',
      coeff: 1,
      unitUnicode: 'H₂O',
      totalPerUnit: 3,
      totalAll: 3,
      counts: { H: [2, 2], O: [1, 1] },
      isIonic: false,
    },
    {
      input: 'CO2',
      coeff: 1,
      unitUnicode: 'CO₂',
      totalPerUnit: 3,
      totalAll: 3,
      counts: { C: [1, 1], O: [2, 2] },
      isIonic: false,
    },
    {
      input: '4CO2',
      coeff: 4,
      unitUnicode: 'CO₂',
      totalPerUnit: 3,
      totalAll: 12,
      counts: { C: [1, 4], O: [2, 8] },
      isIonic: false,
    },
    {
      input: '4CO₂',
      coeff: 4,
      unitUnicode: 'CO₂',
      totalPerUnit: 3,
      totalAll: 12,
      counts: { C: [1, 4], O: [2, 8] },
      isIonic: false,
    },
    {
      input: '2H2O',
      coeff: 2,
      unitUnicode: 'H₂O',
      totalPerUnit: 3,
      totalAll: 6,
      counts: { H: [2, 4], O: [1, 2] },
      isIonic: false,
    },
    {
      input: 'NH3',
      coeff: 1,
      unitUnicode: 'NH₃',
      totalPerUnit: 4,
      totalAll: 4,
      counts: { N: [1, 1], H: [3, 3] },
      isIonic: false,
    },
    {
      input: 'CH4',
      coeff: 1,
      unitUnicode: 'CH₄',
      totalPerUnit: 5,
      totalAll: 5,
      counts: { C: [1, 1], H: [4, 4] },
      isIonic: false,
    },
    {
      input: 'Ca(OH)2',
      coeff: 1,
      unitUnicode: 'Ca(OH)₂',
      totalPerUnit: 5,
      totalAll: 5,
      counts: { Ca: [1, 1], O: [2, 2], H: [2, 2] },
      isIonic: true,
    },
    {
      input: 'Al2(SO4)3',
      coeff: 1,
      unitUnicode: 'Al₂(SO₄)₃',
      totalPerUnit: 17,
      totalAll: 17,
      counts: { Al: [2, 2], S: [3, 3], O: [12, 12] },
      isIonic: true,
    },
    {
      input: 'CH3COOH',
      coeff: 1,
      unitUnicode: 'CH₃COOH',
      totalPerUnit: 8,
      totalAll: 8,
      counts: { C: [2, 2], H: [4, 4], O: [2, 2] },
      isIonic: false,
    },
    {
      input: 'NaCl',
      coeff: 1,
      unitUnicode: 'NaCl',
      totalPerUnit: 2,
      totalAll: 2,
      counts: { Na: [1, 1], Cl: [1, 1] },
      isIonic: true,
    },
  ];

  for (const tc of testCases) {
    const res = parseChemicalFormula(tc.input);
    assert(res.ok, `Expected ${tc.input} to parse cleanly, got error: ${res.error}`);
    assert(res.coefficient === tc.coeff, `Expected coeff ${tc.coeff} for ${tc.input}, got ${res.coefficient}`);
    assert(res.unitFormulaUnicode === tc.unitUnicode, `Expected unitFormulaUnicode ${tc.unitUnicode}, got ${res.unitFormulaUnicode}`);
    assert(res.totalAtomsPerUnit === tc.totalPerUnit, `Expected totalAtomsPerUnit ${tc.totalPerUnit} for ${tc.input}, got ${res.totalAtomsPerUnit}`);
    assert(res.totalAtomsAllUnits === tc.totalAll, `Expected totalAtomsAllUnits ${tc.totalAll} for ${tc.input}, got ${res.totalAtomsAllUnits}`);
    assert(res.classification.isIonic === tc.isIonic, `Expected isIonic=${tc.isIonic} for ${tc.input}`);

    for (const [sym, [expectedUnit, expectedTotal]] of Object.entries(tc.counts)) {
      const elItem = res.elements.find((e) => e.symbol === sym);
      assert(Boolean(elItem), `Missing element ${sym} in parsed ${tc.input}`);
      assert(elItem.countPerUnit === expectedUnit, `Expected ${sym} countPerUnit=${expectedUnit} in ${tc.input}, got ${elItem.countPerUnit}`);
      assert(elItem.totalCount === expectedTotal, `Expected ${sym} totalCount=${expectedTotal} in ${tc.input}, got ${elItem.totalCount}`);
    }
  }

  // Overenie presného výstupu pre ukážkový príklad 4CO₂ (Sekcia 5)
  const sample4CO2 = parseChemicalFormula('4CO₂');
  assert(sample4CO2.substanceName === 'Oxid uhličitý', `Expected Oxid uhličitý, got ${sample4CO2.substanceName}`);
  assert(sample4CO2.quantitySubtitle === 'Štyri molekuly oxidu uhličitého.', `Unexpected subtitle: ${sample4CO2.quantitySubtitle}`);
  assert(
    sample4CO2.dynamicExplanation ===
      'Jedna molekula oxidu uhličitého obsahuje jeden atóm uhlíka a dva atómy kyslíka. Keďže máme štyri molekuly, počet každého druhu atómu vynásobíme štyrmi. Výsledkom sú štyri atómy uhlíka a osem atómov kyslíka, teda spolu dvanásť atómov.',
    `Unexpected 4CO2 explanation: ${sample4CO2.dynamicExplanation}`
  );

  // Overenie rozlišovania veľkých a malých písmen: Co (kobalt) vs CO (uhlík + kyslík)
  const cobaltRes = parseChemicalFormula('Co');
  assert(cobaltRes.ok && cobaltRes.elements.length === 1 && cobaltRes.elements[0].symbol === 'Co', 'Co must parse as single element Cobalt');
  const coGasRes = parseChemicalFormula('CO');
  assert(coGasRes.ok && coGasRes.elements.length === 2 && coGasRes.elements[0].symbol === 'C' && coGasRes.elements[1].symbol === 'O', 'CO must parse as C + O');

  // Overenie neplatných vzorcov a extrémnych koeficientov
  const invalidInputs = ['', 'co2', 'h2o', 'Ca(OH', 'Ca)OH(', 'Ca()2', 'Xx2O', '0CO2', '99999H2O', '₂H₂O'];
  for (const bad of invalidInputs) {
    const badRes = parseChemicalFormula(bad);
    assert(!badRes.ok, `Expected invalid input "${bad}" to fail validation`);
    assert(typeof badRes.error === 'string' && badRes.error.length > 0, `Missing error message for "${bad}"`);
  }

  // Overenie inteligentného zadávania čísel (Shift + číslo vs číslo bez Shiftu)
  // Scenár: "4" -> "4CO" -> Shift+2 -> "4CO₂"
  let state = handleSmartDigitInsertion({ currentValue: '', selectionStart: 0, digit: '4', shiftKey: false });
  assert(state.newValue === '4' && state.newCursorPos === 1, 'Normal digit 4 at start should insert coefficient 4');

  const afterCO = '4CO';
  state = handleSmartDigitInsertion({ currentValue: afterCO, selectionStart: 3, digit: '2', shiftKey: true });
  assert(state.newValue === '4CO₂' && state.newCursorPos === 4 && !state.blockedSubscript, 'Shift+2 after 4CO must produce 4CO₂');

  // Kontextová ochrana: Shift+2 na úplnom začiatku vzorca nesmie vložiť dolný index
  const blockedAtStart = handleSmartDigitInsertion({ currentValue: 'CO', selectionStart: 0, digit: '2', shiftKey: true });
  assert(blockedAtStart.blockedSubscript && blockedAtStart.newValue === 'CO', 'Shift+digit at index 0 must be blocked');

  console.log('   ✓ Formula parser, stoichiometry & smart Shift+digit controls passed all unit tests.');
}

validateDataset();
validateProjectFiles();
validateFormulaParserAndSmartInput();
