'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { DollarSign, Clock, TrendingUp, Users, CheckCircle, Upload } from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Top-of-market rates with weekly pay.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Choose shifts that work for your life.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Path',
    description: 'Clear path from apprentice to master plumber.',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Work alongside experienced, supportive plumbers.',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
  },
]

const positions = [
  {
    id: 'licensed-plumber',
    title: 'Licensed Plumber',
    type: 'Full-Time',
    pay: '$35–$55/hr',
    requirements: [
      'Valid state plumbing license (journeyman or master)',
      '3+ years of residential and/or commercial experience',
      'Own tools and reliable transportation',
    ],
  },
  {
    id: 'apprentice-plumber',
    title: 'Apprentice Plumber',
    type: 'Full-Time',
    pay: '$18–$25/hr',
    requirements: [
      'Enrolled in or completed an apprenticeship program',
      'Willingness to learn and take direction',
      'Valid driver's license and clean driving record',
    ],
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher / Customer Service',
    type: 'Full-Time',
    pay: '$20–$28/hr',
    requirements: [
      '2+ years customer service or dispatch experience',
      'Excellent communication and multitasking skills',
      'Experience with scheduling software a plus',
    ],
  },
]

const POSITION_OPTIONS = positions.map((p) => p.title)

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [resumeFileName, setResumeFileName] = useState('')
  const formRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal to-[#0D0D1F] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/40 text-sm">
              <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70 font-semibold">Careers</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-4">Join Our Team</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Work With the Best.<br />
              <span className="text-limeGreen">Grow Your Career in Plumbing.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              We're looking for talented, driven people who take pride in their craft. Whether you're a seasoned pro or just starting out — there's a place for you at Easy Plumbing.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">Why Work Here</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              More Than Just a Job
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              We invest in our people because great technicians create happy customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, description, color, iconColor }) => (
              <div
                key={title}
                className={`rounded-2xl border p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${color}`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon size={24} className={iconColor} />
                </div>
                <div>
                  <h3 className="font-extrabold text-charcoal text-lg mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">Now Hiring</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">Open Positions</h2>
          </div>
          <div className="flex flex-col gap-6">
            {positions.map((pos) => (
              <div
                key={pos.id}
                className="bg-white rounded-2xl border border-lightGray border-l-4 border-l-limeGreen shadow-sm hover:shadow-md transition-all duration-300 p-7"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-extrabold text-charcoal">{pos.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="bg-slateBlue/10 text-slateBlue text-xs font-bold px-3 py-1 rounded-full">
                        {pos.type}
                      </span>
                      <span className="bg-limeGreen/15 text-charcoal text-xs font-bold px-3 py-1 rounded-full">
                        {pos.pay}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={scrollToForm}
                    className="shrink-0 px-6 py-3 bg-slateBlue text-white font-bold rounded-xl text-sm transition-all duration-200 hover:bg-slateBlue/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                  >
                    Apply Now
                  </button>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
                    Requirements
                  </p>
                  <ul className="flex flex-col gap-2">
                    {pos.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-limeGreen shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="py-20 bg-offWhite" id="apply">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">Apply Today</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">Submit Your Application</h2>
            <p className="mt-3 text-gray-500 text-sm">
              We review every application and typically respond within 2 business days.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-lightGray shadow-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-5 py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-limeGreen/15 flex items-center justify-center">
                  <CheckCircle size={44} className="text-limeGreen" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-extrabold text-charcoal">Application Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                  Thank you for your interest. We'll review your application and reach out within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                {/* Name */}
                <div>
                  <label htmlFor="app-name" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="app-name"
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
                    <label htmlFor="app-phone" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[\d\s\-().+]{7,}$/, message: 'Enter a valid phone number' },
                      })}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-email" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="app-email"
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Position + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="app-position" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="app-position"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all bg-white ${errors.position ? 'border-red-400 focus:ring-red-200' : 'border-lightGray focus:ring-slateBlue/30 focus:border-slateBlue'}`}
                      {...register('position', { required: 'Please select a position' })}
                    >
                      <option value="">Select a position…</option>
                      {POSITION_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="app-experience" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                      Years of Experience
                    </label>
                    <input
                      id="app-experience"
                      type="number"
                      min="0"
                      max="50"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue/30 focus:border-slateBlue transition-all"
                      {...register('experience', {
                        min: { value: 0, message: 'Must be 0 or more' },
                        max: { value: 50, message: 'Must be 50 or less' },
                      })}
                    />
                    {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                  </div>
                </div>

                {/* Cover Note */}
                <div>
                  <label htmlFor="app-message" className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                    Cover Note / Message
                  </label>
                  <textarea
                    id="app-message"
                    rows={4}
                    placeholder="Tell us why you'd be a great fit for the team…"
                    className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue/30 focus:border-slateBlue transition-all resize-none"
                    {...register('message')}
                  />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                    Resume (PDF or Word)
                  </label>
                  <label
                    htmlFor="app-resume"
                    className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-lightGray rounded-xl cursor-pointer hover:border-slateBlue hover:bg-slateBlue/5 transition-all duration-200 group"
                  >
                    <Upload size={18} className="text-gray-400 group-hover:text-slateBlue transition-colors shrink-0" />
                    <span className="text-sm text-gray-400 group-hover:text-slateBlue transition-colors">
                      {resumeFileName || 'Click to upload your resume…'}
                    </span>
                  </label>
                  <input
                    id="app-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    {...register('resume', {
                      onChange: (e) => {
                        const file = e.target.files?.[0]
                        if (file) setResumeFileName(file.name)
                      },
                    })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slateBlue text-white font-extrabold rounded-xl text-sm transition-all duration-200 hover:bg-slateBlue/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
