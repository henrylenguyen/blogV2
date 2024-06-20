import { Manrope, Roboto } from 'next/font/google'
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-marope'
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})

export { manrope, roboto }
