import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BaseModal } from '@/components/ui/modal-base';

describe('BaseModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <p>Modal Content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<BaseModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders title', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders save button with default text', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders cancel button with default text', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders custom save button text', () => {
    render(<BaseModal {...defaultProps} saveButtonText="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders custom cancel button text', () => {
    render(<BaseModal {...defaultProps} cancelButtonText="Dismiss" />);
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<BaseModal {...defaultProps} onClose={handleClose} />);
    
    // Find the X close button
    const closeButtons = screen.getAllByRole('button');
    const xButton = closeButtons.find(btn => btn.querySelector('svg'));
    if (xButton) {
      fireEvent.click(xButton);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('calls onSave when save button is clicked', () => {
    const handleSave = jest.fn();
    render(<BaseModal {...defaultProps} onSave={handleSave} />);
    
    fireEvent.click(screen.getByText('Save'));
    expect(handleSave).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const handleCancel = jest.fn();
    render(<BaseModal {...defaultProps} onCancel={handleCancel} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('calls onClose when cancel button clicked and onCancel not provided', () => {
    const handleClose = jest.fn();
    render(<BaseModal {...defaultProps} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<BaseModal {...defaultProps} isLoading />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('disables buttons when loading', () => {
    render(<BaseModal {...defaultProps} isLoading />);
    const saveButton = screen.getByText('Processing...');
    const cancelButton = screen.getByText('Cancel');
    
    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BaseModal {...defaultProps} className="custom-modal" />
    );
    expect(container.querySelector('.custom-modal')).toBeInTheDocument();
  });

  it('applies correct maxWidth - sm', () => {
    const { container } = render(
      <BaseModal {...defaultProps} maxWidth="sm" />
    );
    expect(container.querySelector('.max-w-sm')).toBeInTheDocument();
  });

  it('applies correct maxWidth - lg', () => {
    const { container } = render(
      <BaseModal {...defaultProps} maxWidth="lg" />
    );
    expect(container.querySelector('.max-w-lg')).toBeInTheDocument();
  });

  it('applies correct maxWidth - xl', () => {
    const { container } = render(
      <BaseModal {...defaultProps} maxWidth="xl" />
    );
    expect(container.querySelector('.max-w-xl')).toBeInTheDocument();
  });

  it('applies correct maxWidth - 2xl by default', () => {
    const { container } = render(
      <BaseModal {...defaultProps} />
    );
    expect(container.querySelector('.max-w-2xl')).toBeInTheDocument();
  });
});
