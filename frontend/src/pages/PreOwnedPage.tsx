import { motion } from 'framer-motion'
import { ShieldCheck, Award, Recycle, ArrowRight } from 'lucide-react'
import { WHATSAPP_BASE } from '../constants/data'
import { useProducts } from '../store/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/shared/SEO'

const authenticitySteps = [
  {
    step: '01',
    title: 'Expert Inspection',
    desc: 'Every piece undergoes rigorous examination by our master gemologist and jewellery authenticator.',
  },
  {
    step: '02',
    title: 'Documentation Review',
    desc: 'Original certificates, receipts, and brand documentation are verified and archived.',
  },
  {
    step: '03',
    title: 'Authentication Certificate',
    desc: 'We issue our own certificate of authenticity, backed by a full provenance report.',
  },
  {
    step: '04',
    title: 'Value Guarantee',
    desc: 'Pieces are priced 25–40% below retail, offering exceptional value for discerning collectors.',
  },
]

export default function PreOwnedPage() {
  const { products } = useProducts()
  const preOwned = products.filter((p) => p.category === 'pre-owned')

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Certified Pre-Owned Luxury Jewellery"
        description="Authenticated pre-owned jewellery from Cartier, Van Cleef & Arpels and prestigious maisons — 25–40% below retail. Every piece verified and certified. Dubai."
        keywords="pre-owned luxury jewellery Dubai, certified Cartier, authenticated luxury watches gems UAE, second hand luxury jewellery"
      />
      {/* Header */}
      <div className="pt-36 pb-20 text-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A646 0%, transparent 70%)',
        }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6"
          >
            Certified Pre-Owned
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl lg:text-7xl text-ivory font-light mb-8"
          >
            Pre-Owned
            <br />
            <em className="text-gold not-italic">Luxury Jewellery</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[13px] text-ivory/50 leading-relaxed"
          >
            Authenticated pre-owned pieces from the world's most prestigious maisons.
            Every item verified, certified, and priced for the informed collector.
          </motion.p>
        </div>
      </div>

      {/* Why Pre-Owned */}
      <div className="py-20 bg-gold/5 border-y border-gold/12">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { Icon: ShieldCheck, title: 'Fully Authenticated', desc: 'Each piece verified by our master authenticator with full provenance documentation.' },
              { Icon: Award, title: 'Exceptional Value', desc: 'Access prestigious maison pieces at 25–40% below original retail price.' },
              { Icon: Recycle, title: 'Sustainable Luxury', desc: 'Choosing pre-owned reduces demand for new mining — luxury with a conscience.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon className="w-6 h-6 text-gold mx-auto mb-5 opacity-80" />
                <h3 className="font-serif text-xl text-ivory mb-3">{title}</h3>
                <p className="font-sans text-[12px] text-ivory/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <h2 className="font-serif text-3xl text-ivory font-light mb-12">
          Available Pieces
        </h2>
        {preOwned.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {preOwned.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-gold/10">
            <p className="font-serif text-2xl text-ivory/30 mb-4">New arrivals coming soon</p>
            <p className="font-sans text-[12px] text-ivory/25 mb-8">
              We receive authenticated pre-owned pieces regularly. Contact us to be notified.
            </p>
            <a
              href={`${WHATSAPP_BASE}?text=Hello,%20I%20am%20interested%20in%20pre-owned%20luxury%20jewellery.%20Please%20notify%20me%20of%20new%20arrivals.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold text-gold font-sans text-[11px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-gold hover:text-black transition-all"
            >
              Notify Me <ArrowRight size={12} />
            </a>
          </div>
        )}
      </div>

      {/* Authentication Process */}
      <div className="py-24 bg-obsidian/40 border-t border-gold/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Our Process</p>
            <h2 className="font-serif text-4xl text-ivory font-light">How We Authenticate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {authenticitySteps.map((s) => (
              <div key={s.step} className="relative">
                <div className="font-serif text-5xl text-gold/15 mb-4">{s.step}</div>
                <h3 className="font-serif text-lg text-ivory mb-3">{s.title}</h3>
                <p className="font-sans text-[12px] text-ivory/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sell CTA */}
      <div className="py-20 text-center border-t border-gold/10">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6">Selling?</p>
          <h2 className="font-serif text-3xl text-ivory font-light mb-6">
            Do you have a piece to sell?
          </h2>
          <p className="font-sans text-[12px] text-ivory/45 leading-relaxed mb-10">
            We purchase authenticated luxury jewellery and gemstones. Receive a free valuation
            from our experts — discreet, professional, and competitive.
          </p>
          <a
            href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20sell%20or%20get%20a%20valuation%20for%20my%20jewellery.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-300"
          >
            Request a Valuation
          </a>
        </div>
      </div>
    </div>
  )
}
