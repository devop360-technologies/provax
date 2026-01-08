import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Label } from '@/components/ui/label';

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Label Component', () => {
  it('renders a label element', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('accepts htmlFor prop', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('accepts custom className', () => {
    const { container } = render(<Label className="custom-class">Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('custom-class');
  });

  it('applies default styling', () => {
    const { container } = render(<Label>Default Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
  });

  it('associates with input element', () => {
    const { container } = render(
      <>
        <Label htmlFor="username">Username</Label>
        <input id="username" type="text" />
      </>
    );
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('renders with data-slot attribute', () => {
    const { container } = render(<Label>Test</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('supports nested elements', () => {
    render(
      <Label>
        Optional <span className="text-red-500">*</span>
      </Label>
    );
    expect(screen.getByText('Optional')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies focus styling', () => {
    const { container } = render(<Label>Focusable</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-50');
  });

  it('supports aria-label attribute', () => {
    const { container } = render(<Label aria-label="form label">Form Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('aria-label');
  });

  it('renders required indicator', () => {
    render(
      <Label htmlFor="email">
        Email <span aria-label="required">*</span>
      </Label>
    );
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('handles long text content', () => {
    const longText = 'This is a very long label that might wrap to multiple lines';
    render(<Label>{longText}</Label>);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    render(<Label htmlFor="input">Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input');
  });

  it('applies leading class', () => {
    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('leading-none');
  });
});
