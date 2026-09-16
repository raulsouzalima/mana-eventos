// Maná Eventos — galeria filter
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.getElementById('gallery-tabs');
  const grid = document.getElementById('gallery-grid');
  if (!tabs || !grid) return;
  const items = grid.querySelectorAll('.gallery-item');

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-tab');
    if (!btn) return;
    tabs.querySelectorAll('.gallery-tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    items.forEach((item) => {
      const tags = (item.getAttribute('data-tags') || '').split(',');
      item.classList.toggle('hidden', !tags.includes(filter));
    });
  });
});
