'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    Calendar,
    Heart,
    User,
    Settings,
    LogOut,
    LayoutDashboard,
    Briefcase,
    Users,
    Store,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/use-auth'
import { useAuthStore } from '@/stores/auth.store'

interface SidebarProps {
    variant?: 'user' | 'provider'
}

const userNavItems = [
    { href: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { href: '/bookings', label: 'Lịch đặt', icon: Calendar },
    { href: '/favorites', label: 'Yêu thích', icon: Heart },
    { href: '/profile', label: 'Hồ sơ', icon: User },
]

const providerNavItems = [
    { href: '/provider/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { href: '/provider/bookings', label: 'Quản lý đặt lịch', icon: Calendar },
    { href: '/provider/services', label: 'Dịch vụ', icon: Briefcase },
    { href: '/provider/staff', label: 'Nhân viên', icon: Users },
]

export function Sidebar({ variant = 'user' }: SidebarProps) {
    const pathname = usePathname()
    const { user } = useAuthStore()
    const { mutate: logout } = useLogout()

    const navItems = variant === 'provider' ? providerNavItems : userNavItems

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-card">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">
                        B
                    </div>
                    <span className="text-xl font-bold">BookMe</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User section */}
            <div className="border-t p-4">
                {variant === 'user' && (
                    <Link
                        href="/provider/register"
                        className="mb-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-3 text-sm hover:from-primary/20 hover:to-accent/20 transition-colors"
                    >
                        <Store className="h-5 w-5 text-primary" />
                        <div>
                            <div className="font-medium">Trở thành đối tác</div>
                            <div className="text-xs text-muted-foreground">
                                Đăng ký ngay
                            </div>
                        </div>
                    </Link>
                )}

                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                            {user?.fullName || 'Người dùng'}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                            {user?.email || 'email@example.com'}
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive"
                    onClick={() => logout()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                </Button>
            </div>
        </aside>
    )
}
