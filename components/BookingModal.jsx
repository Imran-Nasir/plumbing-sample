'use client'

import { useEffect, useRef } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useBooking } from '@/app/context/BookingContext'

const services = [
  'Emergency Repairs',
  'Drain Cleaning',
  'Water Heater Services',
  'Toilet & Fixture Repair',
  'Pipe Repair & Repiping',
  'Bathroom Remodeling',
  'Gas Line Services',
  'Sewer Line Repair',
  'Water Softener Installation',
]

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking()
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  const onSubmit = () => {
    // Success state is shown via isSubmitSuccessful
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel — centered on desktop, slide-in from right on mobile */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a Plumber"
        className="relative z-10 w-full max-w-md mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in sm:animate-none sm:animate-slide-in-right"
      >
        {/* Header */}
        <div className="bg-slateBlue px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Book a Plumber</h2>
            <p className="text-white/70 text-sm mt-0.5">We'll call you within 15 minutes.</p>
          </div>
          <button
            onClick={closeModal}
            aria-label="Close booking form"
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {isSubmitSuccessful ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle size={56} className="text-limeGreen" strokeWidth={1.5} />
              <h3 className="text-2xl font-extrabold text-charcoal">Request Sent!</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                We'll call you at the number you provided within 15 minutes to confirm your appointment.
              </p>
              <button
                onClick={closeModal}
                className="mt-2 px-6 py-2.5 bg-slateBlue text-white text-sm font-bold rounded-lg hover:bg-slateBlue/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-charcoal mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all ${errors.name ? 'border-red-400' : 'border-lightGray'}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-semibold text-charcoal mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all ${errors.phone ? 'border-red-400' : 'border-lightGray'}`}
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: { value: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, message: 'Enter a valid phone number' },
                  })}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label htmlFor="modal-service" className="block text-xs font-semibold text-charcoal mb-1">
                  Service Type
                </label>
                <select
                  id="modal-service"
                  className="w-full px-4 py-2.5 border border-lightGray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all bg-white"
                  {...register('service')}
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Preferred Time */}
              <div>
                <label htmlFor="modal-time" className="block text-xs font-semibold text-charcoal mb-1">
                  Preferred Time
                </label>
                <input
                  id="modal-time"
                  type="datetime-local"
                  className="w-full px-4 py-2.5 border border-lightGray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all"
                  {...register('preferredTime')}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-charcoal mb-1">
                  Brief Description
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Describe the issue…"
                  className="w-full px-4 py-2.5 border border-lightGray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all resize-none"
                  {...register('message')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-limeGreen text-charcoal font-extrabold py-3 rounded-xl text-sm transition-all duration-200 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
              >
                Request a Plumber
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
