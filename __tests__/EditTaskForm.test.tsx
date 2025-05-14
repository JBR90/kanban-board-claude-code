import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTaskForm from "@/app/(board)/components/EditTaskForm";
import { Status } from "@/app/lib/types";

describe("EditTaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  
  const sampleTask = {
    id: "task-1",
    title: "Sample Task",
    description: "This is a sample task description",
    status: Status.todo,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z"
  };
  
  const defaultProps = {
    task: sampleTask,
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
    isSubmitting: false
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders the form with pre-populated fields", () => {
    render(<EditTaskForm {...defaultProps} />);
    
    // Check form fields are pre-populated with task data
    expect(screen.getByLabelText(/title \*/i)).toHaveValue("Sample Task");
    expect(screen.getByLabelText(/description/i)).toHaveValue("This is a sample task description");
    expect(screen.getByLabelText(/status/i)).toHaveValue(Status.todo);
    
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
  
  it("prevents submission when title is cleared", async () => {
    const user = userEvent.setup();
    render(<EditTaskForm {...defaultProps} />);
    
    // Clear the title field
    await user.clear(screen.getByLabelText(/title \*/i));
    
    // Try to submit with empty title
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    
    // Form validation should prevent submission
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  
  it("updates task with edited data", async () => {
    const user = userEvent.setup();
    render(<EditTaskForm {...defaultProps} />);
    
    // Clear and update the title field
    await user.clear(screen.getByLabelText(/title \*/i));
    await user.type(screen.getByLabelText(/title \*/i), "Updated Task Title");
    
    // Clear and update the description field
    await user.clear(screen.getByLabelText(/description/i));
    await user.type(screen.getByLabelText(/description/i), "Updated description");
    
    // Change the status
    await user.selectOptions(screen.getByLabelText(/status/i), [Status.doing]);
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    
    // Verify the onSubmit was called with the updated data
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith("task-1", {
        title: "Updated Task Title",
        description: "Updated description",
        status: Status.doing
      });
    });
  });
  
  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<EditTaskForm {...defaultProps} />);
    
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
  
  it("calls onCancel when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<EditTaskForm {...defaultProps} />);
    
    await user.keyboard("{Escape}");
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
  
  it("disables buttons when isSubmitting is true", () => {
    render(<EditTaskForm {...defaultProps} isSubmitting={true} />);
    
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  });
  
  it("updates form when task prop changes", async () => {
    const { rerender } = render(<EditTaskForm {...defaultProps} />);
    
    // Initial verification
    expect(screen.getByLabelText(/title \*/i)).toHaveValue("Sample Task");
    
    // Update the task prop
    const updatedTask = {
      ...sampleTask,
      title: "New Task Title",
      description: "New task description",
      status: Status.doing
    };
    
    // Re-render with new task
    rerender(<EditTaskForm {...defaultProps} task={updatedTask} />);
    
    // Check that the form fields updated
    expect(screen.getByLabelText(/title \*/i)).toHaveValue("New Task Title");
    expect(screen.getByLabelText(/description/i)).toHaveValue("New task description");
    expect(screen.getByLabelText(/status/i)).toHaveValue(Status.doing);
  });
});