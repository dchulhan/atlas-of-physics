# Contracts

The catalogue manifest is `src/chapters.json`; TypeScript derives the Chapter
shape from it. Slugs correspond to existing chapter directories. Page counts
must match the engine's navigation buttons (checked in browser tests).

`/<chapter>/#<zero-based page index>` is a public URL contract. Equation and
comparison links use the same contract. Each chapter exports its existing model,
world, pages and PRACTICE interfaces; this migration does not change them.

The React shell must provide the engine's element IDs before importing main.js.
Startup rejects unknown chapters or missing simulations and displays an alert;
practice import failure is logged and visibly reported. Simulation DOM belongs
to the engine after bootstrap. No backend API or persistence contract exists.
