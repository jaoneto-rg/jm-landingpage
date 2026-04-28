// Página principal - redireciona para /pt
import { redirect, RedirectType } from 'next/navigation'

export default function Home() {
  redirect('/pt', RedirectType.replace)
}
