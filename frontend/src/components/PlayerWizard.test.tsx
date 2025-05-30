import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PlayerWizard from './PlayerWizard'
import { vi } from 'vitest'

describe('PlayerWizard', () => {
  it('validates inputs before proceeding', () => {
    render(<PlayerWizard onComplete={vi.fn()} onCancel={vi.fn()} />)

    // cannot go to step 2 without a name
    fireEvent.click(screen.getByText(/siguiente/i))
    expect(
      screen.getByRole('heading', { name: /nombre del jugador/i })
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    expect(
      screen.getByRole('heading', { name: /estad\u00edsticas/i })
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Estad\u00edsticas'), { target: { value: '{' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    expect(screen.getByText(/json inv\u00e1lido/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /estad\u00edsticas/i })
    ).toBeInTheDocument()
  })

  it('navigates between steps', () => {
    render(<PlayerWizard onComplete={vi.fn()} onCancel={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    expect(
      screen.getByRole('heading', { name: /estad\u00edsticas/i })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/atr\u00e1s/i))
    expect(
      screen.getByRole('heading', { name: /nombre del jugador/i })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/siguiente/i))
    fireEvent.change(screen.getByLabelText('Estad\u00edsticas'), { target: { value: '{}' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    expect(
      screen.getByRole('heading', { name: /confirmar datos/i })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText(/atr\u00e1s/i))
    expect(
      screen.getByRole('heading', { name: /estad\u00edsticas/i })
    ).toBeInTheDocument()
  })

  it('calls onComplete with parsed data', async () => {
    const onComplete = vi.fn()
    render(<PlayerWizard onComplete={onComplete} onCancel={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    fireEvent.change(screen.getByLabelText('Estad\u00edsticas'), { target: { value: '{"goals":3}' } })
    fireEvent.click(screen.getByText(/siguiente/i))
    fireEvent.click(screen.getByText(/guardar/i))

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith({ name: 'John', stats: { goals: 3 } })
    })
  })
})
