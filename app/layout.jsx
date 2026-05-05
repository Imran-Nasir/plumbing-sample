import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { BookingProvider } from './context/BookingContext'

export const metadata = {
  title: 'Easy Plumbing | Fast. Reliable. Done Right.',
  description:
    'Easy Plumbing offers 24/7 emergency plumbing services. Licensed plumbers at your door in 60 minutes or less — guaranteed. Drain cleaning, water heater repair, pipe repair, and more.',
  keywords:
    'plumbing, emergency plumber, drain cleaning, water heater repair, pipe repair, licensed plumber, 24/7 plumbing',
  openGraph: {
    title: 'Easy Plumbing | Fast. Reliable. Done Right.',
    description:
      'Licensed plumbers at your door in 60 minutes or less — guaranteed. Available 24/7.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-offWhite text-charcoal antialiased">
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  )
}
