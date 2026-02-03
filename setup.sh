#!/bin/bash

# Script để setup database

set -e

echo "🔧 Setting up Go Starter Project..."

# Kiểm tra .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Kiểm tra Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Khởi động PostgreSQL
echo "🐘 Starting PostgreSQL with Docker Compose..."
docker-compose up -d

# Đợi PostgreSQL sẵn sàng
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Kiểm tra PostgreSQL connection
until docker exec go_starter_postgres pg_isready -U postgres > /dev/null 2>&1; do
    echo "⏳ Waiting for PostgreSQL..."
    sleep 2
done

echo "✅ PostgreSQL is ready!"

# Tải Go dependencies
echo "📦 Downloading Go dependencies..."
go mod download
go mod tidy

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "  go run cmd/server/main.go"
echo ""
echo "Or use make:"
echo "  make run"
echo ""
echo "Access pgAdmin at: http://localhost:5050"
echo "  Email: admin@admin.com"
echo "  Password: admin"
echo ""
