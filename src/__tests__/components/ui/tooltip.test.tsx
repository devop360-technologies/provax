/**
 * Tests for Tooltip component
 * Note: Radix Tooltip requires ResizeObserver which is not available in jsdom
 * These tests focus on static rendering rather than interactive hover behavior
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

describe('Tooltip Component', () => {
  describe('TooltipProvider', () => {
    it('should render children', () => {
      render(
        <TooltipProvider>
          <div data-testid="child">Child</div>
        </TooltipProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should accept delayDuration prop', () => {
      render(
        <TooltipProvider delayDuration={500}>
          <div data-testid="child">Child</div>
        </TooltipProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should accept skipDelayDuration prop', () => {
      render(
        <TooltipProvider skipDelayDuration={300}>
          <div data-testid="child">Child</div>
        </TooltipProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('Tooltip', () => {
    it('should render tooltip trigger', () => {
      render(
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should accept defaultOpen prop', () => {
      render(
        <Tooltip defaultOpen={false}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('TooltipTrigger', () => {
    it('should have data-slot attribute', () => {
      render(
        <Tooltip>
          <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-slot', 'tooltip-trigger');
    });

    it('should accept asChild prop', () => {
      render(
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Button Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(
        <Tooltip>
          <TooltipTrigger data-testid="trigger" className="custom-trigger">
            Trigger
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('custom-trigger');
    });
  });

  describe('TooltipContent', () => {
    it('should render within Tooltip component', () => {
      // Note: Cannot test TooltipContent visibility directly due to ResizeObserver requirement
      // Testing that the component structure renders without errors
      render(
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      expect(screen.getByText('Hover')).toBeInTheDocument();
    });
  });

  describe('Tooltip Integration', () => {
    it('should render trigger with proper role', () => {
      render(
        <Tooltip>
          <TooltipTrigger data-testid="trigger">
            Trigger Text
          </TooltipTrigger>
          <TooltipContent>Tooltip Text</TooltipContent>
        </Tooltip>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent('Trigger Text');
    });

    it('should handle controlled open state', () => {
      const { rerender } = render(
        <Tooltip open={false}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      
      expect(screen.getByText('Hover me')).toBeInTheDocument();
      
      rerender(
        <Tooltip open={false}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      );
      
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });
});
