import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardCard, DashboardCardHeader } from '@/components/ui/dashboard-card';

describe('DashboardCard Component', () => {
  it('renders children', () => {
    render(
      <DashboardCard>
        <p>Card Content</p>
      </DashboardCard>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies default medium padding', () => {
    const { container } = render(
      <DashboardCard>Content</DashboardCard>
    );
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('applies small padding', () => {
    const { container } = render(
      <DashboardCard padding="sm">Content</DashboardCard>
    );
    expect(container.firstChild).toHaveClass('p-4');
  });

  it('applies large padding', () => {
    const { container } = render(
      <DashboardCard padding="lg">Content</DashboardCard>
    );
    expect(container.firstChild).toHaveClass('p-8');
  });

  it('applies marginRight when specified', () => {
    const { container } = render(
      <DashboardCard marginRight>Content</DashboardCard>
    );
    expect(container.firstChild).toHaveClass('mr-0');
    expect(container.firstChild).toHaveClass('md:mr-7');
  });

  it('does not apply marginRight by default', () => {
    const { container } = render(
      <DashboardCard>Content</DashboardCard>
    );
    expect(container.firstChild).not.toHaveClass('md:mr-7');
  });

  it('applies custom className', () => {
    const { container } = render(
      <DashboardCard className="custom-class">Content</DashboardCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct base styling', () => {
    const { container } = render(
      <DashboardCard>Content</DashboardCard>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-[#1D1D41]');
  });
});

describe('DashboardCardHeader Component', () => {
  it('renders title', () => {
    render(<DashboardCardHeader title="Card Title" />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<DashboardCardHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<DashboardCardHeader title="Title" />);
    expect(screen.queryByText('Subtitle')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <DashboardCardHeader
        title="Title"
        action={<button>Action Button</button>}
      />
    );
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DashboardCardHeader title="Title" className="custom-header" />
    );
    expect(container.firstChild).toHaveClass('custom-header');
  });

  it('has flex layout with justify-between', () => {
    const { container } = render(
      <DashboardCardHeader title="Title" />
    );
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-between');
  });

  it('title has correct styling', () => {
    render(<DashboardCardHeader title="Card Title" />);
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-white');
  });

  it('subtitle has correct styling', () => {
    render(<DashboardCardHeader title="Title" subtitle="Subtitle" />);
    const subtitle = screen.getByText('Subtitle');
    expect(subtitle).toHaveClass('text-sm');
    expect(subtitle).toHaveClass('text-gray-400');
  });
});
