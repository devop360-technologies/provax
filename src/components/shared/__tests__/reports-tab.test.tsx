import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportsTab } from '../reports-tab';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid={`image-${alt}`} {...props} />
  ),
}));

describe('ReportsTab', () => {
  it('should render Reports heading', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('should render PDF Report section', () => {
    render(<ReportsTab />);
    expect(screen.getByText('PDF Report')).toBeInTheDocument();
    expect(screen.getByText('Complete certification report in PDF format')).toBeInTheDocument();
  });

  it('should render QR Code section', () => {
    render(<ReportsTab />);
    expect(screen.getByText('QR Code')).toBeInTheDocument();
    expect(screen.getByText('Embedded QR code for quick verification')).toBeInTheDocument();
  });

  it('should render Shareable Link section', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Shareable Link')).toBeInTheDocument();
    expect(screen.getByText('Public link for sharing certification')).toBeInTheDocument();
  });

  it('should render default shareable link', () => {
    render(<ReportsTab />);
    expect(screen.getByText('https://cert.example.com/CERT-4582')).toBeInTheDocument();
  });

  it('should render custom shareable link', () => {
    render(<ReportsTab shareableLink="https://custom.link/ABC123" />);
    expect(screen.getByText('https://custom.link/ABC123')).toBeInTheDocument();
  });

  it('should render View Report button', () => {
    render(<ReportsTab />);
    expect(screen.getByText('View Report')).toBeInTheDocument();
  });

  it('should render Download button', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should render Generate New QR button', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Generate New QR')).toBeInTheDocument();
  });

  it('should render Copy Link button', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Copy Link')).toBeInTheDocument();
  });

  it('should render Share button', () => {
    render(<ReportsTab />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('should call onViewReport when View Report is clicked', () => {
    const onViewReport = jest.fn();
    render(<ReportsTab onViewReport={onViewReport} />);
    fireEvent.click(screen.getByText('View Report'));
    expect(onViewReport).toHaveBeenCalled();
  });

  it('should call onDownload when Download is clicked', () => {
    const onDownload = jest.fn();
    render(<ReportsTab onDownload={onDownload} />);
    fireEvent.click(screen.getByText('Download'));
    expect(onDownload).toHaveBeenCalled();
  });

  it('should call onGenerateQR when Generate New QR is clicked', () => {
    const onGenerateQR = jest.fn();
    render(<ReportsTab onGenerateQR={onGenerateQR} />);
    fireEvent.click(screen.getByText('Generate New QR'));
    expect(onGenerateQR).toHaveBeenCalled();
  });

  it('should call onCopyLink when Copy Link is clicked', () => {
    const onCopyLink = jest.fn();
    render(<ReportsTab onCopyLink={onCopyLink} />);
    fireEvent.click(screen.getByText('Copy Link'));
    expect(onCopyLink).toHaveBeenCalled();
  });

  it('should call onShare when Share is clicked', () => {
    const onShare = jest.fn();
    render(<ReportsTab onShare={onShare} />);
    fireEvent.click(screen.getByText('Share'));
    expect(onShare).toHaveBeenCalled();
  });

  it('should render PDF icon image', () => {
    render(<ReportsTab />);
    expect(screen.getByTestId('image-PDF')).toBeInTheDocument();
  });

  it('should render QR Code icon image', () => {
    render(<ReportsTab />);
    const qrImages = screen.getAllByTestId('image-QR Code');
    expect(qrImages.length).toBeGreaterThan(0);
  });

  it('should render Share icon image', () => {
    render(<ReportsTab />);
    expect(screen.getByTestId('image-Share')).toBeInTheDocument();
  });

  it('should have all buttons with type="button"', () => {
    render(<ReportsTab />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
