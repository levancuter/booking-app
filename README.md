# Go Starter Project với PostgreSQL

Dự án Go khởi đầu với cấu trúc chuẩn, tích hợp PostgreSQL database và các tính năng cơ bản.

## Công nghệ sử dụng

- **Go 1.25** - Ngôn ngữ lập trình
- **PostgreSQL** - Database
- **Gorilla Mux** - HTTP router
- **lib/pq** - PostgreSQL driver
- **godotenv** - Environment variables management

## Cấu trúc dự án

```
go-starter-project/
├── cmd/
│   └── server/
│       └── main.go              # Entry point của ứng dụng
├── internal/
│   ├── database/
│   │   ├── database.go          # Database connection
│   │   └── migrations/          # SQL migrations
│   ├── handlers/
│   │   └── handlers.go          # HTTP handlers
│   ├── models/
│   │   └── user.go              # Data models
│   └── repository/
│       └── user_repository.go   # Database operations
├── pkg/
│   └── utils/
│       └── helpers.go           # Utility functions
├── configs/                     # Configuration files
├── docker-compose.yml           # Docker setup cho PostgreSQL
├── .env.example                 # Environment variables template
├── go.mod                       # Go module definition
└── README.md
```

## Yêu cầu

- Go 1.25 
- PostgreSQL 14+ (hoặc Docker)
- Make (optional)

## Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd go-starter-project
```

### 2. Copy environment variables

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin database của bạn:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=go_starter_db
DB_SSLMODE=disable
```

### 3. Tải dependencies

```bash
go mod download
```

## Chạy ứng dụng

```bash
go run cmd/server/main.go
```

Hoặc dùng Makefile:

```bash
make run
```

Server sẽ chạy tại `http://localhost:8080`

## API Endpoints

### Public Endpoints

- `GET /` - Trang chủ
- `GET /api/health` - Health check

### User Endpoints

- `GET /api/users` - Lấy danh sách users
- `GET /api/users/{id}` - Lấy user theo ID
- `POST /api/users` - Tạo user mới
- `PUT /api/users/{id}` - Cập nhật user
- `DELETE /api/users/{id}` - Xóa user

## Ví dụ sử dụng API

### Lấy danh sách users

```bash
curl http://localhost:8080/api/users
```

### Lấy user theo ID

```bash
curl http://localhost:8080/api/users/1
```

### Tạo user mới

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Phạm Văn D",
    "email": "phamvand@example.com"
  }'
```

### Cập nhật user

```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A Updated",
    "email": "nguyenvana.updated@example.com"
  }'
```

### Xóa user

```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Build và Deploy

### Build ứng dụng

```bash
make build
```

Hoặc:

```bash
go build -o bin/server cmd/server/main.go
```

### Chạy binary

```bash
./bin/server
```

## Testing

```bash
make test
```

Hoặc:

```bash
go test ./...
```

## Makefile Commands

- `make run` - Chạy ứng dụng
- `make build` - Build ứng dụng
- `make test` - Chạy tests
- `make clean` - Xóa build artifacts
- `make deps` - Tải dependencies
- `make fmt` - Format code
- `make vet` - Chạy go vet
- `make lint` - Format và lint code

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | go_starter_db |
| DB_SSLMODE | SSL mode | disable |

## Cấu trúc Database Connection Pool

- Max Open Connections: 25
- Max Idle Connections: 25

## Các bước tiếp theo

- [✓] PostgreSQL integration
- [✓] CRUD operations
- [✓] Docker support
- [ ] Add authentication/authorization (JWT)
- [ ] Add middleware (logging, CORS, rate limiting)
- [ ] Add validation
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation (Swagger)
- [ ] Add caching (Redis)
- [ ] Add CI/CD pipeline

## Troubleshooting

### Không kết nối được database

1. Kiểm tra PostgreSQL đang chạy:
```bash
docker ps
```

2. Kiểm tra logs:
```bash
docker logs go_starter_postgres
```

3. Test connection:
```bash
psql -h localhost -U postgres -d go_starter_db
```

### Port đã được sử dụng

Thay đổi port trong `.env`:
```env
PORT=3000
```

## License

MIT
