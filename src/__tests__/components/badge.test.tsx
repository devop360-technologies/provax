import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Badge } from '@/components/ui/badge';

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Badge Component', () => {
  it('renders a badge element', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toBeInTheDocument();
  });

  it('renders with destructive variant', () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toBeInTheDocument();
  });

  it('renders with outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders with text content', () => {
    render(<Badge>Badge Text</Badge>);
    expect(screen.getByText('Badge Text')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Badge>Styled</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toHaveClass('rounded-md');
    expect(badge).toHaveClass('px-2');
    expect(badge).toHaveClass('py-0.5');
  });

  it('renders as span element', () => {
    const { container } = render(<Badge>Content</Badge>);
    const badge = container.querySelector('span[data-slot="badge"]');
    expect(badge?.tagName).toBe('SPAN');
  });

  it('supports HTML content', () => {
    const { container } = render(
      <Badge>
        <span>Badge with </span>
        <strong>bold</strong>
      </Badge>
    );
    expect(screen.getByText('Badge with')).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
  });

  it('handles all variant types', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const;
    
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>Test {variant}</Badge>);
      const badge = screen.getByText(`Test ${variant}`);
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  it('applies data-slot attribute', () => {
    const { container } = render(<Badge>Badge</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  it('is accessible', () => {
    const { container } = render(<Badge>Status: Active</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.textContent).toBe('Status: Active');
  });
});
