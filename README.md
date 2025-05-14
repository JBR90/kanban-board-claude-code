# Kanban Board Application

A collaborative Kanban board for task management with "To Do", "Doing", and "Done" columns.

## Table of Contents

- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
  - [Installation Steps](#installation-steps)
- [Development](#development)
  - [Running the Application](#running-the-application)
  - [Testing](#testing)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [References](#references)

## Setup & Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started/) and Docker Compose installed
- [Node.js](https://nodejs.org/) (v18 or later)
- npm (v8 or later)

### Database Setup

The application uses PostgreSQL as its database. We use Docker for easy setup and management.

1. **Start PostgreSQL with Docker**:

```bash
docker compose up -d
```

This will start a PostgreSQL container with:
- Username: postgres
- Password: postgres
- Database: kanban
- Port: 5433 (mapped to internal container port 5432)

2. **Run Database Migration**:

```bash
# Option 1: Using the provided script
./scripts/create-migration.sh

# Option 2: Manual steps
npx prisma migrate dev --name init
npx prisma generate
```

3. **Verify Database Connection**:

```bash
npm run db:test
```

### Environment Variables

Create a `.env` file in the root directory with:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/kanban"
```

### Installation Steps

1. **Install Dependencies**:

```bash
npm install
```

2. **Generate Prisma Client**:

```bash
npx prisma generate
```

## Development

### Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Testing

```bash
npm run test
```

## Project Structure

```
app/
├── (auth)/                     # Future auth features
├── (board)/                    # Board-related components and logic
│   ├── components/             # Board-specific components
│   ├── actions.ts              # Server actions for board operations
│   └── page.tsx                # Main board page
├── api/                        # API routes
│   └── tasks/                  # Task-related API endpoints
├── components/                 # Shared components
│   └── ui/                     # UI components
└── lib/                        # Shared utilities
    ├── prisma.ts               # Prisma client instance
    ├── types.ts                # Type definitions
    └── utils.ts                # Utility functions
```

## Technology Stack

- **Frontend**: Next.js 15 with App Router, React Server Components, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes & Server Actions
- **Database**: PostgreSQL with Prisma ORM

## References

- [FUNCTIONAL.md](FUNCTIONAL.md): Detailed functional requirements
- [ARCHITECTURE.md](ARCHITECTURE.md): Technical architecture details
- [CLAUDE.md](CLAUDE.md): Development standards and guidelines
- [TICKETS.md](TICKETS.md): Project implementation tickets