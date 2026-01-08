import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FinancialTabs } from '@/components/dashboard/financial-tabs';

describe('FinancialTabs Component', () => {
  it('renders all tabs', () => {
    render(<FinancialTabs />);
    expect(screen.getByText('Financial Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Subscription Management')).toBeInTheDocument();
  });

  it('renders with default active tab', () => {
    render(<FinancialTabs />);
    const activeTab = screen.getByText('Financial Dashboard');
    expect(activeTab).toHaveClass('text-cyan-400');
    expect(activeTab).toHaveClass('border-cyan-400');
  });

  it('renders with custom active tab', () => {
    render(<FinancialTabs activeTab="Transactions" />);
    const activeTab = screen.getByText('Transactions');
    expect(activeTab).toHaveClass('text-cyan-400');
  });

  it('calls onTabChange when tab is clicked', () => {
    const handleTabChange = jest.fn();
    render(<FinancialTabs onTabChange={handleTabChange} />);
    
    fireEvent.click(screen.getByText('Transactions'));
    expect(handleTabChange).toHaveBeenCalledWith('Transactions');
  });

  it('inactive tabs have gray styling', () => {
    render(<FinancialTabs activeTab="Financial Dashboard" />);
    const inactiveTab = screen.getByText('Transactions');
    expect(inactiveTab).toHaveClass('text-gray-400');
    expect(inactiveTab).toHaveClass('border-transparent');
  });

  it('has correct container styling', () => {
    const { container } = render(<FinancialTabs />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('border-b');
    expect(wrapper).toHaveClass('bg-[#1D1D41]');
    expect(wrapper).toHaveClass('rounded-xl');
  });

  it('tabs have transition effects', () => {
    render(<FinancialTabs />);
    const tab = screen.getByText('Financial Dashboard');
    expect(tab).toHaveClass('transition-colors');
  });

  it('tabs have bottom border styling', () => {
    render(<FinancialTabs />);
    const tab = screen.getByText('Financial Dashboard');
    expect(tab).toHaveClass('border-b-2');
  });
});
