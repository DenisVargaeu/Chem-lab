import { ELEMENTS } from '../data/elements.js';
import { COMPOUNDS_DATABASE, classifyFormulaSubstance } from '../data/compounds.js';

/**
 * Mapa presných chemických značiek (citlivá na veľkosť písmen, napr. 'Co' vs 'C' + 'O').
 */
export const EXACT_SYMBOL_MAP = Object.freeze(
  ELEMENTS.reduce((acc, el) => {
    acc[el.symbol] = el;
    return acc;
  }, {})
);

export const DIGIT_TO_SUBSCRIPT = Object.freeze({
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
});

export const SUBSCRIPT_TO_DIGIT = Object.freeze({
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
});

export const MAX_SAFE_COUNT = 999;

/**
 * Prevedie obyčajné číslice 0-9 na dolné indexy ₀-₉.
 */
export function toSubscriptDigits(str) {
  return String(str).replace(/[0-9]/g, (d) => DIGIT_TO_SUBSCRIPT[d] || d);
}

/**
 * Prevedie dolné indexy ₀-₉ na obyčajné ASCII číslice 0-9.
 */
export function toAsciiDigits(str) {
  return String(str).replace(/[₀-₉]/g, (s) => SUBSCRIPT_TO_DIGIT[s] || s);
}

/**
 * Naformátuje chemický vzorec tak, aby koeficienty pred vzorcom (alebo za bodkou hydrátu)
 * zostali normálnymi číslicami a počty atómov za značkami prvkov a zátvorkami boli dolnými indexmi.
 * Príklad: "4CO2" -> "4CO₂", "Al2(SO4)3" -> "Al₂(SO₄)₃", "CuSO4·5H2O" -> "CuSO₄·5H₂O".
 */
export function formatFormulaUnicode(rawFormula) {
  if (!rawFormula) return '';
  const ascii = toAsciiDigits(String(rawFormula).trim()).replace(/\s+/g, '');
  // Nahradíme číslice, ktoré nasledujú bezprostredne za písmenom alebo zatváracou zátvorkou
  return ascii.replace(/([A-Za-z)\]])([0-9]+)/g, (_, prefix, digits) => {
    return `${prefix}${toSubscriptDigits(digits)}`;
  });
}

/**
 * Naformátuje chemický vzorec do bezpečného HTML s tagmi <sub>...</sub>.
 */
export function formatFormulaHtml(rawFormula) {
  if (!rawFormula) return '';
  const ascii = toAsciiDigits(String(rawFormula).trim()).replace(/\s+/g, '');
  const escaped = ascii
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/([A-Za-z)\]])([0-9]+)/g, '$1<sub>$2</sub>');
}

/**
 * Overí, či je na danej pozícii kurzora v reťazci vhodné vložiť dolný index.
 * Dolný index patrí bezprostredne za značku prvku (písmeno), zatváraciu zátvorku ')' / ']'
 * alebo za už existujúci dolný index / číslo za prvkom.
 */
export function isSubscriptValidAtPosition(value, cursorIndex) {
  if (typeof value !== 'string' || cursorIndex <= 0) {
    return false;
  }
  const before = value.slice(0, cursorIndex);
  // Pred kurzorom musí byť aspoň jedno písmeno alebo zatváracia zátvorka, prípadne číslica/index po nich
  const match = before.match(/([A-Za-z)\]])([0-9₀-₉]*)$/);
  return Boolean(match);
}

/**
 * Inteligentné spracovanie zadania číslice v editore vzorcov.
 * Podporuje:
 * - Číslo bez Shiftu -> normálne číslo (koeficient) alebo podľa zvoleného režimu prepínača
 * - Shift + číslo -> dolný index (ak to kontext dovoľuje)
 * - Zachováva presnú pozíciu kurzora.
 */
export function handleSmartDigitInsertion({
  currentValue = '',
  selectionStart = 0,
  selectionEnd = selectionStart,
  digit,
  shiftKey = false,
  inputMode = 'auto', // 'auto' | 'coefficient' | 'subscript'
}) {
  const cleanDigit = SUBSCRIPT_TO_DIGIT[digit] || String(digit);
  if (!/^[0-9]$/.test(cleanDigit)) {
    return null;
  }

  const wantsSubscript =
    inputMode === 'subscript' || (inputMode === 'auto' && Boolean(shiftKey));

  const prefix = currentValue.slice(0, selectionStart);
  const suffix = currentValue.slice(selectionEnd);

  if (wantsSubscript) {
    const validContext = isSubscriptValidAtPosition(currentValue, selectionStart);
    if (!validContext) {
      return {
        newValue: currentValue,
        newCursorPos: selectionStart,
        insertedChar: null,
        blockedSubscript: true,
        warning:
          'Dolný index (₂) sa píše bezprostredne za značku prvku alebo za zátvorku — napr. CO₂ alebo Ca(OH)₂. Na začiatok vzorca pred prvok sa píše normálne číslo (koeficient, napr. 4CO₂).',
      };
    }

    const subChar = DIGIT_TO_SUBSCRIPT[cleanDigit];
    const newValue = `${prefix}${subChar}${suffix}`;
    return {
      newValue,
      newCursorPos: selectionStart + subChar.length,
      insertedChar: subChar,
      blockedSubscript: false,
      warning: null,
    };
  }

  // Vloženie normálnej číslice (koeficient alebo bežná číslica)
  const newValue = `${prefix}${cleanDigit}${suffix}`;
  return {
    newValue,
    newCursorPos: selectionStart + cleanDigit.length,
    insertedChar: cleanDigit,
    blockedSubscript: false,
    warning: null,
  };
}

/**
 * Slovenský genitív názvov prvkov (pre vety typu „Atómy uhlíka v jednej molekule“).
 */
const ELEMENT_GENITIVE_SK = {
  H: 'vodíka',
  He: 'hélia',
  Li: 'lítia',
  Be: 'berýlia',
  B: 'bóru',
  C: 'uhlíka',
  N: 'dusíka',
  O: 'kyslíka',
  F: 'fluóru',
  Ne: 'neónu',
  Na: 'sodíka',
  Mg: 'horčíka',
  Al: 'hliníka',
  Si: 'kremíka',
  P: 'fosforu',
  S: 'síry',
  Cl: 'chlóru',
  Ar: 'argónu',
  K: 'draslíka',
  Ca: 'vápnika',
  Sc: 'skandia',
  Ti: 'titánu',
  V: 'vanádu',
  Cr: 'chrómu',
  Mn: 'mangánu',
  Fe: 'železa',
  Co: 'kobaltu',
  Ni: 'niklu',
  Cu: 'medi',
  Zn: 'zinku',
  Ga: 'gália',
  Ge: 'germánia',
  As: 'arzénu',
  Se: 'selénu',
  Br: 'brómu',
  Kr: 'kryptónu',
  Rb: 'rubídia',
  Sr: 'stroncia',
  Ag: 'striebra',
  Cd: 'kadmia',
  Sn: 'cínu',
  Sb: 'antimónu',
  I: 'jódu',
  Xe: 'xenónu',
  Cs: 'cézia',
  Ba: 'bária',
  Pt: 'platiny',
  Au: 'zlata',
  Hg: 'ortuti',
  Pb: 'olova',
  Bi: 'bizmutu',
  U: 'uránu',
};

export function getElementGenitiveSk(symbol, fallbackName = '') {
  if (ELEMENT_GENITIVE_SK[symbol]) {
    return ELEMENT_GENITIVE_SK[symbol];
  }
  const lower = fallbackName.toLowerCase();
  if (lower.endsWith('ium')) return `${lower.slice(0, -3)}ia`;
  if (lower.endsWith('ík') || lower.endsWith('ik')) return `${lower}a`;
  if (lower.endsWith('a')) return `${lower.slice(0, -1)}y`;
  if (lower.endsWith('o')) return `${lower.slice(0, -1)}a`;
  return `${lower}u`;
}

/**
 * Slovenský genitív názvov známych zlúčenín pre prirodzenú vetu (napr. „Štyri molekuly oxidu uhličitého.“).
 */
const COMPOUND_GENITIVE_SK = {
  H2O: 'vody',
  CO2: 'oxidu uhličitého',
  NH3: 'amoniaku',
  CH4: 'metánu',
  'Ca(OH)2': 'hydroxidu vápenatého',
  'Al2(SO4)3': 'síranu hlinitého',
  CH3COOH: 'kyseliny octovej',
  NaCl: 'chloridu sodného',
  H2SO4: 'kyseliny sírovej',
  HCl: 'chlorovodíka',
  NaOH: 'hydroxidu sodného',
  O2: 'dikyslíka (kyslíka)',
  N2: 'didusíka (dusíka)',
  H2: 'divodíka (vodíka)',
  C6H12O6: 'glukózy',
};

const SLOVAK_CARDINAL_MASC = {
  1: 'jeden',
  2: 'dva',
  3: 'tri',
  4: 'štyri',
  5: 'päť',
  6: 'šesť',
  7: 'sedem',
  8: 'osem',
  9: 'deväť',
  10: 'desať',
  11: 'jedenásť',
  12: 'dvanásť',
  13: 'trinásť',
  14: 'štrnásť',
  15: 'pätnásť',
  16: 'šestnásť',
  17: 'sedemnásť',
  18: 'osemnásť',
  19: 'devätnásť',
  20: 'dvadsať',
};

const SLOVAK_CARDINAL_FEM = {
  ...SLOVAK_CARDINAL_MASC,
  1: 'jedna',
  2: 'dve',
};

const SLOVAK_INSTRUMENTAL = {
  2: 'dvoma',
  3: 'tromi',
  4: 'štyrmi',
  5: 'piatimi',
  6: 'šiestimi',
  7: 'siedmimi',
  8: 'ôsmimi',
  9: 'deviatimi',
  10: 'desiatimi',
};

function formatAtomPhraseSk(count, elementSymbol, elementName) {
  const word = SLOVAK_CARDINAL_MASC[count] || String(count);
  const gen = getElementGenitiveSk(elementSymbol, elementName);
  if (count === 1) return `${word} atóm ${gen}`;
  if (count >= 2 && count <= 4) return `${word} atómy ${gen}`;
  return `${word} atómov ${gen}`;
}

function formatUnitCountPhraseSk(coeff, isIonic = false, capitalize = true) {
  const numWord = SLOVAK_CARDINAL_FEM[coeff] || String(coeff);
  let noun;
  if (isIonic) {
    if (coeff === 1) noun = 'vzorcová jednotka';
    else if (coeff >= 2 && coeff <= 4) noun = 'vzorcové jednotky';
    else noun = 'vzorcových jednotiek';
  } else {
    if (coeff === 1) noun = 'molekula';
    else if (coeff >= 2 && coeff <= 4) noun = 'molekuly';
    else noun = 'molekúl';
  }
  const phrase = `${numWord} ${noun}`;
  return capitalize ? phrase.charAt(0).toUpperCase() + phrase.slice(1) : phrase;
}

function joinNaturalListSk(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} a ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} a ${items[items.length - 1]}`;
}

/**
 * Interný rekurzívny parser pre jednu vzorcovú jednotku (bez počiatočného koeficientu).
 * Vracia pole výskytov prvkov v poradí zápisu a strom skupín.
 */
function parseUnitSegment(segmentStr) {
  let pos = 0;
  const len = segmentStr.length;

  function parseNumber() {
    let numStr = '';
    while (pos < len && /[0-9]/.test(segmentStr[pos])) {
      numStr += segmentStr[pos];
      pos++;
    }
    if (!numStr) return 1;
    const val = Number(numStr);
    if (!Number.isInteger(val) || val <= 0) {
      throw new Error(
        `Dolný index „${numStr}“ nie je platný. Počet atómov musí byť kladné celé číslo (najmenej 1).`
      );
    }
    if (val > MAX_SAFE_COUNT) {
      throw new Error(
        `Dolný index ${val} prekračuje maximálny povolený limit (${MAX_SAFE_COUNT}).`
      );
    }
    return val;
  }

  function parseGroup(closingChar = null) {
    const counts = new Map();
    const order = [];

    while (pos < len) {
      const ch = segmentStr[pos];

      if (closingChar && ch === closingChar) {
        pos++; // skonzumujeme zatváraciu zátvorku
        const multiplier = parseNumber();
        const multiplied = new Map();
        for (const [sym, cnt] of counts.entries()) {
          const total = cnt * multiplier;
          if (total > MAX_SAFE_COUNT * 20) {
            throw new Error(`Celkový počet atómov prvku ${sym} je príliš veľký.`);
          }
          multiplied.set(sym, total);
        }
        return { counts: multiplied, order };
      }

      if (ch === ')' || ch === ']') {
        throw new Error(
          `Neočakávaná zatváracia zátvorka „${ch}“ na pozícii ${pos + 1} bez zodpovedajúcej otváracej zátvorky.`
        );
      }

      if (ch === '(' || ch === '[') {
        const expectedClose = ch === '(' ? ')' : ']';
        const openPos = pos;
        pos++; // preskočíme '(' alebo '['
        if (pos < len && segmentStr[pos] === expectedClose) {
          throw new Error(`Prázdna zátvorka „${ch}${expectedClose}“ vo vzorci nie je platná.`);
        }
        const subGroup = parseGroup(expectedClose);
        for (const sym of subGroup.order) {
          if (!counts.has(sym)) {
            counts.set(sym, 0);
            order.push(sym);
          }
          counts.set(sym, counts.get(sym) + subGroup.counts.get(sym));
        }
        continue;
      }

      if (/[A-Z]/.test(ch)) {
        let sym = ch;
        pos++;
        if (pos < len && /[a-z]/.test(segmentStr[pos])) {
          sym += segmentStr[pos];
          pos++;
        }
        // Ak nasleduje ďalšie malé písmeno (napr. "Uuu" alebo preklep "H2o" -> "Cla"), ošetríme to
        if (pos < len && /[a-z]/.test(segmentStr[pos])) {
          const extra = segmentStr[pos];
          throw new Error(
            `Neplatný zápis „${sym}${extra}“. Značky chemických prvkov majú najviac dve písmená (veľké a malé). Chceli ste napísať veľké písmeno „${extra.toUpperCase()}“?`
          );
        }

        const elData = EXACT_SYMBOL_MAP[sym];
        if (!elData) {
          // Skúsime zistiť, či ide o zámenu veľkých/malých písmen (napr. Cs vs CS, Co vs CO)
          throw new Error(
            `Neznáma chemická značka „${sym}“. Takýto prvok sa v periodickej tabuľke (1–118) nenachádza.`
          );
        }

        const count = parseNumber();
        if (!counts.has(sym)) {
          counts.set(sym, 0);
          order.push(sym);
        }
        counts.set(sym, counts.get(sym) + count);
        continue;
      }

      if (/[a-z]/.test(ch)) {
        // Používateľ začal malým písmenom, napr. "h2o", "co2", "nacl"
        const upperSuggestion = segmentStr.replace(/^[a-z]/, (m) => m.toUpperCase());
        throw new Error(
          `Značka chemického prvku sa musí začínať veľkým písmenom (našlo sa malé písmeno „${ch}“). Skúste napríklad „${formatFormulaUnicode(upperSuggestion)}“.`
        );
      }

      if (/[0-9]/.test(ch)) {
        throw new Error(
          `Číslo „${ch}“ na pozícii ${pos + 1} musí nasledovať za značkou prvku alebo zátvorkou (alebo byť koeficientom na úplnom začiatku vzorca).`
        );
      }

      throw new Error(`Nepodporovaný znak „${ch}“ vo vzorci na pozícii ${pos + 1}.`);
    }

    if (closingChar) {
      const openChar = closingChar === ')' ? '(' : '[';
      throw new Error(
        `Chýba uzatváracia zátvorka „${closingChar}“ pre otvorenú zátvorku „${openChar}“.`
      );
    }

    if (order.length === 0) {
      throw new Error('Vzorec neobsahuje žiadnu platnú značku chemického prvku.');
    }

    return { counts, order };
  }

  return parseGroup(null);
}

/**
 * Hlavný verejný parser chemických vzorcov.
 * Podporuje:
 * - koeficienty pred vzorcom (4CO2, 2H2O, 4CO₂)
 * - dolné indexy v ASCII aj Unicode (H2O, H₂O)
 * - zátvorky a vnorené zátvorky (Ca(OH)2, Al2(SO4)3, [Cu(NH3)4]SO4)
 * - organické a kondenzované vzorce (CH3COOH)
 * - hydráty (CuSO4·5H2O, CuSO4.5H2O, CuSO4*5H2O)
 */
export function parseChemicalFormula(rawInput) {
  const original = typeof rawInput === 'string' ? rawInput : '';
  const trimmed = original.trim();

  if (!trimmed) {
    return {
      ok: false,
      isEmpty: true,
      rawInput: original,
      error: 'Zadajte chemický vzorec (napríklad H₂O, 4CO₂, Ca(OH)₂ alebo CH₃COOH).',
      suggestion: '4CO₂',
    };
  }

  // Normalizácia medzier a dolných indexov na spracovanie
  const asciiInput = toAsciiDigits(trimmed).replace(/\s+/g, '');

  // Kontrola, či používateľ nezadal všetko malými písmenami (napr. "co2", "h2o", "4co2", "nacl")
  if (/^[0-9]*[a-z]+/.test(asciiInput)) {
    const autoFixed = suggestCapitalization(asciiInput);
    return {
      ok: false,
      isEmpty: false,
      rawInput: original,
      error: `Značky chemických prvkov sa píšu s veľkým začiatočným písmenom („${trimmed}“ nie je platný zápis).`,
      suggestion: autoFixed ? formatFormulaUnicode(autoFixed) : null,
    };
  }

  try {
    // 1. Oddelenie koeficientu pred celým vzorcom (napr. "4CO2" -> coeff = 4, rest = "CO2")
    const coeffMatch = asciiInput.match(/^([0-9]+)(.*)$/);
    let coefficient = 1;
    let formulaBody = asciiInput;

    if (coeffMatch) {
      const rawCoeff = coeffMatch[1];
      formulaBody = coeffMatch[2];

      // Ak používateľ napísal iba samotné číslo (napr. "4"), čakáme na značku prvku
      if (!formulaBody) {
        return {
          ok: false,
          isEmpty: false,
          rawInput: original,
          error: `Zadali ste koeficient ${rawCoeff}. Doplňte zaň chemický vzorec látky (napr. ${rawCoeff}CO₂ alebo ${rawCoeff}H₂O).`,
          suggestion: `${rawCoeff}CO₂`,
        };
      }

      // Ak používateľ začal dolným indexom na úplnom začiatku (napr. "₂H₂O")
      if (/^[₀-₉]/.test(trimmed)) {
        return {
          ok: false,
          isEmpty: false,
          rawInput: original,
          error:
            'Vzorec nemôže začínať dolným indexom. Počet molekúl pred vzorcom sa zapisuje normálnym veľkým číslom (koeficientom).',
          suggestion: formatFormulaUnicode(asciiInput),
        };
      }

      coefficient = Number(rawCoeff);
      if (!Number.isInteger(coefficient) || coefficient <= 0) {
        throw new Error(
          `Koeficient pred vzorcom musí byť kladné celé číslo väčšie ako 0 (zadané: ${rawCoeff}).`
        );
      }
      if (coefficient > MAX_SAFE_COUNT) {
        throw new Error(
          `Koeficient ${coefficient} je príliš veľký (maximálna povolená hodnota je ${MAX_SAFE_COUNT}).`
        );
      }
    }

    // 2. Podpora hydrátov (napr. CuSO4·5H2O, CuSO4.5H2O, CuSO4*5H2O)
    const hydrateParts = formulaBody.split(/[·.*]/);
    const combinedCounts = new Map();
    const combinedOrder = [];
    const normalizedPartsAscii = [];

    for (let i = 0; i < hydrateParts.length; i++) {
      const part = hydrateParts[i];
      if (!part) {
        throw new Error('Za bodkou hydrátu chýba vzorec viazanej látky (napr. CuSO₄·5H₂O).');
      }

      let partCoeff = 1;
      let partBody = part;
      if (i > 0) {
        const m = part.match(/^([0-9]+)(.+)$/);
        if (m) {
          partCoeff = Number(m[1]);
          partBody = m[2];
          if (partCoeff <= 0 || partCoeff > MAX_SAFE_COUNT) {
            throw new Error(`Neplatný koeficient hydrátu: ${m[1]}.`);
          }
        }
      }

      const parsedPart = parseUnitSegment(partBody);
      for (const sym of parsedPart.order) {
        if (!combinedCounts.has(sym)) {
          combinedCounts.set(sym, 0);
          combinedOrder.push(sym);
        }
        combinedCounts.set(
          sym,
          combinedCounts.get(sym) + parsedPart.counts.get(sym) * partCoeff
        );
      }
      normalizedPartsAscii.push(partCoeff > 1 ? `${partCoeff}${partBody}` : partBody);
    }

    const unitFormulaAscii = normalizedPartsAscii.join('·');
    const unitFormulaUnicode = normalizedPartsAscii
      .map((p, idx) => {
        if (idx === 0) return formatFormulaUnicode(p);
        const m = p.match(/^([0-9]+)(.+)$/);
        return m ? `${m[1]}${formatFormulaUnicode(m[2])}` : formatFormulaUnicode(p);
      })
      .join('·');

    const fullFormulaUnicode =
      coefficient > 1 ? `${coefficient}${unitFormulaUnicode}` : unitFormulaUnicode;
    const fullFormulaHtml =
      coefficient > 1
        ? `<span class="formula-coeff">${coefficient}</span>${formatFormulaHtml(unitFormulaAscii)}`
        : formatFormulaHtml(unitFormulaAscii);

    // 3. Výpočet atómových a molárnych veličín
    let totalAtomsPerUnit = 0;
    let molarMassPerUnit = 0;

    const rawElements = combinedOrder.map((sym) => {
      const el = EXACT_SYMBOL_MAP[sym];
      const countPerUnit = combinedCounts.get(sym);
      const totalCount = countPerUnit * coefficient;
      const molarMassContribution = el.atomicMass * countPerUnit;

      totalAtomsPerUnit += countPerUnit;
      molarMassPerUnit += molarMassContribution;

      return {
        symbol: el.symbol,
        name: el.name,
        latinName: el.latinName,
        atomicNumber: el.atomicNumber,
        category: el.category,
        atomicMass: el.atomicMass,
        countPerUnit,
        totalCount,
        molarMassContribution,
        totalMassContribution: molarMassContribution * coefficient,
      };
    });

    const elements = rawElements.map((item) => ({
      ...item,
      massFractionPercent:
        molarMassPerUnit > 0 ? (item.molarMassContribution / molarMassPerUnit) * 100 : 0,
    }));

    const totalAtomsAllUnits = totalAtomsPerUnit * coefficient;
    const totalMassAllUnits = molarMassPerUnit * coefficient;

    // 4. Klasifikácia (molekula vs. iónová vzorcová jednotka) a obohatenie z databázy
    const partialResult = {
      ok: true,
      isEmpty: false,
      rawInput: original,
      coefficient,
      unitFormulaAscii,
      unitFormulaUnicode,
      fullFormulaUnicode,
      fullFormulaHtml,
      elements,
      totalAtomsPerUnit,
      totalAtomsAllUnits,
      molarMassPerUnit,
      totalMassAllUnits,
    };

    const classification = classifyFormulaSubstance(partialResult);
    const dbEntry = classification.dbEntry;

    // Upozornenie na zámenu veľkých/malých písmen pri Co vs CO
    let caseSensitivityNote = null;
    if (unitFormulaAscii === 'Co') {
      caseSensitivityNote =
        'Poznámka k veľkosti písmen: Zápis „Co“ (veľké C, malé o) označuje chemický prvok kobalt (Z = 27), zatiaľ čo „CO“ (veľké C, veľké O) označuje molekulu oxidu uhoľnatého (uhlík + kyslík).';
    } else if (unitFormulaAscii === 'CO') {
      caseSensitivityNote =
        'Poznámka k veľkosti písmen: Zápis „CO“ (veľké C, veľké O) znamená oxid uhoľnatý (1 atóm uhlíka a 1 atóm kyslíka), zatiaľ čo „Co“ znamená kovový prvok kobalt.';
    }

    const explanationData = buildDynamicExplanationAndTable(partialResult, classification);

    return {
      ...partialResult,
      classification,
      dbEntry,
      substanceName: dbEntry
        ? dbEntry.name
        : elements.length === 1 && totalAtomsPerUnit === 1
          ? elements[0].name
          : `Chemická látka (${unitFormulaUnicode})`,
      hasVerifiedDatabaseEntry: Boolean(dbEntry),
      hasKnownStructure: Boolean(dbEntry && dbEntry.structure),
      caseSensitivityNote,
      quantitySubtitle: explanationData.quantitySubtitle,
      dynamicExplanation: explanationData.dynamicExplanation,
      summaryTableRows: explanationData.summaryTableRows,
      error: null,
      suggestion: null,
    };
  } catch (err) {
    return {
      ok: false,
      isEmpty: false,
      rawInput: original,
      error: err.message || 'Zadaný chemický vzorec obsahuje syntaktickú chybu.',
      suggestion: suggestCapitalization(asciiInput)
        ? formatFormulaUnicode(suggestCapitalization(asciiInput))
        : null,
    };
  }
}

/**
 * Pokúsi sa navrhnúť správnu veľkosť písmen pre vstupy ako "h2o" -> "H2O", "4co2" -> "4CO2", "nacl" -> "NaCl".
 */
function suggestCapitalization(asciiStr) {
  const knownKeys = Object.keys(COMPOUNDS_DATABASE);
  const m = asciiStr.match(/^([0-9]*)(.+)$/);
  if (!m) return null;
  const coeff = m[1];
  const bodyLower = m[2].toLowerCase();

  for (const key of knownKeys) {
    if (key.toLowerCase() === bodyLower) {
      return `${coeff}${key}`;
    }
  }

  // Skúsime či nejde o samotnú značku prvku (napr. "na" -> "Na", "fe" -> "Fe")
  for (const el of ELEMENTS) {
    if (el.symbol.toLowerCase() === bodyLower) {
      return `${coeff}${el.symbol}`;
    }
  }

  return `${coeff}${m[2].toUpperCase()}`;
}

/**
 * Zostaví dynamickú tabuľku výsledkov a slovenské vysvetlenie (vrátane presného znenia pre 4CO₂).
 */
function buildDynamicExplanationAndTable(parsed, classification) {
  const {
    coefficient,
    unitFormulaAscii,
    unitFormulaUnicode,
    elements,
    totalAtomsPerUnit,
    totalAtomsAllUnits,
  } = parsed;

  const isIonic = classification.isIonic;
  const dbEntry = classification.dbEntry;

  // Podtitulok počtu molekúl / vzorcových jednotiek (napr. „Štyri molekuly oxidu uhličitého.“)
  const countPhrase = formatUnitCountPhraseSk(coefficient, isIonic, true);
  const compoundGenitive =
    COMPOUND_GENITIVE_SK[unitFormulaAscii] ||
    (dbEntry ? `látky ${dbEntry.name.toLowerCase()}` : `látky ${unitFormulaUnicode}`);
  const quantitySubtitle = `${countPhrase} ${compoundGenitive}.`;

  // Riadky súhrnnej tabuľky (podľa sekcie 5 zadania)
  const unitGenLabel = classification.unitLabelGenitiveSingular; // "jednej molekuly" / "jednej vzorcovej jednotky"
  const unitLocLabel = classification.unitLabelLocativeSingular; // "v jednej molekule" / "v jednej vzorcovej jednotke"
  const countRowLabel = isIonic ? 'Počet vzorcových jednotiek' : 'Počet molekúl';

  const summaryTableRows = [
    {
      label: `Chemický vzorec ${unitGenLabel}`,
      value: unitFormulaUnicode,
      isFormula: true,
    },
    {
      label: countRowLabel,
      value: String(coefficient),
    },
  ];

  for (const el of elements) {
    const gen = getElementGenitiveSk(el.symbol, el.name);
    summaryTableRows.push({
      label: `Atómy ${gen} ${unitLocLabel}`,
      value: String(el.countPerUnit),
      elementSymbol: el.symbol,
    });
  }

  for (const el of elements) {
    const gen = getElementGenitiveSk(el.symbol, el.name);
    summaryTableRows.push({
      label: `Celkový počet atómov ${gen}`,
      value: String(el.totalCount),
      elementSymbol: el.symbol,
    });
  }

  summaryTableRows.push({
    label: 'Celkový počet atómov',
    value: String(totalAtomsAllUnits),
    isTotal: true,
  });

  // Slovné vysvetlenie (dynamické + presná zhoda pre ukážkový príklad 4CO2)
  const perUnitPhrases = elements.map((el) =>
    formatAtomPhraseSk(el.countPerUnit, el.symbol, el.name)
  );
  const totalPhrases = elements.map((el) =>
    formatAtomPhraseSk(el.totalCount, el.symbol, el.name)
  );

  const unitSubject = isIonic ? 'Jedna vzorcová jednotka' : 'Jedna molekula';
  const sentence1 = `${unitSubject} ${compoundGenitive} obsahuje ${joinNaturalListSk(perUnitPhrases)}.`;

  if (coefficient === 1) {
    const totalWord = SLOVAK_CARDINAL_MASC[totalAtomsAllUnits] || String(totalAtomsAllUnits);
    const atomWord =
      totalAtomsAllUnits === 1 ? 'atóm' : totalAtomsAllUnits <= 4 ? 'atómy' : 'atómov';
    return {
      quantitySubtitle,
      summaryTableRows,
      dynamicExplanation: `${sentence1} Keďže vzorec neobsahuje koeficient väčší ako 1, celkový počet atómov v tejto ${isIonic ? 'vzorcovej jednotke' : 'molekule'} je ${totalWord} (${totalAtomsPerUnit} ${atomWord}).`,
    };
  }

  const coeffLower = formatUnitCountPhraseSk(coefficient, isIonic, false);
  const instrWord = SLOVAK_INSTRUMENTAL[coefficient] || `číslom ${coefficient}`;
  const firstCount = elements[0]?.totalCount ?? totalAtomsAllUnits;
  const verb = firstCount >= 2 && firstCount <= 4 ? 'sú' : 'je';
  const totalWord = SLOVAK_CARDINAL_MASC[totalAtomsAllUnits] || String(totalAtomsAllUnits);
  const totalNoun =
    totalAtomsAllUnits === 1 ? 'atóm' : totalAtomsAllUnits <= 4 ? 'atómy' : 'atómov';

  const sentence2 = `Keďže máme ${coeffLower}, počet každého druhu atómu vynásobíme ${instrWord}.`;
  const sentence3 = `Výsledkom ${verb} ${joinNaturalListSk(totalPhrases)}, teda spolu ${totalWord} ${totalNoun}.`;

  return {
    quantitySubtitle,
    summaryTableRows,
    dynamicExplanation: `${sentence1} ${sentence2} ${sentence3}`,
  };
}
