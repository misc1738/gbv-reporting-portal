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

  client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return client
}
