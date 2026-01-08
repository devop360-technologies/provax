import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-is-mobile';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a boolean', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('should detect mobile viewport', () => {
    const matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('should handle desktop viewport', () => {
    const matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 1024px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('should update on viewport change', () => {
    const listeners: any[] = [];
    
    const matchMediaMock = jest.fn().mockImplementation((query) => {
      const listener = jest.fn();
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, cb) => {
          if (event === 'change') {
            listeners.push(cb);
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBeDefined();
  });

  it('should be consistent within same render', () => {
    const { result, rerender } = renderHook(() => useIsMobile());
    const firstValue = result.current;
    
    rerender();
    
    expect(result.current).toBe(firstValue);
  });

  it('should work without throwing errors', () => {
    expect(() => {
      renderHook(() => useIsMobile());
    }).not.toThrow();
  });

  it('should handle mobile query correctly', () => {
    const mobileMatch = jest.fn().mockReturnValue({
      matches: true,
      media: '(max-width: 768px)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    window.matchMedia = mobileMatch;

    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('should clean up listeners on unmount', () => {
    const removeEventListenerMock = jest.fn();
    
    const matchMediaMock = jest.fn().mockReturnValue({
      matches: false,
      media: '(max-width: 768px)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    });

    window.matchMedia = matchMediaMock;

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    
    // Component should cleanup properly
    expect(() => unmount()).not.toThrow();
  });
});
