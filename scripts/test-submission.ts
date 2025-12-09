import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

// Use the ANON key to simulate a client-side/anonymous user
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function submitBogusReport() {
    console.log("Attempting anonymous submission...")

    const bogusData = {
        violence_type: "physical",
        description: "Bogus Test Report - via script. Validating anonymous insert permissions.",
        incident_location: "Nairobi",
        status: "submitted",
        is_anonymous: true,
        risk_level: "low",
        // Generate a random anonymous ID similar to the app
        anonymous_id: "GBV-" + Math.random().toString(36).substring(2, 10).toUpperCase()
    }

    const { data, error } = await supabase
        .from("reports")
        .insert(bogusData)
        .select()
        .single()

    if (error) {
        console.error("Submission failed:", JSON.stringify(error, null, 2))
        process.exit(1)
    } else {
        console.log("Submission successful!")
        console.log("New Report ID:", data.id)
        console.log("Anonymous ID:", data.anonymous_id)
    }
}

submitBogusReport()
