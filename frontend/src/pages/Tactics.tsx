import { useState } from 'react';
import { useFormations, useCreateFormation } from '@/hooks/useFormations';
import Spinner from '@/components/ui/spinner';
import FormationWizard, { type FormationWizardData } from '@/components/FormationWizard';
import FormationCard from '@/components/FormationCard';
import { Button } from '@/components/ui/button';
import TacticsBoard from '@/components/TacticsBoard';
import type { Formation } from '@/types/formation';

export default function Tactics() {
  const { data: formations = [], isLoading, error } = useFormations();
  const createFormation = useCreateFormation();
  const [showWizard, setShowWizard] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{String(error)}</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Formaciones</h2>
      <Button onClick={() => setShowWizard(true)} className="w-fit">
        Crear formación
      </Button>

      {formations.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-gray-500">Aún no hay formaciones.</p>
          <Button onClick={() => setShowWizard(true)}>Añadir formación</Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {formations.map((f: Formation) => (
              <FormationCard key={f.id} formation={f} />
            ))}
          </div>
          <TacticsBoard />
        </>
      )}

      {showWizard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <FormationWizard
            onComplete={async (data: FormationWizardData) => {
              await createFormation.mutateAsync(data);
              setShowWizard(false);
            }}
            onCancel={() => setShowWizard(false)}
          />
        </div>
      )}
    </div>
  );
}
