import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Mock data for featured services
const featuredServices = [
    {
        id: 1,
        name: "Classic Haircut",
        provider: "Barber King",
        price: 150000,
        rating: 4.8,
        reviews: 120,
        image: "/images/haircut.jpg",
        slug: "classic-haircut",
    },
    {
        id: 2,
        name: "Full Body Massage",
        provider: "Relax Spa",
        price: 450000,
        rating: 4.9,
        reviews: 85,
        image: "/images/massage.jpg",
        slug: "full-body-massage",
    },
    {
        id: 3,
        name: "Gel Manicure",
        provider: "Nail Art",
        price: 200000,
        rating: 4.7,
        reviews: 200,
        image: "/images/manicure.jpg",
        slug: "gel-manicure",
    },
    {
        id: 4,
        name: "Facial Treatment",
        provider: "Beauty Center",
        price: 350000,
        rating: 4.6,
        reviews: 90,
        image: "/images/facial.jpg",
        slug: "facial-treatment",
    },
]

interface FeaturedServicesProps {
    limit?: number
}

export function FeaturedServices({ limit }: FeaturedServicesProps = {}) {
    const displayServices = limit ? featuredServices.slice(0, limit) : featuredServices

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service) => (
                <Card key={service.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Service Image
                        </div>
                    </div>
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg line-clamp-1" title={service.name}>{service.name}</CardTitle>
                        </div>
                        <p className="text-sm text-gray-500">{service.provider}</p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                        <div className="flex items-center gap-1 text-sm mb-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{service.rating}</span>
                            <span className="text-gray-500">({service.reviews})</span>
                        </div>
                        <p className="font-bold text-primary">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Link href={`/services/${service.slug}`} className="w-full">
                            <Button className="w-full" variant="outline">Book Now</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
