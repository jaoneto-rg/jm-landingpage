export const sidebarStyles = {
  // Permanent visual indicator
  indicatorContainer: "fixed left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2",
  verticalLine: "w-[2px] h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent",
  menuHintContainer: "flex flex-col items-center gap-1",
  menuHintText: "text-zinc-600 text-[10px] uppercase tracking-widest rotate-180",
  menuHintTextInline: { writingMode: 'vertical-rl' as any },
  menuIcon: "text-zinc-600",

  // Invisible trigger zone
  triggerZone: "fixed left-0 top-0 h-full w-[40px] z-40 cursor-pointer",
  triggerZoneInline: { background: 'transparent' },

  // Sidebar container
  sidebarNav: "fixed left-0 top-0 h-screen w-[220px] z-50 flex flex-col",
  sidebarNavInline: {
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },

  // Header / Logo
  headerContainer: "p-8 pb-4",
  logoText: "text-lg font-light text-white tracking-wider",
  subtitleText: "text-xs text-zinc-500 mt-1",

  // Navigation Links
  linksContainer: "flex-1 px-6 py-4 space-y-1",
  navButtonBase: "relative w-full text-left py-3 px-4 text-sm transition-all duration-300 ease-out group",
  navIndicatorBase: "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-white transition-all duration-300 ease-out",

  // Language toggle
  langContainer: "p-8 border-t border-zinc-800",
  langWrapper: "flex items-center justify-between",
  langLabel: "text-xs text-zinc-500",
  langButtonsWrapper: "flex items-center gap-2",
  langSeparator: "text-zinc-700",
};

// Helper for dynamic classes
export const getNavButtonClass = (isActive: boolean) => 
  isActive
    ? 'text-white'
    : 'text-zinc-400 hover:text-white hover:translate-x-2';

export const getNavIndicatorClass = (isActive: boolean) =>
  isActive 
    ? 'h-4 opacity-100' 
    : 'h-0 opacity-0 group-hover:h-2 group-hover:opacity-50';

export const getLangButtonClass = (isActive: boolean) =>
  `text-sm transition-colors duration-200 ${
    isActive ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
  }`;
