import { Metadata } from 'next'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = {
    title: 'Đăng nhập | BookMe',
    description: 'Đăng nhập vào tài khoản BookMe của bạn',
}

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Chào mừng trở lại
                </h1>
                <p className="text-muted-foreground">
                    Đăng nhập để tiếp tục sử dụng dịch vụ
                </p>
            </div>
            <LoginForm />
        </div>
    )
}
