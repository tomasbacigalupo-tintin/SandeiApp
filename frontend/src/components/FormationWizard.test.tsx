import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormationWizard from './FormationWizard';
import { vi } from 'vitest';

describe('FormationWizard', () => {
  it('renders first step', () => {
    render(
      <FormationWizard onComplete={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(
      screen.getByText(/Nombre de la formaci/i),
    ).toBeInTheDocument();
  });
});
