import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Globe, Star, Shield } from 'lucide-react'
import { trustStats } from '../../constants/data'

const icons = [Award, Globe, Star, Shield]

export default function TrustIndicators() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 border-y border-gold/25" style={{ background: 'linear-gradient(180deg, #121009 0%, #16130A 50%, #121009 100%)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {trustStats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="w-6 h-6 text-gold mx-auto mb-4" />
                <div className="font-serif text-4xl lg:text-5xl text-ivory mb-2 font-light">
                  {stat.value}
                </div>
                <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-ivory/65">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
