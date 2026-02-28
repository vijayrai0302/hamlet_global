import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import { WHATSAPP_BASE } from '../constants/data'
import SEO from '../components/shared/SEO'

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Share your vision with our master jeweller. We listen, advise, and understand your exact requirements.',
  },
  {
    num: '02',
    title: 'CAD Design',
    desc: 'Our designers craft a 3D model for your approval. You see and approve the design before a single stone is set.',
  },
  {
    num: '03',
    title: 'Craftsmanship',
    desc: 'Master craftsmen bring your design to life using ethically sourced materials and certified gemstones.',
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'Fully insured, discreet delivery worldwide. Accompanied by a certificate of authenticity and care guide.',
  },
]

const occasions = [
  'Engagement Ring', 'Wedding Band', 'Anniversary Gift',
  'Heirloom Piece', 'Investment Jewellery', 'Birthday Gift', 'Other',
]

const budgets = [
  'USD 2,000 – 5,000',
  'USD 5,000 – 15,000',
  'USD 15,000 – 50,000',
  'USD 50,000+',
]

export default function CustomPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    occasion: '',
    budget: '',
    stoneType: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hello, I would like to commission a bespoke jewellery piece.\n\nName: ${form.name}\nOccasion: ${form.occasion}\nBudget: ${form.budget}\nStone Preference: ${form.stoneType}\nDescription: ${form.description}\nPhone: ${form.phone}\nCountry: ${form.country}`
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Bespoke Custom Jewellery"
        description="Commission your bespoke jewellery piece with Hamlet Global. Custom engagement rings, investment jewellery, and high-end pieces crafted to your exact specifications. Dubai atelier."
        keywords="custom jewellery Dubai, bespoke engagement ring UAE, custom gemstone jewellery, commission jewellery, bespoke diamonds"
        image="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&q=80"
      />
      {/* Hero */}
      <div
        className="relative flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '70vh',
        }}
      >
        <div className="absolute inset-0 bg-black/72" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6"
          >
            Bespoke Atelier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl lg:text-7xl text-ivory font-light leading-tight mb-8"
          >
            Your Vision.
            <br />
            <em className="text-gold not-italic">Our Mastery.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[13px] text-ivory/55 leading-relaxed max-w-xl mx-auto"
          >
            Commission a jewellery piece as unique as you are. From engagement rings to
            investment-grade statement pieces — we craft with purpose and perfection.
          </motion.p>
        </div>
      </div>

      {/* Process */}
      <div className="py-28 bg-obsidian/30">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Our Process</p>
            <h2 className="font-serif text-4xl text-ivory font-light">From Idea to Icon</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gold/15 z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 bg-black">
                  <span className="font-serif text-2xl text-gold/70">{step.num}</span>
                </div>
                <h3 className="font-serif text-lg text-ivory mb-3">{step.title}</h3>
                <p className="font-sans text-[12px] text-ivory/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="py-28 max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Begin Your Journey</p>
          <h2 className="font-serif text-4xl text-ivory font-light">Commission Your Piece</h2>
          <p className="font-sans text-[12px] text-ivory/40 mt-4 leading-relaxed">
            Complete the form below and our jewellery consultant will contact you within 24 hours.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border border-gold/20"
          >
            <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-gold" />
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-4">Request Received</h3>
            <p className="font-sans text-[12px] text-ivory/45 max-w-sm mx-auto leading-relaxed">
              We have opened a WhatsApp conversation. Our consultant will respond within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                  placeholder="+971 ..."
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                  placeholder="UAE, India, UK..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Occasion
                </label>
                <select
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  className="w-full bg-black border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors cursor-pointer"
                >
                  <option value="">Select occasion</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-black border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors cursor-pointer"
                >
                  <option value="">Select budget</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                Stone Preference
              </label>
              <input
                type="text"
                name="stoneType"
                value={form.stoneType}
                onChange={handleChange}
                className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                placeholder="e.g. Colombian Emerald, Kashmir Sapphire, Natural Diamond..."
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                Describe Your Vision *
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20 resize-none"
                placeholder="Describe the jewellery piece you have in mind — style, inspiration, metal preference, any special requirements..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gold/90 transition-all duration-300"
              >
                Submit via WhatsApp
              </button>
              <a
                href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20discuss%20a%20custom%20jewellery%20piece.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#25D366]/10 transition-all"
              >
                <MessageCircle size={14} />
                Chat Directly
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
