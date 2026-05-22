'use client'

import { createContext, useContext } from 'react'
import ptMessages from '@/messages/pt.json'
import enMessages from '@/messages/en.json'

type Messages = typeof ptMessages

export const I18nContext = createContext<{ locale: string; messages: Messages }>({
  locale: 'pt',
  messages: ptMessages,
})

export function useI18n() {
  return useContext(I18nContext)
}

export { ptMessages, enMessages }
export type { Messages }
