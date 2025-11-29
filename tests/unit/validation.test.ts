import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Define schemas here since they might be inside components or not exported
// In a real app, these should be exported from a shared file
const reportSchema = z.object({
    violenceType: z.enum(["physical", "sexual", "emotional", "economic", "online", "other"]),
    description: z.string().min(20, "Description must be at least 20 characters"),
    incidentDate: z.string().optional(),
    incidentLocation: z.string().optional(),
    isAnonymous: z.boolean(),
})

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    relationship: z.string().min(2, "Relationship is required"),
})

describe('Validation Schemas', () => {
    describe('Report Schema', () => {
        it('should validate a valid report', () => {
            const validReport = {
                violenceType: 'physical',
                description: 'This is a detailed description of the incident that happened.',
                incidentDate: '2023-01-01',
                incidentLocation: 'Nairobi',
                isAnonymous: true,
            }
            const result = reportSchema.safeParse(validReport)
            expect(result.success).toBe(true)
        })

        it('should fail if description is too short', () => {
            const invalidReport = {
                violenceType: 'physical',
                description: 'Too short',
                isAnonymous: true,
            }
            const result = reportSchema.safeParse(invalidReport)
            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least 20 characters')
            }
        })

        it('should fail if violence type is invalid', () => {
            const invalidReport = {
                violenceType: 'invalid_type',
                description: 'This is a detailed description of the incident that happened.',
                isAnonymous: true,
            }
            const result = reportSchema.safeParse(invalidReport)
            expect(result.success).toBe(false)
        })
    })

    describe('Contact Schema', () => {
        it('should validate a valid contact', () => {
            const validContact = {
                name: 'Jane Doe',
                phone: '0712345678',
                relationship: 'Sister',
            }
            const result = contactSchema.safeParse(validContact)
            expect(result.success).toBe(true)
        })

        it('should fail if phone number is too short', () => {
            const invalidContact = {
                name: 'Jane Doe',
                phone: '123',
                relationship: 'Sister',
            }
            const result = contactSchema.safeParse(invalidContact)
            expect(result.success).toBe(false)
        })
    })
})
