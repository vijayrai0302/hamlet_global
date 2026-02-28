import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

import { useProducts } from '../store/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/shared/SEO'

const subcategories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets']
const metals = ['All', 'Platinum 950', '18K White Gold', '18K Yellow Gold', '18K Rose Gold']

export default function JewelleryPage() {
  const [subFilter, setSubFilter] = useState('All')
  const [metalFilter, setMetalFilter] = useState('All')

  const { products } = useProducts()
  const jewellery = products.filter((p) => p.category === 'jewellery')

  const filtered = useMemo(() => {
    return jewellery.filter((p) => {
      const matchSub = subFilter === 'All' || p.subcategory === subFilter
      const matchMetal = metalFilter === 'All' || p.details.metal === metalFilter
      return matchSub && matchMetal
    })
  }, [jewellery, subFilter, metalFilter])

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Fine Jewellery Collection"
        description="Exquisite fine jewellery featuring certified gemstones — rings, necklaces, earrings and bracelets crafted in platinum and 18K gold. Bespoke luxury jewellery from Dubai."
        keywords="fine jewellery Dubai, luxury gemstone rings, diamond necklace UAE, bespoke jewellery, platinum jewellery, 18K gold jewellery"
        image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80"
      />
      {/* Hero Header */}
      <div
        className="relative pt-28 pb-24 flex items-end"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          minHeight: '55vh',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 w-full pb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5"
          >
            High Jewellery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl lg:text-7xl text-ivory font-light"
          >
            Fine Jewellery Collection
          </motion.h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-gold/12">
          <div className="flex flex-wrap gap-2">
            {subcategories.map((s) => (
              <button
                key={s}
                onClick={() => setSubFilter(s)}
                className={`font-sans text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all ${
                  subFilter === s
                    ? 'border-gold bg-gold text-black'
                    : 'border-gold/20 text-ivory/50 hover:border-gold/50 hover:text-ivory'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <select
            value={metalFilter}
            onChange={(e) => setMetalFilter(e.target.value)}
            className="bg-transparent border border-gold/20 text-ivory/60 font-sans text-[10px] tracking-wider px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
          >
            {metals.map((m) => (
              <option key={m} value={m} className="bg-black">
                {m}
              </option>
            ))}
          </select>
        </div>

        <p className="font-sans text-[11px] text-ivory/30 tracking-widest mb-10">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-ivory/30 mb-4">No pieces match your filters</p>
            <button
              onClick={() => { setSubFilter('All'); setMetalFilter('All') }}
              className="font-sans text-[11px] tracking-widest text-gold uppercase"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
