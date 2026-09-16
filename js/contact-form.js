// Maná Eventos — contact form submit (client-side only, no backend wired up)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('success-note');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.style.display = 'block';
  });
});
