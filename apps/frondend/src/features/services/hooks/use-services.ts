import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { servicesApi } from '@/api/services.api'
import type { SearchServicesParams } from '@/types'

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  search: (params: SearchServicesParams) => ['services', 'search', params] as const,
  detail: (id: number) => ['services', 'detail', id] as const,
  slug: (slug: string) => ['services', 'slug', slug] as const,
  featured: ['services', 'featured'] as const,
  byProvider: (providerId: number) => ['services', 'provider', providerId] as const,
  byCategory: (categoryId: number) => ['services', 'category', categoryId] as const,
  availableSlots: (serviceId: number, date: string, staffId?: number) =>
    ['services', serviceId, 'slots', date, staffId] as const,
}

// Search services with pagination
export const useSearchServices = (params: SearchServicesParams) => {
  return useQuery({
    queryKey: serviceKeys.search(params),
    queryFn: () => servicesApi.search(params),
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Infinite scroll search
export const useInfiniteServices = (params: Omit<SearchServicesParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['services', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      servicesApi.search({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    staleTime: 2 * 60 * 1000,
  })
}

// Get service by ID
export const useService = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesApi.getById(id),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get service by slug
export const useServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: serviceKeys.slug(slug),
    queryFn: () => servicesApi.getBySlug(slug),
    staleTime: 5 * 60 * 1000,
  })
}

// Get featured services
export const useFeaturedServices = (limit: number = 10) => {
  return useQuery({
    queryKey: serviceKeys.featured,
    queryFn: () => servicesApi.getFeatured(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get services by provider
export const useProviderServices = (
  providerId: number,
  params?: { page?: number; limit?: number }
) => {
  return useQuery({
    queryKey: serviceKeys.byProvider(providerId),
    queryFn: () => servicesApi.getByProvider(providerId, params),
    enabled: !!providerId,
    staleTime: 5 * 60 * 1000,
  })
}

// Get services by category
export const useCategoryServices = (
  categoryId: number,
  params?: SearchServicesParams
) => {
  return useQuery({
    queryKey: serviceKeys.byCategory(categoryId),
    queryFn: () => servicesApi.getByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  })
}

// Get available time slots
export const useAvailableSlots = (
  serviceId: number,
  date: string,
  staffId?: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: serviceKeys.availableSlots(serviceId, date, staffId),
    queryFn: () => servicesApi.getAvailableSlots(serviceId, date, staffId),
    enabled: enabled && !!date,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}
