import { Metadata } from 'next'
import { RegisterForm } from '@/features/auth/components/register-form'

export const metadata: Metadata = {
    title: 'Đăng ký | BookMe',
    description: 'Tạo tài khoản BookMe mới',
}

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Tạo tài khoản
                </h1>
                <p className="text-muted-foreground">
                    Đăng ký để bắt đầu đặt lịch dễ dàng
                </p>
            </div>
            <RegisterForm />
        </div>
    )
}
