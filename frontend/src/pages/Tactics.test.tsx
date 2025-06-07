import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tactics from './Tactics';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@/hooks/useFormations', () => ({
  useFormations: () => ({ data: [], isLoading: false, error: null }),
  useCreateFormation: () => ({ mutateAsync: vi.fn() }),
}));

vi.mock('@/components/FormationWizard', () => ({ default: () => <div /> }));
vi.mock('@/components/FormationCard', () => ({ default: () => <div>card</div> }));
vi.mock('@/components/TacticsBoard', () => ({ default: () => <div data-testid="board" /> }));

vi.mock('@/components/ui/spinner', () => ({ default: () => <div /> }));

describe('Tactics page', () => {
  it('renders formations header', () => {
    render(
      <MemoryRouter>
        <Tactics />
      </MemoryRouter>,
    );
    expect(screen.getByText('Formaciones')).toBeInTheDocument();
  });
});
