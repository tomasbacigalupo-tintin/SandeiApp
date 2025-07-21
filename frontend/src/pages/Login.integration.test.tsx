import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';
import { AuthContext } from '@/context/AuthContext';

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

describe('Login integration', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('login exitoso', async () => {
    const loginMock = vi.fn().mockResolvedValue({});
    render(
      <AuthContext.Provider value={{ token: null, isAuthenticated: false, login: loginMock, logout: vi.fn() }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith('test@example.com', '123456'));
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('login fallido', async () => {
    const loginMock = vi.fn().mockRejectedValue(new Error('fail'));
    render(
      <AuthContext.Provider value={{ token: null, isAuthenticated: false, login: loginMock, logout: vi.fn() }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));

    await waitFor(() => expect(loginMock).toHaveBeenCalled());
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
