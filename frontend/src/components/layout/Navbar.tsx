import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '../../store/CurrencyContext'
import { currencies, WHATSAPP_BASE } from '../../constants/data'
import type { Currency } from '../../types'

const navLinks = [
  { label: 'Gemstones', href: '/gemstones' },
  { label: 'Jewellery', href: '/jewellery' },
  { label: 'Pre-Owned', href: '/pre-owned' },
  { label: 'Custom', href: '/custom' },
  { label: 'Heritage', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const { currency, setCurrency } = useCurrency()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/96 backdrop-blur-md border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl lg:text-2xl text-ivory tracking-[0.18em] font-light group-hover:text-gold transition-colors duration-300">
                HAMLET
              </span>
              <span className="font-sans text-[9px] tracking-[0.45em] text-gold uppercase">
                GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-sans text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  location.pathname === link.href
                    ? 'text-gold'
                    : 'text-ivory/85 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 font-sans text-[11px] tracking-widest text-ivory/75 hover:text-gold transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 bg-black border border-gold/20 min-w-[80px] shadow-xl shadow-black/50"
                  >
                    {(Object.keys(currencies) as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c)
                          setCurrencyOpen(false)
                        }}
                        className={`block w-full text-left px-4 py-2.5 font-sans text-[11px] tracking-widest transition-colors ${
                          currency === c
                            ? 'text-gold bg-gold/5'
                            : 'text-ivory/60 hover:text-gold hover:bg-gold/5'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-sans text-[11px] tracking-[0.22em] uppercase px-6 py-2.5 hover:bg-gold hover:text-black transition-all duration-300"
            >
              Request Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-ivory/80 hover:text-gold transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/98 border-t border-gold/25"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block font-sans text-[11px] tracking-[0.3em] uppercase transition-colors ${
                    location.pathname === link.href ? 'text-gold' : 'text-ivory/85 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                {(Object.keys(currencies) as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`font-sans text-[10px] tracking-widest uppercase transition-colors ${
                      currency === c ? 'text-gold' : 'text-ivory/40 hover:text-gold'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <a
                href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gold text-gold font-sans text-[11px] tracking-[0.22em] uppercase px-5 py-3 text-center hover:bg-gold hover:text-black transition-all duration-300 mt-2"
              >
                Request Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
