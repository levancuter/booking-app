'use client'

import { Sidebar } from '@/components/layouts/sidebar'
import { DashboardHeader } from '@/components/layouts/dashboard-header'

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden lg:block">
                <Sidebar variant="provider" />
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
