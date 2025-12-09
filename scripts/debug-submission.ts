import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)

const supabase = createClient(supabaseUrl, supabaseKey)

async function debug() {
    console.log("Debug: Attempting INSERT ONLY...")
    const data1 = {
        violence_type: "financial",
        description: "Debug Insert Only",
        is_anonymous: true,
        risk_level: "low",
        anonymous_id: "DBG-1"
    }
    const { error: err1 } = await supabase.from("reports").insert(data1)
    if (err1) {
        console.error("INSERT ONLY Failed:", JSON.stringify(err1, null, 2))
    } else {
        console.log("INSERT ONLY Succeeded!")
    }

    console.log("Debug: Attempting INSERT with Manual ID (No Select)...")
    const manualId = "123e4567-e89b-12d3-a456-426614174000" // Example UUID
    const data3 = {
        id: manualId,
        violence_type: "financial",
        description: "Debug Manual ID",
        is_anonymous: true,
        risk_level: "low",
        anonymous_id: "DBG-3"
    }
    const { error: err3 } = await supabase.from("reports").insert(data3)
    if (err3) {
        console.error("INSERT Manual ID Failed:", JSON.stringify(err3, null, 2))
    } else {
        console.log("INSERT Manual ID Succeeded!")
        console.log("Manual ID used:", manualId)
    }
}

debug()
