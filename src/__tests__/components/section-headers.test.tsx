import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from '@/components/section-headers';

describe('SectionHeader Component', () => {
  it('should render title', () => {
    render(<SectionHeader title="Welcome" />);
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome');
  });

  it('should render subtitle when provided', () => {
    render(<SectionHeader title="Welcome" subtitle="Getting Started" />);
    
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<SectionHeader title="Welcome" description="This is the description" />);
    
    expect(screen.getByText('This is the description')).toBeInTheDocument();
  });

  it('should be centered by default', () => {
    const { container } = render(<SectionHeader title="Welcome" />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-center');
    expect(wrapper.className).toContain('mx-auto');
  });

  it('should not be centered when centered=false', () => {
    const { container } = render(<SectionHeader title="Welcome" centered={false} />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('text-center');
  });

  it('should apply custom className', () => {
    const { container } = render(<SectionHeader title="Welcome" className="custom-class" />);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });

  it('should have subtitle with uppercase styling', () => {
    render(<SectionHeader title="Welcome" subtitle="Intro" />);
    
    const subtitle = screen.getByText('Intro');
    expect(subtitle.className).toContain('uppercase');
    expect(subtitle.className).toContain('tracking-wider');
  });

  it('should render all sections together', () => {
    render(
      <SectionHeader 
        title="Main Title" 
        subtitle="Subtitle" 
        description="Description text" 
      />
    );
    
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('should have responsive heading size classes', () => {
    render(<SectionHeader title="Welcome" />);
    
    const heading = screen.getByRole('heading');
    expect(heading.className).toContain('text-3xl');
    expect(heading.className).toContain('md:text-4xl');
    expect(heading.className).toContain('lg:text-5xl');
  });
});
