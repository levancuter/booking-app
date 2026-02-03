package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/yourusername/go-starter-project/internal/database"
	"github.com/yourusername/go-starter-project/internal/handlers"
	"github.com/yourusername/go-starter-project/internal/repository"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found, using environment variables")
	}

	// Kết nối database
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}
	defer database.Close()

	// Khởi tạo repository
	userRepo := repository.NewUserRepository(db)

	// Khởi tạo handlers
	userHandler := handlers.NewUserHandler(userRepo)

	// Lấy port từ environment variable hoặc dùng mặc định 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Khởi tạo router
	router := mux.NewRouter()

	// Đăng ký các routes
	router.HandleFunc("/", handlers.HomeHandler).Methods("GET")
	router.HandleFunc("/api/health", handlers.HealthCheckHandler).Methods("GET")
	
	// User routes
	router.HandleFunc("/api/users", userHandler.GetUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", userHandler.GetUser).Methods("GET")
	router.HandleFunc("/api/users", userHandler.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", userHandler.UpdateUser).Methods("PUT")
	router.HandleFunc("/api/users/{id}", userHandler.DeleteUser).Methods("DELETE")

	// Khởi động server
	fmt.Printf("🚀 Server đang chạy tại http://localhost:%s\n", port)
	fmt.Println("📊 Đã kết nối với PostgreSQL database")
	log.Fatal(http.ListenAndServe(":"+port, router))
}
