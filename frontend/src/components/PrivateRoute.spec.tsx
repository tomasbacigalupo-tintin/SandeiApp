import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import * as authService from '@/services/authService'

vi.mock('@/services/authService')

describe('PrivateRoute', () => {
  it('renders children when authenticated', () => {
    (authService.isAuthenticated as jest.Mock).mockReturnValue(true)
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Secret</div>
        </PrivateRoute>
      </MemoryRouter>
    )
    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('does not render children when unauthenticated', () => {
    (authService.isAuthenticated as jest.Mock).mockReturnValue(false)
    render(
      <MemoryRouter initialEntries={['/secret']}>
        <PrivateRoute>
          <div>Secret</div>
        </PrivateRoute>
      </MemoryRouter>
    )
    expect(screen.queryByText('Secret')).toBeNull()
  })
})
