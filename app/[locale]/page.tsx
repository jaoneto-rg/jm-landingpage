'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Section1Hero from '@/components/Section1Hero'
import Section2Model3D from '@/components/Section2Model3D'
import Section3Arts from '@/components/Section3Arts'
import Section4Timeline from '@/components/Section4Timeline'
import Section5Contact from '@/components/Section5Contact'
import Footer from '@/components/Footer'
import { useI18n } from './layout'

export default function HomePage() {
  const { messages } = useI18n()
  const mainRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('hero')

  // IntersectionObserver para detectar seção ativa
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

  // Atualizar URL hash quando mudar de seção
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${activeSection}`)
    }
  }, [activeSection])

  return (
    <div
      ref={mainRef}
      className="snap-container"
      id="main-container"
    >
      {/* Seção 1: Hero */}
      <section id="hero" className="snap-section">
        <Section1Hero messages={messages} />
      </section>

      {/* Seção 2: Modelo 3D */}
      <section id="model" className="snap-section">
        <Section2Model3D messages={messages} />
      </section>

      {/* Seção 3: Obras */}
      <section id="arts" className="snap-section">
        <Section3Arts messages={messages} />
      </section>

      {/* Seção 4: Trajetória */}
      <section id="timeline" className="snap-section">
        <Section4Timeline messages={messages} />
      </section>

      {/* Seção 5: Contato */}
      <section id="contact" className="snap-section" style={{ minHeight: '80vh' }}>
        <Section5Contact messages={messages} />
      </section>

      {/* Rodapé */}
      <Footer messages={messages} />
    </div>
  )
}
