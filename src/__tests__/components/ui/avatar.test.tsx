/**
 * Tests for Avatar component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

describe('Avatar Component', () => {
  describe('Avatar', () => {
    it('should render with default classes', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-slot', 'avatar');
    });

    it('should apply custom className', () => {
      render(<Avatar className="custom-avatar" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar.className).toContain('custom-avatar');
    });

    it('should render children', () => {
      render(
        <Avatar>
          <span data-testid="child">Child</span>
        </Avatar>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should have relative positioning', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar.className).toContain('relative');
    });

    it('should have overflow hidden', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar.className).toContain('overflow-hidden');
    });
  });

  describe('AvatarFallback', () => {
    it('should render fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">FB</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('fallback');
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
    });

    it('should apply custom className', () => {
      render(
        <Avatar>
          <AvatarFallback className="custom-fallback" data-testid="fallback">
            FB
          </AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('fallback');
      expect(fallback.className).toContain('custom-fallback');
    });

    it('should have flex centering', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">FB</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByTestId('fallback');
      expect(fallback.className).toContain('flex');
      expect(fallback.className).toContain('items-center');
      expect(fallback.className).toContain('justify-center');
    });
  });

  describe('Avatar Composition', () => {
    it('should render avatar with only fallback', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render avatar with multiple character fallback', () => {
      render(
        <Avatar>
          <AvatarFallback>ABC</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('ABC')).toBeInTheDocument();
    });

    it('should render avatar with emoji fallback', () => {
      render(
        <Avatar>
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('👤')).toBeInTheDocument();
    });
  });
});
