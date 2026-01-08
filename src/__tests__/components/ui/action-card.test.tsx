import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionCard, ActionCardStyled } from '@/components/ui/action-card';
import { Settings } from 'lucide-react';

describe('ActionCard Component', () => {
  const defaultProps = {
    title: 'Test Card',
    description: 'This is a test description',
    icon: Settings,
    iconColor: 'text-blue-500',
    buttonText: 'Click Me',
    buttonBg: 'bg-blue-500',
    buttonHoverBg: 'bg-blue-600',
  };

  it('renders title', () => {
    render(<ActionCard {...defaultProps} />);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ActionCard {...defaultProps} />);
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders button with correct text', () => {
    render(<ActionCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<ActionCard {...defaultProps} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon', () => {
    const { container } = render(<ActionCard {...defaultProps} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies icon color class', () => {
    const { container } = render(<ActionCard {...defaultProps} />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-blue-500');
  });

  it('applies custom className', () => {
    const { container } = render(<ActionCard {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct base styling', () => {
    const { container } = render(<ActionCard {...defaultProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('text-center');
  });
});

describe('ActionCardStyled Component', () => {
  const styledProps = {
    title: 'Styled Card',
    description: 'Styled description',
    icon: Settings,
    iconColor: 'text-green-500',
    buttonText: 'Styled Button',
    buttonColor: '#10B981',
    buttonHoverColor: '#059669',
  };

  it('renders title', () => {
    render(<ActionCardStyled {...styledProps} />);
    expect(screen.getByText('Styled Card')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ActionCardStyled {...styledProps} />);
    expect(screen.getByText('Styled description')).toBeInTheDocument();
  });

  it('renders button with correct text', () => {
    render(<ActionCardStyled {...styledProps} />);
    expect(screen.getByRole('button', { name: 'Styled Button' })).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<ActionCardStyled {...styledProps} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<ActionCardStyled {...styledProps} className="styled-class" />);
    expect(container.firstChild).toHaveClass('styled-class');
  });
});
