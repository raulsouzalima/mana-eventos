// Maná Eventos — phone input mask: (11) 9 0000-0000
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('telefone');
  if (!input) return;

  const format = (digits) => {
    digits = digits.slice(0, 11);
    let out = '';
    if (digits.length > 0) out += '(' + digits.slice(0, 2);
    if (digits.length >= 2) out += ') ';
    if (digits.length > 2) out += digits.slice(2, 3);
    if (digits.length > 3) out += ' ' + digits.slice(3, 7);
    if (digits.length > 7) out += '-' + digits.slice(7, 11);
    return out;
  };

  input.addEventListener('input', () => {
    const cursor = input.selectionStart ?? input.value.length;
    const digitsBeforeCursor = input.value.slice(0, cursor).replace(/\D/g, '').length;
    const digits = input.value.replace(/\D/g, '');
    const formatted = format(digits);

    input.value = formatted;

    let seen = 0;
    let newCursor = formatted.length;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) seen++;
      if (seen === digitsBeforeCursor) {
        newCursor = i + 1;
        break;
      }
    }
    input.setSelectionRange(newCursor, newCursor);
  });
});
