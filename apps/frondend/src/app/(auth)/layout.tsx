import Link from 'next/link'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 text-white flex-col justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xl">
                            B
                        </div>
                        <span className="text-2xl font-bold">BookMe</span>
                    </Link>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold leading-tight">
                        Đặt lịch thông minh,<br />
                        trải nghiệm hoàn hảo
                    </h1>
                    <p className="text-lg text-white/80">
                        Kết nối với hàng nghìn dịch vụ chất lượng cao.
                        Đặt lịch chỉ trong 30 giây, thanh toán an toàn, hoàn tiền dễ dàng.
                    </p>
                    <div className="flex gap-8">
                        <div>
                            <div className="text-3xl font-bold">12K+</div>
                            <div className="text-white/70">Dịch vụ</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-white/70">Khách hàng</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">4.9★</div>
                            <div className="text-white/70">Đánh giá</div>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-white/60">
                    © 2024 BookMe. All rights reserved.
                </p>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl text-white">
                                B
                            </div>
                            <span className="text-2xl font-bold">BookMe</span>
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}
