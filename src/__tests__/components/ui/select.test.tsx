/**
 * Tests for Select component
 * Note: Radix Select requires pointer capture APIs not available in jsdom
 * These tests focus on static rendering rather than interactive dropdown behavior
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select';

describe('Select Component', () => {
  describe('SelectTrigger', () => {
    it('should render trigger with placeholder', () => {
      render(
        <Select>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger" data-testid="trigger">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger.className).toContain('custom-trigger');
    });

    it('should be disabled when disabled prop is true', () => {
      render(
        <Select disabled>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeDisabled();
    });

    it('should have combobox role', () => {
      render(
        <Select>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should render with proper aria attributes', () => {
      render(
        <Select>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Select with default value', () => {
    it('should show default value', () => {
      render(
        <Select defaultValue="option1">
          <SelectTrigger data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should show controlled value', () => {
      render(
        <Select value="option2">
          <SelectTrigger data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  describe('SelectValue', () => {
    it('should render placeholder when no value', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose..." />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByText('Choose...')).toBeInTheDocument();
    });
  });

  describe('Select integration', () => {
    it('should render select with groups', () => {
      render(
        <Select defaultValue="apple">
          <SelectTrigger data-testid="trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should accept onValueChange callback', () => {
      const handleChange = jest.fn();
      render(
        <Select onValueChange={handleChange}>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByTestId('trigger')).toBeInTheDocument();
    });

    it('should support name prop for forms', () => {
      render(
        <Select name="fruit" defaultValue="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should support required prop', () => {
      render(
        <Select required>
          <SelectTrigger data-testid="trigger">
            <SelectValue placeholder="Required" />
          </SelectTrigger>
        </Select>
      );
      expect(screen.getByTestId('trigger')).toBeInTheDocument();
    });
  });
});
