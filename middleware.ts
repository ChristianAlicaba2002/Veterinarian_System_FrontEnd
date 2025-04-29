import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || ''
    const { pathname } = request.nextUrl

    // Public paths that don't require authentication
    const publicPaths = [
        '/Application/Organisms/Auth/LoginPage',
        '/Application/Organisms/Auth/RegisterPage',
        '/Application/Organisms/LandingPage',
    ]

    // Protected paths that require authentication
    const protectedPaths = [
        '/Application/Organisms/Layouts',
        '/Application/Organisms/Pages/Apointment',
        '/Application/Organisms/Pages/CheckUp',
        '/Application/Organisms/Pages/Grooming',
        '/Application/Organisms/Pages/MainPage',
        '/Application/Organisms/Pages/PetDetails',

    ]

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
    // Check if the current path is public
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

    // If user is logged in and trying to access public paths (login/register)
    if (isPublicPath && token) {
        return NextResponse.redirect(
            new URL('/Application/Organisms/Layouts', request.url))
    }

    // If user is not logged in and trying to access protected paths
    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/Application/Organisms/Auth/LoginPage', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/Application/Organisms/Auth/LoginPage/:path*',
        '/Application/Organisms/Auth/RegisterPage/:path*',
        '/Application/Organisms/Layouts/:path*',
    ],
} 