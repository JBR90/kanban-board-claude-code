# Development History - Azizi

## Completed Tickets

### B1: Project Setup - Database and ORM

- Implemented PostgreSQL database via Docker (postgres:17-alpine)
- Configured Prisma with schema.prisma matching ARCHITECTURE.md specs
- Set up environment variables (.env and .env.example)
- Created database connection test script
- Added initial migration
- Updated package.json with Prisma dependencies and scripts
- Created comprehensive README with setup instructions

## Key Implementation Details

### Initial Setup (First Commit)

- Created docker-compose.yml with PostgreSQL 17 on port 5432
- Added Prisma client singleton in app/lib/prisma.ts
- Added scripts for database testing and migration (TypeScript)
- Set up environment variables with connection string
- Added npm scripts for database operations

### Fixes and Improvements (Second Commit)

- Changed PostgreSQL port from 5432 to 5433 due to port conflict
- Updated docker-compose.yml to use new port
- Updated environment variables with new port
- Converted TypeScript test script to JavaScript due to TS compilation issues
- Fixed Docker Compose V2 syntax (`docker compose` vs `docker-compose`)
- Added output path to Prisma schema to fix deprecation warning
- Successfully ran initial migration, creating Task model in database
- Updated README with new port configuration

## Deviations from Original Specifications

- Changed PostgreSQL port to 5433 (instead of standard 5432) to avoid conflicts
  with existing databases
- Implemented database test script in JavaScript instead of TypeScript due to TS
  module resolution issues

## Current Configuration

### Database

- **PostgreSQL**: Version 17 (Alpine) running on port 5433
- **Credentials**: User: postgres, Password: postgres, Database: kanban
- **Connection String**: `postgresql://postgres:postgres@localhost:5433/kanban`

### Prisma

- **Version**: 6.7.0
- **Schema**: Task model with Status enum (todo, doing, done)
- **Output Path**: "../node_modules/.prisma/client"

### Scripts

- **db:generate**: `prisma generate` - Generates Prisma client
- **db:migrate**: `prisma migrate dev` - Runs Prisma migrations
- **db:studio**: `prisma studio` - Opens Prisma Studio
- **db:test**: `node scripts/test-db-connection.js` - Tests database connection
