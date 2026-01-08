import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormInput, FormTextarea, FormSelect } from '@/components/ui/form-components';

describe('FormInput Component', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
  };

  it('renders label', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('uses id as name by default', () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'test-input');
  });

  it('uses custom name when provided', () => {
    render(<FormInput {...defaultProps} name="custom-name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'custom-name');
  });

  it('renders with correct type', () => {
    render(<FormInput {...defaultProps} type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('shows placeholder', () => {
    render(<FormInput {...defaultProps} placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<FormInput {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows controlled value', () => {
    render(<FormInput {...defaultProps} value="controlled value" onChange={jest.fn()} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('controlled value');
  });

  it('applies custom className', () => {
    const { container } = render(<FormInput {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('label is associated with input', () => {
    render(<FormInput {...defaultProps} />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });
});

describe('FormTextarea Component', () => {
  const defaultProps = {
    id: 'test-textarea',
    label: 'Test Textarea',
  };

  it('renders label', () => {
    render(<FormTextarea {...defaultProps} />);
    expect(screen.getByText('Test Textarea')).toBeInTheDocument();
  });

  it('renders textarea element', () => {
    render(<FormTextarea {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('uses default rows of 4', () => {
    render(<FormTextarea {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('uses custom rows when provided', () => {
    render(<FormTextarea {...defaultProps} rows={6} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('shows hint text when provided', () => {
    render(<FormTextarea {...defaultProps} hint="This is a hint" />);
    expect(screen.getByText('This is a hint')).toBeInTheDocument();
  });

  it('does not show hint when not provided', () => {
    render(<FormTextarea {...defaultProps} />);
    expect(screen.queryByText(/hint/i)).not.toBeInTheDocument();
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<FormTextarea {...defaultProps} onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new text' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows placeholder', () => {
    render(<FormTextarea {...defaultProps} placeholder="Enter description" />);
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<FormTextarea {...defaultProps} className="custom-textarea" />);
    expect(container.firstChild).toHaveClass('custom-textarea');
  });
});

describe('FormSelect Component', () => {
  const defaultProps = {
    id: 'test-select',
    label: 'Test Select',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ],
  };

  it('renders label', () => {
    render(<FormSelect {...defaultProps} />);
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  it('renders select element', () => {
    render(<FormSelect {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<FormSelect {...defaultProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders placeholder option when provided', () => {
    render(<FormSelect {...defaultProps} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('placeholder option is present', () => {
    render(<FormSelect {...defaultProps} placeholder="Select an option" />);
    const placeholder = screen.getByText('Select an option');
    expect(placeholder).toBeInTheDocument();
    // Placeholder option has empty value
    expect(placeholder).toHaveAttribute('value', '');
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<FormSelect {...defaultProps} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'opt2' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows controlled value', () => {
    render(<FormSelect {...defaultProps} value="opt2" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('opt2');
  });

  it('applies custom className', () => {
    const { container } = render(<FormSelect {...defaultProps} className="custom-select" />);
    expect(container.firstChild).toHaveClass('custom-select');
  });
});
