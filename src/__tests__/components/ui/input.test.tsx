import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders input with text type', () => {
    render(<Input type="text" data-testid="text-input" />);
    expect(screen.getByTestId('text-input')).toHaveAttribute('type', 'text');
  });

  it('renders input with email type', () => {
    render(<Input type="email" data-testid="email-input" />);
    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
  });

  it('renders input with password type', () => {
    render(<Input type="password" data-testid="password-input" />);
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  it('renders input with number type', () => {
    render(<Input type="number" data-testid="number-input" />);
    expect(screen.getByTestId('number-input')).toHaveAttribute('type', 'number');
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input" />);
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders disabled input', () => {
    render(<Input disabled data-testid="disabled-input" />);
    expect(screen.getByTestId('disabled-input')).toBeDisabled();
  });

  it('renders input with custom className', () => {
    render(<Input className="custom-class" data-testid="custom-input" />);
    expect(screen.getByTestId('custom-input')).toHaveClass('custom-class');
  });

  it('renders input with value', () => {
    render(<Input value="test value" readOnly data-testid="value-input" />);
    expect(screen.getByTestId('value-input')).toHaveValue('test value');
  });

  it('renders input with defaultValue', () => {
    render(<Input defaultValue="default" data-testid="default-input" />);
    expect(screen.getByTestId('default-input')).toHaveValue('default');
  });

  it('renders input with required attribute', () => {
    render(<Input required data-testid="required-input" />);
    expect(screen.getByTestId('required-input')).toBeRequired();
  });

  it('renders input with name attribute', () => {
    render(<Input name="test-name" data-testid="named-input" />);
    expect(screen.getByTestId('named-input')).toHaveAttribute('name', 'test-name');
  });

  it('renders input with id attribute', () => {
    render(<Input id="test-id" data-testid="id-input" />);
    expect(screen.getByTestId('id-input')).toHaveAttribute('id', 'test-id');
  });

  it('renders input with maxLength', () => {
    render(<Input maxLength={10} data-testid="maxlength-input" />);
    expect(screen.getByTestId('maxlength-input')).toHaveAttribute('maxLength', '10');
  });

  it('renders input with minLength', () => {
    render(<Input minLength={5} data-testid="minlength-input" />);
    expect(screen.getByTestId('minlength-input')).toHaveAttribute('minLength', '5');
  });

  it('renders input with data-slot attribute', () => {
    render(<Input data-testid="slot-input" />);
    expect(screen.getByTestId('slot-input')).toHaveAttribute('data-slot', 'input');
  });

  it('renders input with autoComplete', () => {
    render(<Input autoComplete="email" data-testid="autocomplete-input" />);
    expect(screen.getByTestId('autocomplete-input')).toHaveAttribute('autoComplete', 'email');
  });

  it('handles focus events', () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} data-testid="focus-input" />);
    fireEvent.focus(screen.getByTestId('focus-input'));
    expect(handleFocus).toHaveBeenCalled();
  });

  it('handles blur events', () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} data-testid="blur-input" />);
    fireEvent.blur(screen.getByTestId('blur-input'));
    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders file input', () => {
    render(<Input type="file" data-testid="file-input" />);
    expect(screen.getByTestId('file-input')).toHaveAttribute('type', 'file');
  });
});
