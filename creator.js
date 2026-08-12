const publishButton = document.getElementById('publishFilter');

publishButton?.addEventListener('click', () => {
  const image = document.getElementById('filterOverlay')?.src;
  const channelName = document.getElementById('channelName')?.value.trim();
  const channelUrl = document.getElementById('channelUrl')?.value.trim();

  if (!image || !channelName) {
    alert('Envie um filtro e informe o nome do canal antes de liberar.');
    return;
  }

  const publicFilters = JSON.parse(localStorage.getItem('publicARFilters') || '[]');
  publicFilters.unshift({
    id: Date.now(),
    name: channelName,
    channelUrl,
    image,
    scale: document.getElementById('scale')?.value || 100,
    opacity: document.getElementById('opacity')?.value || 100,
    rotate: document.getElementById('rotate')?.value || 0,
    publishedAt: new Date().toISOString()
  });

  try {
    localStorage.setItem('publicARFilters', JSON.stringify(publicFilters.slice(0, 30)));
    alert('Filtro liberado para a galeria pública deste dispositivo.');
  } catch (error) {
    alert('Não foi possível publicar. A imagem pode ser grande demais para o armazenamento do navegador.');
  }
});