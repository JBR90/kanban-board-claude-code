// Type definitions for the application

export enum Status {
  todo = "todo",
  doing = "doing",
  done = "done"
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}