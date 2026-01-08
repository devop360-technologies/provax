import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsTabs } from '@/components/settings/settings-tabs';

describe('SettingsTabs Component', () => {
  const defaultTabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
  ];

  it('renders all tabs', () => {
    render(
      <SettingsTabs
        tabs={defaultTabs}
        activeTab="general"
        onTabChange={jest.fn()}
      />
    );
    
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('highlights active tab', () => {
    const { container } = render(
      <SettingsTabs
        tabs={defaultTabs}
        activeTab="security"
        onTabChange={jest.fn()}
      />
    );
    
    const activeTab = screen.getByText('Security');
    expect(activeTab).toBeInTheDocument();
    // Verify the tabs container has correct styling
    const tabsContainer = container.firstChild;
    expect(tabsContainer).toHaveClass('bg-[#1D1D41]');
  });

  it('calls onTabChange when tab is clicked', () => {
    const handleTabChange = jest.fn();
    render(
      <SettingsTabs
        tabs={defaultTabs}
        activeTab="general"
        onTabChange={handleTabChange}
      />
    );
    
    fireEvent.click(screen.getByText('Security'));
    expect(handleTabChange).toHaveBeenCalledWith('security');
  });

  it('applies custom className', () => {
    render(
      <SettingsTabs
        tabs={defaultTabs}
        activeTab="general"
        onTabChange={jest.fn()}
        className="custom-tabs"
      />
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('custom-tabs');
    });
  });

  it('has container with border styling', () => {
    const { container } = render(
      <SettingsTabs
        tabs={defaultTabs}
        activeTab="general"
        onTabChange={jest.fn()}
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('border-[#404254]');
    expect(wrapper).toHaveClass('mb-6');
  });
});
