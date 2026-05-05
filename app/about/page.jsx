import Link from 'next/link'
import { Heart, Zap, Award } from 'lucide-react'
import StatsCounter from '@/components/StatsCounter'

export const metadata = {
  title: 'About Easy Plumbing | Licensed & Local Plumbers',
  description:
    'Learn the story behind Easy Plumbing — a family-founded plumbing company serving homeowners with honest, fast, and expert service for over 15 years.',
}

const stats = [
  { number: 15, suffix: '+', label: 'Years Experience' },
  { number: 2400, suffix: '+', label: 'Jobs Done' },
  { number: 98, suffix: '%', label: 'Customer Satisfaction' },
  { number: 24, suffix: '/7', label: 'Availability' },
]

const values = [
  {
    icon: Heart,
    title: 'Honesty First',
    description: "We give upfront pricing and never recommend work that isn't needed.",
  },
  {
    icon: Zap,
    title: 'Speed & Reliability',
    description: 'We show up on time, work efficiently, and clean up before we leave.',
  },
  {
    icon: Award,
    title: 'Quality Workmanship',
    description: 'Every job is done right the first time — backed by our satisfaction guarantee.',
  },
]

const team = [
  {
    name: 'Marcus Johnson',
    role: 'Lead Plumber',
    initials: 'MJ',
    bio: '15 years experience, specializes in commercial systems.',
    color: 'from-slateBlue to-[#1A3A5C]',
  },
  {
    name: 'Sarah Chen',
    role: 'Master Plumber',
    initials: 'SC',
    bio: 'Licensed in 3 states, expert in water heater systems.',
    color: 'from-purple-600 to-blue-600',
  },
  {
    name: 'David Torres',
    role: 'Apprentice Plumber',
    initials: 'DT',
    bio: '2 years on the job, always eager to learn and help.',
    color: 'from-limeGreen to-teal-500',
  },
]

const certs = [
  { label: 'State Licensed', bg: 'bg-blue-50 border-blue-200 text-blue-700' },
  { label: 'BBB Accredited', bg: 'bg-amber-50 border-amber-200 text-amber-700' },
  { label: 'PHCC Member', bg: 'bg-green-50 border-green-200 text-green-700' },
  { label: 'EPA Certified', bg: 'bg-teal-50 border-teal-200 text-teal-700' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slateBlue to-[#1A3A5C] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/50 text-sm">
              <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">About</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-4">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              We're Not Just Plumbers.<br />
              <span className="text-limeGreen">We're Your Neighbors.</span>
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl">
              Founded on the belief that every homeowner deserves honest, fast, and expert plumbing service — no upsells, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <p className="text-limeGreen text-xs font-bold uppercase tracking-widest">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal leading-snug">
                Built on Trust, One Job at a Time
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Easy Plumbing was founded over 15 years ago by a journeyman plumber who was tired of seeing homeowners overcharged and underserved. He started with one van, one phone, and a simple promise: show up on time, fix it right, and charge a fair price. That promise still drives everything we do today.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                What began as a one-person operation in the Springfield area has grown into a team of licensed, background-checked professionals handling hundreds of calls every month. We've never lost sight of our roots — community, honesty, and workmanship are the core of who we are. When you call Easy Plumbing, you're calling a neighbor who happens to be a master plumber.
              </p>
            </div>

            {/* Image placeholder */}
            <div className="flex-1 w-full">
              <div className="rounded-2xl bg-gradient-to-br from-lightGray to-offWhite border border-lightGray aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-300 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-lightGray flex items-center justify-center">
                    <span className="text-3xl">🔧</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-400">Team Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 border border-lightGray text-center flex flex-col items-center gap-5 hover:border-limeGreen hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-slateBlue/8 flex items-center justify-center">
                  <Icon size={30} className="text-slateBlue" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-charcoal mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-slateBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">By the Numbers</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Results That Speak for Themselves
            </h2>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-10">
            <StatsCounter stats={stats} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">Meet the Team</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">The People Behind the Work</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
              Every member of our team is background-checked, licensed, and committed to doing great work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, initials, bio, color }) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-lightGray p-8 flex flex-col items-center text-center gap-4 hover:border-limeGreen hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-extrabold text-2xl shadow-md`}
                >
                  {initials}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-charcoal">{name}</h3>
                  <p className="text-limeGreen text-sm font-bold mt-0.5">{role}</p>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-lightGray border-y border-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Certifications & Memberships
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {certs.map(({ label, bg }) => (
              <span
                key={label}
                className={`px-5 py-2.5 rounded-full border text-sm font-bold ${bg}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
