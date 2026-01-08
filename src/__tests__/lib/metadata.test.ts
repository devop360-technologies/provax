import { createMetadata, getViewportMetadata } from '@/lib/metadata';

// Mock appConfig
jest.mock('@/config', () => ({
  appConfig: {
    appName: 'PROVAX',
    appTagline: 'AI-Powered Vehicle Certification',
    appDescription: 'PROVAX platform description',
    domainUrl: 'https://provax.com',
    domainName: 'https://provax.com',
    colors: {
      primary: '#8c5cff',
    },
  },
}));

describe('Metadata Utilities', () => {
  describe('createMetadata', () => {
    it('should return default metadata when no options provided', () => {
      const metadata = createMetadata();
      
      expect(metadata.title).toBe('AI-Powered Vehicle Certification');
      expect(metadata.description).toBe('PROVAX platform description');
      expect(metadata.applicationName).toBe('PROVAX');
    });

    it('should use custom title when provided', () => {
      const metadata = createMetadata({ title: 'Custom Title' });
      
      expect(metadata.title).toBe('Custom Title');
    });

    it('should use custom description when provided', () => {
      const metadata = createMetadata({ description: 'Custom description' });
      
      expect(metadata.description).toBe('Custom description');
    });

    it('should use custom keywords when provided', () => {
      const keywords = ['keyword1', 'keyword2', 'keyword3'];
      const metadata = createMetadata({ keywords });
      
      expect(metadata.keywords).toEqual(keywords);
    });

    it('should use default keywords when not provided', () => {
      const metadata = createMetadata();
      
      expect(metadata.keywords).toEqual(['PROVAX']);
    });

    it('should add authors when provided', () => {
      const authors = [{ name: 'John Doe', url: 'https://example.com' }];
      const metadata = createMetadata({ authors });
      
      expect(metadata.authors).toEqual(authors);
    });

    it('should use default authors when not provided', () => {
      const metadata = createMetadata();
      
      expect(metadata.authors).toEqual([{ name: 'PROVAX', url: 'https://provax.com' }]);
    });

    it('should set metadataBase URL', () => {
      const metadata = createMetadata();
      
      expect(metadata.metadataBase).toEqual(new URL('https://provax.com/'));
    });

    it('should add canonical URL when provided', () => {
      const metadata = createMetadata({ canonicalUrlRelative: '/about' });
      
      expect(metadata.alternates).toEqual({ canonical: '/about' });
    });

    it('should not add canonical URL when not provided', () => {
      const metadata = createMetadata();
      
      expect(metadata.alternates).toBeUndefined();
    });

    it('should add openGraph metadata when images provided', () => {
      const metadata = createMetadata({
        openGraph: {
          title: 'OG Title',
          description: 'OG Description',
          images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
        },
      });
      
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('OG Title');
      expect(metadata.openGraph?.description).toBe('OG Description');
      expect(metadata.openGraph?.images).toEqual([{ url: '/og-image.jpg', width: 1200, height: 630 }]);
    });

    it('should add twitter metadata when openGraph images provided', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/og-image.jpg' }],
        },
      });
      
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    it('should merge extra tags', () => {
      const metadata = createMetadata({
        extraTags: {
          robots: 'noindex,nofollow',
        },
      });
      
      expect(metadata.robots).toBe('noindex,nofollow');
    });

    it('should set default openGraph type to website', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/image.jpg' }],
        },
      });
      
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('should allow custom openGraph type', () => {
      const metadata = createMetadata({
        openGraph: {
          type: 'article',
          images: [{ url: '/image.jpg' }],
        },
      });
      
      expect(metadata.openGraph?.type).toBe('article');
    });

    it('should set default locale to en_US', () => {
      const metadata = createMetadata({
        openGraph: {
          images: [{ url: '/image.jpg' }],
        },
      });
      
      expect(metadata.openGraph?.locale).toBe('en_US');
    });
  });

  describe('getViewportMetadata', () => {
    it('should return viewport configuration', () => {
      const viewport = getViewportMetadata();
      
      expect(viewport).toBeDefined();
      expect(viewport.width).toBe('device-width');
      expect(viewport.initialScale).toBe(1);
    });

    it('should allow user scaling', () => {
      const viewport = getViewportMetadata();
      
      expect(viewport.userScalable).toBe(true);
    });

    it('should set viewport fit to cover', () => {
      const viewport = getViewportMetadata();
      
      expect(viewport.viewportFit).toBe('cover');
    });

    it('should set color scheme for light and dark', () => {
      const viewport = getViewportMetadata();
      
      expect(viewport.colorScheme).toBe('light dark');
    });

    it('should set theme colors for light and dark modes', () => {
      const viewport = getViewportMetadata();
      
      expect(viewport.themeColor).toEqual([
        { color: '#8c5cff', media: '(prefers-color-scheme: light)' },
        { color: '#8c5cff', media: '(prefers-color-scheme: dark)' },
      ]);
    });
  });
});
