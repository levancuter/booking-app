'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Star, Clock, ChevronDown, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

// Mock data
const mockCategories = [
    { id: 1, name: 'Tất cả', slug: 'all' },
    { id: 2, name: 'Salon tóc', slug: 'salon-toc' },
    { id: 3, name: 'Spa', slug: 'spa' },
    { id: 4, name: 'Nails', slug: 'nails' },
    { id: 5, name: 'Gym', slug: 'gym' },
    { id: 6, name: 'Yoga', slug: 'yoga' },
]

const mockServices = [
    {
        id: 1,
        name: 'Cắt tóc nam cao cấp',
        slug: 'cat-toc-nam-cao-cap',
        provider: 'Salon Đẹp',
        address: 'Quận 1, TP.HCM',
        price: 150000,
        discountPrice: null,
        rating: 4.8,
        totalReviews: 256,
        duration: 45,
        imageUrl: null,
    },
    {
        id: 2,
        name: 'Massage thư giãn toàn thân 90 phút',
        slug: 'massage-thu-gian-toan-than-90-phut',
        provider: 'Spa Hoàng Gia',
        address: 'Quận 7, TP.HCM',
        price: 550000,
        discountPrice: 450000,
        rating: 4.9,
        totalReviews: 128,
        duration: 90,
        imageUrl: null,
    },
    {
        id: 3,
        name: 'Chăm sóc da mặt chuyên sâu',
        slug: 'cham-soc-da-mat-chuyen-sau',
        provider: 'Beauty Center',
        address: 'Quận 3, TP.HCM',
        price: 450000,
        discountPrice: 380000,
        rating: 4.7,
        totalReviews: 89,
        duration: 60,
        imageUrl: null,
    },
    {
        id: 4,
        name: 'Nhuộm tóc Hàn Quốc',
        slug: 'nhuom-toc-han-quoc',
        provider: 'Hair Studio',
        address: 'Quận Bình Thạnh, TP.HCM',
        price: 500000,
        discountPrice: null,
        rating: 4.6,
        totalReviews: 67,
        duration: 120,
        imageUrl: null,
    },
    {
        id: 5,
        name: 'Nail art - Sơn gel cao cấp',
        slug: 'nail-art-son-gel-cao-cap',
        provider: 'Nails Studio',
        address: 'Quận 10, TP.HCM',
        price: 250000,
        discountPrice: 200000,
        rating: 4.8,
        totalReviews: 145,
        duration: 60,
        imageUrl: null,
    },
    {
        id: 6,
        name: 'Yoga cơ bản cho người mới',
        slug: 'yoga-co-ban-cho-nguoi-moi',
        provider: 'Yoga Life',
        address: 'Quận 2, TP.HCM',
        price: 200000,
        discountPrice: null,
        rating: 4.9,
        totalReviews: 78,
        duration: 60,
        imageUrl: null,
    },
]

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showFilters, setShowFilters] = useState(false)

    const filteredServices = mockServices.filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Header with search */}
            <div className="bg-gradient-to-b from-primary/5 to-background border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h1 className="text-3xl font-bold text-center">
                            Tìm kiếm dịch vụ
                        </h1>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Tìm kiếm dịch vụ, salon, spa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 text-base"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {mockCategories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.slug ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.slug)}
                                    className="whitespace-nowrap"
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters sidebar - desktop */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <Card>
                            <CardContent className="p-4 space-y-6">
                                <div>
                                    <h3 className="font-medium mb-3">Khoảng giá</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input placeholder="Từ" type="number" />
                                        <Input placeholder="Đến" type="number" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Đánh giá</h3>
                                    <div className="space-y-2">
                                        {[4, 3, 2].map((rating) => (
                                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="rounded" />
                                                <span className="flex items-center gap-1">
                                                    {rating}+ <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Khu vực</h3>
                                    <div className="space-y-2">
                                        {['Quận 1', 'Quận 3', 'Quận 7', 'Bình Thạnh'].map((district) => (
                                            <label key={district} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="rounded" />
                                                <span>{district}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Results */}
                    <div className="flex-1">
                        {/* Results header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                Tìm thấy <span className="font-medium text-foreground">{filteredServices.length}</span> dịch vụ
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="lg:hidden"
                                    onClick={() => setShowFilters(true)}
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Bộ lọc
                                </Button>
                                <Button variant="outline" size="sm">
                                    Sắp xếp
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Services grid */}
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredServices.map((service) => (
                                <Card key={service.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                                    <Link href={`/services/${service.slug}`}>
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20">
                                            {service.discountPrice && (
                                                <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                                                    -{Math.round(((service.price - service.discountPrice) / service.price) * 100)}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <CardContent className="p-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {service.provider}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-medium">{service.rating}</span>
                                                        <span className="text-muted-foreground">
                                                            ({service.totalReviews})
                                                        </span>
                                                    </span>
                                                    <span className="flex items-center gap-1 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        {service.duration} phút
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <MapPin className="h-4 w-4" />
                                                    {service.address}
                                                </div>

                                                <div className="flex items-center justify-between pt-2">
                                                    {service.discountPrice ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-lg text-primary">
                                                                {formatCurrency(service.discountPrice)}
                                                            </span>
                                                            <span className="text-sm text-muted-foreground line-through">
                                                                {formatCurrency(service.price)}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="font-semibold text-lg text-primary">
                                                            {formatCurrency(service.price)}
                                                        </span>
                                                    )}
                                                    <Button size="sm">Đặt ngay</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>

                        {filteredServices.length === 0 && (
                            <Card>
                                <CardContent className="py-12">
                                    <div className="text-center">
                                        <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                        <p className="mt-4 text-lg font-medium">
                                            Không tìm thấy dịch vụ nào
                                        </p>
                                        <p className="text-muted-foreground">
                                            Thử tìm kiếm với từ khóa khác
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
