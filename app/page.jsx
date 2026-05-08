'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Phone, CheckCircle, AlertCircle, Droplets, Flame, Bath, Wrench, Home,
  Clock, DollarSign, Shield, Star, ArrowRight, ChevronRight,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import HowItWorks from '@/components/HowItWorks'
import { useBooking } from '@/app/context/BookingContext'

const homeServices = [
  { icon: AlertCircle, title: 'Emergency Repairs', description: 'Available 24/7, 365 days a year.' },
  { icon: Droplets, title: 'Drain Cleaning', description: 'Clogs cleared fast, no mess left behind.' },
  { icon: Flame, title: 'Water Heater Services', description: 'Installation, repair, and same-day replacement.' },
  { icon: Bath, title: 'Toilet & Fixture Repair', description: 'From running toilets to full replacements.' },
  { icon: Wrench, title: 'Pipe Repair & Repiping', description: 'Leak detection and full repiping services.' },
  { icon: Home, title: 'Bathroom Remodeling', description: 'Complete plumbing for new builds and remodels.' },
]

const testimonials = [
  { name: 'Marcus R.', city: 'Springfield', rating: 5, quote: 'They arrived in 45 minutes and fixed our burst pipe before the damage got worse. Incredible service.' },
  { name: 'Jennifer L.', city: 'Riverside', rating: 5, quote: 'Upfront pricing, no hidden fees. The plumber was professional and cleaned up after himself. Will use again!' },
  { name: 'Tom & Carla B.', city: 'Lakewood', rating: 5, quote: 'Our water heater failed at midnight. Easy Plumbing was here by 1am and installed a new one. Lifesavers.' },
  { name: 'Sophia M.', city: 'Springfield', rating: 5, quote: "I've used them twice now for different issues. Both times: fast, fair, and friendly. Highly recommend." },
  { name: 'Derek H.', city: 'Greenfield', rating: 5, quote: 'Got three quotes — Easy Plumbing was 20% cheaper AND finished the job in half the time. Five stars.' },
  { name: 'Alice N.', city: 'Maplewood', rating: 5, quote: 'Super easy to book online. They came same day, diagnosed the issue in minutes, and fixed it right away.' },
]

const certifications = ['BBB Accredited', 'Google Guaranteed', 'Angi Certified', 'HomeAdvisor', 'Yelp Top Pro']

const bookingServices = [
  'Emergency Repairs', 'Drain Cleaning', 'Water Heater Services',
  'Toilet & Fixture Repair', 'Pipe Repair & Repiping', 'Bathroom Remodeling',
  'Gas Line Services', 'Sewer Line Repair', 'Water Softener Installation',
]

function MiniBookingForm() {
  const { register, handleSubmit, formState: { isSubmitSuccessful } } = useForm()
  const onSubmit = () => {}

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <CheckCircle size={40} className="text-limeGreen" />
        <p className="text-charcoal font-bold text-lg">Request received!</p>
        <p className="text-gray-500 text-sm">We'll call you within 15 minutes to confirm.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <input
        type="text"
        placeholder="Your Name"
        className="flex-1 min-w-[140px] px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all"
        {...register('name', { required: true })}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="flex-1 min-w-[140px] px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all"
        {...register('phone', { required: true })}
      />
      <select
        className="flex-1 min-w-[160px] px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all bg-white"
        {...register('service')}
      >
        <option value="">Service Type…</option>
        {bookingServices.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <input
        type="datetime-local"
        className="flex-1 min-w-[180px] px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all"
        {...register('time')}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-slateBlue text-white font-bold rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:bg-slateBlue/90 whitespace-nowrap"
      >
        Request Service
      </button>
    </form>
  )
}

function TestimonialsCarousel() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.children[0]?.offsetWidth + 16 || 400
    const interval = setInterval(() => {
      if (paused.current) return
      const nextIndex = (activeIndex + 1) % testimonials.length
      track.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' })
      setActiveIndex(nextIndex)
    }, 3500)
    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <div>
      <div
        ref={trackRef}
        className="testimonial-track flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        onMouseEnter={() => { paused.current = true }}
        onMouseLeave={() => { paused.current = false }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              const track = trackRef.current
              if (!track) return
              const cardWidth = track.children[0]?.offsetWidth + 16 || 400
              track.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
              setActiveIndex(i)
            }}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-slateBlue w-6 h-2' : 'bg-lightGray w-2 h-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { openModal } = useBooking()

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center pt-20"
        style={{ background: 'linear-gradient(135deg, #2D5F8A 0%, #1A3A5C 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left 60% */}
            <div className="flex-[3] flex flex-col gap-7">
              <span className="text-xs font-bold tracking-widest uppercase text-limeGreen">
                24/7 Emergency Service Available
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                Plumbing Problems?{' '}
                <span className="text-limeGreen">We Fix Them Fast.</span>
              </h1>
              <p className="text-white/80 text-lg max-w-[52ch] leading-relaxed">
                Licensed plumbers at your door in 60 minutes or less — guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 bg-limeGreen text-charcoal font-extrabold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:brightness-105"
                >
                  Book a Plumber
                  <ArrowRight size={18} />
                </button>
                <a
                  href="tel:5551234567"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white hover:text-slateBlue hover:scale-[1.02]"
                  aria-label="Call Easy Plumbing at (555) 123-4567"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-5 pt-2">
                {['Licensed & Insured', 'Upfront Pricing', 'Same-Day Service'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle size={16} className="text-limeGreen shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right 40% — Placeholder visual */}
            <div className="flex-[2] w-full">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 flex flex-col items-center justify-center min-h-[360px]">
                {/* SVG plumbing illustration placeholder */}
                <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="20" y="90" width="160" height="20" rx="10" fill="white"/>
                  <rect x="80" y="20" width="20" height="160" rx="10" fill="white"/>
                  <circle cx="100" cy="100" r="25" stroke="white" strokeWidth="8"/>
                  <circle cx="100" cy="100" r="8" fill="white"/>
                  <rect x="50" y="40" width="100" height="10" rx="5" fill="white" opacity="0.5"/>
                  <rect x="50" y="150" width="100" height="10" rx="5" fill="white" opacity="0.5"/>
                </svg>
                <p className="text-white/40 text-sm mt-4 text-center">Professional Plumbing Services</p>

                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <div>
                    <p className="text-charcoal font-extrabold text-sm leading-none">4.9 / 5</p>
                    <p className="text-gray-400 text-xs">2,400+ Reviews</p>
                  </div>
                </div>

                {/* Available now badge */}
                <div className="absolute bottom-4 left-4 bg-limeGreen rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-charcoal/60 animate-pulse" />
                  <span className="text-charcoal font-bold text-xs">Available Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-lightGray border-y border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Trusted by Homeowners Across [City/Region]
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 text-xs font-semibold bg-white"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">
              Everything Your Home Needs — Under One Roof
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homeServices.map((svc) => (
              <ServiceCard key={svc.title} icon={svc.icon} title={svc.title} description={svc.description} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-slateBlue font-semibold text-sm hover:text-limeGreen transition-colors group"
            >
              View All Services
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-slateBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-7">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Why Homeowners Choose Easy Plumbing
              </h2>
              <ul className="flex flex-col gap-5">
                {[
                  { icon: Clock, text: '60-Minute Response Guarantee' },
                  { icon: DollarSign, text: 'Flat-Rate, Upfront Pricing — No Surprises' },
                  { icon: Shield, text: 'Licensed, Bonded & Insured Plumbers' },
                  { icon: Star, text: '4.9-Star Rated Across 2,400+ Reviews' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-limeGreen" strokeWidth={1.75} />
                    </div>
                    <span className="text-white font-semibold text-base">{text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-limeGreen font-bold text-sm hover:underline group"
              >
                See How We Work
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right — placeholder image */}
            <div className="flex-1 w-full">
              <div className="rounded-2xl overflow-hidden bg-white/10 border border-white/20 min-h-[300px] flex items-center justify-center">
                <div className="text-center text-white/30 px-8">
                  <Wrench size={64} strokeWidth={1} className="mx-auto mb-3" />
                  <p className="text-sm">Professional Team Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section className="relative py-20 bg-charcoal overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <Droplets
              key={i}
              size={40}
              className="absolute text-white"
              style={{ top: `${(i % 4) * 25}%`, left: `${Math.floor(i / 4) * 35}%` }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Pipe burst? Flooding? <span className="text-limeGreen">Don't wait.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl">
            Our emergency team is dispatched in under 60 minutes.
          </p>
          <a
            href="tel:5551234567"
            className="inline-flex items-center gap-3 bg-limeGreen text-charcoal font-extrabold px-8 py-5 rounded-2xl text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:brightness-105"
            aria-label="Call emergency line at (555) 123-4567"
          >
            <Phone size={24} className="animate-pulse-slow" aria-hidden="true" />
            Call Emergency Line
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">
              Real Customers. Real Results.
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── BOOKING CTA ── */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Book Online</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">
              Get a Plumber Today
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-lightGray p-8">
            <MiniBookingForm />
            <p className="text-center text-gray-400 text-sm mt-6">
              Or call us directly:{' '}
              <a href="tel:5551234567" className="text-slateBlue font-bold hover:text-limeGreen transition-colors">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
