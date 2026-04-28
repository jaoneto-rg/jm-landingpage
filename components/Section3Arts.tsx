'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { section3Styles, getActiveItemClass } from '../styles/Section3ArtsStyles'

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

  const autoScrollPlugin = useRef(
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      speed: 0.8,
      direction: 'backward',
    })
  ).current

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [autoScrollPlugin]
  )

  // Scroll para o slide selecionado
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

  // IntersectionObserver para animação de entrada
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

  const { title, artworks } = messages.works

  return (
    <div
      ref={sectionRef}
      className={section3Styles.container}
    >
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className={section3Styles.titleContainer}
      >
        <h2 className={section3Styles.title}>{title}</h2>
      </motion.div>

      {/* Carrossel Wrapper com Efeito de Fade/Blur nas bordas */}
      <div className={section3Styles.carouselWrapper}>
        {/* Overlay Esquerdo */}
        <div 
          className={section3Styles.overlayLeft}
          style={section3Styles.overlayInlineLeft}
        />
        {/* Overlay Direito */}
        <div 
          className={section3Styles.overlayRight}
          style={section3Styles.overlayInlineRight}
        />

        {/* Carrossel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={section3Styles.emblaContainer}
        ref={emblaRef}
      >
        <div className={section3Styles.emblaFlex}>
          {artworks.map((artwork, index) => (
            <div
              key={index}
              className={section3Styles.itemWrapper}
              style={section3Styles.itemWrapperInline}
            >
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`${section3Styles.itemMotionBase} ${getActiveItemClass(selectedIndex === index)}`}
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

                  <span className={section3Styles.techniqueBadge}>
                    {artwork.technique}
                  </span>

                  <p className={section3Styles.artworkDescription}>{artwork.description}</p>
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
        className={section3Styles.navContainer}
      >
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className={section3Styles.navButton}
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className={section3Styles.navButton}
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
