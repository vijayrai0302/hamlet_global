import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Shield, Award, Package, ChevronRight, Gem } from 'lucide-react'
import { currencies, WHATSAPP_BASE } from '../constants/data'
import { useCurrency } from '../store/CurrencyContext'
import { useProducts } from '../store/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/shared/SEO'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currency } = useCurrency()
  const { products } = useProducts()
  const [activeImg, setActiveImg] = useState(0)
  const [mainImgError, setMainImgError] = useState(false)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-3xl text-ivory/40 mb-6">Piece not found</p>
        <button
          onClick={() => navigate(-1)}
          className="font-sans text-[11px] tracking-widest text-gold uppercase underline"
        >
          Go Back
        </button>
      </div>
    )
  }

  const displayPrice = () => {
    if (product.price === null) return null
    const { symbol, rate } = currencies[currency]
    const converted = Math.round(product.price * rate)
    return `${symbol}${converted.toLocaleString()}`
  }

  const whatsappMsg = `Hello, I am interested in: ${product.name}\n\nDetails:\n- Category: ${product.subcategory}\n- Weight: ${product.details.weight ?? 'N/A'}\n- Origin: ${product.details.origin ?? 'N/A'}\n- Certification: ${product.certification.authority ?? 'N/A'} ${product.certification.number ?? ''}\n\nCould you please provide more information and pricing?`

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const specRows = [
    { label: 'Category', value: product.subcategory },
    product.details.weight && { label: 'Weight', value: product.details.weight },
    product.details.origin && { label: 'Origin', value: product.details.origin },
    product.details.cut && { label: 'Cut', value: product.details.cut },
    product.details.clarity && { label: 'Clarity', value: product.details.clarity },
    product.details.color && { label: 'Color', value: product.details.color },
    product.details.metal && { label: 'Metal', value: product.details.metal },
    product.details.occasion && { label: 'Occasion', value: product.details.occasion },
    product.certification.authority && {
      label: 'Certification',
      value: `${product.certification.authority} — ${product.certification.number ?? ''}`,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.subcategory}, ${product.details.origin ?? ''}, ${product.certification.authority ?? ''} certified gemstone Dubai`}
        image={product.images[0]}
      />
      {/* Breadcrumb */}
      <div className="pt-28 pb-6 max-w-screen-xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center gap-2 font-sans text-[10px] tracking-widest text-ivory/30 uppercase">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link
            to={`/${product.category === 'pre-owned' ? 'pre-owned' : product.category === 'jewellery' ? 'jewellery' : 'gemstones'}`}
            className="hover:text-gold transition-colors capitalize"
          >
            {product.category === 'pre-owned' ? 'Pre-Owned' : product.category === 'jewellery' ? 'Jewellery' : 'Gemstones'}
          </Link>
          <ChevronRight size={10} />
          <span className="text-ivory/60">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Images */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-square overflow-hidden mb-4 relative bg-[#0d0d0d]"
            >
              {!mainImgError && product.images[activeImg] ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  onError={() => setMainImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
                  <Gem size={48} className="text-gold/20" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-ivory/20">{product.subcategory}</p>
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-gold text-black font-sans text-[9px] tracking-widest uppercase px-3 py-1.5">
                    New Arrival
                  </span>
                )}
                {product.certification.authority && (
                  <span className="bg-black/85 text-gold font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 border border-gold/30">
                    {product.certification.authority} Certified
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm px-3 py-1.5">
                <span className="font-sans text-[9px] tracking-widest text-ivory/60">Only 1 Available</span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImg(i); setMainImgError(false) }}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all bg-[#0d0d0d] ${
                      activeImg === i ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 mb-3">
              {product.subcategory}
              {product.details.origin && ` · ${product.details.origin}`}
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl text-ivory font-light leading-snug mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8">
              {displayPrice() ? (
                <div>
                  <p className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase mb-1">Price</p>
                  <p className="font-serif text-3xl text-ivory">{displayPrice()}</p>
                </div>
              ) : (
                <div className="border border-gold/30 inline-block px-6 py-3">
                  <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold">
                    Price Available on Request
                  </p>
                </div>
              )}
            </div>

            <p className="font-sans text-[13px] text-ivory/55 leading-[1.9] mb-10">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-10">
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gold/90 transition-all duration-300"
              >
                <MessageCircle size={15} />
                {product.price === null ? 'Request Price via WhatsApp' : 'Enquire via WhatsApp'}
              </a>
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(`Hello, I would like to book a consultation about: ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-ivory/25 text-ivory font-sans text-[11px] tracking-[0.3em] uppercase py-4 hover:border-gold hover:text-gold transition-all duration-300"
              >
                Book a Private Consultation
              </a>
            </div>

            {/* Specs */}
            <div className="border-t border-gold/12 pt-8">
              <h3 className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">
                Stone & Piece Specifications
              </h3>
              <div className="space-y-3">
                {specRows.map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-gold/8">
                    <span className="font-sans text-[11px] tracking-wider text-ivory/35 uppercase">
                      {label}
                    </span>
                    <span className="font-sans text-[12px] text-ivory/70 text-right max-w-[60%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gold/10">
              {[
                { Icon: Shield, label: 'Authentic & Certified' },
                { Icon: Award, label: 'Expert Verified' },
                { Icon: Package, label: 'Insured Delivery' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={16} className="text-gold/50" />
                  <span className="font-sans text-[9px] tracking-wider text-ivory/30 text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-28 pt-16 border-t border-gold/10">
            <h2 className="font-serif text-3xl text-ivory font-light mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
