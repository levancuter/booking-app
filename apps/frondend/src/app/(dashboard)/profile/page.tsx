'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Phone, Calendar, Camera, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth.store'
import { getInitials } from '@/lib/utils'

const profileSchema = z.object({
    fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ').optional().or(z.literal('')),
    dateOfBirth: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
    const { user } = useAuthStore()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user?.fullName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            dateOfBirth: user?.dateOfBirth || '',
        },
    })

    const onSubmit = async (data: ProfileFormData) => {
        setIsSaving(true)
        // TODO: Implement update profile API call
        console.log('Update profile:', data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSaving(false)
        setIsEditing(false)
    }

    const handleCancel = () => {
        reset()
        setIsEditing(false)
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hồ sơ của bạn</h1>
                <p className="text-muted-foreground mt-1">
                    Quản lý thông tin cá nhân của bạn
                </p>
            </div>

            {/* Avatar section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
                                <AvatarFallback className="text-2xl">
                                    {user?.fullName ? getInitials(user.fullName) : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                {user?.fullName || 'Người dùng'}
                            </h3>
                            <p className="text-muted-foreground">{user?.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Thành viên từ {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Profile form */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <CardDescription>
                                Cập nhật thông tin của bạn
                            </CardDescription>
                        </div>
                        {!isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                Chỉnh sửa
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Họ và tên</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        {...register('fullName')}
                                        disabled={!isEditing}
                                        className="pl-10"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        disabled={!isEditing}
                                        className="pl-10"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        {...register('phone')}
                                        disabled={!isEditing}
                                        className="pl-10"
                                        placeholder="0901234567"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        {...register('dateOfBirth')}
                                        disabled={!isEditing}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Lưu thay đổi
                                </Button>
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    Hủy
                                </Button>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>

            {/* Change password */}
            <Card>
                <CardHeader>
                    <CardTitle>Bảo mật</CardTitle>
                    <CardDescription>
                        Quản lý mật khẩu và bảo mật tài khoản
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline">Đổi mật khẩu</Button>
                </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
                    <CardDescription>
                        Các hành động không thể hoàn tác
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Xóa tài khoản</Button>
                </CardContent>
            </Card>
        </div>
    )
}
