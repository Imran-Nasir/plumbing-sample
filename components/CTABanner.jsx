import Link from 'next/link'

export default function CTABanner({
  title = 'Need a Plumber Fast?',
  subtitle = 'We're available 24/7 for emergencies. Call or book online now.',
  buttonText = 'Get Help Now',
  buttonHref = '/contact',
  variant = 'blue',
}) {
  const isBlue = variant === 'blue'

  return (
    <section
      className={`w-full py-16 px-4 ${isBlue ? 'bg-slateBlue' : 'bg-limeGreen'}`}
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <h2
          className={`text-3xl md:text-4xl font-extrabold leading-tight ${
            isBlue ? 'text-white' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-lg max-w-xl ${
              isBlue ? 'text-white/80' : 'text-charcoal/80'
            }`}
          >
            {subtitle}
          </p>
        )}
        <Link
          href={buttonHref}
          className={`inline-block px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg ${
            isBlue
              ? 'bg-limeGreen text-charcoal hover:brightness-105'
              : 'bg-charcoal text-white hover:bg-charcoal/90'
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
