import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge, badgeVariants } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders badge with text', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders badge with data-slot attribute', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('data-slot', 'badge');
  });

  it('renders badge with default variant', () => {
    render(<Badge data-testid="badge">Default</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders badge with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders badge with destructive variant', () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText('Destructive')).toBeInTheDocument();
  });

  it('renders badge with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  it('renders badge with custom className', () => {
    render(<Badge className="custom-badge" data-testid="badge">Custom</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('custom-badge');
  });

  it('renders badge as child when asChild is true', () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>
    );
    expect(screen.getByText('Link Badge')).toBeInTheDocument();
  });

  it('badge variants function returns proper classes', () => {
    const defaultClasses = badgeVariants({ variant: 'default' });
    expect(defaultClasses).toContain('inline-flex');
  });

  it('badge variants function returns secondary classes', () => {
    const secondaryClasses = badgeVariants({ variant: 'secondary' });
    expect(secondaryClasses).toContain('inline-flex');
  });

  it('badge variants function returns destructive classes', () => {
    const destructiveClasses = badgeVariants({ variant: 'destructive' });
    expect(destructiveClasses).toContain('inline-flex');
  });

  it('badge variants function returns outline classes', () => {
    const outlineClasses = badgeVariants({ variant: 'outline' });
    expect(outlineClasses).toContain('inline-flex');
  });

  it('renders badge with children content', () => {
    render(
      <Badge>
        <span>Icon</span> Label
      </Badge>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText(/Label/)).toBeInTheDocument();
  });
});
