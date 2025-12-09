import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

/**
 * Creates a Supabase client for client-side usage.
 * Uses a singleton pattern to prevent multiple client instances.
 * 
 * @returns The Supabase browser client.
 */
export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.")
    // We can't return null if the return type is checked strictly elsewhere, but we can throw a descriptive error
    throw new Error("Supabase environment variables are missing.")
  }

  client = createBrowserClient(supabaseUrl, supabaseKey)

  return client
}
