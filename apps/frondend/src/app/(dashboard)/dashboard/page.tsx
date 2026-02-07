'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth.store'
import { formatDate, formatCurrency } from '@/lib/utils'

// Mock data - replace with actual API calls
const mockUpcomingBookings = [
    {
        id: 1,
        serviceName: 'Cắt tóc nam',
        providerName: 'Salon Đẹp',
        date: new Date(Date.now() + 86400000).toISOString(),
        time: '14:00',
        price: 150000,
        status: 'confirmed',
    },
    {
        id: 2,
        serviceName: 'Massage thư giãn',
        providerName: 'Spa Hoàng Gia',
        date: new Date(Date.now() + 172800000).toISOString(),
        time: '10:00',
        price: 350000,
        status: 'pending',
    },
]

const mockStats = {
    totalBookings: 12,
    completedBookings: 8,
    upcomingBookings: 2,
    totalSpent: 2500000,
}

export default function DashboardPage() {
    const { user } = useAuthStore()

    return (
        <div className="space-y-8">
            {/* Welcome section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Xin chào, {user?.fullName || 'bạn'}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                    Chào mừng bạn quay trở lại. Đây là tổng quan hoạt động của bạn.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng đặt lịch
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Đã hoàn thành
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.completedBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            {Math.round((mockStats.completedBookings / mockStats.totalBookings) * 100)}% tỷ lệ hoàn thành
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sắp tới
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.upcomingBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            Trong 7 ngày tới
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng chi tiêu
                        </CardTitle>
                        <span className="text-muted-foreground">₫</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(mockStats.totalSpent)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Trong năm nay
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming bookings */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Lịch hẹn sắp tới</CardTitle>
                        <CardDescription>
                            Quản lý các cuộc hẹn của bạn
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/bookings">
                            Xem tất cả
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {mockUpcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                            {mockUpcomingBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium">{booking.serviceName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.providerName}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(booking.date)}
                                            <Clock className="h-4 w-4 ml-2" />
                                            {booking.time}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            {formatCurrency(booking.price)}
                                        </p>
                                        <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs ${booking.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">
                                Bạn chưa có lịch hẹn nào
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href="/search">Khám phá dịch vụ</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/search">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Đặt lịch mới</p>
                                    <p className="text-sm text-muted-foreground">
                                        Tìm và đặt dịch vụ
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/bookings">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Lịch sử đặt lịch</p>
                                    <p className="text-sm text-muted-foreground">
                                        Xem tất cả đặt lịch
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/profile">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Cài đặt tài khoản</p>
                                    <p className="text-sm text-muted-foreground">
                                        Quản lý hồ sơ
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </div>
    )
}
