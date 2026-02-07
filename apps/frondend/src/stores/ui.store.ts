import { create } from 'zustand'

interface UIState {
  // Modal states
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  isBookingModalOpen: boolean
  
  // Theme
  theme: 'light' | 'dark'
  
  // Mobile menu
  isMobileMenuOpen: boolean
  
  // Actions
  openLoginModal: () => void
  closeLoginModal: () => void
  openRegisterModal: () => void
  closeRegisterModal: () => void
  openBookingModal: () => void
  closeBookingModal: () => void
  toggleTheme: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isBookingModalOpen: false,
  theme: 'light',
  isMobileMenuOpen: false,

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
  
  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),
  
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
    
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
    
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}))
