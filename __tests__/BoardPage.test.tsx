import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BoardPage from "@/app/(board)/page";

// Mock the fixtures
jest.mock("../app/fixtures/tasks", () => ({
  mockTasks: [
    {
      id: "task-1",
      title: "Test Task 1",
      description: "Test description 1",
      status: "todo",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z"
    },
    {
      id: "task-2",
      title: "Test Task 2", 
      description: "Test description 2",
      status: "doing",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z"
    },
    {
      id: "task-3",
      title: "Test Task 3",
      description: "Test description 3",
      status: "done",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z"
    }
  ],
  getTasksByStatus: (status: string) => {
    return {
      "todo": [
        {
          id: "task-1",
          title: "Test Task 1",
          description: "Test description 1",
          status: "todo",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z"
        }
      ],
      "doing": [
        {
          id: "task-2",
          title: "Test Task 2", 
          description: "Test description 2",
          status: "doing",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z"
        }
      ],
      "done": [
        {
          id: "task-3",
          title: "Test Task 3",
          description: "Test description 3",
          status: "done",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z"
        }
      ]
    }[status] || [];
  }
}));

describe("BoardPage", () => {
  it("renders the page title", () => {
    render(<BoardPage />);

    expect(screen.getByText("My Tasks")).toBeInTheDocument();
  });

  it("renders all three columns with correct titles", () => {
    render(<BoardPage />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("Doing")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders tasks in their respective columns", () => {
    render(<BoardPage />);

    // Check that tasks are rendered in the correct columns
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getByText("Test Task 3")).toBeInTheDocument();
    
    expect(screen.getByText("Test description 1")).toBeInTheDocument();
    expect(screen.getByText("Test description 2")).toBeInTheDocument();
    expect(screen.getByText("Test description 3")).toBeInTheDocument();
  });
  
  it("renders add task button", () => {
    render(<BoardPage />);
    
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });
  
  it("opens create task modal when add task button is clicked", async () => {
    const user = userEvent.setup();
    render(<BoardPage />);
    
    await user.click(screen.getByRole("button", { name: /add task/i }));
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Create New Task")).toBeInTheDocument();
  });
  
  it("opens edit task modal when a task is clicked", async () => {
    const user = userEvent.setup();
    render(<BoardPage />);
    
    // Click on a task card
    await user.click(screen.getByText("Test Task 1"));
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    
    // Form should be pre-populated with task data
    expect(screen.getByLabelText(/title \*/i)).toHaveValue("Test Task 1");
    expect(screen.getByLabelText(/description/i)).toHaveValue("Test description 1");
  });
});
