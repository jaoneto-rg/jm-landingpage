'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sidebarStyles, getNavButtonClass, getNavIndicatorClass, getLangButtonClass } from '../styles/SidebarStyles'

interface SidebarProps {
  locale: string
  onLocaleChange: (locale: string) => void
  messages: {
    nav: {
      hero: string
      model: string
      arts: string
      timeline: string
      contact: string
    }
    lang: {
      pt: string
      en: string
    }
  }
}

export default function Sidebar({ locale, onLocaleChange, messages }: SidebarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hasHovered, setHasHovered] = useState(false)

  // Items de navegação
  const navItems = [
    { id: 'hero', label: messages.nav.hero },
    { id: 'model', label: messages.nav.model },
    { id: 'arts', label: messages.nav.arts },
    { id: 'timeline', label: messages.nav.timeline },
    { id: 'contact', label: messages.nav.contact },
  ]

  // Detectar seção ativa via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'model', 'arts', 'timeline', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId)
              }
            })
          },
          { threshold: 0.5 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Handler para mouse move - detectar quando mouse está na zona de 20px da esquerda
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientX <= 20) {
      setIsVisible(true)
      setHasHovered(true)
    } else if (e.clientX > 240) {
      // Só fecha se o mouse sair da sidebar (220px + margem)
      setIsVisible(false)
    }
  }, [])

  // Adicionar listener global de mousemove
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Scroll suave customizado com easing suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    const container = document.getElementById('main-container')

    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const targetScrollTop = container.scrollTop + (elementRect.top - containerRect.top)
      const startScrollTop = container.scrollTop
      const distance = targetScrollTop - startScrollTop
      const duration = 1000
      let startTime: number | null = null

      // Easing function ease-out-cubic
      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3)
      }

      const animateScroll = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeOutCubic(progress)

        container.scrollTop = startScrollTop + distance * ease

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }

    setIsVisible(false)
  }

  // Alternar idioma
  const toggleLocale = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt'
    onLocaleChange(newLocale)
  }

  return (
    <>
      {/* Indicador visual permanente da sidebar - esconde quando menu abre */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: isVisible ? 0 : 1,
          x: isVisible ? -20 : 0,
          pointerEvents: isVisible ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        className={sidebarStyles.indicatorContainer}
      >
        {/* Linha vertical sutil */}
        <div className={sidebarStyles.verticalLine} />

        {/* Menu hint */}
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={sidebarStyles.menuHintContainer}
        >
          <span className={sidebarStyles.menuHintText} style={sidebarStyles.menuHintTextInline}>
            Menu
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={sidebarStyles.menuIcon}>
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Linha vertical sutil */}
        <div className={sidebarStyles.verticalLine} />
      </motion.div>

      {/* Zona invisível de trigger na esquerda - mais larga para facilitar */}
      <div
        className={sidebarStyles.triggerZone}
        style={sidebarStyles.triggerZoneInline}
        onMouseEnter={() => {
          setIsVisible(true)
          setHasHovered(true)
        }}
      />

      {/* Sidebar */}
      <motion.nav
        initial={{ x: -240, opacity: 0 }}
        animate={{
          x: isVisible ? 0 : -240,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={sidebarStyles.sidebarNav}
        style={sidebarStyles.sidebarNavInline}
        onMouseLeave={() => setIsVisible(false)}
      >
        {/* Logo / Nome */}
        <div className={sidebarStyles.headerContainer}>
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -60,
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={sidebarStyles.logoText}
          >
            João Mauricio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -60 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -60,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={sidebarStyles.subtitleText}
          >
            {locale === 'pt' ? 'Escultor' : 'Sculptor'}
          </motion.p>
        </div>

        {/* Links de navegação */}
        <ul className={sidebarStyles.linksContainer}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                x: isVisible ? 0 : -60,
              }}
              transition={{
                delay: 0.15 + index * 0.08,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`${sidebarStyles.navButtonBase} ${getNavButtonClass(activeSection === item.id)}`}
                aria-label={`Ir para seção ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {/* Indicador de ativo - com transição suave */}
                <span
                  className={`${sidebarStyles.navIndicatorBase} ${getNavIndicatorClass(activeSection === item.id)}`}
                />
                {item.label}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Botão de troca de idioma */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : -60,
          }}
          transition={{
            delay: 0.55,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={sidebarStyles.langContainer}
        >
          <div className={sidebarStyles.langWrapper}>
            <span className={sidebarStyles.langLabel}>{locale === 'pt' ? 'Idioma' : 'Language'}</span>
            <div className={sidebarStyles.langButtonsWrapper}>
              <button
                onClick={() => locale !== 'pt' && toggleLocale()}
                className={getLangButtonClass(locale === 'pt')}
                aria-label="Mudar para Português"
              >
                {messages.lang.pt}
              </button>
              <span className={sidebarStyles.langSeparator}>|</span>
              <button
                onClick={() => locale !== 'en' && toggleLocale()}
                className={getLangButtonClass(locale === 'en')}
                aria-label="Switch to English"
              >
                {messages.lang.en}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
