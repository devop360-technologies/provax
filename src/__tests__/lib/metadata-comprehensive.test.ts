import { describe, it, expect } from '@jest/globals';
import { createMetadata, getViewportMetadata } from '@/lib/metadata';

// Mock the appConfig
jest.mock('@/config', () => ({
  appConfig: {
    appName: 'Provax',
    appTagline: 'AI-Powered Vehicle Certification',
    appDescription: 'Certify, sell, and service vehicles with transparency and trust.',
    domainUrl: 'https://provax.ai',
    stripe: {
      trailPeriod: 14 * 24 * 60 * 60 * 1000, // 14 days in ms
    },
    colors: {
      primary: '#00ff7f',
      secondary: '#1D1D41',
    },
  },
}));

describe('Metadata Utilities', () => {
  describe('createMetadata', () => {
    it('returns default metadata when no options provided', () => {
      const metadata = createMetadata();
      expect(metadata.title).toBe('AI-Powered Vehicle Certification');
      expect(metadata.description).toBe('Certify, sell, and service vehicles with transparency and trust.');
      expect(metadata.applicationName).toBe('Provax');
    });

    it('uses custom title when provided', () => {
      const metadata = createMetadata({ title: 'Custom Title' });
      expect(metadata.title).toBe('Custom Title');
    });

    it('uses custom description when provided', () => {
      const metadata = createMetadata({ description: 'Custom description' });
      expect(metadata.description).toBe('Custom description');
    });

    it('sets keywords', () => {
      const metadata = createMetadata({ keywords: ['vehicle', 'certification', 'AI'] });
      expect(metadata.keywords).toEqual(['vehicle', 'certification', 'AI']);
    });

    it('uses default keywords when not provided', () => {
      const metadata = createMetadata();
      expect(metadata.keywords).toEqual(['Provax']);
    });

    it('sets metadataBase correctly', () => {
      const metadata = createMetadata();
      expect(metadata.metadataBase?.toString()).toBe('https://provax.ai/');
    });

    it('sets authors when provided', () => {
      const authors = [{ name: 'John Doe', url: 'https://example.com' }];
      const metadata = createMetadata({ authors });
      expect(metadata.authors).toEqual(authors);
    });

    it('uses default authors when not provided', () => {
      const metadata = createMetadata();
      expect(metadata.authors).toEqual([{ name: 'Provax', url: 'https://provax.ai' }]);
    });

    it('sets creator to app name', () => {
      const metadata = createMetadata();
      expect(metadata.creator).toBe('Provax');
    });

    it('sets openGraph when images are provided', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/og-image.png' }],
          title: 'OG Title',
          description: 'OG Description',
        },
      });
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.images).toEqual([{ url: '/og-image.png' }]);
    });

    it('sets twitter card metadata when openGraph images provided', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/og-image.png' }],
        },
      });
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    it('sets canonical URL when provided', () => {
      const metadata = createMetadata({ canonicalUrlRelative: '/about' });
      expect(metadata.alternates?.canonical).toBe('/about');
    });

    it('does not set alternates when canonicalUrlRelative not provided', () => {
      const metadata = createMetadata();
      expect(metadata.alternates).toBeUndefined();
    });

    it('merges extra tags', () => {
      const metadata = createMetadata({
        extraTags: { robots: 'noindex, nofollow' },
      });
      expect((metadata as Record<string, unknown>).robots).toBe('noindex, nofollow');
    });

    it('sets openGraph type default to website', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/image.png' }],
        },
      });
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('allows custom openGraph type', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/image.png' }],
          type: 'article',
        },
      });
      expect(metadata.openGraph?.type).toBe('article');
    });

    it('sets openGraph locale', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/image.png' }],
          locale: 'fr_FR',
        },
      });
      expect(metadata.openGraph?.locale).toBe('fr_FR');
    });
  });

  describe('getViewportMetadata', () => {
    it('returns viewport metadata', () => {
      const viewport = getViewportMetadata();
      expect(viewport).toBeDefined();
    });

    it('sets initialScale to 1', () => {
      const viewport = getViewportMetadata();
      expect(viewport.initialScale).toBe(1);
    });

    it('sets userScalable to true', () => {
      const viewport = getViewportMetadata();
      expect(viewport.userScalable).toBe(true);
    });

    it('sets viewportFit to cover', () => {
      const viewport = getViewportMetadata();
      expect(viewport.viewportFit).toBe('cover');
    });
  });
});
