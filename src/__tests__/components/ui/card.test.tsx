import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Component', () => {
  it('renders card', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('renders card with data-slot attribute', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card');
  });

  it('renders card with custom className', () => {
    render(<Card className="custom-card" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('custom-card');
  });

  it('renders card with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});

describe('CardHeader Component', () => {
  it('renders card header', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders card header with data-slot attribute', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'card-header');
  });

  it('renders card header with custom className', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
  });
});

describe('CardTitle Component', () => {
  it('renders card title', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders card title with data-slot attribute', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'card-title');
  });

  it('renders card title with custom className', () => {
    render(<CardTitle className="custom-title" data-testid="title">Title</CardTitle>);
    expect(screen.getByTestId('title')).toHaveClass('custom-title');
  });
});

describe('CardDescription Component', () => {
  it('renders card description', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders card description with data-slot attribute', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'card-description');
  });

  it('renders card description with custom className', () => {
    render(<CardDescription className="custom-desc" data-testid="desc">Description</CardDescription>);
    expect(screen.getByTestId('desc')).toHaveClass('custom-desc');
  });
});

describe('CardAction Component', () => {
  it('renders card action', () => {
    render(<CardAction data-testid="action">Action</CardAction>);
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  it('renders card action with data-slot attribute', () => {
    render(<CardAction data-testid="action">Action</CardAction>);
    expect(screen.getByTestId('action')).toHaveAttribute('data-slot', 'card-action');
  });

  it('renders card action with custom className', () => {
    render(<CardAction className="custom-action" data-testid="action">Action</CardAction>);
    expect(screen.getByTestId('action')).toHaveClass('custom-action');
  });
});

describe('CardContent Component', () => {
  it('renders card content', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders card content with data-slot attribute', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'card-content');
  });

  it('renders card content with custom className', () => {
    render(<CardContent className="custom-content" data-testid="content">Content</CardContent>);
    expect(screen.getByTestId('content')).toHaveClass('custom-content');
  });
});

describe('CardFooter Component', () => {
  it('renders card footer', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders card footer with data-slot attribute', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveAttribute('data-slot', 'card-footer');
  });

  it('renders card footer with custom className', () => {
    render(<CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });
});

describe('Full Card Structure', () => {
  it('renders complete card structure', () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('full-card')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });
});
