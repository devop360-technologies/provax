import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeToggle } from '@/components/mode-toggle';

// Mock next-themes
const mockSetTheme = jest.fn();
let mockTheme = 'light';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe('ModeToggle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = 'light';
  });

  it('should render the toggle button', () => {
    render(<ModeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should have accessible label', () => {
    render(<ModeToggle />);
    
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });

  it('should toggle from light to dark theme', () => {
    mockTheme = 'light';
    render(<ModeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle from dark to light theme', () => {
    mockTheme = 'dark';
    render(<ModeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should render sun and moon SVG icons', () => {
    render(<ModeToggle />);
    
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('should have outline variant styling', () => {
    render(<ModeToggle />);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('border');
  });
});
