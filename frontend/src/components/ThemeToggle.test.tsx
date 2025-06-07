import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('toggles theme', () => {
    window.matchMedia = () => ({ matches: false } as any);
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label', 'Activar modo oscuro');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-label', 'Desactivar modo oscuro');
  });
});
