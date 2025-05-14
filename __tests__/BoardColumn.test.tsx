import { render, screen } from '@testing-library/react';
import BoardColumn from '@/app/(board)/components/BoardColumn';
import { Status } from '@/app/lib/types';

describe('BoardColumn', () => {
  it('renders column with title', () => {
    render(<BoardColumn title="To Do" status={Status.todo} />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });
  
  it('displays empty state when no tasks are provided', () => {
    render(<BoardColumn title="To Do" status={Status.todo} />);
    
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
  });
  
  it('renders children when provided', () => {
    render(
      <BoardColumn title="To Do" status={Status.todo}>
        <div data-testid="task-1">Task 1</div>
        <div data-testid="task-2">Task 2</div>
      </BoardColumn>
    );
    
    expect(screen.getByTestId('task-1')).toBeInTheDocument();
    expect(screen.getByTestId('task-2')).toBeInTheDocument();
    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument();
  });
  
  it('displays the count of tasks', () => {
    render(
      <BoardColumn title="To Do" status={Status.todo}>
        <div data-testid="task-1">Task 1</div>
        <div data-testid="task-2">Task 2</div>
      </BoardColumn>
    );
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});