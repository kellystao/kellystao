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
  spotlightIndex: 0
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

function openObsModal() {
  const modal = document.getElementById('obs-backdrop');
  if (modal) {
    modal.classList.remove('hidden');
    obsState.spotlightIndex = 0;
    obsState.search = '';
    const searchInput = document.getElementById('obs-search');
    if (searchInput) searchInput.value = '';
    applyObsChromeTheme();
    renderObsLiveContent();
    if (window.lucide) lucide.createIcons();
  }
}

function closeObsModal() {
  const modal = document.getElementById('obs-backdrop');
  if (modal) {
    modal.classList.add('hidden');
  }
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
  obsState.viewMode = mode;
  obsState.spotlightIndex = 0;
  refreshObsViewModeButtons();
  renderObsLiveContent();
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

  const contratados = items.filter(i => {
    const norm = (i.status || '').toUpperCase();
    return norm === 'CONTRATADO' || norm === 'FECHADO' || norm === 'CONFIRMADO';
  }).length;

  const especulacoes = items.filter(i => {
    const norm = (i.status || '').toUpperCase();
    return norm !== 'CONTRATADO' && norm !== 'FECHADO' && norm !== 'CONFIRMADO' && norm !== 'DESCARTADO' && norm !== 'FOI PRA OUTRO CLUBE' && norm !== 'OUTRO CLUBE';
  }).length;

  const descartados = items.filter(i => {
    const norm = (i.status || '').toUpperCase();
    return norm === 'DESCARTADO' || norm === 'FOI PRA OUTRO CLUBE' || norm === 'OUTRO CLUBE';
  }).length;

  statsContainer.innerHTML = `
    <div class="${t.panel} p-3 rounded-2xl flex items-center gap-3">
      <div class="w-2.5 h-8 bg-emerald-500 rounded-full shrink-0"></div>
      <div>
        <p class="text-[10px] font-bold ${t.muted} uppercase tracking-wider">Contratados</p>
        <p class="text-xl font-black ${t.numEmerald} font-mono">${contratados}</p>
      </div>
    </div>
    <div class="${t.panel} p-3 rounded-2xl flex items-center gap-3">
      <div class="w-2.5 h-8 bg-amber-500 rounded-full shrink-0"></div>
      <div>
        <p class="text-[10px] font-bold ${t.muted} uppercase tracking-wider">Especulações</p>
        <p class="text-xl font-black ${t.numAmber} font-mono">${especulacoes}</p>
      </div>
    </div>
    <div class="${t.panel} p-3 rounded-2xl flex items-center gap-3">
      <div class="w-2.5 h-8 bg-rose-500 rounded-full shrink-0"></div>
      <div>
        <p class="text-[10px] font-bold ${t.muted} uppercase tracking-wider">Fecharam com outro clube</p>
        <p class="text-xl font-black ${t.numRose} font-mono">${descartados}</p>
      </div>
    </div>
  `;
}

// Main Render Function for Live Content
function renderObsLiveContent() {
  const container = document.getElementById('obs-list');
  if (!container) return;

  const allItems = (window.state && window.state.items) ? window.state.items : [];
  renderObsStatsBar(allItems);

  let filtered = allItems;
  if (obsState.search) {
    filtered = filtered.filter(i =>
      i.playerName.toLowerCase().includes(obsState.search) ||
      (i.currentClub && i.currentClub.toLowerCase().includes(obsState.search)) ||
      (i.position && i.position.toLowerCase().includes(obsState.search)) ||
      (i.source && i.source.toLowerCase().includes(obsState.search))
    );
  }

  if (filtered.length === 0) {
    const t = getObsThemeClasses();
    container.innerHTML = `
      <div class="text-center py-12 ${t.empty}">
        <p class="text-base font-bold">Nenhum jogador encontrado com a busca "${obsState.search}".</p>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div class="md:col-span-2 space-y-3">
            <div class="flex items-center gap-2">
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
                <span>Clube Atual: <strong class="${t.title}">${currentItem.currentClub || 'Sem clube'}</strong></span>
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
          <div class="${t.spotlightMeta} p-5 rounded-2xl space-y-3">
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
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          ${filtered.map((item, idx) => {
            const isSelected = idx === obsState.spotlightIndex;
            return `
              <button
                onclick="spotlightSelect(${idx})"
                class="px-3 py-2 rounded-xl text-xs font-bold transition border shrink-0 text-left flex items-center gap-2 cursor-pointer ${
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
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function spotlightNext() {
  obsState.spotlightIndex++;
  renderObsLiveContent();
}

function spotlightPrev() {
  obsState.spotlightIndex--;
  renderObsLiveContent();
}

function spotlightSelect(index) {
  obsState.spotlightIndex = index;
  renderObsLiveContent();
}

// ---------------------------------------------------
// 4. RESUMO EXECUTIVO / TABELA MODE (TABLE)
// ---------------------------------------------------
function renderObsTableMode(container, filtered) {
  const t = getObsThemeClasses();

  let html = `
    <div class="${t.tableWrap} rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-4 border-b ${t.border} flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="list" class="w-4 h-4 text-red-500"></i>
          <h3 class="text-sm font-black ${t.title} font-mono uppercase tracking-wider">RESUMO GERAL DAS ESPECULAÇÕES</h3>
        </div>
        <span class="text-xs font-mono ${t.muted}">${filtered.length} JOGADORES</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs ${t.tableText}">
          <thead class="${t.thead} font-mono text-[10px] uppercase tracking-wider">
            <tr>
              <th class="py-3 px-4">Posição</th>
              <th class="py-3 px-4">Jogador</th>
              <th class="py-3 px-4">Clube Atual</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Destino / Fonte</th>
            </tr>
          </thead>
          <tbody class="divide-y ${t.tableDivide} font-medium">
            ${filtered.map((item, idx) => {
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
                    ${hasDestination ? `<strong class="${t.strongAmber}">Contratado por: ${item.destinationClub}</strong>` : (item.source || '-')}
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
