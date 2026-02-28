import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { collections } from '../../constants/data'

export default function Collections() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 lg:py-40" style={{ background: '#0E0C09' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-18"
        >
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Curated For the Discerning</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-ivory font-light">Our Collections</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: index * 0.12 }}
            >
              <Link to={collection.link} className="group block">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden mb-5 relative">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                  {collection.itemCount > 0 && (
                    <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm px-3 py-1.5">
                      <span className="font-sans text-[9px] tracking-widest text-gold">
                        {collection.itemCount} pieces
                      </span>
                    </div>
                  )}
                  {collection.itemCount === 0 && (
                    <div className="absolute top-4 right-4 bg-gold/90 px-3 py-1.5">
                      <span className="font-sans text-[9px] tracking-widest text-black font-medium">Custom</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <h3 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors duration-300 mb-2">
                  {collection.name}
                </h3>
                <p className="font-sans text-[11px] text-ivory/70 leading-relaxed mb-4">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-gold">
                  Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
