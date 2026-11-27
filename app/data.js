// Data for NusaData: Indonesia in figures, 2015-2025.
//
// Every figure below is a published official statistic. Sources are listed
// in SOURCES and on the site's Sources page; each figure names its source
// and year there. Values are the ones the Badan Pusat Statistik (BPS)
// published, with World Bank and Bank Indonesia where noted. A null means
// the figure had not been published when this site was built (November
// 2026); the site says so instead of guessing.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Annual real GDP growth, percent (BPS, February releases).
export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03, 5.11];

// GDP at current prices, Rp trillion (BPS).
export const GDP_NOMINAL = [11526.3, 12401.7, 13589.8, 14837.4, 15832.7, 15443.4, 16976.7, 19588.4, 20892.4, 22139.0, 23821.1];

// GDP per capita, Rp million (BPS).
export const GDP_PER_CAPITA = [45.1, 47.9, 51.9, 56.0, 59.1, 57.2, 62.2, 71.0, 75.0, 78.6, 83.7];

// Consumer-price inflation, December year-on-year, percent (BPS).
// The 2025 reading is not used: it had not been verified when this site
// was built, so the series ends at 2024 and the chart says so.
export const INFLATION_YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const INFLATION = [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57];

// Poverty rate, percent of population (BPS, Susenas). September readings
// 2015-2024; the 2025 point is the March 2025 reading.
export const POVERTY = [11.13, 10.7, 10.12, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57, 8.47];
export const POVERTY_NOTE = 'September each year; 2025 is the March reading.';

// Open unemployment rate, percent (BPS, Sakernas). August readings
// 2015-2024; the 2025 point is the February 2025 reading.
export const UNEMPLOYMENT = [6.18, 5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91, 4.76];
export const UNEMPLOYMENT_NOTE = 'August each year; 2025 is the February reading.';

// Mid-year population, millions (BPS).
export const POPULATION = [255.46, 258.71, 261.89, 265.02, 268.07, 270.2, 272.68, 275.77, 278.7, 281.6, 284.44];

// Human Development Index (BPS). The 2025 value had not been published
// when this site was built, so the series ends at 2024.
export const HDI_YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const HDI = [69.55, 70.18, 70.81, 71.39, 71.92, 71.94, 72.29, 73.37, 74.39, 75.02];

// Headline indicators for the front page. Each names its latest year.
export const HEADLINES = [
  { label: 'Penduduk', value: '284,4 jt', year: 2025, note: 'jiwa, pertengahan tahun', source: 'BPS' },
  { label: 'PDB', value: 'Rp23.821 T', year: 2025, note: 'harga berlaku', source: 'BPS' },
  { label: 'Pertumbuhan ekonomi', value: '5,11%', year: 2025, note: 'year-on-year', source: 'BPS' },
  { label: 'PDB per kapita', value: 'Rp83,7 jt', year: 2025, note: 'per kapita per tahun', source: 'BPS' },
  { label: 'Inflasi', value: '1,57%', year: 2024, note: 'Desember, year-on-year', source: 'BPS' },
  { label: 'Pengangguran terbuka', value: '4,76%', year: 2025, note: 'Februari, terendah sejak 1995', source: 'BPS' },
  { label: 'Kemiskinan', value: '8,47%', year: 2025, note: 'Maret, 23,85 juta jiwa', source: 'BPS' },
  { label: 'IPM', value: '75,02', year: 2024, note: 'kategori tinggi', source: 'BPS' },
];

// Ten largest provinces by population, 2024, millions (BPS).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.35, share: 17.9 },
  { name: 'Jawa Timur', pop: 41.81, share: 14.8 },
  { name: 'Jawa Tengah', pop: 37.89, share: 13.5 },
  { name: 'Sumatera Utara', pop: 15.59, share: 5.5 },
  { name: 'Banten', pop: 12.43, share: 4.4 },
  { name: 'DKI Jakarta', pop: 10.68, share: 3.8 },
  { name: 'Sulawesi Selatan', pop: 9.46, share: 3.4 },
  { name: 'Lampung', pop: 9.42, share: 3.3 },
  { name: 'Sumatera Selatan', pop: 8.84, share: 3.1 },
  { name: 'Riau', pop: 6.73, share: 2.4 },
];

// Indonesia at a glance (BPS).
export const AT_A_GLANCE = [
  { label: 'Luas daratan', value: '1.890.180 km²', source: 'BPS' },
  { label: 'Pulau', value: '17.380', source: 'BPS' },
  { label: 'Bahasa daerah', value: '718', source: 'BPS' },
  { label: 'Penduduk di Pulau Jawa', value: '55,93%', year: 2024, source: 'BPS' },
  { label: 'Provinsi', value: '38', source: 'BPS' },
  { label: 'Kepadatan DKI Jakarta', value: '16.165 jiwa/km²', year: 2024, source: 'BPS' },
];

// Labour market, February 2025 (BPS, Sakernas).
export const LABOUR = [
  { label: 'Angkatan kerja', value: '153,05 jt jiwa', source: 'BPS, Sakernas Feb 2025' },
  { label: 'Penduduk bekerja', value: '145,77 jt jiwa', source: 'BPS, Sakernas Feb 2025' },
  { label: 'Pekerja informal', value: '59,40%', source: 'BPS, Sakernas Feb 2025' },
  { label: 'Upah buruh rata-rata', value: 'Rp3,09 jt/bulan', source: 'BPS, Sakernas Feb 2025' },
  { label: 'Garis kemiskinan', value: 'Rp609.160/kapita/bulan', source: 'BPS, Susenas Mar 2025' },
  { label: 'Kemiskinan ekstrem', value: '0,85% · 2,38 jt jiwa', source: 'BPS, Susenas Mar 2025' },
  { label: 'Rasio Gini', value: '0,375', source: 'BPS, Susenas Mar 2025' },
];

// What moved the economy in 2024 (BPS).
export const DRIVERS_2024 = [
  { label: 'Lapangan usaha tumbuh tercepat', value: 'Jasa Lainnya, +9,80%', source: 'BPS' },
  { label: 'Komponen pengeluaran tumbuh tercepat', value: 'Konsumsi LNPRT, +12,48%', source: 'BPS' },
  { label: 'PDB triwulan IV 2024', value: '+5,02% year-on-year', source: 'BPS' },
];

// 2026 so far, as published by November 2026 (BPS and Bank Indonesia).
export const UPDATES_2026 = [
  { label: 'Kemiskinan', value: '8,07% · 22,93 jt jiwa', when: 'Maret 2026', source: 'BPS' },
  { label: 'Pengangguran terbuka', value: '4,65% · 7,22 jt jiwa', when: 'Mei 2026', source: 'BPS' },
  { label: 'IPM', value: '75,90', when: '2026', source: 'BPS' },
  { label: 'Pertumbuhan ekonomi', value: '5,47% year-on-year', when: 'Triwulan III 2026', source: 'BPS' },
  { label: 'Inflasi', value: '3,19% year-on-year', when: 'Agustus 2026', source: 'BPS' },
  { label: 'Penduduk', value: '287,1 jt jiwa', when: '2026', source: 'BPS' },
];

// Where every number comes from. The site prints these as plain domain
// names, never as links, so the site loads nothing from another origin.
export const SOURCES = [
  { name: 'Badan Pusat Statistik', domain: 'bps.go.id', what: 'Penduduk, PDB, inflasi, kemiskinan, pengangguran, IPM, provinsi' },
  { name: 'Bank Indonesia', domain: 'bi.go.id', what: 'Inflasi dan suku bunga acuan' },
  { name: 'Kementerian Keuangan', domain: 'kemenkeu.go.id', what: 'APBN dan rilis perekonomian' },
  { name: 'World Bank', domain: 'data.worldbank.org', what: 'Perbandingan internasional dan garis kemiskinan global' },
];
