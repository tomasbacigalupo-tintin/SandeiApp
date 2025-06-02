import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '@/context/AuthContext';

describe('PrivateRoute', () => {
  it('renders children when authenticated', () => {
    render(
      <AuthContext.Provider
        value={{
          token: 't',
          isAuthenticated: true,
          login: vi.fn(),
          logout: vi.fn(),
        }}
      >
        <MemoryRouter>
          <PrivateRoute>
            <div>Secret</div>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });

  it('does not render children when unauthenticated', () => {
    render(
      <AuthContext.Provider
        value={{
          token: null,
          isAuthenticated: false,
          login: vi.fn(),
          logout: vi.fn(),
        }}
      >
        <MemoryRouter initialEntries={['/secret']}>
          <PrivateRoute>
            <div>Secret</div>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.queryByText('Secret')).toBeNull();
  });
});
