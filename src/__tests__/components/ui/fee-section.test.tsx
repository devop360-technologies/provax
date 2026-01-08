import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeeSection } from '@/components/ui/fee-section';
import { Settings } from 'lucide-react';

describe('FeeSection Component', () => {
  const defaultProps = {
    icon: <Settings data-testid="icon" />,
    iconBg: 'bg-blue-500',
    title: 'Test Fee Section',
    fields: [
      {
        label: 'Field 1',
        value: '10.00',
        onChange: jest.fn(),
        unit: '$',
        description: 'Description for field 1',
      },
      {
        label: 'Field 2',
        value: '5.5',
        onChange: jest.fn(),
        unit: '%',
        description: 'Description for field 2',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<FeeSection {...defaultProps} />);
    expect(screen.getByText('Test Fee Section')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<FeeSection {...defaultProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders all field labels', () => {
    render(<FeeSection {...defaultProps} />);
    expect(screen.getByText('Field 1')).toBeInTheDocument();
    expect(screen.getByText('Field 2')).toBeInTheDocument();
  });

  it('renders all field descriptions', () => {
    render(<FeeSection {...defaultProps} />);
    expect(screen.getByText('Description for field 1')).toBeInTheDocument();
    expect(screen.getByText('Description for field 2')).toBeInTheDocument();
  });

  it('renders field values in inputs', () => {
    render(<FeeSection {...defaultProps} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('10.00');
    expect(inputs[1]).toHaveValue('5.5');
  });

  it('renders unit labels', () => {
    render(<FeeSection {...defaultProps} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const field1OnChange = jest.fn();
    const props = {
      ...defaultProps,
      fields: [
        {
          label: 'Field 1',
          value: '10.00',
          onChange: field1OnChange,
          unit: '$',
          description: 'Description',
        },
      ],
    };
    
    render(<FeeSection {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '20.00' } });
    
    expect(field1OnChange).toHaveBeenCalledWith('20.00');
  });

  it('applies custom className', () => {
    const { container } = render(<FeeSection {...defaultProps} className="custom-section" />);
    expect(container.firstChild).toHaveClass('custom-section');
  });

  it('applies icon background class', () => {
    const { container } = render(<FeeSection {...defaultProps} />);
    const iconContainer = container.querySelector('.bg-blue-500');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders with grid layout for fields', () => {
    const { container } = render(<FeeSection {...defaultProps} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('handles single field', () => {
    const props = {
      ...defaultProps,
      fields: [
        {
          label: 'Single Field',
          value: '100',
          onChange: jest.fn(),
          unit: 'units',
          description: 'Single description',
        },
      ],
    };
    
    render(<FeeSection {...props} />);
    expect(screen.getByText('Single Field')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  it('handles multiple fields', () => {
    const props = {
      ...defaultProps,
      fields: [
        { label: 'F1', value: '1', onChange: jest.fn(), unit: 'a', description: 'd1' },
        { label: 'F2', value: '2', onChange: jest.fn(), unit: 'b', description: 'd2' },
        { label: 'F3', value: '3', onChange: jest.fn(), unit: 'c', description: 'd3' },
        { label: 'F4', value: '4', onChange: jest.fn(), unit: 'd', description: 'd4' },
      ],
    };
    
    render(<FeeSection {...props} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });
});
