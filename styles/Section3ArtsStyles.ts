import type React from 'react'

export const section3Styles = {
  container: "relative w-full min-h-screen bg-black flex flex-col justify-center py-20",

  // Title
  titleContainer: "px-6 sm:px-12 lg:px-20 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4",
  title: "text-white text-3xl sm:text-4xl font-light",

  // Carousel Wrapper & Overlays
  carouselWrapper: "relative w-full",
  overlayLeft: "absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none",
  overlayRight: "absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none",

  // Mobile Navigation Arrows
  arrowButton:
    "absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center " +
    "w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 " +
    "text-white/80 hover:bg-white/25 hover:text-white active:scale-95 " +
    "transition-all duration-200 cursor-pointer shadow-lg",
  overlayInlineLeft: {
    WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
    maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
  } as React.CSSProperties,
  overlayInlineRight: {
    WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
    maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
  } as React.CSSProperties,

  // Embla — sem gap no flex, espaçamento via margin em cada slide
  emblaContainer: "overflow-hidden px-6 sm:px-12 lg:px-20 py-10",
  emblaFlex: "flex",

  // Artwork Item — marginLeft garante espaço igual inclusive nos clones do loop
  itemWrapper: "flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] ml-5",
  itemMotionBase:
    "bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer " +
    "hover:border-zinc-600 transition-colors duration-300 origin-center h-[560px] sm:h-[520px]",

  // Artwork Image
  imageContainer: "relative h-[55%] overflow-hidden",
  image: "object-cover transition-transform duration-500",

  // Artwork Info
  infoContainer: "p-5 h-[45%] flex flex-col",
  artworkTitle: "text-white font-medium text-xl mb-3",
  tagsContainer: "flex flex-wrap gap-2 mb-4",
  techniqueBadge:
    "inline-block px-3 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full",
  artworkDescription: "text-zinc-400 text-sm leading-relaxed line-clamp-6 whitespace-pre-line",
  priceAndContactContainer: "flex items-center justify-between mt-2",
  artworkPrice: "text-white font-medium",
  artworkDimensions: "text-zinc-500 text-xs font-mono mt-auto pt-1 border-t border-zinc-800",
  whatsappButton: "ml-auto flex items-center justify-center bg-[#25D366] hover:bg-[#1ebd5a] transition-colors text-white rounded-full w-8 h-8 flex-shrink-0",

  // Zoom Button (on image)
  zoomButton:
    "absolute bottom-3 right-3 z-10 flex items-center justify-center " +
    "w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white/90 " +
    "hover:bg-white/20 hover:text-white transition-colors duration-200 cursor-pointer",

  // Fullscreen Modal
  modalOverlay:
    "fixed inset-0 z-[9999] flex items-center justify-center " +
    "bg-black/85 backdrop-blur-md cursor-pointer",
  modalCloseButton:
    "absolute top-6 right-6 z-[10000] text-white/70 hover:text-white " +
    "transition-colors duration-200 cursor-pointer",
  modalImageContainer:
    "relative w-[90vw] h-[85vh] cursor-default",

};
