import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stats from './Stats';
import { vi } from 'vitest';

vi.mock('@/hooks/useStats', () => ({ useStats: () => ({ data: [], isLoading: false, error: null }) }));

vi.mock('@/components/ui/spinner', () => ({ default: () => <div /> }));

vi.mock('recharts', () => ({
  BarChart: (p: Record<string, unknown>) => <div {...p} />,
  CartesianGrid: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  Bar: () => <div />,
  RadarChart: (p: Record<string, unknown>) => <div {...p} />,
  PolarGrid: () => <div />,
  PolarAngleAxis: () => <div />,
  PolarRadiusAxis: () => <div />,
  Radar: () => <div />,
  LineChart: (p: Record<string, unknown>) => <div {...p} />,
  Line: () => <div />,
}));

describe('Stats page', () => {
  it('renders heading', () => {
    render(<Stats />);
    expect(screen.getByText('Rendimiento')).toBeInTheDocument();
  });
});
