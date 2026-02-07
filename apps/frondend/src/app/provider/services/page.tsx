'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

// Mock data
const mockServices = [
    {
        id: 1,
        name: 'Cắt tóc nam',
        description: 'Cắt tóc nam theo yêu cầu, bao gồm gội đầu và tạo kiểu',
        price: 150000,
        discountPrice: null,
        duration: 45,
        category: 'Cắt tóc',
        isActive: true,
        bookings: 45,
    },
    {
        id: 2,
        name: 'Nhuộm tóc',
        description: 'Nhuộm tóc với thuốc nhuộm cao cấp, bền màu',
        price: 500000,
        discountPrice: 450000,
        duration: 120,
        category: 'Nhuộm tóc',
        isActive: true,
        bookings: 28,
    },
    {
        id: 3,
        name: 'Uốn tóc Hàn Quốc',
        description: 'Uốn tóc phong cách Hàn Quốc với công nghệ hiện đại',
        price: 400000,
        discountPrice: null,
        duration: 90,
        category: 'Uốn tóc',
        isActive: true,
        bookings: 32,
    },
    {
        id: 4,
        name: 'Gội đầu dưỡng sinh',
        description: 'Gội đầu massage thư giãn với tinh dầu thiên nhiên',
        price: 80000,
        discountPrice: null,
        duration: 30,
        category: 'Gội đầu',
        isActive: false,
        bookings: 15,
    },
]

export default function ProviderServicesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredServices = mockServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản lý dịch vụ</h1>
                    <p className="text-muted-foreground mt-1">
                        Thêm, sửa, xóa các dịch vụ của bạn
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm dịch vụ
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm dịch vụ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Services grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                    <Card key={service.id} className={service.isActive ? '' : 'opacity-60'}>
                        {/* Image placeholder */}
                        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                            {!service.isActive && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-medium">Đã tắt</span>
                                </div>
                            )}
                            {service.discountPrice && (
                                <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                                    Giảm giá
                                </span>
                            )}
                        </div>

                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold line-clamp-1">{service.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {service.category}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {service.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        {service.duration} phút
                                    </span>
                                    <span className="flex items-center gap-1 text-muted-foreground">
                                        <DollarSign className="h-4 w-4" />
                                        {service.bookings} đặt
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div>
                                        {service.discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-primary">
                                                    {formatCurrency(service.discountPrice)}
                                                </span>
                                                <span className="text-sm text-muted-foreground line-through">
                                                    {formatCurrency(service.price)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="font-semibold text-primary">
                                                {formatCurrency(service.price)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredServices.length === 0 && (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center">
                            <p className="text-lg font-medium">Không tìm thấy dịch vụ nào</p>
                            <p className="text-muted-foreground">
                                Thử tìm kiếm với từ khóa khác
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
