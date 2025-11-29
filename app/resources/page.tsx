"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, Search, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ResourcesPage() {
    const resources = [
        {
            id: 1,
            name: "Nairobi Women's Hospital - GVRC",
            type: "Medical & Counseling",
            address: "Argwings Kodhek Rd, Nairobi",
            phone: "+254 721 632 962",
            website: "https://nwh.co.ke",
            description: "Comprehensive medical and psychological support for survivors of gender-based violence.",
            tags: ["24/7", "Medical", "Counseling"],
        },
        {
            id: 2,
            name: "FIDA Kenya",
            type: "Legal Aid",
            address: "Amboseli Road, Off Gitanga Road, Nairobi",
            phone: "+254 800 720 501",
            website: "https://fidakenya.org",
            description: "Free legal representation and advice for women and children.",
            tags: ["Legal", "Free", "Women's Rights"],
        },
        {
            id: 3,
            name: "Usikimye",
            type: "Shelter & Rescue",
            address: "Nairobi (Confidential Location)",
            phone: "+254 800 000 000",
            website: "https://usikimye.org",
            description: "Emergency rescue and safe housing for victims of domestic violence.",
            tags: ["Shelter", "Emergency", "Rescue"],
        },
        {
            id: 4,
            name: "LVCT Health",
            type: "Counseling & Testing",
            address: "Argwings Kodhek Rd, Nairobi",
            phone: "1190",
            website: "https://lvcthealth.org",
            description: "HIV testing, counseling, and post-violence care.",
            tags: ["Health", "Counseling", "Youth Friendly"],
        },
        {
            id: 5,
            name: "CREAW Kenya",
            type: "Legal & Advocacy",
            address: "Ring Road Kilimani, Nairobi",
            phone: "0800 720 186",
            website: "https://creawkenya.org",
            description: "Legal support, advocacy, and economic empowerment for women.",
            tags: ["Advocacy", "Legal", "Empowerment"],
        },
    ]

    const [searchQuery, setSearchQuery] = useState("")

    const filteredResources = resources.filter((resource) => {
        const query = searchQuery.toLowerCase()
        return (
            resource.name.toLowerCase().includes(query) ||
            resource.type.toLowerCase().includes(query) ||
            resource.address.toLowerCase().includes(query) ||
            resource.tags.some((tag) => tag.toLowerCase().includes(query))
        )
    })

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-muted/30">
                <div className="container">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">Support Resources</h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Find verified medical, legal, and psychosocial support services near you. All listed organizations are
                                partners committed to your safety and privacy.
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, location, or service type..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" onClick={async () => {
                                const { getUserLocation } = await import("@/lib/location")
                                const location = await getUserLocation()
                                if (location) {
                                    setSearchQuery(location.city)
                                }
                            }}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Use my location
                            </Button>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        {/* Resources List */}
                        <div className="grid gap-6">
                            {filteredResources.length > 0 ? (
                                filteredResources.map((resource) => (
                                    <Card key={resource.id} className="overflow-hidden">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex-1 p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold">{resource.name}</h3>
                                                        <p className="text-sm text-primary font-medium mb-2">{resource.type}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="hidden md:flex">
                                                        <MapPin className="mr-2 h-4 w-4" />
                                                        Directions
                                                    </Button>
                                                </div>

                                                <p className="text-muted-foreground mb-4">{resource.description}</p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {resource.tags.map((tag) => (
                                                        <Badge key={tag} variant="secondary">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-2 h-4 w-4" />
                                                        {resource.address}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone className="mr-2 h-4 w-4" />
                                                        {resource.phone}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Globe className="mr-2 h-4 w-4" />
                                                        {resource.website}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-muted/50 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l md:w-48">
                                                <Button className="w-full">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Call Now
                                                </Button>
                                                <Button variant="outline" className="w-full md:hidden">
                                                    <MapPin className="mr-2 h-4 w-4" />
                                                    Directions
                                                </Button>
                                                <Button variant="secondary" className="w-full">
                                                    Visit Website
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <p>No resources found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
