import { z } from 'zod'

// ============================================
// AUTH SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số'),
  confirmPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu'),
  fullName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự'),
  phone: z
    .string()
    .regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal('')),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'Bạn phải đồng ý với điều khoản'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Mật khẩu hiện tại không được để trống'),
  newPassword: z
    .string()
    .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số'),
  confirmNewPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu mới'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmNewPassword'],
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

// ============================================
// BOOKING SCHEMAS
// ============================================

export const bookingSchema = z.object({
  serviceId: z.number().int().positive('Vui lòng chọn dịch vụ'),
  staffId: z.number().int().positive().optional(),
  bookingDate: z
    .string()
    .min(1, 'Vui lòng chọn ngày')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Ngày đặt lịch không hợp lệ'),
  startTime: z
    .string()
    .min(1, 'Vui lòng chọn giờ')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Giờ không hợp lệ'),
  customerName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự'),
  customerPhone: z
    .string()
    .regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),
  customerNote: z
    .string()
    .max(500, 'Ghi chú không được quá 500 ký tự')
    .optional(),
  promotionCode: z
    .string()
    .max(50)
    .optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>

// ============================================
// REVIEW SCHEMAS
// ============================================

export const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, 'Vui lòng chọn số sao')
    .max(5, 'Đánh giá tối đa 5 sao'),
  comment: z
    .string()
    .max(1000, 'Đánh giá không được quá 1000 ký tự')
    .optional(),
})

export type ReviewFormData = z.infer<typeof reviewSchema>

// ============================================
// SEARCH SCHEMAS
// ============================================

export const searchSchema = z.object({
  query: z.string().max(200).optional(),
  categoryId: z.number().int().positive().optional(),
  city: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  sortBy: z.enum(['popular', 'price_asc', 'price_desc', 'rating', 'distance']).optional(),
})

export type SearchFormData = z.infer<typeof searchSchema>

// ============================================
// PROFILE SCHEMAS
// ============================================

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự'),
  phone: z
    .string()
    .regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal('')),
  dateOfBirth: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 13 && age <= 120
    }, 'Tuổi phải từ 13-120'),
  gender: z.enum(['male', 'female', 'other']).optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
