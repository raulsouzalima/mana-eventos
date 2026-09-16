// Maná Eventos — shared behavior (mobile nav toggle)
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a, span[data-close]').forEach((el) => {
    el.addEventListener('click', () => menu.classList.remove('open'));
  });
});
