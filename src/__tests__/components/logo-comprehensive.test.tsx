/**
 * Comprehensive tests for Logo component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '@/components/logo';

// Mock Next.js Image and Link
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width: number; height: number; className?: string }) => {
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
    return <a href={href} className={className}>{children}</a>;
  },
}));

describe('Logo Component', () => {
  it('should render logo image', () => {
    render(<Logo />);
    const logo = screen.getByAltText('Provax Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should have correct src', () => {
    render(<Logo />);
    const logo = screen.getByAltText('Provax Logo');
    expect(logo).toHaveAttribute('src', '/provax/logo.svg');
  });

  it('should link to home page', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should have correct dimensions', () => {
    render(<Logo />);
    const logo = screen.getByAltText('Provax Logo');
    expect(logo).toHaveAttribute('width', '100');
    expect(logo).toHaveAttribute('height', '64');
  });

  it('should have flex styling on link', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('flex');
  });
});
