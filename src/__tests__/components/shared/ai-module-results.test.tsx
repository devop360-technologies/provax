import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIModuleResults, DEFAULT_MODULE_RESULTS } from '@/components/shared/ai-module-results';

describe('AIModuleResults Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default title', () => {
    render(<AIModuleResults />);
    expect(screen.getByText('AI Module Results')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<AIModuleResults title="Analysis Results" />);
    expect(screen.getByText('Analysis Results')).toBeInTheDocument();
  });

  it('renders default results when not provided', () => {
    render(<AIModuleResults />);
    expect(screen.getByText('Structure Analysis')).toBeInTheDocument();
    expect(screen.getByText('Paint Analysis')).toBeInTheDocument();
  });

  it('renders custom results when provided', () => {
    const customResults = [
      {
        title: 'Custom Module',
        status: 'In Progress',
        metrics: [{ label: 'Test Metric', score: 85 }],
      },
    ];
    render(<AIModuleResults results={customResults} />);
    expect(screen.getByText('Custom Module')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Test Metric:')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders module status badges', () => {
    render(<AIModuleResults />);
    const statusBadges = screen.getAllByText('Complete');
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  it('renders all metrics for each module', () => {
    const customResults = [
      {
        title: 'Test Module',
        status: 'Complete',
        metrics: [
          { label: 'Metric 1', score: 90 },
          { label: 'Metric 2', score: 85 },
          { label: 'Metric 3', score: 95 },
        ],
      },
    ];
    render(<AIModuleResults results={customResults} />);
    
    expect(screen.getByText('Metric 1:')).toBeInTheDocument();
    expect(screen.getByText('Metric 2:')).toBeInTheDocument();
    expect(screen.getByText('Metric 3:')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('applies green color for high scores (>= 90)', () => {
    const customResults = [
      {
        title: 'Test Module',
        status: 'Complete',
        metrics: [{ label: 'High Score', score: 95 }],
      },
    ];
    const { container } = render(<AIModuleResults results={customResults} />);
    const scoreElement = screen.getByText('95%');
    expect(scoreElement).toHaveClass('bg-green-500/20');
    expect(scoreElement).toHaveClass('text-green-400');
  });

  it('applies orange color for medium scores (< 90)', () => {
    const customResults = [
      {
        title: 'Test Module',
        status: 'Complete',
        metrics: [{ label: 'Medium Score', score: 85 }],
      },
    ];
    const { container } = render(<AIModuleResults results={customResults} />);
    const scoreElement = screen.getByText('85%');
    expect(scoreElement).toHaveClass('bg-orange-500/20');
    expect(scoreElement).toHaveClass('text-orange-400');
  });

  it('renders empty when no results provided with empty array', () => {
    render(<AIModuleResults results={[]} />);
    expect(screen.queryByText('Complete')).not.toBeInTheDocument();
  });

  it('has correct container styling', () => {
    const { container } = render(<AIModuleResults />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('renders module cards with correct border styling', () => {
    const { container } = render(<AIModuleResults />);
    const cards = container.querySelectorAll('.border-l-4');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders module header with status', () => {
    const customResults = [
      {
        title: 'Analysis Module',
        status: 'Processing',
        metrics: [{ label: 'Test', score: 80 }],
      },
    ];
    render(<AIModuleResults results={customResults} />);
    
    expect(screen.getByText('Analysis Module')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });
});

describe('DEFAULT_MODULE_RESULTS', () => {
  it('exports default module results array', () => {
    expect(Array.isArray(DEFAULT_MODULE_RESULTS)).toBe(true);
  });

  it('has at least 4 modules', () => {
    expect(DEFAULT_MODULE_RESULTS.length).toBeGreaterThanOrEqual(4);
  });

  it('has correct structure for each module', () => {
    DEFAULT_MODULE_RESULTS.forEach(module => {
      expect(module).toHaveProperty('title');
      expect(module).toHaveProperty('status');
      expect(module).toHaveProperty('metrics');
      expect(typeof module.title).toBe('string');
      expect(typeof module.status).toBe('string');
      expect(Array.isArray(module.metrics)).toBe(true);
    });
  });

  it('has metrics with correct structure', () => {
    DEFAULT_MODULE_RESULTS.forEach(module => {
      module.metrics.forEach(metric => {
        expect(metric).toHaveProperty('label');
        expect(metric).toHaveProperty('score');
        expect(typeof metric.label).toBe('string');
        expect(typeof metric.score).toBe('number');
        expect(metric.score).toBeGreaterThanOrEqual(0);
        expect(metric.score).toBeLessThanOrEqual(100);
      });
    });
  });

  it('contains Structure Analysis module', () => {
    const structureModule = DEFAULT_MODULE_RESULTS.find(
      m => m.title === 'Structure Analysis'
    );
    expect(structureModule).toBeDefined();
    expect(structureModule?.metrics.length).toBe(4);
  });

  it('contains Paint Analysis module', () => {
    const paintModule = DEFAULT_MODULE_RESULTS.find(
      m => m.title === 'Paint Analysis'
    );
    expect(paintModule).toBeDefined();
    expect(paintModule?.metrics.length).toBe(4);
  });

  it('contains Ballistic Glass Assessment module', () => {
    const glassModule = DEFAULT_MODULE_RESULTS.find(
      m => m.title === 'Ballistic Glass Assessment'
    );
    expect(glassModule).toBeDefined();
    expect(glassModule?.metrics.length).toBe(4);
  });

  it('contains Interior Inspection module', () => {
    const interiorModule = DEFAULT_MODULE_RESULTS.find(
      m => m.title === 'Interior Inspection'
    );
    expect(interiorModule).toBeDefined();
    expect(interiorModule?.metrics.length).toBe(4);
  });

  it('all modules have Complete status', () => {
    DEFAULT_MODULE_RESULTS.forEach(module => {
      expect(module.status).toBe('Complete');
    });
  });
});
