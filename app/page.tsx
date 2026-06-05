import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import ThisWeeksVote from '@/components/ThisWeeksVote'
import HowItWorks from '@/components/HowItWorks'
import MPTracker from '@/components/MPTracker'
import Pricing from '@/components/Pricing'
import Manifesto from '@/components/Manifesto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Suspense fallback={null}>
        <StatsBar />
      </Suspense>
      <ThisWeeksVote />
      <HowItWorks />
      <MPTracker />
      <Pricing />
      <Manifesto />
      <Footer />
    </main>
  )
}
