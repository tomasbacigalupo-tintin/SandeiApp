import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound page', () => {
  it('renders message and link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Página no encontrada/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ir al login/i })).toBeInTheDocument();
  });
});
