'use client'

import { ReactNode, useEffect, useState, use } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// Provider simples de i18n via context
import { createContext, useContext } from 'react'
import ptMessages from '@/messages/pt.json'
import enMessages from '@/messages/en.json'

type Messages = typeof ptMessages

const I18nContext = createContext<{ locale: string; messages: Messages }>({
  locale: 'pt',
  messages: ptMessages,
})

export function useI18n() {
  return useContext(I18nContext)
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Next.js 16+: params é uma Promise, precisa usar React.use()
  const { locale } = use(params)
  const pathname = usePathname()
  const router = useRouter()
  const messages = locale === 'en' ? enMessages : ptMessages

  // Função para trocar idioma
  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <I18nContext.Provider value={{ locale, messages }}>
      <div className="relative min-h-screen bg-black">
        {/* Sidebar com navegação */}
        <Sidebar
          locale={locale}
          onLocaleChange={handleLocaleChange}
          messages={messages}
        />

        {/* Conteúdo principal com animação de entrada */}
        <AnimatePresence mode="wait">
          <motion.main
            key={locale}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </I18nContext.Provider>
  )
}
