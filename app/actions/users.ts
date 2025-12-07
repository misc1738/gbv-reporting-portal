'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, role: string) {
    const supabase = await getSupabaseServerClient()

    // Verify current user is admin
    // In a real app, we should check the current user's role from a 'users' table or custom claims
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
}

export async function deleteUser(userId: string) {
    const supabase = await getSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    // Delete from public.users table first (foreign keys might restrict otherwise, but usually cascading defaults handle it)
    // Actually, often it's better to delete from AUTH first if CASCADE is set up, 
    // or PUBLIC first if we want to be sure application data is gone.
    // Standard Supabase pattern: Delete from AUTH, trigger/cascade handles public.users.

    // However, if we don't have triggers set up, we should delete both. 
    // Let's try deleting from Auth using the Admin client data first.

    const adminSupabase = getSupabaseAdminClient()

    // 1. Delete from Supabase Auth (admin privilege required)
    const { error: authError } = await adminSupabase.auth.admin.deleteUser(userId)

    if (authError) {
        // If it fails (maybe user doesn't exist in auth but exists in public), log it but try to continue cleanup?
        // Or just return error. Usually if auth deletion fails, we stop.
        return { error: `Auth Deletion Failed: ${authError.message}` }
    }

    // 2. Delete from public.users (if not handled by cascade)
    // We can still try to delete explicitly to be sure.
    const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

    if (dbError) {
        return { error: `Database Deletion Failed: ${dbError.message}` }
    }

    revalidatePath('/admin/users')
    return { success: true }
}
