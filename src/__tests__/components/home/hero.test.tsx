import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/home/hero';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; fill?: boolean; className?: string; priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
      data-fill={props.fill}
      data-priority={props.priority}
    />
  ),
}));

describe('Hero Component', () => {
  it('renders hero section', () => {
    render(<Hero />);
    expect(screen.getAllByText(/AI-Powered/).length).toBeGreaterThan(0);
  });

  it('renders main heading text', () => {
    render(<Hero />);
    expect(screen.getAllByText(/Vehicle/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Certification/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Service/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bidding/).length).toBeGreaterThan(0);
  });

  it('renders Get Certified button', () => {
    render(<Hero />);
    expect(screen.getByText('Get Certified')).toBeInTheDocument();
  });

  it('renders Explore Marketplace button', () => {
    render(<Hero />);
    expect(screen.getByText('Explore Marketplace')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Certify, sell, and service vehicles/)).toBeInTheDocument();
  });

  it('renders PROVAX text', () => {
    render(<Hero />);
    const provaxTexts = screen.getAllByText('PROVAX');
    expect(provaxTexts.length).toBeGreaterThan(0);
  });

  it('renders Artificial Intelligence label', () => {
    render(<Hero />);
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
  });

  it('renders FOR EVERY NEED text', () => {
    render(<Hero />);
    const forEveryNeedTexts = screen.getAllByText('FOR EVERY NEED');
    expect(forEveryNeedTexts.length).toBeGreaterThan(0);
  });

  it('renders background image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Car Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/provax/car.png');
  });

  it('buttons have arrow symbols', () => {
    render(<Hero />);
    const arrows = screen.getAllByText('→');
    expect(arrows.length).toBe(2);
  });

  it('has correct container styling', () => {
    const { container } = render(<Hero />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('relative');
    expect(wrapper).toHaveClass('min-h-screen');
    expect(wrapper).toHaveClass('w-full');
  });
});
