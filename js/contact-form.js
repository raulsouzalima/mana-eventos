// Maná Eventos — contact form submit, sent via our own /api/contact
// serverless function (Resend), which emails contato@manaeventos.com.br
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('success-note');
  const errorNote = document.getElementById('error-note');
  const submitBtn = document.getElementById('contact-submit');
  if (!form || !success) return;

  const submitLabel = submitBtn ? submitBtn.textContent : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorNote.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO...';
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Request failed: ' + response.status);

      form.style.display = 'none';
      success.style.display = 'block';
    } catch (err) {
      console.error('Falha ao enviar o formulário de contato:', err);
      errorNote.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });
});
