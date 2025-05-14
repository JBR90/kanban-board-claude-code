import { Status, Task } from "../lib/types";

// Mock tasks for development and testing
export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Implement UI components",
    description:
      "Create basic UI components for the Kanban board application including BoardColumn and TaskCard.",
    status: Status.done,
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-04-02T15:30:00Z",
  },
  {
    id: "task-2",
    title: "Setup testing infrastructure",
    description:
      "Configure Jest and React Testing Library for component testing.",
    status: Status.done,
    createdAt: "2023-04-03T09:15:00Z",
    updatedAt: "2023-04-03T14:20:00Z",
  },
  {
    id: "task-3",
    title: "Create task form components",
    description:
      "Implement forms for adding and editing tasks with validation and error handling.",
    status: Status.doing,
    createdAt: "2023-04-04T11:30:00Z",
    updatedAt: "2023-04-05T13:45:00Z",
  },
  {
    id: "task-4",
    title: "Connect to backend API",
    description:
      "Integrate frontend components with backend API endpoints for data fetching and mutations.",
    status: Status.todo,
    createdAt: "2023-04-06T08:00:00Z",
    updatedAt: "2023-04-06T08:00:00Z",
  },
  {
    id: "task-5",
    title: "Implement drag and drop",
    description:
      "Add drag and drop functionality to move tasks between columns.",
    status: Status.todo,
    createdAt: "2023-04-07T10:30:00Z",
    updatedAt: "2023-04-07T10:30:00Z",
  },
];

// Helper function to get tasks by status
export function getTasksByStatus(status: Status): Task[] {
  return mockTasks.filter((task) => task.status === status);
}

// Helper function to get a task by ID
export function getTaskById(id: string): Task | undefined {
  return mockTasks.find((task) => task.id === id);
}
