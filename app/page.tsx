import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
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
      <ThisWeeksVote />
      <HowItWorks />
      <MPTracker />
      <Pricing />
      <Manifesto />
      <Footer />
    </main>
  )
}
