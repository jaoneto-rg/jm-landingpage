'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { section4Styles } from '../styles/Section4TimelineStyles'

interface JourneyItem {
  title: string
  tag: string
  date: string
  location: string
  description: string
  image: string
  link?: string
}

interface Section4TimelineProps {
  messages: {
    journey: {
      title: string
      items: JourneyItem[]
    }
  }
}

export default function Section4Timeline({ messages }: Section4TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const items = messages.journey.items
  // Multiplicar os itens para garantir o loop contínuo e suave sem espaços em branco (igual na Seção 3 que tem muitas obras)
  const displayItems = [...items, ...items, ...items, ...items]

  // Sem auto-scroll — apenas drag manual
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  })

  // Detecta mobile/desktop
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Atualiza o índice do slide central a cada mudança
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // IntersectionObserver para animação de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      {
        root: document.getElementById('main-container'),
        threshold: 0.2,
      }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const { title } = messages.journey

  // Calcula animação de cada card
  const getCardMotion = (index: number) => {
    const isCenter = selectedIndex === index
    const isHovered = hoveredIndex === index
    const someoneHovered = hoveredIndex !== null

    if (!isMobile) {
      if (isHovered) return { scale: 1.08, opacity: 1, zIndex: 30 }
      if (someoneHovered) return { scale: 0.97, opacity: 0.6, zIndex: 1 }
      return { scale: 1.0, opacity: 1, zIndex: 1 }
    }

    // Mobile: card central em destaque
    if (isCenter) return { scale: 1.07, opacity: 1, zIndex: 20 }
    return { scale: 0.90, opacity: 0.5, zIndex: 1 }
  }

  // Cores para cada tipo de tag
  const getTagStyle = (tag: string) => {
    const styles: Record<string, string> = {
      'Exposição': 'bg-zinc-700 text-zinc-200',
      'Exhibition': 'bg-zinc-700 text-zinc-200',
      'Workshop': 'bg-amber-700 text-white border border-amber-600',
      'Aula': 'bg-zinc-800 text-zinc-300 border border-zinc-700',
      'Class': 'bg-zinc-800 text-zinc-300 border border-zinc-700',
      'Projeto': 'bg-white text-black',
      'Project': 'bg-white text-black',
    }
    return styles[tag] || 'bg-zinc-800 text-zinc-400'
  }

  return (
    <div
      ref={sectionRef}
      className={section4Styles.container}
      style={section4Styles.containerInline}
    >
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className={section4Styles.titleContainer}
      >
        <h2 className={section4Styles.title}>{title}</h2>
      </motion.div>

      {/* Carrossel Wrapper com fade nas bordas */}
      <div className={section4Styles.carouselWrapper}>
        <div className={section4Styles.overlayLeft} style={section4Styles.overlayInlineLeft} />
        <div className={section4Styles.overlayRight} style={section4Styles.overlayInlineRight} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={section4Styles.emblaContainer}
          ref={emblaRef}
        >
          <div className={section4Styles.emblaFlex}>
            {displayItems.map((item, index) => {
              const { scale, opacity, zIndex } = getCardMotion(index)
              return (
                <div
                  key={index}
                  className={section4Styles.itemWrapper}
                  style={{ position: 'relative', zIndex }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    animate={{ scale, opacity }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 32,
                      mass: 0.8,
                    }}
                    className={section4Styles.itemMotionBase}
                  >
                    {/* Imagem do item */}
                    <div 
                      className={`${section4Styles.imageContainer} cursor-pointer group`}
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={section4Styles.image}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                      <div className={section4Styles.tagContainer}>
                        <span className={`${section4Styles.tagBase} ${getTagStyle(item.tag)}`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white bg-black/60 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                          {messages.journey.title === 'Trajetória' ? 'Ver imagem' : 'View image'}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do card */}
                    <div className={section4Styles.contentContainer}>
                      <h3 className={section4Styles.itemTitle}>{item.title}</h3>
                      <p className={section4Styles.itemDate}>{item.date}</p>
                      <p className={section4Styles.itemLocation}>{item.location}</p>
                      <p className={section4Styles.itemDescription}>{item.description}</p>
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mt-4 text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider w-max"
                        >
                          {messages.journey.title === 'Trajetória' ? 'Saiba mais' : 'Learn more'}
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Modal / Lightbox para a Imagem */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar na imagem
            >
              <Image
                src={selectedImage}
                alt="Imagem expandida"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
