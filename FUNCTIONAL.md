# Kanban Board: Functional Specification

## Overview

A collaborative Kanban board application where users can manage tasks by adding, updating, and moving them between columns: "To Do", "Doing", and "Done".

## Core Features

### 1. Board Structure
- Three columns: "To Do", "Doing", "Done"
- Each column displays task cards in a vertical list
- Visual distinction between columns
- Responsive layout that works on desktop devices

### 2. Task Management
- **Create:** Users can add new tasks with a title and description
- **Read:** Tasks display in the appropriate column based on their status
- **Update:** 
  - Users can edit task title and description
  - Users can move tasks between columns via drag and drop
- **Delete:** Users can remove tasks from the board

### 3. Task Properties
- **Required:**
  - Unique ID (generated)
  - Title (text, required)
  - Status (enum: "todo", "doing", "done")
  - Created date (timestamp, generated)
- **Optional:**
  - Description (text)
  - Updated date (timestamp, generated on changes)

### 4. Persistence
- All task data stored in PostgreSQL database
- Changes sync automatically without page refresh
- Data persists between browser sessions

### 5. User Interface
- Clean, minimalist design using Tailwind CSS and Shadcn UI
- Intuitive drag-and-drop functionality for moving tasks
- Modal forms for creating/editing tasks
- Responsive layout adapting to different screen sizes

## Non-functional Requirements

### Performance
- Initial board load < 2 seconds
- Task operations (create, update, delete) < 1 second
- Smooth drag and drop animations

### Usability
- Clear visual feedback for task operations
- Intuitive interface requiring minimal instruction
- Error messages for failed operations

### Security
- Input validation to prevent injection attacks
- Rate limiting on API endpoints

### Accessibility
- Semantic HTML structure
- Keyboard navigation for all features
- ARIA attributes for screen readers
- Sufficient color contrast

## Out of Scope

- User authentication/authorization
- Multiple boards
- Task assignments
- Comments/attachments on tasks
- Deployment/hosting considerations

## References
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical implementation details
- [CLAUDE.md](CLAUDE.md) - Development standards and guidelines