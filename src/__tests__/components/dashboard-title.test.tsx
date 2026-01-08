import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardTitle } from '@/components/dashboard-title';

describe('DashboardTitle Component', () => {
  it('should render heading', () => {
    render(<DashboardTitle heading="Dashboard" />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
  });

  it('should render text when provided', () => {
    render(<DashboardTitle heading="Dashboard" text="Welcome to your dashboard" />);
    
    expect(screen.getByText('Welcome to your dashboard')).toBeInTheDocument();
  });

  it('should not render text when not provided', () => {
    render(<DashboardTitle heading="Dashboard" />);
    
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('should have correct heading styles', () => {
    render(<DashboardTitle heading="Dashboard" />);
    
    const heading = screen.getByRole('heading');
    expect(heading.className).toContain('font-heading');
    expect(heading.className).toContain('font-extrabold');
  });

  it('should have wrapper div with margin', () => {
    const { container } = render(<DashboardTitle heading="Dashboard" />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('mb-6');
  });

  it('should render with different headings', () => {
    const { rerender } = render(<DashboardTitle heading="Settings" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    rerender(<DashboardTitle heading="Profile" />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
