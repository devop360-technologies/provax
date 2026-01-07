import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaGallery, DEFAULT_MEDIA_ITEMS } from '../media-gallery';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onError, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="media-image" {...props} />
  ),
}));

describe('MediaGallery', () => {
  const mockItems = [
    { id: 1, title: 'Test Image 1', image: '/test1.png' },
    { id: 2, title: 'Test Image 2', image: '/test2.png' },
    { id: 3, title: 'Test Image 3', image: '/test3.png' },
  ];

  it('should render with default title', () => {
    render(<MediaGallery items={mockItems} />);
    expect(screen.getByText('Uploaded Media')).toBeInTheDocument();
  });

  it('should render custom title', () => {
    render(<MediaGallery items={mockItems} title="Custom Gallery" />);
    expect(screen.getByText('Custom Gallery')).toBeInTheDocument();
  });

  it('should render all items', () => {
    render(<MediaGallery items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('should render images for each item', () => {
    render(<MediaGallery items={mockItems} />);
    const images = screen.getAllByTestId('media-image');
    expect(images).toHaveLength(mockItems.length);
  });

  it('should render View and Approve buttons', () => {
    render(<MediaGallery items={mockItems} />);
    const viewButtons = screen.getAllByText('View');
    const approveButtons = screen.getAllByText('Approve');
    expect(viewButtons).toHaveLength(mockItems.length);
    expect(approveButtons).toHaveLength(mockItems.length);
  });

  it('should call onView when View button is clicked', () => {
    const onView = jest.fn();
    render(<MediaGallery items={mockItems} onView={onView} />);
    const viewButtons = screen.getAllByText('View');
    fireEvent.click(viewButtons[0]);
    expect(onView).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should call onApprove when Approve button is clicked', () => {
    const onApprove = jest.fn();
    render(<MediaGallery items={mockItems} onApprove={onApprove} />);
    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[1]);
    expect(onApprove).toHaveBeenCalledWith(mockItems[1]);
  });

  it('should not crash when onView is not provided', () => {
    render(<MediaGallery items={mockItems} />);
    const viewButtons = screen.getAllByText('View');
    expect(() => fireEvent.click(viewButtons[0])).not.toThrow();
  });

  it('should not crash when onApprove is not provided', () => {
    render(<MediaGallery items={mockItems} />);
    const approveButtons = screen.getAllByText('Approve');
    expect(() => fireEvent.click(approveButtons[0])).not.toThrow();
  });

  it('should render empty when items array is empty', () => {
    render(<MediaGallery items={[]} />);
    expect(screen.getByText('Uploaded Media')).toBeInTheDocument();
    expect(screen.queryByTestId('media-image')).not.toBeInTheDocument();
  });
});

describe('DEFAULT_MEDIA_ITEMS', () => {
  it('should have 6 items', () => {
    expect(DEFAULT_MEDIA_ITEMS).toHaveLength(6);
  });

  it('should have required properties for each item', () => {
    DEFAULT_MEDIA_ITEMS.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('image');
      expect(typeof item.id).toBe('number');
      expect(typeof item.title).toBe('string');
      expect(typeof item.image).toBe('string');
    });
  });

  it('should have unique ids', () => {
    const ids = DEFAULT_MEDIA_ITEMS.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
