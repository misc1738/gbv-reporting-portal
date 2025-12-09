import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    if (!supabaseUrl || !supabaseKey) {
        // If config is missing, just proceed without Supabase logic to avoid crashing the whole app
        return response
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    let user = null
    try {
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()
        if (error) {
            console.warn("Middleware auth check failed:", error.message)
        }
        user = supabaseUser
    } catch (e) {
        console.error("Middleware auth unexpected error:", e)
        // Proceed as if unauthenticated to avoid blocking the request entirely
    }

    if (request.nextUrl.pathname.includes('/admin') && !user) {
        return NextResponse.redirect(new URL('/en/login', request.url))
    }

    // If user is logged in, restrict access to auth pages
    if ((request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup')) && user) {
        return NextResponse.redirect(new URL('/en/admin/dashboard', request.url))
    }

    return response
}
