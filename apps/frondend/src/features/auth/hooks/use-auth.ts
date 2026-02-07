import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/auth.store'
import { mockLogin, isDevelopment } from '@/lib/mock-data'
import type { LoginRequest, RegisterRequest } from '@/types'

// Query keys
export const authKeys = {
  me: ['auth', 'me'] as const,
}

// Get current user
export const useMe = () => {
  const { setUser, setLoading } = useAuthStore()

  const query = useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const user = await authApi.me()
      setUser(user)
      return user
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    if (query.isError) {
      setUser(null)
      setLoading(false)
    }
  }, [query.isError, setUser, setLoading])

  return query
}

// Login mutation
export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      // Try mock login first in development mode
      if (isDevelopment) {
        const mockResult = mockLogin(data.email, data.password)
        if (mockResult.success && mockResult.user) {
          return {
            accessToken: 'mock-token-' + Date.now(),
            user: mockResult.user,
          }
        }
      }
      // Fall back to real API
      return authApi.login(data)
    },
    onSuccess: (data) => {
      // Store access token in cookie (for middleware) and localStorage
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      localStorage.setItem('accessToken', data.accessToken)

      // Set user in store
      setUser(data.user)

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: authKeys.me })

      // Show success message
      toast.success('Đăng nhập thành công!')

      // Get redirect URL from query params or use default based on user type
      const urlParams = new URLSearchParams(window.location.search)
      const redirectParam = urlParams.get('redirect')

      let redirectPath: string
      if (redirectParam) {
        redirectPath = decodeURIComponent(redirectParam)
      } else {
        redirectPath = data.user.userType === 'provider'
          ? '/provider/dashboard'
          : '/dashboard'
      }

      // Use setTimeout to ensure state is saved before redirect
      setTimeout(() => {
        window.location.href = redirectPath
      }, 100)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
    },
  })
}

// Register mutation
export const useRegister = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      // Store access token
      localStorage.setItem('accessToken', data.accessToken)

      // Set user in store
      setUser(data.user)

      // Show success message
      toast.success('Đăng ký thành công!')

      // Redirect to onboarding or dashboard
      router.push('/onboarding')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại')
    },
  })
}

// Logout mutation
export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear store
      logout()

      // Clear all queries
      queryClient.clear()

      // Show message
      toast.success('Đăng xuất thành công')

      // Redirect to home
      router.push('/')
    },
    onError: () => {
      // Even if API call fails, logout locally
      logout()
      queryClient.clear()
      router.push('/')
    },
  })
}

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: {
      currentPassword: string
      newPassword: string
    }) => authApi.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại')
    },
  })
}

// Request password reset
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
    onSuccess: () => {
      toast.success('Email khôi phục mật khẩu đã được gửi')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Gửi email thất bại')
    },
  })
}

// Reset password
export const useResetPassword = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ token, newPassword }: {
      token: string
      newPassword: string
    }) => authApi.resetPassword(token, newPassword),
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công')
      router.push('/login')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đặt lại mật khẩu thất bại')
    },
  })
}
