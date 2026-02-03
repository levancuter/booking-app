package models

import "time"

// User đại diện cho người dùng trong hệ thống
type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreateUserRequest là request body để tạo user mới
type CreateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

// UpdateUserRequest là request body để cập nhật user
type UpdateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}
