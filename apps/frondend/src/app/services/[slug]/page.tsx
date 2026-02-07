'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
    Star,
    Clock,
    MapPin,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Calendar,
    User,
    Phone,
    Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency, formatDate, getInitials, generateTimeSlots } from '@/lib/utils'

// Mock data - replace with API call
const mockService = {
    id: 1,
    name: 'Cắt tóc nam cao cấp',
    slug: 'cat-toc-nam-cao-cap',
    description: `Dịch vụ cắt tóc nam cao cấp với đội ngũ thợ chuyên nghiệp, được đào tạo bài bản. Bao gồm:
    
- Tư vấn kiểu tóc phù hợp với khuôn mặt
- Gội đầu massage thư giãn
- Cắt tóc theo yêu cầu
- Tạo kiểu hoàn thiện
- Xịt dưỡng tóc

Cam kết mang đến cho bạn kiểu tóc ưng ý nhất!`,
    shortDescription: 'Cắt tóc nam theo yêu cầu, bao gồm gội đầu và tạo kiểu',
    price: 150000,
    discountPrice: null,
    duration: 45,
    rating: 4.8,
    totalReviews: 256,
    provider: {
        id: 1,
        name: 'Salon Đẹp',
        address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        phone: '0901234567',
        rating: 4.9,
        totalReviews: 512,
    },
    images: [],
    staff: [
        { id: 1, name: 'Anh Minh', position: 'Thợ cắt chính', avatar: null },
        { id: 2, name: 'Anh Hùng', position: 'Thợ cắt', avatar: null },
    ],
}

const mockReviews = [
    {
        id: 1,
        user: { name: 'Nguyễn Văn A', avatar: null },
        rating: 5,
        comment: 'Rất hài lòng với dịch vụ! Thợ cắt tóc rất chuyên nghiệp và nhiệt tình.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        id: 2,
        user: { name: 'Trần Văn B', avatar: null },
        rating: 5,
        comment: 'Không gian đẹp, sạch sẽ. Giá cả hợp lý. Sẽ quay lại lần sau!',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
        id: 3,
        user: { name: 'Lê Văn C', avatar: null },
        rating: 4,
        comment: 'Dịch vụ tốt, chỉ hơi chờ đợi lâu một chút vào cuối tuần.',
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
]

export default function ServiceDetailPage() {
    const params = useParams()
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string>('')
    const [selectedStaff, setSelectedStaff] = useState<number | null>(null)
    const [isFavorite, setIsFavorite] = useState(false)

    const timeSlots = generateTimeSlots('09:00', '21:00', 30)

    // Generate next 7 days for booking
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        return date.toISOString().split('T')[0]
    })

    const handleBooking = () => {
        console.log('Booking:', { selectedDate, selectedTime, selectedStaff })
        // TODO: Implement booking flow
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground">Trang chủ</Link>
                        <span>/</span>
                        <Link href="/search" className="hover:text-foreground">Dịch vụ</Link>
                        <span>/</span>
                        <span className="text-foreground">{mockService.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Images gallery */}
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-muted-foreground">Hình ảnh dịch vụ</span>
                            </div>
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                                <Button variant="secondary" size="icon">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Service info */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">{mockService.name}</h1>
                                <Link
                                    href="#"
                                    className="text-lg text-muted-foreground hover:text-primary"
                                >
                                    {mockService.provider.name}
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-lg">{mockService.rating}</span>
                                    <span className="text-muted-foreground">
                                        ({mockService.totalReviews} đánh giá)
                                    </span>
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-5 w-5" />
                                    {mockService.duration} phút
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="h-5 w-5" />
                                    {mockService.provider.address}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                {mockService.discountPrice ? (
                                    <>
                                        <span className="text-3xl font-bold text-primary">
                                            {formatCurrency(mockService.discountPrice)}
                                        </span>
                                        <span className="text-xl text-muted-foreground line-through">
                                            {formatCurrency(mockService.price)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-primary">
                                        {formatCurrency(mockService.price)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mô tả dịch vụ</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none whitespace-pre-line">
                                    {mockService.description}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Staff */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Đội ngũ nhân viên</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {mockService.staff.map((staff) => (
                                        <div
                                            key={staff.id}
                                            className="flex items-center gap-4 p-4 rounded-lg border"
                                        >
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={staff.avatar || undefined} />
                                                <AvatarFallback>
                                                    {getInitials(staff.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{staff.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {staff.position}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Đánh giá từ khách hàng</CardTitle>
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    Xem tất cả
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {mockReviews.map((review) => (
                                    <div key={review.id} className="space-y-3">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={review.user.avatar || undefined} />
                                                <AvatarFallback>
                                                    {getInitials(review.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{review.user.name}</p>
                                                    <span className="text-sm text-muted-foreground">
                                                        {formatDate(review.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 my-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-muted'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Đặt lịch</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Date selection */}
                                    <div className="space-y-3">
                                        <Label>Chọn ngày</Label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {dates.slice(0, 4).map((date) => {
                                                const d = new Date(date)
                                                const isSelected = selectedDate === date
                                                return (
                                                    <button
                                                        key={date}
                                                        onClick={() => setSelectedDate(date)}
                                                        className={`p-2 rounded-lg border text-center transition-colors ${isSelected
                                                                ? 'bg-primary text-primary-foreground border-primary'
                                                                : 'hover:border-primary'
                                                            }`}
                                                    >
                                                        <p className="text-xs">
                                                            {d.toLocaleDateString('vi-VN', { weekday: 'short' })}
                                                        </p>
                                                        <p className="font-semibold">{d.getDate()}</p>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Time selection */}
                                    <div className="space-y-3">
                                        <Label>Chọn giờ</Label>
                                        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                                            {timeSlots.map((time) => {
                                                const isSelected = selectedTime === time
                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`p-2 rounded-lg border text-center text-sm transition-colors ${isSelected
                                                                ? 'bg-primary text-primary-foreground border-primary'
                                                                : 'hover:border-primary'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Staff selection */}
                                    <div className="space-y-3">
                                        <Label>Chọn nhân viên (không bắt buộc)</Label>
                                        <div className="space-y-2">
                                            {mockService.staff.map((staff) => {
                                                const isSelected = selectedStaff === staff.id
                                                return (
                                                    <button
                                                        key={staff.id}
                                                        onClick={() => setSelectedStaff(isSelected ? null : staff.id)}
                                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${isSelected
                                                                ? 'border-primary bg-primary/5'
                                                                : 'hover:border-primary'
                                                            }`}
                                                    >
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarFallback>
                                                                {getInitials(staff.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{staff.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {staff.position}
                                                            </p>
                                                        </div>
                                                        {isSelected && (
                                                            <Check className="h-5 w-5 text-primary" />
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Dịch vụ</span>
                                            <span>{formatCurrency(mockService.discountPrice || mockService.price)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Tổng cộng</span>
                                            <span className="text-primary">
                                                {formatCurrency(mockService.discountPrice || mockService.price)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleBooking}
                                        disabled={!selectedDate || !selectedTime}
                                    >
                                        Đặt lịch ngay
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        Miễn phí hủy trước 24 giờ
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
