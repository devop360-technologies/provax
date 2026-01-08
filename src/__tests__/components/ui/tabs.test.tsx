/**
 * Tests for Tabs component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

describe('Tabs Component', () => {
  const renderTabs = () => {
    return render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );
  };

  describe('Tabs', () => {
    it('should render tabs with default value', () => {
      renderTabs();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should render all tab triggers', () => {
      renderTabs();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });
  });

  describe('TabsList', () => {
    it('should render tab list', () => {
      renderTabs();
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const tabList = screen.getByRole('tablist');
      expect(tabList.className).toContain('custom-list');
    });
  });

  describe('TabsTrigger', () => {
    it('should have active state on selected tab', () => {
      renderTabs();
      const tab1 = screen.getByText('Tab 1');
      expect(tab1).toHaveAttribute('data-state', 'active');
    });

    it('should switch tabs on click', async () => {
      const user = userEvent.setup();
      renderTabs();
      
      await user.click(screen.getByText('Tab 2'));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
      renderTabs();
      const disabledTab = screen.getByText('Tab 3');
      expect(disabledTab).toBeDisabled();
    });

    it('should apply custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const trigger = screen.getByText('Tab 1');
      expect(trigger.className).toContain('custom-trigger');
    });
  });

  describe('TabsContent', () => {
    it('should show content for active tab', () => {
      renderTabs();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content" data-testid="content">
            Content 1
          </TabsContent>
        </Tabs>
      );
      const content = screen.getByTestId('content');
      expect(content.className).toContain('custom-content');
    });
  });

  describe('Controlled Tabs', () => {
    it('should work with controlled value', () => {
      const { rerender } = render(
        <Tabs value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      rerender(
        <Tabs value="tab2">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });
});
