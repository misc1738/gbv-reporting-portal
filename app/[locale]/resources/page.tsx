"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Globe, Search, Filter, LayoutList, Map } from "lucide-react"
import dynamic from "next/dynamic"

const ResourceMap = dynamic(() => import("@/components/resources/resource-map"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full bg-muted animate-pulse rounded-xl" />
})
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
            description: "Comprehensive medical and psychological support for survivors of gender-based violence. Services include post-rape care, trauma counseling, and forensic evidence collection.",
            tags: ["24/7", "Medical", "Counseling", "Forensic"],
            lat: -1.3005,
            lng: 36.7846
        },
        {
            id: 2,
            name: "FIDA Kenya",
            type: "Legal Aid",
            address: "Amboseli Road, Off Gitanga Road, Nairobi",
            phone: "+254 800 720 501",
            website: "https://fidakenya.org",
            description: "Free legal representation, advice, and psychosocial support for women and children. They assist with protection orders, custody cases, and criminal proceedings.",
            tags: ["Legal", "Free", "Women's Rights", "Advocacy"],
        },
        {
            id: 3,
            name: "Usikimye",
            type: "Shelter & Rescue",
            address: "Nairobi (Confidential Location)",
            phone: "+254 800 000 000",
            website: "https://usikimye.org",
            description: "Emergency rescue and safe housing for victims of domestic violence. They provide immediate shelter, food, and clothing for survivors fleeing abusive situations.",
            tags: ["Shelter", "Emergency", "Rescue", "Housing"],
        },
        {
            id: 4,
            name: "LVCT Health",
            type: "Counseling & Testing",
            address: "Argwings Kodhek Rd, Nairobi",
            phone: "1190",
            website: "https://lvcthealth.org",
            description: "Specialized HIV testing, counseling, and post-violence care. They focus on youth-friendly services and mental health support for survivors.",
            tags: ["Health", "Counseling", "Youth Friendly", "HIV Care"],
            lat: -1.2889,
            lng: 36.7916
        },
        {
            id: 5,
            name: "CREAW Kenya",
            type: "Legal & Advocacy",
            address: "Ring Road Kilimani, Nairobi",
            phone: "0800 720 186",
            website: "https://creawkenya.org",
            description: "Legal support, advocacy, and economic empowerment programs for women. They provide holistic support to help survivors rebuild their lives.",
            tags: ["Advocacy", "Legal", "Empowerment", "Economic Support"],
            lat: -1.2907,
            lng: 36.7828
        },
        {
            id: 6,
            name: "Kituo Cha Sheria",
            type: "Legal Aid",
            address: "Ole Odume Rd, Off Argwings Kodhek Rd, Nairobi",
            phone: "+254 734 874 221",
            website: "https://kituochasheria.or.ke",
            description: "Legal advice and representation for the poor and marginalized. They have a dedicated program for GBV cases and offer mobile legal aid clinics.",
            tags: ["Legal", "Pro Bono", "Human Rights", "Community"],
        },
        {
            id: 7,
            name: "Gender Violence Recovery Centre (GVRC)",
            type: "Medical & Psychosocial",
            address: "Hurlingham, Nairobi",
            phone: "+254 719 638 006",
            website: "https://gvrc.or.ke",
            description: "A charitable trust providing free medical treatment and psychosocial support to survivors of sexual and domestic violence.",
            tags: ["Medical", "Free", "Psychosocial", "Rehabilitation"],
        },
        {
            id: 8,
            name: "Childline Kenya",
            type: "Child Protection",
            address: "Westlands, Nairobi",
            phone: "116",
            website: "https://childlinekenya.co.ke",
            description: "A 24-hour helpline for children in distress. They coordinate rescue, counseling, and legal support for minors experiencing abuse.",
            tags: ["Children", "Helpline", "Rescue", "24/7"],
        },
        {
            id: 9,
            name: "Wangu Kanja Foundation",
            type: "Survivor Support",
            address: "Mukuru Kwa Njenga, Nairobi",
            phone: "+254 700 000 000",
            website: "https://wangukanjafoundation.org",
            description: "Founded by a survivor, offering mentorship, economic empowerment, and peer support groups for survivors of sexual violence.",
            tags: ["Peer Support", "Mentorship", "Community", "Empowerment"],
        },
        {
            id: 10,
            name: "Coalition on Violence Against Women (COVAW)",
            type: "Advocacy & Rights",
            address: "Dhanjay Apartments, Hendred Rd, Nairobi",
            phone: "+254 722 594 794",
            website: "https://covaw.or.ke",
            description: "Focuses on influencing policy and law to protect women's rights. They also offer legal aid and community awareness programs.",
            tags: ["Policy", "Rights", "Legal", "Awareness"],
        },
        {
            id: 11,
            name: "Médecins Sans Frontières (MSF) - Mathare",
            type: "Medical & Trauma",
            address: "Mathare, Nairobi",
            phone: "+254 700 000 000",
            website: "https://msf.or.ke",
            description: "Free medical care and psychological support for victims of sexual violence in the Mathare area. Services are confidential and available 24/7.",
            tags: ["Medical", "Free", "Trauma", "Community Based"],
        },
        {
            id: 12,
            name: "Policare - Nairobi Area",
            type: "Police & Integration",
            address: "Nairobi Area Police Station",
            phone: "999",
            website: "http://www.nationalpolice.go.ke",
            description: "A one-stop center within the police service integrating police, forensic, medical, and legal services for GBV survivors.",
            tags: ["Police", "Government", "Integrated", "Reporting"],
        },
        {
            id: 13,
            name: "Befrienders Kenya",
            type: "Mental Health",
            address: "Nairobi",
            phone: "+254 722 178 177",
            website: "https://befrienderskenya.org",
            description: "Emotional support for those in distress or at risk of suicide. They offer confidential listening services via phone.",
            tags: ["Mental Health", "Suicide Prevention", "Listening", "Support"],
        },
        {
            id: 14,
            name: "Haki Africa",
            type: "Human Rights",
            address: "Nairobi Office",
            phone: "+254 700 000 000",
            website: "https://hakiafrica.org",
            description: "A human rights organization that supports victims of violence and injustice, offering legal aid and rapid response.",
            tags: ["Human Rights", "Justice", "Rapid Response", "Legal"],
        },
        {
            id: 15,
            name: "RefuSHE",
            type: "Refugee Support",
            address: "Lavington, Nairobi",
            phone: "+254 700 000 000",
            website: "https://refushe.org",
            description: "Specialized protection, education, and empowerment for unaccompanied and separated refugee girls and young women.",
            tags: ["Refugees", "Women", "Education", "Shelter"],
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
            <main className="flex-1 py-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">Support Resources</h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Find verified medical, legal, and psychosocial support services near you. All listed organizations are
                                partners committed to your safety and privacy.
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 glass p-4 rounded-xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, location, or service type..."
                                    className="pl-9 bg-background/50 border-white/10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="hover-lift" onClick={async () => {
                                const { getUserLocation } = await import("@/lib/location")
                                const location = await getUserLocation()
                                if (location) {
                                    setSearchQuery(location.city)
                                }
                            }}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Use my location
                            </Button>
                            <Button variant="outline" className="hover-lift">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        <Tabs defaultValue="list" className="w-full">
                            <div className="flex items-center justify-between mb-6">
                                <TabsList>
                                    <TabsTrigger value="list" className="px-4">
                                        <LayoutList className="mr-2 h-4 w-4" />
                                        List View
                                    </TabsTrigger>
                                    <TabsTrigger value="map" className="px-4">
                                        <Map className="mr-2 h-4 w-4" />
                                        Map View
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="list" className="mt-0">
                                <div className="grid gap-6">
                                    {filteredResources.length > 0 ? (
                                        filteredResources.map((resource) => (
                                            <Card key={resource.id} className="overflow-hidden glass border-white/10 hover-lift transition-all duration-300">
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
                            </TabsContent>

                            <TabsContent value="map" className="mt-0">
                                <ResourceMap resources={filteredResources} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
