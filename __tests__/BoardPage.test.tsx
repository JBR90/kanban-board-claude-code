import { render, screen } from '@testing-library/react';
import BoardPage from '../app/(board)/page';

describe('BoardPage', () => {
  it('renders the page title', () => {
    render(<BoardPage />);
    
    expect(screen.getByText('My Tasks')).toBeInTheDocument();
  });
  
  it('renders all three columns with correct titles', () => {
    render(<BoardPage />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Doing')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
  
  it('renders an example task in the To Do column', () => {
    render(<BoardPage />);
    
    expect(screen.getByText('Example Task')).toBeInTheDocument();
    expect(screen.getByText('This is an example task to demonstrate the UI components.')).toBeInTheDocument();
  });
});