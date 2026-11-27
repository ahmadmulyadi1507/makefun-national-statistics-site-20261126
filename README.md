# makefun-national-statistics-site-20261126

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ahmadmulyadi1507/makefun-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ahmadmulyadi1507/makefun-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**NusaData** — Indonesia in figures: population, economy, labour, and
welfare, from official statistics 2015–2025. A self-contained static
site that runs offline in a browser, on desktop and on a phone: no build
step, no network request, no library — hand-drawn SVG charts, hash
routes, and every figure with its source and year.

- **Front page** — eight headline indicators, GDP growth 2015–2025, the
  six largest provinces, and the 2026 updates so far.
- **Ekonomi** — GDP and growth, inflation, what moved the economy in
  2024, and a 2015–2025 table, with a year-range switch.
- **Penduduk** — population 2015–2025, a sortable top-10 province table,
  and Indonesia at a glance (area, islands, languages).
- **Tenaga kerja** — unemployment, poverty, and the Human Development
  Index, plus the labour market in February 2025.
- **Tabel data** — pick any indicator and year range; the chart and the
  table follow your choice.
- **Sumber data** — where every number comes from, and the method notes.

All figures are published official statistics (Badan Pusat Statistik,
Bank Indonesia, Kementerian Keuangan, World Bank), each shown with its
source and year. Figures not yet published when the site was built are
left out, never guessed.

## Run it

```sh
node serve.ts        # app/ is on http://localhost:8080
```

Open http://localhost:8080 in a browser, or open `app/index.html`
directly. Hand the entry in with:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `main.ts` — the hand-in program (Node 22, standard library only)
- `serve.ts` — a tiny static server for local testing
- `app/` — the site: `index.html`, `style.css`, `data.js`, `charts.js`,
  `views.js`, `main.js`
- `screenshots/` — 4 screenshots of the site running (see `shots.json`)
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
