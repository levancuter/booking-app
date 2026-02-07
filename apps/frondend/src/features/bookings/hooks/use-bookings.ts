import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { bookingsApi } from '@/api/bookings.api'
import type { BookingCreateRequest } from '@/types'

// Query keys
export const bookingKeys = {
  all: ['bookings'] as const,
  my: (params?: any) => ['bookings', 'my', params] as const,
  detail: (id: number) => ['bookings', 'detail', id] as const,
  code: (code: string) => ['bookings', 'code', code] as const,
}

// Get my bookings
export const useMyBookings = (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: bookingKeys.my(params),
    queryFn: () => bookingsApi.getMyBookings(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Get booking by ID
export const useBooking = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => bookingsApi.getById(id),
    enabled,
    staleTime: 1 * 60 * 1000,
  })
}

// Get booking by code
export const useBookingByCode = (code: string) => {
  return useQuery({
    queryKey: bookingKeys.code(code),
    queryFn: () => bookingsApi.getByCode(code),
    enabled: !!code,
    staleTime: 1 * 60 * 1000,
  })
}

// Create booking mutation
export const useCreateBooking = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BookingCreateRequest) => bookingsApi.create(data),
    onSuccess: (booking) => {
      // Invalidate bookings list
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })

      // Show success
      toast.success('Đặt lịch thành công!')

      // Redirect to booking detail
      router.push(`/bookings/${booking.bookingCode}`)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đặt lịch thất bại')
    },
  })
}

// Cancel booking mutation
export const useCancelBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      bookingsApi.cancel(id, reason),
    onSuccess: (booking) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(booking.id) })

      toast.success('Đã hủy lịch đặt')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Hủy lịch thất bại')
    },
  })
}

// Confirm booking mutation (for providers)
export const useConfirmBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bookingsApi.confirm(id),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(booking.id) })

      toast.success('Đã xác nhận lịch đặt')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Xác nhận thất bại')
    },
  })
}

// Complete booking mutation (for providers)
export const useCompleteBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => bookingsApi.complete(id),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(booking.id) })

      toast.success('Đã hoàn thành dịch vụ')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Hoàn thành thất bại')
    },
  })
}

// Reschedule booking mutation
export const useRescheduleBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      bookingDate,
      startTime,
      staffId,
    }: {
      id: number
      bookingDate: string
      startTime: string
      staffId?: number
    }) => bookingsApi.reschedule(id, { bookingDate, startTime, staffId }),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all })
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(booking.id) })

      toast.success('Đã đổi lịch thành công')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đổi lịch thất bại')
    },
  })
}
