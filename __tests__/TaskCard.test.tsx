import { render, screen } from "@testing-library/react";
import TaskCard from "@/app/(board)/components/TaskCard";

describe("TaskCard", () => {
  const defaultProps = {
    id: "task-1",
    title: "Task Title",
  };

  it("renders the task title", () => {
    render(<TaskCard {...defaultProps} />);

    expect(screen.getByText("Task Title")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <TaskCard {...defaultProps} description="This is a task description" />
    );

    expect(screen.getByText("This is a task description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<TaskCard {...defaultProps} />);

    const article = screen.getByRole("article");
    expect(article.textContent).not.toContain("description");
  });

  it("renders edit and delete buttons", () => {
    render(<TaskCard {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /edit task/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete task/i })
    ).toBeInTheDocument();
  });

  it("uses the task id for accessibility", () => {
    render(<TaskCard {...defaultProps} />);

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", "task-task-1-title");
    expect(screen.getByText("Task Title")).toHaveAttribute(
      "id",
      "task-task-1-title"
    );
  });
});
