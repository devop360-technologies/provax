import React from 'react';
import { render, screen } from '@testing-library/react';
import { BaseStatCard } from '@/components/ui/base-stat-card';
import { TrendingUp } from 'lucide-react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width: number; height: number; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  ),
}));

describe('BaseStatCard Component', () => {
  const defaultProps = {
    title: 'Total Revenue',
    value: '$125,000',
    change: '+12.5% from last month',
    changeType: 'positive' as const,
    iconBg: 'bg-green-500/20',
  };

  it('renders title', () => {
    render(<BaseStatCard {...defaultProps} />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('renders value', () => {
    render(<BaseStatCard {...defaultProps} />);
    expect(screen.getByText('$125,000')).toBeInTheDocument();
  });

  it('renders change text', () => {
    render(<BaseStatCard {...defaultProps} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });

  it('renders with icon component', () => {
    render(<BaseStatCard {...defaultProps} icon={TrendingUp} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders with icon image', () => {
    render(<BaseStatCard {...defaultProps} iconSrc="/test-icon.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test-icon.png');
  });

  it('applies positive change styling', () => {
    render(<BaseStatCard {...defaultProps} changeType="positive" />);
    const changeElement = screen.getByText('+12.5%');
    expect(changeElement).toHaveClass('text-green-400');
  });

  it('applies negative change styling', () => {
    render(
      <BaseStatCard
        {...defaultProps}
        change="-5.2% from last month"
        changeType="negative"
      />
    );
    const changeElement = screen.getByText('-5.2%');
    expect(changeElement).toHaveClass('text-red-400');
  });

  it('applies neutral change styling', () => {
    render(
      <BaseStatCard
        {...defaultProps}
        change="0% change"
        changeType="neutral"
      />
    );
    const changeElement = screen.getByText('0%');
    expect(changeElement).toHaveClass('text-gray-400');
  });

  it('renders with badge variant', () => {
    render(
      <BaseStatCard
        {...defaultProps}
        variant="badge"
        changeType="positive"
      />
    );
    const changeElement = screen.getByText('+12.5%');
    expect(changeElement).toHaveClass('bg-green-400');
  });

  it('renders with text variant', () => {
    render(
      <BaseStatCard
        {...defaultProps}
        variant="text"
        changeType="positive"
      />
    );
    const changeElement = screen.getByText('+12.5%');
    expect(changeElement).toHaveClass('text-green-400');
  });

  it('renders arrow for positive change with arrow variant', () => {
    const { container } = render(
      <BaseStatCard
        {...defaultProps}
        variant="arrow"
        changeType="positive"
      />
    );
    // ArrowUpRight icon should be present
    const svg = container.querySelector('svg.w-4.h-4');
    expect(svg).toBeInTheDocument();
  });

  it('applies icon color class', () => {
    const { container } = render(
      <BaseStatCard {...defaultProps} icon={TrendingUp} iconColor="text-blue-500" />
    );
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-blue-500');
  });

  it('applies icon background class', () => {
    const { container } = render(
      <BaseStatCard {...defaultProps} iconBg="bg-purple-500/20" />
    );
    const iconContainer = container.querySelector('.bg-purple-500\\/20');
    expect(iconContainer).toBeInTheDocument();
  });

  it('has correct card styling', () => {
    const { container } = render(<BaseStatCard {...defaultProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-2xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('p-6');
  });

  it('renders numeric value', () => {
    render(<BaseStatCard {...defaultProps} value={1500} />);
    expect(screen.getByText('1500')).toBeInTheDocument();
  });
});
