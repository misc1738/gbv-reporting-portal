import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)

const supabase = createClient(supabaseUrl, supabaseKey)

async function testColumn() {
    console.log("Inspecting 'reports' table columns...")
    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .limit(1)

    if (error) {
        console.error("Fetch failed:", JSON.stringify(error, null, 2))
    } else if (data && data.length > 0) {
        console.log("Available columns:", Object.keys(data[0]))
    } else {
        // If no data, we can't easily see columns with select * on empty table without casting or metadata query
        // But we can try to insert a dummy partial row to trigger a specific column error or just assume.
        // Better: Query information_schema if possible (might not have permissions) or keep checking specific columns.
        console.log("Table is empty, cannot verify columns via select *. Checking specific columns...")
        const colsToCheck = ["is_anonymous", "risk_level", "anonymous_id", "status", "violence_type", "description", "incident_date"]
        for (const col of colsToCheck) {
            const { error: colError } = await supabase.from("reports").select(col).limit(1)
            if (colError) console.log(`Missing column: ${col}`)
            else console.log(`Exists: ${col}`)
        }
    }
}

testColumn()
