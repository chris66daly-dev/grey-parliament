import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grey Parliament — Your Voice Matters',
  description: 'The independent political voice of the over 50s. Your vote goes to your MP every Friday. Verify you are 50 or over.',
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
      <body><div style={{background:"#c9a84c",padding:"8px 24px",textAlign:"center",fontFamily:"sans-serif",fontSize:13,color:"#1a1814",fontWeight:600}}>We are not perfect. Neither is democracy. But we are both worth fighting for. 🏛️</div>{children}</body>
    </html>
  )
}
