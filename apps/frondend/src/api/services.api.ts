import apiClient from '@/lib/axios'
import type { Service, SearchServicesParams, PaginatedResponse } from '@/types'

export const servicesApi = {
  // Search services
  search: async (params: SearchServicesParams): Promise<PaginatedResponse<Service>> => {
    const response = await apiClient.get<PaginatedResponse<Service>>('/services/search', {
      params,
    })
    return response.data
  },

  // Get service by ID
  getById: async (id: number): Promise<Service> => {
    const response = await apiClient.get<Service>(`/services/${id}`)
    return response.data
  },

  // Get service by slug
  getBySlug: async (slug: string): Promise<Service> => {
    const response = await apiClient.get<Service>(`/services/slug/${slug}`)
    return response.data
  },

  // Get featured services
  getFeatured: async (limit: number = 10): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/services/featured', {
      params: { limit },
    })
    return response.data
  },

  // Get services by provider
  getByProvider: async (
    providerId: number,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Service>> => {
    const response = await apiClient.get<PaginatedResponse<Service>>(
      `/providers/${providerId}/services`,
      { params }
    )
    return response.data
  },

  // Get services by category
  getByCategory: async (
    categoryId: number,
    params?: SearchServicesParams
  ): Promise<PaginatedResponse<Service>> => {
    const response = await apiClient.get<PaginatedResponse<Service>>(
      `/categories/${categoryId}/services`,
      { params }
    )
    return response.data
  },

  // Get available time slots
  getAvailableSlots: async (
    serviceId: number,
    date: string,
    staffId?: number
  ): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/services/${serviceId}/available-slots`, {
      params: { date, staffId },
    })
    return response.data
  },
}
