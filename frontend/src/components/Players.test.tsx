import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Players from './Players';

vi.mock('@/hooks/usePlayers', () => ({
  usePlayers: () => ({ data: [{ id: '1', name: 'John' }], isLoading: false, error: null }),
}));

describe('Players component', () => {
  it('renders list of players', () => {
    render(<Players />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
