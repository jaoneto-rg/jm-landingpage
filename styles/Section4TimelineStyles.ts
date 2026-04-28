export const section4Styles = {
  container: "relative w-full min-h-screen flex flex-col justify-center py-20",
  containerInline: { backgroundColor: '#0a0a0a' },

  // Title
  titleContainer: "px-6 sm:px-12 lg:px-20 mb-8",
  title: "text-white text-3xl sm:text-4xl font-light",

  // Carousel Wrapper & Overlays
  carouselWrapper: "relative w-full",
  overlayLeft: "absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none",
  overlayRight: "absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none",
  overlayInlineLeft: {
    backdropFilter: 'blur(4px)',
    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
    maskImage: 'linear-gradient(to right, black 0%, transparent 100%)'
  },
  overlayInlineRight: {
    backdropFilter: 'blur(4px)',
    WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
    maskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
  },

  // Embla container
  emblaContainer: "overflow-hidden px-6 sm:px-12 lg:px-20",
  emblaFlex: "flex gap-6",

  // Timeline Item
  itemWrapper: "flex-shrink-0 w-[320px] sm:w-[360px]",
  itemMotionBase: "bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all duration-500 origin-center",

  // Item Image
  imageContainer: "relative h-[200px] overflow-hidden",
  image: "object-cover transition-transform duration-500 hover:scale-105",

  // Tag
  tagContainer: "absolute top-4 left-4",
  tagBase: "px-3 py-1 text-xs font-medium rounded-full",

  // Item Content
  contentContainer: "p-6",
  itemTitle: "text-white font-medium text-lg mb-2 line-clamp-2",
  itemDate: "text-zinc-500 text-sm mb-1",
  itemLocation: "text-zinc-400 text-sm mb-3",
  itemDescription: "text-zinc-500 text-sm line-clamp-3",

  // Navigation
  navContainer: "flex justify-center gap-8 mt-12",
  navButton: "p-2 text-zinc-500 hover:text-white transition-colors duration-300 focus:outline-none",
};

// Helper for dynamic classes
export const getActiveTimelineItemClass = (isSelected: boolean) => 
  isSelected 
    ? 'scale-105 z-20 shadow-[0_0_40px_rgba(0,0,0,0.5)] lg:scale-100 lg:shadow-none lg:z-auto' 
    : 'scale-95 opacity-60 lg:scale-100 lg:opacity-100';
