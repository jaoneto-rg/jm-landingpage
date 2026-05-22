'use client'

import { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import { I18nContext, ptMessages, enMessages } from '@/context/i18n'

interface LocaleLayoutProps {
  children: ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params
  const pathname = usePathname()
  const router = useRouter()
  const messages = locale === 'en' ? enMessages : ptMessages

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
