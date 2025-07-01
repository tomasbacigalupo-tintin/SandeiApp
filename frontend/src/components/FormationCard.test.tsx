import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormationCard from './FormationCard';
import { Formation } from '@/types/formation';

const formation: Formation = { id: '1', name: '4-4-2', description: 'desc' };

describe('FormationCard', () => {
  it('shows formation info', () => {
    render(<FormationCard formation={formation} />);
    expect(screen.getByText('4-4-2')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Compartir/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });
});
