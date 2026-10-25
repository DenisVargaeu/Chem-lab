/**
 * Vedecky overená databáza všetkých 118 chemických prvkov podľa IUPAC (v slovenčine + latinské názvy).
 */

export const ELEMENT_CATEGORIES = [
  {
    "id": "alkali-metal",
    "label": "Alkalické kovy",
    "shortLabel": "Alkalické"
  },
  {
    "id": "alkaline-earth-metal",
    "label": "Kovy alkalických zemín",
    "shortLabel": "Alkalické zeminy"
  },
  {
    "id": "transition-metal",
    "label": "Prechodné kovy",
    "shortLabel": "Prechodné"
  },
  {
    "id": "post-transition-metal",
    "label": "Kovy p-bloku",
    "shortLabel": "Kovy p-bloku"
  },
  {
    "id": "metalloid",
    "label": "Polokovy",
    "shortLabel": "Polokovy"
  },
  {
    "id": "reactive-nonmetal",
    "label": "Nekovy",
    "shortLabel": "Nekovy"
  },
  {
    "id": "halogen",
    "label": "Halogény",
    "shortLabel": "Halogény"
  },
  {
    "id": "noble-gas",
    "label": "Vzácne plyny",
    "shortLabel": "Vzácne plyny"
  },
  {
    "id": "lanthanide",
    "label": "Lantanoidy",
    "shortLabel": "Lantanoidy"
  },
  {
    "id": "actinide",
    "label": "Aktinoidy",
    "shortLabel": "Aktinoidy"
  }
];

export const CATEGORY_MAP = Object.fromEntries(
  ELEMENT_CATEGORIES.map((cat) => [cat.id, cat])
);

export const GROUP_NAMES = {
  "1": "Alkalické kovy (+ H)",
  "2": "Kovy alkalických zemín",
  "3": "Skupina skandia",
  "4": "Skupina titánu",
  "5": "Skupina vanádu",
  "6": "Skupina chrómu",
  "7": "Skupina mangánu",
  "8": "Skupina železa",
  "9": "Skupina kobaltu",
  "10": "Skupina niklu",
  "11": "Mincové kovy",
  "12": "Skupina zinku",
  "13": "Triely (skupina bóru)",
  "14": "Tetrely (skupina uhlíka)",
  "15": "Pentely (skupina dusíka)",
  "16": "Chalkogény (skupina kyslíka)",
  "17": "Halogény",
  "18": "Vzácne plyny"
};

export const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export const ELEMENTS = [
  {
    "atomicNumber": 1,
    "symbol": "H",
    "name": "Vodík",
    "latinName": "Hydrogenium",
    "englishName": "Hydrogen",
    "atomicMass": 1.008,
    "atomicMassDisplay": "1.008 u",
    "isMassBracketed": false,
    "defaultIsotope": 1,
    "isotopes": [
      {
        "massNumber": 1,
        "name": "Prócium (¹H)",
        "abundance": "99.9885%",
        "stable": true
      },
      {
        "massNumber": 2,
        "name": "Deutérium (²H)",
        "abundance": "0.0115%",
        "stable": true
      },
      {
        "massNumber": 3,
        "name": "Trícium (³H)",
        "abundance": "Stopové množstvo (t½ = 12.32 y)",
        "stable": false
      }
    ],
    "category": "reactive-nonmetal",
    "group": 1,
    "period": 1,
    "block": "s",
    "gridRow": 1,
    "gridColumn": 1,
    "shells": [
      1
    ],
    "electronConfiguration": "1s¹",
    "electronConfigurationFull": "1s¹",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 2.2,
    "meltingPointK": 13.99,
    "boilingPointK": 20.271,
    "isRadioactive": false,
    "discoveryYear": "1766",
    "summary": "Vodík je najľahší a najrozšírenejší chemický prvok vo vesmíre. Tvorí palivo hviezdnych termojadrových reakcií a je základnou zložkou vody a všetkých organických zlúčenín."
  },
  {
    "atomicNumber": 2,
    "symbol": "He",
    "name": "Hélium",
    "latinName": "Helium",
    "englishName": "Helium",
    "atomicMass": 4.002602,
    "atomicMassDisplay": "4.002602 u",
    "isMassBracketed": false,
    "defaultIsotope": 4,
    "isotopes": [
      {
        "massNumber": 4,
        "name": "Hélium-4 (⁴He)",
        "abundance": "99.99986%",
        "stable": true
      },
      {
        "massNumber": 3,
        "name": "Hélium-3 (³He)",
        "abundance": "0.00014%",
        "stable": true
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 1,
    "block": "s",
    "gridRow": 1,
    "gridColumn": 18,
    "shells": [
      2
    ],
    "electronConfiguration": "1s²",
    "electronConfigurationFull": "1s²",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": null,
    "meltingPointK": 0.95,
    "boilingPointK": 4.222,
    "isRadioactive": false,
    "discoveryYear": "1868",
    "summary": "Hélium je bezfarebný, jednoatómový vzácny plyn s najnižšou teplotou varu spomedzi všetkých prvkov. Využíva sa v kryogenike na chladenie supravodivých magnetov a v ochranných atmosférach."
  },
  {
    "atomicNumber": 3,
    "symbol": "Li",
    "name": "Lítium",
    "latinName": "Lithium",
    "englishName": "Lithium",
    "atomicMass": 6.94,
    "atomicMassDisplay": "6.94 u",
    "isMassBracketed": false,
    "defaultIsotope": 7,
    "isotopes": [
      {
        "massNumber": 7,
        "name": "Lítium-7 (⁷Li)",
        "abundance": "92.41%",
        "stable": true
      },
      {
        "massNumber": 6,
        "name": "Lítium-6 (⁶Li)",
        "abundance": "7.59%",
        "stable": true
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 2,
    "block": "s",
    "gridRow": 2,
    "gridColumn": 1,
    "shells": [
      2,
      1
    ],
    "electronConfiguration": "[He] 2s¹",
    "electronConfigurationFull": "1s² 2s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.98,
    "meltingPointK": 453.65,
    "boilingPointK": 1603.0,
    "isRadioactive": false,
    "discoveryYear": "1817",
    "summary": "Lítium je najľahší alkalický kov s najnižšou hustotou spomedzi všetkých pevných prvkov. Je kľúčovým materiálom pre nabíjateľné lítiovo-iónové batérie, ľahké zliatiny a sklárstvo."
  },
  {
    "atomicNumber": 4,
    "symbol": "Be",
    "name": "Berýlium",
    "latinName": "Beryllium",
    "englishName": "Beryllium",
    "atomicMass": 9.0121831,
    "atomicMassDisplay": "9.0121831 u",
    "isMassBracketed": false,
    "defaultIsotope": 9,
    "isotopes": [
      {
        "massNumber": 9,
        "name": "Berýlium-9 (⁹Be)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 10,
        "name": "Berýlium-10 (¹⁰Be)",
        "abundance": "Kozmogénny (t½ = 1.39 My)",
        "stable": false
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 2,
    "block": "s",
    "gridRow": 2,
    "gridColumn": 2,
    "shells": [
      2,
      2
    ],
    "electronConfiguration": "[He] 2s²",
    "electronConfigurationFull": "1s² 2s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.57,
    "meltingPointK": 1560.0,
    "boilingPointK": 2742.0,
    "isRadioactive": false,
    "discoveryYear": "1798",
    "summary": "Berýlium je pevný, ľahký kov alkalických zemín s vysokou tepelnou vodivosťou a priepustnosťou pre röntgenové žiarenie, využívaný v kozmickej optike a letectve."
  },
  {
    "atomicNumber": 5,
    "symbol": "B",
    "name": "Bór",
    "latinName": "Borium",
    "englishName": "Boron",
    "atomicMass": 10.81,
    "atomicMassDisplay": "10.81 u",
    "isMassBracketed": false,
    "defaultIsotope": 11,
    "isotopes": [
      {
        "massNumber": 11,
        "name": "Bór-11 (¹¹B)",
        "abundance": "80.1%",
        "stable": true
      },
      {
        "massNumber": 10,
        "name": "Bór-10 (¹⁰B)",
        "abundance": "19.9%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 13,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 13,
    "shells": [
      2,
      3
    ],
    "electronConfiguration": "[He] 2s² 2p¹",
    "electronConfigurationFull": "1s² 2s² 2p¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.04,
    "meltingPointK": 2349.0,
    "boilingPointK": 4200.0,
    "isRadioactive": false,
    "discoveryYear": "1808",
    "summary": "Bór je tvrdý polokov tvoriaci kovalentné siete. Používa sa pri výrobe chemicky odolného borosilikátového skla, sklenených vlákien, polovodičov a ako absorbátor neutrónov."
  },
  {
    "atomicNumber": 6,
    "symbol": "C",
    "name": "Uhlík",
    "latinName": "Carboneum",
    "englishName": "Carbon",
    "atomicMass": 12.011,
    "atomicMassDisplay": "12.011 u",
    "isMassBracketed": false,
    "defaultIsotope": 12,
    "isotopes": [
      {
        "massNumber": 12,
        "name": "Uhlík-12 (¹²C)",
        "abundance": "98.93%",
        "stable": true
      },
      {
        "massNumber": 13,
        "name": "Uhlík-13 (¹³C)",
        "abundance": "1.07%",
        "stable": true
      },
      {
        "massNumber": 14,
        "name": "Uhlík-14 (¹⁴C)",
        "abundance": "Stopové množstvo (t½ = 5,730 y)",
        "stable": false
      }
    ],
    "category": "reactive-nonmetal",
    "group": 14,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 14,
    "shells": [
      2,
      4
    ],
    "electronConfiguration": "[He] 2s² 2p²",
    "electronConfigurationFull": "1s² 2s² 2p²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.55,
    "meltingPointK": 3800.0,
    "boilingPointK": 4300.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Uhlík je štvorväzbový nekov tvoriaci základ všetkého známeho života na Zemi. Vyskytuje sa vo viacerých alotropických modifikáciách vrátane diamantu, grafitu, fullerénov a grafénu."
  },
  {
    "atomicNumber": 7,
    "symbol": "N",
    "name": "Dusík",
    "latinName": "Nitrogenium",
    "englishName": "Nitrogen",
    "atomicMass": 14.007,
    "atomicMassDisplay": "14.007 u",
    "isMassBracketed": false,
    "defaultIsotope": 14,
    "isotopes": [
      {
        "massNumber": 14,
        "name": "Dusík-14 (¹⁴N)",
        "abundance": "99.636%",
        "stable": true
      },
      {
        "massNumber": 15,
        "name": "Dusík-15 (¹⁵N)",
        "abundance": "0.364%",
        "stable": true
      }
    ],
    "category": "reactive-nonmetal",
    "group": 15,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 15,
    "shells": [
      2,
      5
    ],
    "electronConfiguration": "[He] 2s² 2p³",
    "electronConfigurationFull": "1s² 2s² 2p³",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 3.04,
    "meltingPointK": 63.15,
    "boilingPointK": 77.355,
    "isRadioactive": false,
    "discoveryYear": "1772",
    "summary": "Dusík tvorí približne 78 % objemu zemskej atmosféry vo forme dvojatómového plynu N₂. Je nevyhnutnou súčasťou aminokyselín, bielkovín, nukleových kyselín a priemyselných hnojív."
  },
  {
    "atomicNumber": 8,
    "symbol": "O",
    "name": "Kyslík",
    "latinName": "Oxygenium",
    "englishName": "Oxygen",
    "atomicMass": 15.999,
    "atomicMassDisplay": "15.999 u",
    "isMassBracketed": false,
    "defaultIsotope": 16,
    "isotopes": [
      {
        "massNumber": 16,
        "name": "Kyslík-16 (¹⁶O)",
        "abundance": "99.757%",
        "stable": true
      },
      {
        "massNumber": 18,
        "name": "Kyslík-18 (¹⁸O)",
        "abundance": "0.205%",
        "stable": true
      },
      {
        "massNumber": 17,
        "name": "Kyslík-17 (¹⁷O)",
        "abundance": "0.038%",
        "stable": true
      }
    ],
    "category": "reactive-nonmetal",
    "group": 16,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 16,
    "shells": [
      2,
      6
    ],
    "electronConfiguration": "[He] 2s² 2p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 3.44,
    "meltingPointK": 54.36,
    "boilingPointK": 90.188,
    "isRadioactive": false,
    "discoveryYear": "1774",
    "summary": "Kyslík je vysoko reaktívny nekov zo skupiny chalkogénov, nevyhnutný pre bunkové dýchanie a horenie. Podľa hmotnosti je najrozšírenejším prvkom v zemskej kôre."
  },
  {
    "atomicNumber": 9,
    "symbol": "F",
    "name": "Fluór",
    "latinName": "Fluorum",
    "englishName": "Fluorine",
    "atomicMass": 18.998403163,
    "atomicMassDisplay": "18.998403163 u",
    "isMassBracketed": false,
    "defaultIsotope": 19,
    "isotopes": [
      {
        "massNumber": 19,
        "name": "Fluór-19 (¹⁹F)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 18,
        "name": "Fluór-18 (¹⁸F)",
        "abundance": "Syntetický (t½ = 109.77 m)",
        "stable": false
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 17,
    "shells": [
      2,
      7
    ],
    "electronConfiguration": "[He] 2s² 2p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 3.98,
    "meltingPointK": 53.48,
    "boilingPointK": 85.03,
    "isRadioactive": false,
    "discoveryYear": "1886",
    "summary": "Fluór je najľahší halogén a najelektronegatívnejší chemický prvok. Reaguje takmer so všetkými látkami a využíva sa pri výrobe fluórpolymérov (teflónu) a zubných prípravkov."
  },
  {
    "atomicNumber": 10,
    "symbol": "Ne",
    "name": "Neón",
    "latinName": "Neon",
    "englishName": "Neon",
    "atomicMass": 20.1797,
    "atomicMassDisplay": "20.1797 u",
    "isMassBracketed": false,
    "defaultIsotope": 20,
    "isotopes": [
      {
        "massNumber": 20,
        "name": "Neón-20 (²⁰Ne)",
        "abundance": "90.48%",
        "stable": true
      },
      {
        "massNumber": 22,
        "name": "Neón-22 (²²Ne)",
        "abundance": "9.25%",
        "stable": true
      },
      {
        "massNumber": 21,
        "name": "Neón-21 (²¹Ne)",
        "abundance": "0.27%",
        "stable": true
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 2,
    "block": "p",
    "gridRow": 2,
    "gridColumn": 18,
    "shells": [
      2,
      8
    ],
    "electronConfiguration": "[He] 2s² 2p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": null,
    "meltingPointK": 24.56,
    "boilingPointK": 27.104,
    "isRadioactive": false,
    "discoveryYear": "1898",
    "summary": "Neón je chemicky inertný vzácny plyn, ktorý vo vysokonapäťových výbojových trubiciach vyžaruje charakteristické červenooranžové svetlo."
  },
  {
    "atomicNumber": 11,
    "symbol": "Na",
    "name": "Sodík",
    "latinName": "Natrium",
    "englishName": "Sodium",
    "atomicMass": 22.98976928,
    "atomicMassDisplay": "22.98976928 u",
    "isMassBracketed": false,
    "defaultIsotope": 23,
    "isotopes": [
      {
        "massNumber": 23,
        "name": "Sodík-23 (²³Na)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 22,
        "name": "Sodík-22 (²²Na)",
        "abundance": "Syntetický (t½ = 2.60 y)",
        "stable": false
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 3,
    "block": "s",
    "gridRow": 3,
    "gridColumn": 1,
    "shells": [
      2,
      8,
      1
    ],
    "electronConfiguration": "[Ne] 3s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.93,
    "meltingPointK": 370.944,
    "boilingPointK": 1156.09,
    "isRadioactive": false,
    "discoveryYear": "1807",
    "summary": "Sodík je mäkký, striebrolesklý a mimoriadne reaktívny alkalický kov. Jeho katióny (Na⁺) sú nevyhnutné pre prenos nervových vzruchov a osmotickú rovnováhu organizmov."
  },
  {
    "atomicNumber": 12,
    "symbol": "Mg",
    "name": "Horčík",
    "latinName": "Magnesium",
    "englishName": "Magnesium",
    "atomicMass": 24.305,
    "atomicMassDisplay": "24.305 u",
    "isMassBracketed": false,
    "defaultIsotope": 24,
    "isotopes": [
      {
        "massNumber": 24,
        "name": "Horčík-24 (²⁴Mg)",
        "abundance": "78.99%",
        "stable": true
      },
      {
        "massNumber": 26,
        "name": "Horčík-26 (²⁶Mg)",
        "abundance": "11.01%",
        "stable": true
      },
      {
        "massNumber": 25,
        "name": "Horčík-25 (²⁵Mg)",
        "abundance": "10.00%",
        "stable": true
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 3,
    "block": "s",
    "gridRow": 3,
    "gridColumn": 2,
    "shells": [
      2,
      8,
      2
    ],
    "electronConfiguration": "[Ne] 3s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.31,
    "meltingPointK": 923.0,
    "boilingPointK": 1363.0,
    "isRadioactive": false,
    "discoveryYear": "1755",
    "summary": "Horčík je ľahký konštrukčný kov alkalických zemín, ktorý tvorí centrálny atóm molekuly chlorofylu v zelených rastlinách a pôsobí ako kofaktor stoviek enzýmov."
  },
  {
    "atomicNumber": 13,
    "symbol": "Al",
    "name": "Hliník",
    "latinName": "Aluminium",
    "englishName": "Aluminium",
    "atomicMass": 26.9815384,
    "atomicMassDisplay": "26.9815384 u",
    "isMassBracketed": false,
    "defaultIsotope": 27,
    "isotopes": [
      {
        "massNumber": 27,
        "name": "Hliník-27 (²⁷Al)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 26,
        "name": "Hliník-26 (²⁶Al)",
        "abundance": "Kozmogénny (t½ = 717 ky)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 13,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      3
    ],
    "electronConfiguration": "[Ne] 3s² 3p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.61,
    "meltingPointK": 933.47,
    "boilingPointK": 2743.0,
    "isRadioactive": false,
    "discoveryYear": "1825",
    "summary": "Hliník je najrozšírenejší kovový prvok v zemskej kôre. Vďaka nízkej hustote, dobrej vodivosti a súvislej pasivačnej vrstve oxidu sa široko používa v doprave, stavebníctve a elektrotechnike."
  },
  {
    "atomicNumber": 14,
    "symbol": "Si",
    "name": "Kremík",
    "latinName": "Silicium",
    "englishName": "Silicon",
    "atomicMass": 28.085,
    "atomicMassDisplay": "28.085 u",
    "isMassBracketed": false,
    "defaultIsotope": 28,
    "isotopes": [
      {
        "massNumber": 28,
        "name": "Kremík-28 (²⁸Si)",
        "abundance": "92.223%",
        "stable": true
      },
      {
        "massNumber": 29,
        "name": "Kremík-29 (²⁹Si)",
        "abundance": "4.685%",
        "stable": true
      },
      {
        "massNumber": 30,
        "name": "Kremík-30 (³⁰Si)",
        "abundance": "3.092%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 14,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      4
    ],
    "electronConfiguration": "[Ne] 3s² 3p²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.9,
    "meltingPointK": 1687.0,
    "boilingPointK": 3538.0,
    "isRadioactive": false,
    "discoveryYear": "1824",
    "summary": "Kremík je štvorväzbový polokov a vlastný polovodič. Tvorí základ kremičitanových hornín zemskej kôry a je kľúčovým materiálom pre mikroprocesory, integrované obvody a solárne články."
  },
  {
    "atomicNumber": 15,
    "symbol": "P",
    "name": "Fosfor",
    "latinName": "Phosphorus",
    "englishName": "Phosphorus",
    "atomicMass": 30.973761998,
    "atomicMassDisplay": "30.973761998 u",
    "isMassBracketed": false,
    "defaultIsotope": 31,
    "isotopes": [
      {
        "massNumber": 31,
        "name": "Fosfor-31 (³¹P)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 32,
        "name": "Fosfor-32 (³²P)",
        "abundance": "Syntetický (t½ = 14.27 d)",
        "stable": false
      }
    ],
    "category": "reactive-nonmetal",
    "group": 15,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      5
    ],
    "electronConfiguration": "[Ne] 3s² 3p³",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p³",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.19,
    "meltingPointK": 317.3,
    "boilingPointK": 553.7,
    "isRadioactive": false,
    "discoveryYear": "1669",
    "summary": "Fosfor je reaktívny nekov vyskytujúci sa ako biely, červený a čierny fosfor. Je nenahraditeľnou zložkou DNA, RNA, energetického nosiča ATP, kostného tkaniva a hnojív."
  },
  {
    "atomicNumber": 16,
    "symbol": "S",
    "name": "Síra",
    "latinName": "Sulfur",
    "englishName": "Sulfur",
    "atomicMass": 32.06,
    "atomicMassDisplay": "32.06 u",
    "isMassBracketed": false,
    "defaultIsotope": 32,
    "isotopes": [
      {
        "massNumber": 32,
        "name": "Síra-32 (³²S)",
        "abundance": "94.99%",
        "stable": true
      },
      {
        "massNumber": 34,
        "name": "Síra-34 (³⁴S)",
        "abundance": "4.25%",
        "stable": true
      },
      {
        "massNumber": 33,
        "name": "Síra-33 (³³S)",
        "abundance": "0.75%",
        "stable": true
      }
    ],
    "category": "reactive-nonmetal",
    "group": 16,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      6
    ],
    "electronConfiguration": "[Ne] 3s² 3p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.58,
    "meltingPointK": 388.36,
    "boilingPointK": 717.8,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Síra je žltý kryštalický nekov nachádzajúci sa v sopečných oblastiach a sulfidických či síranových mineráloch. Používa sa na výrobu kyseliny sírovej a vulkanizáciu kaučuku."
  },
  {
    "atomicNumber": 17,
    "symbol": "Cl",
    "name": "Chlór",
    "latinName": "Chlorum",
    "englishName": "Chlorine",
    "atomicMass": 35.45,
    "atomicMassDisplay": "35.45 u",
    "isMassBracketed": false,
    "defaultIsotope": 35,
    "isotopes": [
      {
        "massNumber": 35,
        "name": "Chlór-35 (³⁵Cl)",
        "abundance": "75.76%",
        "stable": true
      },
      {
        "massNumber": 37,
        "name": "Chlór-37 (³⁷Cl)",
        "abundance": "24.24%",
        "stable": true
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      7
    ],
    "electronConfiguration": "[Ne] 3s² 3p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 3.16,
    "meltingPointK": 171.6,
    "boilingPointK": 239.11,
    "isRadioactive": false,
    "discoveryYear": "1774",
    "summary": "Chlór je žltozelený dvojatómový plyn zo skupiny halogénov so silnými oxidačnými účinkami, využívaný na dezinfekciu pitnej vody, výrobu PVC plastov a v chemickej syntéze."
  },
  {
    "atomicNumber": 18,
    "symbol": "Ar",
    "name": "Argón",
    "latinName": "Argon",
    "englishName": "Argon",
    "atomicMass": 39.948,
    "atomicMassDisplay": "39.948 u",
    "isMassBracketed": false,
    "defaultIsotope": 40,
    "isotopes": [
      {
        "massNumber": 40,
        "name": "Argón-40 (⁴⁰Ar)",
        "abundance": "99.604%",
        "stable": true
      },
      {
        "massNumber": 36,
        "name": "Argón-36 (³⁶Ar)",
        "abundance": "0.334%",
        "stable": true
      },
      {
        "massNumber": 38,
        "name": "Argón-38 (³⁸Ar)",
        "abundance": "0.063%",
        "stable": true
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 3,
    "block": "p",
    "gridRow": 3,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      8
    ],
    "electronConfiguration": "[Ne] 3s² 3p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": null,
    "meltingPointK": 83.81,
    "boilingPointK": 87.302,
    "isRadioactive": false,
    "discoveryYear": "1894",
    "summary": "Argón je tretí najzastúpenejší plyn v zemskej atmosfére (0,93 %). Používa sa ako inertná ochranná atmosféra pri oblúkovom zváraní a pri výrobe čistých kryštálov kremíka."
  },
  {
    "atomicNumber": 19,
    "symbol": "K",
    "name": "Draslík",
    "latinName": "Kalium",
    "englishName": "Potassium",
    "atomicMass": 39.0983,
    "atomicMassDisplay": "39.0983 u",
    "isMassBracketed": false,
    "defaultIsotope": 39,
    "isotopes": [
      {
        "massNumber": 39,
        "name": "Draslík-39 (³⁹K)",
        "abundance": "93.258%",
        "stable": true
      },
      {
        "massNumber": 41,
        "name": "Draslík-41 (⁴¹K)",
        "abundance": "6.730%",
        "stable": true
      },
      {
        "massNumber": 40,
        "name": "Draslík-40 (⁴⁰K)",
        "abundance": "0.012% (t½ = 1.25 Gy)",
        "stable": false
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 4,
    "block": "s",
    "gridRow": 4,
    "gridColumn": 1,
    "shells": [
      2,
      8,
      8,
      1
    ],
    "electronConfiguration": "[Ar] 4s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.82,
    "meltingPointK": 336.7,
    "boilingPointK": 1032.0,
    "isRadioactive": false,
    "discoveryYear": "1807",
    "summary": "Draslík je mäkký, striebristý alkalický kov, ktorý prudko reaguje s vodou. Draselné ióny (K⁺) sú kľúčové pre činnosť srdca, bunkový membránový potenciál a výživu rastlín."
  },
  {
    "atomicNumber": 20,
    "symbol": "Ca",
    "name": "Vápnik",
    "latinName": "Calcium",
    "englishName": "Calcium",
    "atomicMass": 40.078,
    "atomicMassDisplay": "40.078 u",
    "isMassBracketed": false,
    "defaultIsotope": 40,
    "isotopes": [
      {
        "massNumber": 40,
        "name": "Vápnik-40 (⁴⁰Ca)",
        "abundance": "96.941%",
        "stable": true
      },
      {
        "massNumber": 44,
        "name": "Vápnik-44 (⁴⁴Ca)",
        "abundance": "2.086%",
        "stable": true
      },
      {
        "massNumber": 42,
        "name": "Vápnik-42 (⁴²Ca)",
        "abundance": "0.647%",
        "stable": true
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 4,
    "block": "s",
    "gridRow": 4,
    "gridColumn": 2,
    "shells": [
      2,
      8,
      8,
      2
    ],
    "electronConfiguration": "[Ar] 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.0,
    "meltingPointK": 1115.0,
    "boilingPointK": 1757.0,
    "isRadioactive": false,
    "discoveryYear": "1808",
    "summary": "Vápnik je piaty najrozšírenejší prvok v zemskej kôre a hlavná minerálna stavebná zložka kostí, zubov, schránok morských organizmov, vápenca a cementu."
  },
  {
    "atomicNumber": 21,
    "symbol": "Sc",
    "name": "Skandium",
    "latinName": "Scandium",
    "englishName": "Scandium",
    "atomicMass": 44.955908,
    "atomicMassDisplay": "44.955908 u",
    "isMassBracketed": false,
    "defaultIsotope": 45,
    "isotopes": [
      {
        "massNumber": 45,
        "name": "Skandium-45 (⁴⁵Sc)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 3,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 3,
    "shells": [
      2,
      8,
      9,
      2
    ],
    "electronConfiguration": "[Ar] 3d¹ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.36,
    "meltingPointK": 1814.0,
    "boilingPointK": 3109.0,
    "isRadioactive": false,
    "discoveryYear": "1879",
    "summary": "Skandium je striebrobiely prechodný kov d-bloku zaraďovaný medzi prvky vzácnych zemín. Pridáva sa do špičkových hliníkových zliatin pre letecký priemysel."
  },
  {
    "atomicNumber": 22,
    "symbol": "Ti",
    "name": "Titán",
    "latinName": "Titanium",
    "englishName": "Titanium",
    "atomicMass": 47.867,
    "atomicMassDisplay": "47.867 u",
    "isMassBracketed": false,
    "defaultIsotope": 48,
    "isotopes": [
      {
        "massNumber": 48,
        "name": "Titán-48 (⁴⁸Ti)",
        "abundance": "73.72%",
        "stable": true
      },
      {
        "massNumber": 46,
        "name": "Titán-46 (⁴⁶Ti)",
        "abundance": "8.25%",
        "stable": true
      },
      {
        "massNumber": 47,
        "name": "Titán-47 (⁴⁷Ti)",
        "abundance": "7.44%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 4,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      10,
      2
    ],
    "electronConfiguration": "[Ar] 3d² 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.54,
    "meltingPointK": 1941.0,
    "boilingPointK": 3560.0,
    "isRadioactive": false,
    "discoveryYear": "1791",
    "summary": "Titán je pevný prechodný kov s vynikajúcim pomerom pevnosti k hmotnosti a vysokou odolnosťou voči korózii, používaný v letectve, kozmonautike, medicínskych implantátoch a bielych pigmentoch."
  },
  {
    "atomicNumber": 23,
    "symbol": "V",
    "name": "Vanád",
    "latinName": "Vanadium",
    "englishName": "Vanadium",
    "atomicMass": 50.9415,
    "atomicMassDisplay": "50.9415 u",
    "isMassBracketed": false,
    "defaultIsotope": 51,
    "isotopes": [
      {
        "massNumber": 51,
        "name": "Vanád-51 (⁵¹V)",
        "abundance": "99.75%",
        "stable": true
      },
      {
        "massNumber": 50,
        "name": "Vanád-50 (⁵⁰V)",
        "abundance": "0.25% (t½ > 1.4×10¹⁷ y)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 5,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      11,
      2
    ],
    "electronConfiguration": "[Ar] 3d³ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.63,
    "meltingPointK": 2183.0,
    "boilingPointK": 3680.0,
    "isRadioactive": false,
    "discoveryYear": "1801",
    "summary": "Vanád je tvrdý, striebrosivý prechodný kov používaný na legovanie vysokopevnostných nástrojových ocelí a vo veľkokapacitných vanádových prietokových batériách."
  },
  {
    "atomicNumber": 24,
    "symbol": "Cr",
    "name": "Chróm",
    "latinName": "Chromium",
    "englishName": "Chromium",
    "atomicMass": 51.9961,
    "atomicMassDisplay": "51.9961 u",
    "isMassBracketed": false,
    "defaultIsotope": 52,
    "isotopes": [
      {
        "massNumber": 52,
        "name": "Chróm-52 (⁵²Cr)",
        "abundance": "83.789%",
        "stable": true
      },
      {
        "massNumber": 53,
        "name": "Chróm-53 (⁵³Cr)",
        "abundance": "9.501%",
        "stable": true
      },
      {
        "massNumber": 50,
        "name": "Chróm-50 (⁵⁰Cr)",
        "abundance": "4.345%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 6,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      13,
      1
    ],
    "electronConfiguration": "[Ar] 3d⁵ 4s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.66,
    "meltingPointK": 2180.0,
    "boilingPointK": 2944.0,
    "isRadioactive": false,
    "discoveryYear": "1797",
    "summary": "Chróm je tvrdý, lesklý prechodný kov s anomálnou elektrónovou konfiguráciou [Ar] 3d⁵ 4s¹, ktorý dodáva nehrdzavejúcim oceliam odolnosť voči korózii."
  },
  {
    "atomicNumber": 25,
    "symbol": "Mn",
    "name": "Mangán",
    "latinName": "Manganum",
    "englishName": "Manganese",
    "atomicMass": 54.938044,
    "atomicMassDisplay": "54.938044 u",
    "isMassBracketed": false,
    "defaultIsotope": 55,
    "isotopes": [
      {
        "massNumber": 55,
        "name": "Mangán-55 (⁵⁵Mn)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 7,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      13,
      2
    ],
    "electronConfiguration": "[Ar] 3d⁵ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.55,
    "meltingPointK": 1519.0,
    "boilingPointK": 2334.0,
    "isRadioactive": false,
    "discoveryYear": "1774",
    "summary": "Mangán je prechodný kov s mnohými oxidačnými stupňami (+2 až +7), nevyhnutný pri výrobe ocele a pri fotolýze vody vo fotosyntetickom aparáte rastlín."
  },
  {
    "atomicNumber": 26,
    "symbol": "Fe",
    "name": "Železo",
    "latinName": "Ferrum",
    "englishName": "Iron",
    "atomicMass": 55.845,
    "atomicMassDisplay": "55.845 u",
    "isMassBracketed": false,
    "defaultIsotope": 56,
    "isotopes": [
      {
        "massNumber": 56,
        "name": "Železo-56 (⁵⁶Fe)",
        "abundance": "91.754%",
        "stable": true
      },
      {
        "massNumber": 54,
        "name": "Železo-54 (⁵⁴Fe)",
        "abundance": "5.845%",
        "stable": true
      },
      {
        "massNumber": 57,
        "name": "Železo-57 (⁵⁷Fe)",
        "abundance": "2.119%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 8,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      14,
      2
    ],
    "electronConfiguration": "[Ar] 3d⁶ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.83,
    "meltingPointK": 1811.0,
    "boilingPointK": 3134.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Železo je celkovo najrozšírenejší prvok na Zemi podľa hmotnosti (tvorí zemské jadro), je základnou zložkou ocele a viaže kyslík v krvnom farbive hemoglobíne."
  },
  {
    "atomicNumber": 27,
    "symbol": "Co",
    "name": "Kobalt",
    "latinName": "Cobaltum",
    "englishName": "Cobalt",
    "atomicMass": 58.933194,
    "atomicMassDisplay": "58.933194 u",
    "isMassBracketed": false,
    "defaultIsotope": 59,
    "isotopes": [
      {
        "massNumber": 59,
        "name": "Kobalt-59 (⁵⁹Co)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 60,
        "name": "Kobalt-60 (⁶⁰Co)",
        "abundance": "Syntetický (t½ = 5.27 y)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 9,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      15,
      2
    ],
    "electronConfiguration": "[Ar] 3d⁷ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.88,
    "meltingPointK": 1768.0,
    "boilingPointK": 3200.0,
    "isRadioactive": false,
    "discoveryYear": "1735",
    "summary": "Kobalt je feromagnetický prechodný kov známy sýtomodrými sklárskymi pigmentmi, žiarupevnými superzliatinami, katódami batérií a ako centrálny atóm vitamínu B₁₂."
  },
  {
    "atomicNumber": 28,
    "symbol": "Ni",
    "name": "Nikel",
    "latinName": "Niccolum",
    "englishName": "Nickel",
    "atomicMass": 58.6934,
    "atomicMassDisplay": "58.6934 u",
    "isMassBracketed": false,
    "defaultIsotope": 58,
    "isotopes": [
      {
        "massNumber": 58,
        "name": "Nikel-58 (⁵⁸Ni)",
        "abundance": "68.077%",
        "stable": true
      },
      {
        "massNumber": 60,
        "name": "Nikel-60 (⁶⁰Ni)",
        "abundance": "26.223%",
        "stable": true
      },
      {
        "massNumber": 62,
        "name": "Nikel-62 (⁶²Ni)",
        "abundance": "3.635%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 10,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      16,
      2
    ],
    "electronConfiguration": "[Ar] 3d⁸ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.91,
    "meltingPointK": 1728.0,
    "boilingPointK": 3003.0,
    "isRadioactive": false,
    "discoveryYear": "1751",
    "summary": "Nikel je feromagnetický, koróziivzdorný prechodný kov široko využívaný v austenitických nehrdzavejúcich oceliach, akumulátoroch, minciach a hydrogenačných katalyzátoroch."
  },
  {
    "atomicNumber": 29,
    "symbol": "Cu",
    "name": "Meď",
    "latinName": "Cuprum",
    "englishName": "Copper",
    "atomicMass": 63.546,
    "atomicMassDisplay": "63.546 u",
    "isMassBracketed": false,
    "defaultIsotope": 63,
    "isotopes": [
      {
        "massNumber": 63,
        "name": "Meď-63 (⁶³Cu)",
        "abundance": "69.15%",
        "stable": true
      },
      {
        "massNumber": 65,
        "name": "Meď-65 (⁶⁵Cu)",
        "abundance": "30.85%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 11,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      1
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.9,
    "meltingPointK": 1357.77,
    "boilingPointK": 2835.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Meď je kujný, červenooranžový kov s konfiguráciou [Ar] 3d¹⁰ 4s¹ a mimoriadne vysokou elektrickou i tepelnou vodivosťou, kľúčový pre elektrické vodiče, elektromotory a zliatiny bronz a mosadz."
  },
  {
    "atomicNumber": 30,
    "symbol": "Zn",
    "name": "Zinok",
    "latinName": "Zincum",
    "englishName": "Zinc",
    "atomicMass": 65.38,
    "atomicMassDisplay": "65.38 u",
    "isMassBracketed": false,
    "defaultIsotope": 64,
    "isotopes": [
      {
        "massNumber": 64,
        "name": "Zinok-64 (⁶⁴Zn)",
        "abundance": "49.17%",
        "stable": true
      },
      {
        "massNumber": 66,
        "name": "Zinok-66 (⁶⁶Zn)",
        "abundance": "27.73%",
        "stable": true
      },
      {
        "massNumber": 68,
        "name": "Zinok-68 (⁶⁸Zn)",
        "abundance": "18.45%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 12,
    "period": 4,
    "block": "d",
    "gridRow": 4,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      2
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.65,
    "meltingPointK": 692.68,
    "boilingPointK": 1180.0,
    "isRadioactive": false,
    "discoveryYear": "1746",
    "summary": "Zinok je modrastobiely prechodný kov používaný na protikorózne pozinkovanie ocele, výrobu mosadze a ako nevyhnutný biogénny prvok v stovkách enzýmov."
  },
  {
    "atomicNumber": 31,
    "symbol": "Ga",
    "name": "Gálium",
    "latinName": "Gallium",
    "englishName": "Gallium",
    "atomicMass": 69.723,
    "atomicMassDisplay": "69.723 u",
    "isMassBracketed": false,
    "defaultIsotope": 69,
    "isotopes": [
      {
        "massNumber": 69,
        "name": "Gálium-69 (⁶⁹Ga)",
        "abundance": "60.108%",
        "stable": true
      },
      {
        "massNumber": 71,
        "name": "Gálium-71 (⁷¹Ga)",
        "abundance": "39.892%",
        "stable": true
      }
    ],
    "category": "post-transition-metal",
    "group": 13,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      3
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.81,
    "meltingPointK": 302.9146,
    "boilingPointK": 2673.0,
    "isRadioactive": false,
    "discoveryYear": "1875",
    "summary": "Gálium je mäkký kov p-bloku s nízkou teplotou topenia (29,76 °C), ktorý tvorí kľúčové polovodičové zlúčeniny GaAs a GaN pre LED diódy, lasery a vysokofrekvenčnú elektroniku."
  },
  {
    "atomicNumber": 32,
    "symbol": "Ge",
    "name": "Germánium",
    "latinName": "Germanium",
    "englishName": "Germanium",
    "atomicMass": 72.63,
    "atomicMassDisplay": "72.63 u",
    "isMassBracketed": false,
    "defaultIsotope": 74,
    "isotopes": [
      {
        "massNumber": 74,
        "name": "Germánium-74 (⁷⁴Ge)",
        "abundance": "36.28%",
        "stable": true
      },
      {
        "massNumber": 72,
        "name": "Germánium-72 (⁷²Ge)",
        "abundance": "27.54%",
        "stable": true
      },
      {
        "massNumber": 70,
        "name": "Germánium-70 (⁷⁰Ge)",
        "abundance": "20.84%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 14,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      4
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.01,
    "meltingPointK": 1211.4,
    "boilingPointK": 3106.0,
    "isRadioactive": false,
    "discoveryYear": "1886",
    "summary": "Germánium je lesklý, tvrdý sivobiely polokov predpovedaný Mendelejevom ako ekasilícium, využívaný v optických vláknach, infračervenej optike a polovodičovej technike."
  },
  {
    "atomicNumber": 33,
    "symbol": "As",
    "name": "Arzén",
    "latinName": "Arsenicum",
    "englishName": "Arsenic",
    "atomicMass": 74.921595,
    "atomicMassDisplay": "74.921595 u",
    "isMassBracketed": false,
    "defaultIsotope": 75,
    "isotopes": [
      {
        "massNumber": 75,
        "name": "Arzén-75 (⁷⁵As)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 15,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      5
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p³",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p³",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.18,
    "meltingPointK": 1090.0,
    "boilingPointK": 887.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Arzén je jedovatý polokov, ktorý pri bežnom tlaku sublimuje pri 887 K. Využíva sa pri výrobe polovodičov typu arzenidu gália (GaAs) a špeciálnych zliatin."
  },
  {
    "atomicNumber": 34,
    "symbol": "Se",
    "name": "Selén",
    "latinName": "Selenium",
    "englishName": "Selenium",
    "atomicMass": 78.971,
    "atomicMassDisplay": "78.971 u",
    "isMassBracketed": false,
    "defaultIsotope": 80,
    "isotopes": [
      {
        "massNumber": 80,
        "name": "Selén-80 (⁸⁰Se)",
        "abundance": "49.61%",
        "stable": true
      },
      {
        "massNumber": 78,
        "name": "Selén-78 (⁷⁸Se)",
        "abundance": "23.77%",
        "stable": true
      },
      {
        "massNumber": 76,
        "name": "Selén-76 (⁷⁶Se)",
        "abundance": "9.37%",
        "stable": true
      }
    ],
    "category": "reactive-nonmetal",
    "group": 16,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      6
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.55,
    "meltingPointK": 494.0,
    "boilingPointK": 958.0,
    "isRadioactive": false,
    "discoveryYear": "1817",
    "summary": "Selén je nekov so zaujímavými fotoelektrickými vlastnosťami, používaný v solárnych článkoch, sklárstve a zároveň slúžiaci ako dôležitý stopový prvok v antioxidačných enzýmoch."
  },
  {
    "atomicNumber": 35,
    "symbol": "Br",
    "name": "Bróm",
    "latinName": "Bromum",
    "englishName": "Bromine",
    "atomicMass": 79.904,
    "atomicMassDisplay": "79.904 u",
    "isMassBracketed": false,
    "defaultIsotope": 79,
    "isotopes": [
      {
        "massNumber": 79,
        "name": "Bróm-79 (⁷⁹Br)",
        "abundance": "50.69%",
        "stable": true
      },
      {
        "massNumber": 81,
        "name": "Bróm-81 (⁸¹Br)",
        "abundance": "49.31%",
        "stable": true
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      7
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "liquid",
    "electronegativity": 2.96,
    "meltingPointK": 265.8,
    "boilingPointK": 332.0,
    "isRadioactive": false,
    "discoveryYear": "1826",
    "summary": "Bróm je jeden z iba dvoch prvkov, ktoré sú pri štandardných podmienkach kvapalné. Tvorí ťažkú červenohnedú prchavú kvapalinu zo skupiny halogénov."
  },
  {
    "atomicNumber": 36,
    "symbol": "Kr",
    "name": "Kryptón",
    "latinName": "Krypton",
    "englishName": "Krypton",
    "atomicMass": 83.798,
    "atomicMassDisplay": "83.798 u",
    "isMassBracketed": false,
    "defaultIsotope": 84,
    "isotopes": [
      {
        "massNumber": 84,
        "name": "Kryptón-84 (⁸⁴Kr)",
        "abundance": "56.987%",
        "stable": true
      },
      {
        "massNumber": 86,
        "name": "Kryptón-86 (⁸⁶Kr)",
        "abundance": "17.279%",
        "stable": true
      },
      {
        "massNumber": 82,
        "name": "Kryptón-82 (⁸²Kr)",
        "abundance": "11.593%",
        "stable": true
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 4,
    "block": "p",
    "gridRow": 4,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      8
    ],
    "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 3.0,
    "meltingPointK": 115.78,
    "boilingPointK": 119.93,
    "isRadioactive": false,
    "discoveryYear": "1898",
    "summary": "Kryptón je vzácny plyn schopný za extrémnych podmienok tvoriť fluoridy (napr. KrF₂), používaný vo výkonných svetelných zdrojoch, excimerových laseroch a izolačných sklách."
  },
  {
    "atomicNumber": 37,
    "symbol": "Rb",
    "name": "Rubídium",
    "latinName": "Rubidium",
    "englishName": "Rubidium",
    "atomicMass": 85.4678,
    "atomicMassDisplay": "85.4678 u",
    "isMassBracketed": false,
    "defaultIsotope": 85,
    "isotopes": [
      {
        "massNumber": 85,
        "name": "Rubídium-85 (⁸⁵Rb)",
        "abundance": "72.17%",
        "stable": true
      },
      {
        "massNumber": 87,
        "name": "Rubídium-87 (⁸⁷Rb)",
        "abundance": "27.83% (t½ = 49.2 Gy)",
        "stable": false
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 5,
    "block": "s",
    "gridRow": 5,
    "gridColumn": 1,
    "shells": [
      2,
      8,
      18,
      8,
      1
    ],
    "electronConfiguration": "[Kr] 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.82,
    "meltingPointK": 312.45,
    "boilingPointK": 961.0,
    "isRadioactive": false,
    "discoveryYear": "1861",
    "summary": "Rubídium je veľmi mäkký a vysoko reaktívny alkalický kov s nízkou teplotou topenia (39,3 °C), využívaný v presných rubídiových atómových hodinách a kvantovej fyzike."
  },
  {
    "atomicNumber": 38,
    "symbol": "Sr",
    "name": "Stroncium",
    "latinName": "Strontium",
    "englishName": "Strontium",
    "atomicMass": 87.62,
    "atomicMassDisplay": "87.62 u",
    "isMassBracketed": false,
    "defaultIsotope": 88,
    "isotopes": [
      {
        "massNumber": 88,
        "name": "Stroncium-88 (⁸⁸Sr)",
        "abundance": "82.58%",
        "stable": true
      },
      {
        "massNumber": 86,
        "name": "Stroncium-86 (⁸⁶Sr)",
        "abundance": "9.86%",
        "stable": true
      },
      {
        "massNumber": 87,
        "name": "Stroncium-87 (⁸⁷Sr)",
        "abundance": "7.00%",
        "stable": true
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 5,
    "block": "s",
    "gridRow": 5,
    "gridColumn": 2,
    "shells": [
      2,
      8,
      18,
      8,
      2
    ],
    "electronConfiguration": "[Kr] 5s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.95,
    "meltingPointK": 1050.0,
    "boilingPointK": 1650.0,
    "isRadioactive": false,
    "discoveryYear": "1790",
    "summary": "Stroncium je reaktívny kov alkalických zemín, ktorého soli farbia plameň na žiarivo karmínovočerveno a využívajú sa v pyrotechnike, feritových magnetoch a optických atómových hodinách."
  },
  {
    "atomicNumber": 39,
    "symbol": "Y",
    "name": "Ytrium",
    "latinName": "Yttrium",
    "englishName": "Yttrium",
    "atomicMass": 88.90584,
    "atomicMassDisplay": "88.90584 u",
    "isMassBracketed": false,
    "defaultIsotope": 89,
    "isotopes": [
      {
        "massNumber": 89,
        "name": "Ytrium-89 (⁸⁹Y)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 3,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 3,
    "shells": [
      2,
      8,
      18,
      9,
      2
    ],
    "electronConfiguration": "[Kr] 4d¹ 5s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹ 5s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.22,
    "meltingPointK": 1799.0,
    "boilingPointK": 3203.0,
    "isRadioactive": false,
    "discoveryYear": "1794",
    "summary": "Ytrium je striebrolesklý prechodný kov vzácnych zemín používaný v pevnolátkových laseroch (Nd:YAG), luminoforoch, keramike a vysokoteplotných supravodičoch YBCO."
  },
  {
    "atomicNumber": 40,
    "symbol": "Zr",
    "name": "Zirkónium",
    "latinName": "Zirconium",
    "englishName": "Zirconium",
    "atomicMass": 91.224,
    "atomicMassDisplay": "91.224 u",
    "isMassBracketed": false,
    "defaultIsotope": 90,
    "isotopes": [
      {
        "massNumber": 90,
        "name": "Zirkónium-90 (⁹⁰Zr)",
        "abundance": "51.45%",
        "stable": true
      },
      {
        "massNumber": 94,
        "name": "Zirkónium-94 (⁹⁴Zr)",
        "abundance": "17.38%",
        "stable": true
      },
      {
        "massNumber": 92,
        "name": "Zirkónium-92 (⁹²Zr)",
        "abundance": "17.15%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 4,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      18,
      10,
      2
    ],
    "electronConfiguration": "[Kr] 4d² 5s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d² 5s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.33,
    "meltingPointK": 2128.0,
    "boilingPointK": 4650.0,
    "isRadioactive": false,
    "discoveryYear": "1789",
    "summary": "Zirkónium je koróziivzdorný prechodný kov s veľmi nízkym účinným prierezom pre záchyt tepelných neutrónov, vďaka čomu tvorí ochranné obaly palivových článkov v jadrových reaktoroch."
  },
  {
    "atomicNumber": 41,
    "symbol": "Nb",
    "name": "Niób",
    "latinName": "Niobium",
    "englishName": "Niobium",
    "atomicMass": 92.90637,
    "atomicMassDisplay": "92.90637 u",
    "isMassBracketed": false,
    "defaultIsotope": 93,
    "isotopes": [
      {
        "massNumber": 93,
        "name": "Niób-93 (⁹³Nb)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 5,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      18,
      12,
      1
    ],
    "electronConfiguration": "[Kr] 4d⁴ 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁴ 5s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.6,
    "meltingPointK": 2750.0,
    "boilingPointK": 5017.0,
    "isRadioactive": false,
    "discoveryYear": "1801",
    "summary": "Niób je kujný žiarupevný prechodný kov s konfiguráciou [Kr] 4d⁴ 5s¹, nevyhnutný pre supravodivé magnety (NbTi, Nb₃Sn) v prístrojoch MRI a v urýchľovačoch častíc."
  },
  {
    "atomicNumber": 42,
    "symbol": "Mo",
    "name": "Molybdén",
    "latinName": "Molybdaenum",
    "englishName": "Molybdenum",
    "atomicMass": 95.95,
    "atomicMassDisplay": "95.95 u",
    "isMassBracketed": false,
    "defaultIsotope": 98,
    "isotopes": [
      {
        "massNumber": 98,
        "name": "Molybdén-98 (⁹⁸Mo)",
        "abundance": "24.29%",
        "stable": true
      },
      {
        "massNumber": 96,
        "name": "Molybdén-96 (⁹⁶Mo)",
        "abundance": "16.67%",
        "stable": true
      },
      {
        "massNumber": 95,
        "name": "Molybdén-95 (⁹⁵Mo)",
        "abundance": "15.87%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 6,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      18,
      13,
      1
    ],
    "electronConfiguration": "[Kr] 4d⁵ 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.16,
    "meltingPointK": 2896.0,
    "boilingPointK": 4912.0,
    "isRadioactive": false,
    "discoveryYear": "1778",
    "summary": "Molybdén je žiarupevný prechodný kov s konfiguráciou [Kr] 4d⁵ 5s¹, používaný v špeciálnych oceliach, vysokoteplotných mazivách (MoS₂) a v enzýmoch viažucich vzdušný dusík."
  },
  {
    "atomicNumber": 43,
    "symbol": "Tc",
    "name": "Technécium",
    "latinName": "Technetium",
    "englishName": "Technetium",
    "atomicMass": 98,
    "atomicMassDisplay": "[98] u",
    "isMassBracketed": true,
    "defaultIsotope": 98,
    "isotopes": [
      {
        "massNumber": 98,
        "name": "Technécium-98 (⁹⁸Tc)",
        "abundance": "Syntetický (t½ = 4.2 My)",
        "stable": false
      },
      {
        "massNumber": 97,
        "name": "Technécium-97 (⁹⁷Tc)",
        "abundance": "Syntetický (t½ = 4.21 My)",
        "stable": false
      },
      {
        "massNumber": 99,
        "name": "Technécium-99 (⁹⁹Tc)",
        "abundance": "Štiepny produkt (t½ = 211 ky)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 7,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      18,
      13,
      2
    ],
    "electronConfiguration": "[Kr] 4d⁵ 5s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.9,
    "meltingPointK": 2430.0,
    "boilingPointK": 4538.0,
    "isRadioactive": true,
    "discoveryYear": "1937",
    "summary": "Technécium je najľahší prvok, ktorý nemá žiadny stabilný izotop, a prvý umelo pripravený prvok. Metastabilný izotop ⁹⁹ᵐTc je najpoužívanejším rádionuklidom v nukleárnej medicíne."
  },
  {
    "atomicNumber": 44,
    "symbol": "Ru",
    "name": "Ruténium",
    "latinName": "Ruthenium",
    "englishName": "Ruthenium",
    "atomicMass": 101.07,
    "atomicMassDisplay": "101.07 u",
    "isMassBracketed": false,
    "defaultIsotope": 102,
    "isotopes": [
      {
        "massNumber": 102,
        "name": "Ruténium-102 (¹⁰²Ru)",
        "abundance": "31.55%",
        "stable": true
      },
      {
        "massNumber": 104,
        "name": "Ruténium-104 (¹⁰⁴Ru)",
        "abundance": "18.62%",
        "stable": true
      },
      {
        "massNumber": 101,
        "name": "Ruténium-101 (¹⁰¹Ru)",
        "abundance": "17.06%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 8,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      18,
      15,
      1
    ],
    "electronConfiguration": "[Kr] 4d⁷ 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁷ 5s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.2,
    "meltingPointK": 2607.0,
    "boilingPointK": 4423.0,
    "isRadioactive": false,
    "discoveryYear": "1844",
    "summary": "Ruténium je vzácny platinový kov s konfiguráciou [Kr] 4d⁷ 5s¹, používaný na tvrdenie platinových zliatin, výrobu odolných elektrických kontaktov a v organickej katalýze."
  },
  {
    "atomicNumber": 45,
    "symbol": "Rh",
    "name": "Ródium",
    "latinName": "Rhodium",
    "englishName": "Rhodium",
    "atomicMass": 102.90549,
    "atomicMassDisplay": "102.90549 u",
    "isMassBracketed": false,
    "defaultIsotope": 103,
    "isotopes": [
      {
        "massNumber": 103,
        "name": "Ródium-103 (¹⁰³Rh)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 9,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      18,
      16,
      1
    ],
    "electronConfiguration": "[Kr] 4d⁸ 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁸ 5s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.28,
    "meltingPointK": 2237.0,
    "boilingPointK": 3968.0,
    "isRadioactive": false,
    "discoveryYear": "1803",
    "summary": "Ródium je vysoko reflexný, ušľachtilý platinový kov s konfiguráciou [Kr] 4d⁸ 5s¹, nenahraditeľný v trojcestných automobilových katalyzátoroch na redukciu oxidov dusíka."
  },
  {
    "atomicNumber": 46,
    "symbol": "Pd",
    "name": "Paládium",
    "latinName": "Palladium",
    "englishName": "Palladium",
    "atomicMass": 106.42,
    "atomicMassDisplay": "106.42 u",
    "isMassBracketed": false,
    "defaultIsotope": 106,
    "isotopes": [
      {
        "massNumber": 106,
        "name": "Paládium-106 (¹⁰⁶Pd)",
        "abundance": "27.33%",
        "stable": true
      },
      {
        "massNumber": 108,
        "name": "Paládium-108 (¹⁰⁸Pd)",
        "abundance": "26.46%",
        "stable": true
      },
      {
        "massNumber": 105,
        "name": "Paládium-105 (¹⁰⁵Pd)",
        "abundance": "22.33%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 10,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      18,
      18
    ],
    "electronConfiguration": "[Kr] 4d¹⁰",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.2,
    "meltingPointK": 1828.05,
    "boilingPointK": 3236.0,
    "isRadioactive": false,
    "discoveryYear": "1803",
    "summary": "Paládium je platinový kov s unikátnou konfiguráciou [Kr] 4d¹⁰ 5s⁰ (bez elektrónov v 5. vrstve), schopný pohlcovať veľké objemy vodíka a katalyzovať kľúčové organické reakcie."
  },
  {
    "atomicNumber": 47,
    "symbol": "Ag",
    "name": "Striebro",
    "latinName": "Argentum",
    "englishName": "Silver",
    "atomicMass": 107.8682,
    "atomicMassDisplay": "107.8682 u",
    "isMassBracketed": false,
    "defaultIsotope": 107,
    "isotopes": [
      {
        "massNumber": 107,
        "name": "Striebro-107 (¹⁰⁷Ag)",
        "abundance": "51.839%",
        "stable": true
      },
      {
        "massNumber": 109,
        "name": "Striebro-109 (¹⁰⁹Ag)",
        "abundance": "48.161%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 11,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      18,
      1
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.93,
    "meltingPointK": 1234.93,
    "boilingPointK": 2435.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Striebro je ušľachtilý prechodný kov s najvyššou elektrickou a tepelnou vodivosťou aj optickou odrazivosťou spomedzi všetkých kovov, využívaný v elektronike, solárnych paneloch a šperkárstve."
  },
  {
    "atomicNumber": 48,
    "symbol": "Cd",
    "name": "Kadmium",
    "latinName": "Cadmium",
    "englishName": "Cadmium",
    "atomicMass": 112.414,
    "atomicMassDisplay": "112.414 u",
    "isMassBracketed": false,
    "defaultIsotope": 114,
    "isotopes": [
      {
        "massNumber": 114,
        "name": "Kadmium-114 (¹¹⁴Cd)",
        "abundance": "28.73%",
        "stable": true
      },
      {
        "massNumber": 112,
        "name": "Kadmium-112 (¹¹²Cd)",
        "abundance": "24.13%",
        "stable": true
      },
      {
        "massNumber": 111,
        "name": "Kadmium-111 (¹¹¹Cd)",
        "abundance": "12.80%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 12,
    "period": 5,
    "block": "d",
    "gridRow": 5,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      18,
      2
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.69,
    "meltingPointK": 594.22,
    "boilingPointK": 1040.0,
    "isRadioactive": false,
    "discoveryYear": "1817",
    "summary": "Kadmium je mäkký modrastobiely kov používaný v tenkovrstvových solárnych článkoch (CdTe), riadiacich tyčiach jadrových reaktorov a akumulátoroch."
  },
  {
    "atomicNumber": 49,
    "symbol": "In",
    "name": "Indium",
    "latinName": "Indium",
    "englishName": "Indium",
    "atomicMass": 114.818,
    "atomicMassDisplay": "114.818 u",
    "isMassBracketed": false,
    "defaultIsotope": 115,
    "isotopes": [
      {
        "massNumber": 115,
        "name": "Indium-115 (¹¹⁵In)",
        "abundance": "95.71% (t½ = 4.41×10¹⁴ y)",
        "stable": false
      },
      {
        "massNumber": 113,
        "name": "Indium-113 (¹¹³In)",
        "abundance": "4.29%",
        "stable": true
      }
    ],
    "category": "post-transition-metal",
    "group": 13,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      18,
      3
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.78,
    "meltingPointK": 429.7485,
    "boilingPointK": 2345.0,
    "isRadioactive": false,
    "discoveryYear": "1863",
    "summary": "Indium je veľmi mäkký kov p-bloku, z ktorého sa vyrába priehľadný vodivý oxid indito-ciničitý (ITO) pre dotykové obrazovky a displeje."
  },
  {
    "atomicNumber": 50,
    "symbol": "Sn",
    "name": "Cín",
    "latinName": "Stannum",
    "englishName": "Tin",
    "atomicMass": 118.71,
    "atomicMassDisplay": "118.71 u",
    "isMassBracketed": false,
    "defaultIsotope": 120,
    "isotopes": [
      {
        "massNumber": 120,
        "name": "Cín-120 (¹²⁰Sn)",
        "abundance": "32.58%",
        "stable": true
      },
      {
        "massNumber": 118,
        "name": "Cín-118 (¹¹⁸Sn)",
        "abundance": "24.22%",
        "stable": true
      },
      {
        "massNumber": 116,
        "name": "Cín-116 (¹¹⁶Sn)",
        "abundance": "14.54%",
        "stable": true
      }
    ],
    "category": "post-transition-metal",
    "group": 14,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      18,
      4
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.96,
    "meltingPointK": 505.08,
    "boilingPointK": 2875.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Cín je striebrobiely kov odolný voči korózii s desiatimi stabilnými izotopmi (najviac zo všetkých prvkov), od staroveku používaný v bronze a dnes v bezolovnatých spájkach."
  },
  {
    "atomicNumber": 51,
    "symbol": "Sb",
    "name": "Antimón",
    "latinName": "Stibium",
    "englishName": "Antimony",
    "atomicMass": 121.76,
    "atomicMassDisplay": "121.76 u",
    "isMassBracketed": false,
    "defaultIsotope": 121,
    "isotopes": [
      {
        "massNumber": 121,
        "name": "Antimón-121 (¹²¹Sb)",
        "abundance": "57.21%",
        "stable": true
      },
      {
        "massNumber": 123,
        "name": "Antimón-123 (¹²³Sb)",
        "abundance": "42.79%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 15,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      18,
      5
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p³",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.05,
    "meltingPointK": 903.78,
    "boilingPointK": 1908.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Antimón je lesklý sivý polokov, ktorý sa pri tuhnutí rozpína. Používa sa ako spomaľovač horenia (Sb₂O₃), v olovených akumulátoroch a polovodičových infračervených detektoroch."
  },
  {
    "atomicNumber": 52,
    "symbol": "Te",
    "name": "Telúr",
    "latinName": "Tellurium",
    "englishName": "Tellurium",
    "atomicMass": 127.6,
    "atomicMassDisplay": "127.6 u",
    "isMassBracketed": false,
    "defaultIsotope": 130,
    "isotopes": [
      {
        "massNumber": 130,
        "name": "Telúr-130 (¹³⁰Te)",
        "abundance": "34.08% (t½ = 7.9×10²⁰ y)",
        "stable": false
      },
      {
        "massNumber": 128,
        "name": "Telúr-128 (¹²⁸Te)",
        "abundance": "31.74% (t½ = 2.2×10²⁴ y)",
        "stable": false
      },
      {
        "massNumber": 126,
        "name": "Telúr-126 (¹²⁶Te)",
        "abundance": "18.84%",
        "stable": true
      }
    ],
    "category": "metalloid",
    "group": 16,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      18,
      6
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.1,
    "meltingPointK": 722.66,
    "boilingPointK": 1261.0,
    "isRadioactive": false,
    "discoveryYear": "1782",
    "summary": "Telúr je vzácny striebrobiely polokov zo skupiny chalkogénov, využívaný v solárnych paneloch (CdTe), termoelektrických chladičoch (Bi₂Te₃) a metalurgii."
  },
  {
    "atomicNumber": 53,
    "symbol": "I",
    "name": "Jód",
    "latinName": "Iodum",
    "englishName": "Iodine",
    "atomicMass": 126.90447,
    "atomicMassDisplay": "126.90447 u",
    "isMassBracketed": false,
    "defaultIsotope": 127,
    "isotopes": [
      {
        "massNumber": 127,
        "name": "Jód-127 (¹²⁷I)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 131,
        "name": "Jód-131 (¹³¹I)",
        "abundance": "Syntetický (t½ = 8.02 d)",
        "stable": false
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      18,
      7
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.66,
    "meltingPointK": 386.85,
    "boilingPointK": 457.4,
    "isRadioactive": false,
    "discoveryYear": "1811",
    "summary": "Jód je fialovočierny kryštalický halogén, ktorý pri zahrievaní sublimuje na fialové pary. Je nevyhnutným biogénnym prvkom pre tvorbu hormónov štítnej žľazy."
  },
  {
    "atomicNumber": 54,
    "symbol": "Xe",
    "name": "Xenón",
    "latinName": "Xenon",
    "englishName": "Xenon",
    "atomicMass": 131.293,
    "atomicMassDisplay": "131.293 u",
    "isMassBracketed": false,
    "defaultIsotope": 132,
    "isotopes": [
      {
        "massNumber": 132,
        "name": "Xenón-132 (¹³²Xe)",
        "abundance": "26.909%",
        "stable": true
      },
      {
        "massNumber": 129,
        "name": "Xenón-129 (¹²⁹Xe)",
        "abundance": "26.401%",
        "stable": true
      },
      {
        "massNumber": 131,
        "name": "Xenón-131 (¹³¹Xe)",
        "abundance": "21.232%",
        "stable": true
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 5,
    "block": "p",
    "gridRow": 5,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      18,
      8
    ],
    "electronConfiguration": "[Kr] 4d¹⁰ 5s² 5p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 2.6,
    "meltingPointK": 161.4,
    "boilingPointK": 165.051,
    "isRadioactive": false,
    "discoveryYear": "1898",
    "summary": "Xenón je ťažký vzácny plyn schopný tvoriť stabilné fluoridy a oxidy, využívaný v iónových motoroch kozmických sond, výbojkách a v medicínskej anestézii."
  },
  {
    "atomicNumber": 55,
    "symbol": "Cs",
    "name": "Cézium",
    "latinName": "Caesium",
    "englishName": "Cesium",
    "atomicMass": 132.90545196,
    "atomicMassDisplay": "132.90545196 u",
    "isMassBracketed": false,
    "defaultIsotope": 133,
    "isotopes": [
      {
        "massNumber": 133,
        "name": "Cézium-133 (¹³³Cs)",
        "abundance": "100%",
        "stable": true
      },
      {
        "massNumber": 137,
        "name": "Cézium-137 (¹³⁷Cs)",
        "abundance": "Štiepny produkt (t½ = 30.17 y)",
        "stable": false
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 6,
    "block": "s",
    "gridRow": 6,
    "gridColumn": 1,
    "shells": [
      2,
      8,
      18,
      18,
      8,
      1
    ],
    "electronConfiguration": "[Xe] 6s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.79,
    "meltingPointK": 301.7,
    "boilingPointK": 944.0,
    "isRadioactive": false,
    "discoveryYear": "1860",
    "summary": "Cézium je mäkký, zlatistý alkalický kov, ktorý sa topí už pri 28,5 °C. Hyperjemný prechod v atóme ¹³³Cs definuje základnú jednotku času — sekundu v sústave SI."
  },
  {
    "atomicNumber": 56,
    "symbol": "Ba",
    "name": "Bárium",
    "latinName": "Barium",
    "englishName": "Barium",
    "atomicMass": 137.327,
    "atomicMassDisplay": "137.327 u",
    "isMassBracketed": false,
    "defaultIsotope": 138,
    "isotopes": [
      {
        "massNumber": 138,
        "name": "Bárium-138 (¹³⁸Ba)",
        "abundance": "71.698%",
        "stable": true
      },
      {
        "massNumber": 137,
        "name": "Bárium-137 (¹³⁷Ba)",
        "abundance": "11.232%",
        "stable": true
      },
      {
        "massNumber": 136,
        "name": "Bárium-136 (¹³⁶Ba)",
        "abundance": "7.854%",
        "stable": true
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 6,
    "block": "s",
    "gridRow": 6,
    "gridColumn": 2,
    "shells": [
      2,
      8,
      18,
      18,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.89,
    "meltingPointK": 1000.0,
    "boilingPointK": 2118.0,
    "isRadioactive": false,
    "discoveryYear": "1808",
    "summary": "Bárium je reaktívny ťažký kov alkalických zemín; nerozpustný síran bárnatý (BaSO₄) slúži ako kontrastná látka pri röntgenovom vyšetrení tráviacej sústavy a vo vrtných výplachoch."
  },
  {
    "atomicNumber": 57,
    "symbol": "La",
    "name": "Lantán",
    "latinName": "Lanthanum",
    "englishName": "Lanthanum",
    "atomicMass": 138.90547,
    "atomicMassDisplay": "138.90547 u",
    "isMassBracketed": false,
    "defaultIsotope": 139,
    "isotopes": [
      {
        "massNumber": 139,
        "name": "Lantán-139 (¹³⁹La)",
        "abundance": "99.911%",
        "stable": true
      },
      {
        "massNumber": 138,
        "name": "Lantán-138 (¹³⁸La)",
        "abundance": "0.089% (t½ = 102 Gy)",
        "stable": false
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      18,
      18,
      9,
      2
    ],
    "electronConfiguration": "[Xe] 5d¹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 5d¹ 6s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.1,
    "meltingPointK": 1193.0,
    "boilingPointK": 3737.0,
    "isRadioactive": false,
    "discoveryYear": "1839",
    "summary": "Lantán dáva meno skupine lantanoidov, má základnú konfiguráciu [Xe] 5d¹ 6s² a používa sa vo vysokokvalitných optických sklách objektívov, katalyzátoroch a batériách."
  },
  {
    "atomicNumber": 58,
    "symbol": "Ce",
    "name": "Cér",
    "latinName": "Cerium",
    "englishName": "Cerium",
    "atomicMass": 140.116,
    "atomicMassDisplay": "140.116 u",
    "isMassBracketed": false,
    "defaultIsotope": 140,
    "isotopes": [
      {
        "massNumber": 140,
        "name": "Cér-140 (¹⁴⁰Ce)",
        "abundance": "88.450%",
        "stable": true
      },
      {
        "massNumber": 142,
        "name": "Cér-142 (¹⁴²Ce)",
        "abundance": "11.114%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      18,
      19,
      9,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹ 5d¹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹ 5s² 5p⁶ 5d¹ 6s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.12,
    "meltingPointK": 1068.0,
    "boilingPointK": 3716.0,
    "isRadioactive": false,
    "discoveryYear": "1803",
    "summary": "Cér je najrozšírenejší prvok spomedzi lantanoidov. Oxid ceričitý (CeO₂) sa používa na presné leštenie optických skiel, v katalyzátoroch a v kresadlových zliatinách."
  },
  {
    "atomicNumber": 59,
    "symbol": "Pr",
    "name": "Prazeodým",
    "latinName": "Praseodymium",
    "englishName": "Praseodymium",
    "atomicMass": 140.90766,
    "atomicMassDisplay": "140.90766 u",
    "isMassBracketed": false,
    "defaultIsotope": 141,
    "isotopes": [
      {
        "massNumber": 141,
        "name": "Prazeodým-141 (¹⁴¹Pr)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      18,
      21,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f³ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f³ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.13,
    "meltingPointK": 1208.0,
    "boilingPointK": 3403.0,
    "isRadioactive": false,
    "discoveryYear": "1885",
    "summary": "Prazeodým je mäkký striebristý lantanoid používaný v silných permanentných magnetoch, leteckých zliatinách a na farbenie ochranných zváračských skiel."
  },
  {
    "atomicNumber": 60,
    "symbol": "Nd",
    "name": "Neodým",
    "latinName": "Neodymium",
    "englishName": "Neodymium",
    "atomicMass": 144.242,
    "atomicMassDisplay": "144.242 u",
    "isMassBracketed": false,
    "defaultIsotope": 142,
    "isotopes": [
      {
        "massNumber": 142,
        "name": "Neodým-142 (¹⁴²Nd)",
        "abundance": "27.2%",
        "stable": true
      },
      {
        "massNumber": 144,
        "name": "Neodým-144 (¹⁴⁴Nd)",
        "abundance": "23.8% (t½ = 2.29×10¹⁵ y)",
        "stable": false
      },
      {
        "massNumber": 146,
        "name": "Neodým-146 (¹⁴⁶Nd)",
        "abundance": "17.2%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      18,
      22,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁴ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁴ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.14,
    "meltingPointK": 1297.0,
    "boilingPointK": 3347.0,
    "isRadioactive": false,
    "discoveryYear": "1885",
    "summary": "Neodým tvorí základ najsilnejších známych permanentných magnetov (Nd₂Fe₁₄B), ktoré sú nevyhnutné pre elektromotory, veterné turbíny, reproduktory a lasery Nd:YAG."
  },
  {
    "atomicNumber": 61,
    "symbol": "Pm",
    "name": "Prométium",
    "latinName": "Promethium",
    "englishName": "Promethium",
    "atomicMass": 145,
    "atomicMassDisplay": "[145] u",
    "isMassBracketed": true,
    "defaultIsotope": 145,
    "isotopes": [
      {
        "massNumber": 145,
        "name": "Prométium-145 (¹⁴⁵Pm)",
        "abundance": "Syntetický (t½ = 17.7 y)",
        "stable": false
      },
      {
        "massNumber": 147,
        "name": "Prométium-147 (¹⁴⁷Pm)",
        "abundance": "Syntetický (t½ = 2.62 y)",
        "stable": false
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      18,
      23,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁵ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁵ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.13,
    "meltingPointK": 1315.0,
    "boilingPointK": 3273.0,
    "isRadioactive": true,
    "discoveryYear": "1945",
    "summary": "Prométium je jediný lantanoid bez stabilných izotopov. Beta-žiarič ¹⁴⁷Pm sa využíva v miniatúrnych rádionuklidových batériách a špeciálnych meracích prístrojoch."
  },
  {
    "atomicNumber": 62,
    "symbol": "Sm",
    "name": "Samárium",
    "latinName": "Samarium",
    "englishName": "Samarium",
    "atomicMass": 150.36,
    "atomicMassDisplay": "150.36 u",
    "isMassBracketed": false,
    "defaultIsotope": 152,
    "isotopes": [
      {
        "massNumber": 152,
        "name": "Samárium-152 (¹⁵²Sm)",
        "abundance": "26.75%",
        "stable": true
      },
      {
        "massNumber": 154,
        "name": "Samárium-154 (¹⁵⁴Sm)",
        "abundance": "22.75%",
        "stable": true
      },
      {
        "massNumber": 147,
        "name": "Samárium-147 (¹⁴⁷Sm)",
        "abundance": "14.99% (t½ = 106 Gy)",
        "stable": false
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      18,
      24,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁶ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁶ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.17,
    "meltingPointK": 1345.0,
    "boilingPointK": 2173.0,
    "isRadioactive": false,
    "discoveryYear": "1879",
    "summary": "Samárium je lantanoid, ktorý s kobaltom tvorí permanentné magnety (SmCo₅) odolné voči demagnetizácii aj pri veľmi vysokých teplotách."
  },
  {
    "atomicNumber": 63,
    "symbol": "Eu",
    "name": "Európium",
    "latinName": "Europium",
    "englishName": "Europium",
    "atomicMass": 151.964,
    "atomicMassDisplay": "151.964 u",
    "isMassBracketed": false,
    "defaultIsotope": 153,
    "isotopes": [
      {
        "massNumber": 153,
        "name": "Európium-153 (¹⁵³Eu)",
        "abundance": "52.19%",
        "stable": true
      },
      {
        "massNumber": 151,
        "name": "Európium-151 (¹⁵¹Eu)",
        "abundance": "47.81%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      18,
      25,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁷ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.2,
    "meltingPointK": 1099.0,
    "boilingPointK": 1802.0,
    "isRadioactive": false,
    "discoveryYear": "1901",
    "summary": "Európium je najreaktívnejší lantanoid s polozaplnenou podvrstvou 4f⁷; jeho zlúčeniny slúžia ako červené a modré luminofory v obrazovkách a ochranných prvkoch eurobankoviek."
  },
  {
    "atomicNumber": 64,
    "symbol": "Gd",
    "name": "Gadolínium",
    "latinName": "Gadolinium",
    "englishName": "Gadolinium",
    "atomicMass": 157.25,
    "atomicMassDisplay": "157.25 u",
    "isMassBracketed": false,
    "defaultIsotope": 158,
    "isotopes": [
      {
        "massNumber": 158,
        "name": "Gadolínium-158 (¹⁵⁸Gd)",
        "abundance": "24.84%",
        "stable": true
      },
      {
        "massNumber": 160,
        "name": "Gadolínium-160 (¹⁶⁰Gd)",
        "abundance": "21.86%",
        "stable": true
      },
      {
        "massNumber": 156,
        "name": "Gadolínium-156 (¹⁵⁶Gd)",
        "abundance": "20.47%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      25,
      9,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁷ 5d¹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 5d¹ 6s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.2,
    "meltingPointK": 1585.0,
    "boilingPointK": 3546.0,
    "isRadioactive": false,
    "discoveryYear": "1880",
    "summary": "Gadolínium má konfiguráciu [Xe] 4f⁷ 5d¹ 6s², výrazné paramagnetické vlastnosti využívané v kontrastných látkach pre MRI a vysokú schopnosť pohlcovať tepelné neutróny."
  },
  {
    "atomicNumber": 65,
    "symbol": "Tb",
    "name": "Terbium",
    "latinName": "Terbium",
    "englishName": "Terbium",
    "atomicMass": 158.92535,
    "atomicMassDisplay": "158.92535 u",
    "isMassBracketed": false,
    "defaultIsotope": 159,
    "isotopes": [
      {
        "massNumber": 159,
        "name": "Terbium-159 (¹⁵⁹Tb)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      27,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f⁹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁹ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.2,
    "meltingPointK": 1629.0,
    "boilingPointK": 3396.0,
    "isRadioactive": false,
    "discoveryYear": "1843",
    "summary": "Terbium je striebrobiely lantanoid používaný v zelených luminoforoch displejov a v magnetostrikčnej zliatine Terfenol-D pre sonarové a akustické meniče."
  },
  {
    "atomicNumber": 66,
    "symbol": "Dy",
    "name": "Dysprózium",
    "latinName": "Dysprosium",
    "englishName": "Dysprosium",
    "atomicMass": 162.5,
    "atomicMassDisplay": "162.5 u",
    "isMassBracketed": false,
    "defaultIsotope": 164,
    "isotopes": [
      {
        "massNumber": 164,
        "name": "Dysprózium-164 (¹⁶⁴Dy)",
        "abundance": "28.26%",
        "stable": true
      },
      {
        "massNumber": 162,
        "name": "Dysprózium-162 (¹⁶²Dy)",
        "abundance": "25.475%",
        "stable": true
      },
      {
        "massNumber": 163,
        "name": "Dysprózium-163 (¹⁶³Dy)",
        "abundance": "24.896%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      28,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁰ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁰ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.22,
    "meltingPointK": 1680.0,
    "boilingPointK": 2840.0,
    "isRadioactive": false,
    "discoveryYear": "1886",
    "summary": "Dysprózium patrí medzi prvky s najsilnejším magnetickým momentom a pridáva sa do neodýmových magnetov v elektromobiloch na zvýšenie ich tepelnej odolnosti."
  },
  {
    "atomicNumber": 67,
    "symbol": "Ho",
    "name": "Holmium",
    "latinName": "Holmium",
    "englishName": "Holmium",
    "atomicMass": 164.93033,
    "atomicMassDisplay": "164.93033 u",
    "isMassBracketed": false,
    "defaultIsotope": 165,
    "isotopes": [
      {
        "massNumber": 165,
        "name": "Holmium-165 (¹⁶⁵Ho)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      29,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹¹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹¹ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.23,
    "meltingPointK": 1734.0,
    "boilingPointK": 2873.0,
    "isRadioactive": false,
    "discoveryYear": "1878",
    "summary": "Holmium má najvyšší magnetický moment spomedzi všetkých prírodných prvkov. Používa sa v pólových nástavcoch silných magnetov a v chirurgických laseroch Ho:YAG."
  },
  {
    "atomicNumber": 68,
    "symbol": "Er",
    "name": "Erbium",
    "latinName": "Erbium",
    "englishName": "Erbium",
    "atomicMass": 167.259,
    "atomicMassDisplay": "167.259 u",
    "isMassBracketed": false,
    "defaultIsotope": 166,
    "isotopes": [
      {
        "massNumber": 166,
        "name": "Erbium-166 (¹⁶⁶Er)",
        "abundance": "33.503%",
        "stable": true
      },
      {
        "massNumber": 168,
        "name": "Erbium-168 (¹⁶⁸Er)",
        "abundance": "26.978%",
        "stable": true
      },
      {
        "massNumber": 167,
        "name": "Erbium-167 (¹⁶⁷Er)",
        "abundance": "22.869%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      30,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹² 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹² 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.24,
    "meltingPointK": 1802.0,
    "boilingPointK": 3141.0,
    "isRadioactive": false,
    "discoveryYear": "1843",
    "summary": "Erbium je lantanoid, ktorého ružové ióny Er³⁺ zosilňujú svetelné signály s vlnovou dĺžkou 1550 nm v optických vláknových zosilňovačoch (EDFA) internetových sietí."
  },
  {
    "atomicNumber": 69,
    "symbol": "Tm",
    "name": "Túlium",
    "latinName": "Thulium",
    "englishName": "Thulium",
    "atomicMass": 168.93422,
    "atomicMassDisplay": "168.93422 u",
    "isMassBracketed": false,
    "defaultIsotope": 169,
    "isotopes": [
      {
        "massNumber": 169,
        "name": "Túlium-169 (¹⁶⁹Tm)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      31,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹³ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹³ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.25,
    "meltingPointK": 1818.0,
    "boilingPointK": 2223.0,
    "isRadioactive": false,
    "discoveryYear": "1879",
    "summary": "Túlium je jeden z najvzácnejších lantanoidov v zemskej kôre, využívaný v prenosných röntgenových žiaričoch (¹⁷⁰Tm) a v infračervených medicínskych laseroch."
  },
  {
    "atomicNumber": 70,
    "symbol": "Yb",
    "name": "Yterbium",
    "latinName": "Ytterbium",
    "englishName": "Ytterbium",
    "atomicMass": 173.045,
    "atomicMassDisplay": "173.045 u",
    "isMassBracketed": false,
    "defaultIsotope": 174,
    "isotopes": [
      {
        "massNumber": 174,
        "name": "Yterbium-174 (¹⁷⁴Yb)",
        "abundance": "32.026%",
        "stable": true
      },
      {
        "massNumber": 172,
        "name": "Yterbium-172 (¹⁷²Yb)",
        "abundance": "21.68%",
        "stable": true
      },
      {
        "massNumber": 173,
        "name": "Yterbium-173 (¹⁷³Yb)",
        "abundance": "16.103%",
        "stable": true
      }
    ],
    "category": "lanthanide",
    "group": null,
    "period": 6,
    "block": "f",
    "gridRow": 9,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      32,
      8,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.1,
    "meltingPointK": 1097.0,
    "boilingPointK": 1469.0,
    "isRadioactive": false,
    "discoveryYear": "1878",
    "summary": "Yterbium má úplne zaplnenú podvrstvu 4f¹⁴ a využíva sa v najpresnejších optických atómových hodinách sveta a vo výkonných priemyselných vláknových laseroch."
  },
  {
    "atomicNumber": 71,
    "symbol": "Lu",
    "name": "Lutécium",
    "latinName": "Lutetium",
    "englishName": "Lutetium",
    "atomicMass": 174.9668,
    "atomicMassDisplay": "174.9668 u",
    "isMassBracketed": false,
    "defaultIsotope": 175,
    "isotopes": [
      {
        "massNumber": 175,
        "name": "Lutécium-175 (¹⁷⁵Lu)",
        "abundance": "97.401%",
        "stable": true
      },
      {
        "massNumber": 176,
        "name": "Lutécium-176 (¹⁷⁶Lu)",
        "abundance": "2.599% (t½ = 37.6 Gy)",
        "stable": false
      }
    ],
    "category": "lanthanide",
    "group": 3,
    "period": 6,
    "block": "d",
    "gridRow": 9,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      32,
      9,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.27,
    "meltingPointK": 1925.0,
    "boilingPointK": 3675.0,
    "isRadioactive": false,
    "discoveryYear": "1907",
    "summary": "Lutécium je najťažší a najtvrdší lantanoid. Používa sa v detektoroch pozitrónovej emisnej tomografie (PET) a v cielenej rádionuklidovej liečbe nádorov (¹⁷⁷Lu)."
  },
  {
    "atomicNumber": 72,
    "symbol": "Hf",
    "name": "Hafnium",
    "latinName": "Hafnium",
    "englishName": "Hafnium",
    "atomicMass": 178.49,
    "atomicMassDisplay": "178.49 u",
    "isMassBracketed": false,
    "defaultIsotope": 180,
    "isotopes": [
      {
        "massNumber": 180,
        "name": "Hafnium-180 (¹⁸⁰Hf)",
        "abundance": "35.08%",
        "stable": true
      },
      {
        "massNumber": 178,
        "name": "Hafnium-178 (¹⁷⁸Hf)",
        "abundance": "27.28%",
        "stable": true
      },
      {
        "massNumber": 177,
        "name": "Hafnium-177 (¹⁷⁷Hf)",
        "abundance": "18.60%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 4,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      18,
      32,
      10,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d² 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d² 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 2506.0,
    "boilingPointK": 4876.0,
    "isRadioactive": false,
    "discoveryYear": "1923",
    "summary": "Hafnium je chemicky veľmi podobné zirkóniu; oxid hafničitý (HfO₂) slúži ako kľúčový dielektrický izolant hradiel v moderných nanometrových mikroprocesoroch."
  },
  {
    "atomicNumber": 73,
    "symbol": "Ta",
    "name": "Tantal",
    "latinName": "Tantalum",
    "englishName": "Tantalum",
    "atomicMass": 180.94788,
    "atomicMassDisplay": "180.94788 u",
    "isMassBracketed": false,
    "defaultIsotope": 181,
    "isotopes": [
      {
        "massNumber": 181,
        "name": "Tantal-181 (¹⁸¹Ta)",
        "abundance": "99.988%",
        "stable": true
      },
      {
        "massNumber": 180,
        "name": "Tantal-180 (¹⁸⁰Ta)",
        "abundance": "0.012%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 5,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      18,
      32,
      11,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d³ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d³ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.5,
    "meltingPointK": 3290.0,
    "boilingPointK": 5731.0,
    "isRadioactive": false,
    "discoveryYear": "1802",
    "summary": "Tantal je mimoriadne koróziivzdorný a biokompatibilný žiarupevný kov, využívaný v miniatúrnych tantalových kondenzátoroch v mobilnej elektronike a v chirurgických implantátoch."
  },
  {
    "atomicNumber": 74,
    "symbol": "W",
    "name": "Volfrám",
    "latinName": "Wolframium",
    "englishName": "Tungsten",
    "atomicMass": 183.84,
    "atomicMassDisplay": "183.84 u",
    "isMassBracketed": false,
    "defaultIsotope": 184,
    "isotopes": [
      {
        "massNumber": 184,
        "name": "Volfrám-184 (¹⁸⁴W)",
        "abundance": "30.64%",
        "stable": true
      },
      {
        "massNumber": 186,
        "name": "Volfrám-186 (¹⁸⁶W)",
        "abundance": "28.43%",
        "stable": true
      },
      {
        "massNumber": 182,
        "name": "Volfrám-182 (¹⁸²W)",
        "abundance": "26.50%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 6,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      18,
      32,
      12,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d⁴ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁴ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.36,
    "meltingPointK": 3695.0,
    "boilingPointK": 6203.0,
    "isRadioactive": false,
    "discoveryYear": "1783",
    "summary": "Volfrám má najvyššiu teplotu topenia (3695 K / 3422 °C) zo všetkých kovov. Používa sa v elektrónkach, TIG zváracích elektródach, röntgenových anódach a tvrdokovoch (WC)."
  },
  {
    "atomicNumber": 75,
    "symbol": "Re",
    "name": "Rénium",
    "latinName": "Rhenium",
    "englishName": "Rhenium",
    "atomicMass": 186.207,
    "atomicMassDisplay": "186.207 u",
    "isMassBracketed": false,
    "defaultIsotope": 187,
    "isotopes": [
      {
        "massNumber": 187,
        "name": "Rénium-187 (¹⁸⁷Re)",
        "abundance": "62.60% (t½ = 41.2 Gy)",
        "stable": false
      },
      {
        "massNumber": 185,
        "name": "Rénium-185 (¹⁸⁵Re)",
        "abundance": "37.40%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 7,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      18,
      32,
      13,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d⁵ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁵ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.9,
    "meltingPointK": 3459.0,
    "boilingPointK": 5869.0,
    "isRadioactive": false,
    "discoveryYear": "1925",
    "summary": "Rénium patrí medzi najvzácnejšie prvky v zemskej kôre s mimoriadne vysokou teplotou topenia, legované do monokryštalických lopatiek prúdových leteckých motorov."
  },
  {
    "atomicNumber": 76,
    "symbol": "Os",
    "name": "Ozmium",
    "latinName": "Osmium",
    "englishName": "Osmium",
    "atomicMass": 190.23,
    "atomicMassDisplay": "190.23 u",
    "isMassBracketed": false,
    "defaultIsotope": 192,
    "isotopes": [
      {
        "massNumber": 192,
        "name": "Ozmium-192 (¹⁹²Os)",
        "abundance": "40.78%",
        "stable": true
      },
      {
        "massNumber": 190,
        "name": "Ozmium-190 (¹⁹⁰Os)",
        "abundance": "26.26%",
        "stable": true
      },
      {
        "massNumber": 189,
        "name": "Ozmium-189 (¹⁸⁹Os)",
        "abundance": "16.15%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 8,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      18,
      32,
      14,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d⁶ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁶ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.2,
    "meltingPointK": 3306.0,
    "boilingPointK": 5285.0,
    "isRadioactive": false,
    "discoveryYear": "1803",
    "summary": "Ozmium je najhustejší prírodný prvok na Zemi (22,59 g/cm³), tvrdý modrastobiely platinový kov používaný v hrotoch plniacich pier, elektrických kontaktoch a mikroskopii."
  },
  {
    "atomicNumber": 77,
    "symbol": "Ir",
    "name": "Irídium",
    "latinName": "Iridium",
    "englishName": "Iridium",
    "atomicMass": 192.217,
    "atomicMassDisplay": "192.217 u",
    "isMassBracketed": false,
    "defaultIsotope": 193,
    "isotopes": [
      {
        "massNumber": 193,
        "name": "Irídium-193 (¹⁹³Ir)",
        "abundance": "62.7%",
        "stable": true
      },
      {
        "massNumber": 191,
        "name": "Irídium-191 (¹⁹¹Ir)",
        "abundance": "37.3%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 9,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      18,
      32,
      15,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d⁷ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁷ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.2,
    "meltingPointK": 2719.0,
    "boilingPointK": 4403.0,
    "isRadioactive": false,
    "discoveryYear": "1803",
    "summary": "Irídium je najodolnejší známy kov voči korózii (nerozpúšťa sa ani v lúčavke kráľovskej); jeho zvýšený výskyt v geologickej vrstve K-Pg potvrdil dopad asteroidu pred 66 miliónmi rokov."
  },
  {
    "atomicNumber": 78,
    "symbol": "Pt",
    "name": "Platina",
    "latinName": "Platinum",
    "englishName": "Platinum",
    "atomicMass": 195.084,
    "atomicMassDisplay": "195.084 u",
    "isMassBracketed": false,
    "defaultIsotope": 195,
    "isotopes": [
      {
        "massNumber": 195,
        "name": "Platina-195 (¹⁹⁵Pt)",
        "abundance": "33.775%",
        "stable": true
      },
      {
        "massNumber": 194,
        "name": "Platina-194 (¹⁹⁴Pt)",
        "abundance": "32.864%",
        "stable": true
      },
      {
        "massNumber": 196,
        "name": "Platina-196 (¹⁹⁶Pt)",
        "abundance": "25.211%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 10,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      18,
      32,
      17,
      1
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁹ 6s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.28,
    "meltingPointK": 2041.4,
    "boilingPointK": 4098.0,
    "isRadioactive": false,
    "discoveryYear": "1735",
    "summary": "Platina je hustý, kujný ušľachtilý kov s konfiguráciou [Xe] 4f¹⁴ 5d⁹ 6s¹, mimoriadne cenený ako katalyzátor v chemickom priemysle, vodíkových palivových článkoch a protinádorových liečivách."
  },
  {
    "atomicNumber": 79,
    "symbol": "Au",
    "name": "Zlato",
    "latinName": "Aurum",
    "englishName": "Gold",
    "atomicMass": 196.96657,
    "atomicMassDisplay": "196.96657 u",
    "isMassBracketed": false,
    "defaultIsotope": 197,
    "isotopes": [
      {
        "massNumber": 197,
        "name": "Zlato-197 (¹⁹⁷Au)",
        "abundance": "100%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 11,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      1
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 2.54,
    "meltingPointK": 1337.33,
    "boilingPointK": 3243.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Zlato je ušľachtilý, kujný prechodný kov, ktorého charakteristickú žltú farbu a odolnosť voči oxidácii spôsobuje relativistická kontrakcia valenčného orbitálu 6s."
  },
  {
    "atomicNumber": 80,
    "symbol": "Hg",
    "name": "Ortuť",
    "latinName": "Hydrargyrum",
    "englishName": "Mercury",
    "atomicMass": 200.592,
    "atomicMassDisplay": "200.592 u",
    "isMassBracketed": false,
    "defaultIsotope": 202,
    "isotopes": [
      {
        "massNumber": 202,
        "name": "Ortuť-202 (²⁰²Hg)",
        "abundance": "29.86%",
        "stable": true
      },
      {
        "massNumber": 200,
        "name": "Ortuť-200 (²⁰⁰Hg)",
        "abundance": "23.10%",
        "stable": true
      },
      {
        "massNumber": 199,
        "name": "Ortuť-199 (¹⁹⁹Hg)",
        "abundance": "16.87%",
        "stable": true
      }
    ],
    "category": "transition-metal",
    "group": 12,
    "period": 6,
    "block": "d",
    "gridRow": 6,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      2
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s²",
    "isConfigurationException": false,
    "stateAtSTP": "liquid",
    "electronegativity": 2.0,
    "meltingPointK": 234.321,
    "boilingPointK": 629.88,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Ortuť je jediný kov, ktorý je pri štandardnej teplote a tlaku kvapalný, čo je dôsledkom relativistickej stabilizácie plne obsadeného orbitálu 6s² oslabujúcej kovovú väzbu."
  },
  {
    "atomicNumber": 81,
    "symbol": "Tl",
    "name": "Tálium",
    "latinName": "Thallium",
    "englishName": "Thallium",
    "atomicMass": 204.38,
    "atomicMassDisplay": "204.38 u",
    "isMassBracketed": false,
    "defaultIsotope": 205,
    "isotopes": [
      {
        "massNumber": 205,
        "name": "Tálium-205 (²⁰⁵Tl)",
        "abundance": "70.48%",
        "stable": true
      },
      {
        "massNumber": 203,
        "name": "Tálium-203 (²⁰³Tl)",
        "abundance": "29.52%",
        "stable": true
      }
    ],
    "category": "post-transition-metal",
    "group": 13,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      3
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.62,
    "meltingPointK": 577.0,
    "boilingPointK": 1746.0,
    "isRadioactive": false,
    "discoveryYear": "1861",
    "summary": "Tálium je mäkký kov p-bloku s výrazným efektom inertného elektrónového páru, využívaný v špecializovanej infračervenej optike a scintilačných detektoroch gama žiarenia."
  },
  {
    "atomicNumber": 82,
    "symbol": "Pb",
    "name": "Olovo",
    "latinName": "Plumbum",
    "englishName": "Lead",
    "atomicMass": 207.2,
    "atomicMassDisplay": "207.2 u",
    "isMassBracketed": false,
    "defaultIsotope": 208,
    "isotopes": [
      {
        "massNumber": 208,
        "name": "Olovo-208 (²⁰⁸Pb)",
        "abundance": "52.4%",
        "stable": true
      },
      {
        "massNumber": 206,
        "name": "Olovo-206 (²⁰⁶Pb)",
        "abundance": "24.1%",
        "stable": true
      },
      {
        "massNumber": 207,
        "name": "Olovo-207 (²⁰⁷Pb)",
        "abundance": "22.1%",
        "stable": true
      }
    ],
    "category": "post-transition-metal",
    "group": 14,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      4
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.87,
    "meltingPointK": 600.61,
    "boilingPointK": 2022.0,
    "isRadioactive": false,
    "discoveryYear": "Starovek",
    "summary": "Olovo je najťažší prvok so stabilnými izotopmi (izotop ²⁰⁸Pb je dvojito magické jadro so Z=82 a N=126), používaný v akumulátoroch a na tienenie ionizujúceho žiarenia."
  },
  {
    "atomicNumber": 83,
    "symbol": "Bi",
    "name": "Bizmut",
    "latinName": "Bismutum",
    "englishName": "Bismuth",
    "atomicMass": 208.9804,
    "atomicMassDisplay": "208.9804 u",
    "isMassBracketed": false,
    "defaultIsotope": 209,
    "isotopes": [
      {
        "massNumber": 209,
        "name": "Bizmut-209 (²⁰⁹Bi)",
        "abundance": "100% (t½ = 2.01×10¹⁹ y)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 15,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      5
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p³",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.02,
    "meltingPointK": 544.7,
    "boilingPointK": 1837.0,
    "isRadioactive": true,
    "discoveryYear": "1753",
    "summary": "Bizmut je krehký kryštalický kov p-bloku s najsilnejším diamagnetizmom spomedzi kovov; jeho prírodný izotop ²⁰⁹Bi má polčas rozpadu viac než miliardukrát dlhší ako vek vesmíru."
  },
  {
    "atomicNumber": 84,
    "symbol": "Po",
    "name": "Polónium",
    "latinName": "Polonium",
    "englishName": "Polonium",
    "atomicMass": 209,
    "atomicMassDisplay": "[209] u",
    "isMassBracketed": true,
    "defaultIsotope": 209,
    "isotopes": [
      {
        "massNumber": 209,
        "name": "Polónium-209 (²⁰⁹Po)",
        "abundance": "Syntetický (t½ = 125.2 y)",
        "stable": false
      },
      {
        "massNumber": 210,
        "name": "Polónium-210 (²¹⁰Po)",
        "abundance": "Prírodné stopy (t½ = 138.38 d)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 16,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      6
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.0,
    "meltingPointK": 527.0,
    "boilingPointK": 1235.0,
    "isRadioactive": true,
    "discoveryYear": "1898",
    "summary": "Polónium je vzácny, silne rádioaktívny prvok objavený Mariou a Pierrom Curieovcami v smolinci, kryštalizujúci v jednoduchej kubickej mriežke."
  },
  {
    "atomicNumber": 85,
    "symbol": "At",
    "name": "Astát",
    "latinName": "Astatium",
    "englishName": "Astatine",
    "atomicMass": 210,
    "atomicMassDisplay": "[210] u",
    "isMassBracketed": true,
    "defaultIsotope": 210,
    "isotopes": [
      {
        "massNumber": 210,
        "name": "Astát-210 (²¹⁰At)",
        "abundance": "Syntetický (t½ = 8.1 h)",
        "stable": false
      },
      {
        "massNumber": 211,
        "name": "Astát-211 (²¹¹At)",
        "abundance": "Syntetický (t½ = 7.21 h)",
        "stable": false
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      7
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 2.2,
    "meltingPointK": 575.0,
    "boilingPointK": 610.0,
    "isRadioactive": true,
    "discoveryYear": "1940",
    "summary": "Astát je najvzácnejší prirodzene sa vyskytujúci prvok v zemskej kôre; jeho izotop ²¹¹At sa skúma v cielenej alfa-rádioterapii v onkológii."
  },
  {
    "atomicNumber": 86,
    "symbol": "Rn",
    "name": "Radón",
    "latinName": "Radon",
    "englishName": "Radon",
    "atomicMass": 222,
    "atomicMassDisplay": "[222] u",
    "isMassBracketed": true,
    "defaultIsotope": 222,
    "isotopes": [
      {
        "massNumber": 222,
        "name": "Radón-222 (²²²Rn)",
        "abundance": "Produkt rozpadu (t½ = 3.82 d)",
        "stable": false
      },
      {
        "massNumber": 220,
        "name": "Radón-220 (²²⁰Rn)",
        "abundance": "Produkt rozpadu (t½ = 55.6 s)",
        "stable": false
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 6,
    "block": "p",
    "gridRow": 6,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8
    ],
    "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "gas",
    "electronegativity": 2.2,
    "meltingPointK": 202.0,
    "boilingPointK": 211.5,
    "isRadioactive": true,
    "discoveryYear": "1900",
    "summary": "Radón je ťažký, bezfarebný rádioaktívny vzácny plyn, ktorý vzniká v horninách ako medziprodukt v prirodzených rozpadových radoch uránu a tória."
  },
  {
    "atomicNumber": 87,
    "symbol": "Fr",
    "name": "Francium",
    "latinName": "Francium",
    "englishName": "Francium",
    "atomicMass": 223,
    "atomicMassDisplay": "[223] u",
    "isMassBracketed": true,
    "defaultIsotope": 223,
    "isotopes": [
      {
        "massNumber": 223,
        "name": "Francium-223 (²²³Fr)",
        "abundance": "Prírodné stopy (t½ = 22.0 m)",
        "stable": false
      },
      {
        "massNumber": 221,
        "name": "Francium-221 (²²¹Fr)",
        "abundance": "Produkt rozpadu (t½ = 4.8 m)",
        "stable": false
      }
    ],
    "category": "alkali-metal",
    "group": 1,
    "period": 7,
    "block": "s",
    "gridRow": 7,
    "gridColumn": 1,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      1
    ],
    "electronConfiguration": "[Rn] 7s¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s¹",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.79,
    "meltingPointK": 300.0,
    "boilingPointK": 950.0,
    "isRadioactive": true,
    "discoveryYear": "1939",
    "summary": "Francium je extrémne nestabilný alkalický kov s maximálnym polčasom rozpadu iba 22 minút (²²³Fr), skúmaný pomocou laserových pascí v atómovej fyzike."
  },
  {
    "atomicNumber": 88,
    "symbol": "Ra",
    "name": "Rádium",
    "latinName": "Radium",
    "englishName": "Radium",
    "atomicMass": 226,
    "atomicMassDisplay": "[226] u",
    "isMassBracketed": true,
    "defaultIsotope": 226,
    "isotopes": [
      {
        "massNumber": 226,
        "name": "Rádium-226 (²²⁶Ra)",
        "abundance": "Produkt rozpadu (t½ = 1,600 y)",
        "stable": false
      },
      {
        "massNumber": 228,
        "name": "Rádium-228 (²²⁸Ra)",
        "abundance": "Produkt rozpadu (t½ = 5.75 y)",
        "stable": false
      }
    ],
    "category": "alkaline-earth-metal",
    "group": 2,
    "period": 7,
    "block": "s",
    "gridRow": 7,
    "gridColumn": 2,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 0.9,
    "meltingPointK": 973.0,
    "boilingPointK": 2010.0,
    "isRadioactive": true,
    "discoveryYear": "1898",
    "summary": "Rádium je striebrobiely rádioaktívny kov alkalických zemín izolovaný manželmi Curieovcami; dnes sa izotop ²²³Ra využíva v cielenej liečbe kostných metastáz."
  },
  {
    "atomicNumber": 89,
    "symbol": "Ac",
    "name": "Aktínium",
    "latinName": "Actinium",
    "englishName": "Actinium",
    "atomicMass": 227,
    "atomicMassDisplay": "[227] u",
    "isMassBracketed": true,
    "defaultIsotope": 227,
    "isotopes": [
      {
        "massNumber": 227,
        "name": "Aktínium-227 (²²⁷Ac)",
        "abundance": "Prírodné stopy (t½ = 21.77 y)",
        "stable": false
      },
      {
        "massNumber": 225,
        "name": "Aktínium-225 (²²⁵Ac)",
        "abundance": "Syntetický (t½ = 9.92 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      9,
      2
    ],
    "electronConfiguration": "[Rn] 6d¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d¹ 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.1,
    "meltingPointK": 1323.0,
    "boilingPointK": 3471.0,
    "isRadioactive": true,
    "discoveryYear": "1899",
    "summary": "Aktínium dáva názov skupine aktinoidov; pre silnú rádioaktivitu ionizuje okolitý vzduch a v tme svetielkuje bledomodrým svetlom."
  },
  {
    "atomicNumber": 90,
    "symbol": "Th",
    "name": "Tórium",
    "latinName": "Thorium",
    "englishName": "Thorium",
    "atomicMass": 232.0377,
    "atomicMassDisplay": "232.0377 u",
    "isMassBracketed": false,
    "defaultIsotope": 232,
    "isotopes": [
      {
        "massNumber": 232,
        "name": "Tórium-232 (²³²Th)",
        "abundance": "99.98% (t½ = 14.05 Gy)",
        "stable": false
      },
      {
        "massNumber": 230,
        "name": "Tórium-230 (²³⁰Th)",
        "abundance": "0.02% (t½ = 75.4 ky)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      18,
      32,
      18,
      10,
      2
    ],
    "electronConfiguration": "[Rn] 6d² 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d² 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 2023.0,
    "boilingPointK": 5061.0,
    "isRadioactive": true,
    "discoveryYear": "1829",
    "summary": "Tórium je slabo rádioaktívny prírodný aktinoid s konfiguráciou [Rn] 6d² 7s², v zemskej kôre približne trikrát rozšírenejší než urán a skúmaný ako palivo pre jadrové reaktory."
  },
  {
    "atomicNumber": 91,
    "symbol": "Pa",
    "name": "Protaktínium",
    "latinName": "Protactinium",
    "englishName": "Protactinium",
    "atomicMass": 231.03588,
    "atomicMassDisplay": "231.03588 u",
    "isMassBracketed": false,
    "defaultIsotope": 231,
    "isotopes": [
      {
        "massNumber": 231,
        "name": "Protaktínium-231 (²³¹Pa)",
        "abundance": "100 % stopy (t½ = 32.76 ky)",
        "stable": false
      },
      {
        "massNumber": 233,
        "name": "Protaktínium-233 (²³³Pa)",
        "abundance": "Syntetický (t½ = 26.98 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      18,
      32,
      20,
      9,
      2
    ],
    "electronConfiguration": "[Rn] 5f² 6d¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f² 6s² 6p⁶ 6d¹ 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.5,
    "meltingPointK": 1841.0,
    "boilingPointK": 4300.0,
    "isRadioactive": true,
    "discoveryYear": "1913",
    "summary": "Protaktínium je hustý, vzácny rádioaktívny aktinoid s konfiguráciou [Rn] 5f² 6d¹ 7s², využívaný v geochronológii na datovanie morských sedimentov."
  },
  {
    "atomicNumber": 92,
    "symbol": "U",
    "name": "Urán",
    "latinName": "Uranium",
    "englishName": "Uranium",
    "atomicMass": 238.02891,
    "atomicMassDisplay": "238.02891 u",
    "isMassBracketed": false,
    "defaultIsotope": 238,
    "isotopes": [
      {
        "massNumber": 238,
        "name": "Urán-238 (²³⁸U)",
        "abundance": "99.274% (t½ = 4.468 Gy)",
        "stable": false
      },
      {
        "massNumber": 235,
        "name": "Urán-235 (²³⁵U)",
        "abundance": "0.720% (t½ = 703.8 My)",
        "stable": false
      },
      {
        "massNumber": 234,
        "name": "Urán-234 (²³⁴U)",
        "abundance": "0.005% (t½ = 245.5 ky)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      18,
      32,
      21,
      9,
      2
    ],
    "electronConfiguration": "[Rn] 5f³ 6d¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f³ 6s² 6p⁶ 6d¹ 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.38,
    "meltingPointK": 1405.3,
    "boilingPointK": 4404.0,
    "isRadioactive": true,
    "discoveryYear": "1789",
    "summary": "Urán je ťažký prírodný aktinoid, ktorého štiepny izotop ²³⁵U zabezpečuje reťazovú štiepnu reakciu v jadrových elektrárňach, kým rozpad ²³⁸U prispieva k teplu zemského vnútra."
  },
  {
    "atomicNumber": 93,
    "symbol": "Np",
    "name": "Neptúnium",
    "latinName": "Neptunium",
    "englishName": "Neptunium",
    "atomicMass": 237,
    "atomicMassDisplay": "[237] u",
    "isMassBracketed": true,
    "defaultIsotope": 237,
    "isotopes": [
      {
        "massNumber": 237,
        "name": "Neptúnium-237 (²³⁷Np)",
        "abundance": "Syntetický (t½ = 2.144 My)",
        "stable": false
      },
      {
        "massNumber": 239,
        "name": "Neptúnium-239 (²³⁹Np)",
        "abundance": "Syntetický (t½ = 2.356 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      18,
      32,
      22,
      9,
      2
    ],
    "electronConfiguration": "[Rn] 5f⁴ 6d¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁴ 6s² 6p⁶ 6d¹ 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.36,
    "meltingPointK": 917.0,
    "boilingPointK": 4273.0,
    "isRadioactive": true,
    "discoveryYear": "1940",
    "summary": "Neptúnium je prvý transuránový syntetický aktinoid, vykazuje oxidačné stupne od +3 až po +7 a slúži ako prekurzor na výrobu plutónia-238 pre kozmické zdroje energie."
  },
  {
    "atomicNumber": 94,
    "symbol": "Pu",
    "name": "Plutónium",
    "latinName": "Plutonium",
    "englishName": "Plutonium",
    "atomicMass": 244,
    "atomicMassDisplay": "[244] u",
    "isMassBracketed": true,
    "defaultIsotope": 244,
    "isotopes": [
      {
        "massNumber": 244,
        "name": "Plutónium-244 (²⁴⁴Pu)",
        "abundance": "Najdlhšie žijúci (t½ = 80.0 My)",
        "stable": false
      },
      {
        "massNumber": 239,
        "name": "Plutónium-239 (²³⁹Pu)",
        "abundance": "Syntetický (t½ = 24.11 ky)",
        "stable": false
      },
      {
        "massNumber": 238,
        "name": "Plutónium-238 (²³⁸Pu)",
        "abundance": "Syntetický (t½ = 87.7 y)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      18,
      32,
      24,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f⁶ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁶ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.28,
    "meltingPointK": 912.5,
    "boilingPointK": 3501.0,
    "isRadioactive": true,
    "discoveryYear": "1940",
    "summary": "Plutónium je transuránový aktinoid so šiestimi alotropickými modifikáciami; izotop ²³⁹Pu je štiepnym jadrovým palivom a ²³⁸Pu poháňa rádioizotopové generátory (RTG) vesmírnych sond."
  },
  {
    "atomicNumber": 95,
    "symbol": "Am",
    "name": "Amerícium",
    "latinName": "Americium",
    "englishName": "Americium",
    "atomicMass": 243,
    "atomicMassDisplay": "[243] u",
    "isMassBracketed": true,
    "defaultIsotope": 243,
    "isotopes": [
      {
        "massNumber": 243,
        "name": "Amerícium-243 (²⁴³Am)",
        "abundance": "Syntetický (t½ = 7,370 y)",
        "stable": false
      },
      {
        "massNumber": 241,
        "name": "Amerícium-241 (²⁴¹Am)",
        "abundance": "Syntetický (t½ = 432.2 y)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      18,
      32,
      25,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f⁷ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1449.0,
    "boilingPointK": 2880.0,
    "isRadioactive": true,
    "discoveryYear": "1944",
    "summary": "Amerícium je syntetický transuránový aktinoid; mikrogramové množstvá alfa-žiariča ²⁴¹AmO₂ sa bežne používajú v domácich ionizačných hlásičoch dymu."
  },
  {
    "atomicNumber": 96,
    "symbol": "Cm",
    "name": "Curium",
    "latinName": "Curium",
    "englishName": "Curium",
    "atomicMass": 247,
    "atomicMassDisplay": "[247] u",
    "isMassBracketed": true,
    "defaultIsotope": 247,
    "isotopes": [
      {
        "massNumber": 247,
        "name": "Curium-247 (²⁴⁷Cm)",
        "abundance": "Syntetický (t½ = 15.6 My)",
        "stable": false
      },
      {
        "massNumber": 244,
        "name": "Curium-244 (²⁴⁴Cm)",
        "abundance": "Syntetický (t½ = 18.1 y)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      32,
      25,
      9,
      2
    ],
    "electronConfiguration": "[Rn] 5f⁷ 6d¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 6d¹ 7s²",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1613.0,
    "boilingPointK": 3383.0,
    "isRadioactive": true,
    "discoveryYear": "1944",
    "summary": "Curium je tvrdý rádioaktívny aktinoid pomenovaný na počesť Marie a Pierra Curieovcov, používaný ako zdroj alfa častíc v röntgenových spektrometroch planetárnych vozidiel na Marse."
  },
  {
    "atomicNumber": 97,
    "symbol": "Bk",
    "name": "Berkélium",
    "latinName": "Berkelium",
    "englishName": "Berkelium",
    "atomicMass": 247,
    "atomicMassDisplay": "[247] u",
    "isMassBracketed": true,
    "defaultIsotope": 247,
    "isotopes": [
      {
        "massNumber": 247,
        "name": "Berkélium-247 (²⁴⁷Bk)",
        "abundance": "Syntetický (t½ = 1,380 y)",
        "stable": false
      },
      {
        "massNumber": 249,
        "name": "Berkélium-249 (²⁴⁹Bk)",
        "abundance": "Syntetický (t½ = 330 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      32,
      27,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f⁹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁹ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1259.0,
    "boilingPointK": 2900.0,
    "isRadioactive": true,
    "discoveryYear": "1949",
    "summary": "Berkélium je syntetický transuránový aktinoid vyrábaný vo vysokotokových jadrových reaktoroch; terčíky z ²⁴⁹Bk umožnili syntézu superťažkého prvku tenesínu (Z = 117)."
  },
  {
    "atomicNumber": 98,
    "symbol": "Cf",
    "name": "Kalifornium",
    "latinName": "Californium",
    "englishName": "Californium",
    "atomicMass": 251,
    "atomicMassDisplay": "[251] u",
    "isMassBracketed": true,
    "defaultIsotope": 251,
    "isotopes": [
      {
        "massNumber": 251,
        "name": "Kalifornium-251 (²⁵¹Cf)",
        "abundance": "Syntetický (t½ = 898 y)",
        "stable": false
      },
      {
        "massNumber": 252,
        "name": "Kalifornium-252 (²⁵²Cf)",
        "abundance": "Syntetický (t½ = 2.645 y)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      32,
      28,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁰ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁰ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1173.0,
    "boilingPointK": 1743.0,
    "isRadioactive": true,
    "discoveryYear": "1950",
    "summary": "Kalifornium je syntetický aktinoid, ktorého izotop ²⁵²Cf podlieha spontánnemu štiepeniu a slúži ako intenzívny prenosný zdroj neutrónov pri spúšťaní reaktorov a analýze materiálov."
  },
  {
    "atomicNumber": 99,
    "symbol": "Es",
    "name": "Einsteinium",
    "latinName": "Einsteinium",
    "englishName": "Einsteinium",
    "atomicMass": 252,
    "atomicMassDisplay": "[252] u",
    "isMassBracketed": true,
    "defaultIsotope": 252,
    "isotopes": [
      {
        "massNumber": 252,
        "name": "Einsteinium-252 (²⁵²Es)",
        "abundance": "Syntetický (t½ = 471.7 d)",
        "stable": false
      },
      {
        "massNumber": 253,
        "name": "Einsteinium-253 (²⁵³Es)",
        "abundance": "Syntetický (t½ = 20.47 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      32,
      29,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹¹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹¹ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1133.0,
    "boilingPointK": 1269.0,
    "isRadioactive": true,
    "discoveryYear": "1952",
    "summary": "Einsteinium bolo objavené v roku 1952 v produktoch prvého termonukleárneho výbuchu a je najťažším prvkom, ktorý sa podarilo pripraviť vo vážiteľnom miligramovom množstve."
  },
  {
    "atomicNumber": 100,
    "symbol": "Fm",
    "name": "Fermium",
    "latinName": "Fermium",
    "englishName": "Fermium",
    "atomicMass": 257,
    "atomicMassDisplay": "[257] u",
    "isMassBracketed": true,
    "defaultIsotope": 257,
    "isotopes": [
      {
        "massNumber": 257,
        "name": "Fermium-257 (²⁵⁷Fm)",
        "abundance": "Syntetický (t½ = 100.5 d)",
        "stable": false
      },
      {
        "massNumber": 255,
        "name": "Fermium-255 (²⁵⁵Fm)",
        "abundance": "Syntetický (t½ = 20.07 h)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      32,
      30,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹² 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹² 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1800.0,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1952",
    "summary": "Fermium je najťažší prvok, ktorý možno pripraviť neutrónovým ožarovaním ľahších prvkov v reaktore; pomenovaný je na počesť fyzika Enrica Fermiho."
  },
  {
    "atomicNumber": 101,
    "symbol": "Md",
    "name": "Mendelevium",
    "latinName": "Mendelevium",
    "englishName": "Mendelevium",
    "atomicMass": 258,
    "atomicMassDisplay": "[258] u",
    "isMassBracketed": true,
    "defaultIsotope": 258,
    "isotopes": [
      {
        "massNumber": 258,
        "name": "Mendelevium-258 (²⁵⁸Md)",
        "abundance": "Syntetický (t½ = 51.5 d)",
        "stable": false
      },
      {
        "massNumber": 260,
        "name": "Mendelevium-260 (²⁶⁰Md)",
        "abundance": "Syntetický (t½ = 31.8 d)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      32,
      31,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹³ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹³ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1100.0,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1955",
    "summary": "Mendelevium bolo prvým prvkom pripravovaným po jednotlivých atómoch ostreľovaním einsteinia časticami alfa, pomenovaným na počesť autora periodickej tabuľky D. I. Mendelejeva."
  },
  {
    "atomicNumber": 102,
    "symbol": "No",
    "name": "Nobélium",
    "latinName": "Nobelium",
    "englishName": "Nobelium",
    "atomicMass": 259,
    "atomicMassDisplay": "[259] u",
    "isMassBracketed": true,
    "defaultIsotope": 259,
    "isotopes": [
      {
        "massNumber": 259,
        "name": "Nobélium-259 (²⁵⁹No)",
        "abundance": "Syntetický (t½ = 58 m)",
        "stable": false
      },
      {
        "massNumber": 255,
        "name": "Nobélium-255 (²⁵⁵No)",
        "abundance": "Syntetický (t½ = 3.52 m)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": null,
    "period": 7,
    "block": "f",
    "gridRow": 10,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1100.0,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1966",
    "summary": "Nobélium je syntetický aktinoid pomenovaný podľa Alfreda Nobela, ktorý vďaka zaplnenej podvrstve 5f¹⁴ vo vodnom roztoku stabilne vystupuje v oxidačnom stupni +2."
  },
  {
    "atomicNumber": 103,
    "symbol": "Lr",
    "name": "Lawrencium",
    "latinName": "Lawrencium",
    "englishName": "Lawrencium",
    "atomicMass": 266,
    "atomicMassDisplay": "[266] u",
    "isMassBracketed": true,
    "defaultIsotope": 266,
    "isotopes": [
      {
        "massNumber": 266,
        "name": "Lawrencium-266 (²⁶⁶Lr)",
        "abundance": "Syntetický (t½ = 11 h)",
        "stable": false
      },
      {
        "massNumber": 262,
        "name": "Lawrencium-262 (²⁶²Lr)",
        "abundance": "Syntetický (t½ = 3.6 h)",
        "stable": false
      }
    ],
    "category": "actinide",
    "group": 3,
    "period": 7,
    "block": "d",
    "gridRow": 10,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      3
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 7s² 7p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s² 7p¹",
    "isConfigurationException": true,
    "stateAtSTP": "solid",
    "electronegativity": 1.3,
    "meltingPointK": 1900.0,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1961",
    "summary": "Lawrencium uzatvára rad aktinoidov; relativistická stabilizácia orbitálu 7p₁/₂ mu v základnom stave dáva elektrónovú konfiguráciu [Rn] 5f¹⁴ 7s² 7p¹."
  },
  {
    "atomicNumber": 104,
    "symbol": "Rf",
    "name": "Rutherfordium",
    "latinName": "Rutherfordium",
    "englishName": "Rutherfordium",
    "atomicMass": 267,
    "atomicMassDisplay": "[267] u",
    "isMassBracketed": true,
    "defaultIsotope": 267,
    "isotopes": [
      {
        "massNumber": 267,
        "name": "Rutherfordium-267 (²⁶⁷Rf)",
        "abundance": "Syntetický (t½ = 1.3 h)",
        "stable": false
      },
      {
        "massNumber": 265,
        "name": "Rutherfordium-265 (²⁶⁵Rf)",
        "abundance": "Syntetický (t½ = 2.5 m)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 4,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 4,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      10,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d² 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d² 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1964",
    "summary": "Rutherfordium je prvý transaktinoidný (superťažký) prvok d-bloku, pomenovaný po Ernestovi Rutherfordovi a chemicky príbuzný hafniu a zirkóniu v 4. skupine."
  },
  {
    "atomicNumber": 105,
    "symbol": "Db",
    "name": "Dubnium",
    "latinName": "Dubnium",
    "englishName": "Dubnium",
    "atomicMass": 268,
    "atomicMassDisplay": "[268] u",
    "isMassBracketed": true,
    "defaultIsotope": 268,
    "isotopes": [
      {
        "massNumber": 268,
        "name": "Dubnium-268 (²⁶⁸Db)",
        "abundance": "Syntetický (t½ = 28 h)",
        "stable": false
      },
      {
        "massNumber": 262,
        "name": "Dubnium-262 (²⁶²Db)",
        "abundance": "Syntetický (t½ = 35 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 5,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 5,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      11,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d³ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d³ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1968",
    "summary": "Dubnium je syntetický superťažký prvok 5. skupiny pomenovaný podľa Spojeného ústavu jadrových výskumov v Dubne, chemicky príbuzný tantalu a nióbu."
  },
  {
    "atomicNumber": 106,
    "symbol": "Sg",
    "name": "Seaborgium",
    "latinName": "Seaborgium",
    "englishName": "Seaborgium",
    "atomicMass": 269,
    "atomicMassDisplay": "[269] u",
    "isMassBracketed": true,
    "defaultIsotope": 269,
    "isotopes": [
      {
        "massNumber": 269,
        "name": "Seaborgium-269 (²⁶⁹Sg)",
        "abundance": "Syntetický (t½ = 14 m)",
        "stable": false
      },
      {
        "massNumber": 271,
        "name": "Seaborgium-271 (²⁷¹Sg)",
        "abundance": "Syntetický (t½ = 2.4 m)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 6,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 6,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      12,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁴ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁴ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1974",
    "summary": "Seaborgium je syntetický superťažký prechodný kov 6. skupiny pomenovaný po jadrovom chemikovi Glennovi T. Seaborgovi, tvoriaci prchavé zlúčeniny analogické volfrámu."
  },
  {
    "atomicNumber": 107,
    "symbol": "Bh",
    "name": "Bohrium",
    "latinName": "Bohrium",
    "englishName": "Bohrium",
    "atomicMass": 270,
    "atomicMassDisplay": "[270] u",
    "isMassBracketed": true,
    "defaultIsotope": 270,
    "isotopes": [
      {
        "massNumber": 270,
        "name": "Bohrium-270 (²⁷⁰Bh)",
        "abundance": "Syntetický (t½ = 61 s)",
        "stable": false
      },
      {
        "massNumber": 274,
        "name": "Bohrium-274 (²⁷⁴Bh)",
        "abundance": "Syntetický (t½ = 54 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 7,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 7,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      13,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁵ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁵ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1981",
    "summary": "Bohrium je syntetický superťažký prvok 7. skupiny pomenovaný na počesť dánskeho fyzika Nielsa Bohra; v plynnej fáze tvorí prchavý oxychlorid BhO₃Cl podobne ako rénium."
  },
  {
    "atomicNumber": 108,
    "symbol": "Hs",
    "name": "Hásium",
    "latinName": "Hassium",
    "englishName": "Hassium",
    "atomicMass": 277,
    "atomicMassDisplay": "[277] u",
    "isMassBracketed": true,
    "defaultIsotope": 277,
    "isotopes": [
      {
        "massNumber": 277,
        "name": "Hásium-277 (²⁷⁷Hs)",
        "abundance": "Syntetický (t½ = 11 m)",
        "stable": false
      },
      {
        "massNumber": 270,
        "name": "Hásium-270 (²⁷⁰Hs)",
        "abundance": "Syntetický (t½ = 10 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 8,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 8,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      14,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁶ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁶ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1984",
    "summary": "Hásium je syntetický superťažký prvok 8. skupiny, ktorý tvorí prchavý oxid hasičelý (HsO₄), čím experimentálne potvrdzuje svoju príbuznosť s ozmiom."
  },
  {
    "atomicNumber": 109,
    "symbol": "Mt",
    "name": "Meitnérium",
    "latinName": "Meitnerium",
    "englishName": "Meitnerium",
    "atomicMass": 278,
    "atomicMassDisplay": "[278] u",
    "isMassBracketed": true,
    "defaultIsotope": 278,
    "isotopes": [
      {
        "massNumber": 278,
        "name": "Meitnérium-278 (²⁷⁸Mt)",
        "abundance": "Syntetický (t½ = 4.5 s)",
        "stable": false
      },
      {
        "massNumber": 276,
        "name": "Meitnérium-276 (²⁷⁶Mt)",
        "abundance": "Syntetický (t½ = 0.62 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 9,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 9,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      15,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁷ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁷ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1982",
    "summary": "Meitnérium je syntetický superťažký prvok 9. skupiny pomenovaný na počesť fyzičky Lise Meitnerovej, spoluobjaviteľky jadrového štiepenia."
  },
  {
    "atomicNumber": 110,
    "symbol": "Ds",
    "name": "Darmštádtium",
    "latinName": "Darmstadtium",
    "englishName": "Darmstadtium",
    "atomicMass": 281,
    "atomicMassDisplay": "[281] u",
    "isMassBracketed": true,
    "defaultIsotope": 281,
    "isotopes": [
      {
        "massNumber": 281,
        "name": "Darmštádtium-281 (²⁸¹Ds)",
        "abundance": "Syntetický (t½ = 12.7 s)",
        "stable": false
      },
      {
        "massNumber": 279,
        "name": "Darmštádtium-279 (²⁷⁹Ds)",
        "abundance": "Syntetický (t½ = 0.18 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 10,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 10,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      16,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁸ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁸ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1994",
    "summary": "Darmštádtium je syntetický superťažký prvok 10. skupiny pripravený v inštitúte GSI v nemeckom Darmstadte, umiestnený v tabuľke pod platinou."
  },
  {
    "atomicNumber": 111,
    "symbol": "Rg",
    "name": "Röntgenium",
    "latinName": "Roentgenium",
    "englishName": "Roentgenium",
    "atomicMass": 282,
    "atomicMassDisplay": "[282] u",
    "isMassBracketed": true,
    "defaultIsotope": 282,
    "isotopes": [
      {
        "massNumber": 282,
        "name": "Röntgenium-282 (²⁸²Rg)",
        "abundance": "Syntetický (t½ = 100 s)",
        "stable": false
      },
      {
        "massNumber": 280,
        "name": "Röntgenium-280 (²⁸⁰Rg)",
        "abundance": "Syntetický (t½ = 3.6 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 11,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 11,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      17,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d⁹ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁹ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "solid",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1994",
    "summary": "Röntgenium je syntetický superťažký prvok 11. skupiny pomenovaný na počesť Wilhelma Conrada Röntgena, objaviteľa röntgenového žiarenia."
  },
  {
    "atomicNumber": 112,
    "symbol": "Cn",
    "name": "Kopernícium",
    "latinName": "Copernicium",
    "englishName": "Copernicium",
    "atomicMass": 285,
    "atomicMassDisplay": "[285] u",
    "isMassBracketed": true,
    "defaultIsotope": 285,
    "isotopes": [
      {
        "massNumber": 285,
        "name": "Kopernícium-285 (²⁸⁵Cn)",
        "abundance": "Syntetický (t½ = 28 s)",
        "stable": false
      },
      {
        "massNumber": 283,
        "name": "Kopernícium-283 (²⁸³Cn)",
        "abundance": "Syntetický (t½ = 4 s)",
        "stable": false
      }
    ],
    "category": "transition-metal",
    "group": 12,
    "period": 7,
    "block": "d",
    "gridRow": 7,
    "gridColumn": 12,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      2
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s²",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1996",
    "summary": "Kopernícium je syntetický superťažký prvok 12. skupiny pomenovaný po Mikulášovi Kopernikovi; silné relativistické efekty uzatvárajú jeho podvrstvy 6d¹⁰ 7s² a zvyšujú jeho prchavosť."
  },
  {
    "atomicNumber": 113,
    "symbol": "Nh",
    "name": "Nihónium",
    "latinName": "Nihonium",
    "englishName": "Nihonium",
    "atomicMass": 286,
    "atomicMassDisplay": "[286] u",
    "isMassBracketed": true,
    "defaultIsotope": 286,
    "isotopes": [
      {
        "massNumber": 286,
        "name": "Nihónium-286 (²⁸⁶Nh)",
        "abundance": "Syntetický (t½ = 9.5 s)",
        "stable": false
      },
      {
        "massNumber": 284,
        "name": "Nihónium-284 (²⁸⁴Nh)",
        "abundance": "Syntetický (t½ = 0.9 s)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 13,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 13,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      3
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p¹",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "2004",
    "summary": "Nihónium je syntetický superťažký prvok 13. skupiny pripravený v japonskom centre RIKEN, prvý prvok periodickej tabuľky objavený v Ázii."
  },
  {
    "atomicNumber": 114,
    "symbol": "Fl",
    "name": "Fleróvium",
    "latinName": "Flerovium",
    "englishName": "Flerovium",
    "atomicMass": 289,
    "atomicMassDisplay": "[289] u",
    "isMassBracketed": true,
    "defaultIsotope": 289,
    "isotopes": [
      {
        "massNumber": 289,
        "name": "Fleróvium-289 (²⁸⁹Fl)",
        "abundance": "Syntetický (t½ = 1.9 s)",
        "stable": false
      },
      {
        "massNumber": 288,
        "name": "Fleróvium-288 (²⁸⁸Fl)",
        "abundance": "Syntetický (t½ = 0.66 s)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 14,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 14,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      4
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p²",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "1999",
    "summary": "Fleróvium je syntetický superťažký prvok 14. skupiny pomenovaný po Fľorovovom laboratóriu jadrových reakcií, umiestnený pod olovom."
  },
  {
    "atomicNumber": 115,
    "symbol": "Mc",
    "name": "Moskóvium",
    "latinName": "Moscovium",
    "englishName": "Moscovium",
    "atomicMass": 290,
    "atomicMassDisplay": "[290] u",
    "isMassBracketed": true,
    "defaultIsotope": 290,
    "isotopes": [
      {
        "massNumber": 290,
        "name": "Moskóvium-290 (²⁹⁰Mc)",
        "abundance": "Syntetický (t½ = 0.65 s)",
        "stable": false
      },
      {
        "massNumber": 289,
        "name": "Moskóvium-289 (²⁸⁹Mc)",
        "abundance": "Syntetický (t½ = 0.33 s)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 15,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 15,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      5
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p³",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "2003",
    "summary": "Moskóvium je syntetický superťažký prvok 15. skupiny pripravený zrážkou jadier amerícia-243 a vápnika-48."
  },
  {
    "atomicNumber": 116,
    "symbol": "Lv",
    "name": "Livermórium",
    "latinName": "Livermorium",
    "englishName": "Livermorium",
    "atomicMass": 293,
    "atomicMassDisplay": "[293] u",
    "isMassBracketed": true,
    "defaultIsotope": 293,
    "isotopes": [
      {
        "massNumber": 293,
        "name": "Livermórium-293 (²⁹³Lv)",
        "abundance": "Syntetický (t½ = 53 ms)",
        "stable": false
      },
      {
        "massNumber": 292,
        "name": "Livermórium-292 (²⁹²Lv)",
        "abundance": "Syntetický (t½ = 13 ms)",
        "stable": false
      }
    ],
    "category": "post-transition-metal",
    "group": 16,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 16,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      6
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁴",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "2000",
    "summary": "Livermórium je syntetický superťažký prvok 16. skupiny pripravený fúziou jadier curia-248 a vápnika-48 v spolupráci laboratórií v Dubne a Livermore."
  },
  {
    "atomicNumber": 117,
    "symbol": "Ts",
    "name": "Tenesín",
    "latinName": "Tennessinum",
    "englishName": "Tennessine",
    "atomicMass": 294,
    "atomicMassDisplay": "[294] u",
    "isMassBracketed": true,
    "defaultIsotope": 294,
    "isotopes": [
      {
        "massNumber": 294,
        "name": "Tenesín-294 (²⁹⁴Ts)",
        "abundance": "Syntetický (t½ = 51 ms)",
        "stable": false
      },
      {
        "massNumber": 293,
        "name": "Tenesín-293 (²⁹³Ts)",
        "abundance": "Syntetický (t½ = 22 ms)",
        "stable": false
      }
    ],
    "category": "halogen",
    "group": 17,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 17,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      7
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁵",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "2010",
    "summary": "Tenesín je syntetický superťažký prvok 17. skupiny (halogény) pripravený z berkélia-249 a vápnika-48."
  },
  {
    "atomicNumber": 118,
    "symbol": "Og",
    "name": "Oganesón",
    "latinName": "Oganesson",
    "englishName": "Oganesson",
    "atomicMass": 294,
    "atomicMassDisplay": "[294] u",
    "isMassBracketed": true,
    "defaultIsotope": 294,
    "isotopes": [
      {
        "massNumber": 294,
        "name": "Oganesón-294 (²⁹⁴Og)",
        "abundance": "Syntetický (t½ = 0.7 ms)",
        "stable": false
      }
    ],
    "category": "noble-gas",
    "group": 18,
    "period": 7,
    "block": "p",
    "gridRow": 7,
    "gridColumn": 18,
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      8
    ],
    "electronConfiguration": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    "electronConfigurationFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁶",
    "isConfigurationException": false,
    "stateAtSTP": "unknown",
    "electronegativity": null,
    "meltingPointK": null,
    "boilingPointK": null,
    "isRadioactive": true,
    "discoveryYear": "2002",
    "summary": "Oganesón je najťažší oficiálne uznaný chemický prvok (Z = 118), ktorý uzatvára 7. periódu a 18. skupinu; pomenovaný je na počesť jadrového fyzika Jurija Oganesjana."
  }
];

export const ELEMENTS_BY_NUMBER = Object.fromEntries(
  ELEMENTS.map((el) => [el.atomicNumber, el])
);

export const ELEMENTS_BY_SYMBOL = Object.fromEntries(
  ELEMENTS.map((el) => [el.symbol.toLowerCase(), el])
);
