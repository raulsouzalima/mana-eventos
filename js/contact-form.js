// Maná Eventos — contact form submit, sent via FormSubmit.co to contato@manaeventos.com.br
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

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('FormSubmit request failed: ' + response.status);
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
