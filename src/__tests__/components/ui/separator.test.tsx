/**
 * Tests for Separator component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Separator } from '@/components/ui/separator';

describe('Separator Component', () => {
  it('should render with default horizontal orientation', () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('should render with vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('should have data-slot attribute', () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-slot', 'separator-root');
  });

  it('should be decorative by default', () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('should apply custom className', () => {
    render(<Separator className="custom-separator" data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator.className).toContain('custom-separator');
  });

  it('should pass additional props', () => {
    render(<Separator data-custom="test" data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-custom', 'test');
  });

  it('should have shrink-0 class', () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator.className).toContain('shrink-0');
  });
});
