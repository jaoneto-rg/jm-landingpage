'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
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

  const items = messages.journey.items

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
            {items.map((item, index) => {
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
                    <div className={section4Styles.imageContainer}>
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
                    </div>

                    {/* Conteúdo do card */}
                    <div className={section4Styles.contentContainer}>
                      <h3 className={section4Styles.itemTitle}>{item.title}</h3>
                      <p className={section4Styles.itemDate}>{item.date}</p>
                      <p className={section4Styles.itemLocation}>{item.location}</p>
                      <p className={section4Styles.itemDescription}>{item.description}</p>
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
