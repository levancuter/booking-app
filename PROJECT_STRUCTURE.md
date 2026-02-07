# 🏗️ BookMe - Full Stack Project Structure

## 📊 Overview

Hệ thống BookMe bao gồm 2 phần chính:
1. **Backend**: Go (Golang) - REST API
2. **Frontend**: Next.js 14 + TypeScript

---

## 🎯 Tech Stack Summary

### Backend (Go)
```
- Framework: Gin / Echo / Fiber
- ORM: GORM
- Database: MySQL / PostgreSQL
- Auth: JWT + Refresh Token
- Validation: go-playground/validator
- Config: Viper
- Migration: golang-migrate
```

### Frontend (Next.js)
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- UI: Tailwind CSS + shadcn/ui
- State: TanStack Query + Zustand
- Forms: React Hook Form + Zod
- API: Axios với interceptors
- Testing: Vitest + Playwright
```

---

## 📁 Complete Project Structure

```
bookme/
│
├── backend/                          # Go Backend
│   ├── cmd/
│   │   └── api/
│   │       └── main.go               # Entry point
│   │
│   ├── internal/
│   │   ├── api/
│   │   │   ├── handlers/             # HTTP handlers
│   │   │   ├── middleware/           # Auth, CORS, Logger
│   │   │   └── routes/               # Route definitions
│   │   │
│   │   ├── models/                   # Domain models (Go structs)
│   │   ├── repository/               # Data access layer
│   │   ├── service/                  # Business logic
│   │   ├── dto/                      # Data Transfer Objects
│   │   └── utils/                    # Helpers
│   │
│   ├── config/
│   │   └── config.go                 # App configuration
│   │
│   ├── database/
│   │   ├── migrations/               # SQL migrations
│   │   └── seeder/                   # Data seeding
│   │
│   ├── pkg/                          # Shared packages
│   │   ├── jwt/                      # JWT utils
│   │   ├── validator/                # Custom validators
│   │   └── pagination/               # Pagination helper
│   │
│   ├── go.mod
│   ├── go.sum
│   ├── .env.example
│   └── Dockerfile
│
└── frontend/                         # Next.js Frontend
    ├── src/
    │   ├── app/                      # Next.js App Router
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   └── register/
    │   │   ├── (dashboard)/
    │   │   │   ├── dashboard/
    │   │   │   ├── bookings/
    │   │   │   ├── favorites/
    │   │   │   └── profile/
    │   │   ├── provider/
    │   │   │   ├── dashboard/
    │   │   │   ├── bookings/
    │   │   │   ├── services/
    │   │   │   └── staff/
    │   │   ├── search/
    │   │   ├── services/
    │   │   │   └── [slug]/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── providers.tsx
    │   │   └── globals.css
    │   │
    │   ├── components/
    │   │   ├── ui/                   # shadcn/ui components
    │   │   ├── layouts/
    │   │   └── sections/
    │   │
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── components/
    │   │   │   └── hooks/
    │   │   ├── services/
    │   │   ├── bookings/
    │   │   └── categories/
    │   │
    │   ├── api/                      # API service layer
    │   │   ├── auth.api.ts
    │   │   ├── services.api.ts
    │   │   └── bookings.api.ts
    │   │
    │   ├── stores/                   # Zustand stores
    │   │   ├── auth.store.ts
    │   │   └── ui.store.ts
    │   │
    │   ├── lib/
    │   │   ├── axios.ts              # Axios config
    │   │   ├── utils.ts
    │   │   └── validations.ts        # Zod schemas
    │   │
    │   ├── types/
    │   │   └── index.ts              # TypeScript types
    │   │
    │   └── hooks/                    # Custom hooks
    │
    ├── public/
    ├── middleware.ts                 # Next.js middleware
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── next.config.js
```

---

## 🔄 Data Flow

### 1. Authentication Flow

```
User → Login Form → Frontend
                    ↓
                    Validation (Zod)
                    ↓
                    API Call (Axios)
                    ↓
Backend API → JWT Handler → Database
                    ↓
                    Return: access_token + refresh_token
                    ↓
Frontend ← Store token (localStorage + cookie)
         ↓
         Update Zustand store
         ↓
         Redirect to Dashboard
```

### 2. Booking Flow

```
User → Service Page → Select Date/Time → Frontend
                                         ↓
                                         Validate Form (React Hook Form + Zod)
                                         ↓
                                         Check Available Slots (React Query)
                                         ↓
                                         Create Booking API Call
                                         ↓
Backend → Validation → Check Availability → Create Record
                                         ↓
                                         Return Booking
                                         ↓
Frontend ← Invalidate Queries → Update UI → Redirect
```

### 3. Search Flow

```
User → Search Bar → Frontend
                   ↓
                   Debounce Input (300ms)
                   ↓
                   Build Query Params
                   ↓
                   API Call với React Query
                   ↓
Backend → Parse Filters → Query Database
                   ↓
                   Return Paginated Results
                   ↓
Frontend ← Cache Results (React Query)
         ↓
         Render Service Cards
```

---

## 🔐 Authentication System

### Token Strategy

**Access Token**
- Validity: 15-30 minutes
- Storage: localStorage (client-side)
- Usage: Authorization header trong mọi API call

**Refresh Token**
- Validity: 7-30 days
- Storage: httpOnly cookie (secure)
- Usage: Refresh access token khi hết hạn

### Flow Diagram

```
┌─────────────┐
│   User      │
│   Login     │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  Backend Auth    │
│  - Verify creds  │
│  - Generate JWT  │
└────────┬─────────┘
         │
         ▼
┌────────────────────────────┐
│  Return Tokens             │
│  - access_token (JWT)      │
│  - refresh_token (cookie)  │
└─────────┬──────────────────┘
          │
          ▼
┌─────────────────────────┐
│  Frontend Store         │
│  - localStorage: access │
│  - cookie: refresh      │
│  - Zustand: user info   │
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────┐
│  API Calls           │
│  Auto attach token   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Token Expires?      │
│  401 Unauthorized    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Auto Refresh        │
│  Call /auth/refresh  │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     │           │
Success       Fail
     │           │
     ▼           ▼
  Retry      Logout
  Request    Redirect
```

---

## 📡 API Endpoints

### Auth Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### Services Endpoints
```
GET    /api/v1/services
GET    /api/v1/services/search
GET    /api/v1/services/:id
GET    /api/v1/services/slug/:slug
GET    /api/v1/services/featured
GET    /api/v1/providers/:id/services
GET    /api/v1/services/:id/available-slots
```

### Bookings Endpoints
```
GET    /api/v1/bookings/me
POST   /api/v1/bookings
GET    /api/v1/bookings/:id
GET    /api/v1/bookings/code/:code
POST   /api/v1/bookings/:id/cancel
POST   /api/v1/bookings/:id/confirm
POST   /api/v1/bookings/:id/complete
POST   /api/v1/bookings/:id/reschedule
```

### Categories Endpoints
```
GET    /api/v1/categories
GET    /api/v1/categories/:id
GET    /api/v1/categories/:id/services
```

### Providers Endpoints
```
GET    /api/v1/providers
GET    /api/v1/providers/:id
GET    /api/v1/providers/search
POST   /api/v1/providers (auth required)
PUT    /api/v1/providers/:id (auth required)
```

### Reviews Endpoints
```
GET    /api/v1/services/:id/reviews
POST   /api/v1/reviews (auth required)
PUT    /api/v1/reviews/:id (auth required)
DELETE /api/v1/reviews/:id (auth required)
```

---

## 🗄️ Database Schema Highlights

### Core Tables
```sql
users                   -- Người dùng
user_addresses          -- Địa chỉ
providers               -- Nhà cung cấp
categories              -- Danh mục
services                -- Dịch vụ
service_images          -- Ảnh dịch vụ
staff                   -- Nhân viên
working_hours           -- Giờ làm việc
time_off                -- Ngày nghỉ
bookings                -- Đặt lịch
payments                -- Thanh toán
reviews                 -- Đánh giá
promotions              -- Khuyến mãi
notifications           -- Thông báo
```

---

## 🚀 Deployment Architecture

```
┌────────────────┐
│   CloudFlare   │  ← CDN
│   (DNS/CDN)    │
└────────┬───────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────┐
│ Vercel  │ │  AWS EC2 │
│(NextJS) │ │  (Go API)│
└────┬────┘ └────┬─────┘
     │           │
     │           ▼
     │      ┌──────────┐
     │      │   RDS    │
     │      │  MySQL   │
     │      └──────────┘
     │
     │      ┌──────────┐
     └─────→│  Redis   │
            │ (Cache)  │
            └──────────┘
```

---

## 📊 Performance Considerations

### Frontend Optimization
- Code splitting (Next.js automatic)
- Image optimization (next/image)
- React Query caching (2-5 minutes stale time)
- Memoization (useMemo, useCallback)
- Lazy loading components

### Backend Optimization
- Database indexing (all foreign keys + search fields)
- Connection pooling
- Query optimization
- Redis caching (hot data)
- Rate limiting

---

## 🧪 Testing Strategy

### Frontend Tests
```
Unit Tests (Vitest)
- Utils functions
- Custom hooks
- Store logic

Integration Tests
- API calls
- Form submissions

E2E Tests (Playwright)
- Login flow
- Booking flow
- Search flow
```

### Backend Tests
```
Unit Tests
- Business logic
- Utilities

Integration Tests
- API endpoints
- Database operations

E2E Tests
- Complete flows
- Auth flows
```

---

## 📈 Monitoring & Logging

### Frontend
- Sentry (Error tracking)
- Google Analytics 4
- Vercel Analytics

### Backend
- Prometheus (Metrics)
- Grafana (Dashboards)
- ELK Stack (Logging)
- New Relic (APM)

---

## 🔒 Security Checklist

- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] Input validation (Zod frontend, validator backend)
- [x] SQL injection prevention (GORM)
- [x] XSS protection (React escaping)
- [x] CSRF tokens
- [x] Rate limiting
- [x] CORS configuration
- [x] HTTPS only
- [x] Secure headers

---

## 📚 Documentation Links

### Backend (Go)
- [Gin Framework](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [JWT Go](https://github.com/golang-jwt/jwt)

### Frontend (Next.js)
- [Next.js](https://nextjs.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 🎯 Next Steps

1. **Setup Backend**
   - Initialize Go project
   - Setup database migrations
   - Implement core APIs

2. **Setup Frontend**
   - Run `npm install`
   - Configure environment variables
   - Start development server

3. **Integration**
   - Connect frontend to backend API
   - Test authentication flow
   - Test booking flow

4. **Deployment**
   - Deploy backend to AWS/GCP
   - Deploy frontend to Vercel
   - Configure DNS & SSL

---

Made with ❤️ by BookMe Team
