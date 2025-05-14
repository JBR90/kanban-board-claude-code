# Project Tickets: Kanban Board

## Overview

This document outlines the development tickets for the Kanban Board project, split between frontend (Joe) and backend (Azizi) responsibilities. Tickets are ordered by dependency to ensure efficient parallel development. Each ticket includes specific acceptance criteria for objective evaluation.

## Backend Tickets

### B1: Project Setup - Database and ORM
**Assignee:** Azizi  
**Description:** Set up PostgreSQL database and Prisma ORM  
**Deliverables:**
- Initialize PostgreSQL database
- Configure Prisma with schema.prisma file based on data model in ARCHITECTURE.md
- Set up environment variables
- Create initial migration
- Add database connection test script

**Dependencies:** None  
**Acceptance Criteria:**
- PostgreSQL database is running and accessible
- Prisma schema matches the data model specified in ARCHITECTURE.md
- `npx prisma generate` command executes without errors
- Initial migration applies successfully
- Environment variables are properly configured and documented
- Connection test script successfully connects to the database
- README includes database setup instructions

**Definition of Done:** All acceptance criteria are met and verified with working code.

### B2: Task API - Database Models
**Assignee:** Azizi  
**Description:** Implement the Task model and database schema  
**Deliverables:**
- Implement Task model with id, title, description, status, createdAt, updatedAt
- Create Status enum (todo, doing, done)
- Run and verify migration
- Write unit tests for model validation constraints

**Dependencies:** B1  
**Acceptance Criteria:**
- Task model includes all required fields with correct types
- Status enum includes exactly the three required values
- Migration script runs without errors
- Model enforces required fields (title, status)
- Created tasks have default values for createdAt and updatedAt
- Unit tests verify model constraints
- Test coverage for model is >90%

**Definition of Done:** All acceptance criteria are met, migration is successful, and all tests pass.

### B3: Task API - GET Endpoints and Tests
**Assignee:** Azizi  
**Description:** Implement and test API endpoints for retrieving tasks  
**Deliverables:**
- Create `/api/tasks` GET endpoint to retrieve all tasks
- Create `/api/tasks/[id]` GET endpoint to retrieve a specific task
- Add proper error handling for invalid IDs and not found cases
- Write unit tests for each endpoint covering success and error cases
- Write integration tests for endpoint-database interaction

**Dependencies:** B2  
**Acceptance Criteria:**
- `/api/tasks` GET returns array of all tasks with 200 status code
- `/api/tasks/[id]` GET returns single task object with 200 status code
- Invalid ID format returns 400 error with descriptive message
- Non-existent ID returns 404 error with descriptive message
- Server errors return 500 status with safe error message
- Response times are under 200ms for typical loads
- Endpoint responses match specified JSON schema
- Unit tests cover success and all error scenarios
- Integration tests verify database interaction
- Test coverage for endpoints is >90%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### B4: Task API - POST/PUT/DELETE Endpoints and Tests
**Assignee:** Azizi  
**Description:** Implement and test API endpoints for creating, updating, and deleting tasks  
**Deliverables:**
- Create `/api/tasks` POST endpoint to create a new task
- Create `/api/tasks/[id]` PUT endpoint to update a task
- Create `/api/tasks/[id]` DELETE endpoint to delete a task
- Add proper validation and error handling
- Write unit tests for each endpoint covering success and error cases
- Write integration tests for data persistence

**Dependencies:** B3  
**Acceptance Criteria:**
- POST endpoint accepts task data and returns 201 with created resource
- PUT endpoint updates task and returns 200 with updated resource
- DELETE endpoint removes task and returns 204 (no content)
- POST rejects invalid task data with 400 and descriptive errors
- PUT rejects invalid updates with 400 and descriptive errors
- All endpoints handle non-existent IDs with 404 response
- Server errors return 500 status with safe error message
- Response times are under 300ms for typical operations
- Validation checks all required fields and data types
- Unit tests cover success and all error scenarios
- Integration tests verify database operations
- Test coverage for endpoints is >90%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### B5: Server Actions Implementation and Tests
**Assignee:** Azizi  
**Description:** Implement and test Server Actions for task operations  
**Deliverables:**
- Create `createTask` server action
- Create `updateTask` server action
- Create `deleteTask` server action
- Create `moveTask` server action for changing status
- Implement proper error handling and validation
- Write unit tests for each server action
- Write integration tests for server action-database interaction

**Dependencies:** B4  
**Acceptance Criteria:**
- `createTask` creates a valid task in the database
- `updateTask` updates a task with new values
- `deleteTask` removes a task from the database
- `moveTask` changes task status correctly
- All actions include input validation
- All actions handle errors gracefully with descriptive messages
- Actions return appropriate success/error responses
- Actions can be called from client components
- Unit tests verify correct behavior for all actions
- Integration tests confirm database state changes
- Test coverage for server actions is >90%

**Definition of Done:** All acceptance criteria are met and all tests pass.

## Frontend Tickets

### B6: Project Initialization - Next.js and Core Setup
**Assignee:** Azizi  
**Description:** Initialize the Next.js project with TypeScript, configure Tailwind CSS, and set up the basic project structure  
**Deliverables:**
- Initialize Next.js 15 project with TypeScript
- Configure Tailwind CSS
- Configure project structure following ARCHITECTURE.md

**Dependencies:** None  
**Acceptance Criteria:**
- Next.js 15 project initializes without errors
- TypeScript is configured with strict mode enabled
- Tailwind CSS is installed and configured
- Project structure matches ARCHITECTURE.md specifications
- `npm run dev` starts the development server
- `npm run build` completes without errors
- README includes basic setup instructions

**Definition of Done:** All acceptance criteria are met and verified with working code.

### F1: UI Setup and Component Library
**Assignee:** Joe  
**Description:** Set up UI component libraries and testing infrastructure  
**Deliverables:**
- Set up Shadcn UI
- Create placeholder pages
- Set up Jest and React Testing Library

**Dependencies:** B6  
**Acceptance Criteria:**
- Shadcn UI components can be imported and used
- Placeholder pages render without errors
- Jest and React Testing Library are configured
- Sample test runs successfully
- Component styling follows project standards
- UI components are accessible

**Definition of Done:** All acceptance criteria are met and verified with working code.

### F2: UI Components - Basic Structure and Tests
**Assignee:** Joe  
**Description:** Create and test basic UI components for the board  
**Deliverables:**
- Create layout component with header
- Create BoardColumn component (static, no data)
- Create TaskCard component (static, no data)
- Implement basic styling with Tailwind CSS
- Write unit tests for each component

**Dependencies:** B6, F1  
**Acceptance Criteria:**
- Layout component includes header and main content area
- BoardColumn component renders with title and placeholder for tasks
- TaskCard component displays title and optional description
- All components implement responsive design
- Components follow Tailwind styling conventions
- Components match visual design requirements
- Components use semantic HTML elements
- Components pass basic accessibility tests
- Unit tests verify component rendering
- Test coverage for components is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### F3: Task Form Components and Tests
**Assignee:** Joe  
**Description:** Create and test forms for adding and editing tasks  
**Deliverables:**
- Create TaskForm component for adding new tasks
- Create EditTaskForm component for editing existing tasks
- Implement form validation with error messages
- Add modal components for displaying forms
- Write unit tests for form validation
- Write component tests for form submission logic

**Dependencies:** F2  
**Acceptance Criteria:**
- TaskForm includes fields for title and description
- EditTaskForm pre-populates with existing task data
- Forms validate required fields (title)
- Forms display appropriate error messages
- Modal components open and close correctly
- Forms are accessible via keyboard navigation
- Forms can be submitted with Enter key
- Forms reset after successful submission
- Unit tests verify validation logic
- Component tests verify form submission
- Test coverage for form components is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### F4: Board Page - Data Integration and Tests
**Assignee:** Joe  
**Description:** Connect board components to data from backend  
**Deliverables:**
- Implement data fetching in BoardPage component
- Connect BoardColumn to display tasks by status
- Connect TaskCard to display real task data
- Add loading states for data fetching
- Write tests for data fetching logic
- Test component rendering with mock data

**Dependencies:** F3, B3  
**Acceptance Criteria:**
- BoardPage fetches tasks from the API
- Tasks display in the correct columns based on status
- Loading state displays during data fetching
- Error state displays if data fetch fails
- Empty columns show appropriate message
- Components correctly handle different task data formats
- Page refreshes data when tasks change
- Tests verify data fetching and rendering logic
- Mock data tests verify component behavior
- Test coverage for data integration is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### F5: Create Task Functionality and Tests
**Assignee:** Joe  
**Description:** Implement and test functionality to create new tasks  
**Deliverables:**
- Connect TaskForm to server action
- Implement UI for adding new tasks
- Add loading and error states
- Ensure board updates after task creation
- Write tests for form submission
- Test error handling scenarios

**Dependencies:** F4, B5  
**Acceptance Criteria:**
- "Add Task" button opens the task creation form
- Form submits data to the createTask server action
- Loading indicator displays during submission
- Error messages display if submission fails
- Board updates to show the new task on success
- Form clears/resets after successful submission
- Form remains populated with entered data on error
- Tests verify the complete task creation flow
- Tests confirm error states display correctly
- Test coverage for task creation is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### F6: Edit and Delete Task Functionality and Tests
**Assignee:** Joe  
**Description:** Implement and test functionality to edit and delete tasks  
**Deliverables:**
- Connect EditTaskForm to server action
- Implement delete button with confirmation
- Add loading and error states
- Ensure board updates after task modification/deletion
- Write tests for edit and delete functionality
- Test confirmation dialogs
- Test error handling scenarios

**Dependencies:** F5  
**Acceptance Criteria:**
- Edit button opens form pre-populated with task data
- Delete button triggers confirmation dialog
- Edit form submits data to updateTask server action
- Delete confirmation calls deleteTask server action
- Loading indicators display during operations
- Error messages display if operations fail
- Board updates to reflect changes on success
- Tasks disappear from board when deleted
- Tests verify edit and delete flows
- Tests confirm dialogs and error states work correctly
- Test coverage for edit/delete functionality is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

### F7: Drag and Drop Implementation and Tests
**Assignee:** Joe  
**Description:** Implement and test drag and drop functionality  
**Deliverables:**
- Add drag and drop library
- Implement drag sources and drop targets
- Connect drag events to moveTask server action
- Add visual feedback during drag operations
- Write tests for drag and drop interactions
- Test keyboard accessibility for drag operations
- Test edge cases (invalid drops, etc.)

**Dependencies:** F6  
**Acceptance Criteria:**
- Tasks can be dragged between columns
- Visual feedback indicates drag operation in progress
- Drop zones highlight when dragged over
- Task status updates when dropped in a new column
- Operation calls moveTask server action with new status
- Loading indicator shows during status update
- Error handling for failed status updates
- Keyboard users can move tasks between columns
- Tests verify drag and drop behavior
- Tests confirm keyboard accessibility
- Test coverage for drag and drop is >80%

**Definition of Done:** All acceptance criteria are met and all tests pass.

## Integration Tickets

### I1: Integration Testing
**Assignee:** Joe & Azizi  
**Description:** Create comprehensive integration tests  
**Deliverables:**
- Write end-to-end tests for complete task lifecycle
- Test all CRUD operations through the UI
- Verify data persistence across operations
- Test error scenarios and recovery
- Document test coverage

**Dependencies:** F7, B5  
**Acceptance Criteria:**
- End-to-end tests cover task creation workflow
- Tests verify task editing functionality
- Tests confirm task deletion works correctly
- Tests validate drag and drop between columns
- Tests verify data persists between page refreshes
- Tests confirm error states display correctly
- Tests verify recovery from error states
- Documentation explains test coverage
- Tests run successfully in CI environment (if applicable)
- Overall test coverage exceeds 80%

**Definition of Done:** All acceptance criteria are met and all integration tests pass.

### I2: Documentation and README
**Assignee:** Joe & Azizi  
**Description:** Create documentation for the project  
**Deliverables:**
- Update README.md with setup instructions
- Document key features and usage
- Document testing approach and how to run tests
- Update any outdated information in specification files

**Dependencies:** I1  
**Acceptance Criteria:**
- README includes complete setup instructions
- Setup instructions work on a fresh environment
- Key features are documented with screenshots
- Usage instructions are clear and complete
- Testing approach is documented
- Instructions for running tests are provided
- All specification files are up-to-date
- Documentation follows standards in CLAUDE.md
- Documentation is free of typos and errors
- Documentation includes troubleshooting section

**Definition of Done:** All acceptance criteria are met and documentation is complete.

## Development Timeline

### Sprint 1: Foundation
- B1, B6 (Project setup tickets - can be developed in parallel)
- B2, F1 (Second phase setup - after initial setup)
- F2 (after B6 and F1)

### Sprint 2: Core Functionality
- B3, B4, F3 (can be developed in parallel)
- F4 (after B3 and F3)

### Sprint 3: Feature Completion
- B5
- F5, F6, F7 (sequential, each building on the previous)

### Sprint 4: Integration and Polish
- I1, I2

## Estimated Time Requirements

### Backend
- B1: 2-3 hours
- B2: 2-3 hours
- B3: 3-4 hours
- B4: 4-5 hours
- B5: 3-4 hours

### Frontend
- B6: 2-3 hours
- F1: 2-3 hours
- F2: 3-4 hours
- F3: 3-4 hours
- F4: 3-4 hours
- F5: 2-3 hours
- F6: 3-4 hours
- F7: 4-5 hours

### Integration
- I1: 2-3 hours
- I2: 1-2 hours

Total estimated time: 35-48 hours (split between two developers)