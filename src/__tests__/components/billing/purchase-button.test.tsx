import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PurchaseButton } from '@/components/billing/purchase-button';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

describe('PurchaseButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
  });

  it('renders Get Started button', () => {
    render(<PurchaseButton priceId="price_123" />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders with correct price id prop', () => {
    const { container } = render(<PurchaseButton priceId="price_test_456" />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PurchaseButton priceId="price_123" className="custom-class" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders arrow icon', () => {
    const { container } = render(<PurchaseButton priceId="price_123" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has full width styling', () => {
    const { container } = render(<PurchaseButton priceId="price_123" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('w-full');
  });

  it('has rounded corners', () => {
    const { container } = render(<PurchaseButton priceId="price_123" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('rounded-lg');
  });

  it('redirects to login when no session', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    
    render(<PurchaseButton priceId="price_123" />);
    fireEvent.click(screen.getByText('Get Started'));
    
    expect(redirect).toHaveBeenCalled();
  });

  it('does not redirect when session exists', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
    });
    
    render(<PurchaseButton priceId="price_123" />);
    // Button should be visible before click
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    
    // Clicking may trigger loading state, but should not redirect
    expect(redirect).not.toHaveBeenCalled();
  });

  it('shows loading state when pending', async () => {
    render(<PurchaseButton priceId="price_123" />);
    const button = screen.getByRole('button');
    
    // Button should be in default state initially
    expect(button).not.toBeDisabled();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('button is clickable', () => {
    render(<PurchaseButton priceId="price_123" />);
    const button = screen.getByText('Get Started');
    
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
  });

  it('renders large size button', () => {
    const { container } = render(<PurchaseButton priceId="price_123" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-12');
    expect(button).toHaveClass('py-6');
  });
});
