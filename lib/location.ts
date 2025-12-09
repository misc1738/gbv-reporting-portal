/**
 * Location utility functions.
 * Handles fetching user location based on IP address.
 */
export interface LocationData {
    city: string
    district?: string
    latitude: number
    longitude: number
}

const API_KEY = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY

/**
 * Fetches the user's location using the IPGeolocation API.
 * 
 * @returns A promise that resolves to the user's location data or null if the fetch fails.
 */
export async function getUserLocation(): Promise<LocationData | null> {
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`)
        if (!response.ok) {
            throw new Error("Failed to fetch location")
        }
        const data = await response.json()
        return {
            city: data.city,
            district: data.district,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
        }
    } catch (error) {
        console.error("Error fetching location:", error)
        return null
    }
}
