/**
 * Tests for Dialog component
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

describe('Dialog Component', () => {
  const renderDialog = (props = {}) => {
    return render(
      <Dialog {...props}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Body Content</div>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  describe('DialogTrigger', () => {
    it('should render trigger button', () => {
      renderDialog();
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="trigger">Open</DialogTrigger>
        </Dialog>
      );
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('data-slot', 'dialog-trigger');
    });
  });

  describe('Dialog open/close', () => {
    it('should open dialog on trigger click', async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByText('Open Dialog'));

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      });
    });

    it('should show dialog content when open', async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByText('Open Dialog'));

      await waitFor(() => {
        expect(screen.getByText('Dialog Body Content')).toBeInTheDocument();
      });
    });
  });

  describe('DialogHeader', () => {
    it('should render header content', async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByText('Open Dialog'));

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        expect(screen.getByText('Dialog Description')).toBeInTheDocument();
      });
    });

    it('should have data-slot attribute', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="header">Header</DialogHeader>
          </DialogContent>
        </Dialog>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveAttribute('data-slot', 'dialog-header');
    });
  });

  describe('DialogFooter', () => {
    it('should render footer content', async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByText('Open Dialog'));

      await waitFor(() => {
        // Use getAllByText since there are multiple "Close" elements (button and sr-only text)
        const closeButtons = screen.getAllByText('Close');
        expect(closeButtons.length).toBeGreaterThan(0);
      });
    });

    it('should have data-slot attribute', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogFooter data-testid="footer">Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveAttribute('data-slot', 'dialog-footer');
    });
  });

  describe('DialogContent', () => {
    it('should apply custom className', () => {
      render(
        <Dialog open>
          <DialogContent className="custom-dialog" data-testid="content">
            Content
          </DialogContent>
        </Dialog>
      );
      const content = screen.getByTestId('content');
      expect(content.className).toContain('custom-dialog');
    });
  });

  describe('Controlled Dialog', () => {
    it('should work with controlled open state', () => {
      const { rerender } = render(
        <Dialog open={false}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText('Title')).not.toBeInTheDocument();

      rerender(
        <Dialog open={true}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });
});
