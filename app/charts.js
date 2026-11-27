// Hand-rolled SVG charts. No libraries, no network: every chart is drawn
// from the numbers in data.js, so the site works fully offline and the
// first load stays small.
//
// lineChart draws a labelled line chart; barChart draws labelled
// horizontal bars. Both return an SVG string sized by viewBox, so they
// scale to a phone or a desktop without extra code.

const INK = '#1c1917';
const MUTED = '#78716c';
const GRID = '#e7e5e4';
const TEAL = '#0f766e';
const AMBER = '#b45309';
const ROSE = '#be123c';

// Format a number the Indonesian way: comma decimals, dot thousands.
export function fmtNum(n, decimals = 2) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// A line chart with a labelled y axis, year ticks and a callout on the
// latest value. `values` may contain nulls; the line skips them.
export function lineChart({ years, values, unit = '', color = TEAL, height = 260, decimals = 2, title = '' }) {
  const W = 640;
  const H = height;
  const padL = 56;
  const padR = 70;
  const padT = 18;
  const padB = 30;
  const shown = values.filter((v) => v !== null && v !== undefined);
  let min = Math.min(...shown);
  let max = Math.max(...shown);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  min -= span * 0.12;
  max += span * 0.12;
  const x = (i) => padL + ((W - padL - padR) * i) / (years.length - 1);
  const y = (v) => padT + ((H - padT - padB) * (max - v)) / (max - min);
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtNum(v, decimals)}${unit}</text>`;
  }
  let labels = '';
  years.forEach((yr, i) => {
    if (i % 2 === 0 || i === years.length - 1) {
      labels += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${yr}</text>`;
    }
  });
  // The line, in segments so a null value breaks it cleanly.
  let path = '';
  let points = '';
  let run = [];
  const flush = () => {
    if (run.length > 1) {
      path += `<path d="M ${run.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    run = [];
  };
  values.forEach((v, i) => {
    if (v === null || v === undefined) {
      flush();
      return;
    }
    const px = x(i);
    const py = y(v);
    run.push([px, py]);
    points += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${years[i]}: ${fmtNum(v, decimals)}${unit}</title></circle>`;
  });
  flush();
  const last = [...values].reverse().find((v) => v !== null && v !== undefined);
  const lastI = values.lastIndexOf(last);
  const callout = `<text x="${x(lastI) + 10}" y="${y(last) - 8}" font-size="13" font-weight="700" fill="${INK}">${fmtNum(last, decimals)}${unit}</text>`;
  const titleTag = title ? `<title>${esc(title)}</title>` : '';
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(title || 'Grafik garis')}">${titleTag}${grid}${labels}${path}${points}${callout}</svg>`;
}

// Horizontal bars, longest first by default, each labelled with its value.
export function barChart({ items, value, label, unit = '', color = TEAL, height = 300, decimals = 1 }) {
  const W = 640;
  const rowH = 34;
  const H = Math.max(height, items.length * rowH + 16);
  const padL = 150;
  const padR = 74;
  const maxV = Math.max(...items.map((d) => d[value]));
  const barW = (v) => ((W - padL - padR) * v) / maxV;
  let rows = '';
  items.forEach((d, i) => {
    const yTop = 8 + i * rowH;
    const w = Math.max(barW(d[value]), 2);
    rows += `<text x="${padL - 10}" y="${yTop + 15}" text-anchor="end" font-size="12.5" fill="${INK}">${esc(d[label])}</text>` +
      `<rect x="${padL}" y="${yTop}" width="${w.toFixed(1)}" height="20" rx="4" fill="${i === 0 ? AMBER : color}"/>` +
      `<text x="${padL + w + 8}" y="${yTop + 15}" font-size="12.5" font-weight="600" fill="${INK}">${fmtNum(d[value], decimals)}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Grafik batang">${rows}</svg>`;
}

// A small inline bar strip: one row per item, used for the front page.
export function barStrip({ items, value, label, unit = '', color = TEAL }) {
  return barChart({ items, value, label, unit, color, height: items.length * 34 + 16, decimals: 2 });
}

export const CHART_COLORS = { teal: TEAL, amber: AMBER, rose: ROSE, ink: INK, muted: MUTED };
