"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

interface Resource {
    id: number
    name: string
    type: string
    lat?: number
    lng?: number
    phone?: string
    address: string
}

interface ResourceMapProps {
    resources: Resource[]
}

export default function ResourceMap({ resources }: ResourceMapProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />
    }

    // Filter resources that have coordinates
    const mapResources = resources.filter(r => r.lat && r.lng)

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-border/50 relative z-0">
            <MapContainer
                center={[-1.2921, 36.8219]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapResources.map((resource) => (
                    <Marker
                        key={resource.id}
                        position={[resource.lat!, resource.lng!]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-sm mb-1">{resource.name}</h3>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2 inline-block">
                                    {resource.type}
                                </span>
                                <p className="text-xs text-muted-foreground mb-1">{resource.address}</p>
                                {resource.phone && (
                                    <p className="text-xs font-medium flex items-center gap-1">
                                        📞 {resource.phone}
                                    </p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
