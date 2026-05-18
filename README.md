# João Maurício - Artist Portfolio

*Read this in other languages: [Português](README-pt.md)*

🔗 **Access the live project:** [joaomauricioescultor.com.br/en#model](https://joaomauricioescultor.com.br/en#model)

A minimalist and sophisticated landing page for a sculptor/visual artist, focused on performance and immersion. Developed with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and advanced interactive 3D rendering with Three.js.

## What was done

- **Core Structure:** Project setup with Next.js (App Router) and dynamic static internationalization (PT/EN).
- **Interface Design:** Responsive layout focused on a "Dark Mode" aesthetic (black background, elegant typography, and grayscale elements).
- **User Experience:** Navigation via interactive Sidebar, infinite loop image carousels, and Lightbox modals.
- **Content Management:** Addition and update of artworks in the main gallery, with filtering by sale availability and historical records in the "Journey" tab.
- **Immersive Highlight (3D):** Implementation of a real and interactive 3D rendering environment for real-time exploration of the artist's sculptures.
- **Deployment and Optimization:** Resolution of dependency conflicts, build stabilization, and deployment on Vercel with custom domain configuration.

## Technical Specifications (Stack)

- **Framework:** Next.js 14.2 (App Router, Image Optimization, SSR/SSG)
- **Language:** React 18+ with TypeScript (strict component and data typing)
- **Styling:** Tailwind CSS (utilities and custom color palettes)
- **Animations:** Framer Motion (page transitions, scroll tracking, and micro-interactions)
- **3D Rendering:** `three` (Three.js base) + `@react-three/fiber` (React Renderer) + `@react-three/drei` (Advanced 3D utilities)
- **UI Components:** Embla Carousel (carousels based on smooth motion physics)
- **Translations:** Custom i18n system extracting data from `pt.json` and `en.json`

## Project Structure

```text
/app
  /[locale]
    layout.tsx      # Layout with i18n context
    page.tsx        # Main page
  layout.tsx        # Root layout
  page.tsx          # Redirect to /pt
  globals.css       # Global styles
/components
  Sidebar.tsx       # Side navigation
  Section1Hero.tsx  # Hero with photo and bio
  Section2Model3D.tsx  # Interactive 3D renderer
  Section3Arts.tsx  # Artworks carousel and filter
  Section4Timeline.tsx # Journey carousel
  Section5Contact.tsx  # Contact section
  Footer.tsx        # Footer
/messages
  pt.json           # PT Translations
  en.json           # EN Translations
/public
  /models
    3d_entropie.glb # Exported 3D model
```

## Features

### Side Navigation (Sidebar)
- Appears when hovering near the left edge (20px zone)
- Active section indicator via IntersectionObserver
- Language switching (PT | EN) without reloading
- Staggered animations with Framer Motion

### Section 1: Hero (Introduction)
The first section acts as the artist's digital business card. Its main features are:
- **Style Separation**: Styling was completely refactored into a dedicated file (`styles/Section1HeroStyles.ts`), keeping the `.tsx` clean and focused on logic.
- **Responsive Layout**: The layout adapts perfectly, displaying text and photo side-by-side on desktop (50/50), and stacked on mobile.
- **Minimalist Aesthetic**: Fully dark background (`bg-black`), elegant typography, support text in shades of gray (`zinc-400`), and the artist's photo with a desaturation filter (`grayscale(20%)`).
- **Entry Animations**: Texts and buttons smoothly rise from the bottom using `framer-motion` triggered by scroll.

### Section 2: Interactive 3D Rendering (Highlight)
The major technical innovation of this portfolio is the ability to interact with the artist's physical artworks through a photorealistic 3D model rendered in real-time directly in the browser, eliminating the need for external plugins.
- **Technologies Involved:** We use the `Three.js` ecosystem orchestrated by `@react-three/fiber`, which acts as a React Reconciler for Three.js, allowing us to build the 3D scene using declarative components. The `@react-three/drei` library provides complex ready-to-use abstractions (cameras, controls, and environment).
- **Loading and Optimization:** The physical model of the artwork (e.g., "Entropie") was converted and is loaded using the highly optimized `.glb` (binary glTF) format. The `useGLTF` hook performs asynchronous and efficient parsing of the geometry (mesh) and physical material pipeline (PBR).
- **Lighting and Realism (PBR):** To simulate the volumetric ambiance of a real art gallery, the 3D scene features a global illumination and reflection `Environment` component. Additionally, `ContactShadows` processes soft occlusion shadows on the virtual "floor", anchoring the model in the scene according to its volume and light incidence.
- **Full Interactivity:** The experience puts the user in control of the exploration. Through the injection of `OrbitControls`, it is possible to pan, apply inspection zoom, and freely rotate the camera, allowing analysis of all angles, concavities, and surface treatments of the sculpture in 360 degrees.

### Sections 3 and 4: Galleries and Journey (Embla)
- **Data Mocking in i18n:** All content (titles, descriptions, multiple tags, dimensions, and image links) was consolidated within the `pt.json` and `en.json` files. This turns the translation system into a static database, cleaning up UI components and making it very easy to add new artworks and events.
- **Smart Artwork Filter (Section 3):** Implementation of an elegant *toggle switch* that filters the carousel in real-time, hiding sold or reserved artworks and displaying only those available for purchase.
- **Continuous Infinite Scrolling:** Strategic use of `embla-carousel-react` with dynamic multiplication of short arrays. This ensures that even with few filtered artworks or journey events, the carousel creates a perfect illusion of a continuous and seamless infinite loop.
- **Interactive Lightbox (Section 4):** Clicking on journey images opens a full-screen modal via `framer-motion` (`AnimatePresence`), making it easy to read certificates and view high-resolution photos.
- **Dynamic External Links (Section 4):** Native support for "Learn More" buttons, automatically generated if the event in the `.json` has a URL link (e.g., Globoplay features).
- **Responsive and Aligned Cards:** Card proportions adapt to the screen. The use of `flex-grow` and `h-full` ensures that, regardless of the description text length, all cards in the carousel have exactly the same height.
- **Micro-interactions:** Internal vertical spacing (`padding-y`) calibrated in the container to ensure that cards can freely grow (`scale`) during `hover` without borders being cut off by `overflow-hidden`.

### Contact
- Pure SVG icons (no external libraries)
- Functional links for WhatsApp, Email, and Instagram
- Hover effects with animated line

### Colors
The theme uses only black and shades of gray via Tailwind:
- `bg-black` / `#000000`
- `bg-zinc-900` / `#18181b`
- `text-zinc-400` / `#a1a1aa`
- `text-zinc-500` / `#71717a`

## Responsiveness

- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1280px+

## Accessibility

- Aria-labels on all interactive elements
- Visible focus on interactive elements
- Adequate contrast for reading
- Keyboard navigation support

## License

Project developed for artist portfolio. All rights reserved.
