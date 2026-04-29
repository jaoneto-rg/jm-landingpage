'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { section3Styles } from '../styles/Section3ArtsStyles'

interface Artwork {
  title: string
  technique: string
  description: string
}

interface Section3ArtsProps {
  messages: {
    works: {
      title: string
      artworks: Artwork[]
    }
  }
}

// Imagens placeholder do Unsplash para as obras
const artworkImages = [
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=500&fit=crop',
]

export default function Section3Arts({ messages }: Section3ArtsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const autoScrollPlugin = useRef(
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      speed: 1.0,
      direction: 'backward',
    })
  ).current

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false, dragFree: true },
    [autoScrollPlugin]
  )

  // Detecta mobile/desktop
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Detecção precisa do slide central usando selectedScrollSnap + scroll em tempo real
  const updateCenter = useCallback(() => {
    if (!emblaApi) return
    const snaps = emblaApi.scrollSnapList()
    const progress = emblaApi.scrollProgress()
    let closestIdx = 0
    let closestDist = Infinity
    snaps.forEach((snap, i) => {
      // Normaliza a distância considerando loop infinito
      let dist = Math.abs(snap - progress)
      if (dist > 0.5) dist = 1 - dist
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = i
      }
    })
    setSelectedIndex(closestIdx)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('scroll', updateCenter)
    emblaApi.on('select', updateCenter)
    emblaApi.on('reInit', updateCenter)
    updateCenter()

    const autoScroll = emblaApi.plugins().autoScroll
    if (!autoScroll) return
    if (!autoScroll.isPlaying()) autoScroll.play()

    // Retoma o auto-scroll após interação do usuário
    const resumeAfterDrag = () => {
      setTimeout(() => {
        if (!autoScroll.isPlaying()) autoScroll.play()
      }, 1200)
    }
    emblaApi.on('pointerUp', resumeAfterDrag)

    return () => {
      emblaApi.off('scroll', updateCenter)
      emblaApi.off('select', updateCenter)
      emblaApi.off('reInit', updateCenter)
      emblaApi.off('pointerUp', resumeAfterDrag)
    }
  }, [emblaApi, updateCenter])

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

  // Calcula scale, opacity e zIndex para cada card de forma independente
  const getCardMotion = (index: number) => {
    const isCenter = selectedIndex === index
    const isHovered = hoveredIndex === index
    const someoneHovered = hoveredIndex !== null

    if (!isMobile) {
      // Desktop: hover é o foco
      if (isHovered) return { scale: 1.08, opacity: 1, zIndex: 30 }
      if (someoneHovered) return { scale: 0.97, opacity: 0.6, zIndex: 1 }
      return { scale: 1.0, opacity: 1, zIndex: 1 }
    }

    // Mobile: card central é o foco
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
                  style={{ perspective: '1000px', position: 'relative', zIndex }}
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
                    style={section3Styles.itemInlineHeight}
                  >
                    {/* Imagem da obra */}
                    <div className={section3Styles.imageContainer}>
                      <Image
                        src={artworkImages[index]}
                        alt={artwork.title}
                        fill
                        className={section3Styles.image}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>

                    {/* Informações da obra */}
                    <div className={section3Styles.infoContainer}>
                      <h3 className={section3Styles.artworkTitle}>{artwork.title}</h3>
                      <span className={section3Styles.techniqueBadge}>{artwork.technique}</span>
                      <p className={section3Styles.artworkDescription}>{artwork.description}</p>
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
