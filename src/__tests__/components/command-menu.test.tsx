import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommandMenu } from '@/components/command-menu';

describe('CommandMenu Component', () => {
  it('should render the command menu', () => {
    const { container } = render(<CommandMenu />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render a button', () => {
    render(<CommandMenu />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should have flex container', () => {
    const { container } = render(<CommandMenu />);
    
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('should render search icon SVG', () => {
    const { container } = render(<CommandMenu />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have hover styles on button', () => {
    render(<CommandMenu />);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('hover:bg-gray-100');
  });
});
