import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders button with default variant', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('renders button with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders button with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  it('renders button with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders button with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText('Ghost')).toBeInTheDocument();
  });

  it('renders button with link variant', () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('renders button with main variant', () => {
    render(<Button variant="main">Main</Button>);
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('renders button with small size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('renders button with large size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('renders button with icon size', () => {
    render(<Button size="icon">Icon</Button>);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled button', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders as child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByText('Link Button')).toBeInTheDocument();
  });

  it('button variants function returns proper classes', () => {
    const defaultClasses = buttonVariants({ variant: 'default', size: 'default' });
    expect(defaultClasses).toContain('inline-flex');
  });

  it('renders with type submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders with type button', () => {
    render(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
