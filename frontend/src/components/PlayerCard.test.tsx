import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerCard from './PlayerCard';
import { vi } from 'vitest';
import { Player } from '@/types/player';

const player: Player = { id: '1', name: 'John' };

describe('PlayerCard', () => {
  it('calls edit and delete handlers', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => true);
    render(
      <PlayerCard player={player} onEdit={onEdit} onDelete={onDelete} />,
    );
    fireEvent.click(screen.getByText('Editar'));
    expect(onEdit).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Eliminar'));
    expect(onDelete).toHaveBeenCalled();
  });
});
