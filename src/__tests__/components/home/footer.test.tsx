import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/home/footer';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer Component', () => {
  it('renders PROVAX brand name', () => {
    render(<Footer />);
    expect(screen.getByText('PROVAX')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('has footer element', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('has section wrapper', () => {
    const { container } = render(<Footer />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders background elements', () => {
    const { container } = render(<Footer />);
    const bgElements = container.querySelectorAll('.blur-3xl');
    expect(bgElements.length).toBeGreaterThan(0);
  });

  it('has correct section styling', () => {
    const { container } = render(<Footer />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('relative');
    expect(section).toHaveClass('min-h-screen');
    expect(section).toHaveClass('w-full');
  });

  it('renders in grid layout', () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('social links have hover effect classes', () => {
    const { container } = render(<Footer />);
    const socialLinks = container.querySelectorAll('.hover\\:text-cyan-400');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('renders SVG icons for social media', () => {
    const { container } = render(<Footer />);
    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThanOrEqual(3);
  });
});
