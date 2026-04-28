import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'João Mauricio | Escultor & Artista Plástico',
  description: 'Portfólio de João Mauricio, escultor e artista plástico. Obras em bronze, mármore e materiais contemporâneos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
