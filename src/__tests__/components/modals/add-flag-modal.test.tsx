import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddFlagModal } from '@/components/modals/add-flag-modal';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('AddFlagModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    userName: 'John Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<AddFlagModal {...defaultProps} />);
    expect(screen.getByText('Add User Flag')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<AddFlagModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Add User Flag')).not.toBeInTheDocument();
  });

  it('renders priority dropdown', () => {
    render(<AddFlagModal {...defaultProps} />);
    expect(screen.getByText('Flag Priority')).toBeInTheDocument();
    expect(screen.getByText('Low Priority')).toBeInTheDocument();
  });

  it('renders title input', () => {
    render(<AddFlagModal {...defaultProps} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders Add Note button', () => {
    render(<AddFlagModal {...defaultProps} />);
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    render(<AddFlagModal {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('opens priority dropdown when clicked', () => {
    render(<AddFlagModal {...defaultProps} />);
    
    const dropdownButton = screen.getByText('Low Priority');
    fireEvent.click(dropdownButton);
    
    expect(screen.getByText('Medium Priority')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Critical Priority')).toBeInTheDocument();
  });

  it('selects priority when clicked', () => {
    render(<AddFlagModal {...defaultProps} />);
    
    const dropdownButton = screen.getByText('Low Priority');
    fireEvent.click(dropdownButton);
    fireEvent.click(screen.getByText('High Priority'));
    
    // Dropdown should close and show selected priority
    expect(screen.queryByText('Medium Priority')).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<AddFlagModal {...defaultProps} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('Add Note button is disabled when title is empty', () => {
    render(<AddFlagModal {...defaultProps} />);
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeDisabled();
  });

  it('Add Note button is disabled when description is empty', () => {
    render(<AddFlagModal {...defaultProps} />);
    
    // Fill in title
    const titleInput = screen.getByPlaceholderText('Enter flag title...');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeDisabled();
  });

  it('closes dropdown when priority is selected', () => {
    render(<AddFlagModal {...defaultProps} />);
    
    const dropdownButton = screen.getByText('Low Priority');
    fireEvent.click(dropdownButton);
    
    // Select Medium Priority
    fireEvent.click(screen.getByText('Medium Priority'));
    
    // Dropdown should be closed
    expect(screen.queryByText('High Priority')).not.toBeInTheDocument();
  });

  it('displays all priority options', () => {
    render(<AddFlagModal {...defaultProps} />);
    
    const dropdownButton = screen.getAllByText('Low Priority')[0];
    fireEvent.click(dropdownButton);
    
    // Low Priority appears twice (in button and dropdown)
    expect(screen.getAllByText('Low Priority').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Medium Priority')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Critical Priority')).toBeInTheDocument();
  });

  it('renders chevron icon in dropdown', () => {
    const { container } = render(<AddFlagModal {...defaultProps} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('rotates chevron when dropdown is open', () => {
    const { container } = render(<AddFlagModal {...defaultProps} />);
    
    const dropdownButton = screen.getByText('Low Priority');
    fireEvent.click(dropdownButton);
    
    const chevron = container.querySelector('.rotate-180');
    expect(chevron).toBeInTheDocument();
  });
});
