# API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
Hiện tại API chưa có authentication. Sẽ được thêm trong phiên bản tiếp theo.

---

## Endpoints

### 1. Home
Trả về thông tin về API.

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Chào mừng đến với Go Starter Project!",
  "version": "1.0.0"
}
```

---

### 2. Health Check
Kiểm tra trạng thái server.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy"
}
```

---

### 3. Get All Users
Lấy danh sách tất cả users.

**Endpoint:** `GET /api/users`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Trần Thị B",
    "email": "tranthib@example.com",
    "created_at": "2024-01-15T11:00:00Z",
    "updated_at": "2024-01-15T11:00:00Z"
  }
]
```

---

### 4. Get User by ID
Lấy thông tin user theo ID.

**Endpoint:** `GET /api/users/{id}`

**Path Parameters:**
- `id` (integer, required) - ID của user

**Response Success (200):**
```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Response Error (404):**
```json
{
  "error": "user not found"
}
```

---

### 5. Create User
Tạo user mới.

**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "Lê Văn C",
  "email": "levanc@example.com"
}
```

**Response Success (201):**
```json
{
  "id": 3,
  "name": "Lê Văn C",
  "email": "levanc@example.com",
  "created_at": "2024-01-15T12:00:00Z",
  "updated_at": "2024-01-15T12:00:00Z"
}
```

**Response Error (400):**
```json
{
  "error": "Name and email are required"
}
```

---

### 6. Update User
Cập nhật thông tin user.

**Endpoint:** `PUT /api/users/{id}`

**Path Parameters:**
- `id` (integer, required) - ID của user

**Request Body:**
```json
{
  "name": "Nguyễn Văn A Updated",
  "email": "nguyenvana.updated@example.com"
}
```

**Response Success (200):**
```json
{
  "id": 1,
  "name": "Nguyễn Văn A Updated",
  "email": "nguyenvana.updated@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T13:00:00Z"
}
```

**Response Error (404):**
```json
{
  "error": "user not found"
}
```

---

### 7. Delete User
Xóa user.

**Endpoint:** `DELETE /api/users/{id}`

**Path Parameters:**
- `id` (integer, required) - ID của user

**Response Success (204):**
No content

**Response Error (404):**
```json
{
  "error": "user not found"
}
```

---

## Error Responses

Tất cả error responses sẽ có format:
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes
- `200 OK` - Request thành công
- `201 Created` - Resource được tạo thành công
- `204 No Content` - Request thành công nhưng không có nội dung trả về
- `400 Bad Request` - Request không hợp lệ
- `404 Not Found` - Resource không tìm thấy
- `500 Internal Server Error` - Lỗi server

---

## Examples với cURL

### Lấy tất cả users
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

---

## Notes

- Tất cả timestamps đều ở định dạng ISO 8601 (RFC 3339)
- Email phải là unique trong database
- Name và email là required fields khi tạo/cập nhật user
