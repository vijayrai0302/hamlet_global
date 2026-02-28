import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { WHATSAPP_BASE } from '../../constants/data'

export default function Hero() {
  const scrollDown = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85')",
        }}
      />
      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-7"
        >
          Est. 2025 — Dubai, UAE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory font-light leading-[1.08] mb-8"
        >
          Rare Gems.
          <br />
          <em className="text-gold not-italic">Timeless</em> Craftsmanship.
          <br />
          Global Trust.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-sans text-[13px] text-ivory/90 tracking-[0.12em] max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Certified natural gemstones &amp; bespoke fine jewellery.
          <br />
          Factory-direct pricing. Shipped globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/gemstones"
            className="bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-300 min-w-[200px] text-center"
          >
            Explore Collection
          </Link>
          <a
            href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ivory/65 text-ivory font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300 min-w-[200px] text-center"
          >
            Request Consultation
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/75 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={26} />
      </button>
    </section>
  )
}
