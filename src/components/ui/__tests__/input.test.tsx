import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should render without explicit type attribute (browser defaults to text)', () => {
    render(<Input />);
    // Browser defaults to text when type not specified
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with custom type', () => {
    render(<Input type="email" data-testid="email-input" />);
    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('should have data-slot attribute', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should handle focus events', () => {
    const onFocus = jest.fn();
    render(<Input onFocus={onFocus} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
  });

  it('should handle blur events', () => {
    const onBlur = jest.fn();
    render(<Input onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('should accept value prop', () => {
    render(<Input value="test value" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('should handle password type', () => {
    render(<Input type="password" data-testid="password-input" />);
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  it('should have required attribute when required', () => {
    render(<Input required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('should have aria-invalid attribute when invalid', () => {
    render(<Input aria-invalid="true" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render with default styling classes', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('h-11');
  });

  it('should pass additional props', () => {
    render(<Input data-testid="custom-input" aria-label="Custom" maxLength={10} />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('should render with name attribute', () => {
    render(<Input name="username" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
  });

  it('should render with id attribute', () => {
    render(<Input id="my-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
  });
});
