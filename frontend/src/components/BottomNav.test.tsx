import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from './BottomNav';

beforeAll(() => {
  window.matchMedia = () => ({ matches: false } as any);
});

describe('BottomNav', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
    expect(screen.getByLabelText('Jugadores')).toBeInTheDocument();
    expect(screen.getByLabelText('Tácticas')).toBeInTheDocument();
    expect(screen.getByLabelText('Estadísticas')).toBeInTheDocument();
    expect(screen.getByLabelText('Perfil')).toBeInTheDocument();
  });
});
