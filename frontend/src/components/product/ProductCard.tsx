import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Gem } from 'lucide-react'
import type { Product } from '../../types'
import { useCurrency } from '../../store/CurrencyContext'
import { currencies, WHATSAPP_BASE } from '../../constants/data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { currency } = useCurrency()
  const [imgSrc, setImgSrc] = useState(product.images[0] || '/images/placeholder.svg')
  const [imgFailed, setImgFailed] = useState(false)

  const handleImgError = () => {
    // Try fallback (second image or placeholder SVG), then give up
    const fallback = product.images[1] || '/images/placeholder.svg'
    if (imgSrc !== fallback) {
      setImgSrc(fallback)
    } else {
      setImgFailed(true)
    }
  }

  const displayPrice = () => {
    if (product.price === null) return 'Request Price'
    const { symbol, rate } = currencies[currency]
    const converted = Math.round(product.price * rate)
    return `${symbol}${converted.toLocaleString()}`
  }

  const isRequestPrice = product.price === null

  const detailPath = `/${
    product.category === 'jewellery'
      ? 'jewellery'
      : product.category === 'pre-owned'
      ? 'pre-owned'
      : 'gemstones'
  }/${product.id}`

  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden mb-4 bg-[#0d0d0d]">
        <Link to={detailPath}>
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={product.name}
              loading="lazy"
              onError={handleImgError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
              <Gem size={32} className="text-gold/30" />
              <p className="font-sans text-[9px] tracking-widest uppercase text-ivory/20">{product.subcategory}</p>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-gold text-black font-sans text-[9px] tracking-widest uppercase px-2.5 py-1">
              New
            </span>
          )}
          {product.certification.authority && (
            <span className="bg-black/80 text-gold font-sans text-[9px] tracking-widest uppercase px-2.5 py-1 border border-gold/30">
              {product.certification.authority} Certified
            </span>
          )}
        </div>

        {/* Scarcity */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1">
          <span className="font-sans text-[9px] tracking-widest text-ivory/60">1 Available</span>
        </div>

        {/* WhatsApp hover overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/92 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <a
            href={`${WHATSAPP_BASE}?text=Hello,%20I%20am%20interested%20in:%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 font-sans text-[10px] tracking-widest uppercase text-[#25D366]"
          >
            <MessageCircle size={13} />
            Enquire via WhatsApp
          </a>
        </div>
      </div>

      {/* Info */}
      <Link to={detailPath} className="block">
        <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-ivory/35 mb-1.5">
          {product.subcategory}
          {product.details.origin && ` · ${product.details.origin}`}
        </p>
        <h3 className="font-serif text-[17px] text-ivory group-hover:text-gold transition-colors duration-300 mb-1 leading-snug">
          {product.name}
        </h3>
        {product.details.weight && (
          <p className="font-sans text-[10px] text-ivory/35 mb-2">{product.details.weight}</p>
        )}
        <p
          className={`font-sans text-[13px] tracking-wider ${
            isRequestPrice ? 'text-gold/80 italic text-[11px]' : 'text-ivory'
          }`}
        >
          {displayPrice()}
        </p>
      </Link>
    </div>
  )
}
