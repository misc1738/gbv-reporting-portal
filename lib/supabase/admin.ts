import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client with the Service Role key.
 * This client bypasses Row Level Security (RLS) and should ONLY be used
 * in secure server-side contexts (Server Actions, API Routes).
 * 
 * @returns The Supabase Admin client
 */
export function getSupabaseAdminClient() {
    const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!adminKey) {
        console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin actions may fail.')
        // Fallback to anon key but this won't have admin privileges
        // This allows the app to build/run even if the key isn't set yet
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        adminKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}
