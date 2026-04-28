export const heroStyles = {
  container: "relative w-full min-h-screen bg-black flex items-center",
  wrapper: "w-full px-6 sm:px-12 lg:px-20 py-20",
  contentContainer: "flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto",
  
  // Left block - Text
  textBlock: "w-full lg:w-1/2 flex flex-col items-center text-center lg:items-end lg:text-right space-y-8",
  name: "text-white font-light leading-tight",
  nameInline: {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    letterSpacing: '-0.02em',
  },
  profession: "text-zinc-400 text-lg sm:text-xl tracking-wide",
  bio: "text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed",
  ctaButton: "mt-8 px-8 py-3 border border-white/30 text-white text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
  
  // Right block - Photo
  photoBlock: "w-full lg:w-1/2 flex justify-center lg:justify-start",
  photoContainer: "relative w-full max-w-[400px] aspect-[3/4] overflow-hidden",
  photoContainerInline: {
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  photoPlaceholder: "absolute inset-0 bg-zinc-900 flex items-center justify-center",
  photoPlaceholderInline: {
    filter: 'grayscale(20%) contrast(1.1)',
  },
  image: "object-cover",
  imageInline: {
    filter: 'grayscale(20%) contrast(1.1)',
  },

  // Scroll indicator
  scrollIndicator: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
  scrollText: "text-zinc-600 text-xs tracking-widest uppercase",
  scrollLine: "w-[1px] h-8 bg-zinc-700"
};
