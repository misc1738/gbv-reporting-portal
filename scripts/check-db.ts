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

const TABLES = [
    "users",
    "reports",
    "evidence_files",
    "risk_assessments",
    "safety_plans",
    "service_providers",
    "referrals",
    "case_updates",
    "notifications",
    "learning_modules",
    "user_progress",
    "badges",
    "user_badges"
]

async function checkDb() {
    console.log("Starting database check...")
    console.log("--------------------------------")

    for (const table of TABLES) {
        try {
            // Get count
            const { count, error: countError } = await supabase
                .from(table)
                .select("*", { count: "exact", head: true })

            if (countError) {
                console.error(`Error counting ${table}:`, JSON.stringify(countError, null, 2))
                // Try selecting one row just to see if we get *any* data or better error
                const { data: testData, error: testError } = await supabase.from(table).select("*").limit(1)
                if (testError) {
                    console.error(`Secondary error fetching ${table}:`, JSON.stringify(testError, null, 2))
                } else if (testData && testData.length > 0) {
                    console.log(`Found columns in ${table}:`, Object.keys(testData[0]))
                }
                continue
            }

            console.log(`Table: ${table}`)
            console.log(`Count: ${count}`)

            if (count && count > 0) {
                // Get sample data
                const { data, error: dataError } = await supabase
                    .from(table)
                    .select("*")
                    .limit(3)

                if (dataError) {
                    console.error(`Error fetching sample for ${table}:`, dataError.message)
                } else {
                    console.log("Sample Data:", JSON.stringify(data, null, 2))
                }
            } else {
                console.log("Sample Data: (Empty)")
            }
            console.log("--------------------------------")
        } catch (err) {
            console.error(`Unexpected error checking ${table}:`, err)
        }
    }
}

checkDb().catch(console.error)
