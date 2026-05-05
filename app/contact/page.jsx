'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Phone, Mail, Clock, MapPin, CheckCircle } from 'lucide-react'

const SERVICE_OPTIONS = [
  'Emergency Repairs',
  'Drain Cleaning',
  'Water Heater Services',
  'Toilet & Fixture Repair',
  'Pipe Repair & Repiping',
  'Bathroom Remodeling',
  'Gas Line Services',
  'Sewer Line Repair',
  'Water Softener & Filtration',
]

const MAX_MESSAGE_LENGTH = 300

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [messageLength, setMessageLength] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slateBlue to-[#1A3A5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/50 text-sm">
              <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Contact</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Let's Fix It — <span className="text-limeGreen">Today.</span>
          </h1>
          <p className="text-white/75 text-lg max-w-xl">
            Fill out the form and we'll call you within 15 minutes to confirm your appointment.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

            {/* LEFT — Booking Form */}
            <div className="flex-[3]">
              <div className="bg-white rounded-2xl border border-lightGray shadow-sm p-8">
                <h2 className="text-2xl font-extrabold text-charcoal mb-1">Request a Plumber</h2>
                <p className="text-gray-500 text-sm mb-7">
                  We'll call you back within <span className="font-semibold text-slateBlue">15 minutes</span> to confirm.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center gap-5 py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-limeGreen/15 flex items-center justify-center">
                      <CheckCircle size={44} className="text-limeGreen" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-charcoal">Request Sent!</h3>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                      We'll call you within <span className="font-semibold text-slateBlue">15 minutes</span> to confirm your appointment. Thank you!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        placeholder="Jane Smith"
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                        {...register('name', { required: 'Full name is required' })}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-phone" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="c-phone"
                          type="tel"
                          placeholder="(555) 000-0000"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: /^[\d\s\-().+]{7,}$/, message: 'Enter a valid phone number' },
                          })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-email" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          placeholder="you@example.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                          {...register('email', {
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                          })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <label htmlFor="c-service" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                        Service Type
                      </label>
                      <select
                        id="c-service"
                        className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue/30 focus:border-slateBlue transition-all bg-white"
                        {...register('service')}
                      >
                        <option value="">Select a service…</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message with char count */}
                    <div>
                      <label htmlFor="c-message" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                        Describe Your Issue
                      </label>
                      <textarea
                        id="c-message"
                        rows={4}
                        maxLength={MAX_MESSAGE_LENGTH}
                        placeholder="Briefly describe the plumbing issue…"
                        className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue/30 focus:border-slateBlue transition-all resize-none"
                        {...register('message', {
                          onChange: (e) => setMessageLength(e.target.value.length),
                          maxLength: { value: MAX_MESSAGE_LENGTH, message: `Maximum ${MAX_MESSAGE_LENGTH} characters` },
                        })}
                      />
                      <p className={`text-xs mt-1 text-right ${messageLength >= MAX_MESSAGE_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
                        {messageLength} / {MAX_MESSAGE_LENGTH}
                      </p>
                    </div>

                    {/* Preferred date/time */}
                    <div>
                      <label htmlFor="c-datetime" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                        Preferred Date & Time
                      </label>
                      <input
                        id="c-datetime"
                        type="datetime-local"
                        className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue/30 focus:border-slateBlue transition-all"
                        {...register('preferredDatetime')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-slateBlue text-white font-extrabold rounded-xl text-sm transition-all duration-200 hover:bg-slateBlue/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending Request…' : 'Request a Plumber'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT — Contact info */}
            <div className="flex-[2] flex flex-col gap-6">
              {/* Contact card */}
              <div className="bg-white rounded-2xl border border-lightGray p-7 flex flex-col gap-5">
                <h2 className="text-xl font-extrabold text-charcoal">Contact Information</h2>

                <a
                  href="tel:5551234567"
                  className="flex items-center gap-3 group"
                  aria-label="Call Easy Plumbing"
                >
                  <div className="w-11 h-11 rounded-xl bg-slateBlue/10 flex items-center justify-center shrink-0 group-hover:bg-slateBlue/20 transition-colors">
                    <Phone size={20} className="text-slateBlue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Phone</p>
                    <p className="text-xl font-extrabold text-charcoal group-hover:text-slateBlue transition-colors">
                      (555) 123-4567
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:hello@easyplumbing.com"
                  className="flex items-center gap-3 group"
                  aria-label="Email Easy Plumbing"
                >
                  <div className="w-11 h-11 rounded-xl bg-slateBlue/10 flex items-center justify-center shrink-0 group-hover:bg-slateBlue/20 transition-colors">
                    <Mail size={20} className="text-slateBlue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</p>
                    <p className="text-sm font-bold text-charcoal group-hover:text-slateBlue transition-colors">
                      hello@easyplumbing.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slateBlue/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-slateBlue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">Hours</p>
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-charcoal font-semibold">Emergency:</span>
                        <span className="text-limeGreen font-bold">24 / 7</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-charcoal font-semibold">Office:</span>
                        <span className="text-gray-500">Mon–Fri 8am–6pm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-lightGray overflow-hidden">
                <div className="bg-lightGray aspect-[4/3] flex flex-col items-center justify-center gap-3">
                  <MapPin size={40} className="text-gray-300" strokeWidth={1.5} />
                  <p className="text-gray-400 text-sm font-semibold">Map Coming Soon</p>
                  <p className="text-gray-400 text-xs">123 Main Street, Springfield, ST 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 bg-limeGreen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal">Need emergency help right now?</h2>
            <p className="text-charcoal/70 text-sm mt-1">Licensed plumber at your door within 60 minutes.</p>
          </div>
          <a
            href="tel:5551234567"
            className="shrink-0 inline-flex items-center gap-2 bg-charcoal text-white font-extrabold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:bg-charcoal/90 hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl"
            aria-label="Call for emergency plumbing"
          >
            <Phone size={18} />
            (555) 123-4567
          </a>
        </div>
      </section>
    </>
  )
}
