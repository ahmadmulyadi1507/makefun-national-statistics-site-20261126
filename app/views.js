// Page renderers. Each function returns the HTML for one hash route.
// All numbers come from data.js; every figure on a page names its source
// and year underneath it. Controls are plain buttons and selects that
// main.js wires up after the page renders — no inline handlers.

import {
  YEARS,
  GDP_GROWTH,
  GDP_NOMINAL,
  GDP_PER_CAPITA,
  INFLATION_YEARS,
  INFLATION,
  POVERTY,
  POVERTY_NOTE,
  UNEMPLOYMENT,
  UNEMPLOYMENT_NOTE,
  POPULATION,
  HDI_YEARS,
  HDI,
  HEADLINES,
  PROVINCES,
  AT_A_GLANCE,
  LABOUR,
  DRIVERS_2024,
  UPDATES_2026,
  SOURCES,
} from './data.js';
import { lineChart, barChart, fmtNum } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

// A row of navigation cards linking to every section.
function sectionCards(current) {
  const sections = [
    { href: '#/ekonomi', title: 'Ekonomi', desc: 'PDB, pertumbuhan, inflasi, dan PDB per kapita 2015–2025.' },
    { href: '#/penduduk', title: 'Penduduk', desc: 'Jumlah penduduk, provinsi terbanyak, dan sebaran di Pulau Jawa.' },
    { href: '#/tenaga-kerja', title: 'Tenaga kerja', desc: 'Pengangguran, kemiskinan, IPM, dan upah buruh.' },
    { href: '#/tabel', title: 'Tabel data', desc: 'Jelajahi semua indikator per tahun, lalu urutkan dan saring.' },
    { href: '#/sumber', title: 'Sumber data', desc: 'Dari mana setiap angka berasal dan kapan diperbarui.' },
  ];
  return `<nav class="cards" aria-label="Bagian situs">${sections
    .filter((s) => s.href !== current)
    .map(
      (s) => `<a class="card" href="${s.href}"><strong>${s.title}</strong><span>${s.desc}</span><span class="go">Buka →</span></a>`,
    )
    .join('')}</nav>`;
}

function kpiGrid() {
  return `<div class="kpis">${HEADLINES.map(
    (h) => `<div class="kpi"><span class="kpi-label">${esc(h.label)}</span><strong class="kpi-value">${esc(h.value)}</strong><span class="kpi-note">${esc(h.note)} · ${h.year}</span><span class="kpi-src">Sumber: ${esc(h.source)}</span></div>`,
  ).join('')}</div>`;
}

function sourceNote(text) {
  return `<p class="src">Sumber: ${esc(text)}</p>`;
}

// ---- Front page -----------------------------------------------------------

export function home() {
  const growth = lineChart({
    years: YEARS,
    values: GDP_GROWTH,
    unit: '%',
    title: 'Pertumbuhan ekonomi Indonesia 2015–2025',
  });
  const provinces = barChart({
    items: PROVINCES.slice(0, 6),
    value: 'pop',
    label: 'name',
    unit: ' jt',
    decimals: 2,
  });
  return `<section class="hero">
  <p class="eyebrow">Portal Statistik Indonesia · Data resmi 2015–2025</p>
  <h1>Indonesia dalam angka</h1>
  <p class="lede">Penduduk, ekonomi, tenaga kerja, dan kesejahteraan — angka resmi yang
  diperbarui dari publikasi Badan Pusat Statistik, diringkas agar mudah dibaca
  di layar besar maupun di telepon genggam.</p>
  </section>
  ${kpiGrid()}
  <section class="panel">
  <h2>Pertumbuhan ekonomi, 2015–2025</h2>
  <p>Setelah kontraksi −2,07% pada 2020, ekonomi kembali tumbuh di atas 5%
  sejak 2022 dan mencapai 5,11% pada 2025.</p>
  ${growth}
  ${sourceNote('BPS, pertumbuhan PDB year-on-year.')}
  </section>
  <section class="panel">
  <h2>Provinsi dengan penduduk terbanyak, 2024</h2>
  <p>Tiga provinsi di Pulau Jawa — Jawa Barat, Jawa Timur, Jawa Tengah —
  menampung sekitar 46% penduduk Indonesia.</p>
  ${provinces}
  ${sourceNote('BPS, jumlah penduduk menurut provinsi, 2024.')}
  <p><a class="button" href="#/penduduk">Lihat semua provinsi →</a></p>
  </section>
  <section class="panel updates">
  <h2>Pembaruan 2026</h2>
  <ul>${UPDATES_2026.map((u) => `<li><strong>${esc(u.label)}</strong> ${esc(u.value)} <span>(${esc(u.when)} · ${esc(u.source)})</span></li>`).join('')}</ul>
  </section>
  ${sectionCards('#/')}`;
}

// ---- Economy --------------------------------------------------------------

export function economy(range = 'all') {
  const years = range === 'recent' ? YEARS.slice(5) : YEARS;
  const growth = range === 'recent' ? GDP_GROWTH.slice(5) : GDP_GROWTH;
  const nominal = range === 'recent' ? GDP_NOMINAL.slice(5) : GDP_NOMINAL;
  const perCapita = range === 'recent' ? GDP_PER_CAPITA.slice(5) : GDP_PER_CAPITA;
  const growthChart = lineChart({ years, values: growth, unit: '%', title: 'Pertumbuhan PDB' });
  const nominalChart = lineChart({ years, values: nominal, unit: ' T', decimals: 0, title: 'PDB harga berlaku' });
  const inflationChart = lineChart({
    years: INFLATION_YEARS,
    values: INFLATION,
    unit: '%',
    color: '#b45309',
    title: 'Inflasi Desember year-on-year',
  });
  const rows = years
    .map((y, i) => {
      const gi = YEARS.indexOf(y);
      return `<tr><td>${y}</td><td>${fmtNum(GDP_GROWTH[gi])}%</td><td>Rp${fmtNum(GDP_NOMINAL[gi], 1)} T</td><td>Rp${fmtNum(GDP_PER_CAPITA[gi], 1)} jt</td></tr>`;
    })
    .join('');
  return `<h1>Ekonomi</h1>
  <p class="lede">PDB 2025 mencapai Rp23.821,1 triliun dengan pertumbuhan 5,11%.
  PDB per kapita Rp83,7 juta — naik dari Rp78,6 juta pada 2024.</p>
  <div class="controls" role="group" aria-label="Rentang tahun">
    <span>Rentang:</span>
    <button type="button" data-range="all" ${range === 'all' ? 'aria-pressed="true"' : ''}>2015–2025</button>
    <button type="button" data-range="recent" ${range === 'recent' ? 'aria-pressed="true"' : ''}>2020–2025</button>
  </div>
  <section class="panel"><h2>Pertumbuhan PDB, % per tahun</h2>${growthChart}${sourceNote('BPS.')}</section>
  <section class="panel"><h2>PDB harga berlaku, Rp triliun</h2>${nominalChart}${sourceNote('BPS.')}</section>
  <section class="panel"><h2>Inflasi, % Desember year-on-year</h2>
  <p>Inflasi 2024 tercatat 1,57% — terendah dalam satu dekade. Angka 2025
  belum dipakai di sini karena belum terverifikasi saat situs dibuat.</p>
  ${inflationChart}${sourceNote('BPS, rilis 2 Januari 2025.')}</section>
  <section class="panel"><h2>Apa yang menggerakkan ekonomi 2024</h2>
  <ul>${DRIVERS_2024.map((d) => `<li><strong>${esc(d.label)}:</strong> ${esc(d.value)} <span>(${esc(d.source)})</span></li>`).join('')}</ul></section>
  <section class="panel"><h2>Tabel ekonomi 2015–2025</h2>
  <table class="data"><thead><tr><th>Tahun</th><th>Pertumbuhan</th><th>PDB</th><th>PDB per kapita</th></tr></thead>
  <tbody>${rows}</tbody></table>
  ${sourceNote('BPS.')}</section>
  ${sectionCards('#/ekonomi')}`;
}

// ---- Population -----------------------------------------------------------

export function population(sort = 'pop-desc') {
  const popChart = lineChart({
    years: YEARS,
    values: POPULATION,
    unit: ' jt',
    decimals: 1,
    title: 'Jumlah penduduk pertengahan tahun',
  });
  const sorted = [...PROVINCES].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name, 'id');
    if (sort === 'pop-asc') return a.pop - b.pop;
    if (sort === 'share') return b.share - a.share;
    return b.pop - a.pop;
  });
  const rows = sorted
    .map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${fmtNum(p.pop)} jt</td><td>${fmtNum(p.share, 1)}%</td></tr>`)
    .join('');
  return `<h1>Penduduk</h1>
  <p class="lede">281,6 juta jiwa pada pertengahan 2024 dan 284,4 juta pada 2025.
  Lebih dari separuh tinggal di Pulau Jawa, di atas kurang dari 7% luas daratan.</p>
  <section class="panel"><h2>Jumlah penduduk, juta jiwa</h2>${popChart}${sourceNote('BPS, jumlah penduduk pertengahan tahun.')}</section>
  <section class="panel"><h2>Sepuluh provinsi terbanyak, 2024</h2>
  <p>Klik judul kolom untuk mengurutkan tabel.</p>
  <table class="data sortable"><thead><tr>
  <th>#</th><th><button type="button" data-sort="name">Provinsi</button></th>
  <th><button type="button" data-sort="pop-desc">Penduduk</button></th>
  <th><button type="button" data-sort="share">Pangsa</button></th>
  </tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote('BPS, jumlah penduduk menurut provinsi, 2024.')}</section>
  <section class="panel"><h2>Indonesia sekilas</h2>
  <div class="facts">${AT_A_GLANCE.map((f) => `<div class="fact"><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><span class="kpi-src">Sumber: ${esc(f.source)}${f.year ? `, ${f.year}` : ''}</span></div>`).join('')}</div></section>
  ${sectionCards('#/penduduk')}`;
}

// ---- Labour and welfare ---------------------------------------------------

export function labour() {
  const unempChart = lineChart({
    years: YEARS,
    values: UNEMPLOYMENT,
    unit: '%',
    color: '#b45309',
    title: 'Tingkat pengangguran terbuka',
  });
  const povChart = lineChart({
    years: YEARS,
    values: POVERTY,
    unit: '%',
    color: '#0f766e',
    title: 'Tingkat kemiskinan',
  });
  const hdiChart = lineChart({
    years: HDI_YEARS,
    values: HDI,
    unit: '',
    color: '#be123c',
    title: 'Indeks Pembangunan Manusia',
  });
  return `<h1>Tenaga kerja &amp; kesejahteraan</h1>
  <p class="lede">Pengangguran terbuka 4,76% pada Februari 2025 — terendah sejak 1995.
  Kemiskinan 8,47% pada Maret 2025 — terendah sepanjang sejarah pencatatan.</p>
  <section class="panel"><h2>Pengangguran terbuka, %</h2>${unempChart}
  <p>${esc(UNEMPLOYMENT_NOTE)}</p>${sourceNote('BPS, Sakernas.')}</section>
  <section class="panel"><h2>Kemiskinan, % penduduk</h2>${povChart}
  <p>${esc(POVERTY_NOTE)}</p>${sourceNote('BPS, Susenas.')}</section>
  <section class="panel"><h2>Indeks Pembangunan Manusia</h2>${hdiChart}
  <p>IPM 2024 mencapai 75,02 — kategori tinggi. Angka 2025 belum terbit
  saat situs dibuat.</p>${sourceNote('BPS.')}</section>
  <section class="panel"><h2>Pasar kerja dan garis kemiskinan</h2>
  <div class="facts">${LABOUR.map((f) => `<div class="fact"><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><span class="kpi-src">${esc(f.source)}</span></div>`).join('')}</div></section>
  ${sectionCards('#/tenaga-kerja')}`;
}

// ---- Data explorer ----------------------------------------------------------

export const INDICATORS = [
  { id: 'gdp', label: 'Pertumbuhan PDB (%)', years: YEARS, values: GDP_GROWTH, unit: '%' },
  { id: 'nominal', label: 'PDB (Rp triliun)', years: YEARS, values: GDP_NOMINAL, unit: '' },
  { id: 'capita', label: 'PDB per kapita (Rp juta)', years: YEARS, values: GDP_PER_CAPITA, unit: '' },
  { id: 'inflation', label: 'Inflasi (% per tahun)', years: INFLATION_YEARS, values: INFLATION, unit: '%' },
  { id: 'poverty', label: 'Kemiskinan (%)', years: YEARS, values: POVERTY, unit: '%' },
  { id: 'unemployment', label: 'Pengangguran terbuka (%)', years: YEARS, values: UNEMPLOYMENT, unit: '%' },
  { id: 'population', label: 'Penduduk (juta jiwa)', years: YEARS, values: POPULATION, unit: '' },
  { id: 'hdi', label: 'IPM', years: HDI_YEARS, values: HDI, unit: '' },
];

export function tablePage(indicatorId = 'gdp', fromYear = 2015, toYear = 2025) {
  const ind = INDICATORS.find((x) => x.id === indicatorId) || INDICATORS[0];
  const rows = ind.years
    .map((y, i) => ({ year: y, value: ind.values[i] }))
    .filter((r) => r.year >= fromYear && r.year <= toYear && r.value !== null && r.value !== undefined);
  const body = rows.map((r) => `<tr><td>${r.year}</td><td>${fmtNum(r.value)}${ind.unit}</td></tr>`).join('');
  const chart = lineChart({ years: rows.map((r) => r.year), values: rows.map((r) => r.value), unit: ind.unit, title: ind.label });
  const yearOptions = (selected) => YEARS.map((y) => `<option value="${y}" ${y === selected ? 'selected' : ''}>${y}</option>`).join('');
  return `<h1>Tabel data</h1>
  <p class="lede">Pilih indikator dan rentang tahun. Tabel dan grafik di bawah ini
  berubah mengikuti pilihan Anda.</p>
  <div class="controls">
    <label>Indikator
      <select id="indicator-select">${INDICATORS.map((x) => `<option value="${x.id}" ${x.id === ind.id ? 'selected' : ''}>${esc(x.label)}</option>`).join('')}</select>
    </label>
    <label>Dari
      <select id="from-select">${yearOptions(fromYear)}</select>
    </label>
    <label>Sampai
      <select id="to-select">${yearOptions(toYear)}</select>
    </label>
  </div>
  <section class="panel"><h2>${esc(ind.label)}</h2>${chart}</section>
  <section class="panel"><table class="data"><thead><tr><th>Tahun</th><th>Nilai</th></tr></thead><tbody>${body}</tbody></table>
  ${sourceNote('BPS. Lihat halaman Sumber data untuk rincian tiap indikator.')}</section>
  ${sectionCards('#/tabel')}`;
}

// ---- Sources -----------------------------------------------------------------

export function sources() {
  return `<h1>Sumber data</h1>
  <p class="lede">Setiap angka di situs ini berasal dari publikasi resmi. Nama domain
  ditulis apa adanya agar situs tidak memuat apa pun dari luar — tidak ada
  satu pun permintaan jaringan saat situs dibuka.</p>
  <section class="panel"><h2>Dari mana angkanya</h2>
  <table class="data"><thead><tr><th>Lembaga</th><th>Domain</th><th>Data yang dipakai</th></tr></thead>
  <tbody>${SOURCES.map((s) => `<tr><td>${esc(s.name)}</td><td>${esc(s.domain)}</td><td>${esc(s.what)}</td></tr>`).join('')}</tbody></table></section>
  <section class="panel"><h2>Catatan metodologi</h2>
  <ul>
  <li>Pertumbuhan PDB adalah perubahan year-on-year atas dasar harga konstan 2010, rilis BPS tiap Februari.</li>
  <li>Inflasi adalah perubahan indeks harga konsumen Desember terhadap Desember tahun sebelumnya.</li>
  <li>Kemiskinan dihitung dari Survei Sosial Ekonomi Nasional (Susenas); pengangguran dari Survei Angkatan Kerja Nasional (Sakernas).</li>
  <li>Angka 2025 pada grafik kemiskinan memakai pembacaan Maret, dan pada grafik pengangguran memakai pembacaan Februari — keduanya diberi catatan di bawah grafik.</li>
  <li>Angka yang belum terbit saat situs dibuat (misalnya inflasi 2025 dan IPM 2025) tidak ditampilkan dan tidak ditebak.</li>
  </ul></section>
  <section class="panel"><h2>Pembaruan</h2>
  <p>Data tahunan diperbarui setiap ada rilis baru BPS. Pembaruan 2026 di
  halaman utama memakai rilis BPS sampai November 2026.</p></section>
  ${sectionCards('#/sumber')}`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
  <p>Halaman yang Anda cari tidak ada di situs ini. <a href="#/">Kembali ke beranda</a>.</p>`;
}
