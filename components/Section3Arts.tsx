'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { section3Styles } from '../styles/Section3ArtsStyles'

interface Artwork {
  title: string
  tags: string[]
  description: string
  image: string
  dimensions?: string
}

interface Section3ArtsProps {
  messages: {
    works: {
      title: string
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
  const [isMobile, setIsMobile] = useState(false)

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

  const { title, artworks } = messages.works

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
      </motion.div>

      {/* Carrossel Wrapper com fade nas bordas */}
      <div className={section3Styles.carouselWrapper}>
        <div className={section3Styles.overlayLeft} style={section3Styles.overlayInlineLeft} />
        <div className={section3Styles.overlayRight} style={section3Styles.overlayInlineRight} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={section3Styles.emblaContainer}
          ref={emblaRef}
        >
          <div className={section3Styles.emblaFlex}>
            {artworks.map((artwork, index) => {
              const { scale, opacity, zIndex } = getCardMotion(index)
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
    </div>
  )
}
