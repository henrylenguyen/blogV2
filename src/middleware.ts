import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en'
  
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)

  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale)

  //Step 4: rewrite the request with correct path (path build separately)


  return response;
}
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
}
