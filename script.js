// Lista fixa de sites da turma
const sites = [
    { id: "1", title: "GitHub - Testes já feitos.", url: "https://github.com/isabellyrss/InicioBackEnd", description: "Testes armazenados no GitHub", category: "Projeto" },
    { id: "2", title: "Portfólio B", url: "https://meuportfolioB.com", description: "Portfólio do aluno B", category: "Portfólio" },
    { id: "3", title: "Exercício C", url: "https://meuexercicioC.com", description: "Exercício da aula", category: "Exercício" }
  ];
  
  // DOM
  const cardsEl = document.getElementById('cards');
  const searchEl = document.getElementById('search');
  const categoryFilterEl = document.getElementById('categoryFilter');
  
  // Render categorias no filtro
  function renderCategoryOptions(){
    const cats = Array.from(new Set(sites.map(s => s.category).filter(Boolean)));
    categoryFilterEl.innerHTML = '<option value="all">Todas as categorias</option>';
    cats.sort().forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      categoryFilterEl.appendChild(opt);
    });
  }
  
  // Render dos cards
  function renderCards(){
    const q = searchEl.value.trim().toLowerCase();
    const cat = categoryFilterEl.value;
    const filtered = sites.filter(s => {
      const matchesQ = (s.title + ' ' + (s.description||'')).toLowerCase().includes(q);
      const matchesCat = cat === 'all' ? true : s.category === cat;
      return matchesQ && matchesCat;
    }).sort((a,b) => a.title.localeCompare(b.title));
  
    cardsEl.innerHTML = '';
    if(filtered.length === 0){
      cardsEl.innerHTML = '<div class="muted">Nenhum site encontrado.</div>';
      return;
    }
  
    filtered.forEach(site => {
      const card = document.createElement('article');
      card.className = 'card';
      card.tabIndex = 0;
      card.setAttribute('role','link');
      card.addEventListener('click', () => window.open(site.url, '_blank'));
      card.addEventListener('keypress', (e) => { if(e.key === 'Enter') window.open(site.url, '_blank'); });
  
      const favicon = document.createElement('div');
      favicon.className = 'favicon';
      favicon.textContent = faviconText(site.title);
  
      const meta = document.createElement('div');
      meta.className = 'meta';
      const h3 = document.createElement('h3');
      h3.textContent = site.title;
      const p = document.createElement('p');
      p.textContent = site.description || site.url;
      const small = document.createElement('div');
      small.className = 'muted';
      small.textContent = site.category || '';
  
      meta.appendChild(h3);
      meta.appendChild(p);
      meta.appendChild(small);
  
      card.appendChild(favicon);
      card.appendChild(meta);
  
      cardsEl.appendChild(card);
    });
  }
  
  // Gera texto para favicon (iniciais)
  function faviconText(title){
    if(!title) return 'S';
    const parts = title.trim().split(/\s+/);
    if(parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  
  // Inicialização
  renderCategoryOptions();
  renderCards();
  
  // Eventos
  searchEl.addEventListener('input', renderCards);
  categoryFilterEl.addEventListener('change', renderCards);
  