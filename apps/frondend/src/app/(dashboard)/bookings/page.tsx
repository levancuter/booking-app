'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate, formatCurrency, getBookingStatusLabel, getBookingStatusColor } from '@/lib/utils'

// Mock data - replace with actual API calls
const mockBookings = [
    {
        id: 1,
        bookingCode: 'BK123456',
        serviceName: 'Cắt tóc nam',
        providerName: 'Salon Đẹp',
        providerAddress: '123 Nguyễn Huệ, Q.1, TP.HCM',
        date: new Date(Date.now() + 86400000).toISOString(),
        time: '14:00',
        price: 150000,
        status: 'confirmed',
    },
    {
        id: 2,
        bookingCode: 'BK123457',
        serviceName: 'Massage thư giãn 60 phút',
        providerName: 'Spa Hoàng Gia',
        providerAddress: '456 Lê Lợi, Q.1, TP.HCM',
        date: new Date(Date.now() + 172800000).toISOString(),
        time: '10:00',
        price: 350000,
        status: 'pending',
    },
    {
        id: 3,
        bookingCode: 'BK123458',
        serviceName: 'Nails - Sơn gel',
        providerName: 'Nails Studio',
        providerAddress: '789 Hai Bà Trưng, Q.3, TP.HCM',
        date: new Date(Date.now() - 86400000).toISOString(),
        time: '16:00',
        price: 200000,
        status: 'completed',
    },
    {
        id: 4,
        bookingCode: 'BK123459',
        serviceName: 'Chăm sóc da mặt',
        providerName: 'Beauty Center',
        providerAddress: '321 Võ Văn Tần, Q.3, TP.HCM',
        date: new Date(Date.now() - 172800000).toISOString(),
        time: '09:00',
        price: 450000,
        status: 'cancelled',
    },
]

const statusTabs = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
]

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBookings = mockBookings.filter((booking) => {
        const matchesStatus = activeTab === 'all' || booking.status === activeTab
        const matchesSearch =
            booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Lịch đặt của bạn</h1>
                <p className="text-muted-foreground mt-1">
                    Xem và quản lý tất cả các lịch đặt
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Tìm theo mã, dịch vụ, cửa hàng..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Bộ lọc
                </Button>
            </div>

            {/* Status tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {statusTabs.map((tab) => (
                    <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Bookings list */}
            <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left - Image placeholder */}
                                    <div className="w-full md:w-48 h-32 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                        <Calendar className="h-12 w-12 text-primary/50" />
                                    </div>

                                    {/* Right - Content */}
                                    <div className="flex-1 p-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        #{booking.bookingCode}
                                                    </span>
                                                    <span
                                                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${booking.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-700'
                                                                : booking.status === 'pending'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : booking.status === 'completed'
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'bg-red-100 text-red-700'
                                                            }`}
                                                    >
                                                        {getBookingStatusLabel(booking.status)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-lg">
                                                    {booking.serviceName}
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    {booking.providerName}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(booking.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {booking.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {booking.providerAddress}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                                                <p className="font-semibold text-lg">
                                                    {formatCurrency(booking.price)}
                                                </p>
                                                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                                    <Button variant="outline" size="sm">
                                                        Chi tiết
                                                    </Button>
                                                )}
                                                {booking.status === 'completed' && (
                                                    <Button variant="outline" size="sm">
                                                        Đặt lại
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="py-12">
                            <div className="text-center">
                                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-4 text-lg font-medium">
                                    Không tìm thấy lịch đặt nào
                                </p>
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? 'Thử tìm kiếm với từ khóa khác'
                                        : 'Bạn chưa có lịch đặt nào trong danh mục này'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
