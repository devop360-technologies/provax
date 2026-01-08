import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
}));

describe('Card Components', () => {
  describe('Card', () => {
    it('renders a card element', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
    });

    it('renders children', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass('custom-class');
    });

    it('renders as div by default', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.querySelector('[data-slot="card"]');
      expect(card?.tagName).toBe('DIV');
    });
  });

  describe('CardHeader', () => {
    it('renders card header', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.querySelector('[data-slot="card-header"]');
      expect(header).toBeInTheDocument();
    });

    it('renders header content', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('renders card title', () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.querySelector('[data-slot="card-title"]');
      expect(title).toBeInTheDocument();
    });

    it('renders title text', () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('renders card description', () => {
      const { container } = render(<CardDescription>Description</CardDescription>);
      const description = container.querySelector('[data-slot="card-description"]');
      expect(description).toBeInTheDocument();
    });

    it('renders description text', () => {
      render(<CardDescription>Card Description</CardDescription>);
      expect(screen.getByText('Card Description')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('renders card content', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
    });

    it('renders content text', () => {
      render(<CardContent>Card Content</CardContent>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders card footer', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.querySelector('[data-slot="card-footer"]');
      expect(footer).toBeInTheDocument();
    });

    it('renders footer content', () => {
      render(<CardFooter>Card Footer</CardFooter>);
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });
  });

  describe('Complete Card Structure', () => {
    it('renders full card structure', () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('maintains proper nesting', () => {
      const { container } = render(
        <Card className="outer">
          <CardHeader className="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent className="content">Data</CardContent>
        </Card>
      );

      const card = container.querySelector('[data-slot="card"]');
      const header = card?.querySelector('[data-slot="card-header"]');
      expect(header).toBeInTheDocument();
    });
  });
});
