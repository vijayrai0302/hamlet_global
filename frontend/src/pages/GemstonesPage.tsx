import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useProducts } from '../store/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/shared/SEO'

const gemTypes = ['All', 'Emerald', 'Sapphire', 'Ruby', 'Diamond', 'Tanzanite']
const certTypes = ['All', 'GIA', 'IGI', 'SGL']
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'new' },
]

export default function GemstonesPage() {
  const [typeFilter, setTypeFilter] = useState('All')
  const [certFilter, setCertFilter] = useState('All')
  const [sort, setSort] = useState('featured')

  const { products } = useProducts()
  const gems = products.filter((p) => p.category === 'gemstone')

  const filtered = useMemo(() => {
    let result = gems.filter((p) => {
      const matchType = typeFilter === 'All' || p.subcategory === typeFilter
      const matchCert = certFilter === 'All' || p.certification.authority === certFilter
      return matchType && matchCert
    })

    if (sort === 'price-asc') result = [...result].sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999))
    if (sort === 'price-desc') result = [...result].sort((a, b) => (b.price ?? 999999) - (a.price ?? 999999))
    if (sort === 'new') result = [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew))
    if (sort === 'featured') result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))

    return result
  }, [gems, typeFilter, certFilter, sort])

  return (
    <div className="min-h-screen bg-black pt-28 pb-24">
      <SEO
        title="Certified Gemstones"
        description="Buy certified natural gemstones direct from source — Colombian emeralds, Kashmir sapphires, Burmese rubies, and investment-grade diamonds. GIA, IGI & SGL certified. Dubai."
        keywords="buy certified gemstones, Colombian emerald, Kashmir sapphire, Burmese ruby, GIA certified gemstone Dubai, investment gemstones"
        image="https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1200&q=80"
      />
      {/* Page Header */}
      <div
        className="relative py-24 mb-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5"
          >
            Direct From Source
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-5xl lg:text-7xl text-ivory font-light"
          >
            Certified Gemstones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-[12px] text-ivory/50 mt-6 tracking-wider max-w-md mx-auto"
          >
            Every stone certified by GIA, IGI, or SGL. Investment-grade quality. Factory-direct pricing.
          </motion.p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-gold/12">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {gemTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`font-sans text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-200 ${
                  typeFilter === type
                    ? 'border-gold bg-gold text-black'
                    : 'border-gold/20 text-ivory/50 hover:border-gold/50 hover:text-ivory'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Cert Filter */}
            <div className="hidden md:flex items-center gap-2">
              {certTypes.map((cert) => (
                <button
                  key={cert}
                  onClick={() => setCertFilter(cert)}
                  className={`font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors ${
                    certFilter === cert ? 'text-gold' : 'text-ivory/35 hover:text-gold'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-gold/20 text-ivory/60 font-sans text-[10px] tracking-wider px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(typeFilter !== 'All' || certFilter !== 'All') && (
          <div className="flex items-center gap-3 mb-8">
            <span className="font-sans text-[10px] tracking-widest text-ivory/30 uppercase">Active:</span>
            {typeFilter !== 'All' && (
              <button
                onClick={() => setTypeFilter('All')}
                className="flex items-center gap-1.5 border border-gold/30 text-gold font-sans text-[10px] px-3 py-1.5 hover:bg-gold/10 transition-colors"
              >
                {typeFilter} <X size={10} />
              </button>
            )}
            {certFilter !== 'All' && (
              <button
                onClick={() => setCertFilter('All')}
                className="flex items-center gap-1.5 border border-gold/30 text-gold font-sans text-[10px] px-3 py-1.5 hover:bg-gold/10 transition-colors"
              >
                {certFilter} <X size={10} />
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="font-sans text-[11px] text-ivory/30 tracking-widest mb-8">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
        </p>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-ivory/30 mb-3">No pieces found</p>
            <button
              onClick={() => { setTypeFilter('All'); setCertFilter('All') }}
              className="font-sans text-[11px] tracking-widest text-gold uppercase underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
