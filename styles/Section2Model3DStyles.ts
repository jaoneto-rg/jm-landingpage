export const section2Styles = {
  container: "relative w-full min-h-screen flex flex-col items-center justify-center",
  containerInline: { backgroundColor: '#0a0a0a' },

  // Title section
  titleContainer: "absolute top-12 left-0 right-0 text-center lg:px-20",
  title: "text-zinc-500 text-xs tracking-[0.3em] uppercase",
  titleInline: { letterSpacing: '0.3em' },

  // Main container with 3D preview
  mainContainer: "w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12",

  // Sculpture image with 3D overlay
  imageWrapper: "w-full lg:w-[70%] relative",
  imageContainer: "relative aspect-[4/3] border border-zinc-800 overflow-hidden",
  image: "object-cover",
  imageInline: { filter: 'grayscale(30%) contrast(1.1)' },

  // Overlay
  overlay: "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4",
  iconContainer: "w-20 h-20 rounded-full border-2 border-zinc-600 flex items-center justify-center",
  overlayTextContainer: "text-center",
  overlaySubtitle: "text-white text-lg font-light mb-2",
  overlayDescription: "text-zinc-400 text-sm max-w-xs",

  // Artwork info
  infoContainer: "w-full lg:w-[30%] space-y-6",
  artworkTitle: "text-white text-2xl sm:text-3xl font-light mb-2",
  badge: "inline-block px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full",
  artworkDescription: "text-zinc-400 text-sm leading-relaxed",

  // Specs
  specsContainer: "space-y-3 pt-4 border-t border-zinc-800",
  specRow: "flex justify-between text-sm",
  specLabel: "text-zinc-500",
  specValue: "text-zinc-300",

  // Instruction
  instructionContainer: "absolute bottom-12 text-zinc-600 text-sm flex items-center gap-2",
  instructionDot: "w-2 h-2 bg-zinc-600 rounded-full animate-pulse",
  
  // Icon3D
  iconSvg: "text-zinc-500"
};
