/**
 * Comprehensive tests for Heading component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '@/components/heading';

describe('Heading Component', () => {
  describe('Default rendering', () => {
    it('should render with children', () => {
      render(<Heading>Test Heading</Heading>);
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });

    it('should render as h1 by default', () => {
      render(<Heading>Test Heading</Heading>);
      const heading = screen.getByText('Test Heading');
      expect(heading.tagName).toBe('H1');
    });

    it('should have default size styles', () => {
      render(<Heading data-testid="heading">Test</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('font-mono');
    });
  });

  describe('as prop', () => {
    it('should render as h1', () => {
      render(<Heading as="h1">Heading 1</Heading>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should render as h2', () => {
      render(<Heading as="h2">Heading 2</Heading>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should render as h3', () => {
      render(<Heading as="h3">Heading 3</Heading>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should render as h4', () => {
      render(<Heading as="h4">Heading 4</Heading>);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('should render as h5', () => {
      render(<Heading as="h5">Heading 5</Heading>);
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    });

    it('should render as h6', () => {
      render(<Heading as="h6">Heading 6</Heading>);
      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });
  });

  describe('size prop', () => {
    it('should render with default size', () => {
      render(<Heading size="default" data-testid="heading">Default</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('text-lg');
    });

    it('should render with lg size', () => {
      render(<Heading size="lg" data-testid="heading">Large</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('text-xl');
    });

    it('should render with xl size', () => {
      render(<Heading size="xl" data-testid="heading">Extra Large</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('text-4xl');
    });

    it('should render with 2xl size', () => {
      render(<Heading size="2xl" data-testid="heading">2XL</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('text-3xl');
    });

    it('should render with 3xl size', () => {
      render(<Heading size="3xl" data-testid="heading">3XL</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('text-4xl');
    });
  });

  describe('className prop', () => {
    it('should apply custom className', () => {
      render(<Heading className="custom-class" data-testid="heading">Test</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('custom-class');
    });

    it('should merge custom className with default styles', () => {
      render(<Heading className="text-red-500" data-testid="heading">Test</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading.className).toContain('font-mono');
      expect(heading.className).toContain('text-red-500');
    });
  });

  describe('Additional props', () => {
    it('should pass data attributes', () => {
      render(<Heading data-custom="value" data-testid="heading">Test</Heading>);
      const heading = screen.getByTestId('heading');
      expect(heading).toHaveAttribute('data-custom', 'value');
    });

    it('should support id attribute', () => {
      render(<Heading id="main-heading">Test</Heading>);
      expect(document.getElementById('main-heading')).toBeInTheDocument();
    });
  });
});
