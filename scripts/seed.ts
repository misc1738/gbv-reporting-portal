import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

// Load env vars from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment variables.")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const VIOLENCE_TYPES = ["physical", "sexual", "emotional", "economic", "online", "other"]
const CITIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"]

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

function generateAnonymousId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let id = "GBV-"
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
}

async function seed() {
    console.log("Starting seed process...")
    const reports = []

    for (let i = 0; i < 30; i++) {
        const violenceType = VIOLENCE_TYPES[Math.floor(Math.random() * VIOLENCE_TYPES.length)]
        const location = CITIES[Math.floor(Math.random() * CITIES.length)]

        reports.push({
            anonymous_id: generateAnonymousId(),
            violence_type: violenceType,
            incident_date: randomDate(new Date(2024, 0, 1), new Date()),
            incident_location: location,
            description: `Test report ${i + 1}: Generated example of ${violenceType} violence in ${location}. This is a dummy entry for testing purposes.`,
            status: "submitted",
            risk_level: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
            is_anonymous: true,
        })
    }

    const { error } = await supabase.from("reports").insert(reports)

    if (error) {
        console.error("Error seeding reports:", error)
    } else {
        console.log("Successfully inserted 30 reports.")
    }
}

seed().catch(console.error)
