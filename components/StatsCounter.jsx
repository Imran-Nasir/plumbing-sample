'use client'

import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function StatsCounter({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map(({ number, suffix, label }) => (
        <div key={label} className="flex flex-col items-center text-center gap-1">
          <p className="text-4xl md:text-5xl font-extrabold text-slateBlue">
            <Counter target={number} suffix={suffix} />
          </p>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  )
}
