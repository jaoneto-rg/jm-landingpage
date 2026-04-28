'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { section5Styles } from '../styles/Section5ContactStyles'

interface Section5ContactProps {
  messages: {
    contact: {
      title: string
      whatsapp: string
      email: string
      instagram: string
    }
  }
}

// Ícone do WhatsApp em SVG puro
function WhatsAppIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className={section5Styles.svgBase}
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.502-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"
        fill="currentColor"
      />
    </svg>
  )
}

// Ícone de envelope em SVG puro
function EmailIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className={section5Styles.svgBase}
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2 7l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

// Ícone do Instagram em SVG puro
function InstagramIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className={section5Styles.svgBase}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="18.5"
        cy="5.5"
        r="1.5"
        fill="currentColor"
      />
    </svg>
  )
}

// Componente de bloco de contato
function ContactBlock({
  icon,
  label,
  value,
  href,
  delay,
  isVisible,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  delay: number
  isVisible: boolean
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={section5Styles.contactBlock}
      aria-label={`Contato via ${label}`}
    >
      {/* Ícone */}
      <div className={section5Styles.iconContainer}>
        {icon}
      </div>

      {/* Label */}
      <span className={section5Styles.label}>{label}</span>

      {/* Valor */}
      <span className={section5Styles.valueContainer}>
        {value}
        {/* Linha branca embaixo no hover */}
        <span
          className={section5Styles.valueUnderline}
        />
      </span>
    </motion.a>
  )
}

export default function Section5Contact({ messages }: Section5ContactProps) {
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

  const { title, whatsapp, email, instagram } = messages.contact

  // Extrair valores para os links
  const whatsappNumber = whatsapp.replace(/\D/g, '')
  const emailAddress = email
  const instagramHandle = instagram.replace('@', '')

  const contactItems = [
    {
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      value: whatsapp,
      href: `https://wa.me/${whatsappNumber}`,
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: email,
      href: `mailto:${emailAddress}`,
    },
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      value: instagram,
      href: `https://instagram.com/${instagramHandle}`,
    },
  ]

  return (
    <div
      ref={sectionRef}
      className={section5Styles.container}
    >
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className={section5Styles.titleContainer}
      >
        <h2 className={section5Styles.title}>{title}</h2>
      </motion.div>

      {/* Blocos de contato */}
      <div className={section5Styles.blocksContainer}>
        {contactItems.map((item, index) => (
          <ContactBlock
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            href={item.href}
            delay={0.1 + index * 0.1}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  )
}
