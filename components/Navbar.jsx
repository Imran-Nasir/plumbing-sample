'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { useBooking } from '@/app/context/BookingContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { openModal } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold text-slateBlue tracking-tight group-hover:opacity-80 transition-opacity">
              Easy<span className="text-limeGreen">Plumbing</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold transition-colors duration-200 ${
                  scrolled ? 'text-charcoal hover:text-slateBlue' : 'text-white hover:text-limeGreen'
                } ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:5551234567"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${
                scrolled ? 'text-slateBlue' : 'text-white'
              } hover:text-limeGreen`}
              aria-label="Call Easy Plumbing at (555) 123-4567"
            >
              <Phone size={15} />
              (555) 123-4567
            </a>
            <button
              onClick={openModal}
              className="bg-limeGreen text-charcoal text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:brightness-105"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-charcoal hover:bg-lightGray' : 'text-white hover:bg-white/20'
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="flex items-center justify-between p-5 border-b border-lightGray">
          <span className="text-xl font-extrabold text-slateBlue">
            Easy<span className="text-limeGreen">Plumbing</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 text-charcoal hover:bg-lightGray rounded-lg transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                pathname === link.href
                  ? 'bg-slateBlue/10 text-slateBlue'
                  : 'text-charcoal hover:bg-lightGray hover:text-slateBlue'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`block px-3 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
              pathname === '/contact'
                ? 'bg-slateBlue/10 text-slateBlue'
                : 'text-charcoal hover:bg-lightGray hover:text-slateBlue'
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="p-5 border-t border-lightGray flex flex-col gap-3">
          <a
            href="tel:5551234567"
            className="flex items-center gap-2 text-slateBlue font-semibold text-sm hover:text-limeGreen transition-colors"
            aria-label="Call (555) 123-4567"
          >
            <Phone size={16} />
            (555) 123-4567
          </a>
          <button
            onClick={() => { setMobileOpen(false); openModal() }}
            className="w-full bg-limeGreen text-charcoal font-bold py-3 rounded-lg text-sm transition-all duration-200 hover:brightness-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}
