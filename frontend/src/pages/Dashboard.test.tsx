import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { vi } from 'vitest';

vi.mock('@/hooks/usePlayers', () => ({ usePlayers: () => ({ data: [], isLoading: false }) }));
vi.mock('@/hooks/useMatches', () => ({ useMatches: () => ({ data: [], isLoading: false }) }));
vi.mock('@/context/useAuth', () => ({ useAuth: () => ({ logout: vi.fn() }) }));
vi.mock('@/components/Onboarding', () => ({ default: () => <div data-testid="onboarding" /> }));

describe('Dashboard page', () => {
  it('renders dashboard info', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Bienvenido al Dashboard/i)).toBeInTheDocument();
  });
});
