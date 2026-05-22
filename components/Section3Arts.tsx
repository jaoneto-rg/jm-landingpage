'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { section3Styles } from '../styles/Section3ArtsStyles'

interface Artwork {
  title: string
  tags: string[]
  description?: string
  image: string
  dimensions?: string
  price?: string
}

interface Section3ArtsProps {
  messages: {
    contact: {
      whatsapp: string
    }
    works: {
      title: string
      whatsappTemplate: string
      artworks: Artwork[]
    }
  }
}

// Imagens vêm agora diretamente de cada Artwork no JSON

export default function Section3Arts({ messages }: Section3ArtsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

  // Sem auto-scroll — apenas drag manual
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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

  const { title, artworks, whatsappTemplate } = messages.works
  const waNumber = messages.contact.whatsapp.replace(/\D/g, '')

  const isArtworkSold = (artwork: Artwork) => {
    const descLower = artwork.description?.toLowerCase() || ''
    return artwork.tags?.some(t => t.toLowerCase() === 'vendida' || t.toLowerCase() === 'sold') ||
      descLower.includes('reservada') || 
      descLower.includes('reserved') ||
      descLower.includes('indisponível') ||
      descLower.includes('unavailable')
  }

  const displayedArtworks = showOnlyAvailable ? artworks.filter(a => !isArtworkSold(a)) : artworks
  
  // Multiplicar os itens se a lista filtrada for muito curta para garantir o loop contínuo do Embla
  const finalArtworks = displayedArtworks.length > 0 && displayedArtworks.length < 10 
    ? [...displayedArtworks, ...displayedArtworks, ...displayedArtworks, ...displayedArtworks] 
    : displayedArtworks

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

  return (
    <div ref={sectionRef} className={section3Styles.container}>
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className={section3Styles.titleContainer}
      >
        <h2 className={section3Styles.title}>{title}</h2>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-3">
          <span className={`text-sm transition-colors duration-300 ${showOnlyAvailable ? 'text-zinc-300' : 'text-zinc-500'}`}>
            {title === 'Obras' ? 'Apenas Disponíveis' : 'Available Only'}
          </span>
          <button
            onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              showOnlyAvailable ? 'bg-zinc-200' : 'bg-zinc-700'
            }`}
            aria-label="Toggle available artworks only"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ${
                showOnlyAvailable ? 'translate-x-6 bg-zinc-900' : 'translate-x-1 bg-zinc-400'
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Carrossel Wrapper com fade nas bordas */}
      <div className={section3Styles.carouselWrapper}>
        <div className={section3Styles.overlayLeft} style={section3Styles.overlayInlineLeft} />
        <div className={section3Styles.overlayRight} style={section3Styles.overlayInlineRight} />

        {/* Setas de navegação — visíveis apenas no mobile */}
        {isMobile && (
          <>
            <button
              onClick={scrollPrev}
              className={section3Styles.arrowButton}
              style={{ left: '8px' }}
              aria-label="Obra anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className={section3Styles.arrowButton}
              style={{ right: '8px' }}
              aria-label="Próxima obra"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={section3Styles.emblaContainer}
          ref={emblaRef}
        >
          <div className={section3Styles.emblaFlex}>
            {finalArtworks.map((artwork, index) => {
              const { scale, opacity, zIndex } = getCardMotion(index)
              const isHovered = hoveredIndex === index
              const isCenter = selectedIndex === index
              const showWhatsApp = isMobile ? isCenter : isHovered
              const isSold = isArtworkSold(artwork)

              return (
                <div
                  key={index}
                  className={section3Styles.itemWrapper}
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
                    className={section3Styles.itemMotionBase}
                  >
                    {/* Imagem da obra */}
                    <div className={section3Styles.imageContainer}>
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className={section3Styles.image}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                      {/* Botão de lupa para abrir modal */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: (isMobile ? isCenter : isHovered) ? 1 : 0,
                          scale: (isMobile ? isCenter : isHovered) ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ pointerEvents: (isMobile ? isCenter : isHovered) ? 'auto' : 'none' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage({ src: artwork.image, alt: artwork.title })
                        }}
                        className={section3Styles.zoomButton}
                        aria-label={`Ver ${artwork.title} em tela cheia`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Informações da obra */}
                    <div className={section3Styles.infoContainer}>
                      <h3 className={section3Styles.artworkTitle}>{artwork.title}</h3>
                      <div className={section3Styles.tagsContainer}>
                        {artwork.tags?.map((tag, i) => (
                          <span key={i} className={section3Styles.techniqueBadge}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className={section3Styles.artworkDescription}>{artwork.description}</p>
                      <div className={section3Styles.priceAndContactContainer}>
                        {artwork.price && (
                          <p className={section3Styles.artworkPrice}>{artwork.price}</p>
                        )}
                        {!isSold && (
                          <motion.a
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: showWhatsApp ? 1 : 0, 
                              scale: showWhatsApp ? 1 : 0.8 
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ pointerEvents: showWhatsApp ? 'auto' : 'none' }}
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent((whatsappTemplate || '').replace('{title}', artwork.title))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={section3Styles.whatsappButton}
                            onClick={(e) => e.stopPropagation()}
                            title="Falar no WhatsApp"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                            </svg>
                          </motion.a>
                        )}
                      </div>
                      {artwork.dimensions && (
                        <p className={section3Styles.artworkDimensions}>{artwork.dimensions}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Modal de imagem fullscreen */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={section3Styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          {/* Botão fechar */}
          <button
            onClick={() => setSelectedImage(null)}
            className={section3Styles.modalCloseButton}
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagem */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={section3Styles.modalImageContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
