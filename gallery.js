const gallery = document.getElementById('publicFilters');
const filters = JSON.parse(localStorage.getItem('publicARFilters') || '[]');

if (!filters.length) {
  gallery.innerHTML = '<div class="panel"><strong>Nenhum filtro liberado ainda.</strong><p>Quando um criador aprovar e liberar um filtro, ele aparecerá aqui.</p></div>';
} else {
  gallery.innerHTML = filters.map(filter => `
    <article class="filter-card">
      <img src="${filter.image}" alt="Filtro de ${escapeHtml(filter.name)}">
      <div>
        <strong>${escapeHtml(filter.name)}</strong>
        <p>Filtro liberado pelo criador.</p>
        <button class="button primary use-public-filter" data-id="${filter.id}" type="button">Usar filtro</button>
      </div>
    </article>
  `).join('');
}

function escapeHtml(value = '') {
  return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

document.addEventListener('click', event => {
  const button = event.target.closest('.use-public-filter');
  if (!button) return;
  localStorage.setItem('selectedPublicARFilter', button.dataset.id);
  alert('Filtro selecionado. A experiência pública de câmera será a próxima etapa do app.');
});