// ============================================
// DOMAIN MODELS - Match with Go backend DTOs
// ============================================

export interface User {
  id: number
  email: string
  phone?: string
  fullName: string
  avatarUrl?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  userType: 'customer' | 'provider' | 'admin'
  status: 'active' | 'inactive' | 'banned'
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface UserAddress {
  id: number
  userId: number
  addressType: 'home' | 'work' | 'other'
  addressLine1: string
  addressLine2?: string
  city: string
  district?: string
  ward?: string
  postalCode?: string
  country: string
  latitude?: number
  longitude?: number
  isDefault: boolean
}

export interface Category {
  id: number
  parentId?: number
  name: string
  slug: string
  description?: string
  iconUrl?: string
  imageUrl?: string
  displayOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  children?: Category[]
}

export interface Provider {
  id: number
  userId: number
  businessName: string
  businessLicense?: string
  taxCode?: string
  description?: string
  logoUrl?: string
  coverImageUrl?: string
  addressLine1: string
  addressLine2?: string
  city: string
  district?: string
  ward?: string
  latitude?: number
  longitude?: number
  phone: string
  email: string
  website?: string
  ratingAverage: number
  totalReviews: number
  totalBookings: number
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  isFeatured: boolean
  verifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: number
  providerId: number
  categoryId: number
  name: string
  slug: string
  description?: string
  shortDescription?: string
  price: number
  discountPrice?: number
  durationMinutes: number
  capacity: number
  imageUrl?: string
  isActive: boolean
  bookingAdvanceHours: number
  cancellationHours: number
  createdAt: string
  updatedAt: string
  provider?: Provider
  category?: Category
  images?: ServiceImage[]
}

export interface ServiceImage {
  id: number
  serviceId: number
  imageUrl: string
  displayOrder: number
  isPrimary: boolean
}

export interface Staff {
  id: number
  providerId: number
  userId?: number
  fullName: string
  email?: string
  phone?: string
  avatarUrl?: string
  position?: string
  bio?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface WorkingHours {
  id: number
  providerId?: number
  staffId?: number
  dayOfWeek: number // 0=Sunday, 1=Monday, ..., 6=Saturday
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface TimeOff {
  id: number
  providerId?: number
  staffId?: number
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  reason?: string
}

export interface Booking {
  id: number
  bookingCode: string
  userId: number
  providerId: number
  serviceId: number
  staffId?: number
  bookingDate: string
  startTime: string
  endTime: string
  durationMinutes: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  totalPrice: number
  discountAmount: number
  finalPrice: number
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'partially_refunded'
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerNote?: string
  cancellationReason?: string
  cancelledBy?: 'customer' | 'provider' | 'system'
  cancelledAt?: string
  confirmedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  service?: Service
  provider?: Provider
  staff?: Staff
}

export interface Payment {
  id: number
  bookingId: number
  transactionId?: string
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'e_wallet' | 'vnpay' | 'momo' | 'zalopay'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentGatewayResponse?: string
  paidAt?: string
  refundedAt?: string
  refundAmount?: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: number
  bookingId: number
  userId: number
  providerId: number
  serviceId: number
  staffId?: number
  rating: number // 1-5
  comment?: string
  images?: string[]
  providerResponse?: string
  respondedAt?: string
  isVerified: boolean
  isVisible: boolean
  createdAt: string
  updatedAt: string
  user?: User
  service?: Service
}

export interface Promotion {
  id: number
  providerId?: number
  code: string
  name: string
  description?: string
  discountType: 'percentage' | 'fixed_amount'
  discountValue: number
  minBookingAmount: number
  maxDiscountAmount?: number
  usageLimit?: number
  usageCount: number
  userUsageLimit: number
  startDate: string
  endDate: string
  isActive: boolean
  applicableServices?: number[]
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: number
  userId: number
  type: 'booking' | 'payment' | 'review' | 'promotion' | 'system'
  title: string
  message: string
  data?: Record<string, unknown>
  isRead: boolean
  readAt?: string
  createdAt: string
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  phone?: string
}

export interface BookingCreateRequest {
  serviceId: number
  staffId?: number
  bookingDate: string
  startTime: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerNote?: string
  promotionCode?: string
}

export interface SearchServicesParams {
  query?: string
  categoryId?: number
  city?: string
  district?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  page?: number
  limit?: number
  sortBy?: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'distance'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============================================
// UTILITY TYPES
// ============================================

export type ApiError = {
  message: string
  code?: string
  details?: Record<string, string[]>
}

export type BookingStatus = Booking['status']
export type PaymentStatus = Payment['status']
export type UserType = User['userType']
