import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './Navbar'

const roboto = Roboto({
                  weight: ['400', '500', '700'], 
                  subsets: ['latin'], 
                  display: 'swap',
                  variable: '--font-poppins'
                })

export const metadata = {
  title: 'Social Media app',
  description: 'Social media app provide you to socialize and post.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
