# João Maurício - Portfolio de Artista

🔗 **Acesse o projeto online:** [joaomauricioescultor.com.br/pt#model](https://joaomauricioescultor.com.br/pt#model)

Landing page minimalista e sofisticada para escultor/artista plástico, focada em performance e imersão. Desenvolvida com Next.js 14, TypeScript, Tailwind CSS, Framer Motion e renderização 3D interativa avançada com Three.js.

## O que foi feito

- **Estrutura base:** Configuração do projeto com Next.js (App Router) e internacionalização estática dinâmica (PT/EN).
- **Design de Interface:** Layout responsivo focado em estética "Dark Mode" (fundo preto, tipografia elegante e elementos em escala de cinza).
- **Experiência de Usuário:** Navegação por Sidebar interativa, carrosséis de imagens em loop infinito e visualização em modais (Lightbox).
- **Gestão de Conteúdo:** Adição e atualização de obras na galeria principal, com integração de filtros por disponibilidade de venda e registros históricos na aba "Trajetória".
- **Destaque Imersivo (3D):** Implementação de um ambiente de renderização 3D real e interativo para exploração em tempo real das esculturas do artista.
- **Deploy e Otimização:** Resolução de conflitos de dependências, estabilização de build e implantação no Vercel com configuração de domínio próprio.

## Especificações Técnicas (Stack)

- **Framework:** Next.js 14.2 (App Router, Otimização de Imagens, SSR/SSG)
- **Linguagem:** React 18+ com TypeScript (tipagem rigorosa de componentes e dados)
- **Estilização:** Tailwind CSS (utilitários e paletas de cores customizadas)
- **Animações:** Framer Motion (transições de página, scroll tracking e micro-interações)
- **Renderização 3D:** `three` (Three.js base) + `@react-three/fiber` (Renderizador React) + `@react-three/drei` (Utilitários 3D avançados)
- **Componentes UI:** Embla Carousel (carrosséis baseados em física de movimento suave)
- **Traduções:** Sistema customizado de i18n extraindo dados de `pt.json` e `en.json`

## Estrutura do Projeto

```text
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
  Section2Model3D.tsx  # Renderizador interativo 3D
  Section3Arts.tsx  # Carrossel de obras e filtro
  Section4Timeline.tsx # Carrossel de trajetória
  Section5Contact.tsx  # Seção de contato
  Footer.tsx        # Rodapé
/messages
  pt.json           # Traduções PT
  en.json           # Traduções EN
/public
  /models
    3d_entropie.glb # Modelo 3D exportado
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

### Seção 2: Renderização 3D Interativa (Destaque)
A grande inovação técnica deste portfólio é a capacidade de interagir com as obras físicas do artista através de um modelo 3D fotorrealista renderizado em tempo real diretamente no navegador, eliminando a dependência de plugins externos. 
- **Tecnologias Envolvidas:** Utilizamos o ecossistema `Three.js` orquestrado pelo `@react-three/fiber`, que atua como um Reconciler React para o Three.js, permitindo montar a cena 3D usando componentes declarativos. A biblioteca `@react-three/drei` entra com abstrações complexas pré-prontas (câmeras, controles e ambiente).
- **Carregamento e Otimização:** O modelo físico da obra (ex: "Entropie") foi convertido e é carregado utilizando o formato altamente otimizado `.glb` (glTF binário). O hook `useGLTF` realiza o parse assíncrono e eficiente da geometria (mesh) e do pipeline de materiais físicos (PBR).
- **Iluminação e Realismo (PBR):** Para simular a ambiência volumétrica de uma galeria real de arte, a cena 3D conta com um componente `Environment` de iluminação global e reflexão. Complementarmente, o `ContactShadows` processa sombras de oclusão suaves no "chão" virtual, ancorando o modelo na cena de acordo com seu volume e incidência de luz.
- **Interatividade Total:** A experiência coloca o usuário no controle da exploração. Através da injeção de `OrbitControls`, é possível realizar pan, aplicar zoom de inspeção e rotacionar a câmera livremente, podendo analisar todos os ângulos, concavidades e o tratamento de superfície da escultura em 360 graus.

### Seções 3 e 4: Galerias e Trajetória (Embla)
- **Mock de Dados no i18n:** Todo o conteúdo (títulos, descrições, múltiplas tags, dimensões e links de imagens) foi consolidado dentro dos arquivos `pt.json` e `en.json`. Isso transforma o sistema de traduções em um banco de dados estático, limpando os componentes de UI e facilitando muito a adição de novas obras e eventos.
- **Filtro Inteligente de Obras (Seção 3):** Implementação de um *switch toggle* elegante que filtra o carrossel em tempo real, ocultando obras vendidas ou reservadas e exibindo apenas as disponíveis para compra.
- **Rolagem Infinita Contínua:** Uso estratégico do `embla-carousel-react` com multiplicação dinâmica de arrays curtos. Garante que mesmo com poucas obras filtradas ou eventos na trajetória, o carrossel crie uma ilusão perfeita de loop infinito contínuo e sem buracos.
- **Lightbox Interativo (Seção 4):** Clique nas imagens da trajetória para abrir um modal em tela cheia via `framer-motion` (`AnimatePresence`), facilitando a leitura de certificados e fotos de alta resolução.
- **Links Externos Dinâmicos (Seção 4):** Suporte nativo para botões de "Saiba Mais", gerados automaticamente caso o evento no `.json` possua um link de URL (ex: matérias do Globoplay).
- **Cards Responsivos e Alinhados:** As proporções dos cards se adaptam à tela. O uso de `flex-grow` e `h-full` garante que, independentemente do tamanho do texto da descrição, todos os cards da esteira tenham exatamente a mesma altura.
- **Micro-interações:** Espaçamentos verticais internos (`padding-y`) calibrados no container para garantir que os cards possam crescer (`scale`) livremente durante o `hover` sem que as bordas sejam cortadas por `overflow-hidden`.

### Contato
- Ícones SVG puros (sem bibliotecas externas)
- Links funcionais para WhatsApp, Email e Instagram
- Hover effects com linha animada

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
