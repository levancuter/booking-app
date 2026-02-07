'use client'

import Link from 'next/link'
import { Bell, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth.store'
import { getInitials } from '@/lib/utils'

interface DashboardHeaderProps {
    onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user } = useAuthStore()

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMenuClick}
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm..."
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="flex-1 md:flex-none" />

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                </Button>

                <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
                        <AvatarFallback>
                            {user?.fullName ? getInitials(user.fullName) : 'U'}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    )
}
