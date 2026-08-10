// Kellystão - Mercado do Flamengo (Clean & Minimalist JS App)

const INITIAL_SPECULATIONS = [
    // GOLEIROS
    { id: '1', playerName: 'Gabriel Brasão', position: 'GOLEIRO', specificPosition: '', currentClub: 'Santos', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '2', playerName: 'Pedro Morisco', position: 'GOLEIRO', specificPosition: '', currentClub: 'Coritiba', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '3', playerName: 'Andrew', position: 'GOLEIRO', specificPosition: '', currentClub: 'Gil Vicente', status: 'CONTRATADO', source: '', sourceUrl: '' },
    { id: '4', playerName: 'Micael', position: 'GOLEIRO', specificPosition: '', currentClub: 'Athletico Paranaense', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
  
    // ZAGUEIROS
    { id: '5', playerName: 'Vitão', position: 'ZAGUEIRO', specificPosition: 'ZD', currentClub: 'Internacional', status: 'CONTRATADO', source: '', sourceUrl: '' },
  
    // LATERAIS
    { id: '6', playerName: 'Caio Henrique', position: 'LATERAL', specificPosition: 'LE', currentClub: 'Mônaco', status: 'ESPECULAÇÃO', source: 'Coluna Fla', sourceUrl: '' },
    { id: '7', playerName: 'Wellington', position: 'LATERAL', specificPosition: 'LE', currentClub: 'Southampton', status: 'ESPECULAÇÃO', source: 'UOL', sourceUrl: '' },
  
    // MEIO CAMPO
    { id: '8', playerName: 'Santiago Sosa', position: 'MEIA', specificPosition: 'MC', currentClub: 'Racing', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '9', playerName: 'Lucas Paquetá', position: 'MEIA', specificPosition: 'MC', currentClub: 'West Ham', status: 'CONTRATADO', source: '', sourceUrl: '' },
    { id: '10', playerName: 'Breno Bidon', position: 'MEIA', specificPosition: 'VOL', currentClub: 'Corinthians', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '11', playerName: 'Marco Antônio', position: 'MEIA', specificPosition: 'VOL', currentClub: 'São Paulo', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '12', playerName: 'Yannick Carrasco', position: 'MEIA', specificPosition: 'ME', currentClub: 'Al Shabab', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '13', playerName: 'Gerson', position: 'MEIA', specificPosition: 'MC', currentClub: 'Zenit', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '14', playerName: 'Zé Lucas', position: 'MEIA', specificPosition: 'VOL', currentClub: 'Sport', status: 'OUTRO CLUBE', destinationClub: 'Cruzeiro', source: '', sourceUrl: '' },
    { id: '15', playerName: 'Joel Romero', position: 'MEIA', specificPosition: 'MC', currentClub: 'América de Cáli', status: 'ESPECULAÇÃO', source: 'Coluna Fla', sourceUrl: '' },
    { id: '16', playerName: 'Thiago Almada', position: 'MEIA', specificPosition: 'MA', currentClub: 'Atlético de Madrid', status: 'OUTRO CLUBE', destinationClub: 'River Plate', source: '', sourceUrl: '' },
    { id: '17', playerName: 'Danilo', position: 'MEIA', specificPosition: 'VOL', currentClub: 'Botafogo', status: 'ESPECULACÃO', source: '', sourceUrl: '' },
    { id: '18', playerName: 'Matvey Kislyak', position: 'MEIA', specificPosition: 'VOL', currentClub: 'CSKA', status: 'ESPECULAÇÃO', source: 'Eurofootball', sourceUrl: '' },
    { id: '19', playerName: 'Alex Luna', position: 'MEIA', specificPosition: 'MA', currentClub: 'Instituto ACC', status: 'ESPECULAÇÃO', source: 'Planeta do Flamengo (@flainfos no X)', sourceUrl: '' },
    { id: '20', playerName: 'João Gomes', position: 'MEIA', specificPosition: 'VOL', currentClub: 'Wolverhampton', status: 'ESPECULAÇÃO', source: 'Paparazzo Rubro Negro', sourceUrl: '' },
    { id: '21', playerName: 'Claudinho', position: 'MEIA', specificPosition: 'MA', currentClub: 'Al Sadd', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '22', playerName: 'Bernardo Silva', position: 'MEIA', specificPosition: 'MA', currentClub: 'Manchester City', status: 'ESPECULAÇÃO', source: 'Paparazzo Rubro Negro', sourceUrl: '' },
  
    // PONTAS
    { id: '23', playerName: 'Jhon Árias', position: 'PONTA', specificPosition: 'PD', currentClub: 'Wolverhampton', status: 'OUTRO CLUBE', destinationClub: 'Palmeiras', source: '', sourceUrl: '' },
    { id: '24', playerName: 'Antoine Griezmann', position: 'PONTA', specificPosition: 'SA', currentClub: 'Atlético de Madrid', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '25', playerName: 'Santino Andino', position: 'PONTA', specificPosition: 'PE', currentClub: 'Colón', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '26', playerName: 'Exequiel Zeballos', position: 'PONTA', specificPosition: 'PE', currentClub: 'Boca', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '27', playerName: 'Luiz Henrique', position: 'PONTA', specificPosition: 'PD', currentClub: 'Zenit', status: 'ESPECULAÇÃO', source: 'diversas fontes', sourceUrl: '' },
    { id: '28', playerName: 'Léo Scienza', position: 'PONTA', specificPosition: 'PE', currentClub: 'Southampton', status: 'ESPECULAÇÃO', source: 'Momento Rubro Negro', sourceUrl: '' },
    { id: '29', playerName: 'Malcom', position: 'PONTA', specificPosition: 'PD', currentClub: 'Al Hilal', status: 'ESPECULAÇÃO', source: 'Sporting News', sourceUrl: '' },
  
    // ATACANTES
    { id: '30', playerName: 'Taty Castellanos', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'West Ham', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '31', playerName: 'Lucas Beltrán', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Valência', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '32', playerName: 'Darwin Núñez', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Al Hilal', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '33', playerName: 'Marcos Leonardo', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Al Hilal', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '34', playerName: 'David Washington', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Chelsea', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '35', playerName: 'Kaio Jorge', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Cruzeiro', status: 'ESPECULAÇÃO', source: 'Globo Esporte', sourceUrl: '' },
    { id: '36', playerName: 'Yuri Alberto', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Corinthians', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '37', playerName: 'Kauã Elias', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Shakhtar', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '38', playerName: 'Luís Suárez', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Sporting', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '39', playerName: 'Alejo Veliz', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Tottenham', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '40', playerName: 'Rodrigo Muniz', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Fulham', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '41', playerName: 'Vitinha', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Genoa', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '42', playerName: 'Richarlison', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Tottenham', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '43', playerName: 'Paulo Dybala', position: 'ATACANTE', specificPosition: 'SA', currentClub: 'Roma', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '44', playerName: 'Julián Quiñones', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Al Qadsiah', status: 'ESPECULAÇÃO', source: 'Ekren Konur', sourceUrl: '' },
    { id: '45', playerName: 'Igor Jesus', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Nottingham', status: 'ESPECULAÇÃO', source: 'Júlio Miguel Neto', sourceUrl: '' },
    { id: '46', playerName: 'David Romero', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Tigres', status: 'ESPECULAÇÃO', source: '', sourceUrl: '' },
    { id: '47', playerName: 'Diego Reyes', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'América México (sub-20)', status: 'CONTRATADO', source: 'Gazeta do Urubu', sourceUrl: '' },
    { id: '48', playerName: 'Mikey Johnstonkey', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'West Bromwich Albion', status: 'ESPECULAÇÃO', source: 'Paparazzo Rubro Negro', sourceUrl: '' },
    { id: '49', playerName: 'Romelu Calleri', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'São Paulo', status: 'ESPECULAÇÃO', source: 'ESPN', sourceUrl: '' },
    { id: '50', playerName: 'Robinho Júnior', position: 'ATACANTE', specificPosition: 'PE', currentClub: 'Santos', status: 'ESPECULAÇÃO', source: 'ESPN', sourceUrl: '' },
    { id: '51', playerName: 'Romelu Lukaku', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Napoli', status: 'ESPECULAÇÃO', source: 'Aupseven', sourceUrl: '' },
    { id: '52', playerName: 'Kevin Viveros', position: 'ATACANTE', specificPosition: 'CA', currentClub: 'Athletico Paranaense', status: 'ESPECULAÇÃO', source: 'GE', sourceUrl: '' }
  ];
  
  /**
   * Lista de todas as categorias de posições disponíveis na aplicação.
   * @type {string[]}
   */
  const ALL_POSITIONS = ['GOLEIRO', 'ZAGUEIRO', 'LATERAL', 'MEIA', 'PONTA', 'ATACANTE'];
  
  /**
   * Lista de todos os tipos de status possíveis para um jogador especulado.
   * @type {string[]}
   */
  const ALL_STATUSES = ['ESPECULAÇÃO', 'CONTRATADO', 'OUTRO CLUBE', 'DESCARTADO'];
  
  /**
   * Estado global reativo da aplicação.
   * @type {{ items: Array, selectedPositions: string[], selectedStatuses: string[], openDropdown: (string|null) }}
   */
  let state = {
    items: JSON.parse(JSON.stringify(INITIAL_SPECULATIONS)),
    selectedPositions: [...ALL_POSITIONS],
    selectedStatuses: [...ALL_STATUSES],
    openDropdown: null // 'position' | 'status' | null
  };
  
  // Disponibiliza o estado globalmente para scripts externos (ex: live.js)
  window.state = state;
  
  /**
   * Mapeamento e ordenação visual das posições para exibição no painel.
   * @type {Array<{ id: string, title: string }>}
   */
  const POSITIONS_ORDER = [
    { id: 'GOLEIRO', title: 'Goleiros' },
    { id: 'ZAGUEIRO', title: 'Zagueiros' },
    { id: 'LATERAL', title: 'Laterais' },
    { id: 'MEIA', title: 'Meio Campo' },
    { id: 'PONTA', title: 'Pontas' },
    { id: 'ATACANTE', title: 'Atacantes' }
  ];
  
  window.POSITIONS_ORDER = POSITIONS_ORDER;
  
  /**
   * Retorna as configurações de estilo Tailwind e o texto formatado para o selo (badge) de status do jogador.
   * 
   * @param {string} status - O status atual do jogador (ex: 'CONTRATADO', 'OUTRO CLUBE', 'DESCARTADO', 'ESPECULAÇÃO').
   * @returns {{ bg: string, text: string }} Objeto contendo as classes CSS de estilo e o texto a ser exibido no selo.
   */
  function getStatusBadge(status) {
    const norm = (status || '').toUpperCase();
    if (norm === 'CONTRATADO' || norm === 'FECHADO' || norm === 'CONFIRMADO') {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        text: 'CONTRATADO'
      };
    }
    if (norm === 'FOI PRA OUTRO CLUBE' || norm === 'OUTRO CLUBE') {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
        text: 'FOI PRA OUTRO TIME'
      };
    }
    if (norm === 'DESCARTADO') {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
        text: 'DESCARTADO'
      };
    }
    return {
      bg: 'bg-slate-100 text-slate-600 border-slate-200/80',
      text: 'ESPECULAÇÃO'
    };
  }
  
  window.getStatusBadge = getStatusBadge;
  
  /**
   * Retorna a lista de jogadores filtrada conforme os filtros ativos de posição e status.
   * 
   * @returns {Array} Lista contendo apenas os jogadores que correspondem aos critérios selecionados.
   */
  function getFilteredItems() {
    return state.items.filter(item => {
      const matchPos = state.selectedPositions.includes(item.position);
      
      let itemNormalizedStatus = 'ESPECULAÇÃO';
      const norm = (item.status || '').toUpperCase();
      if (norm === 'CONTRATADO' || norm === 'FECHADO' || norm === 'CONFIRMADO') {
        itemNormalizedStatus = 'CONTRATADO';
      } else if (norm === 'FOI PRA OUTRO CLUBE' || norm === 'OUTRO CLUBE') {
        itemNormalizedStatus = 'OUTRO CLUBE';
      } else if (norm === 'DESCARTADO') {
        itemNormalizedStatus = 'DESCARTADO';
      }
  
      const matchStatus = state.selectedStatuses.includes(itemNormalizedStatus);
  
      return matchPos && matchStatus;
    });
  }
  
  /**
   * Alterna a visibilidade (abrir/fechar) de um menu suspenso de filtro.
   * 
   * @param {string} dropdownName - O identificador do dropdown ('position' ou 'status').
   * @param {Event} [event] - O evento de clique opcional para evitar propagação.
   */
  function toggleDropdown(dropdownName, event) {
    if (event) event.stopPropagation();
    state.openDropdown = state.openDropdown === dropdownName ? null : dropdownName;
    renderDropdowns();
  }
  
  /**
   * Fecha qualquer menu suspenso de filtro que esteja atualmente aberto.
   */
  function closeDropdowns() {
    if (state.openDropdown) {
      state.openDropdown = null;
      renderDropdowns();
    }
  }
  
  /**
   * Alterna a seleção de uma posição individual no filtro de posições.
   * 
   * @param {string} posId - O identificador da posição (ex: 'GOLEIRO', 'MEIA').
   */
  function togglePosition(posId) {
    if (state.selectedPositions.includes(posId)) {
      state.selectedPositions = state.selectedPositions.filter(p => p !== posId);
    } else {
      state.selectedPositions.push(posId);
    }
    render();
  }
  
  /**
   * Marca todas as posições caso alguma esteja desmarcada, ou desmarca todas se todas já estiverem selecionadas.
   */
  function toggleAllPositions() {
    if (state.selectedPositions.length === ALL_POSITIONS.length) {
      state.selectedPositions = [];
    } else {
      state.selectedPositions = [...ALL_POSITIONS];
    }
    render();
  }
  
  /**
   * Alterna a seleção de um status individual no filtro de status.
   * 
   * @param {string} stId - O identificador do status (ex: 'CONTRATADO', 'ESPECULAÇÃO').
   */
  function toggleStatus(stId) {
    if (state.selectedStatuses.includes(stId)) {
      state.selectedStatuses = state.selectedStatuses.filter(s => s !== stId);
    } else {
      state.selectedStatuses.push(stId);
    }
    render();
  }
  
  /**
   * Marca todos os status caso algum esteja desmarcado, ou desmarca todos se todos já estiverem selecionados.
   */
  function toggleAllStatuses() {
    if (state.selectedStatuses.length === ALL_STATUSES.length) {
      state.selectedStatuses = [];
    } else {
      state.selectedStatuses = [...ALL_STATUSES];
    }
    render();
  }
  
  /**
   * Restaura todos os filtros de posições e status para a seleção padrão (todos selecionados).
   */
  function resetFilters() {
    state.selectedPositions = [...ALL_POSITIONS];
    state.selectedStatuses = [...ALL_STATUSES];
    state.openDropdown = null;
    render();
  }
  
  /**
   * Renderiza a interface do menu suspenso (dropdown) de filtro por Posição.
   */
  function renderPositionDropdown() {
    const container = document.getElementById('position-dropdown-container');
    if (!container) return;
  
    const totalPosCount = ALL_POSITIONS.length;
    const selectedCount = state.selectedPositions.length;
    const isAllSelected = selectedCount === totalPosCount;
    const isOpen = state.openDropdown === 'position';
  
    let buttonLabel = 'Posições: Todas';
    if (selectedCount === 0) {
      buttonLabel = 'Posição: Nenhuma';
    } else if (selectedCount === 1) {
      const single = POSITIONS_ORDER.find(p => p.id === state.selectedPositions[0]);
      buttonLabel = `Posição: ${single ? single.title : state.selectedPositions[0]}`;
    } else if (!isAllSelected) {
      buttonLabel = `Posições (${selectedCount} sel.)`;
    }
  
    const btnActiveClass = (!isAllSelected || isOpen)
      ? 'bg-slate-900 text-white border-slate-900 shadow-sm dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700';
  
    let html = `
      <button
        onclick="toggleDropdown('position', event)"
        class="px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${btnActiveClass}">
        <i data-lucide="users" class="w-4 h-4"></i>
        <span>${buttonLabel}</span>
        <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-3.5 h-3.5 opacity-70"></i>
      </button>
    `;
  
    if (isOpen) {
      html += `
        <div onclick="event.stopPropagation()" class="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-40 p-3 animate-fade-in space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 px-1">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Posições</span>
            <button onclick="toggleAllPositions()" class="text-[11px] text-red-600 dark:text-red-400 hover:text-red-700 font-semibold hover:underline">
              ${isAllSelected ? 'Desmarcar todas' : 'Marcar todas'}
            </button>
          </div>
  
          <div class="space-y-1 max-h-60 overflow-y-auto pr-1">
            ${POSITIONS_ORDER.map(pos => {
              const isChecked = state.selectedPositions.includes(pos.id);
              const count = state.items.filter(i => i.position === pos.id).length;
  
              return `
                <label class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer select-none transition">
                  <div class="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      ${isChecked ? 'checked' : ''}
                      onchange="togglePosition('${pos.id}')"
                      class="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span class="text-xs font-medium text-slate-700 dark:text-slate-200">${pos.title}</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">${count}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  
    container.innerHTML = html;
  }
  
  /**
   * Renderiza a interface do menu suspenso (dropdown) de filtro por Status.
   */
  function renderStatusDropdown() {
    const container = document.getElementById('status-dropdown-container');
    if (!container) return;
  
    const totalStatusCount = ALL_STATUSES.length;
    const selectedCount = state.selectedStatuses.length;
    const isAllSelected = selectedCount === totalStatusCount;
    const isOpen = state.openDropdown === 'status';
  
    let buttonLabel = 'Status: Todos';
    if (selectedCount === 0) {
      buttonLabel = 'Status: Nenhum';
    } else if (selectedCount === 1) {
      const stTitleMap = { 'ESPECULAÇÃO': 'Especulação', 'CONTRATADO': 'Contratado', 'OUTRO CLUBE': 'Foi pra outro time', 'DESCARTADO': 'Descartado' };
      buttonLabel = `Status: ${stTitleMap[state.selectedStatuses[0]] || state.selectedStatuses[0]}`;
    } else if (!isAllSelected) {
      buttonLabel = `Status (${selectedCount} sel.)`;
    }
  
    const btnActiveClass = (!isAllSelected || isOpen)
      ? 'bg-slate-900 text-white border-slate-900 shadow-sm dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700';
  
    const statusList = [
      { id: 'ESPECULAÇÃO', title: 'Especulação', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
      { id: 'CONTRATADO', title: 'Contratado', badgeClass: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' },
      { id: 'OUTRO CLUBE', title: 'Foi pra outro time', badgeClass: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300' },
      { id: 'DESCARTADO', title: 'Descartado', badgeClass: 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300' }
    ];
  
    let html = `
      <button
        onclick="toggleDropdown('status', event)"
        class="px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${btnActiveClass}">
        <i data-lucide="filter" class="w-4 h-4"></i>
        <span>${buttonLabel}</span>
        <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-3.5 h-3.5 opacity-70"></i>
      </button>
    `;
  
    if (isOpen) {
      html += `
        <div onclick="event.stopPropagation()" class="absolute left-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-40 p-3 animate-fade-in space-y-2">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 px-1">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Status</span>
            <button onclick="toggleAllStatuses()" class="text-[11px] text-red-600 dark:text-red-400 hover:text-red-700 font-semibold hover:underline">
              ${isAllSelected ? 'Desmarcar todos' : 'Marcar todos'}
            </button>
          </div>
  
          <div class="space-y-1">
            ${statusList.map(st => {
              const isChecked = state.selectedStatuses.includes(st.id);
              const count = state.items.filter(item => {
                const norm = (item.status || '').toUpperCase();
                if (st.id === 'CONTRATADO') return norm === 'CONTRATADO' || norm === 'FECHADO' || norm === 'CONFIRMADO';
                if (st.id === 'OUTRO CLUBE') return norm === 'FOI PRA OUTRO CLUBE' || norm === 'OUTRO CLUBE';
                if (st.id === 'DESCARTADO') return norm === 'DESCARTADO';
                return norm !== 'CONTRATADO' && norm !== 'FECHADO' && norm !== 'CONFIRMADO' && norm !== 'DESCARTADO' && norm !== 'FOI PRA OUTRO CLUBE' && norm !== 'OUTRO CLUBE';
              }).length;
  
              return `
                <label class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer select-none transition">
                  <div class="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      ${isChecked ? 'checked' : ''}
                      onchange="toggleStatus('${st.id}')"
                      class="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span class="text-xs font-medium text-slate-700 dark:text-slate-200">${st.title}</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${st.badgeClass}">${count}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  
    container.innerHTML = html;
  }
  
  /**
   * Renderiza o botão de "Restaurar Filtros" caso os filtros selecionados difiram do estado padrão.
   */
  function renderResetFiltersContainer() {
    const container = document.getElementById('reset-filters-container');
    if (!container) return;
  
    const isCustomized = state.selectedPositions.length < ALL_POSITIONS.length || state.selectedStatuses.length < ALL_STATUSES.length;
  
    if (isCustomized) {
      container.innerHTML = `
        <button
          onclick="resetFilters()"
          class="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-xl border border-slate-200 transition flex items-center gap-1.5"
          title="Restaurar todos os filtros">
          <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
          <span>Restaurar</span>
        </button>
      `;
    } else {
      container.innerHTML = '';
    }
  }
  
  /**
   * Atualiza o texto informativo com a contagem de jogadores exibidos versus o total cadastrado.
   */
  function renderFilterCounter() {
    const container = document.getElementById('filter-counter');
    if (!container) return;
  
    const filteredItems = getFilteredItems();
    container.innerHTML = `Mostrando <strong class="text-slate-900 font-bold">${filteredItems.length}</strong> de <strong class="text-slate-900 font-bold">${state.items.length}</strong> jogadores`;
  }
  
  /**
   * Atualiza a renderização de todos os elementos da barra de filtros e reinicializa os ícones.
   */
  function renderDropdowns() {
    renderPositionDropdown();
    renderStatusDropdown();
    renderResetFiltersContainer();
    renderFilterCounter();
    lucide.createIcons();
  }
  
  /**
   * Renderiza as seções de posições e os cards dos jogadores na tela, agrupados e ordenados.
   */
  function renderSections() {
    const container = document.getElementById('sections-container');
    if (!container) return;
  
    const filteredItems = getFilteredItems();
  
    if (filteredItems.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <i data-lucide="search-x" class="w-10 h-10 text-slate-400 mx-auto mb-3"></i>
          <h3 class="text-base font-bold text-slate-800">Nenhum jogador encontrado</h3>
          <p class="text-xs text-slate-500 mt-1">Tente ajustar os filtros selecionados nos seletores.</p>
          <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition">
            Restaurar Filtros
          </button>
        </div>
      `;
      lucide.createIcons();
      return;
    }
  
    // Determina quais grupos de posição devem ser exibidos
    const activeGroupIds = POSITIONS_ORDER
      .map(p => p.id)
      .filter(posId => state.selectedPositions.includes(posId));
  
    let html = '';
  
    activeGroupIds.forEach(posId => {
      const groupItems = filteredItems.filter(i => i.position === posId);
      if (groupItems.length === 0) return;
  
      // Ordena para que jogadores com status CONTRATADO fiquem no topo
      groupItems.sort((a, b) => {
        const aNorm = (a.status || '').toUpperCase();
        const bNorm = (b.status || '').toUpperCase();
        const aIsContratado = (aNorm === 'CONTRATADO' || aNorm === 'FECHADO' || aNorm === 'CONFIRMADO') ? 1 : 0;
        const bIsContratado = (bNorm === 'CONTRATADO' || bNorm === 'FECHADO' || bNorm === 'CONFIRMADO') ? 1 : 0;
        return bIsContratado - aIsContratado;
      });
  
      const posMeta = POSITIONS_ORDER.find(p => p.id === posId) || { title: posId };
  
      html += `
        <div class="space-y-4">
          <!-- Título da Seção da Posição -->
          <div class="section-title-line">
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">${posMeta.title}</h2>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-600 font-mono">
              ${groupItems.length}
            </span>
          </div>
  
          <!-- Grade de Cards de Jogadores -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${groupItems.map(item => {
              const badge = getStatusBadge(item.status);
              const normStatus = (item.status || '').toUpperCase();
              const isOutroClube = normStatus === 'OUTRO CLUBE' || normStatus === 'FOI PRA OUTRO CLUBE';
              const hasDestination = isOutroClube && item.destinationClub && item.destinationClub.trim();
              const hasSource = item.source && item.source.trim() && item.source.trim().toLowerCase() !== 'não informado';
              const linkUrl = (item.sourceUrl || item.url || '').trim();
              const hasUrl = linkUrl.length > 0;
  
              return `
                <div class="clean-card group relative flex flex-col justify-between">
                  <div>
                    <!-- Linha Superior: Nome do Jogador + Posição Específica + Selo de Status -->
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="flex items-center gap-2 flex-wrap">
                          <h3 class="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            ${item.playerName}
                          </h3>
                          ${(item.specificPosition && item.position !== 'GOLEIRO') ? `
                            <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-slate-100 text-slate-700 border border-slate-200" title="Posição Específica">
                              ${item.specificPosition}
                            </span>
                          ` : ''}
                        </div>
                        <p class="text-xs font-medium text-slate-500 mt-0.5">
                          Clube: ${item.currentClub || 'Sem clube'}
                        </p>
                      </div>
  
                      <div class="shrink-0">
                        <span class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${badge.bg}">
                          ${badge.text}
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Rodapé do Card: Clube de Destino (se houver) e Fonte da Notícia -->
                  ${(hasDestination || hasSource) ? `
                    <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-y-1 gap-x-2 text-xs">
                      ${hasDestination ? `
                        <div class="flex items-center gap-1 text-slate-500 font-medium">
                          <span>Contratado por:</span>
                          <span class="text-slate-900 font-bold">${item.destinationClub}</span>
                        </div>
                      ` : ''}
  
                      ${hasSource ? `
                        <div class="flex items-center gap-1 text-slate-500 font-medium ${hasDestination ? 'ml-auto' : ''}">
                          <span>Visto em:</span>
                          ${hasUrl ? `
                            <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-700 hover:underline font-medium inline-flex items-center gap-1">
                              <span>${item.source}</span>
                              <i data-lucide="external-link" class="w-3 h-3 text-red-600"></i>
                            </a>
                          ` : `
                            <span class="text-slate-700 font-medium">${item.source}</span>
                          `}
                        </div>
                      ` : ''}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
  
    container.innerHTML = html;
    lucide.createIcons();
  }
  
  /**
   * Função mestre que coordena e dispara a atualização completa da interface (filtros e seções).
   */
  function render() {
    renderDropdowns();
    renderSections();
  }
  
  // Fecha os menus suspensos ao clicar em qualquer lugar fora deles na página
  document.addEventListener('click', (e) => {
    const posContainer = document.getElementById('position-dropdown-container');
    const statusContainer = document.getElementById('status-dropdown-container');
  
    if (state.openDropdown) {
      if (posContainer && posContainer.contains(e.target)) return;
      if (statusContainer && statusContainer.contains(e.target)) return;
      closeDropdowns();
    }
  });
  
  /**
   * Gerencia o tema claro / escuro do site principal.
   */
  function initSiteTheme() {
    const savedTheme = localStorage.getItem('site_theme') || 'light';
    setSiteTheme(savedTheme);
  }
  
  function toggleSiteTheme() {
    const isDark = document.body.classList.contains('dark');
    setSiteTheme(isDark ? 'light' : 'dark');
  }
  
  function setSiteTheme(theme) {
    const btn = document.getElementById('site-theme-toggle');
    const icon = document.getElementById('site-theme-icon');
    const label = document.getElementById('site-theme-text');
  
    if (theme === 'dark') {
      document.body.classList.add('dark');
      localStorage.setItem('site_theme', 'dark');
      if (label) label.textContent = 'Modo Claro';
      if (icon) {
        icon.setAttribute('data-lucide', 'sun');
        icon.className = 'w-4 h-4 text-amber-400';
      }
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('site_theme', 'light');
      if (label) label.textContent = 'Modo Escuro';
      if (icon) {
        icon.setAttribute('data-lucide', 'moon');
        icon.className = 'w-4 h-4 text-slate-600';
      }
    }
    if (window.lucide) lucide.createIcons();
  }
  
  window.toggleSiteTheme = toggleSiteTheme;
  window.setSiteTheme = setSiteTheme;
  
  // Executa a renderização inicial após o carregamento completo do DOM
  window.addEventListener('DOMContentLoaded', () => {
    initSiteTheme();
    render();
  });
  
  
  
  
  