# 📅 BookMe - Hệ thống đặt lịch dịch vụ

BookMe là nền tảng đặt lịch dịch vụ trực tuyến, cho phép khách hàng tìm kiếm, đặt lịch và quản lý các dịch vụ từ nhiều nhà cung cấp khác nhau.

## 🚀 Tổng quan hệ thống

```
booking-app/
├── apps/
│   ├── backend/          # Go REST API Server
│   ├── frondend/         # Next.js 14 Frontend
│   └── database/         # Database migrations
├── doc/                  # Tài liệu dự án
├── .devcontainer/        # Development container configs
└── PROJECT_STRUCTURE.md  # Chi tiết kiến trúc
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| **State** | Zustand (global state), TanStack Query (server state) |
| **Forms** | React Hook Form + Zod validation |
| **Backend** | Go 1.25, Gorilla Mux, PostgreSQL |
| **Database** | PostgreSQL 14+ |
| **Auth** | JWT + Refresh Token |

## 📊 Tính năng chính

### Dành cho Khách hàng
- 🔍 **Tìm kiếm & Lọc**: Tìm dịch vụ theo vị trí, giá, danh mục, đánh giá
- 📅 **Đặt lịch**: Xem khung giờ trống và đặt lịch trực tuyến
- 💳 **Thanh toán**: Hỗ trợ nhiều phương thức thanh toán (tiền mặt, thẻ, ví điện tử)
- 📱 **Quản lý lịch hẹn**: Xem lịch sử, hủy, dời lịch
- 🔔 **Thông báo**: Nhắc lịch hẹn, cập nhật trạng thái

### Dành cho Nhà cung cấp
- 📋 **Quản lý dịch vụ**: Đăng tải, chỉnh sửa dịch vụ và giá
- 📆 **Quản lý lịch**: Thiết lập giờ làm việc, ngày nghỉ
- ✅ **Xác nhận đặt chỗ**: Chấp nhận/từ chối yêu cầu
- 📈 **Báo cáo doanh thu**: Thống kê theo thời gian
- 👥 **Quản lý nhân viên**: Phân công công việc

## 🔄 Luồng xử lý chính

### 1. Authentication Flow
```
User Login → Validate (Zod) → API Call → JWT Generated
    ↓
Store Tokens → Access (localStorage) + Refresh (httpOnly cookie)
    ↓
Auto Refresh → 401 Error → Refresh Token → Retry Request
```

### 2. Booking Flow
```
Select Service → Choose Date/Time → Check Availability
    ↓
Create Booking → Validate → Save to DB → Return Booking Code
    ↓
Send Notification → Provider Confirms → Complete
```

### 3. Search Flow
```
User Input → Debounce (300ms) → Build Query Params
    ↓
API Call → Cache with React Query → Render Results
```

## 🗄️ Database Schema

| Table | Mô tả |
|-------|-------|
| `users` | Thông tin người dùng |
| `providers` | Nhà cung cấp dịch vụ |
| `categories` | Danh mục dịch vụ |
| `services` | Dịch vụ được cung cấp |
| `bookings` | Đặt lịch của khách hàng |
| `payments` | Thông tin thanh toán |
| `reviews` | Đánh giá từ khách hàng |
| `staff` | Nhân viên của provider |
| `working_hours` | Giờ làm việc |
| `promotions` | Mã khuyến mãi |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Go 1.25+
- PostgreSQL 14+
- Docker (optional)

### 1. Clone & Setup
```bash
git clone <repository-url>
cd booking-app
```

### 2. Backend Setup
```bash
cd apps/backend
cp .env.example .env
# Edit .env với database credentials
go mod download
go run cmd/server/main.go
```

### 3. Frontend Setup
```bash
cd apps/frondend
npm install
npm run dev
```

### 4. Database Migrations
```bash
cd apps/database/migrations
# Apply migrations theo thứ tự
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/v1/auth/register` | Đăng ký tài khoản |
| POST | `/api/v1/auth/login` | Đăng nhập |
| POST | `/api/v1/auth/logout` | Đăng xuất |
| POST | `/api/v1/auth/refresh` | Làm mới token |
| GET | `/api/v1/auth/me` | Thông tin user hiện tại |

### Services
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/v1/services/search` | Tìm kiếm dịch vụ |
| GET | `/api/v1/services/:id` | Chi tiết dịch vụ |
| GET | `/api/v1/services/featured` | Dịch vụ nổi bật |
| GET | `/api/v1/services/:id/available-slots` | Khung giờ trống |

### Bookings
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/v1/bookings` | Tạo booking mới |
| GET | `/api/v1/bookings/me` | Lịch sử booking |
| POST | `/api/v1/bookings/:id/cancel` | Hủy booking |
| POST | `/api/v1/bookings/:id/confirm` | Xác nhận booking |

## 🔐 Bảo mật

- ✅ JWT authentication với refresh token
- ✅ Password hashing (bcrypt)
- ✅ Input validation (Zod frontend, validator backend)
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Rate limiting

## 📁 Documentation

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Chi tiết kiến trúc
- [apps/backend/README.md](./apps/backend/README.md) - Backend documentation
- [apps/backend/API.md](./apps/backend/API.md) - API documentation
- [apps/frondend/README.md](./apps/frondend/README.md) - Frontend documentation
- [doc/requirement.txt](./doc/requirement.txt) - Requirements

## 📝 License

MIT License

---

Made with ❤️ by BookMe Team
