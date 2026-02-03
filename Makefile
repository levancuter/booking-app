.PHONY: run build test clean help

# Variables
BINARY_NAME=server
BUILD_DIR=bin

help: ## Hiển thị help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

run: ## Chạy ứng dụng
	@echo "Starting application..."
	@go run cmd/server/main.go

build: ## Build ứng dụng
	@echo "Building application..."
	@mkdir -p $(BUILD_DIR)
	@go build -o $(BUILD_DIR)/$(BINARY_NAME) cmd/server/main.go
	@echo "Build complete: $(BUILD_DIR)/$(BINARY_NAME)"

test: ## Chạy tests
	@echo "Running tests..."
	@go test -v ./...

clean: ## Xóa build artifacts
	@echo "Cleaning..."
	@rm -rf $(BUILD_DIR)
	@go clean

deps: ## Tải dependencies
	@echo "Downloading dependencies..."
	@go mod download
	@go mod tidy

fmt: ## Format code
	@echo "Formatting code..."
	@go fmt ./...

vet: ## Chạy go vet
	@echo "Running go vet..."
	@go vet ./...

lint: fmt vet ## Format và lint code
