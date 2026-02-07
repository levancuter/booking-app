import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistance, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

// Format short currency (150K instead of 150.000₫)
export function formatShortCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`
  }
  return amount.toString()
}

// Format date
export function formatDate(
  date: string | Date,
  formatStr: string = 'dd/MM/yyyy'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: vi })
}

// Format date time
export function formatDateTime(
  date: string | Date,
  formatStr: string = 'dd/MM/yyyy HH:mm'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: vi })
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: vi,
  })
}

// Format phone number
export function formatPhoneNumber(phone: string): string {
  // Format: 0901234567 -> 090 123 4567
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
}

// Truncate text
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Get booking status color
export function getBookingStatusColor(
  status: string
): 'default' | 'success' | 'warning' | 'destructive' | 'secondary' {
  const statusMap: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
    pending: 'warning',
    confirmed: 'success',
    in_progress: 'secondary',
    completed: 'default',
    cancelled: 'destructive',
    no_show: 'destructive',
  }
  return statusMap[status] || 'default'
}

// Get booking status label
export function getBookingStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    in_progress: 'Đang thực hiện',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
    no_show: 'Không đến',
  }
  return statusMap[status] || status
}

// Get payment status color
export function getPaymentStatusColor(
  status: string
): 'default' | 'success' | 'warning' | 'destructive' {
  const statusMap: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
    unpaid: 'warning',
    paid: 'success',
    refunded: 'destructive',
    partially_refunded: 'default',
  }
  return statusMap[status] || 'default'
}

// Get payment status label
export function getPaymentStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    unpaid: 'Chưa thanh toán',
    paid: 'Đã thanh toán',
    refunded: 'Đã hoàn tiền',
    partially_refunded: 'Hoàn một phần',
  }
  return statusMap[status] || status
}

// Calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  discountPrice: number
): number {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
}

// Generate star array for rating
export function generateStarArray(rating: number): (1 | 0.5 | 0)[] {
  const stars: (1 | 0.5 | 0)[] = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(1)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(0.5)
    } else {
      stars.push(0)
    }
  }

  return stars
}

// Validate Vietnamese phone number
export function isValidVietnamesePhone(phone: string): boolean {
  return /^0[0-9]{9}$/.test(phone)
}

// Generate booking code
export function generateBookingCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BK${timestamp}${random}`
}

// Parse query params
export function parseQueryParams(searchParams: URLSearchParams): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {}
  
  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value)
      } else {
        params[key] = [params[key] as string, value]
      }
    } else {
      params[key] = value
    }
  })
  
  return params
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Sleep function
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Check if time slot is available
export function isTimeSlotAvailable(
  slot: string,
  bookedSlots: string[]
): boolean {
  return !bookedSlots.includes(slot)
}

// Generate time slots
export function generateTimeSlots(
  startTime: string = '08:00',
  endTime: string = '20:00',
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = []
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  let currentHour = startHour
  let currentMinute = startMinute

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    slots.push(
      `${currentHour.toString().padStart(2, '0')}:${currentMinute
        .toString()
        .padStart(2, '0')}`
    )

    currentMinute += intervalMinutes
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60)
      currentMinute = currentMinute % 60
    }
  }

  return slots
}
