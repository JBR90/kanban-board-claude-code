import { render, screen } from '@testing-library/react';
import BoardLayout from '@/app/(board)/layout';

describe('BoardLayout', () => {
  it('renders the header with title', () => {
    render(
      <BoardLayout>
        <div data-testid="child">Test Content</div>
      </BoardLayout>
    );
    
    expect(screen.getByText('Kanban Board')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  
  it('renders the main content area', () => {
    render(
      <BoardLayout>
        <div data-testid="child">Test Content</div>
      </BoardLayout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId('child'));
  });
});