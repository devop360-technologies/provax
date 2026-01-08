import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FinancialFilters } from '@/components/dashboard/financial-filters';

describe('FinancialFilters Component', () => {
  it('renders period filter', () => {
    render(<FinancialFilters />);
    expect(screen.getByLabelText('Period')).toBeInTheDocument();
  });

  it('renders category filter', () => {
    render(<FinancialFilters />);
    expect(screen.getByLabelText('Product Category')).toBeInTheDocument();
  });

  it('renders from date input', () => {
    render(<FinancialFilters />);
    expect(screen.getByLabelText('From Date')).toBeInTheDocument();
  });

  it('renders to date input', () => {
    render(<FinancialFilters />);
    expect(screen.getByLabelText('To Date')).toBeInTheDocument();
  });

  it('has default period value', () => {
    render(<FinancialFilters />);
    const periodSelect = screen.getByLabelText('Period') as HTMLSelectElement;
    expect(periodSelect.value).toBe('Last 7 Days');
  });

  it('has default category value', () => {
    render(<FinancialFilters />);
    const categorySelect = screen.getByLabelText('Product Category') as HTMLSelectElement;
    expect(categorySelect.value).toBe('All Categories');
  });

  it('renders all period options', () => {
    render(<FinancialFilters />);
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
    expect(screen.getByText('Last 30 Days')).toBeInTheDocument();
    expect(screen.getByText('Last 3 Months')).toBeInTheDocument();
    expect(screen.getByText('Last 6 Months')).toBeInTheDocument();
    expect(screen.getByText('Last Year')).toBeInTheDocument();
  });

  it('renders all category options', () => {
    render(<FinancialFilters />);
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('Certification')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Subscription')).toBeInTheDocument();
  });

  it('changes period selection', () => {
    render(<FinancialFilters />);
    const periodSelect = screen.getByLabelText('Period');
    
    fireEvent.change(periodSelect, { target: { value: 'Last 30 Days' } });
    expect((periodSelect as HTMLSelectElement).value).toBe('Last 30 Days');
  });

  it('changes category selection', () => {
    render(<FinancialFilters />);
    const categorySelect = screen.getByLabelText('Product Category');
    
    fireEvent.change(categorySelect, { target: { value: 'Certification' } });
    expect((categorySelect as HTMLSelectElement).value).toBe('Certification');
  });

  it('changes from date', () => {
    render(<FinancialFilters />);
    const fromDateInput = screen.getByLabelText('From Date');
    
    fireEvent.change(fromDateInput, { target: { value: '06/01/2024' } });
    expect((fromDateInput as HTMLInputElement).value).toBe('06/01/2024');
  });

  it('changes to date', () => {
    render(<FinancialFilters />);
    const toDateInput = screen.getByLabelText('To Date');
    
    fireEvent.change(toDateInput, { target: { value: '12/31/2024' } });
    expect((toDateInput as HTMLInputElement).value).toBe('12/31/2024');
  });

  it('renders apply filters button', () => {
    render(<FinancialFilters />);
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  it('renders reset button', () => {
    render(<FinancialFilters />);
    expect(screen.getByText('Reset Filter')).toBeInTheDocument();
  });

  it('calls onFiltersChange when apply is clicked', () => {
    const handleFiltersChange = jest.fn();
    render(<FinancialFilters onFiltersChange={handleFiltersChange} />);
    
    fireEvent.click(screen.getByText('Apply Filters'));
    expect(handleFiltersChange).toHaveBeenCalled();
  });

  it('resets filters when reset button is clicked', () => {
    render(<FinancialFilters />);
    
    // Change some values
    const periodSelect = screen.getByLabelText('Period');
    fireEvent.change(periodSelect, { target: { value: 'Last Year' } });
    
    // Click reset (button text is 'Reset Filter')
    fireEvent.click(screen.getByText('Reset Filter'));
    
    // Should be back to default
    expect((periodSelect as HTMLSelectElement).value).toBe('Last 7 Days');
  });

  it('has correct container styling', () => {
    const { container } = render(<FinancialFilters />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('bg-[#1D1D41]');
    expect(wrapper).toHaveClass('rounded-xl');
  });

  it('renders calendar icons for date inputs', () => {
    const { container } = render(<FinancialFilters />);
    const calendarIcons = container.querySelectorAll('svg');
    expect(calendarIcons.length).toBeGreaterThanOrEqual(2);
  });
});
