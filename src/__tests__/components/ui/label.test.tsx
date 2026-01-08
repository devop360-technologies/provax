/**
 * Tests for Label component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  it('should render with text', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should have data-slot attribute', () => {
    render(<Label data-testid="label">Label</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('should apply custom className', () => {
    render(<Label className="custom-label" data-testid="label">Label</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).toContain('custom-label');
  });

  it('should render with htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('should render children elements', () => {
    render(
      <Label>
        <span data-testid="icon">*</span>
        Required Field
      </Label>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Required Field')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    render(<Label data-custom="test" data-testid="label">Label</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('data-custom', 'test');
  });

  it('should have correct default styling classes', () => {
    render(<Label data-testid="label">Label</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).toContain('text-sm');
    expect(label.className).toContain('font-medium');
  });
});
