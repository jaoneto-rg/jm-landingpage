# Paulo Menezes - Portfolio de Artista

Landing page minimalista e sofisticada para escultor/artista plástico, desenvolvida com Next.js 14+, TypeScript, Tailwind CSS, Framer Motion e Three.js.

## Stack Tecnológica

- **Next.js 14+** com App Router
- **React 18+**
- **TypeScript**
- **Tailwind CSS** (cores neutras: black, white, zinc, gray)
- **Framer Motion** (animações e transições)
- **Three.js + React Three Fiber** (modelo 3D interativo)
- **Embla Carousel** (carrosséis das seções 3 e 4)
- **Sistema customizado de i18n** (PT e EN)

## Estrutura do Projeto

```
/app
  /[locale]
    layout.tsx      # Layout com i18n context
    page.tsx        # Página principal
  layout.tsx        # Layout root
  page.tsx          # Redirect para /pt
  globals.css       # Estilos globais
/components
  Sidebar.tsx       # Navegação lateral
  Section1Hero.tsx  # Hero com foto e bio
  Section2Model3D.tsx  # Modelo 3D Three.js
  Section3Arts.tsx  # Carrossel de obras
  Section4Timeline.tsx # Carrossel de trajetória
  Section5Contact.tsx  # Seção de contato
  Footer.tsx        # Rodapé
/messages
  pt.json           # Traduções PT
  en.json           # Traduções EN
/public
  /models
    sculpture.glb   # Modelo 3D (opcional)
```

## Funcionalidades

### Navegação Lateral (Sidebar)
- Aparece ao aproximar o mouse da borda esquerda (zona de 20px)
- Indicador de seção ativa via IntersectionObserver
- Troca de idioma (PT | EN) sem recarregar
- Animações staggered com Framer Motion

### Seção 1: Hero (Introdução)
A primeira seção atua como o cartão de visitas digital do artista. Suas principais características são:
- **Separação de Estilos**: A estilização foi completamente refatorada para um arquivo dedicado (`styles/Section1HeroStyles.ts`), mantendo o `.tsx` limpo e focado na lógica.
- **Layout Responsivo**: O layout se adapta perfeitamente, exibindo o texto e a foto lado a lado no desktop (50/50), e empilhados no mobile.
- **Estética Minimalista**: Fundo totalmente escuro (`bg-black`), tipografia elegante, textos de apoio em tons de cinza (`zinc-400`) e foto do artista com filtro de redução de saturação (`grayscale(20%)`).
- **Animações de Entrada**: Textos e botões surgem suavemente de baixo para cima utilizando o `framer-motion` acionado pelo scroll.

### Seção 2: Obra em Destaque (Preview 3D)
Anteriormente focada em um canvas interativo com Three.js, esta seção evoluiu para uma apresentação mais curada e sofisticada de uma obra específica (ex: "Silêncio Eterno").
- **Visualização da Obra**: Exibe uma imagem em alta resolução da escultura com um overlay escurecido (`bg-black/60`).
- **Indicador 3D**: Sobre a imagem, um ícone 3D customizado em SVG com animação "spring" indica a possibilidade (ou intenção futura) de interagir com a obra em três dimensões.
- **Ficha Técnica**: Ao lado da imagem, as informações técnicas da obra são dispostas de maneira tabular e limpa (Ano, Dimensões, Edição, Material), no melhor estilo de galerias de arte.
- **Animações Coordenadas**: A imagem principal, o overlay 3D e as informações textuais entram na tela em momentos ligeiramente diferentes (delays em cascata), criando uma experiência de leitura fluida.

### Carrosséis (Embla)
- Auto-scroll a cada 8 segundos
- Loop infinito suave
- Pausa ao interagir (mouse/touch)
- Indicadores de progresso

### Contato
- Ícones SVG puros (sem bibliotecas externas)
- Links funcionais para WhatsApp, Email e Instagram
- Hover effects com linha animada

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir no navegador
http://localhost:3000
```

## Build para Produção

```bash
# Gerar build otimizado
npm run build

# Iniciar servidor de produção
npm start
```

## Personalização

### Dados do Artista
Edite os arquivos `/messages/pt.json` e `/messages/en.json` com as informações reais.

### Modelo 3D
Substitua `/public/models/sculpture.glb` pelo modelo real. Se não houver arquivo, uma esfera placeholder será exibida automaticamente.

### Imagens
As imagens usam Unsplash como placeholder. Substitua pelas imagens reais do artista.

### Cores
O tema usa apenas preto e tons de cinza via Tailwind:
- `bg-black` / `#000000`
- `bg-zinc-900` / `#18181b`
- `text-zinc-400` / `#a1a1aa`
- `text-zinc-500` / `#71717a`

## Responsividade

- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1280px+

## Acessibilidade

- Aria-labels em todos os elementos interativos
- Foco visível nos elementos interativos
- Contraste adequado para leitura
- Suporte a navegação por teclado

## Licença

Projeto desenvolvido para portfolio de artista. Todos os direitos reservados.
