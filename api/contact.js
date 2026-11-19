// Vercel serverless function (Node.js runtime) — sends the contact form
// straight through Resend's API, no third-party relay in between.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Honeypot: bots fill every field, including hidden ones. Pretend success,
  // don't send anything.
  if (body._honey) {
    return res.status(200).json({ ok: true });
  }

  const nome = String(body.nome || '').trim();
  const email = String(body.email || '').trim();
  const telefone = String(body.telefone || '').trim();
  const tipoEvento = String(body.tipoEvento || '').trim();
  const data = String(body.data || '').trim();
  const convidados = String(body.convidados || '').trim();
  const mensagem = String(body.mensagem || '').trim();

  if (!nome || !email || !tipoEvento) {
    return res.status(400).json({ ok: false, error: 'Campos obrigatórios ausentes.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ ok: false, error: 'Envio de e-mail não configurado.' });
  }

  const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const rows = [
    ['Nome', nome],
    ['E-mail', email],
    ['Telefone', telefone || '—'],
    ['Tipo de evento', tipoEvento],
    ['Data prevista', data || '—'],
    ['Número de convidados', convidados || '—'],
    ['Mensagem', mensagem || '—'],
  ];

  const html =
    '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;">' +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="border:1px solid #ddd;font-weight:bold;">${escapeHtml(label)}</td>` +
          `<td style="border:1px solid #ddd;">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
      )
      .join('') +
    '</table>';

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Maná Eventos <onboarding@resend.dev>',
        to: ['contato@manaeventos.com.br'],
        reply_to: email,
        subject: `Nova solicitação de orçamento — ${nome}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errText);
      return res.status(502).json({ ok: false, error: 'Falha ao enviar e-mail.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return res.status(500).json({ ok: false, error: 'Erro interno ao enviar.' });
  }
}
