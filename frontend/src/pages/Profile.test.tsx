import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { vi } from 'vitest';

vi.mock('@/components/ui/input', () => ({ Input: (p: any) => <input {...p} /> }));

describe('Profile page', () => {
  it('renders profile heading', () => {
    render(<Profile />);
    expect(screen.getByText('Perfil del Club')).toBeInTheDocument();
  });
});
