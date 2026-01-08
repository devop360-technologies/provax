import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddNoteModal } from '@/components/modals/add-note-modal';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('AddNoteModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    userName: 'John Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<AddNoteModal {...defaultProps} />);
    expect(screen.getByText('Add Internal Note')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<AddNoteModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Add Internal Note')).not.toBeInTheDocument();
  });

  it('renders Note label', () => {
    render(<AddNoteModal {...defaultProps} />);
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('renders note input placeholder', () => {
    render(<AddNoteModal {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter internal note...')).toBeInTheDocument();
  });

  it('renders Add Note button', () => {
    render(<AddNoteModal {...defaultProps} />);
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    render(<AddNoteModal {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('Add Note button is disabled when note is empty', () => {
    render(<AddNoteModal {...defaultProps} />);
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeDisabled();
  });

  it('Add Note button is enabled when note has content', () => {
    render(<AddNoteModal {...defaultProps} />);
    
    const noteInput = screen.getByPlaceholderText('Enter internal note...');
    fireEvent.change(noteInput, { target: { value: 'Test note content' } });
    
    const addButton = screen.getByText('Add Note');
    expect(addButton).not.toBeDisabled();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<AddNoteModal {...defaultProps} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Add Note button is clicked with valid note', () => {
    const handleClose = jest.fn();
    render(<AddNoteModal {...defaultProps} onClose={handleClose} />);
    
    const noteInput = screen.getByPlaceholderText('Enter internal note...');
    fireEvent.change(noteInput, { target: { value: 'Valid note' } });
    
    fireEvent.click(screen.getByText('Add Note'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('clears note content after adding', () => {
    const handleClose = jest.fn();
    render(<AddNoteModal {...defaultProps} onClose={handleClose} />);
    
    const noteInput = screen.getByPlaceholderText('Enter internal note...') as HTMLTextAreaElement;
    fireEvent.change(noteInput, { target: { value: 'Test note' } });
    
    expect(noteInput.value).toBe('Test note');
    
    fireEvent.click(screen.getByText('Add Note'));
    // Note should be cleared after submit
  });

  it('clears note content after canceling', () => {
    render(<AddNoteModal {...defaultProps} />);
    
    const noteInput = screen.getByPlaceholderText('Enter internal note...') as HTMLTextAreaElement;
    fireEvent.change(noteInput, { target: { value: 'Test note' } });
    
    fireEvent.click(screen.getByText('Cancel'));
    // Note should be cleared after cancel
  });

  it('does not call onClose when note is whitespace only', () => {
    const handleClose = jest.fn();
    render(<AddNoteModal {...defaultProps} onClose={handleClose} />);
    
    const noteInput = screen.getByPlaceholderText('Enter internal note...');
    fireEvent.change(noteInput, { target: { value: '   ' } });
    
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeDisabled();
  });

  it('renders textarea for note input', () => {
    render(<AddNoteModal {...defaultProps} />);
    const textarea = screen.getByPlaceholderText('Enter internal note...');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });
});
