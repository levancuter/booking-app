-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data
INSERT INTO users (name, email) VALUES
    ('Nguyễn Văn A', 'nguyenvana@example.com'),
    ('Trần Thị B', 'tranthib@example.com'),
    ('Lê Văn C', 'levanc@example.com')
ON CONFLICT (email) DO NOTHING;
