/**
 * Tests for Alert component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

describe('Alert Component', () => {
  describe('Alert', () => {
    it('should render with default variant', () => {
      render(<Alert data-testid="alert">Alert content</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('should render with destructive variant', () => {
      render(<Alert variant="destructive" data-testid="alert">Error</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
      expect(alert.className).toContain('destructive');
    });

    it('should apply custom className', () => {
      render(<Alert className="custom-class" data-testid="alert">Alert</Alert>);
      const alert = screen.getByTestId('alert');
      expect(alert.className).toContain('custom-class');
    });

    it('should render children', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('AlertTitle', () => {
    it('should render as h5 element', () => {
      render(<AlertTitle>Title</AlertTitle>);
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H5');
    });

    it('should apply custom className', () => {
      render(<AlertTitle className="custom-title">Title</AlertTitle>);
      const title = screen.getByText('Title');
      expect(title.className).toContain('custom-title');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<AlertTitle ref={ref}>Title</AlertTitle>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('AlertDescription', () => {
    it('should render as div element', () => {
      render(<AlertDescription data-testid="desc">Description</AlertDescription>);
      const desc = screen.getByTestId('desc');
      expect(desc.tagName).toBe('DIV');
    });

    it('should apply custom className', () => {
      render(<AlertDescription className="custom-desc">Description</AlertDescription>);
      const desc = screen.getByText('Description');
      expect(desc.className).toContain('custom-desc');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<AlertDescription ref={ref}>Description</AlertDescription>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Alert Composition', () => {
    it('should render complete alert with title and description', () => {
      render(
        <Alert>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>Alert Description</AlertDescription>
        </Alert>
      );
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Alert Description')).toBeInTheDocument();
    });

    it('should render destructive alert with title and description', () => {
      render(
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      );
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
