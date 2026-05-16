# Portfolio Template

Inspirado em [tparkes.com](https://www.tparkes.com)

---

## Estrutura

```
portfolio/
├── index.html              ← Página inicial (Work)
├── about.html              ← Página de informações
│
├── pages/
│   └── case.html           ← Template de case study (duplique para cada projeto)
│
├── assets/
│   ├── css/
│   │   ├── global.css      ← Tokens, reset, nav, footer, utilidades
│   │   ├── home.css        ← Estilos da home
│   │   ├── case.css        ← Estilos da página de case
│   │   └── about.css       ← Estilos da página de about
│   │
│   ├── js/
│   │   └── main.js         ← Nav mobile, scroll reveal (compartilhado)
│   │
│   └── images/
│       ├── projects/       ← Imagens dos projetos
│       ├── profile/        ← Foto de perfil e fotos da página about
│       └── clients/        ← Logos dos clientes (SVG recomendado)
```

---

## Como usar

### 1. Personalizar textos
Abra cada `.html` e substitua os textos marcados com `Seu Nome`, `seuemail@email.com`, etc.

### 2. Adicionar imagens
Coloque suas imagens em `assets/images/` e substitua os blocos `<div class="placeholder">` por tags `<img>`:

```html
<!-- Antes (placeholder) -->
<div class="placeholder media-full media-full--wide">
  <span>Imagem Hero</span>
</div>

<!-- Depois (imagem real) -->
<img class="media-full media-full--wide"
     src="../assets/images/projects/projeto-hero.jpg"
     alt="Nome do projeto">
```

### 3. Adicionar novos cases
1. Duplique `pages/case.html`
2. Renomeie (ex: `pages/marca-xyz.html`)
3. Atualize o link no `index.html`

### 4. Subir para o GitHub Pages
1. Suba a pasta `portfolio/` no repositório
2. Em **Settings → Pages**, selecione branch `main` e pasta `/ (root)`
3. O site ficará em `https://seuusuario.github.io/portfolio`

---

## Paleta de cores

| Token          | Valor     | Uso                        |
|----------------|-----------|----------------------------|
| `--bg`         | `#FFFFFF` | Fundo principal            |
| `--bg-subtle`  | `#F7F7F7` | Superfícies alternadas     |
| `--bg-muted`   | `#EFEFEF` | Fundos de hover            |
| `--border`     | `#E4E4E4` | Bordas e divisores         |
| `--text`       | `#111111` | Texto principal            |
| `--text-sec`   | `#6B6B6B` | Texto secundário           |
| `--text-ter`   | `#A0A0A0` | Labels, eyebrows           |

Para trocar a paleta, edite apenas as variáveis em `assets/css/global.css`.

---

## Breakpoints

| Breakpoint | Largura    |
|------------|------------|
| Desktop    | > 900px    |
| Tablet     | 600–900px  |
| Mobile     | < 600px    |
