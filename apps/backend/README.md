# 🚀 BookMe Backend - Go REST API

Backend API cho hệ thống BookMe, xây dựng với Go và PostgreSQL.

## 📋 Mục lục

- [Tech Stack](#tech-stack)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt](#cài-đặt)
- [API Endpoints](#api-endpoints)
- [Xử lý nghiệp vụ](#xử-lý-nghiệp-vụ)
- [Database](#database)

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Go 1.25 |
| Router | Gorilla Mux |
| Database | PostgreSQL 14+ |
| Driver | lib/pq |
| Config | godotenv |

## 📁 Cấu trúc dự án

```
backend/
├── cmd/
│   └── server/
│       └── main.go          # Entry point - khởi tạo server
├── internal/
│   ├── database/
│   │   └── database.go      # Database connection & pool config
│   ├── handlers/
│   │   └── handlers.go      # HTTP handlers - xử lý request/response
│   ├── models/
│   │   └── user.go          # Domain models (structs)
│   └── repository/
│       └── user_repository.go  # Data access layer - CRUD operations
├── utils/
│   └── helpers.go           # Utility functions
├── .env.example             # Environment variables template
├── Makefile                 # Build & run commands
└── setup.sh                 # Setup script
```

## 🔄 Luồng xử lý Request

```
HTTP Request
    ↓
┌─────────────────┐
│   main.go       │  ← Entry point: setup router, middleware
└────────┬────────┘
         ↓
┌─────────────────┐
│   handlers/     │  ← Parse request, validate input, call service
└────────┬────────┘
         ↓
┌─────────────────┐
│   repository/   │  ← Execute database queries
└────────┬────────┘
         ↓
┌─────────────────┐
│   database/     │  ← Manage connection pool
└────────┬────────┘
         ↓
    PostgreSQL
```

## 🚀 Cài đặt

### 1. Clone và cấu hình

```bash
cd apps/backend
cp .env.example .env
```

### 2. Cấu hình database

Chỉnh sửa `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=bookme_db
DB_SSLMODE=disable
```

### 3. Cài dependencies và chạy

```bash
go mod download
go run cmd/server/main.go
```

Server chạy tại: `http://localhost:8080`

## 📡 API Endpoints

### Health Check
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Trang chủ |
| GET | `/api/health` | Health check |

### Users API
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/users` | Danh sách users |
| GET | `/api/users/{id}` | Chi tiết user |
| POST | `/api/users` | Tạo user mới |
| PUT | `/api/users/{id}` | Cập nhật user |
| DELETE | `/api/users/{id}` | Xóa user |

### Authentication (Planned)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/v1/auth/register` | Đăng ký |
| POST | `/api/v1/auth/login` | Đăng nhập |
| POST | `/api/v1/auth/logout` | Đăng xuất |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/auth/me` | Thông tin user hiện tại |

### Services (Planned)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/v1/services` | Danh sách dịch vụ |
| GET | `/api/v1/services/search` | Tìm kiếm dịch vụ |
| GET | `/api/v1/services/:id` | Chi tiết dịch vụ |
| GET | `/api/v1/services/:id/available-slots` | Khung giờ trống |

### Bookings (Planned)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/v1/bookings/me` | Lịch sử booking |
| POST | `/api/v1/bookings` | Tạo booking |
| POST | `/api/v1/bookings/:id/cancel` | Hủy booking |
| POST | `/api/v1/bookings/:id/confirm` | Xác nhận |
| POST | `/api/v1/bookings/:id/complete` | Hoàn thành |

## 🔧 Xử lý nghiệp vụ

### 1. Database Connection (`internal/database/database.go`)

**Chức năng:**
- Khởi tạo kết nối PostgreSQL
- Cấu hình connection pool
- Xử lý reconnection

**Connection Pool Settings:**
- Max Open Connections: 25
- Max Idle Connections: 25

```go
// Khởi tạo connection
db, err := sql.Open("postgres", connectionString)
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(25)
```

### 2. HTTP Handlers (`internal/handlers/handlers.go`)

**Chức năng:**
- Parse HTTP request
- Validate input data
- Gọi repository layer
- Format response JSON

**Response Format:**
```json
{
  "success": true,
  "data": {...},
  "message": "Success"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### 3. Repository Layer (`internal/repository/`)

**Chức năng:**
- Execute SQL queries
- Map database rows to Go structs
- Handle database errors

**Pattern:**
```go
func (r *UserRepository) GetByID(id int) (*User, error) {
    query := `SELECT id, name, email FROM users WHERE id = $1`
    row := r.db.QueryRow(query, id)
    // Map to struct...
}
```

### 4. Models (`internal/models/`)

**Chức năng:**
- Define domain entities
- JSON serialization tags
- Time handling

```go
type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
```

## 🗄️ Database

### Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Connection String Format

```
postgres://user:password@host:port/database?sslmode=disable
```

## 🧪 Testing

```bash
# Run all tests
make test
# hoặc
go test ./...
```

## 📦 Build

```bash
# Build binary
make build
# hoặc
go build -o bin/server cmd/server/main.go

# Run binary
./bin/server
```

## ⚙️ Makefile Commands

| Command | Mô tả |
|---------|-------|
| `make run` | Chạy development server |
| `make build` | Build production binary |
| `make test` | Chạy tests |
| `make clean` | Xóa build artifacts |
| `make deps` | Tải dependencies |
| `make fmt` | Format code |
| `make vet` | Chạy go vet |
| `make lint` | Format + lint code |

## 🔧 Environment Variables

| Variable | Mô tả | Default |
|----------|-------|---------|
| `PORT` | Server port | 8080 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | postgres |
| `DB_NAME` | Database name | go_starter_db |
| `DB_SSLMODE` | SSL mode | disable |

## 🔜 Roadmap

- [x] PostgreSQL integration
- [x] CRUD operations cơ bản
- [ ] JWT Authentication
- [ ] Middleware (logging, CORS, rate limiting)
- [ ] Input validation
- [ ] Unit tests
- [ ] API documentation (Swagger)
- [ ] Redis caching

## 🐛 Troubleshooting

### Database connection failed
```bash
# Check PostgreSQL is running
docker ps

# Test connection manually
psql -h localhost -U postgres -d bookme_db
```

### Port already in use
Đổi port trong `.env`:
```env
PORT=3001
```

---

Made with ❤️ by BookMe Team
