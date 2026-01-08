import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalWrapper, ModalButton, ModalInput, ModalDropdown, ModalCheckbox } from '@/components/ui/modal-wrapper';

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('ModalWrapper Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <p>Modal Content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<ModalWrapper {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ModalWrapper {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ModalWrapper {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders title icon when provided', () => {
    render(
      <ModalWrapper
        {...defaultProps}
        titleIcon={<span data-testid="title-icon">Icon</span>}
      />
    );
    expect(screen.getByTestId('title-icon')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<ModalWrapper {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <ModalWrapper
        {...defaultProps}
        actions={<button>Action Button</button>}
      />
    );
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<ModalWrapper {...defaultProps} onClose={handleClose} />);
    
    // Find the X close button
    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();
    render(<ModalWrapper {...defaultProps} onClose={handleClose} />);
    
    const backdrop = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Enter key is pressed on backdrop', () => {
    const handleClose = jest.fn();
    render(<ModalWrapper {...defaultProps} onClose={handleClose} />);
    
    const backdrop = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.keyDown(backdrop, { key: 'Enter' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Space key is pressed on backdrop', () => {
    const handleClose = jest.fn();
    render(<ModalWrapper {...defaultProps} onClose={handleClose} />);
    
    const backdrop = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.keyDown(backdrop, { key: ' ' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies custom maxWidth - sm', () => {
    const { container } = render(
      <ModalWrapper {...defaultProps} maxWidth="sm" />
    );
    expect(container.querySelector('.max-w-sm')).toBeInTheDocument();
  });

  it('applies custom maxWidth - lg by default', () => {
    const { container } = render(<ModalWrapper {...defaultProps} />);
    expect(container.querySelector('.max-w-lg')).toBeInTheDocument();
  });

  it('applies custom maxWidth as string', () => {
    const { container } = render(
      <ModalWrapper {...defaultProps} maxWidth="max-w-4xl" />
    );
    expect(container.querySelector('.max-w-4xl')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ModalWrapper {...defaultProps} className="custom-modal" />
    );
    expect(container.querySelector('.custom-modal')).toBeInTheDocument();
  });
});

describe('ModalButton Component', () => {
  it('renders button with children', () => {
    render(<ModalButton onClick={jest.fn()}>Click Me</ModalButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ModalButton onClick={handleClick}>Click</ModalButton>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<ModalButton onClick={jest.fn()} disabled>Disabled</ModalButton>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies primary variant styling by default', () => {
    render(<ModalButton onClick={jest.fn()}>Primary</ModalButton>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('applies secondary variant styling', () => {
    render(<ModalButton onClick={jest.fn()} variant="secondary">Secondary</ModalButton>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-[#252850]');
  });

  it('applies danger variant styling', () => {
    render(<ModalButton onClick={jest.fn()} variant="danger">Danger</ModalButton>);
    const button = screen.getByText('Danger');
    expect(button).toHaveClass('bg-red-600');
  });

  it('applies custom className', () => {
    render(<ModalButton onClick={jest.fn()} className="custom-btn">Custom</ModalButton>);
    expect(screen.getByText('Custom')).toHaveClass('custom-btn');
  });
});

describe('ModalInput Component', () => {
  const defaultInputProps = {
    label: 'Test Label',
    value: '',
    onChange: jest.fn(),
  };

  it('renders label', () => {
    render(<ModalInput {...defaultInputProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders text input by default', () => {
    render(<ModalInput {...defaultInputProps} />);
    const input = screen.getByRole('textbox');
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('renders textarea when type is textarea', () => {
    render(<ModalInput {...defaultInputProps} type="textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<ModalInput {...defaultInputProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('renders placeholder', () => {
    render(<ModalInput {...defaultInputProps} placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<ModalInput {...defaultInputProps} value="test value" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });
});

describe('ModalDropdown Component', () => {
  const defaultDropdownProps = {
    label: 'Select Option',
    value: 'Option 1',
    onChange: jest.fn(),
    options: ['Option 1', 'Option 2', 'Option 3'] as const,
  };

  it('renders label', () => {
    render(<ModalDropdown {...defaultDropdownProps} />);
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });

  it('shows selected value', () => {
    render(<ModalDropdown {...defaultDropdownProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<ModalDropdown {...defaultDropdownProps} />);
    
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<ModalDropdown {...defaultDropdownProps} onChange={handleChange} />);
    
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('closes dropdown after selection', () => {
    render(<ModalDropdown {...defaultDropdownProps} />);
    
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 2'));
    
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });
});

describe('ModalCheckbox Component', () => {
  const defaultCheckboxProps = {
    id: 'test-checkbox',
    label: 'Accept terms',
    checked: false,
    onChange: jest.fn(),
  };

  it('renders label', () => {
    render(<ModalCheckbox {...defaultCheckboxProps} />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    render(<ModalCheckbox {...defaultCheckboxProps} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows unchecked state', () => {
    render(<ModalCheckbox {...defaultCheckboxProps} checked={false} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('shows checked state', () => {
    render(<ModalCheckbox {...defaultCheckboxProps} checked={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<ModalCheckbox {...defaultCheckboxProps} onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
