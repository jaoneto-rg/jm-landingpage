'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { section4Styles, getActiveTimelineItemClass } from '../styles/Section4TimelineStyles'

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

  const items = messages.journey.items

  const autoScrollPlugin = useRef(
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      speed: 0.8,
      direction: 'forward',
    })
  ).current

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [autoScrollPlugin]
  )

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi]
  )

  // Atualizar índice selecionado quando scrollar ou arrastar
  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const inView = emblaApi.slidesInView()
    if (inView.length > 0) {
      const centerIndex = inView[Math.floor(inView.length / 2)]
      setSelectedIndex(centerIndex)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    // Configura eventos de scroll para atualizar o item central
    emblaApi.on('scroll', onScroll)
    emblaApi.on('select', onScroll)
    onScroll()

    // Configura o AutoScroll
    const autoScroll = emblaApi.plugins().autoScroll
    if (!autoScroll) return

    if (!autoScroll.isPlaying()) autoScroll.play()

    const resumeAutoScroll = () => {
      if (!autoScroll.isPlaying()) autoScroll.play()
    }

    // Retoma a rolagem após o usuário soltar (touch/drag)
    emblaApi.on('pointerUp', () => {
      setTimeout(resumeAutoScroll, 1500)
    })

    // Garante retomada quando o mouse sai da área
    const node = emblaApi.rootNode()
    if (node) {
      node.addEventListener('mouseleave', resumeAutoScroll)
    }

    return () => {
      emblaApi.off('scroll', onScroll)
      emblaApi.off('select', onScroll)
      if (node) node.removeEventListener('mouseleave', resumeAutoScroll)
    }
  }, [emblaApi, onScroll])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { 
        root: document.getElementById('main-container'),
        threshold: 0.2 
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const { title } = messages.journey

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

      {/* Carrossel Wrapper com Efeito de Fade/Blur nas bordas */}
      <div className={section4Styles.carouselWrapper}>
        {/* Overlay Esquerdo */}
        <div 
          className={section4Styles.overlayLeft}
          style={section4Styles.overlayInlineLeft}
        />
        {/* Overlay Direito */}
        <div 
          className={section4Styles.overlayRight}
          style={section4Styles.overlayInlineRight}
        />

        {/* Carrossel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={section4Styles.emblaContainer}
        ref={emblaRef}
      >
        <div className={section4Styles.emblaFlex}>
          {items.map((item, index) => (
            <div
              key={index}
              className={section4Styles.itemWrapper}
            >
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`${section4Styles.itemMotionBase} ${getActiveTimelineItemClass(selectedIndex === index)}`}
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
                  <h3 className={section4Styles.itemTitle}>
                    {item.title}
                  </h3>

                  <p className={section4Styles.itemDate}>{item.date}</p>

                  <p className={section4Styles.itemLocation}>{item.location}</p>

                  <p className={section4Styles.itemDescription}>{item.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      </div>

      {/* Navegação Minimalista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={section4Styles.navContainer}
      >
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className={section4Styles.navButton}
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className={section4Styles.navButton}
          aria-label="Próximo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}
