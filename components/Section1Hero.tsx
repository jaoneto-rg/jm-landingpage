'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { heroStyles } from '../styles/Section1HeroStyles'

interface Section1HeroProps {
  messages: {
    hero: {
      name: string
      profession: string
      bio: string
      cta: string
    }
  }
}

export default function Section1Hero({ messages }: Section1HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  // Scroll para a seção de obras
  const scrollToWorks = () => {
    const element = document.getElementById('arts')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { name, profession, bio, cta } = messages.hero

  return (
    <div
      ref={sectionRef}
      className={heroStyles.container}
    >
      <div className={heroStyles.wrapper}>
        <div className={heroStyles.contentContainer}>
          {/* Bloco esquerdo - Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={heroStyles.textBlock}
          >
            {/* Nome do artista */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={heroStyles.name}
              style={heroStyles.nameInline}
            >
              {name}
            </motion.h1>

            {/* Profissão */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={heroStyles.profession}
            >
              {profession}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={heroStyles.bio}
            >
              {bio}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={scrollToWorks}
              className={heroStyles.ctaButton}
              aria-label={cta}
            >
              {cta}
            </motion.button>
          </motion.div>

          {/* Bloco direito - Foto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={heroStyles.photoBlock}
          >
            <div
              className={heroStyles.photoContainer}
              style={heroStyles.photoContainerInline}
            >
              {/* Placeholder de imagem - usará uma imagem do Unsplash */}
              <div
                className={heroStyles.photoPlaceholder}
                style={heroStyles.photoPlaceholderInline}
              >
  <Image
                  src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=800&fit=crop"
                  alt="Foto do artista"
                  fill
                  className={heroStyles.image}
                  style={heroStyles.imageInline}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.5 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={heroStyles.scrollIndicator}
      >
        <span className={heroStyles.scrollText}>Scroll</span>
        <div className={heroStyles.scrollLine} />
      </motion.div>
    </div>
  )
}
