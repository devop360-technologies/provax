import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSelect, DATE_RANGE_OPTIONS, AI_MODULE_OPTIONS, STATUS_OPTIONS } from '@/components/ui/filter-select';

describe('FilterSelect Component', () => {
  const defaultProps = {
    id: 'test-select',
    label: 'Test Label',
    value: 'Option 1',
    onChange: jest.fn(),
    options: ['Option 1', 'Option 2', 'Option 3'] as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(<FilterSelect {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders select element', () => {
    render(<FilterSelect {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<FilterSelect {...defaultProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('shows correct selected value', () => {
    render(<FilterSelect {...defaultProps} value="Option 2" />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Option 2');
  });

  it('calls onChange when selection changes', () => {
    const handleChange = jest.fn();
    render(<FilterSelect {...defaultProps} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Option 3' } });
    
    expect(handleChange).toHaveBeenCalledWith('Option 3');
  });

  it('has correct id attribute', () => {
    render(<FilterSelect {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'test-select');
  });

  it('label is associated with select via htmlFor', () => {
    render(<FilterSelect {...defaultProps} />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-select');
  });

  it('applies correct styling classes', () => {
    render(<FilterSelect {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('w-full');
    expect(select).toHaveClass('rounded-lg');
  });
});

describe('FilterSelect Constants', () => {
  it('DATE_RANGE_OPTIONS contains expected values', () => {
    expect(DATE_RANGE_OPTIONS).toContain('All Dates');
    expect(DATE_RANGE_OPTIONS).toContain('Today');
    expect(DATE_RANGE_OPTIONS).toContain('Last 7 Days');
    expect(DATE_RANGE_OPTIONS).toContain('Last 30 Days');
    expect(DATE_RANGE_OPTIONS).toContain('Last 90 Days');
  });

  it('AI_MODULE_OPTIONS contains expected values', () => {
    expect(AI_MODULE_OPTIONS).toContain('AI Modules');
    expect(AI_MODULE_OPTIONS).toContain('Structure Analysis');
    expect(AI_MODULE_OPTIONS).toContain('Paint Analysis');
  });

  it('STATUS_OPTIONS contains expected values', () => {
    expect(STATUS_OPTIONS).toContain('All Status');
    expect(STATUS_OPTIONS).toContain('Approved');
    expect(STATUS_OPTIONS).toContain('Processing');
    expect(STATUS_OPTIONS).toContain('Pending');
    expect(STATUS_OPTIONS).toContain('Rejected');
  });
});
