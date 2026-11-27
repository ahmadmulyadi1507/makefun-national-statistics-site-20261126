// The router: one page per hash route, every control wired after render.
//
//   #/                front page
//   #/ekonomi         economy, with a year-range switch
//   #/penduduk        population, with a sortable province table
//   #/tenaga-kerja    labour and welfare
//   #/tabel           data explorer: indicator and year filters
//   #/sumber          sources and method notes
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { home, economy, population, labour, tablePage, sources, missing } from './views.js';

const app = document.getElementById('app');

// Choices the visitor made on this visit; kept while they browse.
const state = { range: 'all', sort: 'pop-desc', indicator: 'gdp', from: 2015, to: 2025 };

function page() {
  const hash = location.hash || '#/';
  if (hash === '#/' || hash === '') return home();
  if (hash === '#/ekonomi') return economy(state.range);
  if (hash === '#/penduduk') return population(state.sort);
  if (hash === '#/tenaga-kerja') return labour();
  if (hash === '#/tabel') return tablePage(state.indicator, state.from, state.to);
  if (hash === '#/sumber') return sources();
  return missing();
}

function render() {
  window.__shotReady = false;
  app.innerHTML = page();
  const titles = {
    '#/': 'NusaData — Indonesia dalam angka',
    '#/ekonomi': 'Ekonomi | NusaData',
    '#/penduduk': 'Penduduk | NusaData',
    '#/tenaga-kerja': 'Tenaga kerja & kesejahteraan | NusaData',
    '#/tabel': 'Tabel data | NusaData',
    '#/sumber': 'Sumber data | NusaData',
  };
  document.title = titles[location.hash] || 'NusaData — Indonesia dalam angka';
  document.querySelectorAll('header nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === location.hash || (href === '#/' && (location.hash === '' || location.hash === '#/'))) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Year-range buttons on the economy page.
document.addEventListener('click', (event) => {
  const rangeButton = event.target.closest('[data-range]');
  if (rangeButton) {
    state.range = rangeButton.getAttribute('data-range');
    render();
    return;
  }
  const sortButton = event.target.closest('[data-sort]');
  if (sortButton) {
    const key = sortButton.getAttribute('data-sort');
    state.sort = state.sort === 'pop-desc' && key === 'pop-desc' ? 'pop-asc' : key;
    render();
  }
});

// Indicator and year selects on the data explorer page.
document.addEventListener('change', (event) => {
  const id = event.target.id;
  if (id === 'indicator-select') {
    state.indicator = event.target.value;
    render();
  } else if (id === 'from-select') {
    state.from = Number(event.target.value);
    if (state.from > state.to) state.to = state.from;
    render();
  } else if (id === 'to-select') {
    state.to = Number(event.target.value);
    if (state.to < state.from) state.from = state.to;
    render();
  }
});

window.addEventListener('hashchange', render);
render();
