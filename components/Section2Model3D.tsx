'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { section2Styles } from '../styles/Section2Model3DStyles'

// Carregamento dinâmico do visualizador 3D para evitar erros de SSR
const ModelViewer3D = dynamic(() => import('./ModelViewer3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/20 animate-pulse" />
})

interface Section2Model3DProps {
  messages: {
    featured: {
      title: string
      subtitle: string
      instruction: string
      labels: {
        year: string
        dimensions: string
        edition: string
      }
      artwork: {
        title: string
        material: string
        description: string
        year: string
        dimensions: string
        edition: string
        image: string
        model3d?: string
      }
    }
  }
}

// Ícone 3D simples
function Icon3D() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className={section2Styles.iconSvg}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Section2Model3D({ messages }: Section2Model3DProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showModel, setShowModel] = useState(false)

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

  const { title, subtitle, instruction, artwork, labels } = messages.featured

  return (
    <div
      ref={sectionRef}
      className={section2Styles.container}
      style={section2Styles.containerInline}
    >
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className={section2Styles.titleContainer}
      >
        <h2
          className={section2Styles.title}
          style={section2Styles.titleInline}
        >
          {title}
        </h2>
      </motion.div>

      {/* Container principal com preview 3D */}
      <div className={section2Styles.mainContainer}>

        {/* Imagem da escultura ou Visualizador 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={section2Styles.imageWrapper}
        >
          <div className={section2Styles.imageContainer}>
            {artwork.model3d && showModel ? (
              <ModelViewer3D modelUrl={artwork.model3d} />
            ) : (
              <>
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className={section2Styles.image}
                  style={section2Styles.imageInline}
                  priority
                />

                {/* Overlay com indicador 3D */}
                <div 
                  className={`${section2Styles.overlay} cursor-pointer hover:bg-black/40 transition-colors`}
                  onClick={() => artwork.model3d && setShowModel(true)}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className={section2Styles.iconContainer}
                  >
                    <Icon3D />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                    transition={{ delay: 0.7 }}
                    className={section2Styles.overlayTextContainer}
                  >
                    <p className={section2Styles.overlaySubtitle}>{subtitle}</p>
                    <p className={section2Styles.overlayDescription}>
                      {artwork.model3d ? 'Clique para interagir em 3D' : artwork.description}
                    </p>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Informações da obra */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={section2Styles.infoContainer}
        >
          <div>
            <h3 className={section2Styles.artworkTitle}>
              {artwork.title}
            </h3>
            <span className={section2Styles.badge}>
              {artwork.material}
            </span>
          </div>

          <p className={section2Styles.artworkDescription}>
            {artwork.description}
          </p>

          <div className={section2Styles.specsContainer}>
            <div className={section2Styles.specRow}>
              <span className={section2Styles.specLabel}>{labels.year}</span>
              <span className={section2Styles.specValue}>{artwork.year}</span>
            </div>
            <div className={section2Styles.specRow}>
              <span className={section2Styles.specLabel}>{labels.dimensions}</span>
              <span className={section2Styles.specValue}>{artwork.dimensions} cm</span>
            </div>
            <div className={section2Styles.specRow}>
              <span className={section2Styles.specLabel}>{labels.edition}</span>
              <span className={section2Styles.specValue}>{artwork.edition}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instrução */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={section2Styles.instructionContainer}
      >
        <span className={section2Styles.instructionDot} />
        {instruction}
      </motion.p>
    </div>
  )
}
