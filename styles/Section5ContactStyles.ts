export const section5Styles = {
  container: "relative w-full min-h-[80vh] bg-black flex flex-col justify-center py-20",

  // Title
  titleContainer: "text-center mb-16 px-6",
  title: "text-white text-3xl sm:text-4xl font-light",

  // Contact Blocks Container
  blocksContainer: "flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 px-6",

  // Individual Contact Block
  contactBlock: "group flex flex-col items-center gap-4 p-8 text-center transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-white/50",
  
  // Icon Container
  iconContainer: "text-zinc-400 group-hover:text-white transition-colors duration-250",

  // SVG Base (used directly in SVGs)
  svgBase: "transition-colors duration-250",

  // Label
  label: "text-zinc-500 text-xs uppercase tracking-wider",

  // Value
  valueContainer: "text-white text-lg relative",
  valueUnderline: "absolute left-0 right-0 bottom-0 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left"
};
