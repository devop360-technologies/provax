import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIModuleResults, DEFAULT_MODULE_RESULTS } from '../ai-module-results';

describe('AIModuleResults', () => {
  it('should render with default props', () => {
    render(<AIModuleResults />);
    expect(screen.getByText('AI Module Results')).toBeInTheDocument();
  });

  it('should render custom title', () => {
    render(<AIModuleResults title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should render all default module results', () => {
    render(<AIModuleResults />);
    DEFAULT_MODULE_RESULTS.forEach((module) => {
      expect(screen.getByText(module.title)).toBeInTheDocument();
    });
  });

  it('should render module status', () => {
    render(<AIModuleResults />);
    const completeStatuses = screen.getAllByText('Complete');
    expect(completeStatuses.length).toBeGreaterThan(0);
  });

  it('should render metrics with scores', () => {
    render(<AIModuleResults />);
    expect(screen.getByText('Frame Integrity:')).toBeInTheDocument();
    const scores = screen.getAllByText('96%');
    expect(scores.length).toBeGreaterThan(0);
  });

  it('should render custom results', () => {
    const customResults = [
      {
        title: 'Custom Module',
        status: 'In Progress',
        metrics: [
          { label: 'Custom Metric', score: 85 },
        ],
      },
    ];
    render(<AIModuleResults results={customResults} />);
    expect(screen.getByText('Custom Module')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Custom Metric:')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('should apply green color for high scores (>=90)', () => {
    const highScoreResults = [
      {
        title: 'High Score Module',
        status: 'Complete',
        metrics: [{ label: 'High Score', score: 95 }],
      },
    ];
    render(<AIModuleResults results={highScoreResults} />);
    const scoreElement = screen.getByText('95%');
    expect(scoreElement.className).toContain('bg-green-500/20');
    expect(scoreElement.className).toContain('text-green-400');
  });

  it('should apply orange color for medium scores (<90)', () => {
    const mediumScoreResults = [
      {
        title: 'Medium Score Module',
        status: 'Complete',
        metrics: [{ label: 'Medium Score', score: 85 }],
      },
    ];
    render(<AIModuleResults results={mediumScoreResults} />);
    const scoreElement = screen.getByText('85%');
    expect(scoreElement.className).toContain('bg-orange-500/20');
    expect(scoreElement.className).toContain('text-orange-400');
  });

  it('should render empty state when no results provided', () => {
    render(<AIModuleResults results={[]} />);
    expect(screen.getByText('AI Module Results')).toBeInTheDocument();
  });
});

describe('DEFAULT_MODULE_RESULTS', () => {
  it('should have 5 modules', () => {
    expect(DEFAULT_MODULE_RESULTS).toHaveLength(5);
  });

  it('should have required properties for each module', () => {
    DEFAULT_MODULE_RESULTS.forEach((module) => {
      expect(module).toHaveProperty('title');
      expect(module).toHaveProperty('status');
      expect(module).toHaveProperty('metrics');
      expect(Array.isArray(module.metrics)).toBe(true);
    });
  });

  it('should have required properties for each metric', () => {
    DEFAULT_MODULE_RESULTS.forEach((module) => {
      module.metrics.forEach((metric) => {
        expect(metric).toHaveProperty('label');
        expect(metric).toHaveProperty('score');
        expect(typeof metric.score).toBe('number');
      });
    });
  });
});
