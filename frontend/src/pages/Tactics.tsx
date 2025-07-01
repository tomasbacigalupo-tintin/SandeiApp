import React, { useState, useCallback, Suspense } from 'react';
import { useFormations, useCreateFormation } from '@/hooks/useFormations';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import FormationCard from '@/components/FormationCard';
import TacticsBoard from '@/components/TacticsBoard';
import type { Formation, CreateFormationInput } from '@/types/formation';

const FormationWizard = React.lazy(() => import('@/components/FormationWizard'));

export default function Tactics() {
  const { data: formations = [], isLoading, error } = useFormations();
  const createFormation = useCreateFormation();
  const [isWizardOpen, setWizardOpen] = useState(false);

  const openWizard = useCallback(() => setWizardOpen(true), []);
  const closeWizard = useCallback(() => setWizardOpen(false), []);

  const handleComplete = useCallback(
    async (data: CreateFormationInput) => {
      await createFormation.mutateAsync(data);
      closeWizard();
    },
    [createFormation, closeWizard]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10" role="status" aria-label="Cargando formaciones">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-red-600 text-center mt-10">
        <p>Error cargando formaciones: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }

  return (
    <section className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Formaciones</h2>
        <Button onClick={openWizard} className="w-fit">
          Nueva formación
        </Button>
      </header>

      {formations.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-gray-500">No hay formaciones disponibles.</p>
          <Button onClick={openWizard}>Agregar formación</Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {formations.map((formation: Formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
          <TacticsBoard />
        </>
      )}

      {isWizardOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="formation-wizard-title"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <Suspense
            fallback={
              <div role="status" className="flex justify-center">
                <Spinner className="h-8 w-8 text-primary" />
              </div>
            }
          >
            <FormationWizard onComplete={handleComplete} onCancel={closeWizard} />
          </Suspense>
        </div>
      )}
    </section>
  );
}

