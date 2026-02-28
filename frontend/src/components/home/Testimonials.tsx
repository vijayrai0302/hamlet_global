import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../../constants/data'

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-obsidian/40">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Client Voices</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-ivory font-light">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className="border border-gold/15 p-9 relative hover:border-gold/30 transition-colors duration-500"
            >
              {/* Large quote mark */}
              <div className="font-serif text-7xl text-gold/15 leading-none absolute top-4 left-7 select-none">
                "
              </div>

              <div className="flex items-center gap-1 mb-5 mt-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={11} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="font-sans text-[12px] text-ivory/60 leading-[1.9] mb-7 italic">
                "{t.text}"
              </p>

              <div className="border-t border-gold/10 pt-5">
                <div className="font-serif text-ivory text-base">{t.name}</div>
                <div className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase mt-1">
                  {t.location}
                </div>
                <div className="font-sans text-[10px] tracking-widest text-gold/55 mt-1">
                  {t.purchasedItem}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
