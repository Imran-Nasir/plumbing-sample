import Link from 'next/link'
import { Phone, Mail, Facebook, Instagram, Youtube, MapPin, Clock } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const services = [
  'Emergency Repairs',
  'Drain Cleaning',
  'Water Heater',
  'Toilet Repair',
  'Pipe Repair',
  'Bathroom Remodeling',
  'Gas Lines',
  'Sewer Line',
  'Water Softener',
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold text-white">
                Easy<span className="text-limeGreen">Plumbing</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fast. Reliable. Done Right. Your local licensed plumbing experts available 24/7 for all emergency and routine needs.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-limeGreen hover:text-charcoal transition-all duration-200 hover:rotate-6 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-limeGreen mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-limeGreen mb-4">Our Services</h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-gray-400 text-sm hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-limeGreen mb-4">Contact & Hours</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:5551234567"
                className="flex items-center gap-2 text-white font-bold text-lg hover:text-limeGreen transition-colors"
                aria-label="Call us at (555) 123-4567"
              >
                <Phone size={18} className="text-limeGreen" />
                (555) 123-4567
              </a>
              <a
                href="mailto:hello@easyplumbing.com"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                <Mail size={15} className="text-limeGreen shrink-0" />
                hello@easyplumbing.com
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={15} className="text-limeGreen shrink-0 mt-0.5" />
                <span>123 Main Street, Springfield, ST 12345</span>
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} className="text-limeGreen shrink-0" />
                  <span>
                    <span className="text-white font-semibold">Emergency:</span> 24/7
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} className="text-limeGreen shrink-0" />
                  <span>
                    <span className="text-white font-semibold">Office:</span> Mon–Fri 8am–6pm
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2025 Easy Plumbing. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
