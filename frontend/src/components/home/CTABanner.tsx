import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { WHATSAPP_BASE } from '../../constants/data'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="py-36 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-7">Bespoke Service</p>
          <h2 className="font-serif text-4xl lg:text-6xl xl:text-7xl text-ivory font-light leading-tight mb-8">
            Create Your
            <br />
            <em className="text-gold not-italic">Bespoke</em> Jewellery
          </h2>
          <p className="font-sans text-[13px] text-ivory/55 leading-[1.9] mb-12 max-w-xl mx-auto">
            From concept to creation, our master craftsmen bring your vision to life.
            Every bespoke piece is a singular work of art, crafted to your exact specifications
            and delivered with the care it deserves.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/custom"
              className="bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-300"
            >
              Start Your Journey
            </Link>
            <a
              href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20discuss%20a%20custom%20jewellery%20piece.`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ivory/30 text-ivory font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
