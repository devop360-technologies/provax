/**
 * Tests for Table component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

describe('Table Component', () => {
  const renderTable = () => {
    return render(
      <Table>
        <TableCaption>Table Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: 2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };

  describe('Table', () => {
    it('should render table with role attribute', () => {
      renderTable();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      renderTable();
      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('data-slot', 'table');
    });

    it('should apply custom className', () => {
      render(
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table.className).toContain('custom-table');
    });
  });

  describe('TableHeader', () => {
    it('should render header', () => {
      renderTable();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableHeader data-testid="header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveAttribute('data-slot', 'table-header');
    });
  });

  describe('TableBody', () => {
    it('should render body cells', () => {
      renderTable();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableBody data-testid="body">
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const body = screen.getByTestId('body');
      expect(body).toHaveAttribute('data-slot', 'table-body');
    });
  });

  describe('TableFooter', () => {
    it('should render footer', () => {
      renderTable();
      expect(screen.getByText('Total: 2 users')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableFooter data-testid="footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveAttribute('data-slot', 'table-footer');
    });
  });

  describe('TableRow', () => {
    it('should render rows', () => {
      renderTable();
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThanOrEqual(2);
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('row');
      expect(row).toHaveAttribute('data-slot', 'table-row');
    });

    it('should apply custom className', () => {
      render(
        <Table>
          <TableBody>
            <TableRow className="custom-row" data-testid="row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('row');
      expect(row.className).toContain('custom-row');
    });
  });

  describe('TableHead', () => {
    it('should render header cells', () => {
      renderTable();
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="head">Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId('head');
      expect(head).toHaveAttribute('data-slot', 'table-head');
    });
  });

  describe('TableCell', () => {
    it('should render cells', () => {
      renderTable();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveAttribute('data-slot', 'table-cell');
    });

    it('should support colSpan', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} data-testid="cell">Spanning Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveAttribute('colspan', '3');
    });
  });

  describe('TableCaption', () => {
    it('should render caption', () => {
      renderTable();
      expect(screen.getByText('Table Caption')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(
        <Table>
          <TableCaption data-testid="caption">Caption</TableCaption>
        </Table>
      );
      const caption = screen.getByTestId('caption');
      expect(caption).toHaveAttribute('data-slot', 'table-caption');
    });
  });
});
