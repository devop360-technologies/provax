/**
 * Tests for use-is-mobile.ts hook
 */
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-is-mobile';

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  return jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
      listeners.push(handler);
    }),
    removeEventListener: jest.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    }),
    dispatchEvent: jest.fn(),
    _listeners: listeners,
  }));
};

describe('useIsMobile Hook', () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    window.matchMedia = originalMatchMedia;
  });

  it('should return false for desktop viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });
    window.matchMedia = mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return true at breakpoint boundary (767px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });
    window.matchMedia = mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false at breakpoint (768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    window.matchMedia = mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update on resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.matchMedia = mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  it('should clean up event listeners on unmount', () => {
    const mockMediaQuery = mockMatchMedia(false);
    window.matchMedia = mockMediaQuery;
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
