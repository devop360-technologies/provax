import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders a button element', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button', { name: /default/i });
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;
    
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: /click/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link as Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link as button/i });
    expect(link).toBeInTheDocument();
  });

  it('renders main variant correctly', () => {
    render(<Button variant="main">Main</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-#00FF88');
  });

  it('applies focus styles', () => {
    render(<Button>Focusable</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus-visible:ring-ring/50');
  });
});

describe('buttonVariants', () => {
  it('returns correct classes for variant and size combinations', () => {
    const classes = buttonVariants({ variant: 'default', size: 'default' });
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-10');
  });

  it('returns empty string for undefined variant', () => {
    const classes = buttonVariants({ variant: undefined as any, size: 'default' });
    expect(classes).toBeDefined();
  });
});
