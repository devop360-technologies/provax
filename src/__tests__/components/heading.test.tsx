import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Heading from '@/components/heading';

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Heading Component', () => {
  it('renders an h1 element by default', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('renders different heading levels', () => {
    const levels: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    
    levels.forEach((level) => {
      const { unmount } = render(<Heading as={level}>Heading {level}</Heading>);
      const heading = screen.getByRole('heading', { level: parseInt(level.charAt(1)) });
      expect(heading).toBeInTheDocument();
      unmount();
    });
  });

  it('applies default size variant', () => {
    render(<Heading>Default Size</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-lg');
  });

  it('applies different size variants', () => {
    const sizes = ['default', 'lg', 'xl', '2xl', '3xl'] as const;
    
    sizes.forEach((size) => {
      const { unmount } = render(<Heading size={size}>Size {size}</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(<Heading className="custom-class">Custom</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('renders with text content', () => {
    const text = 'Important Heading';
    render(<Heading>{text}</Heading>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('applies font-mono class', () => {
    render(<Heading>Font Test</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-mono');
  });

  it('applies lg size with correct classes', () => {
    render(<Heading size="lg">Large</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('applies 2xl size with correct classes', () => {
    render(<Heading size="2xl">Very Large</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('applies 3xl size with correct classes', () => {
    render(<Heading size="3xl">Extra Large</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-extrabold');
    expect(heading).toHaveClass('tracking-tighter');
  });

  it('passes through HTML attributes', () => {
    render(<Heading id="test-id" data-testid="custom-heading">Attributes</Heading>);
    const heading = screen.getByTestId('custom-heading');
    expect(heading).toHaveAttribute('id', 'test-id');
  });

  it('renders children correctly', () => {
    render(
      <Heading>
        <span>Nested</span> Content
      </Heading>
    );
    expect(screen.getByText('Nested')).toBeInTheDocument();
    expect(screen.getByText(/Content/)).toBeInTheDocument();
  });
});
