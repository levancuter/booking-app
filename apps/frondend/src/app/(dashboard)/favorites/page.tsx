'use client'

import Link from 'next/link'
import { Heart, Star, MapPin, Clock, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

// Mock data - replace with actual API calls
const mockFavorites = [
    {
        id: 1,
        name: 'Salon Đẹp - Cắt tóc nam cao cấp',
        slug: 'salon-dep-cat-toc-nam-cao-cap',
        provider: 'Salon Đẹp',
        address: '123 Nguyễn Huệ, Q.1, TP.HCM',
        price: 150000,
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
        address: '456 Lê Lợi, Q.1, TP.HCM',
        price: 550000,
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
        address: '789 Hai Bà Trưng, Q.3, TP.HCM',
        price: 450000,
        rating: 4.7,
        totalReviews: 89,
        duration: 60,
        imageUrl: null,
    },
]

export default function FavoritesPage() {
    const handleRemoveFavorite = (id: number) => {
        // TODO: Implement remove favorite API call
        console.log('Remove favorite:', id)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Yêu thích</h1>
                <p className="text-muted-foreground mt-1">
                    Các dịch vụ bạn đã lưu để đặt lịch sau
                </p>
            </div>

            {/* Favorites grid */}
            {mockFavorites.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mockFavorites.map((service) => (
                        <Card key={service.id} className="overflow-hidden group">
                            {/* Image */}
                            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="h-12 w-12 text-primary/30" />
                                </div>
                                <button
                                    onClick={() => handleRemoveFavorite(service.id)}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </button>
                            </div>

                            {/* Content */}
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="font-semibold hover:text-primary transition-colors line-clamp-1"
                                        >
                                            {service.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">
                                            {service.provider}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{service.rating}</span>
                                        <span className="text-muted-foreground">
                                            ({service.totalReviews} đánh giá)
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {service.address.split(',')[0]}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {service.duration} phút
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="font-semibold text-lg text-primary">
                                            {formatCurrency(service.price)}
                                        </p>
                                        <Button size="sm" asChild>
                                            <Link href={`/services/${service.slug}`}>
                                                Đặt ngay
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center">
                            <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium">
                                Chưa có dịch vụ yêu thích
                            </p>
                            <p className="text-muted-foreground">
                                Lưu các dịch vụ bạn quan tâm để dễ dàng tìm lại sau
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href="/search">Khám phá dịch vụ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
