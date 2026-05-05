'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { DollarSign, Clock, TrendingUp, Users, CheckCircle, Upload, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Top-of-market rates with weekly pay and performance bonuses.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Choose shifts that work for your life. No mandatory overtime.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Path',
    description: 'Clear path from apprentice to journeyman to master plumber.',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Work alongside experienced, supportive professionals who have your back.',
  },
]

const positions = [
  {
    title: 'Licensed Plumber',
    type: 'Full-Time',
    pay: '$35–$55/hr',
    requirements: [
      'Active state plumbing license',
      '3+ years residential/commercial experience',
      'Valid driver's license and clean record',
    ],
  },
  {
    title: 'Apprentice Plumber',
    type: 'Full-Time',
    pay: '$18–$25/hr',
    requirements: [
      'Currently enrolled in or completed plumbing apprenticeship',
      'Eager to learn and take direction',
      'Reliable transportation',
    ],
  },
  {
    title: 'Dispatcher / Customer Service',
    type: 'Full-Time',
    pay: '$20–$28/hr',
    requirements: [
      'Strong communication and organizational skills',
      'Experience with scheduling or dispatch software a plus',
      'Calm under pressure with excellent phone manner',
    ],
  },
]

const positionOptions = positions.map((p) => p.title)

export default function CareersPage() {
  const formRef = useRef(null)
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm()

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onSubmit = () => {}

  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D5F8A 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Careers</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Work With the Best.<br />
            <span className="text-limeGreen">Grow Your Career in Plumbing.</span>
          </h1>
          <p className="text-white/70 text-lg mt-5 max-w-[52ch]">
            Join a team that respects your craft, pays you well, and gives you room to grow.
          </p>
          <button
            onClick={scrollToForm}
            className="mt-8 inline-flex items-center gap-2 bg-limeGreen text-charcoal font-extrabold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:brightness-105"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Why Join Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">
              More Than Just a Job
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-7 flex flex-col gap-4 border border-lightGray shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slateBlue flex items-center justify-center">
                  <Icon size={22} className="text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-extrabold text-charcoal text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Now Hiring</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">Open Positions</h2>
          </div>
          <div className="flex flex-col gap-5">
            {positions.map((pos) => (
              <div
                key={pos.title}
                className="bg-offWhite rounded-2xl border-l-4 border-limeGreen border border-lightGray shadow-sm p-7 flex flex-col sm:flex-row sm:items-start gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-extrabold text-charcoal">{pos.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-slateBlue/8 text-slateBlue text-xs font-bold">{pos.type}</span>
                    <span className="px-3 py-1 rounded-full bg-limeGreen/15 text-limeGreen text-xs font-bold">{pos.pay}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {pos.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-limeGreen shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={scrollToForm}
                  className="shrink-0 self-start bg-slateBlue text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="py-20 bg-offWhite scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">Join the Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">Submit Your Application</h2>
          </div>

          <div className="bg-white rounded-2xl border border-lightGray shadow-sm p-8">
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle size={56} className="text-limeGreen" strokeWidth={1.5} />
                <h3 className="text-2xl font-extrabold text-charcoal">Application Received!</h3>
                <p className="text-gray-500 text-base max-w-sm">
                  We'll review your application and reach out within 2–3 business days. Thanks for your interest in joining Easy Plumbing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="career-name" className="block text-xs font-semibold text-charcoal mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="career-name"
                      type="text"
                      placeholder="Your name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all ${errors.name ? 'border-red-400' : 'border-lightGray'}`}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1"><AlertCircle size={12} />{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="career-phone" className="block text-xs font-semibold text-charcoal mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="career-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all ${errors.phone ? 'border-red-400' : 'border-lightGray'}`}
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, message: 'Enter a valid phone' },
                      })}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1"><AlertCircle size={12} />{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="career-email" className="block text-xs font-semibold text-charcoal mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all ${errors.email ? 'border-red-400' : 'border-lightGray'}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1"><AlertCircle size={12} />{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Position */}
                  <div>
                    <label htmlFor="career-position" className="block text-xs font-semibold text-charcoal mb-1.5">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="career-position"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all bg-white ${errors.position ? 'border-red-400' : 'border-lightGray'}`}
                      {...register('position', { required: 'Please select a position' })}
                    >
                      <option value="">Select position…</option>
                      {positionOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.position && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1"><AlertCircle size={12} />{errors.position.message}</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="career-experience" className="block text-xs font-semibold text-charcoal mb-1.5">
                      Years of Experience
                    </label>
                    <input
                      id="career-experience"
                      type="number"
                      min="0"
                      max="50"
                      placeholder="e.g. 5"
                      className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all"
                      {...register('experience')}
                    />
                  </div>
                </div>

                {/* Cover note */}
                <div>
                  <label htmlFor="career-message" className="block text-xs font-semibold text-charcoal mb-1.5">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    id="career-message"
                    rows={4}
                    placeholder="Why do you want to join Easy Plumbing? Any specialties or achievements you're proud of?"
                    className="w-full px-4 py-3 border border-lightGray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slateBlue transition-all resize-none"
                    {...register('message')}
                  />
                </div>

                {/* Resume upload */}
                <div>
                  <label htmlFor="career-resume" className="block text-xs font-semibold text-charcoal mb-1.5">
                    Resume / CV
                  </label>
                  <label
                    htmlFor="career-resume"
                    className="flex items-center gap-3 w-full px-4 py-3 border-2 border-dashed border-lightGray rounded-xl cursor-pointer hover:border-slateBlue hover:bg-slateBlue/4 transition-all group"
                  >
                    <Upload size={18} className="text-gray-400 group-hover:text-slateBlue transition-colors shrink-0" />
                    <span className="text-sm text-gray-400 group-hover:text-slateBlue transition-colors">
                      Click to upload PDF, DOC, or DOCX
                    </span>
                  </label>
                  <input
                    id="career-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    {...register('resume')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-limeGreen text-charcoal font-extrabold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:brightness-105"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
