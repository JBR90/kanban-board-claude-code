# Kanban Board: Architecture Specification

## Technology Stack

### Frontend
- **Framework:** Next.js 15 with App Router and React Server Components
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** Shadcn UI
- **State Management:** Next.js Server Components + React Server Actions
- **Drag and Drop:** React DnD or similar library

### Backend
- **Framework:** Next.js API Routes (integrated with frontend)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API Pattern:** RESTful endpoints + Server Actions

## Project Structure

```
app/
├── (auth)/                     # Future auth features (placeholder)
├── (board)/                    # Board features
│   ├── components/             # Board-specific components
│   │   ├── BoardColumn.tsx     # Column component
│   │   ├── TaskCard.tsx        # Task card component
│   │   ├── TaskForm.tsx        # Task creation/edit form
│   │   └── ...                 # Other board components
│   ├── actions.ts              # Server actions for board operations
│   ├── page.tsx                # Main board page
│   └── loading.tsx             # Loading state
├── api/                        # API routes
│   └── tasks/                  # Task-related API endpoints
│       ├── route.ts            # GET/POST handlers
│       └── [id]/route.ts       # GET/PUT/DELETE handlers for specific tasks
├── components/                 # Shared components
│   ├── ui/                     # Shadcn UI components
│   └── ...                     # Other shared components
├── lib/                        # Shared utilities
│   ├── prisma.ts               # Prisma client instance
│   ├── types.ts                # Type definitions
│   └── utils.ts                # Utility functions
├── prisma/                     # Database configuration
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # Database migrations
└── public/                     # Static assets
```

## Data Model

### Task
```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      Status   @default(todo)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("tasks")
}

enum Status {
  todo
  doing
  done
}
```

## Component Architecture

### Page Components
- **BoardPage** - Main page component that fetches initial data

### Feature Components
- **BoardColumn** - Renders a column and its tasks
- **TaskCard** - Displays task info and handles drag events
- **TaskForm** - Form for creating/editing tasks
- **DeleteTaskButton** - Confirmation for task deletion

### Shared UI Components
- Buttons, modals, inputs, etc. from Shadcn UI

## State Management

1. **Server State:**
   - Tasks fetched via Server Components
   - Updates through Server Actions

2. **UI State:**
   - Form state managed with React's `useState`/`useReducer`
   - Drag and drop state handled by selected library

## Data Flow

1. **Read Operations:**
   - Server components fetch data directly from database via Prisma
   - Data passed to client components as props

2. **Write Operations:**
   - Client triggers Server Action via form submission
   - Server Action updates database
   - Page revalidates to show new data

## API Endpoints

### `/api/tasks`
- `GET`: Fetch all tasks
- `POST`: Create new task

### `/api/tasks/[id]`
- `GET`: Fetch specific task
- `PUT`: Update specific task
- `DELETE`: Remove specific task

## Server Actions

- `createTask({ title, description })`
- `updateTask(id, { title, description, status })`
- `deleteTask(id)`
- `moveTask(id, newStatus)`

## Error Handling

1. **Global Error Handling:**
   - Next.js error boundaries and error.tsx files
   - Custom error UI for different types of errors

2. **Component-Level Handling:**
   - Try/catch blocks in Server Actions
   - Form validation with appropriate error messages

## Testing Strategy

- **Unit Tests:** Jest + React Testing Library
- **Component Tests:** Testing isolated components
- **Integration Tests:** Testing interactions between components

## Performance Considerations

- React Server Components for reduced client-side JavaScript
- Next.js caching mechanisms for API responses
- Optimistic UI updates for improved user experience

## References
- [FUNCTIONAL.md](FUNCTIONAL.md) - Functional requirements
- [CLAUDE.md](CLAUDE.md) - Development standards and guidelines