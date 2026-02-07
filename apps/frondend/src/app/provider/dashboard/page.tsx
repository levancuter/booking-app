'use client'

import Link from 'next/link'
import {
    Calendar,
    DollarSign,
    Users,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth.store'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data - replace with actual API calls
const mockStats = {
    totalBookings: 145,
    todayBookings: 8,
    completedToday: 5,
    pendingApproval: 3,
    totalRevenue: 15500000,
    monthlyRevenue: 4500000,
}

const mockRecentBookings = [
    {
        id: 1,
        customerName: 'Nguyễn Văn A',
        serviceName: 'Cắt tóc nam',
        date: new Date().toISOString(),
        time: '14:00',
        status: 'confirmed',
    },
    {
        id: 2,
        customerName: 'Trần Thị B',
        serviceName: 'Nhuộm tóc',
        date: new Date().toISOString(),
        time: '15:30',
        status: 'pending',
    },
    {
        id: 3,
        customerName: 'Lê Văn C',
        serviceName: 'Uốn tóc',
        date: new Date().toISOString(),
        time: '16:00',
        status: 'confirmed',
    },
]

export default function ProviderDashboardPage() {
    const { user } = useAuthStore()

    return (
        <div className="space-y-8">
            {/* Welcome section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Chào mừng trở lại! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                    Đây là tổng quan hoạt động kinh doanh của bạn hôm nay.
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
                            +12% so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Hôm nay
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.todayBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            {mockStats.completedToday} hoàn thành, {mockStats.pendingApproval} chờ xác nhận
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Doanh thu tháng
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(mockStats.monthlyRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +8% so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng doanh thu
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(mockStats.totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Kể từ khi bắt đầu
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent bookings */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Lịch hẹn hôm nay</CardTitle>
                        <CardDescription>
                            Quản lý các cuộc hẹn của bạn
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/provider/bookings">
                            Xem tất cả
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockRecentBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{booking.customerName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.serviceName} - {booking.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {booking.status === 'pending' ? (
                                        <>
                                            <Button size="sm" variant="outline">
                                                <XCircle className="mr-1 h-4 w-4" />
                                                Từ chối
                                            </Button>
                                            <Button size="sm">
                                                <CheckCircle className="mr-1 h-4 w-4" />
                                                Xác nhận
                                            </Button>
                                        </>
                                    ) : (
                                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            Đã xác nhận
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/provider/services">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Quản lý dịch vụ</p>
                                    <p className="text-sm text-muted-foreground">
                                        Thêm, sửa, xóa dịch vụ
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/provider/staff">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Quản lý nhân viên</p>
                                    <p className="text-sm text-muted-foreground">
                                        Thêm, quản lý nhân viên
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/provider/bookings">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Xem báo cáo</p>
                                    <p className="text-sm text-muted-foreground">
                                        Thống kê doanh thu
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
