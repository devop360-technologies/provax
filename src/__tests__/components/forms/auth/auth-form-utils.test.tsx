import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  PasswordInput, 
  validatePassword, 
  PasswordRequirements, 
  LoadingSpinner, 
  AUTH_FORM_CLASSES 
} from '@/components/forms/auth/auth-form-utils';

describe('Auth Form Utils', () => {
  describe('PasswordInput Component', () => {
    const defaultProps = {
      id: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      value: '',
      onChange: jest.fn(),
      showPassword: false,
      onToggle: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders label', () => {
      render(<PasswordInput {...defaultProps} />);
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders input with correct placeholder', () => {
      render(<PasswordInput {...defaultProps} />);
      expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    });

    it('renders input with type password when showPassword is false', () => {
      render(<PasswordInput {...defaultProps} />);
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders input with type text when showPassword is true', () => {
      render(<PasswordInput {...defaultProps} showPassword={true} />);
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('calls onChange when input value changes', () => {
      const handleChange = jest.fn();
      render(<PasswordInput {...defaultProps} onChange={handleChange} />);
      
      const input = screen.getByPlaceholderText('Enter password');
      fireEvent.change(input, { target: { value: 'newpassword' } });
      
      expect(handleChange).toHaveBeenCalledWith('newpassword');
    });

    it('calls onToggle when toggle button is clicked', () => {
      const handleToggle = jest.fn();
      render(<PasswordInput {...defaultProps} onToggle={handleToggle} />);
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      expect(handleToggle).toHaveBeenCalled();
    });

    it('renders required input by default', () => {
      render(<PasswordInput {...defaultProps} />);
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toBeRequired();
    });

    it('renders non-required input when required is false', () => {
      render(<PasswordInput {...defaultProps} required={false} />);
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).not.toBeRequired();
    });

    it('shows Eye icon when showPassword is true', () => {
      const { container } = render(<PasswordInput {...defaultProps} showPassword={true} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('shows EyeOff icon when showPassword is false', () => {
      const { container } = render(<PasswordInput {...defaultProps} showPassword={false} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('displays current value', () => {
      render(<PasswordInput {...defaultProps} value="testvalue" />);
      const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
      expect(input.value).toBe('testvalue');
    });

    it('has correct id attribute', () => {
      render(<PasswordInput {...defaultProps} id="custom-id" />);
      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('validatePassword', () => {
    it('returns valid for strong password', () => {
      const result = validatePassword('Password1!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns invalid for password less than 8 characters', () => {
      const result = validatePassword('Pass1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Be at least 8 characters long');
    });

    it('returns invalid for password without uppercase', () => {
      const result = validatePassword('password1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contain both uppercase and lowercase letters');
    });

    it('returns invalid for password without lowercase', () => {
      const result = validatePassword('PASSWORD1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Contain both uppercase and lowercase letters');
    });

    it('returns invalid for password without number', () => {
      const result = validatePassword('Password!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Include at least one number');
    });

    it('returns invalid for password without special character', () => {
      const result = validatePassword('Password1');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Have at least one special character');
    });

    it('returns multiple errors for very weak password', () => {
      const result = validatePassword('abc');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    it('accepts all special characters', () => {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
      specialChars.forEach(char => {
        const result = validatePassword(`Password1${char}`);
        expect(result.isValid).toBe(true);
      });
    });

    it('returns errors in array format', () => {
      const result = validatePassword('weak');
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('PasswordRequirements Component', () => {
    it('renders title', () => {
      render(<PasswordRequirements requirements={['Requirement 1']} />);
      expect(screen.getByText('Password must:')).toBeInTheDocument();
    });

    it('renders all requirements', () => {
      const requirements = ['Requirement 1', 'Requirement 2', 'Requirement 3'];
      render(<PasswordRequirements requirements={requirements} />);
      
      requirements.forEach(req => {
        expect(screen.getByText(req)).toBeInTheDocument();
      });
    });

    it('renders empty list when no requirements', () => {
      const { container } = render(<PasswordRequirements requirements={[]} />);
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(0);
    });

    it('renders requirements as list items', () => {
      const { container } = render(
        <PasswordRequirements requirements={['Req 1', 'Req 2']} />
      );
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('LoadingSpinner Component', () => {
    it('renders svg element', () => {
      const { container } = render(<LoadingSpinner />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('has animate-spin class', () => {
      const { container } = render(<LoadingSpinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('animate-spin');
    });

    it('renders circle element', () => {
      const { container } = render(<LoadingSpinner />);
      const circle = container.querySelector('circle');
      expect(circle).toBeInTheDocument();
    });

    it('renders path element', () => {
      const { container } = render(<LoadingSpinner />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
    });
  });

  describe('AUTH_FORM_CLASSES', () => {
    it('exports container class', () => {
      expect(AUTH_FORM_CLASSES.container).toBe('min-h-screen flex');
    });

    it('exports imageSection class', () => {
      expect(AUTH_FORM_CLASSES.imageSection).toBe('hidden lg:flex lg:w-1/2 relative');
    });

    it('exports formSection class', () => {
      expect(AUTH_FORM_CLASSES.formSection).toContain('w-full');
      expect(AUTH_FORM_CLASSES.formSection).toContain('lg:w-1/2');
    });

    it('exports formWrapper class', () => {
      expect(AUTH_FORM_CLASSES.formWrapper).toContain('max-w-md');
    });

    it('exports headerTitle class', () => {
      expect(AUTH_FORM_CLASSES.headerTitle).toContain('text-3xl');
    });

    it('exports headerSubtitle class', () => {
      expect(AUTH_FORM_CLASSES.headerSubtitle).toBe('text-gray-300');
    });

    it('exports headerHighlight class', () => {
      expect(AUTH_FORM_CLASSES.headerHighlight).toContain('text-blue-400');
    });

    it('exports form class', () => {
      expect(AUTH_FORM_CLASSES.form).toBe('space-y-6');
    });

    it('exports errorMessage class', () => {
      expect(AUTH_FORM_CLASSES.errorMessage).toContain('text-red-400');
    });

    it('exports successMessage class', () => {
      expect(AUTH_FORM_CLASSES.successMessage).toContain('text-green-400');
    });

    it('exports submitButton class', () => {
      expect(AUTH_FORM_CLASSES.submitButton).toContain('w-full');
      expect(AUTH_FORM_CLASSES.submitButton).toContain('bg-blue-600');
    });

    it('is read-only (const assertion)', () => {
      // TypeScript const assertion - just verify the object structure
      expect(typeof AUTH_FORM_CLASSES).toBe('object');
      expect(Object.keys(AUTH_FORM_CLASSES).length).toBeGreaterThan(0);
    });
  });
});
