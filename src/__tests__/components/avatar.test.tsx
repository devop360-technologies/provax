import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Avatar Component', () => {
  describe('Avatar', () => {
    it('renders an avatar container', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('renders children', () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(<Avatar className="custom-class" />);
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('custom-class');
    });
  });

  describe('AvatarImage', () => {
    it('renders with fallback when no image', () => {
      render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('supports src prop', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
        </Avatar>
      );
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });

    it('accepts alt text', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
        </Avatar>
      );
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });

    it('renders in avatar container', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
        </Avatar>
      );
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('AvatarFallback', () => {
    it('renders fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders with correct attributes', () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      const fallback = container.querySelector('[data-slot="avatar-fallback"]');
      expect(fallback).toBeInTheDocument();
    });

    it('applies correct styling', () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback>Admin</AvatarFallback>
        </Avatar>
      );
      const fallback = container.querySelector('[data-slot="avatar-fallback"]');
      expect(fallback).toHaveClass('flex');
      expect(fallback).toHaveClass('items-center');
      expect(fallback).toHaveClass('justify-center');
    });

    it('shows when image fails to load', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/invalid.jpg" alt="User" />
          <AvatarFallback>FallBack</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText('FallBack')).toBeInTheDocument();
    });
  });

  describe('Avatar Integration', () => {
    it('renders complete avatar with image and fallback', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      
      expect(screen.getByText('JD')).toBeInTheDocument();
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('applies rounded styling', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('relative');
      expect(avatar).toHaveClass('flex');
      expect(avatar).toHaveClass('size-8');
      expect(avatar).toHaveClass('rounded');
    });

    it('maintains aspect ratio with overflow hidden', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('overflow-hidden');
    });

    it('works with different sizes via className', () => {
      const { container: smallContainer } = render(<Avatar className="h-8 w-8" />);
      const smallAvatar = smallContainer.querySelector('[data-slot="avatar"]');
      expect(smallAvatar).toHaveClass('h-8');
      expect(smallAvatar).toHaveClass('w-8');
    });
  });
});
