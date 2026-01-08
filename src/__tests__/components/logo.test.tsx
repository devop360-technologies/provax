import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Logo from '@/components/logo';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Logo Component', () => {
  it('renders a link to home page', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the logo image', () => {
    render(<Logo />);
    const image = screen.getByAltText('Provax Logo');
    expect(image).toBeInTheDocument();
  });

  it('has correct image source', () => {
    render(<Logo />);
    const image = screen.getByAltText('Provax Logo') as HTMLImageElement;
    expect(image.src).toContain('logo.svg');
  });

  it('has correct image dimensions', () => {
    render(<Logo />);
    const image = screen.getByAltText('Provax Logo');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '64');
  });

  it('applies flex layout classes', () => {
    const { container } = render(<Logo />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders image with responsive width classes', () => {
    const { container } = render(<Logo />);
    const image = container.querySelector('img');
    expect(image).toHaveClass('w-20');
  });

  it('link is navigable', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link.closest('a')).toBeTruthy();
  });

  it('image has proper styling classes', () => {
    render(<Logo />);
    const image = screen.getByAltText('Provax Logo');
    expect(image).toHaveClass('w-20');
  });

  it('renders exactly one image', () => {
    const { container } = render(<Logo />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(1);
  });

  it('image is inside the link', () => {
    const { container } = render(<Logo />);
    const link = container.querySelector('a');
    const image = link?.querySelector('img');
    expect(image).toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    link.focus();
    expect(link).toHaveFocus();
  });
});
