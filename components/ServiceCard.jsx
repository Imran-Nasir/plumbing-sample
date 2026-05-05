import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, href = '/services' }) {
  return (
    <div className="group bg-white rounded-xl p-6 border border-lightGray transition-all duration-300 hover:-translate-y-1 hover:border-limeGreen hover:shadow-lg flex flex-col gap-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-slateBlue/8 flex items-center justify-center transition-colors duration-300 group-hover:bg-limeGreen/15">
        {Icon && (
          <Icon
            size={24}
            className="text-slateBlue transition-colors duration-300 group-hover:text-limeGreen"
            strokeWidth={1.75}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-bold text-charcoal text-lg leading-snug">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>

      {/* CTA */}
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slateBlue hover:text-limeGreen transition-colors duration-200 group/link mt-auto"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </Link>
    </div>
  )
}
