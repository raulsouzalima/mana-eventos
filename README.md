# Maná Eventos

Landing page da Maná Eventos — buffet e organização de eventos em São Paulo (aniversários, corporativos, congressos e feiras).

Site estático (HTML/CSS/JS puro, sem build step), com páginas reais por seção:

- `index.html` — Home
- `servicos.html` — Serviços
- `galeria.html` — Galeria (com filtro por categoria)
- `sobre.html` — Sobre Nós
- `contato.html` — Contato (formulário de orçamento)

## Estrutura

```
css/style.css      estilos compartilhados (paleta sage/terracota/creme, Playfair Display + Archivo)
js/main.js          menu mobile (hambúrguer)
js/gallery.js        filtro de categorias da galeria
js/contact-form.js   envio do formulário de contato (client-side)
assets/              logo e fotos
```

## Rodando localmente

Como não há build step, basta servir a pasta com qualquer servidor estático:

```
python3 -m http.server 8000
```

E acessar `http://localhost:8000/index.html`.
