/**
 * Tests for Collapsible component
 * Note: Radix Collapsible removes content from DOM when closed (forceMount can change this)
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

describe('Collapsible Component', () => {
  const renderCollapsible = (props = {}) => {
    return render(
      <Collapsible {...props}>
        <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Collapsible Content</p>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  describe('Collapsible', () => {
    it('should render trigger', () => {
      renderCollapsible();
      expect(screen.getByText('Toggle Content')).toBeInTheDocument();
    });

    it('should be closed by default', () => {
      renderCollapsible();
      // Radix Collapsible removes content from DOM when closed
      expect(screen.queryByText('Collapsible Content')).not.toBeInTheDocument();
    });

    it('should toggle content on trigger click', async () => {
      const user = userEvent.setup();
      renderCollapsible();

      await user.click(screen.getByText('Toggle Content'));
      expect(screen.getByText('Collapsible Content')).toBeInTheDocument();

      await user.click(screen.getByText('Toggle Content'));
      // Content is removed from DOM when closed
      expect(screen.queryByText('Collapsible Content')).not.toBeInTheDocument();
    });
  });

  describe('CollapsibleTrigger', () => {
    it('should render as button', () => {
      renderCollapsible();
      const trigger = screen.getByText('Toggle Content');
      expect(trigger.tagName).toBe('BUTTON');
    });

    it('should support asChild prop', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger asChild>
            <span>Custom Trigger</span>
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );
      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    });
  });

  describe('CollapsibleContent', () => {
    it('should render children when open', async () => {
      const user = userEvent.setup();
      renderCollapsible();

      await user.click(screen.getByText('Toggle Content'));
      expect(screen.getByText('Collapsible Content')).toBeInTheDocument();
    });
  });

  describe('Controlled Collapsible', () => {
    it('should work with controlled open state', () => {
      const { rerender } = render(
        <Collapsible open={false}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );

      // Content not in DOM when closed
      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      rerender(
        <Collapsible open={true}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should call onOpenChange when toggled', async () => {
      const handleOpenChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Collapsible onOpenChange={handleOpenChange}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );

      await user.click(screen.getByText('Toggle'));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Default open Collapsible', () => {
    it('should be open when defaultOpen is true', () => {
      render(
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Disabled Collapsible', () => {
    it('should not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible disabled>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
      );

      await user.click(screen.getByText('Toggle'));
      // Content stays out of DOM when disabled
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });
});
