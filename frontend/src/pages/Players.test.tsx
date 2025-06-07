import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Players from './Players';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@/hooks/usePlayers', () => ({
  usePlayers: () => ({ data: [], isLoading: false, error: null }),
  useCreatePlayer: () => ({ mutateAsync: vi.fn() }),
  useDeletePlayer: () => ({ mutate: vi.fn() }),
  useUpdatePlayer: () => ({ mutateAsync: vi.fn() }),
}));

vi.mock('@/components/PlayerWizard', () => ({ default: () => <div /> }));
vi.mock('@/components/PlayerCard', () => ({ default: () => <div>card</div> }));

describe('Players page', () => {
  it('renders players header', () => {
    render(
      <MemoryRouter>
        <Players />
      </MemoryRouter>,
    );
    expect(screen.getByText('Jugadores')).toBeInTheDocument();
  });
});
