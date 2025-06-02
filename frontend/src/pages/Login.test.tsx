import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '@/context/AuthContext';

describe('Login page', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Iniciar sesi\u00f3n/i)).toBeInTheDocument();
  });
});
