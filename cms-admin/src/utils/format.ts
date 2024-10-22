import { format } from 'date-fns'

export const formatDate = (date: number | string, formatType = 'dd/MM/yyyy HH:mm') => {
  if (!date) return ''
  return format(new Date(date), formatType)
}

/**
 *  This function is used to shorten string
 *  @param str is string need to shorten
 * @param maxLength is max length of string
 * @returns string
 * @example
 * ```tsx
 * shortenString('This is a long string', 10) // return 'This...string'
 * ```
 *
 */
export const shortenString = (str?: string, maxLength = 10) => {
  if (!str) return ''
  const sideLength = Math.floor(maxLength / 2)
  return str.length > maxLength ? `${str.slice(0, sideLength)}...${str.slice(-sideLength)}` : str
}

export const formatPrice = (number: number, fix?: number) => {
  return fix ? (number / 1000000).toFixed(fix) : number / 1000000
}

export const trimStringMiddle = (str: string, startChars: number, endChars: number): string => {
  if (str.length <= startChars + endChars) {
    return str
  }
  const start = str.slice(0, startChars)
  const end = str.slice(-endChars)
  return `${start}...${end}`
}

export const shortCenter = (string: string) =>
  string.length > 8 ? `${string.slice(0, 4)}...${string.slice(-4)}` : string
