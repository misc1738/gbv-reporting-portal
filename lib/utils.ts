/**
 * Utility functions for the application.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names using clsx and tailwind-merge.
 * This ensures that Tailwind classes are properly merged and conflicts are resolved.
 * 
 * @param inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns A merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
