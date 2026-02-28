import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function BrandStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section ref={ref} className="py-28 lg:py-40" style={{ background: 'linear-gradient(180deg, #0E0C09 0%, #121009 50%, #0E0C09 100%)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85"
                alt="Hamlet Global gemstone heritage"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative gold frame offset */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gold/40 pointer-events-none" />
            <div className="absolute -top-8 -left-8 w-24 h-24 border border-gold/25 pointer-events-none" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6">Our Heritage</p>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-ivory font-light leading-[1.15] mb-10">
              From the World's
              <br />
              <em className="text-gold not-italic">Finest Mines</em>
              <br />
              to Your Collection
            </h2>
            <div className="space-y-5 font-sans text-[13px] text-ivory/80 leading-[1.9]">
              <p>
                For over fifteen years, Hamlet Global has stood at the forefront of rare gemstone
                procurement and fine jewellery creation. Our journey began with a singular vision:
                to make investment-grade gemstones accessible to discerning collectors worldwide.
              </p>
              <p>
                We source directly from mines across Colombia, Kashmir, Burma, and Sri Lanka —
                maintaining relationships built on trust, ethics, and an uncompromising commitment
                to quality. Every stone is evaluated by our master gemologist before it enters our collection.
              </p>
              <p>
                From our atelier in Dubai, we serve private clients across six continents, offering
                factory-direct pricing 20–30% below traditional retail — without ever compromising
                on quality, authenticity, or the art of exceptional service.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 mt-10 font-sans text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1.5 hover:border-gold transition-all duration-300 group"
            >
              Discover Our Story
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
