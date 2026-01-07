import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportsTab } from '../reports-tab';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} data-testid={`image-${alt}`} {...props} />,
}));

describe('ReportsTab', () => {
  const renderTab = (props = {}) => render(<ReportsTab {...props} />);

  it('renders all main sections', () => {
    renderTab();
    ['Reports', 'PDF Report', 'QR Code', 'Shareable Link'].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders section descriptions', () => {
    renderTab();
    expect(screen.getByText('Complete certification report in PDF format')).toBeInTheDocument();
    expect(screen.getByText('Embedded QR code for quick verification')).toBeInTheDocument();
    expect(screen.getByText('Public link for sharing certification')).toBeInTheDocument();
  });

  it('renders default shareable link', () => {
    renderTab();
    expect(screen.getByText('https://cert.example.com/CERT-4582')).toBeInTheDocument();
  });

  it('renders custom shareable link', () => {
    renderTab({ shareableLink: 'https://custom.link/ABC123' });
    expect(screen.getByText('https://custom.link/ABC123')).toBeInTheDocument();
  });

  it.each([
    ['View Report', 'onViewReport'],
    ['Download', 'onDownload'],
    ['Generate New QR', 'onGenerateQR'],
    ['Copy Link', 'onCopyLink'],
    ['Share', 'onShare'],
  ])('calls %s callback when clicked', (buttonText, callbackName) => {
    const callback = jest.fn();
    renderTab({ [callbackName]: callback });
    fireEvent.click(screen.getByText(buttonText));
    expect(callback).toHaveBeenCalled();
  });

  it('renders all icon images', () => {
    renderTab();
    expect(screen.getByTestId('image-PDF')).toBeInTheDocument();
    expect(screen.getAllByTestId('image-QR Code').length).toBeGreaterThan(0);
    expect(screen.getByTestId('image-Share')).toBeInTheDocument();
  });

  it('has all buttons with type="button"', () => {
    renderTab();
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
