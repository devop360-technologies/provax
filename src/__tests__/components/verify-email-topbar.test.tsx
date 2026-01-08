import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VerifyEmailTopbar } from '@/components/verify-email-topbar';
import { toast } from 'sonner';

// Mock the API
jest.mock('@/lib/api', () => ({
  userApi: {
    sendVerificationEmail: jest.fn(),
  },
  getErrorMessage: jest.fn((error) => error?.message || 'Unknown error'),
}));

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

import { userApi } from '@/lib/api';

describe('VerifyEmailTopbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders verify email message', () => {
    render(<VerifyEmailTopbar email="test@example.com" />);
    expect(screen.getByText('Verify your email address to continue.')).toBeInTheDocument();
  });

  it('renders send email button', () => {
    render(<VerifyEmailTopbar email="test@example.com" />);
    expect(screen.getByText('Send email')).toBeInTheDocument();
  });

  it('renders check circle icon', () => {
    const { container } = render(<VerifyEmailTopbar email="test@example.com" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('calls API when send email button is clicked', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockResolvedValue({ success: true });
    
    render(<VerifyEmailTopbar email="test@example.com" />);
    fireEvent.click(screen.getByText('Send email'));
    
    await waitFor(() => {
      expect(userApi.sendVerificationEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('shows success toast on successful email send', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockResolvedValue({ success: true });
    
    render(<VerifyEmailTopbar email="test@example.com" />);
    fireEvent.click(screen.getByText('Send email'));
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Verification email sent!',
        expect.objectContaining({
          description: 'Please check your email for the verification link.',
        })
      );
    });
  });

  it('shows error toast on failed email send', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockResolvedValue({ 
      success: false, 
      message: 'Rate limit exceeded' 
    });
    
    render(<VerifyEmailTopbar email="test@example.com" />);
    fireEvent.click(screen.getByText('Send email'));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to resend email',
        expect.objectContaining({
          description: 'Rate limit exceeded',
        })
      );
    });
  });

  it('shows error toast on API exception', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    render(<VerifyEmailTopbar email="test@example.com" />);
    fireEvent.click(screen.getByText('Send email'));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong',
        expect.any(Object)
      );
    });
  });

  it('disables button while loading', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );
    
    render(<VerifyEmailTopbar email="test@example.com" />);
    const button = screen.getByText('Send email');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it('shows loader icon while loading', async () => {
    (userApi.sendVerificationEmail as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );
    
    const { container } = render(<VerifyEmailTopbar email="test@example.com" />);
    fireEvent.click(screen.getByText('Send email'));
    
    await waitFor(() => {
      const loader = container.querySelector('.animate-spin');
      expect(loader).toBeInTheDocument();
    });
  });

  it('has correct container styling', () => {
    const { container } = render(<VerifyEmailTopbar email="test@example.com" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('bg-card');
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('w-full');
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('justify-center');
  });
});
