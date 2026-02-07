'use client'

import { useState } from 'react'
import { Plus, Search, User, Phone, Mail, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

// Mock data
const mockStaff = [
    {
        id: 1,
        fullName: 'Nguyễn Văn A',
        email: 'nva@example.com',
        phone: '0901234567',
        position: 'Thợ cắt tóc chính',
        avatarUrl: null,
        isActive: true,
        servicesCount: 5,
        bookingsThisMonth: 42,
    },
    {
        id: 2,
        fullName: 'Trần Thị B',
        email: 'ttb@example.com',
        phone: '0912345678',
        position: 'Thợ nhuộm tóc',
        avatarUrl: null,
        isActive: true,
        servicesCount: 3,
        bookingsThisMonth: 28,
    },
    {
        id: 3,
        fullName: 'Lê Văn C',
        email: 'lvc@example.com',
        phone: '0923456789',
        position: 'Thợ uốn tóc',
        avatarUrl: null,
        isActive: true,
        servicesCount: 4,
        bookingsThisMonth: 35,
    },
    {
        id: 4,
        fullName: 'Phạm Thị D',
        email: 'ptd@example.com',
        phone: '0934567890',
        position: 'Nhân viên gội đầu',
        avatarUrl: null,
        isActive: false,
        servicesCount: 2,
        bookingsThisMonth: 0,
    },
]

export default function ProviderStaffPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredStaff = mockStaff.filter((staff) =>
        staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản lý nhân viên</h1>
                    <p className="text-muted-foreground mt-1">
                        Thêm và quản lý nhân viên của bạn
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm nhân viên
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Staff grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStaff.map((staff) => (
                    <Card key={staff.id} className={staff.isActive ? '' : 'opacity-60'}>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={staff.avatarUrl || undefined} alt={staff.fullName} />
                                        <AvatarFallback className="text-xl">
                                            {getInitials(staff.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {!staff.isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                                            Nghỉ việc
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-semibold">{staff.fullName}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {staff.position}
                                    </p>
                                </div>

                                <div className="space-y-2 w-full text-sm text-muted-foreground">
                                    <div className="flex items-center justify-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {staff.phone}
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {staff.email}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{staff.servicesCount}</p>
                                        <p className="text-xs text-muted-foreground">Dịch vụ</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{staff.bookingsThisMonth}</p>
                                        <p className="text-xs text-muted-foreground">Đặt lịch tháng</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2 w-full">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Sửa
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredStaff.length === 0 && (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center">
                            <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium">Không tìm thấy nhân viên nào</p>
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
