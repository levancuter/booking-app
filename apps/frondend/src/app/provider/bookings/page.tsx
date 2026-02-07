'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Search, Filter, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate, formatCurrency, getBookingStatusLabel } from '@/lib/utils'

// Mock data
const mockBookings = [
    {
        id: 1,
        bookingCode: 'BK001',
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        serviceName: 'Cắt tóc nam',
        staffName: 'Nhân viên 1',
        date: new Date().toISOString(),
        time: '14:00',
        duration: 45,
        price: 150000,
        status: 'pending',
    },
    {
        id: 2,
        bookingCode: 'BK002',
        customerName: 'Trần Thị B',
        customerPhone: '0912345678',
        serviceName: 'Nhuộm tóc',
        staffName: 'Nhân viên 2',
        date: new Date().toISOString(),
        time: '15:30',
        duration: 120,
        price: 500000,
        status: 'confirmed',
    },
    {
        id: 3,
        bookingCode: 'BK003',
        customerName: 'Lê Văn C',
        customerPhone: '0923456789',
        serviceName: 'Uốn tóc',
        staffName: 'Nhân viên 1',
        date: new Date(Date.now() + 86400000).toISOString(),
        time: '10:00',
        duration: 90,
        price: 400000,
        status: 'confirmed',
    },
    {
        id: 4,
        bookingCode: 'BK004',
        customerName: 'Phạm Văn D',
        customerPhone: '0934567890',
        serviceName: 'Cắt tóc nam',
        staffName: 'Nhân viên 3',
        date: new Date(Date.now() - 86400000).toISOString(),
        time: '09:00',
        duration: 45,
        price: 150000,
        status: 'completed',
    },
]

const statusTabs = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'in_progress', label: 'Đang thực hiện' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
]

export default function ProviderBookingsPage() {
    const [activeTab, setActiveTab] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBookings = mockBookings.filter((booking) => {
        const matchesStatus = activeTab === 'all' || booking.status === activeTab
        const matchesSearch =
            booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.customerPhone.includes(searchQuery)
        return matchesStatus && matchesSearch
    })

    const handleConfirmBooking = (id: number) => {
        console.log('Confirm booking:', id)
    }

    const handleCancelBooking = (id: number) => {
        console.log('Cancel booking:', id)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Quản lý đặt lịch</h1>
                <p className="text-muted-foreground mt-1">
                    Xem và quản lý tất cả các lịch đặt của khách hàng
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Tìm theo tên, SĐT, mã đặt lịch..."
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

            {/* Bookings table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách đặt lịch ({filteredBookings.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="pb-3 font-medium">Mã</th>
                                    <th className="pb-3 font-medium">Khách hàng</th>
                                    <th className="pb-3 font-medium">Dịch vụ</th>
                                    <th className="pb-3 font-medium">Thời gian</th>
                                    <th className="pb-3 font-medium">Giá</th>
                                    <th className="pb-3 font-medium">Trạng thái</th>
                                    <th className="pb-3 font-medium">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b last:border-0">
                                        <td className="py-4">
                                            <span className="font-mono text-sm">
                                                {booking.bookingCode}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div>
                                                <p className="font-medium">{booking.customerName}</p>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Phone className="h-3 w-3" />
                                                    {booking.customerPhone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div>
                                                <p className="font-medium">{booking.serviceName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.staffName} • {booking.duration} phút
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm">
                                                <p className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(booking.date)}
                                                </p>
                                                <p className="flex items-center gap-1 text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    {booking.time}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className="font-medium">
                                                {formatCurrency(booking.price)}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${booking.status === 'confirmed'
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
                                        </td>
                                        <td className="py-4">
                                            {booking.status === 'pending' ? (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleConfirmBooking(booking.id)}
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredBookings.length === 0 && (
                            <div className="text-center py-8">
                                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-4 text-muted-foreground">
                                    Không tìm thấy đặt lịch nào
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
