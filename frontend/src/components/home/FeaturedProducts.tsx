import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useProducts } from '../../store/ProductsContext'
import ProductCard from '../product/ProductCard'

export default function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { products } = useProducts()
  const featuredProducts = products.filter((p) => p.isFeatured)

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-black">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Investment Grade</p>
            <h2 className="font-serif text-4xl lg:text-6xl text-ivory font-light">
              Featured Pieces
            </h2>
          </div>
          <Link
            to="/gemstones"
            className="hidden md:inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1.5 hover:border-gold transition-colors"
          >
            View All Collection
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
