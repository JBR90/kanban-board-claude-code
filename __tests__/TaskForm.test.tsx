import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "@/app/(board)/components/TaskForm";
import { Status } from "@/app/lib/types";

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  
  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
    initialStatus: Status.todo,
    isSubmitting: false
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders the form with empty fields", () => {
    render(<TaskForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/title \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create task/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
  
  it("prevents submission when title is empty", async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);
    
    // Try to submit without filling the title
    await user.click(screen.getByRole("button", { name: /create task/i }));
    
    // Form validation should prevent submission
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  
  it("submits the form with valid data", async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);
    
    // Fill the form
    await user.type(screen.getByLabelText(/title \*/i), "Test Task");
    await user.type(screen.getByLabelText(/description/i), "This is a test description");
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /create task/i }));
    
    // Verify the onSubmit was called with the correct data
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Task",
        description: "This is a test description",
        status: Status.todo
      });
    });
  });
  
  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);
    
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
  
  it("calls onCancel when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);
    
    await user.keyboard("{Escape}");
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
  
  it("disables submit button when isSubmitting is true", () => {
    render(<TaskForm {...defaultProps} isSubmitting={true} />);
    
    expect(screen.getByRole("button", { name: /creating/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  });
  
  it("can submit form by pressing Enter", async () => {
    const user = userEvent.setup();
    render(<TaskForm {...defaultProps} />);
    
    // Fill the title (required field)
    await user.type(screen.getByLabelText(/title \*/i), "Test Task");
    
    // Press Enter to submit the form
    await user.keyboard("{Enter}");
    
    // Verify the onSubmit was called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});