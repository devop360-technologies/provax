import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ManagementTabs } from '@/components/ui/management-tabs';

describe('ManagementTabs Component', () => {
  const defaultTabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'details', label: 'Details' },
    { key: 'settings', label: 'Settings' },
  ] as const;

  it('renders all tabs', () => {
    render(
      <ManagementTabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={jest.fn()}
      />
    );
    
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('highlights active tab with cyan color', () => {
    render(
      <ManagementTabs
        tabs={defaultTabs}
        activeTab="details"
        onTabChange={jest.fn()}
      />
    );
    
    const activeTab = screen.getByText('Details');
    expect(activeTab).toHaveClass('text-cyan-400');
    expect(activeTab).toHaveClass('border-cyan-400');
  });

  it('applies gray color to inactive tabs', () => {
    render(
      <ManagementTabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={jest.fn()}
      />
    );
    
    const inactiveTab = screen.getByText('Details');
    expect(inactiveTab).toHaveClass('text-gray-400');
  });

  it('calls onTabChange when tab is clicked', () => {
    const handleTabChange = jest.fn();
    render(
      <ManagementTabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={handleTabChange}
      />
    );
    
    fireEvent.click(screen.getByText('Settings'));
    expect(handleTabChange).toHaveBeenCalledWith('settings');
  });

  it('renders with correct container styling', () => {
    const { container } = render(
      <ManagementTabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={jest.fn()}
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('rounded-xl');
    expect(wrapper).toHaveClass('border');
    expect(wrapper).toHaveClass('bg-[#1D1D41]');
  });

  it('handles different tab key types', () => {
    const stringKeyTabs = [
      { key: 'first', label: 'First' },
      { key: 'second', label: 'Second' },
    ] as const;
    
    const handleTabChange = jest.fn();
    render(
      <ManagementTabs
        tabs={stringKeyTabs}
        activeTab="first"
        onTabChange={handleTabChange}
      />
    );
    
    fireEvent.click(screen.getByText('Second'));
    expect(handleTabChange).toHaveBeenCalledWith('second');
  });
});
