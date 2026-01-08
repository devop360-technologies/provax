/**
 * Tests for Progress component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from '@/components/ui/progress';

describe('Progress Component', () => {
  it('should render with default value', () => {
    render(<Progress data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
  });

  it('should render with specified value', () => {
    render(<Progress value={50} data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
  });

  it('should render with 0 value', () => {
    render(<Progress value={0} data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
  });

  it('should render with 100 value', () => {
    render(<Progress value={100} data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Progress className="custom-progress" data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress.className).toContain('custom-progress');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should have rounded-full class', () => {
    render(<Progress data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress.className).toContain('rounded-full');
  });

  it('should have overflow-hidden class', () => {
    render(<Progress data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress.className).toContain('overflow-hidden');
  });

  it('should pass additional props', () => {
    render(<Progress data-custom="test" data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('data-custom', 'test');
  });
});
