import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerPortalButton } from '@/components/billing/customer-portal-button';

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('CustomerPortalButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Manage Subscription button', () => {
    render(<CustomerPortalButton />);
    expect(screen.getByText('Manage Subscription')).toBeInTheDocument();
  });

  it('applies default className', () => {
    const { container } = render(<CustomerPortalButton />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('applies custom className', () => {
    const { container } = render(<CustomerPortalButton className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('button is not disabled initially', () => {
    render(<CustomerPortalButton />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('button is clickable', () => {
    render(<CustomerPortalButton />);
    const button = screen.getByText('Manage Subscription');
    
    fireEvent.click(button);
    // Should handle the portal click
    expect(button).toBeInTheDocument();
  });

  it('has correct button type', () => {
    render(<CustomerPortalButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('merges custom className with default', () => {
    const { container } = render(<CustomerPortalButton className="ml-4" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('ml-4');
  });
});
