import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';

describe('Sheet Component', () => {
  it('renders sheet trigger', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
      </Sheet>
    );
    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('opens sheet when trigger is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    
    fireEvent.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('renders sheet header', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader data-testid="sheet-header">Header Content</SheetHeader>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('sheet-header')).toBeInTheDocument();
  });

  it('renders sheet footer', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetFooter data-testid="sheet-footer">Footer Content</SheetFooter>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('sheet-footer')).toBeInTheDocument();
  });

  it('renders sheet description', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetDescription>This is a description</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders close button in sheet content', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('renders sheet on right side by default', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent data-testid="sheet-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const content = screen.getByTestId('sheet-content');
    expect(content).toHaveAttribute('data-slot', 'sheet-content');
  });

  it('renders sheet on left side', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left" data-testid="sheet-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const content = screen.getByTestId('sheet-content');
    expect(content).toBeInTheDocument();
  });

  it('renders sheet on top', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="top" data-testid="sheet-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
  });

  it('renders sheet on bottom', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="bottom" data-testid="sheet-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
  });

  it('applies custom className to content', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent className="custom-sheet" data-testid="sheet-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('sheet-content')).toHaveClass('custom-sheet');
  });

  it('renders SheetClose component', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetClose data-testid="close-btn">Close</SheetClose>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('close-btn')).toBeInTheDocument();
  });

  it('SheetHeader has correct data-slot', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader data-testid="header">Header</SheetHeader>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'sheet-header');
  });

  it('SheetFooter has correct data-slot', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetFooter data-testid="footer">Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('footer')).toHaveAttribute('data-slot', 'sheet-footer');
  });

  it('SheetTitle has correct data-slot', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle data-testid="title">Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'sheet-title');
  });

  it('SheetDescription has correct data-slot', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetDescription data-testid="desc">Description</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'sheet-description');
  });
});
