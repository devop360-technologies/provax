import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResetPasswordModal } from '@/components/modals/reset-password-modal';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('ResetPasswordModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    userName: 'John Doe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    expect(screen.getByText('Access Reset Password')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ResetPasswordModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Access Reset Password')).not.toBeInTheDocument();
  });

  it('renders user name in message', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders Enable button', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    expect(screen.getByText('Enable')).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onClose when Enable button is clicked', () => {
    const handleClose = jest.fn();
    render(<ResetPasswordModal {...defaultProps} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Enable'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<ResetPasswordModal {...defaultProps} onClose={handleClose} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('displays confirmation message', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    const message = screen.getByText(/Are you sure you want to enable password reset access/);
    expect(message).toBeInTheDocument();
  });

  it('displays user name with correct styling', () => {
    render(<ResetPasswordModal {...defaultProps} userName="Jane Smith" />);
    const userName = screen.getByText('Jane Smith');
    expect(userName).toHaveClass('font-semibold');
    expect(userName).toHaveClass('text-white');
  });

  it('renders message about user being able to reset password', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    const message = screen.getByText(/the user will be able to reset their own password/);
    expect(message).toBeInTheDocument();
  });

  it('Enable button is not disabled', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    const enableButton = screen.getByText('Enable');
    expect(enableButton).not.toBeDisabled();
  });

  it('Cancel button is not disabled', () => {
    render(<ResetPasswordModal {...defaultProps} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).not.toBeDisabled();
  });

  it('displays different user name when prop changes', () => {
    const { rerender } = render(<ResetPasswordModal {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    rerender(<ResetPasswordModal {...defaultProps} userName="Alice Smith" />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });
});
