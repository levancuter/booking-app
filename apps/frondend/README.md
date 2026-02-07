# 🎨 BookMe Frontend - Next.js 14

Frontend cho hệ thống BookMe, xây dựng với Next.js 14 App Router và TypeScript.

## 📋 Mục lục

- [Tech Stack](#tech-stack)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Xử lý nghiệp vụ](#xử-lý-nghiệp-vụ)
- [Components](#components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Validation](#validation)

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (global) + TanStack Query (server) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| HTTP | Axios |

## 📁 Cấu trúc dự án

```
frondend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages group
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Register page
│   │   ├── (dashboard)/       # Dashboard pages group
│   │   │   ├── dashboard/     # User dashboard
│   │   │   ├── bookings/      # Booking management
│   │   │   ├── favorites/     # Favorites list
│   │   │   └── profile/       # User profile
│   │   ├── provider/          # Provider pages
│   │   │   ├── dashboard/     # Provider dashboard
│   │   │   ├── bookings/      # Manage bookings
│   │   │   ├── services/      # Manage services
│   │   │   └── staff/         # Staff management
│   │   ├── search/            # Search page
│   │   ├── services/          # Service detail
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── providers.tsx      # React providers wrapper
│   │   └── globals.css        # Global styles
│   │
│   ├── api/                   # API integration layer
│   │   ├── auth.api.ts        # Authentication API
│   │   ├── bookings.api.ts    # Bookings API
│   │   └── services.api.ts    # Services API
│   │
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layouts/           # Layout components
│   │   └── sections/          # Page sections
│   │
│   ├── features/              # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── bookings/          # Booking management
│   │   ├── categories/        # Categories
│   │   ├── search/            # Search functionality
│   │   └── services/          # Services
│   │
│   ├── lib/                   # Utilities
│   │   ├── axios.ts           # HTTP client config
│   │   ├── utils.ts           # Helper functions
│   │   ├── validations.ts     # Zod schemas
│   │   └── mock-data.ts       # Mock data for dev
│   │
│   ├── stores/                # Zustand stores
│   │   ├── auth.store.ts      # Auth state
│   │   └── ui.store.ts        # UI state
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # Domain models
│   │
│   └── middleware.ts          # Next.js middleware
│
├── public/                    # Static assets
└── ...config files
```

## 🔄 Xử lý nghiệp vụ

### 1. API Layer (`src/api/`)

**Chức năng:** Tập trung tất cả HTTP calls, tách biệt khỏi UI logic.

#### `auth.api.ts` - Authentication
```typescript
authApi.login()      // Đăng nhập → { accessToken, user }
authApi.register()   // Đăng ký
authApi.logout()     // Đăng xuất
authApi.me()         // Lấy thông tin user hiện tại
authApi.refresh()    // Làm mới access token
authApi.verifyEmail()       // Xác thực email
authApi.requestPasswordReset()  // Quên mật khẩu
authApi.resetPassword()     // Đặt lại mật khẩu
authApi.changePassword()    // Đổi mật khẩu
```

#### `bookings.api.ts` - Bookings
```typescript
bookingsApi.create()      // Tạo booking mới
bookingsApi.getMyBookings()  // Lấy danh sách booking của user
bookingsApi.getById()     // Chi tiết booking
bookingsApi.getByCode()   // Tìm theo booking code
bookingsApi.cancel()      // Hủy booking
bookingsApi.confirm()     // Xác nhận (provider)
bookingsApi.complete()    // Hoàn thành (provider)
bookingsApi.reschedule()  // Dời lịch
```

#### `services.api.ts` - Services
```typescript
servicesApi.search()         // Tìm kiếm dịch vụ
servicesApi.getById()        // Chi tiết dịch vụ
servicesApi.getBySlug()      // Tìm theo slug
servicesApi.getFeatured()    // Dịch vụ nổi bật
servicesApi.getByProvider()  // Dịch vụ theo provider
servicesApi.getByCategory()  // Dịch vụ theo danh mục
servicesApi.getAvailableSlots()  // Khung giờ trống
```

### 2. Axios Config (`src/lib/axios.ts`)

**Chức năng:** HTTP client với auto token refresh.

```
Request Interceptor:
  ↓ Attach access token từ localStorage
  ↓ Set Authorization header

Response Interceptor:
  ↓ 401 Error?
  ↓ Queue failed requests
  ↓ Call /auth/refresh
  ↓ Retry with new token
  ↓ Fail? → Logout → Redirect /login
```

**Xử lý đặc biệt:**
- **Token Queue:** Khi refreshing, các request khác được queue lại
- **Auto Logout:** Refresh fail → xóa token → redirect login
- **Error Toast:** 403/500 errors hiện toast notification

### 3. State Management (`src/stores/`)

#### `auth.store.ts` - Authentication State
```typescript
interface AuthState {
  user: User | null        // Thông tin user
  isAuthenticated: boolean // Trạng thái đăng nhập
  isLoading: boolean       // Loading state
}

Actions:
  setUser()   // Cập nhật user info
  setLoading() // Set loading state
  logout()    // Xóa token, reset state
```

**Persistence:** Lưu vào localStorage với key `auth-storage`

#### `ui.store.ts` - UI State
```typescript
interface UIState {
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  isBookingModalOpen: boolean
  theme: 'light' | 'dark'
  isMobileMenuOpen: boolean
}

Actions:
  openLoginModal(), closeLoginModal()
  openRegisterModal(), closeRegisterModal()
  openBookingModal(), closeBookingModal()
  toggleTheme()
  toggleMobileMenu(), closeMobileMenu()
```

### 4. Validation (`src/lib/validations.ts`)

**Zod schemas cho form validation:**

#### Login Schema
```typescript
{
  email: required, valid email format
  password: min 6 characters
}
```

#### Register Schema
```typescript
{
  email: required, valid email
  password: min 6 chars, 1 uppercase, 1 number
  confirmPassword: must match password
  fullName: 2-100 characters
  phone: Vietnamese phone format (0xxxxxxxxx)
  agreeToTerms: must be true
}
```

#### Booking Schema
```typescript
{
  serviceId: positive integer
  staffId: optional positive integer
  bookingDate: future date
  startTime: HH:mm format
  customerName: 2-100 characters
  customerPhone: Vietnamese phone format
  customerEmail: optional, valid email
  customerNote: max 500 characters
  promotionCode: max 50 characters
}
```

#### Search Schema
```typescript
{
  query: max 200 chars
  categoryId, city, district
  minPrice, maxPrice
  rating: 0-5
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'distance'
}
```

### 5. Types (`src/types/index.ts`)

**Domain Models (match backend DTOs):**

| Type | Mô tả |
|------|-------|
| `User` | Thông tin người dùng |
| `Provider` | Nhà cung cấp dịch vụ |
| `Category` | Danh mục dịch vụ |
| `Service` | Thông tin dịch vụ |
| `Staff` | Nhân viên |
| `Booking` | Đặt lịch |
| `Payment` | Thanh toán |
| `Review` | Đánh giá |
| `Promotion` | Khuyến mãi |
| `Notification` | Thông báo |

**API Types:**
| Type | Mô tả |
|------|-------|
| `LoginRequest/Response` | Đăng nhập |
| `RegisterRequest` | Đăng ký |
| `BookingCreateRequest` | Tạo booking |
| `SearchServicesParams` | Tham số tìm kiếm |
| `PaginatedResponse<T>` | Response phân trang |

### 6. Middleware (`src/middleware.ts`)

**Chức năng:** Route protection.

```
Protected Routes:
  /dashboard/* → Redirect to /login if not authenticated
  /provider/*  → Redirect to /login if not authenticated
  /bookings/*  → Redirect to /login if not authenticated

Auth Routes:
  /login, /register → Redirect to /dashboard if already logged in
```

## 🧩 Components

### UI Components (`src/components/ui/`)
- Shadcn/ui primitives
- Customized với Tailwind

### Layouts (`src/components/layouts/`)
- Page layouts
- Navigation components

### Sections (`src/components/sections/`)
- Homepage sections
- Reusable page parts

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open http://localhost:3000

### 3. Build for production
```bash
npm run build
npm run start
```

## ⚙️ Commands

| Command | Mô tả |
|---------|-------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check |

## 🔧 Environment Variables

`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Mobile menu với hamburger

## 🎨 Styling

- Tailwind CSS cho utility classes
- CSS Variables cho theming
- Dark mode support

---

Made with ❤️ by BookMe Team
