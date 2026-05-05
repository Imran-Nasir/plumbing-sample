'use client'

import { useEffect, useRef, useState } from 'react'
import { Phone, Search, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Call or Book Online',
    description: 'Pick a time that works for you — we're available 24/7.',
  },
  {
    number: '02',
    icon: Search,
    title: 'We Diagnose & Quote',
    description: 'Upfront pricing before any work begins. No surprises.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Problem Solved',
    description: 'Clean, fast, guaranteed workmanship every time.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState([false, false, false])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, i * 180)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-offWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">The Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2">
            Booked, Fixed, Done — In 3 Steps
          </h2>
        </div>

        <div ref={sectionRef} className="relative flex flex-col md:flex-row items-start md:items-stretch gap-8 md:gap-0">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-lightGray z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`hiw-step flex-1 flex flex-col items-center text-center px-6 z-10 ${visible[i] ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Circle */}
                <div className="w-24 h-24 rounded-full bg-slateBlue flex items-center justify-center shadow-lg mb-6 relative">
                  <Icon size={36} className="text-white" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-limeGreen text-charcoal text-xs font-extrabold flex items-center justify-center shadow">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-charcoal mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
