'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Store, MapPin, Phone, Mail, Globe, Loader2, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const providerSchema = z.object({
    businessName: z.string().min(2, 'Tên doanh nghiệp phải có ít nhất 2 ký tự'),
    description: z.string().optional(),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
    email: z.string().email('Email không hợp lệ'),
    website: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
    addressLine1: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
    city: z.string().min(2, 'Vui lòng chọn thành phố'),
    district: z.string().optional(),
})

type ProviderFormData = z.infer<typeof providerSchema>

export default function ProviderRegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProviderFormData>({
        resolver: zodResolver(providerSchema),
    })

    const onSubmit = async (data: ProviderFormData) => {
        setIsSubmitting(true)
        // TODO: Implement provider registration API call
        console.log('Register provider:', data)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-muted/30 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại trang chủ
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Đăng ký đối tác
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Tham gia BookMe để tiếp cận hàng nghìn khách hàng tiềm năng
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin doanh nghiệp</CardTitle>
                        <CardDescription>
                            Điền đầy đủ thông tin để đăng ký trở thành đối tác
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Business name */}
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Tên doanh nghiệp *</Label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="businessName"
                                        {...register('businessName')}
                                        placeholder="VD: Salon Đẹp"
                                        className="pl-10"
                                    />
                                </div>
                                {errors.businessName && (
                                    <p className="text-sm text-destructive">{errors.businessName.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Mô tả</Label>
                                <textarea
                                    id="description"
                                    {...register('description')}
                                    placeholder="Mô tả ngắn về doanh nghiệp của bạn..."
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            {/* Contact info */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            {...register('phone')}
                                            placeholder="0901234567"
                                            className="pl-10"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register('email')}
                                            placeholder="email@example.com"
                                            className="pl-10"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="website"
                                        type="url"
                                        {...register('website')}
                                        placeholder="https://example.com"
                                        className="pl-10"
                                    />
                                </div>
                                {errors.website && (
                                    <p className="text-sm text-destructive">{errors.website.message}</p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="space-y-4">
                                <h3 className="font-medium">Địa chỉ</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="addressLine1">Địa chỉ chi tiết *</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="addressLine1"
                                            {...register('addressLine1')}
                                            placeholder="Số nhà, tên đường..."
                                            className="pl-10"
                                        />
                                    </div>
                                    {errors.addressLine1 && (
                                        <p className="text-sm text-destructive">{errors.addressLine1.message}</p>
                                    )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Thành phố *</Label>
                                        <Input
                                            id="city"
                                            {...register('city')}
                                            placeholder="VD: TP. Hồ Chí Minh"
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-destructive">{errors.city.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="district">Quận/Huyện</Label>
                                        <Input
                                            id="district"
                                            {...register('district')}
                                            placeholder="VD: Quận 1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Đăng ký đối tác
                                </Button>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    Bằng việc đăng ký, bạn đồng ý với{' '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Điều khoản dịch vụ
                                    </Link>{' '}
                                    và{' '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Chính sách bảo mật
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
