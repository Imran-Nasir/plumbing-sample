import { Star } from 'lucide-react'

export default function TestimonialCard({ name, city, rating = 5, quote }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-lightGray flex flex-col gap-4 min-w-[320px] md:min-w-[380px] max-w-[420px]">
      {/* Stars */}
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 text-sm leading-relaxed italic flex-1">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slateBlue to-slateBlue/60 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-charcoal text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{city}</p>
        </div>
      </div>
    </div>
  )
}
