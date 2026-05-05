import Link from 'next/link'
import { useBooking } from '@/app/context/BookingContext'

export const metadata = {
  title: 'Plumbing Tips & Home Care Blog | Easy Plumbing',
  description:
    'Expert plumbing tips, home maintenance guides, and money-saving advice from the licensed plumbers at Easy Plumbing.',
}

const posts = [
  {
    id: 1,
    title: '5 Signs Your Water Heater Is Failing',
    category: 'Maintenance',
    date: 'January 15, 2025',
    excerpt: 'Catch water heater problems early before they turn into a cold-shower emergency or a flooded basement.',
    color: 'from-orange-400 to-amber-500',
    slug: '#',
  },
  {
    id: 2,
    title: 'How to Prevent Frozen Pipes This Winter',
    category: 'Prevention',
    date: 'December 8, 2024',
    excerpt: 'A few simple steps before the first freeze can save you thousands in burst-pipe repairs.',
    color: 'from-blue-400 to-cyan-500',
    slug: '#',
  },
  {
    id: 3,
    title: 'When to Call a Plumber vs. DIY',
    category: 'Advice',
    date: 'November 22, 2024',
    excerpt: 'Not every drip needs a pro — but knowing the difference can protect your home and your wallet.',
    color: 'from-green-400 to-teal-500',
    slug: '#',
  },
  {
    id: 4,
    title: 'Understanding Your Home's Water Pressure',
    category: 'Education',
    date: 'October 14, 2024',
    excerpt: 'High water pressure feels great in the shower but silently destroys pipes, fixtures, and appliances.',
    color: 'from-purple-400 to-indigo-500',
    slug: '#',
  },
  {
    id: 5,
    title: 'The Hidden Costs of Ignoring a Slow Drain',
    category: 'Tips',
    date: 'September 30, 2024',
    excerpt: 'That sluggish sink drain is more than an annoyance — it could signal a much bigger (and more expensive) problem.',
    color: 'from-red-400 to-rose-500',
    slug: '#',
  },
  {
    id: 6,
    title: 'Choosing the Right Water Heater for Your Home',
    category: 'Buying Guide',
    date: 'September 5, 2024',
    excerpt: 'Tank vs. tankless, gas vs. electric — we break down every option so you can make the smartest choice.',
    color: 'from-yellow-400 to-orange-500',
    slug: '#',
  },
]

const categories = ['Maintenance', 'Prevention', 'Advice', 'Education', 'Tips', 'Buying Guide']

const categoryColors = {
  Maintenance: 'bg-orange-50 text-orange-700 border-orange-200',
  Prevention: 'bg-blue-50 text-blue-700 border-blue-200',
  Advice: 'bg-green-50 text-green-700 border-green-200',
  Education: 'bg-purple-50 text-purple-700 border-purple-200',
  Tips: 'bg-red-50 text-red-700 border-red-200',
  'Buying Guide': 'bg-yellow-50 text-yellow-700 border-yellow-200',
}

const recentPosts = posts.slice(0, 3)

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slateBlue to-[#1A3A5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/50 text-sm">
              <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Blog</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-limeGreen text-xs font-bold uppercase tracking-widest mb-3">Our Blog</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Plumbing Tips & Home Care Guides
            </h1>
            <p className="text-white/75 text-lg max-w-2xl">
              Practical advice from our licensed plumbers to keep your home's plumbing running smoothly and your wallet happy.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main — Blog Grid (2/3) */}
            <div className="flex-[2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-lightGray overflow-hidden hover:border-limeGreen hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail placeholder */}
                    <div
                      className={`w-full aspect-video bg-gradient-to-br ${post.color} flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      <span className="text-white/30 text-4xl font-extrabold tracking-tight">
                        {post.category.charAt(0)}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      {/* Category */}
                      <span
                        className={`inline-block self-start px-3 py-1 rounded-full border text-xs font-bold ${categoryColors[post.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}
                      >
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="font-extrabold text-charcoal text-lg leading-snug">
                        {post.title}
                      </h2>

                      {/* Date */}
                      <p className="text-gray-400 text-xs font-semibold">{post.date}</p>

                      {/* Excerpt */}
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>

                      {/* Read more */}
                      <Link
                        href={post.slug}
                        className="inline-flex items-center gap-1 text-sm font-bold text-slateBlue hover:text-limeGreen transition-colors mt-auto group"
                        aria-label={`Read more: ${post.title}`}
                      >
                        Read More
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <aside className="flex-[1] flex flex-col gap-6" aria-label="Blog sidebar">

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-lightGray p-6">
                <h3 className="text-sm font-extrabold text-charcoal uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <ul className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href="#"
                        className="flex items-center justify-between text-sm text-gray-500 hover:text-slateBlue font-semibold transition-colors group"
                      >
                        <span className="group-hover:pl-1 transition-all duration-200">{cat}</span>
                        <span
                          className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${categoryColors[cat] || 'bg-gray-100 text-gray-500'}`}
                        >
                          {posts.filter((p) => p.category === cat).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl border border-lightGray p-6">
                <h3 className="text-sm font-extrabold text-charcoal uppercase tracking-widest mb-4">
                  Recent Posts
                </h3>
                <ul className="flex flex-col gap-4">
                  {recentPosts.map((post) => (
                    <li key={post.id}>
                      <Link href={post.slug} className="flex items-start gap-3 group">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${post.color} shrink-0`}
                          aria-hidden="true"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-charcoal group-hover:text-slateBlue transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{post.date}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-slateBlue rounded-2xl p-6 flex flex-col gap-4 text-center">
                <h3 className="text-white font-extrabold text-lg">Need a Plumber Now?</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Skip the reading — call us or book online and we'll have someone at your door within the hour.
                </p>
                <a
                  href="tel:5551234567"
                  className="w-full py-3 bg-limeGreen text-charcoal font-extrabold rounded-xl text-sm transition-all duration-200 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] block"
                  aria-label="Call Easy Plumbing now"
                >
                  Call (555) 123-4567
                </a>
                <Link
                  href="/contact"
                  className="text-white/60 text-xs hover:text-white/90 transition-colors underline"
                >
                  Or book online →
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
