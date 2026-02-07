import apiClient from '@/lib/axios'
import type { Booking, BookingCreateRequest, PaginatedResponse } from '@/types'

export const bookingsApi = {
  // Create booking
  create: async (data: BookingCreateRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', data)
    return response.data
  },

  // Get user bookings
  getMyBookings: async (params?: {
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<Booking>> => {
    const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings/me', {
      params,
    })
    return response.data
  },

  // Get booking by ID
  getById: async (id: number): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`)
    return response.data
  },

  // Get booking by code
  getByCode: async (code: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/code/${code}`)
    return response.data
  },

  // Cancel booking
  cancel: async (id: number, reason?: string): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/cancel`, {
      reason,
    })
    return response.data
  },

  // Confirm booking (for provider)
  confirm: async (id: number): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/confirm`)
    return response.data
  },

  // Complete booking (for provider)
  complete: async (id: number): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/complete`)
    return response.data
  },

  // Reschedule booking
  reschedule: async (
    id: number,
    data: {
      bookingDate: string
      startTime: string
      staffId?: number
    }
  ): Promise<Booking> => {
    const response = await apiClient.post<Booking>(`/bookings/${id}/reschedule`, data)
    return response.data
  },
}
