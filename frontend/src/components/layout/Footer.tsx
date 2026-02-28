import { Link } from 'react-router-dom'
import { WHATSAPP_BASE } from '../../constants/data'

const footerLinks = {
  Collections: [
    { label: 'Gemstones', href: '/gemstones' },
    { label: 'High Jewellery', href: '/jewellery' },
    { label: 'Pre-Owned Luxury', href: '/pre-owned' },
    { label: 'Bespoke Creations', href: '/custom' },
  ],
  Company: [
    { label: 'Our Heritage', href: '/about' },
    { label: 'Private Clients', href: '/contact' },
    { label: 'Bespoke Service', href: '/custom' },
    { label: 'Sustainability', href: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gold/25 pt-20 pb-10" style={{ background: '#0A0806' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-serif text-2xl text-ivory tracking-[0.15em] font-light">HAMLET</div>
              <div className="font-sans text-[9px] tracking-[0.45em] text-gold uppercase mt-0.5">GLOBAL</div>
            </div>
            <p className="font-sans text-[11px] text-ivory/65 leading-relaxed mb-6">
              A legacy of rare gemstones and exceptional jewellery.
              Certified. Authenticated. Timeless.
            </p>
            <p className="font-sans text-[10px] text-ivory/55 mb-1">Dubai, UAE · Est. 2025</p>
            <p className="font-sans text-[9px] text-ivory/40 mb-4">Registered with IFZA · FZCO</p>
            <div className="flex items-center gap-2">
              {['GIA', 'IGI', 'SGL'].map((cert) => (
                <div key={cert} className="border border-gold/25 px-2.5 py-1">
                  <span className="font-sans text-[9px] tracking-widest text-gold">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold mb-6">{title}</h3>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-sans text-[11px] text-ivory/65 hover:text-gold transition-colors duration-300 tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold mb-6">Private Enquiries</h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`${WHATSAPP_BASE}?text=Hello,%20I%20would%20like%20a%20private%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] text-ivory/65 hover:text-gold transition-colors tracking-wider"
                >
                  WhatsApp Consultation
                </a>
              </li>
              <li>
                <a
                  href="mailto:hamlet.uae@outlook.com"
                  className="font-sans text-[11px] text-ivory/65 hover:text-gold transition-colors tracking-wider"
                >
                  hamlet.uae@outlook.com
                </a>
              </li>
              <li className="font-sans text-[11px] text-ivory/55 tracking-wider leading-relaxed">
                IFZA Business Park<br />
                Dubai Silicon Oasis, Dubai, UAE
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Row */}
        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[10px] text-ivory/45 tracking-widest">
            © {new Date().getFullYear()} Hamlet Global Trading FZCO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
              <span
                key={item}
                className="font-sans text-[10px] text-ivory/45 tracking-widest cursor-pointer hover:text-gold transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
