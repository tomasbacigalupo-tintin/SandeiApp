import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerQuickInfo from './PlayerQuickInfo';

describe('PlayerQuickInfo', () => {
  const player = { id: '1', name: 'Test Player', stats: { goals: 5 } };

  it('switches between tabs', () => {
    render(<PlayerQuickInfo player={player} />);

    // shows stats by default
    expect(screen.getByText(/goals/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Historial/i));
    expect(screen.getByText(/Historial no disponible/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Notas/i));
    expect(screen.getByText(/Notas no disponibles/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<PlayerQuickInfo player={player} />);

    const tabs = screen.getAllByRole('tab');
    expect(screen.getByRole('tablist')).toBeInTheDocument();

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/Historial no disponible/i)).toBeInTheDocument();

    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });
});
