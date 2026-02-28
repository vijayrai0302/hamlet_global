import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin, Clock, Check } from 'lucide-react'
import { WHATSAPP_BASE } from '../constants/data'
import SEO from '../components/shared/SEO'

const contactInfo = [
  { Icon: MapPin, label: 'Visit Us', value: 'IFZA Business Park\nDubai Silicon Oasis, Dubai, UAE' },
  { Icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 10:00 – 20:00 GST\nSunday: By Appointment' },
  { Icon: Mail, label: 'Email', value: 'hamlet.uae@outlook.com' },
]

const budgets = ['Under $5,000', '$5,000 – $20,000', '$20,000 – $100,000', '$100,000+']
const interests = [
  'Natural Gemstones', 'Custom Jewellery', 'Pre-Owned Luxury',
  'Investment Gems', 'Valuation / Sale', 'General Enquiry',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '',
    interest: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Private Enquiry – Hamlet Global\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${form.country}\nInterest: ${form.interest}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-24">
      <SEO
        title="Private Client Consultation"
        description="Contact Hamlet Global for a private gemstone consultation. WhatsApp our experts for certified gemstones, bespoke jewellery, and investment-grade diamonds. Dubai."
        keywords="contact gemstone dealer Dubai, WhatsApp jewellery consultation, private gems buyer UAE, gemstone inquiry Dubai"
      />
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6">Private Clients</p>
          <h1 className="font-serif text-5xl lg:text-7xl text-ivory font-light mb-8">
            Begin Your
            <br />
            <em className="text-gold not-italic">Private Consultation</em>
          </h1>
          <p className="font-sans text-[13px] text-ivory/50 max-w-lg mx-auto leading-relaxed">
            Our senior gemologist and private client advisor are available for discreet,
            personalised consultations — in person or via WhatsApp.
          </p>
        </motion.div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-1 space-y-10">
            {/* WhatsApp Highlighted */}
            <div className="border border-gold/25 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-bl-full" />
              <MessageCircle className="w-7 h-7 text-[#25D366] mb-5" />
              <h3 className="font-serif text-xl text-ivory mb-3">WhatsApp (Priority)</h3>
              <p className="font-sans text-[12px] text-ivory/45 leading-relaxed mb-6">
                The fastest way to reach us. Our advisors respond within the hour during business hours.
              </p>
              <a
                href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20a%20private%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366] text-[#25D366] font-sans text-[11px] tracking-[0.3em] uppercase px-6 py-3 hover:bg-[#25D366]/10 transition-all"
              >
                <MessageCircle size={13} />
                Open WhatsApp
              </a>
            </div>

            {/* Contact Details */}
            {contactInfo.map(({ Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-4 h-4 text-gold/60" />
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60">{label}</span>
                </div>
                <p className="font-sans text-[13px] text-ivory/50 leading-relaxed whitespace-pre-line pl-7">
                  {value}
                </p>
              </div>
            ))}

            {/* Certifications */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-4">
                Certification Partners
              </p>
              <div className="flex gap-3">
                {['GIA', 'IGI', 'SGL'].map((c) => (
                  <div key={c} className="border border-gold/20 px-4 py-2 text-center">
                    <span className="font-sans text-[10px] tracking-widest text-gold/70">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Registration */}
            <div className="border-t border-gold/10 pt-6">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-3">
                Legal Registration
              </p>
              <p className="font-sans text-[11px] text-ivory/35 leading-relaxed">
                Hamlet Global Trading FZCO
              </p>
              <p className="font-sans text-[10px] text-ivory/25 leading-relaxed mt-1">
                Registered with IFZA<br />
                International Free Zone Authority<br />
                Dubai, United Arab Emirates
              </p>
              <p className="font-sans text-[10px] text-ivory/20 mt-2">
                License Activities: Ecommerce · Used Jewellery Trading · IT Consultants
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-24 border border-gold/15"
              >
                <div className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mx-auto mb-8">
                  <Check size={32} className="text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-ivory mb-5">Enquiry Received</h3>
                <p className="font-sans text-[13px] text-ivory/45 max-w-sm leading-relaxed">
                  A WhatsApp conversation has been opened. Our private client advisor will
                  respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-serif text-2xl text-ivory font-light mb-2">Private Enquiry Form</h2>
                <p className="font-sans text-[11px] text-ivory/35 mb-8">
                  All enquiries are treated with complete discretion.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
                    { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+971 ...', required: false },
                    { name: 'country', label: 'Country of Residence', type: 'text', placeholder: 'UAE, India, UK...', required: false },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2">
                        {f.label} {f.required && '*'}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        required={f.required}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2">
                      Area of Interest
                    </label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full bg-black border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors cursor-pointer"
                    >
                      <option value="">Select interest</option>
                      {interests.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2">
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
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/65 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for..."
                    className="w-full bg-transparent border border-gold/20 text-ivory font-sans text-[13px] px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-ivory/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gold/90 transition-all duration-300"
                >
                  Submit Private Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
