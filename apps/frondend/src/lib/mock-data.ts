import { User } from '@/types'

// Test accounts for UI testing
export const TEST_ACCOUNTS = {
    user: {
        email: 'user@test.com',
        password: 'password123',
        userData: {
            id: 1,
            email: 'user@test.com',
            fullName: 'Nguyễn Văn Test',
            phone: '0901234567',
            avatarUrl: undefined,
            userType: 'customer',
            status: 'active',
            emailVerified: true,
            phoneVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as User,
    },
    provider: {
        email: 'provider@test.com',
        password: 'password123',
        userData: {
            id: 2,
            email: 'provider@test.com',
            fullName: 'Salon Đẹp Admin',
            phone: '0912345678',
            avatarUrl: undefined,
            userType: 'provider',
            status: 'active',
            emailVerified: true,
            phoneVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as User,
    },
    admin: {
        email: 'admin@test.com',
        password: 'password123',
        userData: {
            id: 3,
            email: 'admin@test.com',
            fullName: 'Admin BookMe',
            phone: '0923456789',
            avatarUrl: undefined,
            userType: 'admin',
            status: 'active',
            emailVerified: true,
            phoneVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as User,
    },
}

// Mock authentication function for development
export function mockLogin(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const accounts = Object.values(TEST_ACCOUNTS)
    const account = accounts.find(
        (acc) => acc.email === email && acc.password === password
    )

    if (account) {
        return { success: true, user: account.userData }
    }

    return { success: false, error: 'Email hoặc mật khẩu không đúng' }
}

// Check if we're in development mode
export const isDevelopment = process.env.NODE_ENV === 'development'
