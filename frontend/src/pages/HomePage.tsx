import SEO from '../components/shared/SEO'
import Hero from '../components/home/Hero'
import BrandStory from '../components/home/BrandStory'
import Collections from '../components/home/Collections'
import TrustIndicators from '../components/home/TrustIndicators'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Rare Gems & Timeless Jewellery"
        description="Hamlet Global — certified natural gemstones, diamonds, and bespoke fine jewellery direct from source. GIA, IGI & SGL certified. Factory-direct pricing. Global shipping from Dubai."
        keywords="certified gemstones Dubai, natural emerald, Kashmir sapphire, GIA certified diamonds, bespoke jewellery UAE, investment gems"
        image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80"
      />
      <Hero />
      <BrandStory />
      <TrustIndicators />
      <Collections />
      <FeaturedProducts />
      <Testimonials />
      <CTABanner />
    </>
  )
}
