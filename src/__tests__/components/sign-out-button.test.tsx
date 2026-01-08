import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignOutButton } from '@/components/sign-out-button';

// Mock next-auth/react
const mockSignOut = jest.fn();
jest.mock('next-auth/react', () => ({
  signOut: () => mockSignOut(),
}));

describe('SignOutButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignOut.mockResolvedValue(undefined);
  });

  it('should render with default text', () => {
    render(<SignOutButton />);
    
    expect(screen.getByRole('button')).toHaveTextContent('Sign Out');
  });

  it('should render with custom children', () => {
    render(<SignOutButton>Log Out</SignOutButton>);
    
    expect(screen.getByRole('button')).toHaveTextContent('Log Out');
  });

  it('should apply custom className', () => {
    render(<SignOutButton className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('should use outline variant by default', () => {
    render(<SignOutButton />);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('border');
  });

  it('should accept different variants', () => {
    render(<SignOutButton variant="destructive" />);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('destructive');
  });

  it('should call signOut when clicked', async () => {
    render(<SignOutButton />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('should handle signOut errors gracefully', async () => {
    mockSignOut.mockRejectedValue(new Error('Sign out failed'));
    
    render(<SignOutButton />);
    
    const button = screen.getByRole('button');
    
    // Should not throw
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
