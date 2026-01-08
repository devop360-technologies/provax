import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Input } from '@/components/ui/input';

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Input Component', () => {
  it('renders an input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('accepts placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('accepts type prop', () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('accepts value prop', () => {
    const { container } = render(<Input value="test value" readOnly />);
    const input = container.querySelector('input');
    expect(input).toHaveValue('test value');
  });

  it('accepts disabled prop', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('accepts className prop', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('applies data-slot attribute', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('handles multiple input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url'];
    
    types.forEach((type) => {
      const { container, unmount } = render(<Input type={type as any} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('renders with required attribute', () => {
    const { container } = render(<Input required />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('required');
  });

  it('supports aria attributes', () => {
    const { container } = render(<Input aria-label="test input" aria-describedby="test-desc" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-label', 'test input');
    expect(input).toHaveAttribute('aria-describedby', 'test-desc');
  });

  it('applies focus styles', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('outline-none');
    expect(input).toHaveClass('focus-visible:ring-ring/50');
  });

  it('handles readonly state', () => {
    render(<Input readOnly value="readonly value" />);
    const input = screen.getByDisplayValue('readonly value');
    expect(input).toHaveAttribute('readonly');
  });

  it('accepts id attribute', () => {
    const { container } = render(<Input id="test-input" />);
    const input = container.querySelector('input#test-input');
    expect(input).toBeInTheDocument();
  });

  it('supports name attribute', () => {
    const { container } = render(<Input name="username" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('name', 'username');
  });

  it('supports min and max for number inputs', () => {
    const { container } = render(<Input type="number" min="0" max="100" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('supports pattern attribute', () => {
    const { container } = render(<Input pattern="[0-9]{3}" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('pattern', '[0-9]{3}');
  });
});
