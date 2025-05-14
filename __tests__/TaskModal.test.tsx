import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskModal from "@/app/(board)/components/TaskModal";

describe("TaskModal", () => {
  const mockOnClose = jest.fn();
  
  const defaultProps = {
    title: "Test Modal",
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal content</div>
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders when isOpen is true", () => {
    render(<TaskModal {...defaultProps} />);
    
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  
  it("does not render when isOpen is false", () => {
    render(<TaskModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  
  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TaskModal {...defaultProps} />);
    
    await user.click(screen.getByLabelText("Close dialog"));
    
    expect(mockOnClose).toHaveBeenCalled();
  });
  
  it("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<TaskModal {...defaultProps} />);
    
    await user.keyboard("{Escape}");
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
  
  it("calls onClose when clicking outside the modal", async () => {
    const user = userEvent.setup();
    render(<TaskModal {...defaultProps} />);
    
    // Click on the backdrop (outside the modal content)
    await user.click(document.querySelector(".bg-black\\/50")!);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
  
  it("has correct accessibility attributes", () => {
    render(<TaskModal {...defaultProps} />);
    
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    
    const title = screen.getByText("Test Modal");
    expect(title).toHaveAttribute("id", "modal-title");
  });
});