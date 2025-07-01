import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { vi } from 'vitest';

import type { InputHTMLAttributes } from 'react';
vi.mock('@/components/ui/input', () => ({
  Input: (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} />,
}));

describe('Profile page', () => {
  it('renders profile heading', () => {
    render(<Profile />);
    expect(screen.getByText('Perfil del Club')).toBeInTheDocument();
  });
});
