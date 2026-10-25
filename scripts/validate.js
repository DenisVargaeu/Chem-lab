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
    'prvky.html',
    'package.json',
    'README.md',
    'assets/favicon.svg',
    'src/main.js',
    'src/detail-page.js',
    'src/editor-page.js',
    'src/catalog-page.js',
    'src/data/elements.js',
    'src/components/periodic-table.js',
    'src/components/element-details.js',
    'src/components/atom-model.js',
    'src/components/atom-editor.js',
    'src/styles/main.css',
    'src/styles/table.css',
    'src/styles/atom.css',
    'src/styles/editor.css',
    'src/styles/catalog.css',
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(rootDir, relPath);
    assert(fs.existsSync(fullPath), `Missing required file: ${relPath}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 0, `File is empty: ${relPath}`);
  }

  console.log('   ✓ All required modular project files exist and are non-empty.');
}

validateDataset();
validateProjectFiles();
