#!/bin/bash

echo "🚀 Starting database migration process..."

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker first."
  exit 1
fi

# Start Docker Compose if not already running
if ! docker compose ps | grep -q postgres; then
  echo "🔄 Starting PostgreSQL container..."
  docker compose up -d
  
  # Wait for PostgreSQL to be ready
  echo "⏳ Waiting for PostgreSQL to be ready..."
  sleep 5
else
  echo "✅ PostgreSQL container is already running."
fi

# Run the Prisma migration
echo "🔄 Running initial migration..."
npx prisma migrate dev --name init

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

echo "✅ Migration complete!"
echo "You can now run 'npm run db:test' to verify the database connection."