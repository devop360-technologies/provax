/**
 * Tests for Textarea component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea Component', () => {
  it('should render with placeholder', () => {
    render(<Textarea placeholder="Enter text..." />);
    const textarea = screen.getByPlaceholderText('Enter text...');
    expect(textarea).toBeInTheDocument();
  });

  it('should accept typed input', async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    
    await user.type(textarea, 'Hello World');
    expect(textarea).toHaveValue('Hello World');
  });

  it('should apply custom className', () => {
    render(<Textarea className="custom-textarea" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea.className).toContain('custom-textarea');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
  });

  it('should have correct default value', () => {
    render(<Textarea defaultValue="Default text" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Default text');
  });

  it('should handle controlled value', () => {
    const { rerender } = render(<Textarea value="Initial" onChange={() => {}} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveValue('Initial');
    
    rerender(<Textarea value="Updated" onChange={() => {}} data-testid="textarea" />);
    expect(textarea).toHaveValue('Updated');
  });

  it('should call onChange when text is entered', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    
    await user.type(textarea, 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should have required attribute when required', () => {
    render(<Textarea required data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeRequired();
  });

  it('should have readonly attribute when readOnly', () => {
    render(<Textarea readOnly data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should support rows attribute', () => {
    render(<Textarea rows={10} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('should support cols attribute', () => {
    render(<Textarea cols={50} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('cols', '50');
  });

  it('should support maxLength attribute', () => {
    render(<Textarea maxLength={100} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('maxlength', '100');
  });

  it('should support name attribute', () => {
    render(<Textarea name="message" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('name', 'message');
  });

  it('should have min-h-[80px] class for minimum height', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea.className).toContain('min-h-[80px]');
  });
});
