package utils

import (
	"fmt"
	"time"
)

// FormatDate định dạng thời gian theo format chuẩn
func FormatDate(t time.Time) string {
	return t.Format("2006-01-02 15:04:05")
}

// GenerateID tạo ID đơn giản (trong thực tế nên dùng UUID)
func GenerateID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}
