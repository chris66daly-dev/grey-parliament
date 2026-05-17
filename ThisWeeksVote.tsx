import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grey Parliament — Your Voice Matters',
  description: 'The independent political voice of the over 50s. No party. No agenda. Just experience.',
  openGraph: {
    title: 'Grey Parliament — Your Voice Matters',
    description: 'Led by us. For us. And our kids.',
    url: 'https://greyparliament.co.uk',
    siteName: 'Grey Parliament',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
