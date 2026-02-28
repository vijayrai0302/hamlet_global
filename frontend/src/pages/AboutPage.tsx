import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Award, Users, Gem } from 'lucide-react'
import { WHATSAPP_BASE } from '../constants/data'
import SEO from '../components/shared/SEO'

const values = [
  { Icon: Gem, title: 'Uncompromising Quality', desc: 'Every stone we source undergoes rigorous evaluation. We reject more pieces than we accept.' },
  { Icon: Award, title: 'Certified Authenticity', desc: 'GIA, IGI, and SGL certified. We never trade in uncertified stones or unverified pieces.' },
  { Icon: Globe, title: 'Global Reach', desc: 'From Dubai to London, Mumbai to New York — we serve discerning collectors in over 50 countries.' },
  { Icon: Users, title: 'Private Client Service', desc: 'Every client receives direct, personalised attention from our senior gemologists and consultants.' },
]

const milestones = [
  { year: '2014', event: 'Journey began in India — building deep expertise in rare gemstones and fine jewellery craftsmanship' },
  { year: '2017', event: 'Established trusted sourcing networks across India\'s premier gemstone and diamond hubs' },
  { year: '2019', event: 'Expanded into bespoke jewellery manufacturing and private client advisory' },
  { year: '2021', event: 'Pre-owned luxury jewellery authentication programme established' },
  { year: '2023', event: 'Forged partnerships with IGI, GIA, and SGL certification centres, building global credibility' },
  { year: '2025', event: 'Officially registered as Hamlet Global in Dubai — bringing a decade of expertise to the world stage and marking the beginning of a bold new chapter' },
]

export default function AboutPage() {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true })

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Our Heritage — 15 Years of Rare Gemstones"
        description="Hamlet Global — 15 years sourcing certified gemstones direct from Colombia, Kashmir, Burma and Sri Lanka. Serving private collectors across 50+ countries from our Dubai atelier."
        keywords="Hamlet Global heritage, gemstone sourcing Dubai, luxury jewellery house UAE, fine gemstone dealer, gemstone investment Dubai"
        image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80"
      />
      {/* Hero */}
      <div
        className="relative flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '75vh',
        }}
      >
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pt-28 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6"
          >
            Our Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl lg:text-7xl text-ivory font-light leading-tight max-w-2xl"
          >
            A Legacy Built
            <br />
            on <em className="text-gold not-italic">Rare Beauty</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[13px] text-ivory/50 leading-relaxed mt-8 max-w-lg"
          >
            Since 2009, Hamlet Global has been the trusted source for investment-grade gemstones
            and fine jewellery for private collectors worldwide.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-28 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6">The Story</p>
            <h2 className="font-serif text-4xl text-ivory font-light mb-10 leading-snug">
              More Than a Business —<br />A Lifelong Pursuit of Beauty
            </h2>
            <div className="space-y-5 font-sans text-[13px] text-ivory/55 leading-[1.95]">
              <p>
                Hamlet Global was born from a deep fascination with the earth's rarest treasures.
                Our founder, having spent years travelling the gem fields of Colombia, Kashmir, and Burma,
                recognised a fundamental truth: the finest gemstones rarely reach the open market.
                They are bought quietly, by those who know where to look.
              </p>
              <p>
                We built Hamlet Global to change that — to create a direct bridge between the world's
                finest mines and the collectors who deserve access to them. No middlemen. No inflated
                margins. Just exceptional gemstones at prices that respect the intelligence of our clients.
              </p>
              <p>
                Today, we serve private clients across six continents, from royal families and
                institutional investors to couples seeking the perfect engagement ring. Every client
                receives the same level of attention: personal, informed, and unhurried.
              </p>
              <p>
                Our atelier in Dubai's Gold Souk District houses our master gemologist, our
                jewellery craftsmen, and our authentication laboratory — all under one roof.
                This allows us to maintain absolute control over quality at every stage.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85"
                alt="Our atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gold/15 p-6 text-center">
                <div className="font-serif text-4xl text-ivory mb-1">15+</div>
                <div className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase">Years of Expertise</div>
              </div>
              <div className="border border-gold/15 p-6 text-center">
                <div className="font-serif text-4xl text-ivory mb-1">50+</div>
                <div className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase">Countries Served</div>
              </div>
              <div className="border border-gold/15 p-6 text-center">
                <div className="font-serif text-4xl text-ivory mb-1">500+</div>
                <div className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase">Certified Stones</div>
              </div>
              <div className="border border-gold/15 p-6 text-center">
                <div className="font-serif text-4xl text-ivory mb-1">2,000+</div>
                <div className="font-sans text-[10px] tracking-widest text-ivory/35 uppercase">Private Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 bg-gold/4 border-y border-gold/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">What We Stand For</p>
            <h2 className="font-serif text-4xl text-ivory font-light">Our Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="w-6 h-6 text-gold mx-auto mb-5 opacity-80" />
                <h3 className="font-serif text-lg text-ivory mb-3">{title}</h3>
                <p className="font-sans text-[12px] text-ivory/40 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="py-28 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-5">Our Journey</p>
          <h2 className="font-serif text-4xl text-ivory font-light">Milestones</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -30 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex gap-8 mb-10 relative"
            >
              <div className="flex-shrink-0 w-16 text-right">
                <span className="font-serif text-gold text-lg">{m.year}</span>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gold mt-1.5" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-gold/20 mt-2" style={{ minHeight: '40px' }} />
                )}
              </div>
              <p className="font-sans text-[13px] text-ivory/55 leading-relaxed pt-0.5">{m.event}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center border-t border-gold/10">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-6">Private Clients</p>
          <h2 className="font-serif text-3xl text-ivory font-light mb-6">
            Begin Your Collection
          </h2>
          <p className="font-sans text-[12px] text-ivory/40 leading-relaxed mb-10">
            Speak with our senior gemologist to discover pieces that match your vision and investment goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/gemstones"
              className="bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold/90 transition-all"
            >
              View Collection
            </Link>
            <a
              href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20to%20speak%20with%20a%20gemologist.`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-black transition-all"
            >
              Speak With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
