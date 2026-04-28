'use client'

import { motion } from 'framer-motion'
import { footerStyles } from '../styles/FooterStyles'

interface FooterProps {
  messages: {
    footer: {
      rights: string
      credits: string
      portfolio: string
    }
  }
}

// Ícone simples de seta/link externo
function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className={footerStyles.iconBase}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer({ messages }: FooterProps) {
  const { rights, credits, portfolio } = messages.footer

  return (
    <footer
      className={footerStyles.footerContainer}
      style={footerStyles.footerInline}
    >
      <div className={footerStyles.contentWrapper}>
        {/* Esquerda - Créditos do desenvolvedor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={footerStyles.creditsContainer}
        >
          <span>{credits}</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyles.portfolioLink}
          >
            {portfolio}
            <ExternalLinkIcon />
          </a>
        </motion.div>

        {/* Centro - Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className={footerStyles.copyrightText}
        >
          {rights}
        </motion.p>

        {/* Direita - Ano */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={footerStyles.yearText}
        >
          2025
        </motion.div>
      </div>
    </footer>
  )
}
