// ==========================================
// OBS LIVE BROADCAST MODE & INFO MODAL SCRIPT
// ==========================================

// Info Modal triggers
function openInfoModal() {
  const modal = document.getElementById('info-backdrop');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeInfoModal() {
  const modal = document.getElementById('info-backdrop');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// OBS Live Broadcast Mode State
let obsState = {
  theme: 'dark', // 'dark' | 'light'
  viewMode: 'spotlight', // 'spotlight' | 'table'
  search: '',
  spotlightIndex: 0,
  /** Categorias desativadas (não entram na exibição). Vazio = mostra tudo. */
  disabledStatuses: [],
  /** Ordenação da tabela do Modo OBS. */
  tableSort: { key: 'position', dir: 'asc' },
  carouselResizeBound: false
};

/**
 * Classes de UI adaptadas ao tema atual do modo OBS.
 * Light: cards claros + texto escuro. Dark: cards escuros + texto claro.
 */
function getObsThemeClasses() {
  const isLight = obsState.theme === 'light';

  if (isLight) {
    return {
      isLight: true,
      panel: 'bg-white border border-slate-200 shadow-md',
      card: 'bg-white border-2 border-slate-200 hover:border-red-500/50 shadow-md',
      title: 'text-slate-900',
      muted: 'text-slate-500',
      subtle: 'text-slate-600',
      border: 'border-slate-200',
      countBadge: 'bg-slate-100 text-slate-600',
      chip: 'bg-slate-100 text-red-600 border border-slate-200',
      strongAmber: 'text-amber-600',
      strongRed: 'text-red-600',
      link: 'text-slate-500 hover:text-slate-900',
      empty: 'text-slate-500',
      numEmerald: 'text-emerald-600',
      numAmber: 'text-amber-600',
      numRose: 'text-rose-600',
      spotlight: 'bg-gradient-to-br from-white via-white to-red-50 border-2 border-red-500',
      spotlightMeta: 'bg-slate-50 border border-slate-200',
      spotlightMetaText: 'text-slate-800',
      navBtn: 'bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200',
      carousel: 'bg-white border border-slate-200',
      carouselBtn: 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300',
      tableWrap: 'bg-white border border-slate-200',
      thead: 'bg-slate-50 text-slate-500 border-b border-slate-200',
      tableText: 'text-slate-600',
      tableDivide: 'divide-slate-200',
      rowEven: 'bg-white',
      rowOdd: 'bg-slate-50/80',
      rowHover: 'hover:bg-slate-100',
      accentPos: 'text-red-600'
    };
  }

  return {
    isLight: false,
    panel: 'bg-slate-900/90 border border-slate-800 shadow-lg',
    card: 'bg-slate-900/90 border-2 border-slate-800 hover:border-red-600/60 shadow-xl',
    title: 'text-white',
    muted: 'text-slate-400',
    subtle: 'text-slate-300',
    border: 'border-slate-800',
    countBadge: 'bg-slate-800 text-slate-300',
    chip: 'bg-slate-800 text-red-400 border border-slate-700/80',
    strongAmber: 'text-amber-400',
    strongRed: 'text-red-400',
    link: 'text-slate-400 hover:text-white',
    empty: 'text-slate-400',
    numEmerald: 'text-emerald-400',
    numAmber: 'text-amber-400',
    numRose: 'text-rose-400',
    spotlight: 'bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border-2 border-red-600',
    spotlightMeta: 'bg-slate-950/80 border border-slate-800',
    spotlightMetaText: 'text-slate-200',
    navBtn: 'bg-slate-800 hover:bg-red-600 text-white border border-slate-700',
    carousel: 'bg-slate-900 border border-slate-800',
    carouselBtn: 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700',
    tableWrap: 'bg-slate-900/90 border border-slate-800',
    thead: 'bg-slate-950 text-slate-400 border-b border-slate-800',
    tableText: 'text-slate-300',
    tableDivide: 'divide-slate-800/60',
    rowEven: 'bg-slate-900/50',
    rowOdd: 'bg-slate-950/40',
    rowHover: 'hover:bg-slate-800/50',
    accentPos: 'text-red-400'
  };
}

/**
 * Lê o modo Destaque/Tabela da URL (?mode=destaque|tabela|spotlight|table).
 * @returns {'spotlight'|'table'|null}
 */
function parseObsViewModeFromUrl() {
  const raw = (new URLSearchParams(window.location.search).get('mode') || '').toLowerCase();
  if (raw === 'table' || raw === 'tabela') return 'table';
  if (raw === 'spotlight' || raw === 'destaque') return 'spotlight';
  return null;
}

/**
 * Mantém a URL alinhada ao Modo OBS Live (?view=live&mode=destaque|tabela).
 * @param {boolean} isOpen
 */
function syncObsLiveUrl(isOpen) {
  const url = new URL(window.location.href);
  if (isOpen) {
    url.searchParams.set('view', 'live');
    url.searchParams.set('mode', obsState.viewMode === 'table' ? 'tabela' : 'destaque');
  } else {
    url.searchParams.delete('view');
    url.searchParams.delete('mode');
  }
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    history.replaceState(null, '', next);
  }
}

function isObsLiveUrlActive() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('view') || '').toLowerCase() === 'live';
}

function isObsModalOpen() {
  const modal = document.getElementById('obs-backdrop');
  return !!(modal && !modal.classList.contains('hidden'));
}

/**
 * Abre o Modo OBS Live.
 * @param {{ fromUrl?: boolean }} [options]
 */
function openObsModal(options = {}) {
  const modal = document.getElementById('obs-backdrop');
  if (modal) {
    modal.classList.remove('hidden');
    obsState.spotlightIndex = 0;
    obsState.search = '';
    obsState.disabledStatuses = [];
    window.__obsCarouselScrollLeft = 0;

    if (options.fromUrl) {
      const modeFromUrl = parseObsViewModeFromUrl();
      if (modeFromUrl) obsState.viewMode = modeFromUrl;
    }

    const searchInput = document.getElementById('obs-search');
    if (searchInput) searchInput.value = '';
    applyObsChromeTheme();
    refreshObsViewModeButtons();
    renderObsLiveContent();
    if (window.lucide) lucide.createIcons();
    syncObsLiveUrl(true);
  }
}

/**
 * Categoria de status usada pelos cards de filtro do Modo OBS.
 * @param {object} item
 * @returns {'CONTRATADO'|'ESPECULACAO'|'OUTRO_CLUBE'}
 */
function getObsStatusCategory(item) {
  const norm = (item.status || '').toUpperCase();
  if (norm === 'CONTRATADO') return 'CONTRATADO';
  if (norm === 'FOI PRA OUTRO CLUBE' || norm === 'OUTRO CLUBE') return 'OUTRO_CLUBE';
  return 'ESPECULACAO';
}

/**
 * Alterna ativação de uma categoria nos cards de contagem do Modo OBS.
 * Desativado = card cinza e categoria fora da exibição. Vários podem ficar desativados.
 * @param {'CONTRATADO'|'ESPECULACAO'|'OUTRO_CLUBE'} category
 */
function toggleObsStatusCategory(category) {
  const idx = obsState.disabledStatuses.indexOf(category);
  if (idx >= 0) {
    obsState.disabledStatuses.splice(idx, 1);
  } else {
    obsState.disabledStatuses.push(category);
  }
  obsState.spotlightIndex = 0;
  renderObsLiveContent();
}

function closeObsModal() {
  const modal = document.getElementById('obs-backdrop');
  if (modal) {
    modal.classList.add('hidden');
    syncObsLiveUrl(false);
  }
}

/**
 * Abre o Modo OBS Live se a URL tiver ?view=live (&mode=destaque|tabela).
 */
function initObsLiveFromUrl() {
  if (isObsLiveUrlActive()) {
    openObsModal({ fromUrl: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initObsLiveFromUrl);
} else {
  initObsLiveFromUrl();
}

/**
 * Aplica o tema light/dark no chrome do cabeçalho OBS (título, busca, switchers, fechar).
 */
function applyObsChromeTheme() {
  const isLight = obsState.theme === 'light';
  const header = document.getElementById('obs-header');
  const title = document.getElementById('obs-title');
  const subtitle = document.getElementById('obs-subtitle');
  const search = document.getElementById('obs-search');
  const viewSwitcher = document.getElementById('obs-view-switcher');
  const themeSwitcher = document.getElementById('obs-theme-switcher');
  const closeBtn = document.getElementById('obs-close-btn');
  const btnDark = document.getElementById('obs-theme-dark');
  const btnLight = document.getElementById('obs-theme-light');

  if (header) {
    header.className = isLight
      ? 'bg-white border-b border-slate-200 p-4 sticky top-0 z-50 shadow-md'
      : 'bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl';
  }

  if (title) {
    title.className = isLight
      ? 'text-base font-black text-slate-900 tracking-wide uppercase font-mono'
      : 'text-base font-black text-white tracking-wide uppercase font-mono';
  }

  if (subtitle) {
    subtitle.className = isLight
      ? 'text-[10px] text-slate-500 font-medium'
      : 'text-[10px] text-slate-400 font-medium';
  }

  if (search) {
    search.className = isLight
      ? 'bg-white text-slate-900 placeholder-slate-400 text-xs px-3 py-1.5 pl-8 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 w-36 sm:w-48'
      : 'bg-slate-800 text-white placeholder-slate-400 text-xs px-3 py-1.5 pl-8 rounded-xl border border-slate-700 focus:outline-none focus:border-red-500 w-36 sm:w-48';
  }

  const switcherClass = isLight
    ? 'flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs gap-0.5'
    : 'flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs gap-0.5';

  if (viewSwitcher) viewSwitcher.className = switcherClass;
  if (themeSwitcher) themeSwitcher.className = switcherClass;

  if (closeBtn) {
    closeBtn.className = isLight
      ? 'px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5 cursor-pointer'
      : 'px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer';
  }

  const inactiveThemeBtn = isLight
    ? 'px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer flex items-center gap-1'
    : 'px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1';
  const activeThemeBtn = isLight
    ? 'px-2.5 py-1 rounded-lg font-bold text-white bg-slate-900 transition cursor-pointer flex items-center gap-1'
    : 'px-2.5 py-1 rounded-lg font-bold text-white bg-slate-700 transition cursor-pointer flex items-center gap-1';

  if (btnDark) btnDark.className = obsState.theme === 'dark' ? activeThemeBtn : inactiveThemeBtn;
  if (btnLight) btnLight.className = obsState.theme === 'light' ? activeThemeBtn : inactiveThemeBtn;

  refreshObsViewModeButtons();
}

function refreshObsViewModeButtons() {
  const isLight = obsState.theme === 'light';
  const inactiveClass = isLight
    ? 'px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer'
    : 'px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer';
  const activeClass = 'px-2.5 py-1 rounded-lg font-bold text-white bg-red-600 transition flex items-center gap-1 cursor-pointer';

  ['spotlight', 'table'].forEach(m => {
    const btn = document.getElementById(`obs-view-${m}`);
    if (!btn) return;
    btn.className = m === obsState.viewMode ? activeClass : inactiveClass;
  });
}

function setObsTheme(theme) {
  obsState.theme = theme;
  const backdrop = document.getElementById('obs-backdrop');

  if (!backdrop) return;

  backdrop.classList.remove('bg-slate-950', 'bg-slate-100');
  backdrop.classList.add(theme === 'light' ? 'bg-slate-100' : 'bg-slate-950');

  applyObsChromeTheme();
  renderObsLiveContent();
}

function setObsViewMode(mode) {
  obsState.viewMode = mode === 'table' ? 'table' : 'spotlight';
  obsState.spotlightIndex = 0;
  refreshObsViewModeButtons();
  renderObsLiveContent();
  if (isObsModalOpen()) {
    syncObsLiveUrl(true);
  }
}

function updateObsLiveView() {
  const searchInput = document.getElementById('obs-search');
  if (searchInput) {
    obsState.search = searchInput.value.toLowerCase().trim();
  }
  obsState.spotlightIndex = 0;
  renderObsLiveContent();
}

function renderObsStatsBar(items) {
  const statsContainer = document.getElementById('obs-stats-bar');
  if (!statsContainer) return;

  const t = getObsThemeClasses();
  const disabledPanel = t.isLight
    ? 'bg-slate-200 border border-slate-300 shadow-none'
    : 'bg-slate-800/60 border border-slate-700 shadow-none';
  const disabledMuted = t.isLight ? 'text-slate-500' : 'text-slate-500';
  const disabledNum = t.isLight ? 'text-slate-400' : 'text-slate-500';

  const contratados = items.filter(i => getObsStatusCategory(i) === 'CONTRATADO').length;
  const especulacoes = items.filter(i => getObsStatusCategory(i) === 'ESPECULACAO').length;
  const outroClube = items.filter(i => getObsStatusCategory(i) === 'OUTRO_CLUBE').length;

  const cards = [
    {
      id: 'CONTRATADO',
      label: 'Contratados',
      count: contratados,
      bar: 'bg-emerald-500',
      num: t.numEmerald
    },
    {
      id: 'ESPECULACAO',
      label: 'Especulações',
      count: especulacoes,
      bar: 'bg-amber-500',
      num: t.numAmber
    },
    {
      id: 'OUTRO_CLUBE',
      label: 'Fecharam com outro clube',
      count: outroClube,
      bar: 'bg-rose-500',
      num: t.numRose
    }
  ];

  statsContainer.innerHTML = cards.map(card => {
    const isDisabled = obsState.disabledStatuses.includes(card.id);
    const isOn = !isDisabled;
    return `
      <div class="${isDisabled ? disabledPanel : t.panel} p-3 rounded-2xl flex items-center gap-3 w-full">
        <div class="w-2.5 h-8 ${isDisabled ? 'bg-slate-400' : card.bar} rounded-full shrink-0"></div>
        <div class="min-w-0 flex-1">
          <p class="text-[10px] font-bold ${isDisabled ? disabledMuted : t.muted} uppercase tracking-wider">${card.label}</p>
          <p class="text-xl font-black ${isDisabled ? disabledNum : card.num} font-mono">${card.count}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked="${isOn ? 'true' : 'false'}"
          aria-label="${isOn ? 'Desativar' : 'Ativar'} ${card.label}"
          title="${isOn ? 'Desativar categoria' : 'Ativar categoria'}"
          onclick="toggleObsStatusCategory('${card.id}')"
          class="shrink-0 inline-flex items-center gap-1.5 rounded-full border px-1.5 py-1 cursor-pointer transition select-none ${
            isOn
              ? 'bg-emerald-500/15 border-emerald-500/40'
              : 'bg-slate-500/15 border-slate-500/40'
          }">
          <span class="relative w-9 h-5 rounded-full transition ${isOn ? 'bg-emerald-500' : 'bg-slate-500'}">
            <span class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-4' : 'translate-x-0'}"></span>
          </span>
          <span class="text-[10px] font-black uppercase tracking-wider min-w-[2rem] text-center ${isOn ? (t.isLight ? 'text-emerald-600' : 'text-emerald-400') : 'text-slate-400'}">
            ${isOn ? 'On' : 'Off'}
          </span>
        </button>
      </div>
    `;
  }).join('');
}

/**
 * Ordena como a lista principal do index: POSITIONS_ORDER, depois STATUS_DISPLAY_ORDER.
 * @param {Array} items
 * @returns {Array}
 */
function sortObsItemsLikeMainList(items) {
  const order = window.POSITIONS_ORDER || [];
  return [...items].sort((a, b) => {
    const posA = order.findIndex(p => p.id === (a.position || '').toUpperCase());
    const posB = order.findIndex(p => p.id === (b.position || '').toUpperCase());
    const idxA = posA === -1 ? order.length : posA;
    const idxB = posB === -1 ? order.length : posB;
    if (idxA !== idxB) return idxA - idxB;

    if (typeof window.getStatusSortIndex === 'function') {
      const statusCmp = window.getStatusSortIndex(a.status) - window.getStatusSortIndex(b.status);
      if (statusCmp !== 0) return statusCmp;
    }

    return (a.playerName || '').localeCompare(b.playerName || '', 'pt-BR', { sensitivity: 'base' });
  });
}

// Main Render Function for Live Content
function renderObsLiveContent() {
  const container = document.getElementById('obs-list');
  if (!container) return;

  const allItems = (window.state && window.state.items) ? window.state.items : [];
  renderObsStatsBar(allItems);

  let filtered = allItems;
  if (obsState.disabledStatuses.length > 0) {
    filtered = filtered.filter(i => !obsState.disabledStatuses.includes(getObsStatusCategory(i)));
  }
  if (obsState.search) {
    filtered = filtered.filter(i =>
      i.playerName.toLowerCase().includes(obsState.search) ||
      (i.currentClub && i.currentClub.toLowerCase().includes(obsState.search)) ||
      (i.position && i.position.toLowerCase().includes(obsState.search)) ||
      (i.source && i.source.toLowerCase().includes(obsState.search))
    );
  }

  // Destaque (setas + slider) e base da tabela: mesma ordem do index.html
  filtered = sortObsItemsLikeMainList(filtered);

  if (filtered.length === 0) {
    const t = getObsThemeClasses();
    let emptyMsg = 'Nenhum jogador encontrado.';
    if (obsState.disabledStatuses.length === 3) {
      emptyMsg = 'Todas as categorias estão desativadas. Clique em um card para reativar.';
    } else if (obsState.search && obsState.disabledStatuses.length > 0) {
      emptyMsg = `Nenhum jogador encontrado com a busca "${obsState.search}" nas categorias ativas.`;
    } else if (obsState.search) {
      emptyMsg = `Nenhum jogador encontrado com a busca "${obsState.search}".`;
    } else if (obsState.disabledStatuses.length > 0) {
      emptyMsg = 'Nenhum jogador nas categorias ativas.';
    }
    container.innerHTML = `
      <div class="text-center py-12 ${t.empty}">
        <p class="text-base font-bold">${emptyMsg}</p>
      </div>
    `;
    return;
  }

  switch (obsState.viewMode) {
    case 'table':
      renderObsTableMode(container, filtered);
      break;
    case 'spotlight':
    default:
      renderObsSpotlightMode(container, filtered);
      break;
  }

  if (window.lucide) lucide.createIcons();
}

// ---------------------------------------------------
// DESTAQUES / BANNER MODE (SPOTLIGHT CARD)
// ---------------------------------------------------
function renderObsSpotlightMode(container, filtered) {
  const prevTrack = document.getElementById('obs-carousel-track');
  if (prevTrack) window.__obsCarouselScrollLeft = prevTrack.scrollLeft;

  const t = getObsThemeClasses();

  if (obsState.spotlightIndex >= filtered.length) {
    obsState.spotlightIndex = 0;
  }
  if (obsState.spotlightIndex < 0) {
    obsState.spotlightIndex = filtered.length - 1;
  }

  const currentItem = filtered[obsState.spotlightIndex];
  const badge = window.getStatusBadge ? window.getStatusBadge(currentItem.status) : { bg: 'bg-slate-700 text-slate-200 border-slate-600', text: currentItem.status };
  const normStatus = (currentItem.status || '').toUpperCase();
  const isOutroClube = normStatus === 'OUTRO CLUBE' || normStatus === 'FOI PRA OUTRO CLUBE';
  const hasDestination = isOutroClube && currentItem.destinationClub && currentItem.destinationClub.trim();
  const playerImg = (currentItem.img || '').trim();
  const hasImg = playerImg.length > 0;
  const imgFrame = t.isLight
    ? 'border-slate-200 bg-slate-100'
    : 'border-slate-700 bg-slate-950';

  let html = `
    <div class="space-y-6">
      <!-- Main Spotlight Card -->
      <div class="${t.spotlight} rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col space-y-5">
        
        <!-- Top bar inside spotlight card -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b ${t.border} pb-4">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-red-600 text-white font-black text-xs rounded-lg uppercase tracking-wider font-mono">EM DESTAQUE</span>
            <span class="text-xs font-mono ${t.muted}">JOGADOR ${obsState.spotlightIndex + 1} DE ${filtered.length}</span>
          </div>

          <!-- Spotlight Nav Controls -->
          <div class="flex items-center gap-2">
            <button onclick="spotlightPrev()" class="p-2 ${t.navBtn} rounded-xl transition flex items-center justify-center cursor-pointer">
              <i data-lucide="chevron-left" class="w-5 h-5"></i>
            </button>
            <button onclick="spotlightNext()" class="p-2 ${t.navBtn} rounded-xl transition flex items-center justify-center cursor-pointer">
              <i data-lucide="chevron-right" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Center Player Focus Area -->
        <div class="grid grid-cols-1 ${hasImg ? 'md:grid-cols-12' : 'md:grid-cols-3'} gap-6 items-center">
          ${hasImg ? `
            <div class="md:col-span-2 flex justify-center md:justify-start">
              <img
                src="${playerImg}"
                alt="${currentItem.playerName}"
                class="w-36 h-48 sm:w-40 sm:h-52 rounded-2xl object-contain border ${imgFrame} shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          ` : ''}
          <div class="${hasImg ? 'md:col-span-5' : 'md:col-span-2'} space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 ${t.chip} rounded-lg text-xs font-bold font-mono uppercase">
                ${currentItem.position} ${(currentItem.specificPosition && currentItem.position !== 'GOLEIRO') ? `(${currentItem.specificPosition})` : ''}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badge.bg}">
                ${badge.text}
              </span>
            </div>

            <h2 class="text-3xl sm:text-4xl md:text-5xl font-black ${t.title} tracking-tight leading-tight">
              ${currentItem.playerName}
            </h2>

            <div class="flex flex-wrap items-center gap-4 ${t.subtle} text-sm sm:text-base font-semibold pt-1">
              <div class="flex items-center gap-1.5">
                <i data-lucide="shield" class="w-4 h-4 text-red-500"></i>
                <span>Clube: <strong class="${t.title}">${currentItem.currentClub || 'Sem clube'}</strong></span>
              </div>
              ${hasDestination ? `
                <div class="flex items-center gap-1.5 ${t.strongAmber} font-bold">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                  <span>Contratado por: ${currentItem.destinationClub}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Additional Metadata Box -->
          <div class="${hasImg ? 'md:col-span-5' : ''} ${t.spotlightMeta} p-4 rounded-2xl space-y-3 w-full md:justify-self-end md:max-w-[13.5rem]">
            <div class="space-y-1">
              <span class="text-[10px] uppercase font-bold ${t.muted} font-mono tracking-wider">FONTE DA NOTÍCIA</span>
              <p class="text-sm font-bold ${t.spotlightMetaText}">${currentItem.source || 'Não especificada'}</p>
            </div>
            ${currentItem.sourceUrl ? `
              <a href="${currentItem.sourceUrl}" target="_blank" class="inline-flex items-center gap-1.5 text-xs ${t.strongRed} hover:opacity-80 font-bold transition">
                <span>Ver link da matéria</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            ` : ''}
          </div>
        </div>

      </div>

      <!-- Quick Player Selector Carousel Strip below -->
      <div class="${t.carousel} p-3 rounded-2xl space-y-2">
        <p class="text-[11px] font-bold ${t.muted} uppercase tracking-wider font-mono px-1">Selecione para destacar ao vivo:</p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            id="obs-carousel-prev"
            onclick="scrollObsCarousel(-1)"
            class="p-2 ${t.navBtn} rounded-xl transition shrink-0 flex items-center justify-center cursor-pointer"
            aria-label="Rolar lista para a esquerda"
            title="Anteriores">
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
          </button>

          <div
            id="obs-carousel-wrap"
            class="obs-carousel-wrap relative flex-1 min-w-0 ${t.isLight ? 'obs-carousel-wrap--light' : 'obs-carousel-wrap--dark'}">
            <div
              id="obs-carousel-track"
              class="obs-carousel-track flex items-center gap-2 overflow-x-auto snap-x snap-proximity py-1 px-1">
              ${filtered.map((item, idx) => {
                const isSelected = idx === obsState.spotlightIndex;
                return `
                  <button
                    type="button"
                    onclick="spotlightSelect(${idx})"
                    data-obs-spotlight-selected="${isSelected ? 'true' : 'false'}"
                    class="obs-carousel-chip px-3 py-2 rounded-xl text-xs font-bold transition border shrink-0 snap-start text-left flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : t.carouselBtn
                    }">
                    <span>${item.playerName}</span>
                    <span class="text-[10px] opacity-75 font-mono">(${item.position})</span>
                  </button>
                `;
              }).join('')}
            </div>
            <div class="obs-carousel-fade obs-carousel-fade--left" aria-hidden="true"></div>
            <div class="obs-carousel-fade obs-carousel-fade--right" aria-hidden="true"></div>
          </div>

          <button
            type="button"
            id="obs-carousel-next"
            onclick="scrollObsCarousel(1)"
            class="p-2 ${t.navBtn} rounded-xl transition shrink-0 flex items-center justify-center cursor-pointer"
            aria-label="Rolar lista para a direita"
            title="Próximos">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const savedScroll = typeof window.__obsCarouselScrollLeft === 'number'
    ? window.__obsCarouselScrollLeft
    : 0;

  requestAnimationFrame(() => {
    const track = document.getElementById('obs-carousel-track');
    if (track) track.scrollLeft = savedScroll;
    initObsCarouselUX({ smoothCenter: true });
  });
}

/**
 * Animação suave de scroll horizontal (ease-in-out).
 * @param {HTMLElement} el
 * @param {number} targetLeft
 * @param {number} [duration=560]
 */
function animateObsCarouselScroll(el, targetLeft, duration = 560) {
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  const target = Math.max(0, Math.min(maxScroll, targetLeft));
  const start = el.scrollLeft;
  const delta = target - start;
  if (Math.abs(delta) < 1) {
    el.scrollLeft = target;
    updateObsCarouselChrome();
    return;
  }

  if (el.__obsCarouselAnim) {
    cancelAnimationFrame(el.__obsCarouselAnim);
  }

  const startTime = performance.now();
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const frame = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    el.scrollLeft = start + delta * easeInOut(progress);
    updateObsCarouselChrome();
    if (progress < 1) {
      el.__obsCarouselAnim = requestAnimationFrame(frame);
    } else {
      el.__obsCarouselAnim = null;
      window.__obsCarouselScrollLeft = el.scrollLeft;
    }
  };

  el.__obsCarouselAnim = requestAnimationFrame(frame);
}

/**
 * Rola a faixa de jogadores do Destaque.
 * @param {number} direction -1 esquerda | 1 direita
 */
function scrollObsCarousel(direction) {
  const track = document.getElementById('obs-carousel-track');
  if (!track) return;
  const step = Math.max(180, Math.round(track.clientWidth * 0.45));
  animateObsCarouselScroll(track, track.scrollLeft + direction * step, 520);
}

/**
 * Centraliza o chip do jogador em destaque na faixa horizontal.
 * @param {boolean} [smooth=true]
 */
function scrollObsCarouselToSelected(smooth = true) {
  const track = document.getElementById('obs-carousel-track');
  const selected = track?.querySelector('[data-obs-spotlight-selected="true"]');
  if (!track || !selected) return;

  const trackRect = track.getBoundingClientRect();
  const chipRect = selected.getBoundingClientRect();
  const offset = (chipRect.left + chipRect.width / 2) - (trackRect.left + trackRect.width / 2);
  const target = track.scrollLeft + offset;

  if (smooth) {
    animateObsCarouselScroll(track, target, 560);
  } else {
    track.scrollLeft = target;
    window.__obsCarouselScrollLeft = track.scrollLeft;
    updateObsCarouselChrome();
  }
}

/**
 * Atualiza fades e estado das setas conforme a posição do scroll.
 */
function updateObsCarouselChrome() {
  const track = document.getElementById('obs-carousel-track');
  const wrap = document.getElementById('obs-carousel-wrap');
  const prev = document.getElementById('obs-carousel-prev');
  const next = document.getElementById('obs-carousel-next');
  if (!track || !wrap) return;

  window.__obsCarouselScrollLeft = track.scrollLeft;

  const maxScroll = track.scrollWidth - track.clientWidth;
  const canScroll = maxScroll > 4;
  const atStart = track.scrollLeft <= 2;
  const atEnd = track.scrollLeft >= maxScroll - 2;

  wrap.classList.toggle('obs-carousel-wrap--start', atStart || !canScroll);
  wrap.classList.toggle('obs-carousel-wrap--end', atEnd || !canScroll);

  if (prev) {
    prev.disabled = !canScroll || atStart;
    prev.classList.toggle('opacity-30', prev.disabled);
    prev.classList.toggle('pointer-events-none', prev.disabled);
  }
  if (next) {
    next.disabled = !canScroll || atEnd;
    next.classList.toggle('opacity-30', next.disabled);
    next.classList.toggle('pointer-events-none', next.disabled);
  }
}

/**
 * Liga listeners e posiciona a faixa após renderizar o Destaque.
 * @param {{ smoothCenter?: boolean }} [options]
 */
function initObsCarouselUX(options = {}) {
  const smoothCenter = options.smoothCenter !== false;
  const track = document.getElementById('obs-carousel-track');
  if (!track) return;

  track.addEventListener('scroll', updateObsCarouselChrome, { passive: true });

  if (!obsState.carouselResizeBound) {
    obsState.carouselResizeBound = true;
    window.addEventListener('resize', updateObsCarouselChrome);
  }

  // Espera o layout aplicar scrollLeft restaurado antes de centralizar
  requestAnimationFrame(() => {
    scrollObsCarouselToSelected(smoothCenter);
    updateObsCarouselChrome();
  });
}

function spotlightNext() {
  const track = document.getElementById('obs-carousel-track');
  if (track) window.__obsCarouselScrollLeft = track.scrollLeft;
  obsState.spotlightIndex++;
  renderObsLiveContent();
}

function spotlightPrev() {
  const track = document.getElementById('obs-carousel-track');
  if (track) window.__obsCarouselScrollLeft = track.scrollLeft;
  obsState.spotlightIndex--;
  renderObsLiveContent();
}

function spotlightSelect(index) {
  const track = document.getElementById('obs-carousel-track');
  if (track) window.__obsCarouselScrollLeft = track.scrollLeft;
  obsState.spotlightIndex = index;
  renderObsLiveContent();
}

// ---------------------------------------------------
// 4. RESUMO EXECUTIVO / TABELA MODE (TABLE)
// ---------------------------------------------------

/**
 * Índice da posição conforme POSITIONS_ORDER (app.js).
 * @param {string} position
 * @returns {number}
 */
function getObsPositionSortIndex(position) {
  const order = window.POSITIONS_ORDER || [];
  const idx = order.findIndex(p => p.id === (position || '').toUpperCase());
  return idx === -1 ? order.length : idx;
}

/**
 * Valor textual da coluna Destino / Fonte para ordenação alfabética.
 * @param {object} item
 * @returns {string}
 */
function getObsDestFonteSortValue(item) {
  const normStatus = (item.status || '').toUpperCase();
  const isOutroClube = normStatus === 'OUTRO CLUBE' || normStatus === 'FOI PRA OUTRO CLUBE';
  if (isOutroClube && item.destinationClub && item.destinationClub.trim()) {
    return `Contratado por: ${item.destinationClub}`.trim();
  }
  return (item.source || '-').trim();
}

/**
 * Alterna a ordenação da tabela do Modo OBS ao clicar no título da coluna.
 * @param {'position'|'player'|'club'|'status'|'dest'} key
 */
function setObsTableSort(key) {
  if (obsState.tableSort.key === key) {
    obsState.tableSort.dir = obsState.tableSort.dir === 'asc' ? 'desc' : 'asc';
  } else {
    obsState.tableSort.key = key;
    obsState.tableSort.dir = 'asc';
  }
  renderObsLiveContent();
}

/**
 * Ordena a lista da tabela: posição por POSITIONS_ORDER; demais colunas A–Z.
 * @param {Array} items
 * @returns {Array}
 */
function sortObsTableItems(items) {
  const { key, dir } = obsState.tableSort;
  const mult = dir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    let cmp = 0;

    if (key === 'position') {
      cmp = getObsPositionSortIndex(a.position) - getObsPositionSortIndex(b.position);
      if (cmp === 0 && typeof window.getStatusSortIndex === 'function') {
        cmp = window.getStatusSortIndex(a.status) - window.getStatusSortIndex(b.status);
      }
      if (cmp === 0) {
        cmp = (a.playerName || '').localeCompare(b.playerName || '', 'pt-BR', { sensitivity: 'base' });
      }
    } else if (key === 'player') {
      cmp = (a.playerName || '').localeCompare(b.playerName || '', 'pt-BR', { sensitivity: 'base' });
    } else if (key === 'club') {
      cmp = (a.currentClub || '').localeCompare(b.currentClub || '', 'pt-BR', { sensitivity: 'base' });
    } else if (key === 'status') {
      const sa = window.getStatusBadge ? window.getStatusBadge(a.status).text : (a.status || '');
      const sb = window.getStatusBadge ? window.getStatusBadge(b.status).text : (b.status || '');
      cmp = sa.localeCompare(sb, 'pt-BR', { sensitivity: 'base' });
    } else if (key === 'dest') {
      cmp = getObsDestFonteSortValue(a).localeCompare(getObsDestFonteSortValue(b), 'pt-BR', { sensitivity: 'base' });
    }

    return cmp * mult;
  });
}

/**
 * Cabeçalho clicável da tabela OBS com indicador de ordenação.
 * @param {string} key
 * @param {string} label
 * @param {object} t
 * @returns {string}
 */
function renderObsTableSortHeader(key, label, t) {
  const isActive = obsState.tableSort.key === key;
  const ariaSort = !isActive ? 'none' : (obsState.tableSort.dir === 'asc' ? 'ascending' : 'descending');
  const icon = !isActive
    ? 'chevrons-up-down'
    : (obsState.tableSort.dir === 'asc' ? 'chevron-up' : 'chevron-down');

  return `
    <th class="py-3 px-4" aria-sort="${ariaSort}">
      <button
        type="button"
        onclick="setObsTableSort('${key}')"
        class="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider cursor-pointer transition hover:text-red-500 ${isActive ? t.title : ''}"
        title="Ordenar por ${label}">
        <span>${label}</span>
        <i data-lucide="${icon}" class="w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'opacity-50'}"></i>
      </button>
    </th>
  `;
}

function renderObsTableMode(container, filtered) {
  const t = getObsThemeClasses();
  const sorted = sortObsTableItems(filtered);

  let html = `
    <div class="${t.tableWrap} rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-4 border-b ${t.border} flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="list" class="w-4 h-4 text-red-500"></i>
          <h3 class="text-sm font-black ${t.title} font-mono uppercase tracking-wider">RESUMO GERAL DAS ESPECULAÇÕES</h3>
        </div>
        <span class="text-xs font-mono ${t.muted}">${sorted.length} JOGADORES</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs ${t.tableText}">
          <thead class="${t.thead} font-mono text-[10px] uppercase tracking-wider">
            <tr>
              ${renderObsTableSortHeader('position', 'Posição', t)}
              ${renderObsTableSortHeader('player', 'Jogador', t)}
              ${renderObsTableSortHeader('club', 'Clube Atual', t)}
              ${renderObsTableSortHeader('status', 'Status', t)}
              ${renderObsTableSortHeader('dest', 'Destino / Fonte', t)}
            </tr>
          </thead>
          <tbody class="divide-y ${t.tableDivide} font-medium">
            ${sorted.map((item, idx) => {
              const badge = window.getStatusBadge ? window.getStatusBadge(item.status) : { bg: 'bg-slate-700 text-slate-200 border-slate-600', text: item.status };
              const normStatus = (item.status || '').toUpperCase();
              const isOutroClube = normStatus === 'OUTRO CLUBE' || normStatus === 'FOI PRA OUTRO CLUBE';
              const hasDestination = isOutroClube && item.destinationClub && item.destinationClub.trim();
              const isEven = idx % 2 === 0;

              return `
                <tr class="${isEven ? t.rowEven : t.rowOdd} ${t.rowHover} transition">
                  <td class="py-3 px-4 font-bold ${t.accentPos} font-mono whitespace-nowrap">
                    ${item.position} ${(item.specificPosition && item.position !== 'GOLEIRO') ? `(${item.specificPosition})` : ''}
                  </td>
                  <td class="py-3 px-4 font-black ${t.title} text-sm whitespace-nowrap">
                    ${item.playerName}
                  </td>
                  <td class="py-3 px-4 ${t.subtle} whitespace-nowrap">
                    ${item.currentClub || 'Sem clube'}
                  </td>
                  <td class="py-3 px-4 whitespace-nowrap">
                    <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border inline-block ${badge.bg}">
                      ${badge.text}
                    </span>
                  </td>
                  <td class="py-3 px-4 ${t.muted} text-[11px]">
                    ${hasDestination ? `Contratado por: ${item.destinationClub}` : (item.source || '-')}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.innerHTML = html;
}
