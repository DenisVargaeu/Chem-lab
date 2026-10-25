# Interactive Periodic Table of Elements

A modern, scientifically accurate interactive Periodic Table of all 118 IUPAC-recognized chemical elements featuring an animated 3D/2D Bohr atomic structure visualizer and nuclide inspector. Built with vanilla HTML5, CSS3, and ES Modules with zero runtime framework dependencies.

---

## Features

### 1. Interactive 18-Column Periodic Table
- **All 118 IUPAC Elements**: Complete dataset from Hydrogen ($Z = 1$) to Oganesson ($Z = 118$) in the standard 18-column layout with separated Lanthanide ($57\text{–}71$) and Actinide ($89\text{–}103$) f-block series.
- **Instant Search**: Search by element name (`Gold`), chemical symbol (`Au`), or atomic number (`79`).
- **Category & State Filtering**: Filter by any of the 10 chemical categories via the dropdown or interactive category legend chips, or filter by physical state at STP (`Solid`, `Liquid`, `Gas`, `Unknown / Predicted`).
- **Group & Period Highlighting**: Click any column header (`1–18`), row header (`1–7`), or use the toolbar selectors to isolate an entire chemical group or electron shell period.
- **Full Keyboard Navigation**:
  - `↑` `↓` `←` `→` — Spatial navigation across the periodic table grid
  - `[` / `]` — Previous / Next element by atomic number
  - `/` — Focus search input
  - `R` — Select a random element
  - `P` — Pause / Resume atomic orbital animation
  - `Esc` — Reset active filters and search query

### 2. Interactive 3D / 2D Atomic Structure Model
- **3D Fibonacci-Packed Nucleus**: Renders individual proton ($p^+$) and neutron ($n^0$) spheres in distinct, high-contrast colors that update immediately when switching elements or isotopes.
- **Accurate Shell Occupancy**: Places the exact ground-state electron count on shells $K, L, M, N, O, P, Q$ ($n = 1\dots7$).
- **Interactive Camera & Projection Controls**:
  - Drag on the canvas to rotate the 3D atomic model along pitch and yaw axes.
  - Scroll or use `+` / `−` / `⟲` controls to zoom in, zoom out, or reset the view.
  - Toggle between **3D Tilted Orbit View** and **2D Planar Bohr View**.
  - Respects `prefers-reduced-motion` system preferences automatically.

### 3. Scientific Accuracy & Nuclide Inspector
- **Isotope-Dependent Neutron Counts**: Switch between natural and synthetic isotopes (e.g., $^{1}\text{H}$, $^{2}\text{H}$, $^{3}\text{H}$ or $^{12}\text{C}$, $^{13}\text{C}$, $^{14}\text{C}$) to inspect exact proton, neutron ($N = A - Z$), and electron counts alongside natural abundance or half-life ($t_{1/2}$).
- **Relative Atomic Mass vs. Mass Number**: Distinguishes standard terrestrial relative atomic mass (in $\text{u}$) from exact isotope mass numbers ($A$), and uses standard IUPAC square-bracket notation ($[A]\text{ u}$) for elements lacking stable isotopes.
- **Verified Ground-State Electron Configurations**: Includes both condensed noble-gas core notation and full spectroscopic notation, accurately reflecting all 20 experimental Madelung rule exceptions (such as $\text{Cr}$, $\text{Cu}$, $\text{Nb}$, $\text{Mo}$, $\text{Ru}$, $\text{Rh}$, $\text{Pd}$, $\text{Ag}$, $\text{La}$, $\text{Ce}$, $\text{Gd}$, $\text{Pt}$, $\text{Au}$, $\text{Ac}$, $\text{Th}$, $\text{Pa}$, $\text{U}$, $\text{Np}$, $\text{Cm}$, and $\text{Lr}$).
- **Unfabricated Measurements**: Unmeasured bulk thermodynamic properties of short-lived superheavy elements ($Z \ge 100$) are explicitly reported as unavailable rather than estimated or fabricated.

---

## Project Structure

```text
/
├── index.html                  # Application shell, toolbar controls, and semantic layout
├── src/
│   ├── main.js                 # App controller, state management, filters, theme & shortcuts
│   ├── data/
│   │   └── elements.js         # Verified scientific dataset for all 118 elements
│   ├── components/
│   │   ├── periodic-table.js   # 18-column periodic grid, keyboard nav, filtering & tooltips
│   │   ├── element-details.js  # Detailed element view, isotope selector & property tables
│   │   └── atom-model.js       # Interactive 3D/2D Canvas Bohr atomic model visualizer
│   └── styles/
│       ├── main.css            # Design tokens, dark/light themes, layout & details styles
│       ├── table.css           # Periodic table 18-column grid, tile states & category palette
│       └── atom.css            # Atomic visualizer stage, controls & particle counters
├── assets/
│   └── favicon.svg             # Application icon
├── scripts/
│   ├── dev-server.js           # Zero-dependency local HTTP development server
│   ├── build.js                # Production static site builder (outputs to dist/)
│   └── validate.js             # Automated scientific & structural dataset validator
├── package.json
└── README.md
```

---

## Getting Started (Local Development)

### Prerequisites
- **Node.js** `>= 18` (or any static HTTP server such as `python3 -m http.server`)

### 1. Validate the Scientific Dataset
Verify that all 118 elements, electron shell sums, grid coordinates, and isotope records pass validation:

```bash
npm run validate
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Then open **http://127.0.0.1:4173** in your browser.

*(Alternatively, serve the root directory with Python: `python3 -m http.server 8080`)*

---

## Production Build & GitHub Pages Deployment

### Build for Production
```bash
npm run build
```
This validates the dataset and creates a clean, self-contained production bundle in the `dist/` directory (including `.nojekyll` for GitHub Pages compatibility).

To preview the production build locally:
```bash
npm run preview
```

### Deploying to GitHub Pages

Because this project uses relative paths (`./src/...`, `./assets/...`) and standard ES Modules without external runtime dependencies, it can be deployed to GitHub Pages in two ways:

1. **Direct Branch Deployment**:
   - Push the repository to GitHub.
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, and click **Save**.
2. **GitHub Actions Deployment (`dist/`)**:
   - Run `npm run build` in your GitHub Actions workflow and upload `./dist` using `actions/upload-pages-artifact` and `actions/deploy-pages`.
