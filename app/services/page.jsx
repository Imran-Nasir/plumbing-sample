'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle, Droplets, Flame, Bath, Wrench, Home,
  Flame as GasFlame, ArrowDownCircle, Filter, ChevronDown, ChevronUp, CheckCircle,
} from 'lucide-react'
import CTABanner from '@/components/CTABanner'
import { useBooking } from '@/app/context/BookingContext'

const allServices = [
  {
    icon: AlertCircle,
    title: 'Emergency Repairs',
    description: 'Burst pipes, severe leaks, or complete system failures — our emergency team is dispatched within the hour, 24/7, 365 days a year.',
    included: [
      'Available 24 hours a day, 7 days a week',
      'Licensed plumber on-site within 60 minutes',
      'Water damage mitigation advice included',
      'All materials on the van for same-visit repair',
    ],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Droplets,
    title: 'Drain Cleaning',
    description: 'Slow drains and stubborn clogs cleared fast using professional hydro-jetting and snaking equipment — no mess, no damage, no repeat visits.',
    included: [
      'Camera inspection to locate blockage',
      'Hydro-jet and snake clearing methods',
      'Grease, hair, and root intrusion removal',
      '30-day clog-free guarantee',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Flame,
    title: 'Water Heater Services',
    description: 'Repair, replacement, and installation of all water heater types — tank, tankless, gas, and electric — with same-day availability.',
    included: [
      'Tank and tankless water heater repair',
      'Full replacement and new installation',
      'Gas and electric models supported',
      'Energy-efficient upgrade recommendations',
    ],
    color: 'from-orange-400 to-yellow-500',
  },
  {
    icon: Bath,
    title: 'Toilet & Fixture Repair',
    description: 'Running toilets, persistent clogs, cracked bowls, or faulty flappers — we diagnose and fix fast, often in a single visit.',
    included: [
      'Running toilet diagnosis and repair',
      'Complete toilet replacement',
      'Faucet and fixture installation',
      'Wax ring and seal replacement',
    ],
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Wrench,
    title: 'Pipe Repair & Repiping',
    description: 'From pin-hole leaks to full home repiping, our plumbers handle copper, PVC, PEX, and all modern pipe materials.',
    included: [
      'Leak detection with non-invasive tools',
      'Section and full-home repiping',
      'Copper, PVC, and PEX pipe work',
      'Pressure testing after all repairs',
    ],
    color: 'from-slate-500 to-blue-600',
  },
  {
    icon: Home,
    title: 'Bathroom Remodeling',
    description: 'Upgrade your bathroom with our expert rough-in plumbing and fixture installation — showers, tubs, vanities, and more.',
    included: [
      'Rough-in plumbing for new construction',
      'Shower and bathtub installation',
      'Vanity and sink plumbing',
      'Permit-ready plans available',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: GasFlame,
    title: 'Gas Line Services',
    description: 'Certified gas line installation, repair, and leak detection. Safety is our top priority on every gas job.',
    included: [
      'Gas leak detection and repair',
      'New gas line installation',
      'Appliance connection (range, dryer, BBQ)',
      'Safety shutoff valve installation',
    ],
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: ArrowDownCircle,
    title: 'Sewer Line Repair',
    description: 'Sewer line clogs, cracks, and root intrusions resolved with camera inspection and trenchless repair methods when possible.',
    included: [
      'Video camera sewer inspection',
      'Hydro-jet cleaning for root intrusion',
      'Trenchless pipe lining (CIPP)',
      'Traditional excavation when required',
    ],
    color: 'from-gray-600 to-slate-700',
  },
  {
    icon: Filter,
    title: 'Water Softener & Filtration',
    description: 'Install whole-home water softeners, reverse osmosis systems, and filtration units for better water quality throughout your home.',
    included: [
      'Whole-home water softener installation',
      'Under-sink reverse osmosis systems',
      'Water hardness testing',
      'Filter maintenance and cartridge replacement',
    ],
    color: 'from-cyan-500 to-teal-600',
  },
]

function ServiceExpandCard({ service, index }) {
  const [expanded, setExpanded] = useState(false)
  const { openModal } = useBooking()
  const Icon = service.icon

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
        expanded ? 'border-limeGreen shadow-lg' : 'border-lightGray hover:border-limeGreen hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-6 flex items-start gap-4 group"
        aria-expanded={expanded}
        aria-controls={`service-details-${index}`}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
          <Icon size={22} className="text-white" strokeWidth={1.75} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-charcoal text-lg leading-snug group-hover:text-slateBlue transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Toggle icon */}
        <div className="shrink-0 ml-2 mt-1 text-slateBlue">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div
          id={`service-details-${index}`}
          className="px-6 pb-6 border-t border-lightGray pt-5 flex flex-col gap-4"
        >
          <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
              What's Included
            </p>
            <ul className="flex flex-col gap-2">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-limeGreen shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={openModal}
            className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slateBlue text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-slateBlue/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
          >
            Book This Service
          </button>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slateBlue to-[#1A3A5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/50 text-sm">
              <li>
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Services</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Full-Service Plumbing for Every Situation
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              From burst pipes at midnight to bathroom remodels — our licensed team handles all of it with speed, skill, and upfront pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">
              All Services
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              Click Any Service to See Details
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              Every service comes with transparent upfront pricing and a satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {allServices.map((service, i) => (
              <ServiceExpandCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Plumbing Emergency? We're Ready Now."
        subtitle="Licensed plumbers on standby 24/7. Call now or book online and we'll be there within the hour."
        buttonText="Call (555) 123-4567"
        buttonHref="tel:5551234567"
        variant="blue"
      />
    </>
  )
}
