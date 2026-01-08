import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton Component', () => {
  it('renders skeleton element', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders skeleton with custom className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton');
  });

  it('renders skeleton with animate-pulse class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });

  it('renders skeleton with rounded-md class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-md');
  });

  it('renders skeleton with bg-muted class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('bg-muted');
  });

  it('renders skeleton with custom width', () => {
    render(<Skeleton style={{ width: '100px' }} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '100px' });
  });

  it('renders skeleton with custom height', () => {
    render(<Skeleton style={{ height: '50px' }} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ height: '50px' });
  });

  it('renders multiple skeletons', () => {
    render(
      <>
        <Skeleton data-testid="skeleton-1" />
        <Skeleton data-testid="skeleton-2" />
        <Skeleton data-testid="skeleton-3" />
      </>
    );
    expect(screen.getByTestId('skeleton-1')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-2')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-3')).toBeInTheDocument();
  });

  it('renders skeleton card layout', () => {
    render(
      <div data-testid="card">
        <Skeleton data-testid="skeleton-image" className="h-32 w-full" />
        <Skeleton data-testid="skeleton-title" className="h-4 w-3/4" />
        <Skeleton data-testid="skeleton-text" className="h-4 w-1/2" />
      </div>
    );
    expect(screen.getByTestId('skeleton-image')).toHaveClass('h-32', 'w-full');
    expect(screen.getByTestId('skeleton-title')).toHaveClass('h-4', 'w-3/4');
    expect(screen.getByTestId('skeleton-text')).toHaveClass('h-4', 'w-1/2');
  });
});
