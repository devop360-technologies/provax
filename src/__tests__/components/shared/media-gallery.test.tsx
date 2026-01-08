import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaGallery, DEFAULT_MEDIA_ITEMS } from '@/components/shared/media-gallery';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    const { src, alt, onError, ...rest } = props;
    return <img src={src as string} alt={alt} {...rest} />;
  },
}));

describe('MediaGallery Component', () => {
  const mockItems = [
    { id: 1, title: 'Front View', image: '/test/front.png' },
    { id: 2, title: 'Rear View', image: '/test/rear.png' },
    { id: 3, title: 'Side View', image: '/test/side.png' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default title', () => {
    render(<MediaGallery items={mockItems} />);
    expect(screen.getByText('Uploaded Media')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<MediaGallery items={mockItems} title="Vehicle Photos" />);
    expect(screen.getByText('Vehicle Photos')).toBeInTheDocument();
  });

  it('renders all media items', () => {
    render(<MediaGallery items={mockItems} />);
    expect(screen.getByText('Front View')).toBeInTheDocument();
    expect(screen.getByText('Rear View')).toBeInTheDocument();
    expect(screen.getByText('Side View')).toBeInTheDocument();
  });

  it('renders images for each item', () => {
    render(<MediaGallery items={mockItems} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });

  it('renders View button for each item', () => {
    render(<MediaGallery items={mockItems} onView={jest.fn()} />);
    const viewButtons = screen.getAllByText('View');
    expect(viewButtons).toHaveLength(3);
  });

  it('renders Approve button for each item', () => {
    render(<MediaGallery items={mockItems} onApprove={jest.fn()} />);
    const approveButtons = screen.getAllByText('Approve');
    expect(approveButtons).toHaveLength(3);
  });

  it('calls onView when View button is clicked', () => {
    const handleView = jest.fn();
    render(<MediaGallery items={mockItems} onView={handleView} />);
    
    const viewButtons = screen.getAllByText('View');
    fireEvent.click(viewButtons[0]);
    
    expect(handleView).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls onApprove when Approve button is clicked', () => {
    const handleApprove = jest.fn();
    render(<MediaGallery items={mockItems} onApprove={handleApprove} />);
    
    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[1]);
    
    expect(handleApprove).toHaveBeenCalledWith(mockItems[1]);
  });

  it('renders correct image alt text', () => {
    render(<MediaGallery items={mockItems} />);
    expect(screen.getByAltText('Front View')).toBeInTheDocument();
    expect(screen.getByAltText('Rear View')).toBeInTheDocument();
    expect(screen.getByAltText('Side View')).toBeInTheDocument();
  });

  it('renders empty gallery when no items provided', () => {
    render(<MediaGallery items={[]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('has correct container styling', () => {
    const { container } = render(<MediaGallery items={mockItems} />);
    const wrapper = container.querySelector('.rounded-xl');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('border');
    expect(wrapper).toHaveClass('bg-[#1D1D41]');
  });

  it('has grid layout for items', () => {
    const { container } = render(<MediaGallery items={mockItems} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-3');
  });

  it('does not call onView when not provided', () => {
    render(<MediaGallery items={mockItems} />);
    const viewButtons = screen.getAllByText('View');
    // Should not throw error
    fireEvent.click(viewButtons[0]);
  });

  it('does not call onApprove when not provided', () => {
    render(<MediaGallery items={mockItems} />);
    const approveButtons = screen.getAllByText('Approve');
    // Should not throw error
    fireEvent.click(approveButtons[0]);
  });
});

describe('DEFAULT_MEDIA_ITEMS', () => {
  it('exports default media items array', () => {
    expect(Array.isArray(DEFAULT_MEDIA_ITEMS)).toBe(true);
    expect(DEFAULT_MEDIA_ITEMS.length).toBe(6);
  });

  it('has correct structure for each item', () => {
    DEFAULT_MEDIA_ITEMS.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('image');
      expect(typeof item.id).toBe('number');
      expect(typeof item.title).toBe('string');
      expect(typeof item.image).toBe('string');
    });
  });

  it('has unique ids', () => {
    const ids = DEFAULT_MEDIA_ITEMS.map(item => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has valid image paths', () => {
    DEFAULT_MEDIA_ITEMS.forEach(item => {
      expect(item.image).toMatch(/^\/.*\.(png|jpg|jpeg|gif)$/);
    });
  });

  it('contains expected items', () => {
    const titles = DEFAULT_MEDIA_ITEMS.map(item => item.title);
    expect(titles).toContain('Front View');
    expect(titles).toContain('Rear View');
    expect(titles).toContain('Engine Bay');
    expect(titles).toContain('Interior View');
  });
});
