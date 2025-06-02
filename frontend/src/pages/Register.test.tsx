import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import { vi } from 'vitest';

vi.mock('@/services/authService', () => ({
  register: vi.fn(),
}));

import { register as mockRegister } from '@/services/authService';

describe('Register page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates step 1 before proceeding', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/siguiente/i));
    expect(screen.getByText('Nombre requerido')).toBeInTheDocument();
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
    expect(screen.getByText('Mínimo 6 caracteres')).toBeInTheDocument();
  });

  it('completes registration flow', async () => {
    (mockRegister as vi.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/siguiente/i));

    fireEvent.change(screen.getByLabelText('Equipo'), {
      target: { value: 'Team' },
    });
    fireEvent.change(screen.getByLabelText('Posición'), {
      target: { value: 'Forward' },
    });
    fireEvent.click(screen.getByText(/siguiente/i));

    fireEvent.click(screen.getByText(/completar/i));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'Test',
        'test@example.com',
        '123456',
      );
    });
  });

  it('shows error when registration fails', async () => {
    (mockRegister as vi.Mock).mockRejectedValueOnce(new Error('fail'));
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/siguiente/i));

    fireEvent.change(screen.getByLabelText('Equipo'), {
      target: { value: 'Team' },
    });
    fireEvent.change(screen.getByLabelText('Posición'), {
      target: { value: 'Forward' },
    });
    fireEvent.click(screen.getByText(/siguiente/i));

    fireEvent.click(screen.getByText(/completar/i));

    await waitFor(() => {
      expect(
        screen.getByText('No se pudo registrar el usuario'),
      ).toBeInTheDocument();
    });
  });
});
